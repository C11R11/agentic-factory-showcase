# Project Rules: Agentic Factory Showcase

## Architecture & Stack
- **Frontend:** Pure HTML5, CSS3, and Vanilla JavaScript.
- **Styling:** Use Tailwind CSS via CDN (`https://cdn.tailwindcss.com`). No local build step.
- **JavaScript:** Use ES Modules (`type="module"`). Organise logic into the `js/` directory of each iteration.
- **No Node.js:** Do not introduce `package.json`, `npm`, or any Node-based build tools.
- **Iteration Model:** The project is organized into `iterationX/` folders. Refer to `master_spec.md` for the roadmap.

## Development Workflow
- **Local Server:** Use `python3 -m http.server 8000` from the root directory. Access iterations via `http://localhost:8000/iteration1/` or `http://localhost:8000/iteration2/`.
- **Harnessing:** Each iteration includes a `harness.html`. Use it to test UI changes with mock data before committing.
- **Modifications:** 
    - When asked for "tokens only" changes, work in `iteration1/`.
    - When asked for "FinOps" or "cost" changes, work in `iteration2/`.
- **Verification:** Changes must be verified in the browser. Use the harness to ensure data injection works.

## Style Guide
- **Naming:** Kebab-case for filenames/CSS. camelCase for JS.
- **Code Structure:** Maintain separation between `index.html`, `js/app.js`, and `css/style.css`.
- **Data Integrity:** All iterations consume `.factory/index.json`. Do not break the schema.
