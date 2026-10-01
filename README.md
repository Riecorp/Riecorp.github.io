# SPAXA
Static English website for SPAXA and its first product, ORXA.

## Structure and deployment
This remains the existing HTML/CSS/JavaScript GitHub Pages project. No framework, package manager, build step or external dependency is required.
The current repository, Pages source and public hostname are deliberately unchanged.
The existing hostname contains the former account name; it is infrastructure, not website branding.

- `index.html`: company landing page and full ORXA overview
- `orxa.html`: dedicated product page with product-specific metadata
- `information.html`: contact availability and clearly incomplete legal information
- `style.css`: shared responsive presentation and reduced-motion support
- `script.js`: progressively enhanced navigation and local controller concept preview
- `assets/spaxa-icon.svg`: typographic favicon
- `assets/spaxa-social.png`, `assets/orxa-social.png`: brand-specific social previews
- `assets/the-gorge-project.png`: preserved development screenshot under Experiments
- `.nojekyll`: existing GitHub Pages static publishing configuration

Serve this folder with any static HTTP server, for example `python -m http.server 4173`.
There are no existing build, lint or test commands in this repository.

## Publication state
ORXA SDK, App and Web are in development. Studio, documentation, registration and public developer access are coming soon. Proposed engine integrations are marked Planned.
Controller inputs are local UI demonstrations only: no network sessions, device sensors, haptics, SDK functionality or registration backend are implemented.
No analytics, cookies, browser storage or third-party embeds are used by the website.

## Outstanding owner information
A new contact address and provider name/address have not yet been supplied.
Contact, privacy and imprint sections explicitly disclose their incomplete status. Do not treat the information page as completed legal documentation.
Do not enable registrations or publish release/performance claims without verified product availability.

## Compatibility
Existing anchors `#projects`, `#the-gorge`, `#technologies`, `#about`, `#contact`, `#top` and `#main-content` remain valid.
Assets and styles use relative paths, compatible with direct static hosting.
