# Ali Shaer — Personal Portfolio

Static personal CV / portfolio site for **Ali Shaer**, M.Sc. Information Systems student at the
University of Haifa working on AI, NLP, and Large Language Models.

Hand-written HTML5, CSS3, and vanilla JavaScript. No frameworks, no bundler, no build step, no
server-side code — the files in this repository are the site, so it can be served directly by
GitHub Pages or any static host.

## Sections

- **Hero** — name, focus, primary calls to action, and links to LinkedIn, GitHub, and email
- **About** — professional summary plus an at-a-glance fact card
- **Experience** — vertical timeline of roles (MyPsychometric, University of Haifa, Magshimim AI)
- **Research** — LLM-based educational systems and research interests
- **Education** — M.Sc. and B.Sc. at the University of Haifa
- **Skills** — programming, AI & data, development tools, and spoken languages
- **Contact** — location, email, phone, and social links

## File structure

```
.
├── index.html              # the whole page
├── css/style.css           # all styles (light theme, responsive, print styles)
├── js/main.js              # mobile nav, active nav state, scroll reveal, smooth scroll
├── assets/
│   ├── cv/Ali_Shaer_CV.pdf # file served by the "Download CV" buttons
│   └── images/             # favicon and Open Graph image
├── .nojekyll              # tells GitHub Pages to serve files as-is
└── README.md
```

## Run it locally

Any static file server works. From the repository root:

```bash
python3 -m http.server 47318
```

Then open <http://127.0.0.1:47318>.

Alternatives:

```bash
npx serve .          # Node
php -S 127.0.0.1:47318   # PHP
```

Opening `index.html` directly via `file://` also mostly works, but a local server is
recommended so relative asset paths and the PDF download behave exactly as they do in production.

## Deploy to GitHub Pages

All asset paths are relative, so the site works both at a domain root and inside a repository
subdirectory. No workflow or build step is required — Pages can serve the branch directly.

### Option A — user site at `https://USERNAME.github.io`

1. Create a repository named exactly `USERNAME.github.io` (replace `USERNAME` with your GitHub
   username).
2. Push this project to that repository's default branch:

```bash
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
git push -u origin main
```

3. In the repository, go to **Settings → Pages**, set **Source** to *Deploy from a branch*, choose
   branch `main` and folder `/ (root)`, then save.
4. The site publishes at `https://USERNAME.github.io` (first build takes a minute or two).

### Option B — project site at `https://USERNAME.github.io/REPOSITORY/`

1. Push this project to any repository, e.g. `portfolio`.
2. **Settings → Pages → Source: Deploy from a branch**, branch `main`, folder `/ (root)`, save.
3. The site publishes at `https://USERNAME.github.io/REPOSITORY/` — for example
   `https://USERNAME.github.io/portfolio/`.

Because every reference in `index.html` is relative (`css/style.css`, `js/main.js`,
`assets/cv/Ali_Shaer_CV.pdf`), nothing needs to change between the two options. The `.nojekyll`
file stops Jekyll from reprocessing the output.

### Updating content

- Text, sections, and links live in `index.html`.
- Canonical GitHub / LinkedIn / email / CV values are also kept as named constants at the top of
  `js/main.js` and applied to the markup on load, so updating them in one place is enough.
- To replace the CV, overwrite `assets/cv/Ali_Shaer_CV.pdf` (keep the filename).
- A publications block is present but `hidden` in the Research section of `index.html`. Remove the
  `hidden` attribute and fill in the template entry when there is something to list.

## Accessibility and performance notes

- Semantic landmarks, a skip link, ARIA labels on icon-only controls, and visible focus rings
- Mobile menu closes on tap, on link selection, and on `Escape`, and locks background scrolling
- Scroll-reveal animations use `IntersectionObserver` and are disabled under
  `prefers-reduced-motion`; content is always revealed for printing and full-page captures
- System font stack — no web-font requests, no third-party scripts, no network dependencies
