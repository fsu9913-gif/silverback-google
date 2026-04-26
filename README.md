# silverback-google

A simple static site configured for deployment on [Vercel](https://vercel.com).

## Deploying to Vercel

### Option 1 — Import via the Vercel Dashboard (recommended)

1. Push this repository to GitHub (it's already there if you're reading this).
2. Go to <https://vercel.com> and sign in (or create a free account).
3. Click **"Add New Project"**.
4. Select **"Import Git Repository"** and choose `silverback-google`.
5. Leave all settings at their defaults — Vercel will detect `vercel.json` automatically.
6. Click **"Deploy"**. Your site will be live in seconds.

### Option 2 — Deploy with the Vercel CLI

```bash
# Install the CLI (once)
npm install -g vercel

# Inside the repo directory, run:
vercel

# Follow the prompts to link your Vercel account and project.
# For production deployment:
vercel --prod
```

### Continuous deployment

Once the project is imported, every push to the `main` branch (or any pull-request branch) triggers a new deployment automatically — no extra configuration needed.

## Project structure

```
.
├── index.html   # Main entry point served by Vercel
└── vercel.json  # Vercel routing / build configuration
```
