import { getTranslations } from './invitation-i18n.js';

const header = document.getElementById('site-header');
const toggle = document.getElementById('site-nav-toggle');
const navigation = document.getElementById('site-navigation');
const links = [...(navigation?.querySelectorAll('a') || [])];

function setMenuOpen(open) {
  if (!header || !toggle) return;
  const text = getTranslations();
  header.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? text.menu_close : text.menu_open);
}

toggle?.addEventListener('click', () => {
  setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
});

links.forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('click', (event) => {
  if (header && !header.contains(event.target)) setMenuOpen(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || toggle?.getAttribute('aria-expanded') !== 'true') return;
  setMenuOpen(false);
  toggle.focus();
});

function syncHeaderSurface() {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}

window.addEventListener('scroll', syncHeaderSurface, { passive: true });
syncHeaderSurface();

document.addEventListener('invitation:languagechange', () => {
  setMenuOpen(toggle?.getAttribute('aria-expanded') === 'true');
});

if ('IntersectionObserver' in window) {
  const sectionLinks = new Map(
    links.map((link) => [link.getAttribute('href')?.slice(1), link]),
  );
  const sections = [...sectionLinks.keys()]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    links.forEach((link) => link.removeAttribute('aria-current'));
    sectionLinks.get(visible.target.id)?.setAttribute('aria-current', 'true');
  }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, .2, .5] });

  sections.forEach((section) => sectionObserver.observe(section));
}
