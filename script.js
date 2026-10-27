/* ==========================================================================
   RATNA ENTERPRISE — site script
   --------------------------------------------------------------------------
   Contents
   01  Business configuration   <-- EDIT YOUR DETAILS HERE
   02  Product data
   03  Helpers
   04  Apply configuration to the page
   05  Page loader
   06  Mobile navigation
   07  Sticky header
   08  Scroll reveal
   09  Counter animation
   10  WhatsApp integration
   11  Product cards + enquiry buttons
   12  Enquiry form
   13  Back to top
   14  Active navigation tracking
   15  Init
   ========================================================================== */

'use strict';

/* ==========================================================================
   01  BUSINESS CONFIGURATION
   --------------------------------------------------------------------------
   This is the only block you normally need to edit.
   Everything on the page (links, phone numbers, WhatsApp messages, footer)
   reads from here.
   ========================================================================== */
const BUSINESS_CONFIG = {
  name:        'Ratna Enterprise',
  tagline:     'Quality construction materials. Reliable supply. Fair prices.',

  phone:       '98641 05776',        // shown on the page
  phoneDial:   '+919864105776',      // used by the "call" links

  whatsapp:    '919864105776',       // country code + number, no +, no spaces
  whatsappDisplay: '98641 05776',    // shown on the page

  email:       'ratnaenterprise1234@gmail.com',    // e.g. ratnaenterprise@gmail.com

  address:     'Jethua Market, Karbi Namghar Path, Japorigog, Zoo Road, Guwahati, Assam 781005',
  city:        'Guwahati, Assam',
  hours:       'Mon – Sun, 9:00 AM – 7:00 PM',
  hoursShort:  'Mon–Sun',

  // Used by the "Open in Google Maps" links. Replace with your own Maps link
  // (Google Maps → Share → Copy link) if you want an exact pin.
  mapsUrl:     'https://maps.app.goo.gl/J1yfgjLPY2Gi9CmF6'
};


/* ==========================================================================
   02  PRODUCT DATA
   --------------------------------------------------------------------------
   Add, remove or reorder materials here — the cards and their WhatsApp
   messages are generated from this list.
   image : path to the photo (drop your own file in assets/images/)
   icon  : id of an icon in the sprite at the top of index.html
   ========================================================================== */
const PRODUCTS = [
  {
    name: 'Stone Chips',
    category: 'Aggregate',
    text: 'Durable 3/4 and 1/2 inch aggregate for concrete, foundations and general construction work.',
    image: 'assets/images/Stone.png',
    alt: 'Crushed stone chips used as construction aggregate',
    icon: 'i-layers'
  },
  {
    name: 'Sand',
    category: 'Aggregate',
    text: 'Best quality river sand for concrete, masonry, plastering and finishing work.',
    image: 'assets/images/Sand.jpeg',
    alt: 'Fine construction sand',
    icon: 'i-waves'
  },
  {
    name: 'Cement',
    category: 'Binder',
    text: 'Reliable cement options for strong concrete, masonry and general construction.',
    image: 'assets/images/cement2.jpg',
    alt: 'Cured cement surface',
    icon: 'i-box'
  },
  {
    name: 'Bricks',
    category: 'Masonry',
    text: 'Construction bricks for walls, partitions and building projects.',
    image: 'assets/images/bricks2.jpeg',
    alt: 'Stacked red construction bricks',
    icon: 'i-brick'
  },
  {
    name: 'Stone Dust',
    category: 'Fine material',
    text: 'Fine stone material for filling, paving and concrete preparation.',
    image: 'assets/images/Stonedust.jpeg',
    alt: 'Fine crushed stone dust',
    icon: 'i-grain'
  },
  {
    name: 'Filling Soil',
    category: 'Earthwork',
    text: 'River Soil for land filling, levelling, foundations and site preparation.',
    image: 'assets/images/filingsoil.png',
    alt: 'Loose filling soil for site preparation',
    icon: 'i-terrain'
  }
];


/* ==========================================================================
   03  HELPERS
   ========================================================================== */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Google Maps link for the shop address. */
function mapsLink() {
  if (BUSINESS_CONFIG.mapsUrl) return BUSINESS_CONFIG.mapsUrl;
  return 'https://www.google.com/maps/search/?api=1&query=' +
         encodeURIComponent(BUSINESS_CONFIG.address);
}


/* ==========================================================================
   04  APPLY CONFIGURATION TO THE PAGE
   Fills every [data-biz] and [data-biz-link] element from BUSINESS_CONFIG.
   ========================================================================== */
function applyConfig() {
  $$('[data-biz]').forEach((el) => {
    const key = el.dataset.biz;
    if (BUSINESS_CONFIG[key]) el.textContent = BUSINESS_CONFIG[key];
  });

  $$('[data-biz-link]').forEach((el) => {
    switch (el.dataset.bizLink) {
      case 'tel':
        el.href = 'tel:' + BUSINESS_CONFIG.phoneDial;
        break;
      case 'mail':
        el.href = 'mailto:' + BUSINESS_CONFIG.email;
        break;
      case 'maps':
        el.href = mapsLink();
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
        break;
    }
  });

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  document.title = BUSINESS_CONFIG.name + ' | Construction Materials Supplier in ' + BUSINESS_CONFIG.city;
}


/* ==========================================================================
   05  PAGE LOADER
   ========================================================================== */
function initLoader() {
  const loader = $('#loader');
  if (!loader) return;

  const hide = () => {
    loader.classList.add('is-done');
    window.setTimeout(() => loader.remove(), 600);
  };

  // short and out of the way — never blocks the page for long
  window.setTimeout(hide, prefersReducedMotion() ? 0 : 700);
}


/* ==========================================================================
   06  MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const burger   = $('#burger');
  const nav      = $('#nav');
  const backdrop = $('#navBackdrop');
  if (!burger || !nav) return;

  const openMenu = () => {
    nav.classList.add('is-open');
    burger.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
    if (backdrop) backdrop.hidden = false;
  };

  const closeMenu = () => {
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
    if (backdrop) backdrop.hidden = true;
  };

  const isOpen = () => nav.classList.contains('is-open');

  burger.addEventListener('click', () => (isOpen() ? closeMenu() : openMenu()));
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  // close after tapping a link
  $$('a', nav).forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      closeMenu();
      burger.focus();
    }
  });

  // reset when resizing back to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 980 && isOpen()) closeMenu();
  });
}


/* ==========================================================================
   07  STICKY HEADER
   ========================================================================== */
function initStickyHeader() {
  const header = $('#header');
  if (!header) return;

  const update = () => header.classList.toggle('is-stuck', window.scrollY > 24);
  update();
  window.addEventListener('scroll', update, { passive: true });
}


/* ==========================================================================
   08  SCROLL REVEAL
   ========================================================================== */
function initReveal() {
  const items = $$('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  items.forEach((el) => observer.observe(el));
}

/** Stagger a group of siblings so they appear one after another. */
function stagger(selector, step = 90) {
  $$(selector).forEach((el, i) => {
    el.style.transitionDelay = (i * step) + 'ms';
  });
}


/* ==========================================================================
   09  COUNTER ANIMATION
   ========================================================================== */
function initCounters() {
  const counters = $$('.js-count');
  if (!counters.length) return;

  if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
    counters.forEach((el) => (el.textContent = el.dataset.count));
    return;
  }

  const run = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);           // ease-out cubic
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      run(entry.target);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  counters.forEach((el) => {
    el.textContent = '0';
    observer.observe(el);
  });
}


/* ==========================================================================
   10  WHATSAPP INTEGRATION
   ========================================================================== */
/**
 * HTML escape helper to prevent DOM XSS vulnerabilities when inserting dynamic content.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Open WhatsApp with a prefilled message.
 * @param {string} message - plain text, newlines allowed
 */
function openWhatsApp(message) {
  const number = String(BUSINESS_CONFIG.whatsapp).replace(/\D/g, '');
  const url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(message);
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (!win) {
    window.location.href = url;
  }
}

/** Any element with class .js-wa opens WhatsApp using its data-wa-message. */
function initWhatsAppLinks() {
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.js-wa');
    if (!trigger) return;

    e.preventDefault();
    const message = trigger.dataset.waMessage ||
      'Hello ' + BUSINESS_CONFIG.name + ', I would like to enquire about construction materials.';
    openWhatsApp(message);
  });
}

/** Message used by the per-product "Enquire now" buttons. */
function productMessage(productName) {
  return 'Hello ' + BUSINESS_CONFIG.name + ', I am interested in ' + productName +
         '. Please share the current price, available quantity and delivery details.';
}


/* ==========================================================================
   11  PRODUCT CARDS + ENQUIRY BUTTONS
   ========================================================================== */
function renderProducts() {
  const grid = $('#productGrid');
  if (!grid) return;

  const cards = PRODUCTS.map((p) => `
    <article class="card reveal">
      <div class="card__media">
        <!-- Replace this with your actual product image -->
        <img src="${encodeURI(p.image)}" alt="${escapeHtml(p.alt)}" loading="lazy" width="1400" height="1050">
        <span class="card__icon"><svg class="icon" aria-hidden="true"><use href="#${escapeHtml(p.icon)}"></use></svg></span>
      </div>
      <div class="card__body">
        <p class="card__cat">${escapeHtml(p.category)}</p>
        <h3 class="card__title">${escapeHtml(p.name)}</h3>
        <p class="card__text">${escapeHtml(p.text)}</p>
        <button class="card__btn js-wa" type="button"
                data-wa-message="${escapeHtml(productMessage(p.name))}">
          Enquire now
          <svg class="icon" aria-hidden="true"><use href="#i-arrow"></use></svg>
        </button>
      </div>
    </article>
  `).join('');

  grid.insertAdjacentHTML('afterbegin', cards);
}


/* ==========================================================================
   12  ENQUIRY FORM
   Validates, then hands the details to WhatsApp. There is no server.
   ========================================================================== */
function initForm() {
  const form = $('#enquiryForm');
  if (!form) return;

  const status = $('#formStatus');

  const setError = (fieldId, message) => {
    const input = $('#' + fieldId);
    const error = $('#err-' + fieldId.replace('f-', ''));
    if (!input) return;
    input.closest('.field').classList.toggle('has-error', Boolean(message));
    if (error) error.textContent = message || '';
    if (message) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  };

  const validate = () => {
    let firstInvalid = null;

    const name     = $('#f-name').value.trim();
    const phone    = $('#f-phone').value.trim();
    const material = $('#f-material').value;

    if (name.length < 2) {
      setError('f-name', 'Please enter your name.');
      firstInvalid = firstInvalid || $('#f-name');
    } else {
      setError('f-name', '');
    }

    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) {
      setError('f-phone', 'Please enter a valid phone number (10 to 15 digits).');
      firstInvalid = firstInvalid || $('#f-phone');
    } else {
      setError('f-phone', '');
    }

    if (!material) {
      setError('f-material', 'Please choose the material you need.');
      firstInvalid = firstInvalid || $('#f-material');
    } else {
      setError('f-material', '');
    }

    return firstInvalid;
  };

  // clear an error as soon as the customer fixes it
  ['f-name', 'f-phone', 'f-material'].forEach((id) => {
    const el = $('#' + id);
    if (!el) return;
    el.addEventListener('input', () => setError(id, ''));
    el.addEventListener('change', () => setError(id, ''));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstInvalid = validate();
    if (firstInvalid) {
      if (status) status.textContent = '';
      firstInvalid.focus();
      return;
    }

    const name     = $('#f-name').value.trim();
    const phone    = $('#f-phone').value.trim();
    const material = $('#f-material').value;
    const qty      = $('#f-qty').value.trim();
    const note     = $('#f-msg').value.trim();

    const lines = [
      'Hello ' + BUSINESS_CONFIG.name + ',',
      '',
      'I would like to enquire about:',
      '',
      'Name: ' + name,
      'Phone: ' + phone,
      'Material: ' + material
    ];
    if (qty)  lines.push('Quantity: ' + qty);
    if (note) lines.push('Message: ' + note);
    lines.push('', 'Thank you.');

    openWhatsApp(lines.join('\n'));

    if (status) status.textContent = 'Opening WhatsApp with your enquiry…';
    form.reset();
    window.setTimeout(() => { if (status) status.textContent = ''; }, 6000);
  });
}


/* ==========================================================================
   13  BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const btn = $('#backTop');
  if (!btn) return;

  const update = () => btn.classList.toggle('is-visible', window.scrollY > 600);
  update();
  window.addEventListener('scroll', update, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  });
}


/* ==========================================================================
   14  ACTIVE NAVIGATION TRACKING
   ========================================================================== */
function initActiveNav() {
  const links = $$('.nav__link');
  const sections = links
    .map((link) => $(link.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length || !('IntersectionObserver' in window)) return;

  const setActive = (id) => {
    links.forEach((link) =>
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + id)
    );
  };

  const observer = new IntersectionObserver((entries) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      .slice(0, 1)
      .forEach((entry) => setActive(entry.target.id));
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach((section) => observer.observe(section));
}


/* ==========================================================================
   15  INIT
   ========================================================================== */
function init() {
  applyConfig();
  renderProducts();

  stagger('.products__grid .card', 90);
  stagger('.why__grid .feature', 90);
  stagger('.process__list .step', 100);
  stagger('.stats .stat', 80);
  stagger('.testimonials__grid .quote', 90);

  initLoader();
  initMobileNav();
  initStickyHeader();
  initReveal();
  initCounters();
  initWhatsAppLinks();
  initForm();
  initBackToTop();
  initActiveNav();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
