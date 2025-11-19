## Harmony Health Blueprint

Minimalist-luxury wellness blueprint crafted for Mary's Digital Lab. The experience blends a refined web presentation with a downloadable, screen-optimized PDF that maps rituals, hydration and sleep essentials, movement micro-practices, three signature tonics, six herbal allies, guided relaxation audio, a seven-day mini plan, and printable planner assets.

### Tech Stack

- Next.js 16 App Router with TypeScript
- Tailwind CSS (v4 preview) with custom luxury styling
- PDFKit API route for on-demand PDF generation
- Framer Motion for subtle hero animation flourishes

### Getting Started

```bash
npm install
npm run dev
# open http://localhost:3000
```

### Production

```bash
npm run lint
npm run build
npm start
```

### Highlights

- Rotating hero focus (brain, heart, body, beauty) with micro-motion
- Download button triggering live PDF assembly from shared content data
- Guided relaxation audio bundle (WAV files in `public/audio`)
- Tonics, herbs, rituals, and relaxation scripts in luxury card layouts
- Interactive journal + progress tracker saved locally on the device
- Printable weekly planner and shopping checklist with quick print action
- Seven-day mini plan that layers one sustainable shift per day

### Deployment

Ready for Vercel. After verifying the build, deploy with:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-b7c78929
```

Use the production URL `https://agentic-b7c78929.vercel.app` after DNS propagation.
