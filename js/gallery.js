import { getTranslations } from './invitation-i18n.js';

const photoModules = import.meta.glob([
  '../assets/photos/*.{avif,gif,jpeg,jpg,png,webp,AVIF,GIF,JPEG,JPG,PNG,WEBP}',
  '!../assets/photos/._*',
], {
  eager: true,
  import: 'default',
  query: '?url',
});

const galleryPhotos = Object.entries(photoModules)
  .map(([path, src]) => ({
    name: path.split('/').pop(),
    src,
  }))
  .filter((photo) => photo.name && !photo.name.startsWith('._'))
  .sort((left, right) => left.name.localeCompare(right.name, undefined, {
    numeric: true,
    sensitivity: 'base',
  }));

const grid = document.getElementById('photo-gallery-grid');
const moreButton = document.getElementById('photo-gallery-more');
const viewer = document.getElementById('gallery-viewer');
const viewerImage = document.getElementById('gallery-viewer-image');
const viewerCaption = document.getElementById('gallery-viewer-caption');
const closeButton = viewer?.querySelector('.gallery-viewer__close');
const previousButton = viewer?.querySelector('.gallery-viewer__nav--previous');
const nextButton = viewer?.querySelector('.gallery-viewer__nav--next');
let activePhoto = 0;
let galleryExpanded = false;

function getCollapsedPhotoCount() {
  const columnCount = window.matchMedia('(max-width: 980px)').matches ? 2 : 4;
  return columnCount * 2;
}

function updateGalleryLimit() {
  if (!grid || !moreButton) return;

  const collapsedPhotoCount = getCollapsedPhotoCount();
  const items = grid.querySelectorAll('.photo-gallery__item');

  items.forEach((item, index) => {
    item.hidden = !galleryExpanded && index >= collapsedPhotoCount;
  });

  moreButton.hidden = items.length <= collapsedPhotoCount;
  const translationKey = galleryExpanded ? 'gallery_show_less' : 'gallery_show_more';
  moreButton.dataset.i18n = translationKey;
  moreButton.textContent = getTranslations()[translationKey];
  moreButton.setAttribute('aria-expanded', String(galleryExpanded));
}

function getPhotoDescription(index) {
  return `${getTranslations().gallery_title} ${index + 1}`;
}

function setViewerPhoto(index) {
  if (!galleryPhotos.length) return;

  activePhoto = (index + galleryPhotos.length) % galleryPhotos.length;
  const photo = galleryPhotos[activePhoto];
  const description = getPhotoDescription(activePhoto);

  if (viewerImage) {
    viewerImage.src = photo.src;
    viewerImage.alt = description;
  }

  if (viewerCaption) {
    viewerCaption.textContent = `${activePhoto + 1} / ${galleryPhotos.length}`;
  }
}

function openViewer(index) {
  if (!viewer || typeof viewer.showModal !== 'function') return;
  setViewerPhoto(index);
  viewer.showModal();
  document.body.classList.add('dialog-open');
}

if (grid) {
  const fragment = document.createDocumentFragment();

  galleryPhotos.forEach((photo, index) => {
    const description = getPhotoDescription(index);
    const button = document.createElement('button');
    button.className = 'photo-gallery__item';
    button.type = 'button';
    button.dataset.photoIndex = String(index);
    button.setAttribute('aria-label', getTranslations().gallery_open(index + 1, description));

    const image = document.createElement('img');
    image.src = photo.src;
    image.alt = description;
    image.loading = 'lazy';
    image.decoding = 'async';

    button.append(image);
    button.addEventListener('click', () => openViewer(index));
    fragment.append(button);
  });

  grid.append(fragment);
  updateGalleryLimit();
}

function translateGallery() {
  const text = getTranslations();

  grid?.querySelectorAll('.photo-gallery__item').forEach((button) => {
    const index = Number(button.dataset.photoIndex);
    const description = getPhotoDescription(index);
    button.setAttribute('aria-label', text.gallery_open(index + 1, description));
    const image = button.querySelector('img');
    if (image) image.alt = description;
  });

  if (viewer?.open) setViewerPhoto(activePhoto);
  updateGalleryLimit();
}

moreButton?.addEventListener('click', () => {
  galleryExpanded = !galleryExpanded;
  updateGalleryLimit();
});

window.addEventListener('resize', updateGalleryLimit);

closeButton?.addEventListener('click', () => viewer.close());
previousButton?.addEventListener('click', () => setViewerPhoto(activePhoto - 1));
nextButton?.addEventListener('click', () => setViewerPhoto(activePhoto + 1));

viewer?.addEventListener('click', (event) => {
  if (event.target === viewer) viewer.close();
});

viewer?.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  if (viewerImage) viewerImage.src = '';
});

viewer?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') setViewerPhoto(activePhoto - 1);
  if (event.key === 'ArrowRight') setViewerPhoto(activePhoto + 1);
});

document.addEventListener('invitation:languagechange', translateGallery);

export { galleryPhotos };
