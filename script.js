(() => {
  'use strict';

  document.documentElement.classList.add('js');

  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('#site-navigation');
  const navigationLinks = navigation ? [...navigation.querySelectorAll('a[href^="#"]')] : [];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const setMenuState = (isOpen, returnFocus = false) => {
    if (!header || !menuButton) return;

    header.classList.toggle('nav-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.querySelector('.nav-toggle__label').textContent = isOpen ? 'Close' : 'Menu';

    if (returnFocus) menuButton.focus();
  };

  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  navigationLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header?.classList.contains('nav-open')) {
      setMenuState(false, true);
    }
  });

  document.addEventListener('click', (event) => {
    if (header?.classList.contains('nav-open') && !header.contains(event.target)) {
      setMenuState(false);
    }
  });

  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 18);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const revealElements = [...document.querySelectorAll('[data-reveal]')];

  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    document.documentElement.classList.add('reveal-ready');

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  const pageSections = [...document.querySelectorAll('main section[id]')];

  if ('IntersectionObserver' in window && navigationLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navigationLinks.forEach((link) => {
          const isCurrent = link.getAttribute('href') === `#${entry.target.id}`;
          if (isCurrent) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

    pageSections.forEach((section) => sectionObserver.observe(section));
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && header?.classList.contains('nav-open')) {
      setMenuState(false);
    }
  }, { passive: true });
})();
