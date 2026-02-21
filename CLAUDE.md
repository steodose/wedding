# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A static wedding website for Danielle & Stephan. No build step, no package manager, no framework — plain HTML/CSS/JS opened directly in a browser or served via GitHub Pages.

## Running Locally

Open `index.html` directly in a browser. No server required for any page except RSVP form submission (which hits Formspree and requires a real endpoint to be configured).

To preview with a local server (avoids any file:// quirks):
```
python3 -m http.server 8080 --directory /Users/Stephan/wedding
```

## Architecture

**Shared navigation** is injected via `js/nav.js` — it writes the `<nav>` HTML into the DOM at runtime. Every page has `<div id="nav-root"></div>` and loads `nav.js`. Active nav link is driven by `data-page="..."` on the `<html>` element of each page.

**Scroll animations** use Intersection Observer in `js/scroll-animations.js`. Add class `fade-in` to any element or `fade-in-group` to a container to animate children in sequence on scroll.

**RSVP form** (`js/rsvp.js`) submits async to Formspree. The form action URL in `rsvp.html` must be updated to a real Formspree endpoint (`https://formspree.io/f/YOUR_ID`). Guest fields toggle visibility based on the attending radio buttons.

**CSS is split into two files:**
- `css/main.css` — design tokens (CSS custom properties), reset, typography, nav, footer, shared utilities
- `css/pages.css` — all page-specific layouts (hero, timeline, gallery, lightbox, RSVP form, registry cards)

All colors, fonts, and spacing are defined as CSS custom properties in `:root` in `main.css` — change tokens there to retheme the whole site.

## Name Ordering

Names are ordered **Danielle & Stephan** (not Stephan & Danielle) throughout all files. Keep this consistent when editing.

## Adding Photos

- Hero photo: `images/hero.png` (already wired up in `index.html`)
- Gallery: replace `.gallery-placeholder` divs in `gallery.html` with `<img>` tags — lightbox activates automatically for any `<img>` inside `.gallery-item`
- Timeline: replace `.photo-placeholder` divs in `our-story.html` with `<img>` tags

## Deployment

Push to GitHub, enable Pages on the `main` branch (root directory). No build step needed.
