# Tech a Minute

Tech a Minute is a fast-paced quiz game where you answer as many technology questions as possible in **60 seconds**.

- **Frontend**: Pure HTML, CSS, and vanilla JavaScript
- **Backend (optional)**: Node.js + Express with a simple JSON file leaderboard
- **Deploy target**: Works fully as a static site (ideal for GitHub Pages), and can also run locally with a Node backend

---

## Features

- 60-second timer with animated progress bar
- 30 curated technology questions (programming, AI, cybersecurity, web dev, CS)
- Clean, modern, glassmorphism UI with smooth animations
- Per-question feedback (correct = green glow, wrong = red shake)
- Local **leaderboard** (top scores) stored in `localStorage`
- Optional Node backend that persists scores to `database/scores.json`

---

## Project structure

```text
tech-a-minute/
  index.html
  style.css
  script.js

  assets/
  images/
  sounds/

  server/
    server.js
    questions.js
    leaderboard.js

  database/
    scores.json

  package.json
  README.md
```

The key requirement for GitHub Pages is that `index.html`, `style.css`, and `script.js` live in the **root** of the project folder. Everything else is optional.

---

## Running locally (with Node backend)

Requirements:

- Node.js (v16+ recommended)
- npm or another Node package manager

Steps:

1. Open a terminal in the `tech-a-minute` folder:

   ```bash
   cd tech-a-minute
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Node server:

   ```bash
   npm start
   ```

4. Open the game in your browser:

   - Visit `http://localhost:3000`

The Express server:

- Serves the static frontend files from the project root
- Exposes these JSON API endpoints under `/api`:
  - `GET /api/questions` – returns all questions in random order
  - `POST /api/score` – saves a score to `database/scores.json`
  - `GET /api/leaderboard` – returns the top 10 scores

The frontend auto-detects when it is running on `localhost` and will:

- Use `/api/leaderboard` and `/api/score` for leaderboard data
- Still mirror scores into `localStorage` for resilience

If the backend is not running, the game still works using `localStorage` only.

---

## Deploying to GitHub Pages

1. Create a GitHub repository and copy the contents of the `tech-a-minute` folder into the repo.
2. Commit and push to the `main` (or `master`) branch.
3. In the repository settings, enable **GitHub Pages** and select:
   - Source: `Deploy from a branch`
   - Branch: `main` (or your default) / root directory
4. Wait for the Pages URL to become active, then open it in a browser.

On GitHub Pages:

- The site loads entirely from the static files (`index.html`, `style.css`, `script.js`).
- The leaderboard is powered by `localStorage` only (no backend required).

---

## Gameplay

1. Enter your name on the home screen.
2. Click **Start Game**.
3. Answer as many questions as possible within **60 seconds**.
4. Each correct answer increases your score; questions automatically advance.
5. When time is up, you’ll see:
   - Your final score
   - Your name
   - The **Top 10** leaderboard
6. Click **Play Again** to restart and try to beat your best score.

---

## Customization tips

- Add your own sounds into the `sounds/` folder and trigger them from `script.js`.
- Replace or extend the question set in:
  - `script.js` (frontend)
  - `server/questions.js` (backend)
- Tweak colors, gradients, and animations in `style.css` for a different visual style.

---

## License

MIT – use it, modify it, and ship your own version of Tech a Minute.

