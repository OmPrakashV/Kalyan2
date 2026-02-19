# Urgent Consultation Path — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a high-visibility urgent consultation path for newly-diagnosed cancer patients — a coral sticky bar that appears after scrolling past the hero, a 4th hero CTA button, and auto-selection of "Urgent Consultation – New Diagnosis" in the contact form.

**Architecture:** Three coordinated changes across the three source files. CSS adds the visual styles. HTML adds the sticky bar element, hero button, and form option. JS wires up the scroll-based show/hide logic and the `activateUrgentPath()` action that both entry points call. No new files needed.

**Tech Stack:** Vanilla HTML/CSS/JS. No dependencies. No build step.

---

## Task 1: CSS — Urgent Bar & Button Styles

**Files:**
- Modify: `styles.css` (append after the `.btn-secondary` block, around line 218)

### Step 1: Add CSS styles

Open `styles.css`. Find the line that reads:

```css
.btn-full {
    width: 100%;
}
```

Insert the following block **immediately after** that rule (after the closing `}` on the `.btn-full` rule):

```css
/* ====================================
   Urgent Consultation Bar
   ==================================== */
.urgent-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: rgba(255, 107, 107, 0.08);
    border-bottom: 1px solid rgba(255, 107, 107, 0.25);
    border-left: 3px solid var(--secondary);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transform: translateY(-100%);
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
}

.urgent-bar.urgent-bar--visible {
    transform: translateY(0);
}

.urgent-bar-inner {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0.55rem 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.urgent-pulse {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--secondary);
    flex-shrink: 0;
    animation: urgentPulse 1.4s ease-in-out infinite;
}

@keyframes urgentPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.7); }
}

.urgent-bar-text {
    font-family: var(--font-display);
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: var(--slate);
    flex: 1;
    min-width: 160px;
}

.urgent-bar-text strong {
    color: var(--secondary);
}

.urgent-bar-actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
    flex-wrap: wrap;
}

.btn-urgent-sm {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.4rem 1rem;
    font-family: var(--font-display);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 4px;
    cursor: pointer;
    transition: var(--transition-smooth);
    border: none;
    background: none;
}

.btn-urgent-sm--call {
    color: var(--secondary);
    border: 1px solid rgba(255, 107, 107, 0.4);
}

.btn-urgent-sm--call:hover {
    background: rgba(255, 107, 107, 0.1);
    border-color: var(--secondary);
    transform: translateY(-1px);
}

.btn-urgent-sm--book {
    background: var(--secondary);
    color: #06090F;
    font-weight: 700;
}

.btn-urgent-sm--book:hover {
    background: #ff8585;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
}

/* 4th hero CTA button — urgent outlined coral */
.btn-urgent {
    background: transparent;
    color: var(--secondary);
    border: 1px solid rgba(255, 107, 107, 0.4);
}

.btn-urgent:hover {
    border-color: var(--secondary);
    background: rgba(255, 107, 107, 0.08);
    color: #ff8585;
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(255, 107, 107, 0.3);
}

/* Responsive: bar stacks on small screens */
@media (max-width: 600px) {
    .urgent-bar-inner {
        padding: 0.5rem 1rem;
        gap: 0.6rem;
    }
    .urgent-bar-text {
        font-size: 0.72rem;
        min-width: 0;
        width: 100%;
    }
    .urgent-bar-actions {
        width: 100%;
        justify-content: flex-start;
    }
}
```

### Step 2: Verify visually

Open `index.html` in a browser. Nothing should look different yet — the bar is hidden by default and no HTML exists for it. Confirm no CSS syntax errors (check browser DevTools console for "Unexpected token" errors in stylesheet).

### Step 3: Commit

```bash
git add styles.css
git commit -m "style: add urgent consultation bar and button styles"
```

---

## Task 2: HTML — Sticky Bar, Hero Button, Form Option

**Files:**
- Modify: `index.html` at three locations

### Step 1: Add the sticky urgent bar element

In `index.html`, find the closing `</nav>` tag (around line 145). Insert the `#urgentBar` div **immediately after** `</nav>`:

```html
    <!-- Urgent Consultation Bar — shown after scrolling past hero -->
    <div class="urgent-bar" id="urgentBar" role="alert" aria-live="polite" aria-label="Urgent consultation">
        <div class="urgent-bar-inner">
            <span class="urgent-pulse" aria-hidden="true"></span>
            <p class="urgent-bar-text">
                <strong>Newly diagnosed with cancer?</strong> Reach Dr. Kalyan Vangara for a consultation.
            </p>
            <div class="urgent-bar-actions">
                <a href="tel:+919966003251" class="btn-urgent-sm btn-urgent-sm--call">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    Call Now
                </a>
                <button class="btn-urgent-sm btn-urgent-sm--book" onclick="activateUrgentPath()">
                    Book Urgent Consult
                </button>
            </div>
        </div>
    </div>
```

### Step 2: Add the 4th hero CTA button

In `index.html`, find the closing `</div>` of `.hero-cta` (the div that wraps the three hero buttons — after the WhatsApp Us `</a>` around line 179). Insert the new button **before** the closing `</div>`:

Find this exact text:
```html
                        WhatsApp Us
                    </a>
                </div>
                <div class="hero-stats">
```

Replace with:
```html
                        WhatsApp Us
                    </a>
                    <button class="btn btn-urgent" onclick="activateUrgentPath()">
                        Urgent Consultation
                    </button>
                </div>
                <div class="hero-stats">
```

### Step 3: Add "Urgent" option to contact form dropdown

In `index.html`, find the service `<select>` dropdown (around line 674). Find this exact text:

```html
                                <option value="">Select service</option>
                                <option value="consultation">Initial Consultation</option>
```

Replace with:

```html
                                <option value="">Select service</option>
                                <option value="urgent">Urgent Consultation – New Diagnosis</option>
                                <option value="consultation">Initial Consultation</option>
```

### Step 4: Verify in browser

Open `index.html`. You should see:
- A 4th coral-outlined "Urgent Consultation" button in the hero (does nothing yet — JS not wired)
- The dropdown now has "Urgent Consultation – New Diagnosis" as the second option
- The urgent bar is not visible (hidden off-screen above the nav)

### Step 5: Commit

```bash
git add index.html
git commit -m "feat(html): add urgent bar element, hero button, and urgent form option"
```

---

## Task 3: JS — activateUrgentPath() and Scroll Listener

**Files:**
- Modify: `script.js`

### Step 1: Add `activateUrgentPath()` function

In `script.js`, find the line near the top:

```js
document.addEventListener('DOMContentLoaded', function() {
```

Insert the following **before** that line (at the very top of the file, after the opening comment block):

```js
// ====================================
// Urgent Consultation Path
// ====================================
function activateUrgentPath() {
    var select = document.getElementById('contactService');
    if (select) select.value = 'urgent';
    var contact = document.getElementById('contact');
    if (contact) {
        var offset = contact.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
    }
}
```

> The `-80` offset accounts for the fixed nav height so the contact section heading isn't hidden behind it.

### Step 2: Add `initUrgentBar()` and call it

In `script.js`, find the `initScrollEffects` function (around line 111). Add a call to `initUrgentBar()` at the **end** of that function body, just before its closing `}`.

Then, add the `initUrgentBar` function definition **after** the closing `}` of `initScrollEffects`:

```js
function initUrgentBar() {
    var bar = document.getElementById('urgentBar');
    if (!bar) return;

    var hero = document.getElementById('home');
    var contact = document.getElementById('contact');
    if (!hero || !contact) return;

    var barTicking = false;

    function updateBarVisibility() {
        var scrollY = window.pageYOffset;
        var heroBottom = hero.offsetTop + hero.offsetHeight;
        var contactTop = contact.offsetTop;

        var shouldShow = scrollY > heroBottom && scrollY < contactTop - 100;
        bar.classList.toggle('urgent-bar--visible', shouldShow);
        barTicking = false;
    }

    window.addEventListener('scroll', function() {
        if (!barTicking) {
            barTicking = true;
            requestAnimationFrame(updateBarVisibility);
        }
    }, { passive: true });
}
```

### Step 3: Wire `initUrgentBar` into the init chain

In `script.js`, find the call to `initScrollEffects()` inside `DOMContentLoaded` (around line 9):

```js
    initScrollEffects();
```

Add the call to `initUrgentBar()` immediately after it:

```js
    initScrollEffects();
    initUrgentBar();
```

### Step 4: Verify end-to-end in browser

1. Open `index.html`. The hero "Urgent Consultation" button should be visible and coral-outlined.
2. Click it — the page should smooth-scroll to the Contact section, and the dropdown should auto-select "Urgent Consultation – New Diagnosis".
3. Scroll down past the hero. The coral bar should slide in from above with a pulsing dot.
4. Click "Call Now" in the bar — browser should initiate a phone call to `+91 99660 03251`.
5. Click "Book Urgent Consult" in the bar — page scrolls to contact, dropdown pre-filled.
6. Scroll all the way to the Contact section — bar should disappear.
7. On mobile (DevTools → responsive mode, 375px): confirm the bar text and buttons are readable and wrap cleanly.

### Step 5: Commit

```bash
git add script.js
git commit -m "feat(js): add activateUrgentPath() and urgent bar scroll listener"
```

---

## Done — Verification Checklist

- [ ] Coral pulsing bar slides in after scrolling past hero
- [ ] Bar hides when contact section is reached
- [ ] Bar "Call Now" initiates a call
- [ ] Bar "Book Urgent Consult" scrolls to contact + pre-selects urgent option
- [ ] Hero 4th button "Urgent Consultation" does the same
- [ ] Dropdown has "Urgent Consultation – New Diagnosis" option
- [ ] No JS console errors
- [ ] No layout breakage on 375px mobile
- [ ] NMC copy: no guarantees, no superlatives ✓
