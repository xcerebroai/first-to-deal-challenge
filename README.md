# First to Deal — 3-Day Challenge (DealMachine AI Edition)

A Matrix-themed landing page for the **First to Deal Challenge**: a 3-day live
real estate challenge powered by DealMachine's newest AI systems. Built with
Vite + React + Tailwind + Motion, and it builds to a single self-contained
`index.html` (all CSS, JS, and images inlined) that works at any URL.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # → dist/index.html (self-contained)
npm run preview    # preview the built file
```

## Edit the content

Everything you'll change per launch lives in **`src/challenge/config.ts`**:

| Setting | What it is |
| --- | --- |
| `WEBHOOK_URL` | Your GoHighLevel **Inbound Webhook** URL (the opt-in form POSTs here) |
| `HOST_NAME` / `HOST_HANDLE` | Your name + handle (shown in the Host section + footer) |
| `DAYS` | The three live days (labels + dates) |
| `REGISTRATION_CLOSES` | Countdown deadline (`YYYY-MM-DDTHH:MM:SS`, local time) |
| `HERO_IMAGE` | Optional hero image URL (or drop a file — see below) |

**Images** — drop files here and they're auto-detected and inlined:

- Hero backdrop: `src/assets/challenge-hero.(png|jpg|webp)`
- Host portrait: `src/assets/challenge-host.(png|jpg|webp)`

### GoHighLevel form setup

1. GHL → **Automation → Workflows → Create Workflow**
2. Trigger: **Inbound Webhook** → copy the URL → paste into `WEBHOOK_URL`
3. Map `{{inboundWebhookRequest.firstName}}` / `.email` / `.phone` to a
   **Create/Update Contact** action; add a tag and your email/SMS follow-up.
4. Send a live test and confirm the contact lands.

## Deploy (GitHub Pages)

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes
`dist/` to GitHub Pages. Enable it once under **Settings → Pages → Source:
GitHub Actions**. GitHub Pages requires the repo to be **public** (or a paid
plan for private Pages).
