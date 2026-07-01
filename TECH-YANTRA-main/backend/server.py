from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import logging
import uuid
import jwt
import bcrypt
from datetime import datetime, timezone, timedelta
from typing import List, Optional, Literal
from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, Response
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr, ConfigDict

# ---------- DB ----------
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_ALGORITHM = "HS256"
JWT_SECRET = os.environ.get("JWT_SECRET", "change-me-in-prod")
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@techyantra.com")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "TechYantra@2026")

# ---------- App ----------
app = FastAPI(title="Tech Yantra API")
api = APIRouter(prefix="/api")

# ---------- Helpers ----------
def hash_password(pw: str) -> str:
    return bcrypt.hashpw(pw.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(pw: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(pw.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False

def create_access_token(user_id: str, email: str, role: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "role": role,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "iat": datetime.now(timezone.utc),
        "type": "access",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

async def require_admin(user: dict = Depends(get_current_user)) -> dict:
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user

def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()

# ---------- Models ----------
class RegisterReq(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(min_length=6)
    company: Optional[str] = None

class LoginReq(BaseModel):
    email: EmailStr
    password: str

class InquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    budget: Optional[str] = None
    project_type: Optional[str] = None
    message: str

class PortfolioItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    description: str
    image: str
    tags: List[str] = []
    link: Optional[str] = None
    created_at: str = Field(default_factory=now_iso)

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    excerpt: str
    content: str
    cover: str
    author: str = "Tech Yantra Team"
    tags: List[str] = []
    published: bool = True
    created_at: str = Field(default_factory=now_iso)

class JobPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    department: str
    location: str
    type: str  # Full-time / Internship / Contract
    description: str
    requirements: List[str] = []
    posted_at: str = Field(default_factory=now_iso)
    active: bool = True

class NewsletterReq(BaseModel):
    email: EmailStr

class ProjectItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_id: str
    name: str
    status: str = "In Progress"  # Discovery, Design, Development, Testing, Deployed
    progress: int = 0
    description: str = ""
    created_at: str = Field(default_factory=now_iso)

# ---------- Auth Routes ----------
@api.post("/auth/register")
async def register(body: RegisterReq, response: Response):
    email = body.email.lower()
    if await db.users.find_one({"email": email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    user_id = str(uuid.uuid4())
    doc = {
        "id": user_id,
        "name": body.name,
        "email": email,
        "company": body.company or "",
        "password_hash": hash_password(body.password),
        "role": "client",
        "created_at": now_iso(),
    }
    await db.users.insert_one(doc)
    token = create_access_token(user_id, email, "client")
    response.set_cookie("access_token", token, httponly=True, secure=False, samesite="lax", max_age=604800, path="/")
    return {"token": token, "user": {"id": user_id, "name": body.name, "email": email, "role": "client", "company": body.company or ""}}

@api.post("/auth/login")
async def login(body: LoginReq, response: Response):
    email = body.email.lower()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(body.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(user["id"], email, user["role"])
    response.set_cookie("access_token", token, httponly=True, secure=False, samesite="lax", max_age=604800, path="/")
    return {"token": token, "user": {"id": user["id"], "name": user["name"], "email": email, "role": user["role"], "company": user.get("company", "")}}

@api.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    return {"ok": True}

@api.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return user

# ---------- Public ----------
@api.get("/")
async def root():
    return {"message": "Tech Yantra API", "status": "ok"}

@api.post("/inquiries")
async def create_inquiry(body: InquiryCreate):
    doc = body.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = now_iso()
    doc["status"] = "new"
    await db.inquiries.insert_one(doc)
    return {"ok": True, "id": doc["id"]}

@api.post("/newsletter")
async def newsletter(body: NewsletterReq):
    email = body.email.lower()
    existing = await db.newsletter.find_one({"email": email})
    if existing:
        return {"ok": True, "message": "Already subscribed"}
    await db.newsletter.insert_one({"id": str(uuid.uuid4()), "email": email, "created_at": now_iso()})
    return {"ok": True, "message": "Subscribed"}

@api.get("/portfolio")
async def list_portfolio():
    items = await db.portfolio.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return items

@api.get("/blog")
async def list_blog():
    items = await db.blog.find({"published": True}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return items

@api.get("/blog/{slug}")
async def get_blog(slug: str):
    item = await db.blog.find_one({"slug": slug, "published": True}, {"_id": 0})
    if not item:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return item

@api.get("/careers")
async def list_jobs():
    items = await db.careers.find({"active": True}, {"_id": 0}).sort("posted_at", -1).to_list(100)
    return items

# ---------- Admin ----------
@api.get("/admin/stats")
async def admin_stats(_: dict = Depends(require_admin)):
    return {
        "inquiries": await db.inquiries.count_documents({}),
        "users": await db.users.count_documents({"role": "client"}),
        "portfolio": await db.portfolio.count_documents({}),
        "blog": await db.blog.count_documents({}),
        "careers": await db.careers.count_documents({}),
        "newsletter": await db.newsletter.count_documents({}),
    }

@api.get("/admin/inquiries")
async def admin_inquiries(_: dict = Depends(require_admin)):
    items = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return items

@api.delete("/admin/inquiries/{iid}")
async def del_inquiry(iid: str, _: dict = Depends(require_admin)):
    await db.inquiries.delete_one({"id": iid})
    return {"ok": True}

@api.get("/admin/users")
async def admin_users(_: dict = Depends(require_admin)):
    items = await db.users.find({}, {"_id": 0, "password_hash": 0}).to_list(1000)
    return items

@api.get("/admin/newsletter")
async def admin_newsletter(_: dict = Depends(require_admin)):
    items = await db.newsletter.find({}, {"_id": 0}).to_list(1000)
    return items

@api.post("/admin/portfolio")
async def add_portfolio(body: PortfolioItem, _: dict = Depends(require_admin)):
    doc = body.model_dump()
    await db.portfolio.insert_one(doc)
    return doc

@api.put("/admin/portfolio/{pid}")
async def upd_portfolio(pid: str, body: PortfolioItem, _: dict = Depends(require_admin)):
    doc = body.model_dump()
    doc["id"] = pid
    await db.portfolio.update_one({"id": pid}, {"$set": doc})
    return doc

@api.delete("/admin/portfolio/{pid}")
async def del_portfolio(pid: str, _: dict = Depends(require_admin)):
    await db.portfolio.delete_one({"id": pid})
    return {"ok": True}

@api.post("/admin/blog")
async def add_blog(body: BlogPost, _: dict = Depends(require_admin)):
    doc = body.model_dump()
    await db.blog.insert_one(doc)
    return doc

@api.put("/admin/blog/{bid}")
async def upd_blog(bid: str, body: BlogPost, _: dict = Depends(require_admin)):
    doc = body.model_dump()
    doc["id"] = bid
    await db.blog.update_one({"id": bid}, {"$set": doc})
    return doc

@api.delete("/admin/blog/{bid}")
async def del_blog(bid: str, _: dict = Depends(require_admin)):
    await db.blog.delete_one({"id": bid})
    return {"ok": True}

@api.post("/admin/careers")
async def add_job(body: JobPost, _: dict = Depends(require_admin)):
    doc = body.model_dump()
    await db.careers.insert_one(doc)
    return doc

@api.put("/admin/careers/{jid}")
async def upd_job(jid: str, body: JobPost, _: dict = Depends(require_admin)):
    doc = body.model_dump()
    doc["id"] = jid
    await db.careers.update_one({"id": jid}, {"$set": doc})
    return doc

@api.delete("/admin/careers/{jid}")
async def del_job(jid: str, _: dict = Depends(require_admin)):
    await db.careers.delete_one({"id": jid})
    return {"ok": True}

@api.get("/admin/all-blog")
async def admin_all_blog(_: dict = Depends(require_admin)):
    items = await db.blog.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return items

@api.get("/admin/all-careers")
async def admin_all_careers(_: dict = Depends(require_admin)):
    items = await db.careers.find({}, {"_id": 0}).sort("posted_at", -1).to_list(500)
    return items

# ---------- Client ----------
@api.get("/client/projects")
async def client_projects(user: dict = Depends(get_current_user)):
    items = await db.projects.find({"client_id": user["id"]}, {"_id": 0}).to_list(100)
    return items

# ---------- Mount + CORS ----------
app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ---------- Startup ----------
@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.inquiries.create_index("created_at")
    await db.portfolio.create_index("id", unique=True)
    await db.blog.create_index("slug", unique=True)
    await db.careers.create_index("id", unique=True)

    # Seed admin
    existing = await db.users.find_one({"email": ADMIN_EMAIL.lower()})
    if not existing:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "name": "Admin",
            "email": ADMIN_EMAIL.lower(),
            "company": "Tech Yantra",
            "password_hash": hash_password(ADMIN_PASSWORD),
            "role": "admin",
            "created_at": now_iso(),
        })
        logger.info("Seeded admin user")
    elif not verify_password(ADMIN_PASSWORD, existing["password_hash"]):
        await db.users.update_one({"email": ADMIN_EMAIL.lower()}, {"$set": {"password_hash": hash_password(ADMIN_PASSWORD)}})
        logger.info("Updated admin password")

    # Seed portfolio if empty
    if await db.portfolio.count_documents({}) == 0:
        seed_portfolio = [
            {"id": str(uuid.uuid4()), "title": "FinPulse — Trading Dashboard", "category": "Dashboards", "description": "Realtime trading analytics dashboard with custom charts, alerts and portfolio insights.", "image": "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1200", "tags": ["React", "Node.js", "WebSocket"], "link": "#", "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "title": "MediCare AI Triage", "category": "AI Projects", "description": "ML-powered patient triage and appointment routing for clinics.", "image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200", "tags": ["Python", "FastAPI", "OpenAI"], "link": "#", "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "title": "Brewline — Cafe Ordering App", "category": "Mobile Apps", "description": "Cross-platform Flutter app for cafe pre-orders, loyalty and table booking.", "image": "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200", "tags": ["Flutter", "Firebase"], "link": "#", "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "title": "Atlas LMS", "category": "SaaS Products", "description": "Modern learning platform for institutes with live classes and assessments.", "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200", "tags": ["Next.js", "MongoDB"], "link": "#", "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "title": "Nova Couture", "category": "E-commerce", "description": "Headless commerce experience for premium fashion with editorial storytelling.", "image": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200", "tags": ["Shopify", "React"], "link": "#", "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "title": "Yantra Logistics", "category": "Business Websites", "description": "Lead-generating site for a logistics company with shipment tracking widget.", "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200", "tags": ["Next.js", "Tailwind"], "link": "#", "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "title": "Helix — DevOps Console", "category": "Dashboards", "description": "Unified DevOps console aggregating CI/CD, logs and uptime across clusters.", "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200", "tags": ["React", "Docker", "AWS"], "link": "#", "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "title": "Verba — AI Writing Studio", "category": "AI Projects", "description": "Multi-model AI writing studio with templates, brand voice and team workspace.", "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200", "tags": ["OpenAI", "Next.js"], "link": "#", "created_at": now_iso()},
        ]
        await db.portfolio.insert_many(seed_portfolio)
        logger.info("Seeded portfolio")

    # Seed blog
    if await db.blog.count_documents({}) == 0:
        await db.blog.insert_many([
            {"id": str(uuid.uuid4()), "title": "Why 2026 Belongs to AI-Native Products", "slug": "ai-native-products-2026", "excerpt": "How AI-first architecture is rewriting the rules of software product design.", "content": "AI-native isn't a feature — it's an architecture. In this article we explore how teams are rethinking the entire product loop around models, evaluations and feedback. From data layers to UX patterns like progressive autonomy, we cover the playbook our team uses on every new build.", "cover": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600", "author": "Tech Yantra Team", "tags": ["AI", "Product"], "published": True, "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "title": "The Cost Anatomy of a Custom Software Project", "slug": "custom-software-cost-anatomy", "excerpt": "A transparent breakdown of where every rupee goes when you commission custom software.", "content": "Most agencies hide the cost stack behind a vague proposal. We break it open — discovery, design, engineering, QA, infra and post-launch — with realistic 2026 benchmarks for Indian startups.", "cover": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600", "author": "Tech Yantra Team", "tags": ["Engineering"], "published": True, "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "title": "Designing Dashboards People Actually Use", "slug": "dashboards-people-use", "excerpt": "The mental model behind dashboards that drive decisions, not just decoration.", "content": "Dashboards fail when they answer the wrong questions. We share our 4-step framework — Audience, Action, Anomaly, Annotation — for shipping dashboards that lead to better business decisions.", "cover": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600", "author": "Tech Yantra Team", "tags": ["Design", "Data"], "published": True, "created_at": now_iso()},
        ])
        logger.info("Seeded blog")

    # Seed careers
    if await db.careers.count_documents({}) == 0:
        await db.careers.insert_many([
            {"id": str(uuid.uuid4()), "title": "Senior Full-Stack Engineer", "department": "Engineering", "location": "Remote / India", "type": "Full-time", "description": "Lead end-to-end product builds across React, Next.js and FastAPI for our flagship clients.", "requirements": ["4+ years full-stack experience", "Strong React + Node/Python", "Cloud (AWS/GCP)", "Portfolio of shipped products"], "posted_at": now_iso(), "active": True},
            {"id": str(uuid.uuid4()), "title": "Product Designer", "department": "Design", "location": "Remote", "type": "Full-time", "description": "Own the design system and craft delightful experiences across web and mobile.", "requirements": ["3+ years product design", "Figma mastery", "Motion + interaction", "Portfolio"], "posted_at": now_iso(), "active": True},
            {"id": str(uuid.uuid4()), "title": "AI/ML Engineer", "department": "AI", "location": "Hybrid — Bengaluru", "type": "Full-time", "description": "Ship LLM-powered features and evals into production for enterprise clients.", "requirements": ["Python + PyTorch/TensorFlow", "LLM fine-tuning", "Vector DBs"], "posted_at": now_iso(), "active": True},
            {"id": str(uuid.uuid4()), "title": "Frontend Intern", "department": "Engineering", "location": "Remote", "type": "Internship", "description": "Work alongside senior engineers on real client projects. Mentorship + stipend.", "requirements": ["React fundamentals", "CSS/Tailwind", "Pre-final / final year student"], "posted_at": now_iso(), "active": True},
        ])
        logger.info("Seeded careers")

@app.on_event("shutdown")
async def shutdown():
    client.close()
