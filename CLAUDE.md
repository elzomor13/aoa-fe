# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server (may use port 3001 if 3000 is taken)
npm run build      # production build (requires network for Google Fonts)
npm run typecheck  # tsc --noEmit — run this after every change
npm run lint       # ESLint (ignored during builds)
```

There are no tests. Always run `typecheck` to verify changes.

## Architecture

**Next.js 13.5 App Router** deployed on Netlify. All pages live under `app/[locale]/` — the locale segment is mandatory for every route.

### Internationalization (next-intl v4)

Five locales: `en` (default), `ar`, `de`, `fr`, `es`. Arabic uses `dir="rtl"` and the Cairo font.

- `i18n/routing.ts` — defines locales and defaultLocale
- `i18n/request.ts` — server-side message loader (referenced by `next.config.js` via `withNextIntl`)
- `proxy.ts` — intercepts all requests and enforces locale prefixes (`/en`, `/ar`, etc.) — Next.js 16 renamed `middleware.ts` to `proxy.ts`
- `messages/{locale}.json` — all UI strings keyed by section namespace (`navbar`, `hero`, `footer`, `institutes`, `news`, `admissions`, `contact`, `quickAccess`, `explore`)
- `lib/navigation.ts` — re-exports `Link`, `useRouter`, `usePathname` from next-intl for locale-aware navigation

**All section components are `'use client'`** and call `useTranslations('namespace')` directly. The `NextIntlClientProvider` is mounted in `app/[locale]/layout.tsx` wrapping all children.

When adding a new translatable string: add the key to all five `messages/*.json` files, then use `useTranslations('namespace')` in the component.

### Layout & Fonts

`app/[locale]/layout.tsx` is the real root layout — it sets `lang`, `dir`, loads four Google Fonts (Cormorant Garamond, DM Sans, DM Mono, Cairo), and wraps with `NextIntlClientProvider`. The root `app/layout.tsx` is a passthrough that only imports `globals.css`.

Font CSS variables: `--font-cormorant`, `--font-dm-sans`, `--font-dm-mono`, `--font-cairo`. Tailwind aliases: `font-cormorant`, `font-dm-sans`, `font-dm-mono`, `font-cairo`.

### Design tokens (Tailwind)

| Token | Value |
|---|---|
| `bg-[#0D0D0D]` / `black` | near-black background |
| `charcoal` | `#1A1A1A` card background |
| `crimson` | `#C8102E` brand accent |
| `off-white` | `#F5F5F5` light section background |

Sections alternate between `bg-[#0D0D0D]` (dark) and `bg-[#F5F5F5]` (light).

### Animation

`lib/animations.ts` exports the shared `EASE` cubic-bezier and reusable Framer Motion variants (`fadeUp`, `staggerContainer`). Sections use `useInView` with `{ once: true, margin: '-100px' }` to trigger entrance animations.

### Static assets

All static files live in `public/`. Current assets:
- `public/logo.svg` — main logo (viewBox cropped to `477 355 1051 701`; use `<AcademyOfArtsLogo>` from `components/ui/Logo.tsx`, which wraps it as `<img>` with an optional white background for dark contexts)
- `public/videos/hero.mp4` — hero background video
- `public/theater.jpg` — institute card image (placeholder; one per institute eventually)

### Component conventions

- Section components import `useTranslations` and define their data arrays **inside** the component body so translated strings can be interpolated directly.
- `InstituteCard` (`components/ui/InstituteCard.tsx`) accepts an `image` prop; the `icon` and `desc` props exist but are not currently rendered (overlay card style).
- The `LanguageSwitcher` reads the current locale via `useParams()` from `next/navigation` and switches by replacing the first URL path segment.
