---
title: Website working notes
date: 2025-05-23
category: Website
description: Some notes and tasks for building the site
tags: [tech, test, blogpost]
image: /assets/img/photos/desert-arch.jpg
layout: layouts/article.njk
---

### General Site
- [ ] Add noise to main bg maybe
- [ ] Find out if any font options such as old style numerals are available for EB Garamond
- [ ] Ensure page-specific style sheets are applied hierarchically without polluting ns
- [ ] Define additional svg glyphs and an accent font to use potentially
- [x] Remove old normal css that isn’t used anymore (should be all)

### Server-specific
- [ ] Fix 404 redirects on prod
- [ ] Run API backend for utils like contact form submission

### Header & Footer
- [ ] Fix burger icon coloration in dark mode (and light mode tbh)
- [ ] Fix burger menu header on sm --- use a two-col layout for compactness
- [ ] Fix footer text color, use Olympic flag?
- [ ] Somehow find a better place for light/dark button?
- [ ] Adjust header/footer to use auto-gen colors {e.g. darken()}
- [ ] Extract components like header/footer to separate njk files

### Home page/common pages
- [ ] Somehow create a home landing page
- [ ] Fix up 404 page

### Blog
- [ ] Allow searching by tags (blog), and having collections and tags themselves showing in results and creating routes for them, e.g. blog/tags/educational
- [ ] Generally fix up blog styling, esp. indexing pages. 
- [x] Add a better test article with all possible features of the md & set styling
- [ ] Add at least one real article on it
- [ ] Fix line wrapping on task lists
- [ ] Later -- find out how to add tooltips to the footnotes.

### About/ section
- [ ] Generally fix up about/ page
- [x] Reduce l/r margins on mobile for resume and about routes
- [x] Reduce font size for name on resume page on mobile to allow single line.