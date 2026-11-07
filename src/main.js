import './style.css';
import { business, collections, vision } from './content.js';
import { renderWebsite } from './render.js';

const app = document.querySelector('#app');
app.innerHTML = renderWebsite();

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const activeEffects = new Set();
function motion(element, frames, options = {}) {
  if (motionPreference.matches || !element || typeof element.animate !== 'function') return null;
  const effect = element.animate(frames, { duration: 650, easing: 'cubic-bezier(.22,1,.36,1)', ...options });
  activeEffects.add(effect);
  effect.finished.then(() => activeEffects.delete(effect), () => activeEffects.delete(effect));
  return effect;
}

// Navigation keeps its own state and leaves all page destinations as real links.
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');
function collapseNavigation(restoreFocus = false) {
  navToggle.setAttribute('aria-expanded', 'false');
  siteNav.classList.remove('expanded');
  if (restoreFocus) navToggle.focus();
}
navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  siteNav.classList.toggle('expanded', !expanded);
  if (!expanded) motion(siteNav, [{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 250 });
});
siteNav.addEventListener('click', (event) => { if (event.target.closest('a')) collapseNavigation(); });
window.matchMedia('(max-width: 780px)').addEventListener('change', () => collapseNavigation());
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') collapseNavigation(true);
});
document.addEventListener('click', (event) => { if (!event.target.closest('.masthead')) collapseNavigation(); });

const filters = [...document.querySelectorAll('[data-category]')];
const grid = document.querySelector('.work-grid');
filters.forEach((filter) => filter.addEventListener('click', () => {
  grid.getAnimations().forEach((effect) => effect.cancel());
  const tiles = [...grid.querySelectorAll('.work-tile')];
  tiles.forEach((tile) => tile.getAnimations().forEach((effect) => effect.cancel()));
  const previousHeight = grid.getBoundingClientRect().height;
  const previousPositions = new Map(tiles.filter((tile) => !tile.hidden).map((tile) => [tile, tile.getBoundingClientRect()]));
  const kind = filter.dataset.category;
  let count = 0;
  grid.classList.toggle('filtered', kind !== 'all');
  grid.querySelectorAll('.work-tile').forEach((tile) => {
    tile.hidden = kind !== 'all' && tile.dataset.kind !== kind;
    if (!tile.hidden) count++;
  });
  filters.forEach((button) => {
    button.classList.toggle('selected', button === filter);
    button.setAttribute('aria-pressed', String(button === filter));
  });
  document.querySelector('.collection-result').textContent = `${count} ${count === 1 ? 'collection' : 'collections'}`;
  if (!motionPreference.matches) {
    const visible = tiles.filter((tile) => !tile.hidden);
    const nextHeight = grid.getBoundingClientRect().height;
    grid.style.overflow = 'hidden';
    visible.forEach((tile, index) => {
      const next = tile.getBoundingClientRect();
      const previous = previousPositions.get(tile);
      motion(tile, [
        { opacity: previous ? 1 : 0, transform: previous ? `translate(${previous.left - next.left}px, ${previous.top - next.top}px)` : 'translateY(18px)' },
        { opacity: 1, transform: 'translate(0,0)' },
      ], { duration: 430, delay: Math.min(index * 35, 140) });
    });
    const resize = motion(grid, [{ height: `${previousHeight}px` }, { height: `${nextHeight}px` }], { duration: 470 });
    if (resize) resize.onfinish = resize.oncancel = () => { grid.style.overflow = ''; };
    else grid.style.overflow = '';
  }
}));

// A native modal provides focus containment and Escape behaviour.
const viewer = document.querySelector('.viewer');
const viewerImage = document.querySelector('.viewer-image');
const thumbTray = document.querySelector('.viewer-thumbs');
const back = document.querySelector('.viewer-back');
const forward = document.querySelector('.viewer-forward');
let gallery = null;
let position = 0;
let returnFocus = null;
function displayPhoto(index) {
  position = (index + gallery.images.length) % gallery.images.length;
  const image = gallery.images[position];
  viewerImage.src = image.url;
  viewerImage.alt = image.alt;
  if (viewer.open) {
    viewerImage.getAnimations().forEach((effect) => effect.cancel());
    motion(viewerImage, [{ opacity: .25, transform: 'scale(.985)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 300 });
  }
  document.querySelector('.viewer-caption').textContent = `${image.caption} · ${position + 1} / ${gallery.images.length}`;
  thumbTray.querySelectorAll('button').forEach((button, item) => button.setAttribute('aria-pressed', String(item === position)));
}
function explore(project, initialPhoto = 0) {
  gallery = project;
  returnFocus = document.activeElement;
  document.querySelector('#viewer-heading').textContent = project.name;
  const description = document.querySelector('#viewer-description');
  const isConcept = project.key === 'vision';
  description.textContent = isConcept ? 'Home design concept' : '';
  description.hidden = !isConcept;
  viewer.classList.toggle('single-photo', project.images.length === 1);
  if (isConcept) viewer.setAttribute('aria-describedby', 'viewer-description');
  else viewer.removeAttribute('aria-describedby');
  thumbTray.replaceChildren();
  project.images.forEach((image, index) => {
    const thumb = document.createElement('button');
    thumb.type = 'button';
    thumb.setAttribute('aria-label', `Photograph ${index + 1}: ${image.caption}`);
    thumb.setAttribute('aria-pressed', 'false');
    const preview = new Image(48, 48);
    preview.src = image.url;
    preview.alt = '';
    thumb.append(preview);
    thumb.addEventListener('click', () => displayPhoto(index));
    thumbTray.append(thumb);
  });
  back.hidden = forward.hidden = thumbTray.hidden = project.images.length === 1;
  displayPhoto(initialPhoto);
  viewer.showModal();
  document.body.classList.add('viewing');
  motion(viewer, [{ opacity: 0, transform: 'translateY(18px) scale(.985)' }, { opacity: 1, transform: 'translateY(0) scale(1)' }], { duration: 320 });
  document.querySelector('.viewer-close').focus();
}
document.querySelectorAll('[data-project]').forEach((trigger) => trigger.addEventListener('click', () => {
  explore(trigger.dataset.project === 'vision' ? vision : collections.find((item) => item.key === trigger.dataset.project), Number(trigger.dataset.photo || 0));
}));
back.addEventListener('click', () => displayPhoto(position - 1));
forward.addEventListener('click', () => displayPhoto(position + 1));
document.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
viewer.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    displayPhoto(position + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});
viewer.addEventListener('close', () => {
  document.body.classList.remove('viewing');
  returnFocus?.focus({ preventScroll: true });
});
let pointerOutside = false;
const outsideViewer = (event) => {
  const bounds = viewer.getBoundingClientRect();
  return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
};
viewer.addEventListener('pointerdown', (event) => { pointerOutside = outsideViewer(event); });
viewer.addEventListener('click', (event) => { if (pointerOutside && outsideViewer(event)) viewer.close(); pointerOutside = false; });

const enquiry = document.querySelector('.project-enquiry');
const response = document.querySelector('.enquiry-result');
const status = document.querySelector('.enquiry-status');
const draftText = document.querySelector('.draft-text');
const copy = document.querySelector('.copy-draft');
document.querySelectorAll('[data-interest]').forEach((link) => link.addEventListener('click', () => { enquiry.elements.interest.value = link.dataset.interest; }));
enquiry.querySelectorAll('[required]').forEach((field) => field.addEventListener('input', () => field.setCustomValidity(field.value.trim() ? '' : 'Please complete this field.')));
enquiry.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!enquiry.reportValidity()) return;
  const values = Object.fromEntries([...new FormData(enquiry)].map(([key, value]) => [key, value.trim()]));
  const subject = `Project enquiry — ${values.interest}`;
  const body = `Name: ${values.fullName}\nEmail: ${values.emailAddress}\nPhone: ${values.telephone}\nService: ${values.interest}\nSuburb: ${values.locality || 'Not provided'}\n\nProject details:\n${values.description}`;
  draftText.value = `To: ${business.email}\nSubject: ${subject}\n\n${body}`;
  response.hidden = false;
  status.textContent = 'Your email draft is ready. Review and send it in your email app. Nothing has been sent yet.';
  copy.textContent = 'Copy enquiry details';
  const link = document.createElement('a');
  link.href = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  link.hidden = true;
  document.body.append(link);
  link.click();
  link.remove();
});
copy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(draftText.value);
    copy.textContent = 'Details copied';
    status.textContent = `Copied. Paste the enquiry into an email to ${business.email} and send when you’re ready.`;
  } catch {
    draftText.focus();
    draftText.select();
    status.textContent = 'Your enquiry is selected below. Use your device’s copy command and paste it into your email app.';
  }
});

// Motion enhances an already visible page. Downloads never depend on an animation
// class or observer to make content appear, and reduced-motion preferences win.
document.querySelectorAll('.hero-word').forEach((word, index) => {
  motion(word, [{ opacity: 0, transform: 'translateY(105%)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 900, delay: 110 + index * 130 });
});
motion(document.querySelector('.opening .kicker'), [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 600 });
motion(document.querySelector('.opening-description'), [{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 700, delay: 330 });
motion(document.querySelector('.opening-actions'), [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 700, delay: 430 });
motion(document.querySelector('.opening-photo'), [{ transform: 'scale(1.12)' }, { transform: 'scale(1.04)' }], { duration: 1700 });
motion(document.querySelector('.hero-project-card'), [{ opacity: 0, transform: 'translateY(28px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 950, delay: 520 });
motion(document.querySelector('.wordmark'), [{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 800 });

let revealObserver;
const revealed = new WeakSet();
function observeReveals() {
  if (motionPreference.matches || revealObserver || !('IntersectionObserver' in window)) return;
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || revealed.has(entry.target)) return;
      revealed.add(entry.target);
      const siblings = [...entry.target.parentElement.children].filter((child) => child.hasAttribute('data-reveal'));
      const offset = Math.max(0, siblings.indexOf(entry.target)) % 3;
      motion(entry.target, [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 780, delay: offset * 75 });
      if (entry.target.classList.contains('accessibility-visual')) {
        motion(entry.target.querySelector('.accessibility-art'), [{ transform: 'scale(1.09)' }, { transform: 'scale(1)' }], { duration: 1500 });
        motion(entry.target.querySelector('.accessibility-badge'), [{ opacity: 0, transform: 'translate(-18px, 16px)' }, { opacity: 1, transform: 'translate(0, 0)' }], { duration: 850, delay: 350 });
      }
      if (entry.target.classList.contains('comparison-panel')) {
        entry.target.querySelectorAll('.comparison-figure').forEach((figure, index) => {
          motion(figure, [{ opacity: .25, transform: `translateY(${index ? 26 : 12}px)` }, { opacity: 1, transform: 'translateY(0)' }], { duration: 850, delay: index * 150 });
        });
      }
      if (entry.target.classList.contains('work-tile')) {
        motion(entry.target.querySelector('.work-photo > img'), [{ transform: 'scale(1.065)' }, { transform: 'scale(1)' }], { duration: 1100 });
      }
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .06, rootMargin: '0px 0px 45px 0px' });
  document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element));
}
observeReveals();

document.querySelectorAll('.service-detail').forEach((detail) => detail.addEventListener('toggle', () => {
  if (detail.open) motion(detail.querySelector('.service-body'), [{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 350 });
}));

const masthead = document.querySelector('.masthead');
const readingProgress = document.querySelector('.reading-progress > span');
const heroPhoto = document.querySelector('.opening-photo');
let scrollFrame = 0;
function updateScrollPresentation() {
  scrollFrame = 0;
  masthead.classList.toggle('scrolled', window.scrollY > 35);
  const travel = document.documentElement.scrollHeight - window.innerHeight;
  if (readingProgress) readingProgress.style.transform = `scaleX(${travel > 0 ? Math.min(1, Math.max(0, window.scrollY / travel)) : 0})`;
  if (heroPhoto) heroPhoto.style.translate = !motionPreference.matches && window.innerWidth > 980 ? `0 ${Math.min(12, window.scrollY * .025)}px` : '0 0';
}
function requestScrollPresentation() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollPresentation);
}
window.addEventListener('scroll', requestScrollPresentation, { passive: true });
window.addEventListener('resize', requestScrollPresentation, { passive: true });
updateScrollPresentation();

if ('IntersectionObserver' in window) {
  const links = [...siteNav.querySelectorAll('a[href^="#"]:not(.action)')];
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
      links.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -65% 0px' });
  document.querySelectorAll('main > section').forEach((section) => sectionObserver.observe(section));
}

motionPreference.addEventListener('change', () => {
  if (motionPreference.matches) {
    activeEffects.forEach((effect) => effect.cancel());
    revealObserver?.disconnect();
    revealObserver = undefined;
    grid.style.overflow = '';
  } else observeReveals();
  updateScrollPresentation();
});
