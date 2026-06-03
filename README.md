# Raremark Studios — marketing site

The marketing + legal site for **Raremark Studios**, home of **Research Buddy** —
a minimalist PDF reader for Android with AI "explain on select" gestures.

It exists for two reasons:

1. **Play Store requirements** — a public privacy policy, terms, support page, and
   a working homepage.
2. **Conversion** — a clean landing page that turns curious visitors into installs.

Built with **Astro** (static) + **Tailwind CSS v4** + **MDX** (for the legal
pages). No client-side JavaScript ships — the whole site is static HTML/CSS, so
Lighthouse stays green and it deploys anywhere.

---

## Quick start

Requires **Node 18.20+ / 20+ / 22+** (built on Node 22).

```bash
npm install      # install dependencies
npm run dev      # local dev server at http://localhost:4321
npm run build    # production build -> ./dist
npm run preview  # preview the production build locally
npm run check    # type-check .astro/.ts (astro check)
npm run og       # regenerate public/og.png from public/og.svg
```

---

## Project structure

```
src/
  consts.ts              # ← site config: name, URL, emails, Play URL, nav (start here)
  styles/global.css      # ← design tokens (palette + type) and base styles
  layouts/
    BaseLayout.astro     # shared <head>, meta/OG tags, header + footer
    LegalLayout.astro    # wraps MDX legal pages in styled prose
  components/
    Header.astro  Footer.astro  Brandmark.astro
    Hero.astro  Gestures.astro  DeviceMockup.astro  PlayButton.astro
  pages/
    index.astro          # landing page
    privacy.mdx          # /privacy   (edit as Markdown)
    terms.mdx            # /terms     (edit as Markdown)
    support.astro        # /support   (contact + FAQ)
public/
  favicon.svg  og.svg  og.png        # icons + social preview
  _headers                           # security/cache headers (Cloudflare/Netlify)
  screenshots/                       # drop real app screenshots here
scripts/generate-og.mjs              # SVG -> PNG for the social image
vercel.json                          # security/cache headers (Vercel)
```

---

## Editing content

- **Site-wide values** (studio name, domain, contact emails, Play Store URL, nav):
  `src/consts.ts`. This is the first file to edit.
- **Landing copy:** `src/components/Hero.astro`, `Gestures.astro`, and the
  sections inside `src/pages/index.astro`.
- **Legal pages:** `src/pages/privacy.mdx` and `terms.mdx` — plain Markdown.
  They contain `{/* CONFIRM ... */}` notes (invisible on the page) marking every
  claim you must verify against the real backend before publishing.
- **FAQ:** the `faqs` array at the top of `src/pages/support.astro`.
- **Screenshots:** add PNGs to `public/screenshots/`, then replace the
  placeholder frames in `index.astro`'s "A closer look" section.

### Design tokens

Palette and type live in **`src/styles/global.css`** under `@theme`. Change the
accent in one place:

```css
--color-accent: #4f46e5;          /* primary accent — iterate here */
--color-highlight: #fceba6;       /* the "selected text" amber */
--font-serif: "Fraunces Variable", …;  /* hero + headings */
```

Headlines use **Fraunces** (self-hosted via Fontsource, so no external font
requests); UI/body uses the system sans stack.

### Social image (OG)

Edit `public/og.svg`, then run `npm run og` to regenerate `public/og.png`
(1200×630). The PNG is what social platforms actually render. Text uses Georgia +
Segoe UI so it rasterizes consistently; tweak freely.

---

## Before you ship — checklist

These need **your** real values (search the codebase for `TODO` / `CONFIRM`):

**Identity & links** (`src/consts.ts` + `astro.config.mjs`)
- [ ] Confirm the production domain (`SITE.url` **and** `site` in `astro.config.mjs`).
- [ ] Real **support** + **privacy** email addresses you actually monitor.
- [ ] Paste the **Google Play listing URL** into `PLAY_STORE_URL`, then set
      `IS_LIVE = true` to switch the CTA out of "coming soon" mode.

**Legal — please have these reviewed**
- [ ] **Privacy:** verify every `CONFIRM` note in `privacy.mdx` matches your Go
      backend — what you send to Gemini, whether you log IPs, and your actual
      **retention windows**.
- [ ] **Gemini terms:** confirm your API tier and that the "not used to train"
      statement matches Google's current terms for that tier.
- [ ] **Terms:** set the **governing-law jurisdiction** and review the
      **liability cap** with a lawyer (`terms.mdx`).
- [ ] **Pricing / supported formats / iOS** answers in `support.astro`.

**Assets**
- [ ] Replace the placeholder screenshots in `index.astro` with real ones.
- [ ] Swap the recreated Play button for the **official Google Play badge** asset
      (Google's brand guidelines require the official badge on store-linked
      pages). See `src/components/PlayButton.astro`.

---

## Deploy

The site builds to a static `./dist` folder, so it runs on any static host. No
adapter is configured.

### Vercel (recommended)

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel → **Add New… → Project** → import the repo.
3. Vercel auto-detects Astro. Confirm:
   - **Framework Preset:** Astro
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. **Deploy.** Add your custom domain under **Settings → Domains**, and update
   `SITE.url` + `astro.config.mjs`'s `site` to match.

Security + cache headers are applied via `vercel.json`. No env vars are needed.

> CLI alternative: `npm i -g vercel && vercel` (then `vercel --prod`).

### Cloudflare Pages

1. Push to GitHub/GitLab.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages** → connect the repo.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. **Save and Deploy.**

Headers come from `public/_headers` (works on Cloudflare Pages and Netlify too).

---

## Notes

- **No cookies, no analytics, no third-party scripts** — so there's no cookie
  banner, by design. If you add analytics later, prefer a privacy-friendly,
  cookieless option and update `privacy.mdx`.
- **A stricter Content-Security-Policy** can be added to `vercel.json` /
  `_headers` once you've confirmed nothing breaks (the site has no inline
  scripts; it does use a few inline `style=""` attributes).
- `npm audit` reports a few advisories in the build toolchain (dev-only, typical
  for the Astro/Vite stack). Don't run `npm audit fix --force` — it can pull in
  breaking major versions. They don't affect the shipped static output.
