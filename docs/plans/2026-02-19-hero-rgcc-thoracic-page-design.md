# Design: RGCC Hero Credential + Thoracic Condition Page

**Date:** 2026-02-19
**Status:** Approved

---

## Summary

Two changes to the KalyanWeb site:

1. Move the RGCC Molecular Oncology Training credential from the Why Choose section into the Hero section as a styled credential pill. Remove it from Why Choose.
2. Add a Thoracic & Ortho Oncology condition page (`thoracic-ortho-oncology-hyderabad.html`), the only specialty group currently missing a standalone page.

---

## 1. RGCC Credential in Hero

### Current state
- Why Choose section has 5 cards; card 5 is "Molecular Oncology Training" (RGCC International, Greece).
- Hero section has: badge, H1, subtitle, hero-description paragraph, CTA buttons, stats row.

### Target state
- Remove the Molecular Oncology card from Why Choose (leaves 4 cards).
- Insert a credential pill element in `index.html` **between** `<p class="hero-description">` and `<div class="hero-cta">`.

### Pill markup
```html
<div class="hero-credential-pill">
  <svg><!-- DNA/molecule icon --></svg>
  <span>RGCC Molecular Oncology Training &mdash; RGCC International, Greece</span>
</div>
```

### Styling (new CSS in styles.css)
- Display: inline-flex, align-items: center, gap: 0.5rem
- Background: rgba(15,251,249,0.06)
- Border: 1px solid rgba(15,251,249,0.2)
- Border-radius: 999px (pill shape)
- Padding: 0.45rem 1rem
- Font-size: 0.8rem, color: var(--primary) at 80% opacity
- Icon: teal, 16px
- Margin: 0.75rem 0 0 (sits above CTA row)
- On mobile: display inline-flex, wraps naturally

---

## 2. Thoracic & Ortho Oncology Condition Page

### File
`thoracic-ortho-oncology-hyderabad.html`

### Template
Matches existing condition pages (gi-cancer-surgery-hyderabad.html etc.):
- Shared nav with back-to-site logo link
- `.condition-hero` section with section-label, H1, intro paragraph
- Procedures grid (condition-card × 4)
- CTA box (Book Consultation)
- Page-specific inline `<style>` block (same as other pages)

### Content
**H1:** Thoracic & Orthopaedic Oncology Surgery in Hyderabad
**Intro:** Dr. Kalyan Vangara provides surgical management for thoracic and musculoskeletal tumours, including lung cancers, soft tissue sarcomas, and bone tumours, at Amor Hospitals, Hyderabad.

**Condition cards (4):**
1. Lung Cancer — Surgical resection (lobectomy, segmentectomy) for primary lung tumours; thoracoscopic approaches where feasible.
2. Soft Tissue Sarcoma — Wide local excision and compartmental resection of soft tissue sarcomas in limbs and trunk.
3. Bone Tumours — Limb-sparing surgery for primary bone tumours; curettage, bone grafting, and prosthetic reconstruction.
4. Rib & Chest Wall Tumours — En-bloc resection of rib and chest wall tumours with reconstruction.

### Link in index.html
Add `→ Details` anchor to "Thoracic & Others" conditions group header:
```html
<h4 class="conditions-group-title">
  Thoracic & Others
  <a href="thoracic-ortho-oncology-hyderabad.html" class="condition-page-link">→ Details</a>
</h4>
```

---

## Files Changed

| File | Change |
|---|---|
| `index.html` | Add `.hero-credential-pill` in hero; remove Why Choose Molecular Oncology card; add link to thoracic page in conditions group |
| `styles.css` | Add `.hero-credential-pill` styles |
| `thoracic-ortho-oncology-hyderabad.html` | New file — condition page |
