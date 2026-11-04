# Ali Shaer

Personal site for Ali Shaer, a software engineer and Information Systems M.Sc. student at the University of Haifa. He works on artificial intelligence, natural language processing, and large language models, including LLM-based learning systems and applied machine learning.

## What this site is

A single-page CV and portfolio: selected projects, background, experience, research, education, skills, and contact. Email, LinkedIn, and GitHub stay on the page.

The projects linked from the top of the site:

- [stone_llm](https://github.com/aligranett/stone_llm) — inquiry-learning study interface with an LLM research partner
- [adaptive-cpu-chip-test-rl](https://github.com/aligranett/adaptive-cpu-chip-test-rl) — reinforcement learning for adaptive CPU chip testing
- [neat](https://github.com/aligranett/neat) — Python implementation of the NEAT neuroevolution algorithm

## Tech stack

HTML, CSS, and vanilla JavaScript. No framework, bundler, or build step. The files in this repository are the site, so any static host (including GitHub Pages) can serve them as-is.

## View it locally

From the repository root:

```bash
python3 -m http.server 47318
```

Then open <http://127.0.0.1:47318>.

`npx serve .` works the same way. A local server keeps CSS, JavaScript, and the CV download on the same relative paths they use in production.
