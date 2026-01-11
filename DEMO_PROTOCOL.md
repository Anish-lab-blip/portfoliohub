# DEMO PROTOCOL

## Adding a New Project
To add a new project to this portfolio, follow these steps strictly:

1. **Create Directory**: Create a unique folder in `/public/demos/`.  
   Example: `/public/demos/my-new-app/`

2. **Add Metadata**: Create an `info.json` file inside that folder.
   
   **Required JSON Structure:**
   ```json
   {
     "title": "Project Name",
     "summary": "A short, punchy 1-2 sentence description.",
     "tags": ["Tech1", "Tech2"]
   }
   ```

3. **Add Content**: Place your static HTML/CSS/JS files inside the folder.
   - Entry point MUST be `index.html`.
   - All asset links (images, css) inside your demo must be relative (e.g., `./style.css` NOT `/style.css`).

4. **Verify**: The Auto-Scanner will automatically detect this folder and render a card on the homepage. No code changes to `home.ejs` or `api/index.js` are required.

## Style Guide for Demos
- Since the main site is dark mode/glassmorphism, try to make demo thumbnails or open graph images match the vibe if possible (future feature).
