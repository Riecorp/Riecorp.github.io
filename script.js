(() => {
  'use strict';

  // Keep all page content readable without JavaScript.
  document.documentElement.classList.add('js');
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('#site-navigation');
  const navigationLinks = navigation ? [...navigation.querySelectorAll('a')] : [];

  const setMenuState = (isOpen, returnFocus = false) => {
    if (!header || !menuButton) return;
    header.classList.toggle('nav-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    const label = menuButton.querySelector('.nav-toggle__label');
    if (label) label.textContent = isOpen ? 'Close' : 'Menu';
    if (returnFocus) menuButton.focus();
  };

  menuButton?.addEventListener('click', () => {
    setMenuState(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  navigationLinks.forEach(link => link.addEventListener('click', () => setMenuState(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header?.classList.contains('nav-open')) setMenuState(false, true);
  });
  document.addEventListener('click', event => {
    if (header?.classList.contains('nav-open') && !header.contains(event.target)) setMenuState(false);
  });
  header?.addEventListener('focusout', event => {
    if (header.classList.contains('nav-open') && event.relatedTarget && !header.contains(event.relatedTarget)) {
      setMenuState(false);
    }
  });
  const wideScreen = window.matchMedia('(min-width: 801px)');
  wideScreen.addEventListener('change', event => {
    if (event.matches) setMenuState(false);
  });

  // The controller lab only changes a local illustration. It opens no connections.
  const descriptions = {
    racing: 'Gyroscope steering, throttle and brake.',
    shooter: 'Movement, aim, fire and reload.',
    party: 'A large action button, swipe controls and motion input.',
    quiz: 'Multiple choice buttons and player-specific information.',
    strategy: 'Private player information, touch interactions and contextual controls.'
  };
  document.querySelectorAll('[data-controller-lab]').forEach(lab => {
    const selectors = [...lab.querySelectorAll('[data-layout]')];
    const panels = [...lab.querySelectorAll('[data-layout-panel]')];
    const output = lab.querySelector('[data-demo-output]');
    const caption = lab.querySelector('[data-layout-caption]');
    let activeTimer;
    let activeButton;
    selectors.forEach(button => {
      button.addEventListener('click', () => {
        const layout = button.dataset.layout;
        selectors.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        panels.forEach(panel => { panel.hidden = panel.dataset.layoutPanel !== layout; });
        if (caption) caption.textContent = descriptions[layout];
        if (output) output.textContent = 'Tap a control to preview an input.';
        if (activeButton) activeButton.classList.remove('is-active');
        window.clearTimeout(activeTimer);
      });
    });
    lab.querySelectorAll('[data-demo-input]').forEach(button => {
      button.addEventListener('click', () => {
        if (activeButton) activeButton.classList.remove('is-active');
        window.clearTimeout(activeTimer);
        activeButton = button;
        button.classList.add('is-active');
        if (output) output.textContent = 'Local preview: ' + button.dataset.demoInput + '. No session connected.';
        activeTimer = window.setTimeout(() => button.classList.remove('is-active'), 180);
      });
    });
  });

  // Preserve existing project deep links even though the archive is collapsed.
  const openLinkedProject = () => {
    if (window.location.hash !== '#the-gorge') return;
    const project = document.querySelector('#the-gorge');
    if (project instanceof HTMLDetailsElement) {
      project.open = true;
      project.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  };
  openLinkedProject();
  window.addEventListener('hashchange', openLinkedProject);
})();
