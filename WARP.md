# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a static marketing website for PEAD Soluções em Soldas (PEAD Welding Solutions), a company specializing in HDPE pipe welding, infrastructure, and sanitation. The site is built with vanilla HTML, CSS, and JavaScript, and includes two contact form implementations:

1. **WhatsApp integration** (currently active via `whatsapp-form.js`)
2. **EmailJS integration** (via `emailjs-config.js`)
3. **Node.js backend** (optional, via `server.js` with nodemailer)

The site is deployed to GitHub Pages automatically on pushes to the `main` branch.

## Development Commands

### Running Locally

**Static site (no backend):**
- Open `index.html` directly in a browser
- Or use any static server: `python -m http.server 8000` or `npx serve`

**With Node.js backend (for nodemailer email sending):**
```powershell
npm install
npm start
```
Server runs on `http://localhost:3000`

### Deployment
- The site automatically deploys to GitHub Pages on push to `main`
- Two workflows exist: `static.yml` (active) and `jekyll-gh-pages.yml` (backup)
- No build step required - all files are served as-is

## Architecture & Code Structure

### Contact Form System (Dual Implementation)
The project has **three** contact form approaches, creating potential conflicts:

1. **`whatsapp-form.js`** (loaded in HTML, currently active)
   - Opens WhatsApp Web with pre-filled message
   - Number configured: `5512992236923`
   - Requires form with ID `contato-form` and fields: `nome`, `empresa`, `assunto`, `mensagem`

2. **`emailjs-config.js`** (NOT loaded in HTML, dormant)
   - Sends emails via EmailJS service
   - Configured with live credentials (PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID)
   - Sends to: `githubpll@gmail.com`
   - Same form ID requirement: `contato-form`

3. **`script.js`** (loaded in HTML, but EmailJS code inactive)
   - Contains old/template EmailJS code with placeholder credentials
   - Code at lines 69-118 will NOT execute without EmailJS library loaded in HTML
   - Contains other essential functionality (navigation, animations, carousel)

**CONFLICT:** Both `whatsapp-form.js` and `emailjs-config.js` listen to the same form submit event. Currently, only WhatsApp works because EmailJS config is not loaded in `index.html`.

### Key Files
- **`index.html`** - Main page, single-page layout with sections
- **`stylles.css`** - All styles (note: typo in filename "stylles")
- **`script.js`** - Navigation, scroll animations, carousel, old EmailJS template code
- **`whatsapp-form.js`** - Active WhatsApp contact integration
- **`emailjs-config.js`** - Dormant EmailJS configuration (not loaded in HTML)
- **`server.js`** - Optional Express backend for email via nodemailer
- **`.env.example`** - Template for SMTP configuration (for server.js)

### Page Sections (Anchor Links)
- `#hero` - Hero section
- `#sobre-pead` - What is PEAD (HDPE)
- `#beneficios` - Benefits grid
- `#setores` - Industry sectors
- `#quem-somos` - About us
- `#servicos` - Services
- `#produtos` - Products
- `#cases` - Case studies / Portfolio carousel
- `#clientes` - Clients
- `#contato` - Contact form

### Animations
- Uses `IntersectionObserver` for scroll-based animations
- Animation classes: `animate-slide-left`, `animate-slide-right`, `animate-slide-up`, `animate-delay-*`
- Portfolio carousel has infinite scroll with auto-advance and mouse drag

## Contact Form Configuration

### To Switch to EmailJS (instead of WhatsApp):
1. Remove `<script src="whatsapp-form.js" defer></script>` from `index.html`
2. Add EmailJS library: `<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>`
3. Add `<script src="emailjs-config.js" defer></script>` to `index.html`
4. Credentials are already configured in `emailjs-config.js`

### To Use Node.js Backend:
1. Create `.env` file based on `.env.example`
2. Update form action/handler to POST to `/send-email`
3. Configure SMTP credentials in `.env`
4. Run `npm start` to start the server

### Form Field Requirements
The form must have:
- `id="contato-form"` on the `<form>` element
- `id="nome"` - Name field
- `id="email"` - Email field (not required for WhatsApp)
- `id="empresa"` - Company field (optional for WhatsApp)
- `id="assunto"` - Subject field (only for WhatsApp)
- `id="mensagem"` - Message textarea
- `id="status"` - Status message display element

## Important Notes

### Environment-Specific Behavior
- Site is designed for Brazilian Portuguese (`pt-BR`)
- Uses Windows-style line endings (CRLF)
- WhatsApp number includes Brazil country code (+55)

### Sensitive Data Warning
The repository contains **live credentials** in `emailjs-config.js`:
- EmailJS Public Key: `F4lffGxGE6CJgJI0W`
- Service ID: `service_cj1cmrw`
- Template ID: `template_iimfkvr`

These should ideally be moved to environment variables or a `.env` file that's git-ignored.

### CSS Filename Typo
The stylesheet is named `stylles.css` (with double 'l'). This is intentional based on existing references and should be preserved.

### Deployment Workflows
Two GitHub Actions workflows exist but likely conflict:
- `static.yml` - Deploys entire directory as-is
- `jekyll-gh-pages.yml` - Builds with Jekyll first

Recommend keeping only one active to avoid deployment conflicts.

## Common Tasks

### Adding New Sections
1. Add section HTML in `index.html` with unique `id`
2. Add nav link in `.nav-list` (line 28-40)
3. Add scroll animation classes if desired: `animate-slide-*`
4. Update `script.js` navigation handler if special behavior needed

### Modifying Contact Destination
- **WhatsApp:** Change `WHATSAPP_NUMBER` in `whatsapp-form.js:3`
- **EmailJS:** Change `to_email` in `emailjs-config.js:53`
- **Backend:** Change `TO_EMAIL` in `.env`

### Styling Updates
All CSS is in `stylles.css`. Key classes:
- `.hero`, `.hero-grid` - Hero section layout
- `.section`, `.section-destaque` - Section containers
- `.card` - Reusable card component
- `.btn`, `.btn-primary`, `.btn-outline` - Button styles
- Animation classes start with `animate-`
