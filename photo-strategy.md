# Photo Strategy — Dr. Kalyan Vangara Website

## Hero Slider — Recommended Shot Types (Priority Order)

The hero slider cycles through 6 images (`images/photo.jpeg` → `photo6.jpeg`). Each slot should tell a different part of the story.

| Slot | Shot Type | Purpose |
|------|-----------|---------|
| 1 | Confident professional portrait | Trust anchor — patients decide in 3 seconds |
| 2 | At the robotic surgery (da Vinci) console | Differentiates from general surgeons immediately |
| 3 | Patient consultation — doctor listening | Empathy signal; critical for cancer patients |
| 4 | OR team / surgical moment | Projects competence and active expertise |
| 5 | Academic / conference setting | Thought leadership, not just local practitioner |
| 6 | Casual / approachable (no white coat) | Humanises the profile |

### Slot 1 — Portrait Details
- Clean background, warm but clinical light
- White coat or scrubs, direct eye contact
- Slight forward lean — signals engagement
- This is the most important single image on the site

### Slot 2 — Robotic Console
- Wide enough to show the full da Vinci rig, not just the face
- Visually striking; instantly communicates cutting-edge care
- No other local surgeon likely has this shot

### Slot 3 — Consultation
- Doctor listening, not talking — empathy reads stronger than expertise
- Soft light; patient slightly out of focus, Dr. Vangara sharp
- Requires explicit patient consent or use of a model (NMC compliance)

### Slot 4 — OR / Surgical
- Masked, gowned, active — good drama without being graphic
- Avoid anything that looks like a stock photo
- Team visible in background signals collaborative care

### Slot 5 — Academic
- Presenting a slide, talking to peers, or at a podium
- CME events, conference talks, or teaching rounds at a medical college

### Slot 6 — Casual / Human
- Outdoors or informal setting, natural smile
- No white coat — shows the person behind the surgeon

---

## Technical Requirements

| Factor | Requirement |
|--------|-------------|
| Minimum resolution | 1920 × 1080 px (2560 px wide preferred) |
| File format | JPEG |
| File size | 150–300 KB each (compress for web speed) |
| Aspect ratio | Consistent across all 6 — landscape 16:9 or 3:2 |
| Color temperature | Warm tones — complements the site's teal/coral palette |
| Lighting | Natural or 3-point studio; avoid harsh overhead fluorescent |

---

## What to Avoid

- **Stock photos** — cancer patients research surgeons carefully; they notice
- **All similar poses** — if all 6 shots are standing-in-white-coat, the slider adds no value
- **Cluttered backgrounds** — busy backgrounds compete with the message
- **Cold blue tones** — clashes with the site's warm cream and teal palette
- **Patient faces without consent** — NMC compliance requirement

---

## Recommended Shoot Plan

A single half-day professional shoot at Amor Hospitals covers all 6 slots:

1. Studio portrait setup in a clean room — Slot 1
2. Robotic surgery suite — Slot 2
3. Consultation room with a consenting patient or model — Slot 3
4. OR, gowned and masked with team — Slot 4
5. Use existing conference / CME event photos — Slot 5
6. Outdoor / candid on hospital grounds — Slot 6

**This is the single highest-ROI photo investment for the site.**

---

## Current Files

All photos live in `images/` after the folder reorganisation (Feb 2026):

```
images/
├── photo.jpeg   ← hero slot 1
├── photo2.jpeg  ← hero slot 2
├── photo3.jpeg  ← hero slot 3
├── photo4.jpeg  ← hero slot 4
├── photo5.jpeg  ← hero slot 5
└── photo6.jpeg  ← hero slot 6
```

To replace a photo: overwrite the file in `images/` keeping the same filename, then push to GitHub — GitHub Pages will redeploy automatically.
