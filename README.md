# Sujith Reddy Gade — Portfolio

A React + Vite portfolio with a small Express API and SQLite-backed contact form.

## Run locally

Requires Node.js 22.5 or newer (the API uses Node's built-in SQLite driver).

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The Vite dev server proxies `/api` requests to the API on port `3001`.

## Contact messages

Submitting the contact form sends a `POST /api/messages` request to the Express API. Every valid message is saved in the local SQLite database at `data/portfolio.db` in the `contact_messages` table.

When Gmail SMTP is configured, the API also sends an email notification to `CONTACT_EMAIL`. The visitor's email is used as `replyTo`, so you can reply directly from Gmail.

### Configure Gmail delivery locally

1. Enable 2-Step Verification on the Gmail account that will send the notifications.
2. Create a Gmail App Password for this portfolio. Do not use the normal Gmail password.
3. Copy `.env.example` to `.env` and replace `SMTP_PASS` with the generated App Password.
4. Restart the server with `npm run dev`.

The `.env` file is ignored by git and must never be committed. For a deployed backend such as Render, add the same variables in the service's Environment settings instead of uploading `.env`.

If SMTP is not configured or Gmail rejects the message, the submission is still saved in SQLite and the form shows an error instead of claiming that an email was sent.

The API also exposes:

- `GET /api/health` — simple server health check
- `POST /api/messages` — validates, stores, and emails a contact message

## Free deployment with GitHub Pages + Render

The public portfolio URL is designed to come from GitHub Pages:

```text
https://sujithreddygade86-dot.github.io/sujith-reddy-portfolio/
```

GitHub Pages hosts the React frontend. Render runs the Express API, SQLite storage, and Gmail contact notifications in the background because GitHub Pages cannot run Node.js server code.

### 1. Push the project to GitHub

Create a repository named `sujith-reddy-portfolio` and push the `main` branch.

### 2. Deploy the API on Render

In Render, choose **New → Blueprint**, select the repository, and let Render read `render.yaml`. Add these private environment variables:

- `SMTP_USER` — `sujithreddygade86@gmail.com`
- `SMTP_PASS` — your Gmail App Password

After deployment, copy the Render service URL, for example `https://your-api.onrender.com`.

### 3. Set the GitHub Pages API variable

In GitHub, open **Settings → Secrets and variables → Actions → Variables**, choose **New repository variable**, and add:

```text
Name: VITE_API_URL
Value: https://your-api.onrender.com
```

Do not add a trailing slash to the value.

### 4. Enable GitHub Pages

Open **Settings → Pages** and select **GitHub Actions** as the source. The workflow at `.github/workflows/deploy-pages.yml` will build and publish the site after every push to `main`.

The GitHub Pages build uses `/sujith-reddy-portfolio/` as its base path, and the resume link is adjusted automatically for that path.

The free Render service can sleep when idle and wake on the next API request. The SQLite database is local to Render and is not durable across every free-service restart or redeploy, so Gmail delivery is the reliable copy of contact submissions.

## Portfolio sections

The site now uses a dark, animated visual system with a sticky responsive navigation bar and sections for:

- About, education, and quick profile stats
- Technical skills across Java, Spring Boot, React, JavaScript, SQL, HTML/CSS, and Git/GitHub
- Resume-based featured projects: AI English Speaking Platform and LearnFlow
- Contact form backed by the local Express + SQLite API
- Direct email, phone, LinkedIn, GitHub, and WhatsApp links

The contact form still posts to `/api/messages` and stores validated messages in `data/portfolio.db` during local development.
