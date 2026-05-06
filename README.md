# visha — for the collective

Pre-loved fashion marketplace for Kenya. Buy and sell vintage finds, streetwear, and pre-loved clothes — pay with M-Pesa, chat with sellers in-app, and shop sustainably.

This repository contains the marketing and pre-launch website.

## Tech

- [Astro](https://astro.build)
- Vanilla CSS with CSS custom properties
- Syne + DM Sans (Google Fonts)
- Material Symbols

## Getting Started

```bash
npm install
npm run dev
```

```bash
npm run build    # → dist/
npm run preview
```

## Project Structure

```
src/
├── layouts/
│   └── Layout.astro
├── components/
│   ├── Navbar.astro
│   ├── Footer.astro
│   └── WaitlistForm.astro
├── pages/
│   ├── index.astro
│   ├── how.astro
│   ├── community.astro
│   ├── registration.astro
│   ├── support.astro
│   └── blog.astro
└── styles/
    └── global.css
public/
└── scripts/
    └── visha.js
```

## Pages

| Route | Description |
|---|---|
| `/` | Homepage |
| `/how` | How the app works |
| `/community` | Community features and curator spotlight |
| `/registration` | Waitlist signup |
| `/support` | FAQ and contact |
| `/blog` | The Fashion Edit |

## Deployment

Builds to static HTML. Deploy the `dist/` folder to Netlify or Vercel. Update `site` in `astro.config.mjs` to match the live domain.