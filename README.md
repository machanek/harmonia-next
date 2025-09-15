# Harmonia Rząska — Next.js

Nowoczesne osiedle pod Krakowem — migracja z legacy HTML/JS do Next.js z zachowaniem pełnej funkcjonalności.

## Jak zbudować i uruchomić

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

## ISR (Incremental Static Regeneration)

Aplikacja używa ISR z `revalidate: 60` sekund. Strona jest generowana statycznie i odświeżana co minutę.

### Jak wymusić odświeżenie danych:

1. **Automatyczne**: Po deployu na Netlify, pierwsze wejście na stronę odświeży cache
2. **Webhook**: Dodaj webhook w Netlify → Site settings → Build & deploy → Build hooks
   - URL: `https://twoja-domena.netlify.app/`
   - Trigger: "Deploy succeeded"
3. **Ręczne**: Odwiedź stronę po 60 sekundach od ostatniego odświeżenia

## Wymagane pliki w public/

Upewnij się, że w katalogu `public/` znajdują się:

```
public/
├── admin/           # Netlify CMS
├── css/            # Legacy stylesheets
├── images/         # Obrazy (logo, ikony)
├── assets/         # Dodatkowe zasoby
├── data/units/     # JSON z danymi jednostek
├── robots.txt      # SEO
├── sitemap.xml     # SEO
├── sw.js          # Service Worker
└── _redirects     # Netlify redirects
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
