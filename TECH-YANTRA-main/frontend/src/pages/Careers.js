import { useEffect, useState } from "react";
import api from "@/lib/api";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => { api.get("/careers").then((r) => setJobs(r.data)).catch(() => {}); }, []);

  return (
    <main className="pt-20 pb-24 min-h-screen" data-testid="careers-page">
      <div className="max-w-5xl mx-auto px-6 pt-16">
        <div className="text-[12px] uppercase tracking-wider text-foreground/50">Careers</div>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">Build software with us.</h1>
        <p className="mt-4 text-foreground/65 max-w-xl">Small team. Real client work. Mentorship from day one. Open roles below — if nothing fits, email us anyway.</p>

        <div className="mt-12 divide-y divide-border border-t border-b border-border">
          {jobs.map((j, i) => (
            <div key={j.id} className="py-6 grid md:grid-cols-12 gap-4 items-center" data-testid={`job-${i}`}>
              <div className="md:col-span-6">
                <h3 className="font-semibold text-[17px]">{j.title}</h3>
                <p className="text-[14px] text-foreground/65 mt-1 line-clamp-2 max-w-md">{j.description}</p>
              </div>
              <div className="md:col-span-2 text-[13px] text-foreground/70 flex items-center gap-1.5"><MapPin size={13} /> {j.location}</div>
              <div className="md:col-span-2 text-[13px] text-foreground/70 flex items-center gap-1.5"><Clock size={13} /> {j.type}</div>
              <div className="md:col-span-2 text-right">
                <a href={`mailto:Techyantrasoftwareagency@gmail.com?subject=${encodeURIComponent(`Application for ${j.title}`)}`} className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-md border border-border hover:border-foreground/40 hover:text-crimson transition text-[13px]">Apply <ArrowUpRight size={12}/></a>
              </div>
            </div>
          ))}
          {jobs.length === 0 && <div className="py-8 text-foreground/60">No active openings. Email us at <a href="mailto:Techyantrasoftwareagency@gmail.com" className="text-crimson">Techyantrasoftwareagency@gmail.com</a>.</div>}
        </div>
      </div>
    </main>
  );
}
