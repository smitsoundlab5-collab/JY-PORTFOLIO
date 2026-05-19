# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-page static portfolio site for a sound designer. Pure HTML/CSS/vanilla JS — no build step, no dependencies, no package manager.

## Development

Open `index.html` directly in a browser, or serve it locally to avoid any browser security restrictions on video autoplay:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Architecture

Three files, each with a clear responsibility:

- **`index.html`** — All markup. Sections in order: Hero → About → Process → Projects → Contact → Footer. Project card `<video>` sources are commented out (placeholders only).
- **`style.css`** — Design tokens defined as CSS custom properties in `:root` at the top (`--bg`, `--accent`, `--text`, etc.). BEM-like class naming (`.project-card__video`, `.nav__link--cta`). Responsive breakpoints at 1024px and 768px, plus a `prefers-reduced-motion` block at the bottom.
- **`script.js`** — Six self-contained IIFEs, each labelled with a comment: year setter, nav scroll/burger/active-highlight, IntersectionObserver reveal, typing effect, video-on-hover for project cards, and a smooth-scroll JS fallback.

## Customization Checklist

All placeholder values that need replacing before publishing:

| Location | Placeholder | Replace with |
|---|---|---|
| `index.html` title & meta | `Your Name` | Actual name |
| `index.html` nav logo | `YN` | Initials |
| `index.html` contact | `your@email.com` | Real email |
| `index.html` contact | `https://github.com/` | Real GitHub URL |
| `index.html` `<video>` sources | commented-out `<source>` tags | Actual `videos/*.mp4` files |
| `style.css` `:root` | `--accent: #c8ff00` | Brand color if different |

## Adding a Project Card

Copy an existing `<article class="project-card">` block in `index.html`. Uncomment the `<source>` tag and point it at your video file. The JS in `initProjectVideos()` automatically wires up hover-to-play for any `.project-card` that contains a `.project-card__video`.

## Reveal Animation

Any element with class `reveal` starts invisible (`opacity: 0; transform: translateY(28px)`) and becomes visible when it enters the viewport (IntersectionObserver adds `is-visible`). Add `reveal` to new elements to opt in.
