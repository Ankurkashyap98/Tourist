# Trip Departure - Luxury Boutique Travel Agency Website

A state-of-the-art, high-converting, and luxury travel agency website built strictly with **pure HTML5, Vanilla CSS3, and JavaScript**. Inspired by [Trip Departure](https://tripdeparture.in/) (Jammu-based travel specialist), but elevated with modern UI aesthetics, rich micro-animations, interactive day-wise itineraries, live package filtering, responsive mobile optimization, and clean extensionless routing.

---

## 📁 Architecture & File Structure

```
d:\vinay\
├── index.html                 # Homepage (3D depth Hero, Live Ticker, Bento Grid, Packages, Testimonials, FAQ, Lead Form)
├── packages.html              # Dedicated Holiday Packages Portal (Live Sidebar Filters, Seasonal Matrix, 4-Step Booking, Corporate Banner, Package FAQs)
├── about.html                 # About Us Page (Jammu Heritage, 4 Quality Pillars, Leadership Team, 2018-2026 Timeline, Photo Masonry)
├── contact.html               # Contact Page (Office in Jammu 322/D Shiv Nagar, Interactive Form, Google Map & Landmark Guide, Agency Comparison)
├── .htaccess                  # Apache URL Rewrite rules for clean extensionless URLs (no .html, redirects index.html to /)
├── assets\
│   ├── css\
│   │   ├── style.css          # Core design tokens, CSS variables, typography & layout grid
│   │   ├── components.css     # Modular styles for Single Header, Cards, Buttons, FAQ, Modals, Forms & Footer
│   │   └── animations.css     # CSS keyframes, 3D card transforms, light sweeps, pulse glows & hover effects
│   └── js\
│       └── main.js            # Client-side dynamic engine (Package rendering, itinerary modal, clean router fallback, toast alerts)
└── README.md                  # Documentation and deployment guide
```

---

## 🌟 Key Features & Innovations

1. **Single Unified Luxury Header**:
   - Clean, sticky header across all pages.
   - Integrated with direct call button (`+91 8899544803`), responsive dropdown menus for Domestic & International packages, and instant `Plan A Trip` CTA.
   - No duplicate announcement bars or double headers.

2. **Clean Extensionless Routing (`.htaccess` & Offline Local Support)**:
   - All internal links use clean semantic routes: `/`, `/packages`, `/about`, `/contact`.
   - `.htaccess` removes `.html` extensions automatically and redirects `/index.html` to root `/`.
   - `assets/js/main.js` includes an automatic `initCleanLinks()` router so double-clicking `.html` files for offline `file:///` previews also works seamlessly without 404 errors.

3. **Multi-Section Rich Content Across Every Page (Client-Ready)**:
   - **`index.html`**: 9 rich sections including 3D Hero, Live Marquee Ticker, Handcrafted Packages, Bento Destinations, Quality Guarantees, Testimonials, and FAQ.
   - **`packages.html`**: 7 rich sections including Live Search & 8 Category Navigation Pills, Dynamic Sidebar Filter & Sort, Seasonal "When to Visit What" Travel Matrix, 4-Step Hassle-Free Booking Experience, 15+ Guest Corporate Offsite Banner, and Package Transparency FAQ.
   - **`about.html`**: 7 rich sections including Heritage Banner, Origin Story at 322/D Shiv Nagar, 4 Core Quality Guarantees, Leadership & Mountain Captain Profiles, 2018–2026 Milestones, and Masonry Travel Photo Gallery.
   - **`contact.html`**: 6 rich sections including Direct 4-Card Contact Grid, Custom Tour Itinerary Lead Capture Form, Google Maps Embed with Landmark Distance Table, Agency vs Online Aggregator Comparison, and 24x7 Emergency Help Desk.

4. **Interactive Day-by-Day Itinerary Modal & Instant Booking**:
   - Clicking **"Itinerary"** on any tour card opens a day-by-day modal complete with real hotels, route highlights, inclusions, and exclusions.
   - Clicking **"Book Package"** opens a fast lead modal pre-filled with the selected tour.

5. **Direct Lead Capture & WhatsApp Integration**:
   - Floating WhatsApp button with pre-filled tour inquiry messages directly linked to `+91 8899544803`.
   - Direct call CTAs for quick mobile conversions.

---

## 📍 Business Details (Trip Departure)
- **Brand Name**: Trip Departure
- **Location**: 322/D Shiv Nagar, Jammu, Jammu & Kashmir – 180001
- **Phone**: +91 8899544803
- **Email**: contact@tripdeparture.in
- **Top Destinations**: Kashmir (Srinagar, Gulmarg, Pahalgam), Ladakh (Leh, Nubra, Pangong), Himachal (Manali, Shimla), Kerala (Munnar, Alleppey), Rajasthan, Goa, Dubai, Bali.

---

## 🚀 How to Run & Deploy

### A. Preview Locally with VS Code Live Server
- Right-click `index.html` in VS Code and choose **"Open with Live Server"** (or open `http://127.0.0.1:5500/index.html`).
- All internal links point directly to `.html` files (`packages.html`, `about.html`, `contact.html`).
- Extensionless routes (`/packages`, `/about`, `/contact`) are also handled with automatic local redirect shims so you will never see a `Cannot GET` 404 error.

### B. Preview Offline (Direct File)
- Double-click `index.html` in Windows Explorer to open it in Chrome, Edge, Firefox, or Safari.
- All pages and links navigate smoothly via direct relative links.

### C. Deploy to Web Server (cPanel, Apache, Nginx, Hostinger, GoDaddy)
- Upload all files including `.htaccess` to your `public_html` root directory.
- The `.htaccess` file handles clean URLs and redirects:
  - `https://yourdomain.com/`
  - `https://yourdomain.com/packages`
  - `https://yourdomain.com/about`
  - `https://yourdomain.com/contact`
