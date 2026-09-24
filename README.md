# Ahmad Ibrahim — Portfolio

React 19 + TypeScript + Vite, with Tailwind CSS, Motion, and a deferred Three.js hero.

## Development

- `npm ci` — install the locked dependencies.
- `npm run dev` — start the development server on port 3000 (or the next free port).
- `npm run lint` — TypeScript checks.
- `npm run build` — production build, including static article metadata.
- `npm run preview` — inspect the production build locally.

The existing chat endpoint uses `GEMINI_API_KEY` from `.env.local` in development and Vercel environment variables in production.

## Content and design

- `src/data/portfolio.ts` preserves the project, skills, education, training, AI/ML work, social links, and writing content.
- `src/data/site.ts` contains the identity, public URL, contact details, and navigation.
- `src/index.css` contains theme tokens and responsive layouts. Main breakpoints are 480, 768, and 1100 pixels.
- `src/components/Animation.tsx` centralizes reveal timing, project tilt, hero depth, and scroll progress.
- `src/components/HeroVisual.tsx` progressively enhances the static visual. The Three.js chunk is deferred and omitted on touch/small screens, reduced-motion, data-saving, and supported low-memory/low-core device signals.
- `src/components/NeuralScene.tsx` pauses when offscreen or when the tab is hidden and disposes GPU resources on unmount. The scene is decorative, not a representation of a trained model.
- `src/hooks/use-theme.ts` follows system appearance until an explicit choice is saved. The head script applies the same choice before rendering.

The original portrait is retained; the website serves an optimized WebP version. Geist is self-hosted with its license in `public/fonts`.

## SEO

The configured public URL is `https://ahmad-ibrahim-portfolio-eta.vercel.app`.

Open Graph/Twitter metadata, the social preview image, Person structured data, canonical URLs, robots.txt, and a sitemap are included. The postbuild step creates `/blog/index.html` with article metadata and readable fallback content. Vercel routes `/blog` to that document; React still handles interactive navigation. Home and writing content also have no-JavaScript fallbacks.

## Verification checklist

Check home and `/blog#state-management` on desktop, tablet, and mobile. Verify both themes, persisted selection, system-theme changes before a selection, menu keyboard navigation/Escape, all project and social links, and no horizontal overflow. With reduced motion enabled, the hero uses the static illustration and movement is disabled. With WebGL unavailable, the static illustration remains visible.

Production load measurements are local lab observations, not field Core Web Vitals. No fabricated project metrics, resume links, or employment claims are included.
