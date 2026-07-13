import { getTranslations } from './invitation-i18n.js';

const galleryPhotos = [
  {
    src: new URL('../assets/photos/TUAN1031.JPG', import.meta.url).href,
    alt: 'Thịnh và Vy đứng bên nhau dưới vòm cây xanh',
    width: 2048,
    height: 1366,
    position: '50% 54%',
  },
  {
    src: new URL('../assets/photos/hero.jpeg', import.meta.url).href,
    alt: 'Thịnh khẽ nâng khăn voan của Vy bên hồ giữa rừng cây',
    width: 5720,
    height: 3814,
    position: '50% 59%',
  },
  {
    src: new URL('../assets/photos/TUAN2362.JPG', import.meta.url).href,
    alt: 'Thịnh và Vy trong khung cảnh rừng thông rộng lớn',
    width: 2048,
    height: 1366,
    position: '56% 72%',
  },
  {
    src: new URL('../assets/photos/TUAN1135.JPG', import.meta.url).href,
    alt: 'Chân dung Thịnh và Vy giữa vòm cây',
    width: 1366,
    height: 2048,
    position: '50% 69%',
  },
  {
    src: new URL('../assets/photos/chỉnh sửa chân thật khuôn mặt chú rể.png', import.meta.url).href,
    alt: 'Thịnh và Vy trong khoảnh khắc bên hồ dưới vòm lá',
    width: 1535,
    height: 1024,
    position: '50% 57%',
  },
  {
    src: new URL('../assets/photos/chỉnh sửa chân thật khuôn mặt chú rể (1).png', import.meta.url).href,
    alt: 'Một khoảnh khắc của Thịnh và Vy giữa thiên nhiên',
    width: 1535,
    height: 1024,
    position: 'center',
  },
  {
    src: new URL('../assets/photos/photo_2026-07-03 08.05.44 (1).jpeg', import.meta.url).href,
    alt: 'Chân dung đời thường của Vy bên hồ',
    width: 1280,
    height: 960,
    position: '64% center',
  },
  {
    src: new URL('../assets/photos/photo_2026-07-03 08.09.30 (1).jpeg', import.meta.url).href,
    alt: 'Chân dung đời thường của Vy bên kệ sách',
    width: 2560,
    height: 1920,
    position: '45% center',
  },
];

const grid = document.getElementById('photo-gallery-grid');
const viewer = document.getElementById('gallery-viewer');
const viewerImage = document.getElementById('gallery-viewer-image');
const viewerCaption = document.getElementById('gallery-viewer-caption');
const closeButton = viewer?.querySelector('.gallery-viewer__close');
const previousButton = viewer?.querySelector('.gallery-viewer__nav--previous');
const nextButton = viewer?.querySelector('.gallery-viewer__nav--next');
let activePhoto = 0;

function getPhotoDescription(index) {
  const text = getTranslations();
  return text.photos[index] || galleryPhotos[index].alt;
}

function setViewerPhoto(index) {
  activePhoto = (index + galleryPhotos.length) % galleryPhotos.length;
  const photo = galleryPhotos[activePhoto];
  const description = getPhotoDescription(activePhoto);

  if (viewerImage) {
    viewerImage.src = photo.src;
    viewerImage.alt = description;
  }

  if (viewerCaption) {
    viewerCaption.textContent = `${activePhoto + 1} / ${galleryPhotos.length} · ${description}`;
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
    button.style.setProperty('--photo-position', photo.position);

    const image = document.createElement('img');
    image.src = photo.src;
    image.alt = description;
    image.width = photo.width;
    image.height = photo.height;
    image.loading = 'lazy';
    image.decoding = 'async';

    button.append(image);
    button.addEventListener('click', () => openViewer(index));
    fragment.append(button);
  });

  grid.append(fragment);
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
}

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
