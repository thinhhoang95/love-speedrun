import { getLanguage, getTranslations } from './invitation-i18n.js';

const dialog = document.getElementById('meal-dialog');
const openButton = document.getElementById('meal-request-open');
const closeButton = document.getElementById('meal-dialog-close');
const form = document.getElementById('meal-form');
const nameField = document.getElementById('meal-name');
const vegetarianChoice = document.getElementById('vegetarian-choice');
const submitButton = document.getElementById('meal-submit');
const status = document.getElementById('meal-status');

function setStatus(key = '', isError = false) {
  if (!status) return;
  status.dataset.statusKey = key;
  status.textContent = key ? getTranslations()[key] : '';
  status.hidden = !key;
  status.classList.toggle('is-error', isError);
}

function selectedMealType() {
  return form?.querySelector('input[name="mealType"]:checked')?.value || 'standard';
}

function syncMealChoice() {
  if (!vegetarianChoice) return;
  vegetarianChoice.hidden = selectedMealType() !== 'vegetarian';
  if (status?.classList.contains('is-error')) setStatus();
}

function openDialog() {
  if (!dialog) return;
  dialog.showModal();
  document.body.classList.add('dialog-open');
  window.setTimeout(() => nameField?.focus(), 0);
}

function closeDialog() {
  dialog?.close();
}

openButton?.addEventListener('click', openDialog);
closeButton?.addEventListener('click', closeDialog);
dialog?.addEventListener('close', () => document.body.classList.remove('dialog-open'));
dialog?.addEventListener('cancel', () => document.body.classList.remove('dialog-open'));
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) closeDialog();
});

form?.querySelectorAll('input[name="mealType"]').forEach((radio) => {
  radio.addEventListener('change', syncMealChoice);
});

nameField?.addEventListener('input', () => {
  nameField.removeAttribute('aria-invalid');
  if (status?.classList.contains('is-error')) setStatus();
});

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const mealType = String(data.get('mealType') || 'standard');
  const notes = String(data.get('notes') || '').trim();

  if (!name) {
    nameField?.setAttribute('aria-invalid', 'true');
    nameField?.focus();
    setStatus('meal_name_required', true);
    return;
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = getTranslations().meal_sending;
  }
  setStatus('meal_sending_status');

  try {
    const response = await fetch('/api/meal-preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, mealType, notes, language: getLanguage() }),
    });
    if (!response.ok) throw new Error(`Meal request failed: ${response.status}`);

    form.reset();
    syncMealChoice();
    setStatus('meal_success');
  } catch (error) {
    console.error('Không thể gửi yêu cầu món ăn:', error);
    setStatus('meal_error', true);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = getTranslations().meal_submit;
    }
  }
});

document.addEventListener('invitation:languagechange', () => {
  const key = status?.dataset.statusKey;
  if (key) setStatus(key, status.classList.contains('is-error'));
});

syncMealChoice();
