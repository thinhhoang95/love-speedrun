import './gallery.js';
import './navigation.js';
import { getTranslations, initializeLanguage } from './invitation-i18n.js';

initializeLanguage();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Countdown: 08:00 on 02 August 2026 in Vietnam (UTC+7). */
const weddingTime = new Date('2026-08-02T08:00:00+07:00').getTime();
const countdown = {
  days: document.querySelector('[data-countdown="days"]'),
  hours: document.querySelector('[data-countdown="hours"]'),
  minutes: document.querySelector('[data-countdown="minutes"]'),
};
const countdownComplete = document.getElementById('countdown-complete');
let countdownTimer = null;

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateCountdown() {
  const remaining = weddingTime - Date.now();

  if (remaining <= 0) {
    Object.values(countdown).forEach((node) => {
      if (node) node.textContent = '00';
    });
    if (countdownComplete) countdownComplete.hidden = false;
    if (countdownTimer) window.clearInterval(countdownTimer);
    return false;
  }

  const totalMinutes = Math.floor(remaining / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  if (countdown.days) countdown.days.textContent = String(days);
  if (countdown.hours) countdown.hours.textContent = pad(hours);
  if (countdown.minutes) countdown.minutes.textContent = pad(minutes);
  return true;
}

if (countdown.days && updateCountdown()) {
  countdownTimer = window.setInterval(updateCountdown, 30000);
}

/* Gentle one-time entrance transitions. */
const revealItems = document.querySelectorAll('.reveal:not(.is-visible)');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

  revealItems.forEach((item) => revealObserver.observe(item));
  document.documentElement.classList.add('reveal-enabled');
}

/* Start background music on load when the browser permits unmuted autoplay. */
const musicButton = document.getElementById('music-toggle');
const musicCredit = document.getElementById('music-credit');
const music = musicButton
  ? new Audio(new URL('../assets/salut-damour-full.mp3', import.meta.url).href)
  : null;
let musicPlaying = false;

if (musicCredit) {
  window.setTimeout(() => {
    musicCredit.classList.add('is-auto-hidden');
  }, 6500);
}

if (music) {
  music.loop = true;
  music.preload = 'auto';
  music.autoplay = true;
  music.volume = 0.42;
  music.addEventListener('play', () => {
    musicPlaying = true;
    syncMusicButton();
    removeAutoplayFallback();
  });
  music.addEventListener('pause', () => {
    musicPlaying = false;
    syncMusicButton();
  });
}

function syncMusicButton() {
  if (!musicButton) return;
  const text = getTranslations();
  musicButton.classList.toggle('is-playing', musicPlaying);
  musicButton.setAttribute('aria-pressed', String(musicPlaying));
  musicButton.setAttribute('aria-label', musicPlaying ? text.music_off : text.music_on);
}

async function startMusic() {
  if (!music) return false;

  try {
    await music.play();
    return true;
  } catch {
    musicPlaying = false;
    syncMusicButton();
    return false;
  }
}

function removeAutoplayFallback() {
  document.removeEventListener('pointerdown', startMusicAfterInteraction, true);
  document.removeEventListener('keydown', startMusicAfterInteraction, true);
}

function startMusicAfterInteraction(event) {
  if (event.target instanceof Element && event.target.closest('#music-toggle')) return;
  void startMusic();
}

function installAutoplayFallback() {
  document.addEventListener('pointerdown', startMusicAfterInteraction, true);
  document.addEventListener('keydown', startMusicAfterInteraction, true);
}

if (musicButton) {
  musicButton.addEventListener('click', async () => {
    if (musicPlaying) {
      music?.pause();
      return;
    }

    const started = await startMusic();
    if (!started) console.error('Không thể phát nhạc nền.');
  });

  void startMusic().then((started) => {
    if (!started) installAutoplayFallback();
  });
}

/* Wishes form and its aggregate statistics. */
const wishForm = document.getElementById('wish-form');
const wishName = document.getElementById('wish-name');
const wishMessage = document.getElementById('wish-message');
const wishSubmit = document.getElementById('wish-submit');
const wishStatus = document.getElementById('wish-status');
const wishCount = document.getElementById('wish-count');
const countryCount = document.getElementById('country-count');
const wishCountOffset = 24;
const knownCountryCount = 6;
let wishCountValue = null;
let countryCountValue = null;

function setWishStatus(key = '', isError = false) {
  if (!wishStatus) return;
  wishStatus.dataset.statusKey = key;
  wishStatus.textContent = key ? getTranslations()[key] : '';
  wishStatus.hidden = !key;
  wishStatus.classList.toggle('is-error', isError);
}

function formatStat(value) {
  return new Intl.NumberFormat(getTranslations().locale).format(value);
}

function renderWishStats() {
  if (wishCount && wishCountValue !== null) wishCount.textContent = formatStat(wishCountValue);
  if (countryCount && countryCountValue !== null) countryCount.textContent = formatStat(countryCountValue);
}

async function loadWishStats() {
  if (!wishCount || !countryCount) return;

  try {
    const response = await fetch('/api/wish-stats');
    if (!response.ok) throw new Error(`Wish stats request failed: ${response.status}`);
    const stats = await response.json();
    wishCountValue = Number(stats.count) || 0;
    countryCountValue = Number(stats.countryCount) || knownCountryCount;
  } catch (error) {
    try {
      const { getWishes } = await import('./wishes.js');
      const wishes = await getWishes();
      wishCountValue = wishes.length + wishCountOffset;
    } catch (fallbackError) {
      console.error('Không thể tải thống kê lời chúc:', fallbackError);
      wishCountValue = wishCountOffset;
    }
    countryCountValue = knownCountryCount;
  }

  renderWishStats();
}

[wishName, wishMessage].forEach((field) => {
  field?.addEventListener('input', () => {
    field.removeAttribute('aria-invalid');
    if (wishStatus?.classList.contains('is-error')) setWishStatus();
  });
});

wishForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(wishForm);
  const name = String(formData.get('name') || '').trim();
  const message = String(formData.get('message') || '').trim();

  if (!name) {
    wishName?.setAttribute('aria-invalid', 'true');
    wishName?.focus();
    setWishStatus('wish_name_required', true);
    return;
  }

  if (!message) {
    wishMessage?.setAttribute('aria-invalid', 'true');
    wishMessage?.focus();
    setWishStatus('wish_message_required', true);
    return;
  }

  if (wishSubmit) {
    wishSubmit.disabled = true;
    wishSubmit.textContent = getTranslations().wish_sending;
  }
  setWishStatus('wish_sending_status');

  try {
    const { saveWish } = await import('./wishes.js');
    await saveWish(name, message);
    wishForm.reset();
    setWishStatus('wish_success');
    if (wishCountValue !== null) {
      wishCountValue += 1;
      renderWishStats();
    }
  } catch (error) {
    console.error('Không thể gửi lời chúc:', error);
    setWishStatus('wish_error', true);
  } finally {
    if (wishSubmit) {
      wishSubmit.disabled = false;
      wishSubmit.textContent = getTranslations().wish_submit;
    }
  }
});

loadWishStats();

document.addEventListener('invitation:languagechange', () => {
  syncMusicButton();
  renderWishStats();
  if (wishStatus?.dataset.statusKey) {
    setWishStatus(wishStatus.dataset.statusKey, wishStatus.classList.contains('is-error'));
  }
  if (wishSubmit?.disabled) wishSubmit.textContent = getTranslations().wish_sending;
});
