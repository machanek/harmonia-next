(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  function initSmoothAnchors() {
    const links = [
      ...$$('.main-nav a[href^="#"]'),
      ...$$('a[href^="#"][data-smooth]')
    ];
    links.forEach(a => {
      a.addEventListener('click', e => {
        const href = a.getAttribute('href') || '';
        if (!href.startsWith('#')) return;
        const target = $(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', href);
      });
    });
  }

  function initStickyHeader() {
    const header = $('.site-header');
    if (!header) return;
    const onScroll = () => {
      if (window.scrollY > 10) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initMobileNav() {
    const header = document.querySelector('.site-header');
    const nav = document.querySelector('.main-nav');
    if (!header || !nav) return;

    // Wstawiamy toggle do RODZICA nawigacji (np. .header-inner), nie do <header>
    const parent = nav.parentElement || header;

    // Jeśli już jest przycisk – nic nie rób
    if (parent.querySelector('.nav-toggle')) return;

    // Nadaj id nav (dla aria-controls)
    if (!nav.id) nav.id = 'main-nav';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', 'Menu');
    btn.setAttribute('aria-controls', nav.id);
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '☰';

    // Wstaw PRZED nav w tym samym rodzicu
    parent.insertBefore(btn, nav);

    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSmoothAnchors();
    initStickyHeader();
    initMobileNav();
  });
})();
