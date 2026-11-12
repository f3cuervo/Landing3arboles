# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page landing for **Tres Árboles** (AI automation for companies; first project: Autonom IA). Spanish only, no backend, no CMS, no animation libraries. The behavioral contract lives in OpenSpec: `openspec/specs/` (after archive) or `openspec/changes/<change>/specs/` while a change is in flight — capabilities `brand-theme`, `landing-layout`, `motion-effects`, `media-assets`. Check those specs before changing visible behavior; use `/opsx:propose` for new changes.

## Commands

- `npm run dev` — Vite dev server with HMR
- `npm run build` — `tsc -b` type-check, then `vite build` to `dist/`. Type errors fail the build.
- `npm run lint` — ESLint over the whole repo
- `npm run preview` — serve `dist/` on :4173
- Lighthouse (desktop, acceptance bar: a11y ≥ 95, perf ≥ 90): `npx lighthouse http://localhost:4173/ --preset=desktop --only-categories=accessibility,performance` against `npm run preview`

There is no test runner; verification is build + lint + browser checks + Lighthouse.

## Architecture

- **`src/content.ts` is the single source of all copy, URLs, placeholders and media paths.** Sections never hardcode text. Pending data stays in brackets (`[por definir]`); social links with `url: null` point to `#contacto`. Headlines are stored *without* the final period — components append `<span class="ta-dot">.</span>` (terracotta).
- `src/sections/*` are layout only (header, hero, strip, about, projects, contact, footer); `App.tsx` composes them in spec order. Section h2s go through `SectionHeading` (binary index label + `GlitchHeading` + the terracotta dot).
- Effects are encapsulated in `src/components/` + `src/hooks/`:
  - `useScramble(text, { duration })` → `{ display, run }`: left-to-right decode from random 0/1 in ~30 ms quantized frames; only letters/digits mutate.
  - `GlitchTitle` (h1 decode 1100 ms + slice glitch, 260 ms tick every 7 s), `GlitchHeading` (section h2s: subtle 200 ms glitch every 20 s, only while visible; shares the `.ta-glitch__layer` markup with the `--subtle` modifier), `BitButton` (anchor styled as button; variants `primary | secondary | outline`), `BitLink` (variants `nav | row`; both decode their label in terracotta on hover/focus; `row`'s bit line is the label's real 8-bit binary, revealed one byte per step, while `nav` keeps the fixed `BIT_LINE`), `LoopVideo` (WebM→MP4 sources, plays only while intersecting).
  - `usePrefersReducedMotion` (`useSyncExternalStore` + `matchMedia`) gates all JS motion and video playback; `effects.css` also kills transitions/animations under the media query.
- Styles are global plain CSS with a `ta-` class prefix, imported in `main.tsx` in this order: `tokens.css` → `base.css` → `layout.css` → `effects.css`. Because `effects.css` loads last, a layout rule overriding an effects class needs higher specificity (e.g. `.ta-link.ta-link--row`). Single responsive breakpoint: `max-width: 899px`.

## Conventions that are easy to break

- **Motion is always stepped**: `steps(n)` or discrete state changes only — never `ease`, `ease-in-out` or `cubic-bezier` (`grep -rnE "ease|cubic-bezier" src/styles` must be empty). No smooth scrolling.
- **Colors only from `--ta-*` tokens.** `--ta-accent` (#CC5A31) and `--ta-ink-2` (#847B71) are deliberately lighter than the original brand hexes to reach 4.5:1; text on a terracotta fill is always `--ta-bg`; `--ta-ink-1` is for decorative bits only, never readable text.
- No border radius, no blurred shadows, no decorative gradients; 1px lines (`--ta-line`).
- **Animated/mutating text is `aria-hidden`** with the real text on the element via `aria-label` (h1, `BitButton`). Elsewhere let the accessible name come from visible text (WCAG 2.5.3). Decorative bit strings are rendered via `.ta-bits::before { content: attr(data-bits) }` so they don't count as text in audits.
- Interactive elements keep a 44px minimum target; no horizontal scroll from 360px.

## Media

- Static files in `public/media/{hero,strips,cards,projects}/`, referenced from `media` in `content.ts` (no extension for videos) and resolved with `import.meta.env.BASE_URL` — never imported from `src/`.
- Every video ships `.webm` (VP9, no audio) + `.mp4` fallback (H.264, `-movflags +faststart`); the hero also has `tres-arboles-poster.webp` (preloaded in `index.html`).
- **When replacing a video, publish it under a new name (`*.v2.webm` / `*.v2.mp4`) and update `content.media`** — never overwrite in place (cache).
- WebM heights must be multiples of 8: Chrome renders a green top row on VP9 at 1440×900, so the hero WebM is 1440×896 (`-vf crop=1440:896:0:2`). Encoding reference: `ffmpeg -i X.mp4 -c:v libvpx-vp9 -b:v 0 -crf 33 -row-mt 1 -an X.webm`.
- Card headers are a 64px band: the 840×128 video is shrunk to the band height (never cropped vertically) and repeated as 3 `LoopVideo` copies with `startAt` offsets (`TILE_OFFSETS` in `About.tsx`) to cover the width; clipped copies stay paused via the IntersectionObserver. All videos set `disablePictureInPicture`.
- The Autonom IA card uses `projects/autonomia-loop.*` (1080×896, labelled, no poster) as its cover; the text column sets the card height (with a `clamp()` minimum) and the video is `object-fit: contain` — its background is `--ta-bg`, so the side margins are invisible.
- `cards/card-procesos-loop.*` is currently a copy of the productos video, pending the real asset.
