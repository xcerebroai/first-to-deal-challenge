/**
 * First to Deal Challenge — DealMachine AI Edition.
 * One place to edit every detail that changes per launch: your registration
 * link, host name, the three live days, and the countdown deadline.
 *
 * The CTAs open REGISTER_URL in a new tab (target="_blank"), since a
 * GoHighLevel / LeadConnector opt-in form usually can't be framed if this
 * page is embedded elsewhere.
 */

/** Where "Take the Red Pill" / "Join the Challenge" send the visitor.
 *  Used only as a fallback if you turn the on-page form off. */
export const REGISTER_URL = 'https://your-registration-link.com'

/**
 * On-page registration form → GoHighLevel inbound webhook. When set, the form
 * in the Register section POSTs each signup here with these fields: firstName,
 * lastName, email, phone, source, submittedAt.
 *
 * GHL setup: Automation → Workflows → new workflow → trigger "Inbound Webhook"
 * → copy the webhook URL → paste it below. In the workflow, reference the
 * fields as {{inboundWebhookRequest.firstName}} / .email / .phone and add a
 * "Create/Update Contact" action (plus a tag like "First to Deal Challenge").
 *
 * Transport note: GHL webhooks don't send CORS headers, so the form fires a
 * "simple" request — mode:'no-cors' + form-urlencoded body — which needs no
 * preflight and reaches GHL reliably from a static page. The response is opaque,
 * so the form optimistically shows success once the request fires. Always send
 * one live test and confirm the contact lands before you go public.
 */
export const WEBHOOK_URL = 'https://your-webhook-url.com'

/** Who's running it (shown in the Host section + footer). */
export const HOST_NAME = 'Q Flores'
export const HOST_HANDLE = '' // optional @handle; leave '' to hide

/** YouTube video shown in the Host bio. Paste the video ID or full URL; '' hides it. */
export const HOST_VIDEO = 'FhgyAGu-Gaw'

/** Brand shown in the nav + footer. */
export const BRAND = 'FIRST TO DEAL'

/**
 * Hero background image (the "scan effect" backdrop). Easiest: drop a file at
 * src/assets/challenge-hero.(png|jpg|jpeg|webp) — it's auto-detected and inlined
 * into the build, no edit needed here. Alternatively paste a full https URL
 * below. Leave everything empty and the hero falls back to a clean binary-rain
 * background, so the page never breaks if you haven't added an image yet.
 */
export const HERO_IMAGE = ''

/** The live days. Edit the labels freely — they're displayed verbatim. */
export const DAYS = [
  { n: 1, label: 'Day 1', when: 'Wednesday, Aug 5 · 12 PM CST' },
  { n: 2, label: 'Day 2', when: 'Thursday, Aug 6 · 12 PM CST' },
]

/**
 * Countdown deadline ("REGISTRATION CLOSES IN"). Local time of the viewer.
 * Format: 'YYYY-MM-DDTHH:MM:SS'. Set this to just before your Day 1 start.
 */
export const REGISTRATION_CLOSES = '2026-08-05T12:00:00'
