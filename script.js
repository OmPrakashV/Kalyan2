// ====================================
// Clinical Serenity Website - Main JavaScript
// ====================================

// ====================================
// Urgent Consultation Path
// ====================================
function activateUrgentPath() {
    // Advance to step 2 so the service dropdown is visible
    advanceForm(true);
    var select = document.getElementById('contactService');
    if (select) select.value = 'urgent';
    var contact = document.getElementById('contact');
    if (contact) {
        var offset = contact.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
    }
}

function advanceForm(skipValidation) {
    var name = document.getElementById('contactName');
    var phone = document.getElementById('contactPhone');
    var step1 = document.getElementById('formStep1');
    var step2 = document.getElementById('formStep2');
    if (!step1 || !step2) return;

    // Validate step 1 unless skipping (e.g. from urgent path)
    if (!skipValidation) {
        if (name && !name.value.trim()) { name.focus(); return; }
        if (phone && !phone.value.trim()) { phone.focus(); return; }
    }

    step1.classList.add('form-step--hidden');
    step2.classList.remove('form-step--hidden');
    // When coming back to step 2, reset step indicator
    step2.scrollIntoView ? step2.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) : null;
}

function setPatientType(type) {
    // Update active button state
    var btnNew = document.getElementById('ptNew');
    var btnFollowUp = document.getElementById('ptFollowUp');
    if (btnNew) btnNew.classList.toggle('patient-type-btn--active', type === 'new');
    if (btnFollowUp) btnFollowUp.classList.toggle('patient-type-btn--active', type === 'followup');

    // Pre-select matching service
    var select = document.getElementById('contactService');
    if (!select) return;
    if (type === 'new') {
        select.value = 'consultation';
    } else {
        select.value = 'follow-up';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Critical — needed for above-the-fold interaction
    initNavigation();
    initScrollEffects();
    initUrgentBar();
    initModal();

    // Defer non-critical initialization until after first paint
    if ('requestIdleCallback' in window) {
        requestIdleCallback(initDeferredSystems);
    } else {
        setTimeout(initDeferredSystems, 200);
    }
});

function initDeferredSystems() {
    initBlogSystem();
    initContactForm();
    initYouTubeFeed();
    initInstagramFeed();
    initGoogleReviews();
    initWhatsAppWidget();
    initLazyIframes();
    initMediaTabs();
    initServicesCarousel();
    initConditionsCarousel();
    initAboutToggle();
    initHeroSlider();
    initHeroTyping();
    initStatCounters();
    initParallaxShapes();
    initTiltCards();
    initFAQ();
}

// ====================================
// FAQ Accordion
// ====================================
function initFAQ() {
    var items = document.querySelectorAll('.faq-item');
    items.forEach(function(item) {
        var btn = item.querySelector('.faq-question');
        if (!btn) return;
        btn.addEventListener('click', function() {
            var isOpen = item.classList.contains('faq-item--open');
            // Close all
            items.forEach(function(i) {
                i.classList.remove('faq-item--open');
                var b = i.querySelector('.faq-question');
                if (b) b.setAttribute('aria-expanded', 'false');
            });
            // Open clicked if it was closed
            if (!isOpen) {
                item.classList.add('faq-item--open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// ====================================
// Navigation
// ====================================
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const nav = document.getElementById('nav');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            var isOpen = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isOpen);
            navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Toggle menu');
            // Lock body scroll when menu is open
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Toggle menu');
            document.body.style.overflow = '';
        });
    });

    // Sticky navigation on scroll — throttled with rAF
    let scrollTicking = false;
    window.addEventListener('scroll', function() {
        if (!scrollTicking) {
            scrollTicking = true;
            requestAnimationFrame(function() {
                if (window.pageYOffset > 100) {
                    nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
                    nav.style.borderBottomColor = 'rgba(15, 251, 249, 0.08)';
                } else {
                    nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
                    nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
                }
                scrollTicking = false;
            });
        }
    }, { passive: true });

    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ====================================
// Scroll Effects
// ====================================
function initScrollEffects() {
    // Skip scroll animations if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.remove('scroll-hidden');
                entry.target.classList.add('scroll-visible');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    // Observe elements for fade-in animation — use CSS classes instead of inline styles
    var animatedElements = document.querySelectorAll('.service-card, .blog-card, .grev-card, .credential-item');
    animatedElements.forEach(function(el, index) {
        el.classList.add('scroll-hidden');
        el.style.transition = 'opacity 0.6s ease-out ' + (index * 0.1) + 's, transform 0.6s ease-out ' + (index * 0.1) + 's';
        observer.observe(el);
    });
}

function initUrgentBar() {
    var bar = document.getElementById('urgentBar');
    var nav = document.getElementById('nav');
    var hero = document.getElementById('home');
    var contact = document.getElementById('contact');
    if (!bar || !nav || !hero || !contact) return;

    // Position bar below the fixed nav
    bar.style.top = nav.offsetHeight + 'px';

    var barTicking = false;

    function updateBarVisibility() {
        var scrollY = window.pageYOffset;
        var heroBottom = hero.offsetTop + hero.offsetHeight;
        var contactTop = contact.offsetTop;
        var shouldShow = scrollY > heroBottom && scrollY < contactTop - 100;

        if (shouldShow) {
            bar.classList.add('urgent-bar--visible');
            bar.setAttribute('aria-hidden', 'false');
        } else {
            bar.classList.remove('urgent-bar--visible');
            bar.setAttribute('aria-hidden', 'true');
        }
        barTicking = false;
    }

    window.addEventListener('scroll', function() {
        if (!barTicking) {
            barTicking = true;
            requestAnimationFrame(updateBarVisibility);
        }
    }, { passive: true });
}

// ====================================
// Blog System (Google Sheets CMS)
// ====================================
function initBlogSystem() {
    var grid = document.getElementById('blogGrid');
    if (!grid) return;

    if (!GOOGLE_SHEET_ID || GOOGLE_SHEET_ID === 'YOUR_SHEET_ID') {
        grid.innerHTML =
            '<div class="blog-fallback">' +
                '<p>Blog not configured yet.</p>' +
                '<p>Set <code>GOOGLE_SHEET_ID</code> in script.js to load articles from Google Sheets.</p>' +
            '</div>';
        return;
    }

    var csvUrl = 'https://docs.google.com/spreadsheets/d/' + GOOGLE_SHEET_ID + '/export?format=csv&gid=0';

    fetch(csvUrl)
        .then(function(res) {
            if (!res.ok) throw new Error('Sheet fetch failed');
            return res.text();
        })
        .then(function(csvText) {
            var rows = parseCSV(csvText);
            // Remove header row
            if (rows.length > 0) rows.shift();

            if (rows.length === 0) {
                grid.innerHTML =
                    '<div class="blog-fallback">' +
                        '<p>No articles published yet.</p>' +
                    '</div>';
                return;
            }

            grid.innerHTML = '';

            rows.forEach(function(row) {
                var title = (row[0] || '').trim();
                var category = (row[1] || '').trim();
                var date = (row[2] || '').trim();
                var excerpt = (row[3] || '').trim();
                var content = (row[4] || '').trim();
                var imageUrl = (row[5] || '').trim();

                if (!title) return;

                var card = document.createElement('article');
                card.className = 'blog-card';

                var imageStyle = imageUrl
                    ? 'background-image: url(' + sanitizeHTML(imageUrl) + '); background-size: cover; background-position: center;'
                    : '';

                card.innerHTML =
                    '<div class="blog-image">' +
                        '<div class="blog-image-placeholder" style="' + imageStyle + '">' +
                            '<span class="blog-category">' + sanitizeHTML(category) + '</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="blog-content">' +
                        '<div class="blog-meta">' +
                            '<span class="blog-date">' + sanitizeHTML(date) + '</span>' +
                        '</div>' +
                        '<h3 class="blog-title">' + sanitizeHTML(title) + '</h3>' +
                        '<p class="blog-excerpt">' + sanitizeHTML(excerpt) + '</p>' +
                        '<a href="#" class="blog-link">Read Article →</a>' +
                    '</div>';

                // Wire up click handler
                (function(t, c) {
                    card.querySelector('.blog-link').addEventListener('click', function(e) {
                        e.preventDefault();
                        showArticleModal(t, c);
                    });
                })(title, content);

                grid.appendChild(card);
            });
        })
        .catch(function() {
            grid.innerHTML =
                '<div class="blog-fallback">' +
                    '<p>Could not load articles. Please try again later.</p>' +
                '</div>';
        });
}

// Lightweight CSV parser — handles quoted fields with commas and newlines
function parseCSV(text) {
    var rows = [];
    var row = [];
    var field = '';
    var inQuotes = false;

    for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        var next = text[i + 1];

        if (inQuotes) {
            if (ch === '"' && next === '"') {
                field += '"';
                i++;
            } else if (ch === '"') {
                inQuotes = false;
            } else {
                field += ch;
            }
        } else {
            if (ch === '"') {
                inQuotes = true;
            } else if (ch === ',') {
                row.push(field);
                field = '';
            } else if (ch === '\r' && next === '\n') {
                row.push(field);
                field = '';
                rows.push(row);
                row = [];
                i++;
            } else if (ch === '\n') {
                row.push(field);
                field = '';
                rows.push(row);
                row = [];
            } else {
                field += ch;
            }
        }
    }

    // Last field/row
    if (field || row.length > 0) {
        row.push(field);
        rows.push(row);
    }

    return rows;
}

// ====================================
// Contact Form
// ====================================
// WhatsApp number (country code + number, no spaces or symbols)
const WHATSAPP_NUMBER = '919966003251';

function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('contactName').value;
            const phone = document.getElementById('contactPhone').value;
            const email = document.getElementById('contactEmail').value;
            const service = document.getElementById('contactService').value;
            const message = document.getElementById('contactMessage').value;

            // Save to localStorage as backup
            let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
            contacts.push({ name, phone, email, service, message, date: new Date().toISOString() });
            localStorage.setItem('contacts', JSON.stringify(contacts));

            // Build WhatsApp message
            var lines = [];
            lines.push('*New Appointment Request*');
            lines.push('');
            lines.push('*Name:* ' + name);
            if (phone) lines.push('*Phone:* ' + phone);
            if (email) lines.push('*Email:* ' + email);
            if (service) lines.push('*Service:* ' + service);
            if (message) {
                lines.push('');
                lines.push('*Message:*');
                lines.push(message);
            }

            var whatsappText = encodeURIComponent(lines.join('\n'));
            var whatsappUrl = 'https://api.whatsapp.com/send?phone=' + WHATSAPP_NUMBER + '&text=' + whatsappText;

            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');

            // Reset form
            contactForm.reset();

            // Reset form back to step 1
            var step1 = document.getElementById('formStep1');
            var step2 = document.getElementById('formStep2');
            if (step1) step1.classList.remove('form-step--hidden');
            if (step2) step2.classList.add('form-step--hidden');

            // Show success modal
            showModal(
                'Redirecting to WhatsApp!',
                'Your appointment details have been prepared. Please send the message on WhatsApp to complete your booking.'
            );
        });
    }
}

// ====================================
// Modal System
// ====================================
function initModal() {
    const modal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('active');
            modal.classList.remove('modal--article');
        });
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                modal.classList.remove('modal--article');
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            modal.classList.remove('modal--article');
        }
    });
}

function showModal(title, message) {
    const modal = document.getElementById('successModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalMessage = document.getElementById('modalMessage');

    modalTitle.textContent = title;

    // Preserve line breaks for multi-line content (blog posts)
    if (message.indexOf('\n') !== -1) {
        modalMessage.innerHTML = '';
        message.split('\n\n').forEach(function(para) {
            var p = document.createElement('p');
            p.textContent = para;
            p.style.marginBottom = '1rem';
            p.style.textAlign = 'left';
            modalMessage.appendChild(p);
        });
    } else {
        modalMessage.textContent = message;
    }

    modal.classList.add('active');
}

function showArticleModal(title, content) {
    var modal = document.getElementById('successModal');
    if (modal) modal.classList.add('modal--article');
    showModal(title, content);
    // Append consultation CTA after article content renders
    var msgEl = document.getElementById('modalMessage');
    if (!msgEl) return;
    var cta = document.createElement('div');
    cta.className = 'article-cta';
    cta.innerHTML =
        '<hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:1.25rem 0">' +
        '<p style="font-family:var(--font-display);font-size:0.82rem;letter-spacing:0.5px;text-align:center;color:var(--slate-light);margin-bottom:0.75rem;text-transform:uppercase">Ready to take the next step?</p>' +
        '<a href="#contact" class="btn btn-primary" style="display:block;text-align:center;" onclick="document.getElementById(\'successModal\').classList.remove(\'active\')">Book a Consultation to Discuss Your Case</a>';
    msgEl.appendChild(cta);
}

// ====================================
// YouTube Feed (auto-fetch via RSS)
// ====================================
// TODO: Replace with your actual YouTube channel ID (starts with UC...)
// Find it at: youtube.com/account_advanced or right-click page source on youtube.com/@ABCcancer
// Google Sheets Blog CMS — set your published Google Sheet ID here.
// 1. Create a Google Sheet with columns: title, category, date, excerpt, content, image_url
// 2. File > Share > Publish to web > select CSV > Publish
// 3. Copy the Sheet ID from the URL (the long string between /d/ and /edit)
const GOOGLE_SHEET_ID = 'YOUR_SHEET_ID';

var HERO_IMAGES = [
    'images/photo.jpeg',
    'images/photo2.jpeg',
    'images/photo3.jpeg',
    'images/photo4.jpeg',
    'images/photo5.jpeg',
    'images/photo6.jpeg'
];

const YOUTUBE_CHANNEL_ID = 'YOUR_CHANNEL_ID';
const YOUTUBE_VIDEO_COUNT = 6;

// Instagram Graph API — set your long-lived access token here.
// Generate one at https://developers.facebook.com/tools/explorer/
// then exchange for a long-lived token (valid 60 days, auto-refreshable).
const INSTAGRAM_ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';
const INSTAGRAM_POST_COUNT = 12;

// Google Maps profile URL (short link from your Google Business Profile).
const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/21FxMEDhcGHSCwFB7';

// Google Places API — set your Place ID and API key to fetch Google reviews dynamically.
// Find your Place ID at https://developers.google.com/maps/documentation/places/web-service/place-id
// Create an API key at https://console.cloud.google.com (enable Places API New).
const GOOGLE_PLACE_ID = 'YOUR_PLACE_ID';
const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY';

// ====================================
// Hero Image Slider
// ====================================
function initHeroSlider() {
    var slider = document.querySelector('.hero-slider');
    var dotsContainer = document.querySelector('.hero-slider-dots');
    if (!slider || !dotsContainer || HERO_IMAGES.length <= 1) return;

    // Build slides
    HERO_IMAGES.forEach(function(src, i) {
        var img = document.createElement('img');
        img.src = src;
        img.alt = 'Dr. Kalyan Vangara';
        img.className = 'hero-slide' + (i === 0 ? ' active' : '');
        slider.appendChild(img);
    });

    // Build dots
    HERO_IMAGES.forEach(function(_, i) {
        var dot = document.createElement('button');
        dot.className = 'hero-slider-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', function() { goToSlide(i); });
        dotsContainer.appendChild(dot);
    });

    var currentIndex = 0;
    var slides = slider.querySelectorAll('.hero-slide');
    var dots = dotsContainer.querySelectorAll('.hero-slider-dot');

    function goToSlide(index) {
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        currentIndex = (index + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    setInterval(function() {
        goToSlide(currentIndex + 1);
    }, 4000);
}

// ====================================
// Hero Typing Effect
// ====================================
function initHeroTyping() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var lines = document.querySelectorAll('.title-line');
    if (!lines.length) return;

    lines.forEach(function(line, i) {
        var text = line.textContent;
        line.textContent = '';
        line.style.visibility = 'visible';

        var charIndex = 0;
        var delay = i * 800 + 600; // stagger per line

        setTimeout(function() {
            var interval = setInterval(function() {
                line.textContent = text.slice(0, charIndex + 1);
                charIndex++;
                if (charIndex >= text.length) {
                    clearInterval(interval);
                    // Add blinking cursor to last line only
                    if (i === lines.length - 1) {
                        line.classList.add('typing-cursor');
                        setTimeout(function() {
                            line.classList.remove('typing-cursor');
                        }, 2500);
                    }
                }
            }, 35);
        }, delay);
    });
}

// ====================================
// Stat Counter Animation
// ====================================
function initStatCounters() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;

            var el = entry.target;
            var text = el.textContent;
            var match = text.match(/^(\d+)(\+?)$/);

            if (match) {
                var target = parseInt(match[1]);
                var suffix = match[2];
                var start = 0;
                var duration = 1200;
                var startTime = null;

                function step(timestamp) {
                    if (!startTime) startTime = timestamp;
                    var progress = Math.min((timestamp - startTime) / duration, 1);
                    // ease-out cubic
                    var eased = 1 - Math.pow(1 - progress, 3);
                    var current = Math.round(start + (target - start) * eased);
                    el.textContent = current + suffix;
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        el.classList.add('counted');
                    }
                }
                requestAnimationFrame(step);
            } else {
                // Non-numeric stats — reveal with glow
                el.classList.add('counted');
            }

            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    stats.forEach(function(stat) { observer.observe(stat); });
}

// ====================================
// Parallax Floating Shapes
// ====================================
function initParallaxShapes() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var shapes = document.querySelectorAll('.shape');
    if (!shapes.length) return;

    var ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(function() {
                var scrollY = window.pageYOffset;
                shapes.forEach(function(shape, i) {
                    var speed = (i + 1) * 0.03;
                    shape.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
                });
                ticking = false;
            });
        }
    }, { passive: true });
}

// ====================================
// 3D Tilt on Service Cards
// ====================================
function initTiltCards() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ('ontouchstart' in window) return; // skip on touch devices

    var cards = document.querySelectorAll('.service-card');

    cards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = (y - centerY) / centerY * -4;
            var rotateY = (x - centerX) / centerX * 4;
            card.style.transform = 'translateY(-8px) perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'translateY(0) perspective(600px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

// ====================================
// Media Tabs (YouTube / Instagram)
// ====================================
function initMediaTabs() {
    var tabs = document.querySelectorAll('.media-tab');
    var panels = document.querySelectorAll('.media-tab-panel');
    if (!tabs.length || !panels.length) return;

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            var target = tab.getAttribute('data-tab');

            tabs.forEach(function(t) { t.classList.remove('active'); });
            panels.forEach(function(p) { p.classList.remove('active'); });

            tab.classList.add('active');
            var panel = document.getElementById('panel' + target.charAt(0).toUpperCase() + target.slice(1));
            if (panel) panel.classList.add('active');
        });
    });
}

// ====================================
// Conditions Treated Toggle
// ====================================
function initConditionsCarousel() {
    var track = document.getElementById('conditionsTrack');
    var dotsEl = document.getElementById('conditionsDots');
    var prevBtn = document.getElementById('conditionsPrev');
    var nextBtn = document.getElementById('conditionsNext');
    if (!track || !dotsEl || !prevBtn || !nextBtn) return;

    var cards = track.querySelectorAll('.conditions-card');
    var total = cards.length;
    var currentIndex = 0;

    function getPerView() {
        return window.innerWidth >= 768 ? 2 : 1;
    }

    function getMaxIndex() {
        return Math.max(0, total - getPerView());
    }

    function updateTrack() {
        var wrapper = track.parentElement;
        var gap = 24; // 1.5rem
        var perView = getPerView();
        var cardWidth = (wrapper.offsetWidth - gap * (perView - 1)) / perView;
        var offset = currentIndex * (cardWidth + gap);
        track.style.transform = 'translateX(-' + offset + 'px)';
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= getMaxIndex();
        dotsEl.querySelectorAll('.conditions-dot').forEach(function(d, i) {
            d.classList.toggle('active', i === currentIndex);
        });
    }

    function goTo(index) {
        currentIndex = Math.max(0, Math.min(index, getMaxIndex()));
        updateTrack();
    }

    function buildDots() {
        dotsEl.innerHTML = '';
        var max = getMaxIndex();
        for (var i = 0; i <= max; i++) {
            var dot = document.createElement('button');
            dot.className = 'conditions-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            (function(idx) {
                dot.addEventListener('click', function() { goTo(idx); resetAuto(); });
            })(i);
            dotsEl.appendChild(dot);
        }
    }

    var AUTOPLAY_MS = 5000;
    var autoTimer;

    function advance() {
        goTo(currentIndex >= getMaxIndex() ? 0 : currentIndex + 1);
    }

    function startAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(advance, AUTOPLAY_MS);
    }

    function resetAuto() {
        startAuto();
    }

    prevBtn.addEventListener('click', function() { goTo(currentIndex - 1); resetAuto(); });
    nextBtn.addEventListener('click', function() { goTo(currentIndex + 1); resetAuto(); });

    var carousel = track.parentElement.parentElement;
    carousel.addEventListener('mouseenter', function() { clearInterval(autoTimer); });
    carousel.addEventListener('mouseleave', startAuto);

    buildDots();
    updateTrack();
    startAuto();

    var resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
            buildDots();
            updateTrack();
        }, 150);
    });
}

// ====================================
// About Read More Toggle
// ====================================
function initAboutToggle() {
    var btn = document.getElementById('aboutReadMore');
    var more = document.getElementById('aboutMore');
    if (!btn || !more) return;

    btn.addEventListener('click', function() {
        var expanded = more.classList.toggle('expanded');
        btn.textContent = expanded ? 'Show Less \u2212' : 'Read More +';
    });
}

// ====================================
// Services Carousel
// ====================================
function initServicesCarousel() {
    var track = document.getElementById('servicesTrack');
    var dotsEl = document.getElementById('servicesDots');
    var prevBtn = document.getElementById('servicesPrev');
    var nextBtn = document.getElementById('servicesNext');
    if (!track || !dotsEl || !prevBtn || !nextBtn) return;

    var cards = track.querySelectorAll('.service-card');
    var total = cards.length;
    var currentIndex = 0;

    function getPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 600) return 2;
        return 1;
    }

    function getMaxIndex() {
        return Math.max(0, total - getPerView());
    }

    function updateTrack() {
        var wrapper = track.parentElement;
        var gap = 24; // 1.5rem
        var perView = getPerView();
        var cardWidth = (wrapper.offsetWidth - gap * (perView - 1)) / perView;
        var offset = currentIndex * (cardWidth + gap);
        track.style.transform = 'translateX(-' + offset + 'px)';
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= getMaxIndex();
        dotsEl.querySelectorAll('.services-dot').forEach(function(d, i) {
            d.classList.toggle('active', i === currentIndex);
        });
    }

    function goTo(index) {
        currentIndex = Math.max(0, Math.min(index, getMaxIndex()));
        updateTrack();
    }

    function buildDots() {
        dotsEl.innerHTML = '';
        var max = getMaxIndex();
        for (var i = 0; i <= max; i++) {
            var dot = document.createElement('button');
            dot.className = 'services-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            (function(idx) {
                dot.addEventListener('click', function() { goTo(idx); resetAuto(); });
            })(i);
            dotsEl.appendChild(dot);
        }
    }

    var AUTOPLAY_MS = 4000;
    var autoTimer;

    function advance() {
        goTo(currentIndex >= getMaxIndex() ? 0 : currentIndex + 1);
    }

    function startAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(advance, AUTOPLAY_MS);
    }

    function resetAuto() {
        startAuto();
    }

    prevBtn.addEventListener('click', function() { goTo(currentIndex - 1); resetAuto(); });
    nextBtn.addEventListener('click', function() { goTo(currentIndex + 1); resetAuto(); });

    var carousel = track.parentElement.parentElement;
    carousel.addEventListener('mouseenter', function() { clearInterval(autoTimer); });
    carousel.addEventListener('mouseleave', startAuto);

    buildDots();
    updateTrack();
    startAuto();

    var resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
            buildDots();
            updateTrack();
        }, 150);
    });
}

// ====================================
// WhatsApp Business Chat Widget
// ====================================
function initWhatsAppWidget() {
    var floatBtn = document.getElementById('waFloatBtn');
    var popup = document.getElementById('waPopup');
    var closeBtn = document.getElementById('waPopupClose');
    var directChat = document.getElementById('waDirectChat');
    var quickBtns = document.querySelectorAll('.wa-quick-btn');
    var badge = floatBtn ? floatBtn.querySelector('.wa-float-badge') : null;

    if (!floatBtn || !popup) return;

    var isOpen = false;
    var baseUrl = 'https://api.whatsapp.com/send?phone=' + WHATSAPP_NUMBER;

    // Set default direct chat link
    directChat.href = baseUrl + '&text=' + encodeURIComponent('Hi Dr. Kalyan, I would like to know more.');

    // Toggle popup
    floatBtn.addEventListener('click', function() {
        isOpen = !isOpen;
        popup.classList.toggle('active', isOpen);
        floatBtn.classList.toggle('active', isOpen);
        if (isOpen && badge) badge.style.display = 'none';
    });

    // Close button
    closeBtn.addEventListener('click', function() {
        isOpen = false;
        popup.classList.remove('active');
        floatBtn.classList.remove('active');
    });

    // Quick reply buttons
    quickBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var msg = btn.getAttribute('data-msg');
            var url = baseUrl + '&text=' + encodeURIComponent(msg);
            window.open(url, '_blank');
        });
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
        if (isOpen && !popup.contains(e.target) && !floatBtn.contains(e.target)) {
            isOpen = false;
            popup.classList.remove('active');
            floatBtn.classList.remove('active');
        }
    });

    // Auto-show popup after 30 seconds on first visit
    if (!sessionStorage.getItem('wa_popup_shown')) {
        setTimeout(function() {
            if (!isOpen) {
                isOpen = true;
                popup.classList.add('active');
                floatBtn.classList.add('active');
                if (badge) badge.style.display = 'none';
                sessionStorage.setItem('wa_popup_shown', '1');
            }
        }, 30000);
    } else {
        if (badge) badge.style.display = 'none';
    }
}

function initYouTubeFeed() {
    const grid = document.getElementById('ytGrid');
    if (!grid) return;

    const rssUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + YOUTUBE_CHANNEL_ID;
    // Use a public CORS proxy to fetch the RSS feed from the browser
    const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(rssUrl);

    fetch(proxyUrl)
        .then(function(res) {
            if (!res.ok) throw new Error('Feed fetch failed');
            return res.text();
        })
        .then(function(xmlText) {
            var parser = new DOMParser();
            var xml = parser.parseFromString(xmlText, 'text/xml');
            var entries = xml.querySelectorAll('entry');

            if (entries.length === 0) {
                grid.innerHTML = '<p class="yt-loading">No videos found. Check the channel ID.</p>';
                return;
            }

            grid.innerHTML = '';
            var count = Math.min(entries.length, YOUTUBE_VIDEO_COUNT);

            for (var i = 0; i < count; i++) {
                var entry = entries[i];
                var videoId = entry.querySelector('videoId').textContent;
                var title = entry.querySelector('title').textContent;
                var thumb = 'https://img.youtube.com/vi/' + videoId + '/mqdefault.jpg';

                var card = document.createElement('a');
                card.className = 'yt-card';
                card.href = 'https://www.youtube.com/watch?v=' + videoId;
                card.target = '_blank';
                card.rel = 'noopener';
                card.innerHTML =
                    '<div class="yt-thumb">' +
                        '<img src="' + thumb + '" alt="' + sanitizeHTML(title) + '" width="320" height="180" loading="lazy" decoding="async">' +
                        '<div class="yt-play">' +
                            '<svg viewBox="0 0 68 48"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/><path d="M45 24L27 14v20" fill="white"/></svg>' +
                        '</div>' +
                    '</div>' +
                    '<div class="yt-info"><h4>' + sanitizeHTML(title) + '</h4></div>';

                grid.appendChild(card);
            }
        })
        .catch(function() {
            grid.innerHTML = '<p class="yt-loading">Could not load videos. <a href="https://www.youtube.com/channel/' + YOUTUBE_CHANNEL_ID + '" target="_blank">Visit YouTube channel →</a></p>';
        });
}

// ====================================
// Google Reviews (Places API)
// ====================================
function initGoogleReviews() {
    var container = document.getElementById('googleReviewsGrid');
    if (!container) return;

    // Set the "Write a Review" link
    var reviewLink = document.getElementById('googleReviewLink');
    if (reviewLink) {
        if (GOOGLE_PLACE_ID && GOOGLE_PLACE_ID !== 'YOUR_PLACE_ID') {
            reviewLink.href = 'https://search.google.com/local/writereview?placeid=' + GOOGLE_PLACE_ID;
        } else {
            // Use Google Maps profile URL — user can review from the listing page
            reviewLink.href = GOOGLE_MAPS_URL;
        }
    }

    if (!GOOGLE_PLACE_ID || GOOGLE_PLACE_ID === 'YOUR_PLACE_ID' ||
        !GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'YOUR_API_KEY') {
        container.innerHTML =
            '<div class="google-reviews-fallback">' +
                '<p>Google Reviews not configured yet.</p>' +
                '<p>Set <code>GOOGLE_PLACE_ID</code> and <code>GOOGLE_MAPS_API_KEY</code> in script.js.</p>' +
            '</div>';
        return;
    }

    var apiUrl = 'https://places.googleapis.com/v1/places/' + GOOGLE_PLACE_ID +
        '?key=' + GOOGLE_MAPS_API_KEY;

    fetch(apiUrl, {
        headers: {
            'X-Goog-FieldMask': 'reviews,rating,userRatingCount,googleMapsUri'
        }
    })
        .then(function(res) {
            if (!res.ok) throw new Error('Places API error');
            return res.json();
        })
        .then(function(place) {
            var reviews = place.reviews || [];
            if (reviews.length === 0) {
                container.innerHTML = '<p class="google-reviews-empty">No reviews found.</p>';
                return;
            }

            // Update summary badge
            var badge = document.getElementById('googleReviewsBadge');
            if (badge && place.rating) {
                var stars = '';
                for (var i = 0; i < 5; i++) {
                    if (i < Math.floor(place.rating)) stars += '★';
                    else if (i < place.rating) stars += '★'; // half-star simplified to full
                    else stars += '☆';
                }
                badge.innerHTML =
                    '<img src="https://www.google.com/favicon.ico" alt="Google" class="google-icon">' +
                    '<span class="google-badge-rating">' + place.rating.toFixed(1) + '</span>' +
                    '<span class="google-badge-stars">' + stars + '</span>' +
                    '<span class="google-badge-count">(' + (place.userRatingCount || 0) + ' reviews)</span>';
                badge.href = place.googleMapsUri || '#';
                badge.style.display = 'flex';
            }

            // Inject aggregateRating into JSON-LD structured data
            if (place.rating && place.userRatingCount) {
                var schemaScript = document.querySelector('script[type="application/ld+json"]');
                if (schemaScript) {
                    try {
                        var schema = JSON.parse(schemaScript.textContent);
                        schema.aggregateRating = {
                            "@type": "AggregateRating",
                            "ratingValue": place.rating.toFixed(1),
                            "bestRating": "5",
                            "ratingCount": place.userRatingCount
                        };
                        schemaScript.textContent = JSON.stringify(schema);
                    } catch (e) { /* skip if schema parsing fails */ }
                }
            }

            buildGoogleReviewsSlider(container, reviews, place.googleMapsUri);
        })
        .catch(function() {
            container.innerHTML =
                '<div class="google-reviews-fallback">' +
                    '<p>Could not load Google reviews.</p>' +
                    '<a href="' + GOOGLE_MAPS_URL + '" target="_blank">View on Google Maps →</a>' +
                '</div>';
        });
}

function buildGoogleReviewsSlider(container, reviews, mapsUri) {
    container.innerHTML = '';
    var currentIndex = 0;
    var autoTimer = null;

    // Build cards track
    var track = document.createElement('div');
    track.className = 'grev-track';

    reviews.forEach(function(review) {
        var card = document.createElement('div');
        card.className = 'grev-card';

        var rating = review.rating || 5;
        var stars = '';
        for (var s = 0; s < 5; s++) {
            stars += s < rating ? '★' : '☆';
        }

        var text = review.text ? review.text.text || '' : '';
        var author = review.authorAttribution ? review.authorAttribution.displayName || 'Google User' : 'Google User';
        var photoUri = review.authorAttribution && review.authorAttribution.photoUri ? review.authorAttribution.photoUri : '';
        var relTime = review.relativePublishTimeDescription || '';

        card.innerHTML =
            '<div class="grev-header">' +
                (photoUri ? '<img src="' + photoUri + '" alt="" class="grev-avatar">' :
                    '<div class="grev-avatar grev-avatar--placeholder">' + sanitizeHTML(author.charAt(0)) + '</div>') +
                '<div class="grev-author-info">' +
                    '<strong class="grev-name">' + sanitizeHTML(author) + '</strong>' +
                    '<span class="grev-time">' + sanitizeHTML(relTime) + '</span>' +
                '</div>' +
                '<img src="https://www.google.com/favicon.ico" alt="Google" class="grev-google-icon">' +
            '</div>' +
            '<div class="grev-stars">' + stars + '</div>' +
            (text ? '<p class="grev-text">' + sanitizeHTML(text) + '</p>' : '');

        track.appendChild(card);
    });

    container.appendChild(track);

    // Navigation
    if (reviews.length > 1) {
        var prevBtn = document.createElement('button');
        prevBtn.className = 'grev-nav grev-nav--prev';
        prevBtn.setAttribute('aria-label', 'Previous review');
        prevBtn.innerHTML = '‹';
        container.appendChild(prevBtn);

        var nextBtn = document.createElement('button');
        nextBtn.className = 'grev-nav grev-nav--next';
        nextBtn.setAttribute('aria-label', 'Next review');
        nextBtn.innerHTML = '›';
        container.appendChild(nextBtn);

        // Dots
        var dotsWrap = document.createElement('div');
        dotsWrap.className = 'grev-dots';
        for (var d = 0; d < reviews.length; d++) {
            var dot = document.createElement('button');
            dot.className = 'grev-dot' + (d === 0 ? ' active' : '');
            dot.dataset.index = d;
            dotsWrap.appendChild(dot);
        }
        container.appendChild(dotsWrap);

        function goTo(idx) {
            if (idx < 0) idx = reviews.length - 1;
            if (idx >= reviews.length) idx = 0;
            currentIndex = idx;
            track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
            var dots = dotsWrap.querySelectorAll('.grev-dot');
            dots.forEach(function(dot, i) {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        prevBtn.addEventListener('click', function() { goTo(currentIndex - 1); resetAuto(); });
        nextBtn.addEventListener('click', function() { goTo(currentIndex + 1); resetAuto(); });
        dotsWrap.addEventListener('click', function(e) {
            if (e.target.classList.contains('grev-dot')) {
                goTo(parseInt(e.target.dataset.index));
                resetAuto();
            }
        });

        // Autoplay
        function resetAuto() {
            clearInterval(autoTimer);
            autoTimer = setInterval(function() { goTo(currentIndex + 1); }, 6000);
        }
        resetAuto();

        container.addEventListener('mouseenter', function() { clearInterval(autoTimer); });
        container.addEventListener('mouseleave', function() { resetAuto(); });
    }
}

// ====================================
// Lazy Iframe Loading (Google Maps)
// ====================================
function initLazyIframes() {
    var iframes = document.querySelectorAll('iframe[data-src]');
    if (!iframes.length) return;

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var iframe = entry.target;
                    iframe.src = iframe.getAttribute('data-src');
                    iframe.removeAttribute('data-src');
                    observer.unobserve(iframe);
                }
            });
        }, { rootMargin: '200px' });

        iframes.forEach(function(iframe) { observer.observe(iframe); });
    } else {
        // Fallback: load all iframes immediately
        iframes.forEach(function(iframe) {
            iframe.src = iframe.getAttribute('data-src');
            iframe.removeAttribute('data-src');
        });
    }
}

// ====================================
// Instagram Feed Slideshow
// ====================================
function initInstagramFeed() {
    var container = document.getElementById('instaSlideshow');
    if (!container) return;

    if (!INSTAGRAM_ACCESS_TOKEN || INSTAGRAM_ACCESS_TOKEN === 'YOUR_ACCESS_TOKEN') {
        container.innerHTML =
            '<div class="insta-fallback">' +
                '<p>Instagram feed not configured yet.</p>' +
                '<p>Set <code>INSTAGRAM_ACCESS_TOKEN</code> in script.js to enable the live feed.</p>' +
            '</div>';
        return;
    }

    var apiUrl = 'https://graph.instagram.com/me/media' +
        '?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp' +
        '&limit=' + INSTAGRAM_POST_COUNT +
        '&access_token=' + INSTAGRAM_ACCESS_TOKEN;

    fetch(apiUrl)
        .then(function(res) {
            if (!res.ok) throw new Error('Instagram API error');
            return res.json();
        })
        .then(function(json) {
            var posts = (json.data || []).filter(function(p) {
                return p.media_type === 'IMAGE' || p.media_type === 'CAROUSEL_ALBUM' || p.media_type === 'VIDEO';
            });

            if (posts.length === 0) {
                container.innerHTML = '<p class="insta-loading">No posts found.</p>';
                return;
            }

            buildInstaSlideshow(container, posts);
        })
        .catch(function() {
            container.innerHTML =
                '<div class="insta-fallback">' +
                    '<p>Could not load Instagram posts. The access token may have expired.</p>' +
                    '<a href="https://www.instagram.com/kalyan_oncosurgeon" target="_blank">Visit Instagram profile →</a>' +
                '</div>';
        });
}

function buildInstaSlideshow(container, posts) {
    var currentIndex = 0;
    var autoplayTimer = null;

    // Build DOM
    container.innerHTML = '';
    container.className = 'insta-slideshow insta-slideshow--ready';

    // Track
    var track = document.createElement('div');
    track.className = 'insta-track';

    posts.forEach(function(post) {
        var slide = document.createElement('a');
        slide.className = 'insta-slide';
        slide.href = post.permalink;
        slide.target = '_blank';
        slide.rel = 'noopener';

        var imgSrc = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
        var caption = post.caption ? sanitizeHTML(post.caption.substring(0, 120)) : '';

        slide.innerHTML =
            '<div class="insta-slide-img">' +
                '<img src="' + imgSrc + '" alt="' + caption + '" loading="lazy" decoding="async">' +
                (post.media_type === 'VIDEO' ? '<span class="insta-video-badge">▶</span>' : '') +
                (post.media_type === 'CAROUSEL_ALBUM' ? '<span class="insta-carousel-badge">❑❑</span>' : '') +
            '</div>' +
            (caption ? '<p class="insta-caption">' + caption + (post.caption.length > 120 ? '…' : '') + '</p>' : '');

        track.appendChild(slide);
    });

    container.appendChild(track);

    // Navigation arrows
    var prevBtn = document.createElement('button');
    prevBtn.className = 'insta-nav insta-nav--prev';
    prevBtn.setAttribute('aria-label', 'Previous posts');
    prevBtn.innerHTML = '‹';
    container.appendChild(prevBtn);

    var nextBtn = document.createElement('button');
    nextBtn.className = 'insta-nav insta-nav--next';
    nextBtn.setAttribute('aria-label', 'Next posts');
    nextBtn.innerHTML = '›';
    container.appendChild(nextBtn);

    // Dots
    var slidesPerView = getSlidesPerView();
    var totalPages = Math.ceil(posts.length / slidesPerView);
    var dotsWrap = document.createElement('div');
    dotsWrap.className = 'insta-dots';

    for (var d = 0; d < totalPages; d++) {
        var dot = document.createElement('button');
        dot.className = 'insta-dot' + (d === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to page ' + (d + 1));
        dot.dataset.index = d;
        dotsWrap.appendChild(dot);
    }
    container.appendChild(dotsWrap);

    // Slide logic
    function getSlidesPerView() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        if (window.innerWidth <= 1024) return 3;
        return 4;
    }

    function goTo(pageIndex) {
        slidesPerView = getSlidesPerView();
        totalPages = Math.ceil(posts.length / slidesPerView);
        if (pageIndex < 0) pageIndex = totalPages - 1;
        if (pageIndex >= totalPages) pageIndex = 0;
        currentIndex = pageIndex;

        var offset = -(currentIndex * slidesPerView * (100 / slidesPerView));
        track.style.transform = 'translateX(' + offset + '%)';

        var dots = dotsWrap.querySelectorAll('.insta-dot');
        dots.forEach(function(dot, i) {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    prevBtn.addEventListener('click', function() { goTo(currentIndex - 1); resetAutoplay(); });
    nextBtn.addEventListener('click', function() { goTo(currentIndex + 1); resetAutoplay(); });
    dotsWrap.addEventListener('click', function(e) {
        if (e.target.classList.contains('insta-dot')) {
            goTo(parseInt(e.target.dataset.index));
            resetAutoplay();
        }
    });

    // Autoplay
    function resetAutoplay() {
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(function() { goTo(currentIndex + 1); }, 5000);
    }
    resetAutoplay();

    // Pause on hover
    container.addEventListener('mouseenter', function() { clearInterval(autoplayTimer); });
    container.addEventListener('mouseleave', function() { resetAutoplay(); });

    // Recalculate on resize
    var resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Rebuild dots for new slidesPerView
            slidesPerView = getSlidesPerView();
            totalPages = Math.ceil(posts.length / slidesPerView);
            dotsWrap.innerHTML = '';
            for (var d = 0; d < totalPages; d++) {
                var dot = document.createElement('button');
                dot.className = 'insta-dot' + (d === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Go to page ' + (d + 1));
                dot.dataset.index = d;
                dotsWrap.appendChild(dot);
            }
            goTo(0);
        }, 250);
    });
}

// ====================================
// Utility Functions
// ====================================

// Format date helper
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Sanitize HTML helper (basic protection)
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// Validate email helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ====================================
// Admin Functions (for demonstration)
// ====================================

// Function to view all stored data (call from browser console)
function viewStoredData() {
    console.log('=== STORED DATA ===');
    console.log('Contacts:', JSON.parse(localStorage.getItem('contacts')) || []);
}

// Function to clear all data (call from browser console)
function clearAllData() {
    if (confirm('Are you sure you want to clear all stored data? This cannot be undone.')) {
        localStorage.removeItem('contacts');
        location.reload();
    }
}

// Make admin functions available globally
window.viewStoredData = viewStoredData;
window.clearAllData = clearAllData;

// ====================================
// Console Welcome Message
// ====================================
console.log('%c🏥 Clinical Serenity Website', 'color: #0D7377; font-size: 20px; font-weight: bold;');
console.log('%cAdmin Functions Available:', 'color: #FF6B6B; font-weight: bold;');
console.log('- viewStoredData() - View all stored contacts');
console.log('- clearAllData() - Clear all stored data');
console.log('%cWebsite ready!', 'color: #0D7377; font-weight: bold;');
