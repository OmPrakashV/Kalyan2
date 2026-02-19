# Design: Urgent Consultation Path

**Date:** 2026-02-19
**Status:** Approved

## Problem

A patient who has just received a cancer diagnosis lands on the website in a high-anxiety state. The current page offers three hero CTAs (Book Appointment, Call Now, WhatsApp Us) and a standard contact form, but nothing signals a clear, prioritised path for someone who needs to act immediately.

## Goal

Create a visible, low-friction "Urgent Consultation" path specifically for newly diagnosed patients. The path must:
- Be impossible to miss on first load (hero) and while scrolling (sticky bar)
- Reduce steps to contact to a single click
- Pre-populate the contact form so the doctor's team immediately understands the urgency

## Approach: Coral Urgency Strip (A)

Leverages the existing `--secondary: #FF6B6B` coral-red brand colour. No new palette required.

## Components

### 1. Hero CTA — 4th Button

- Label: **"Urgent Consultation"**
- Style: outlined coral-red button (`btn btn-urgent`)
- Position: 4th in the `.hero-cta` flex row, after WhatsApp Us
- Action: calls `activateUrgentPath()` — scrolls to `#contact` and sets service dropdown to `urgent`

### 2. Sticky Urgency Bar (`#urgentBar`)

- Trigger: slides in after user scrolls past the hero section bottom (~hero height px)
- Hides: when user scrolls to the contact section (i.e., user has already found the form)
- Content:
  ```
  🚨  Newly diagnosed with cancer?  →  [Call Now]  [Book Urgent Consult]
  ```
- Styling: coral-red glass-style strip (low-opacity background, 3px left border in `--secondary`, pulsing dot indicator)
- Position: `position: sticky; top: 0` — sits just below the nav
- Responsive: buttons wrap on small screens

### 3. Contact Form — New Option

- Added at the top of `#contactService` dropdown:
  ```html
  <option value="urgent">Urgent Consultation – New Diagnosis</option>
  ```
- Auto-selected via JS when user arrives via urgent path

### 4. JS Logic

Single function `activateUrgentPath()`:
```js
function activateUrgentPath() {
    document.getElementById('contactService').value = 'urgent';
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
}
```

Scroll listener on `window`:
- Show `#urgentBar` when `scrollY > heroBottom`
- Hide `#urgentBar` when `scrollY >= contactTop - 100`

### 5. Copy (NMC Compliant)

- Bar: "Newly diagnosed with cancer? Reach Dr. Kalyan Vangara for a consultation."
- Hero button: "Urgent Consultation"
- Form option: "Urgent Consultation – New Diagnosis"

No outcome guarantees. No superlatives.

## Files Changed

| File | Change |
|------|--------|
| `index.html` | Add `#urgentBar` section between nav and hero; add 4th hero CTA button; add `urgent` option to contact form dropdown |
| `styles.css` | Add `.urgent-bar`, `.btn-urgent`, `.urgent-pulse` styles |
| `script.js` | Add `activateUrgentPath()` and scroll listener for bar visibility |

## Out of Scope

- WhatsApp pre-filled urgent message (not requested)
- Backend/server-side urgency tracking
- SMS notifications
