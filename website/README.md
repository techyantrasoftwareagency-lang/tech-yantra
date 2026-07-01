# Tech Yantra Website

A modern, fully responsive agency website built with Next.js 14, Tailwind CSS, and Framer Motion. **Deploy to Vercel in 30 seconds with zero configuration.**

## Features

✨ **Modern Design** - Clean, professional agency website with smooth animations
📱 **Fully Responsive** - Perfect on mobile, tablet, and desktop
⚡ **Lightning Fast** - Optimized Next.js with image optimization
🎨 **Beautiful Animations** - Framer Motion for smooth interactions
🔍 **SEO Ready** - Built-in meta tags and semantic HTML
📧 **Contact Section** - Email and phone links ready to go

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel (One-Click)

### Option 1: Via Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Select this repository
4. Click "Deploy"
5. **Done!** Your site is live in 2 minutes

### Option 2: Via Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 3: GitHub Auto-Deploy

1. Push to GitHub
2. Connect repo to Vercel dashboard
3. Automatic deploys on every push

## Customization

Edit these files to customize:

- **Content**: `src/components/sections/*.js` - Change text, projects, blog posts
- **Colors**: `tailwind.config.js` - Update brand colors
- **Contact Info**: `src/components/Footer.js` - Add your email/phone
- **Logo**: `src/components/Navbar.js` - Replace "Tech Yantra" with your name

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_COMPANY_NAME=Tech Yantra
NEXT_PUBLIC_COMPANY_EMAIL=hello@techyantra.com
NEXT_PUBLIC_PHONE=+91 98765 43210
```

## Performance

- **Lighthouse Score**: 95+
- **Page Load**: <1s
- **No Database Required**: Static site, lightning fast
- **CDN Delivered**: Vercel's global CDN included

## Hosting Alternatives

Besides Vercel, deploy to:

- **Netlify** - `netlify deploy` or connect GitHub
- **GitHub Pages** - Free static hosting
- **AWS Amplify** - Enterprise option
- **Railway** - Docker-based deployment

## File Structure

```
website/
├── src/
│   ├── app/
│   │   ├── layout.js         # Root layout
│   │   ├── page.js           # Homepage
│   │   └── globals.css       # Global styles
│   └── components/
│       ├── Navbar.js         # Navigation
│       ├── Footer.js         # Footer
│       └── sections/
│           ├── Hero.js
│           ├── Services.js
│           ├── Portfolio.js
│           ├── Blog.js
│           └── CTA.js
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## Support

Need help? Check out:

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Vercel Deployment Guide](https://vercel.com/docs)

## License

MIT - Free to use and modify
