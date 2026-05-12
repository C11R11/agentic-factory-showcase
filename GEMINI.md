# Project Rules: Agentic Factory Showcase

## Architecture & Stack
- **Frontend:** Pure HTML5, CSS3, and Vanilla JavaScript.
- **Styling:** Use Tailwind CSS via CDN (`https://cdn.tailwindcss.com`). No local build step.
- **JavaScript:** Use ES Modules (`type="module"`). Organise logic into the `js/` directory.
- **No Node.js:** Do not introduce `package.json`, `npm`, or any Node-based build tools (Vite, Webpack, etc.).
- **Data:** The dashboard consumes `.factory/index.json`. Always ensure backward compatibility with this schema.

## Development Workflow
- **Local Server:** Use `python3 -m http.server 8000` from the `dashboard/` directory.
- **Harnessing:** Use `harness.html` to test UI changes with mock data before committing to the main `index.html`.
- **Modifications:** When modifying `index.html`, ensure all styles are either Tailwind classes or defined in `css/style.css`. Avoid inline styles.
- **Verification:** Changes must be verified by opening the dashboard in a browser. Use the console for debugging.

## Style Guide
- **Naming:** Use kebab-case for filenames and CSS classes. Use camelCase for JavaScript variables and functions.
- **Code Structure:** Keep `index.html` as the entry point. Extract complex logic into `js/` and styles into `css/`.
- **Accessibility:** Ensure high contrast and proper ARIA labels where applicable.
