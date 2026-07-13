import { getTranslations, initializeLanguage } from './invitation-i18n.js';

initializeLanguage();

const searchForm = document.getElementById('guest-search-form');
const searchInput = document.getElementById('guest-search');
const suggestionList = document.getElementById('guest-suggestions');
const finderStatus = document.getElementById('finder-status');
const hall = document.getElementById('hall');
const hallGrid = document.getElementById('hall-grid');
const hallScroll = document.getElementById('hall-scroll');
const loadError = document.getElementById('load-error');
const tableDialog = document.getElementById('table-dialog');
const tableDialogClose = document.getElementById('table-dialog-close');
const tableDialogNumber = document.getElementById('table-dialog-number');
const tableDialogTitle = document.getElementById('table-dialog-title');
const tableDialogCount = document.getElementById('table-dialog-count');
const tableDialogGuests = document.getElementById('table-dialog-guests');

let guests = [];
let tablesById = new Map();
let currentResults = [];
let activeSuggestion = -1;
let highlightedTable = null;
let dialogTrigger = null;
let dialogAnchor = null;
let restoreDialogFocus = false;
let selectedGuest = null;
let dialogTable = null;
let loadFailed = false;

function getTableLabel(table) {
  if (!table) return '';
  return getTranslations().table_labels[table.label] || table.label;
}

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLocaleLowerCase('vi')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getSearchTerms(guest) {
  return [guest.display, ...(guest.matching || [])].map(normalizeText);
}

function scoreGuest(guest, query) {
  const terms = getSearchTerms(guest);
  if (terms.some((term) => term === query)) return 0;
  if (terms.some((term) => term.startsWith(query))) return 1;
  if (terms.some((term) => term.split(' ').some((word) => word.startsWith(query)))) return 2;
  if (terms.some((term) => term.includes(query))) return 3;
  return Number.POSITIVE_INFINITY;
}

function findGuests(value) {
  const query = normalizeText(value);
  if (!query) return [];

  return guests
    .map((guest) => ({ guest, score: scoreGuest(guest, query) }))
    .filter((result) => Number.isFinite(result.score))
    .sort((a, b) => a.score - b.score || a.guest.display.localeCompare(b.guest.display, 'vi'))
    .slice(0, 8)
    .map((result) => result.guest);
}

function setSuggestionsOpen(open) {
  suggestionList.hidden = !open;
  searchInput.setAttribute('aria-expanded', String(open));
  if (!open) {
    activeSuggestion = -1;
    searchInput.removeAttribute('aria-activedescendant');
  }
}

function syncActiveSuggestion() {
  const options = [...suggestionList.querySelectorAll('[role="option"]')];
  options.forEach((option, index) => {
    const active = index === activeSuggestion;
    option.classList.toggle('is-active', active);
    option.setAttribute('aria-selected', String(active));
  });

  if (activeSuggestion >= 0 && options[activeSuggestion]) {
    searchInput.setAttribute('aria-activedescendant', options[activeSuggestion].id);
    options[activeSuggestion].scrollIntoView({ block: 'nearest' });
  } else {
    searchInput.removeAttribute('aria-activedescendant');
  }
}

function renderSuggestions() {
  suggestionList.replaceChildren();
  activeSuggestion = -1;

  if (!searchInput.value.trim()) {
    currentResults = [];
    setSuggestionsOpen(false);
    finderStatus.textContent = getTranslations().finder_help;
    return;
  }

  currentResults = findGuests(searchInput.value);

  if (!currentResults.length) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'guest-suggestions__empty';
    emptyItem.textContent = getTranslations().search_empty;
    suggestionList.append(emptyItem);
    setSuggestionsOpen(true);
    finderStatus.textContent = getTranslations().search_no_match;
    return;
  }

  currentResults.forEach((guest, index) => {
    const table = tablesById.get(Number(guest.table));
    const item = document.createElement('li');
    const option = document.createElement('button');
    const name = document.createElement('strong');
    const tableName = document.createElement('span');

    option.type = 'button';
    option.id = `guest-option-${index}`;
    option.setAttribute('role', 'option');
    option.setAttribute('aria-selected', 'false');
    name.textContent = guest.display;
    const label = table ? getTableLabel(table) : '';
    tableName.textContent = getTranslations().seating_table_label(guest.table, label);
    option.append(name, tableName);
    option.addEventListener('pointerdown', (event) => event.preventDefault());
    option.addEventListener('click', () => selectGuest(guest));
    item.append(option);
    suggestionList.append(item);
  });

  setSuggestionsOpen(true);
  finderStatus.textContent = getTranslations().search_results(currentResults.length);
}

function centerTableInHall(tableElement) {
  const targetLeft = tableElement.offsetLeft + (tableElement.offsetWidth / 2) - (hallScroll.clientWidth / 2);
  hallScroll.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
}

function selectGuest(guest) {
  const table = tablesById.get(Number(guest.table));
  const tableElement = document.getElementById(`table-${guest.table}`);
  if (!table || !tableElement) return;

  searchInput.value = guest.display;
  selectedGuest = guest;
  setSuggestionsOpen(false);

  highlightedTable?.classList.remove('is-highlighted');
  highlightedTable = tableElement;
  tableElement.classList.remove('is-highlighted');
  void tableElement.offsetWidth;
  tableElement.classList.add('is-highlighted');

  renderSelectedGuestStatus();

  tableElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  window.setTimeout(() => centerTableInHall(tableElement), 180);
  window.setTimeout(() => openTableGuests(table, searchInput, tableElement), 650);
}

function renderSelectedGuestStatus() {
  if (!selectedGuest) return;
  const table = tablesById.get(Number(selectedGuest.table));
  if (!table) return;

  finderStatus.innerHTML = '';
  const guestName = document.createElement('strong');
  guestName.textContent = selectedGuest.display;
  finderStatus.append(guestName, document.createTextNode(
    getTranslations().guest_seated_suffix(table.id, getTableLabel(table)),
  ));
}

function createChair(index) {
  const chair = document.createElement('img');
  chair.className = 'seat-chair';
  chair.src = 'assets/generated/seating-plan/chair.webp';
  chair.alt = '';
  chair.setAttribute('aria-hidden', 'true');
  chair.decoding = 'async';
  chair.style.setProperty('--chair-angle', `${index * 30}deg`);
  return chair;
}

function positionTableDialog() {
  if (!tableDialog?.open || !dialogAnchor) return;

  const anchorRect = dialogAnchor.getBoundingClientRect();
  const dialogRect = tableDialog.getBoundingClientRect();
  const gap = 14;
  const edge = 12;
  let left = anchorRect.right + gap;
  let top = anchorRect.top + (anchorRect.height - dialogRect.height) / 2;

  if (window.innerWidth < 700) {
    left = (window.innerWidth - dialogRect.width) / 2;
    top = anchorRect.bottom + gap;
    if (top + dialogRect.height > window.innerHeight - edge) {
      top = anchorRect.top - dialogRect.height - gap;
    }
  } else if (left + dialogRect.width > window.innerWidth - edge) {
    left = anchorRect.left - dialogRect.width - gap;
  }

  left = Math.max(edge, Math.min(left, window.innerWidth - dialogRect.width - edge));
  top = Math.max(edge, Math.min(top, window.innerHeight - dialogRect.height - edge));
  tableDialog.style.left = `${Math.round(left)}px`;
  tableDialog.style.top = `${Math.round(top)}px`;
}

function renderTableGuests(table) {
  const tableGuests = guests.filter((guest) => Number(guest.table) === Number(table.id));
  tableDialogNumber.textContent = table.id;
  tableDialogTitle.textContent = getTableLabel(table);
  tableDialogCount.textContent = tableGuests.length
    ? getTranslations().dialog_guest_count(tableGuests.length)
    : getTranslations().dialog_updating;
  tableDialogGuests.replaceChildren();

  if (tableGuests.length) {
    tableGuests.forEach((guest, index) => {
      const item = document.createElement('li');
      const number = document.createElement('span');
      const name = document.createElement('strong');
      number.textContent = String(index + 1).padStart(2, '0');
      name.textContent = guest.display;
      item.append(number, name);
      tableDialogGuests.append(item);
    });
  } else {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'table-dialog__empty';
    emptyItem.textContent = getTranslations().dialog_empty;
    tableDialogGuests.append(emptyItem);
  }
}

function openTableGuests(table, trigger, anchor = trigger?.closest('.seating-table')) {
  if (!tableDialog) return;

  dialogTrigger = trigger;
  dialogAnchor = anchor;
  dialogTable = table;
  renderTableGuests(table);

  if (!tableDialog.open) tableDialog.show();
  requestAnimationFrame(positionTableDialog);
}

function closeTableGuests(restoreFocus = true) {
  if (!tableDialog?.open) return;
  restoreDialogFocus = restoreFocus;
  tableDialog.close();
}

function createTable(table) {
  const article = document.createElement('article');
  const seatSet = document.createElement('div');
  const tableImage = document.createElement('img');
  const number = document.createElement('strong');
  const numberLabel = document.createElement('span');
  const numberValue = document.createElement('b');
  const label = document.createElement('button');
  const gridColumn = table.side === 'left' ? table.column : table.column + 3;

  article.className = 'seating-table';
  article.id = `table-${table.id}`;
  article.dataset.tableId = String(table.id);
  article.tabIndex = -1;
  article.style.gridColumn = String(gridColumn);
  article.style.gridRow = String(table.row);
  article.setAttribute('aria-label', getTranslations().table_aria(table.id, getTableLabel(table)));

  seatSet.className = 'seat-set';
  for (let index = 0; index < 12; index += 1) seatSet.append(createChair(index));

  tableImage.className = 'seat-table-image';
  tableImage.src = 'assets/generated/seating-plan/table.webp';
  tableImage.alt = '';
  tableImage.setAttribute('aria-hidden', 'true');
  tableImage.decoding = 'async';

  number.className = 'seat-table-number';
  numberLabel.textContent = getTranslations().table_word;
  numberValue.textContent = table.id;
  number.append(numberLabel, numberValue);
  seatSet.append(tableImage, number);

  label.className = 'seating-table__label';
  label.type = 'button';
  label.textContent = getTableLabel(table);
  label.setAttribute('aria-label', getTranslations().table_guests_aria(table.id, getTableLabel(table)));
  label.addEventListener('click', () => openTableGuests(table, label));
  article.append(seatSet, label);
  return article;
}

async function loadSeatingPlan() {
  try {
    const dataUrl = new URL('../data/seating-plan.json', import.meta.url);
    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error(`Seating plan request failed: ${response.status}`);

    const data = await response.json();
    if (!Array.isArray(data.tables) || !Array.isArray(data.guests)) {
      throw new Error('Invalid seating plan data');
    }

    guests = data.guests;
    tablesById = new Map(data.tables.map((table) => [Number(table.id), table]));
    const fragment = document.createDocumentFragment();
    data.tables.forEach((table) => fragment.append(createTable(table)));
    hallGrid.append(fragment);
    hall.setAttribute('aria-busy', 'false');
  } catch (error) {
    console.error('Không thể tải sơ đồ chỗ ngồi:', error);
    hall.setAttribute('aria-busy', 'false');
    loadFailed = true;
    loadError.hidden = false;
    searchInput.disabled = true;
    finderStatus.textContent = getTranslations().load_guests_error;
  }
}

searchInput.addEventListener('input', () => {
  selectedGuest = null;
  renderSuggestions();
});
searchInput.addEventListener('focus', () => {
  if (searchInput.value.trim()) renderSuggestions();
});

searchInput.addEventListener('keydown', (event) => {
  if (suggestionList.hidden || !currentResults.length) {
    if (event.key === 'Escape') setSuggestionsOpen(false);
    return;
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    activeSuggestion = (activeSuggestion + 1) % currentResults.length;
    syncActiveSuggestion();
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    activeSuggestion = (activeSuggestion - 1 + currentResults.length) % currentResults.length;
    syncActiveSuggestion();
  } else if (event.key === 'Enter' && activeSuggestion >= 0) {
    event.preventDefault();
    selectGuest(currentResults[activeSuggestion]);
  } else if (event.key === 'Escape') {
    event.preventDefault();
    setSuggestionsOpen(false);
  }
});

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const [firstMatch] = findGuests(searchInput.value);
  if (firstMatch) selectGuest(firstMatch);
});

document.addEventListener('pointerdown', (event) => {
  if (!searchForm.contains(event.target)) setSuggestionsOpen(false);
});

tableDialogClose?.addEventListener('click', () => closeTableGuests());

tableDialog?.addEventListener('click', (event) => {
  event.stopPropagation();
});

tableDialog?.addEventListener('close', () => {
  if (restoreDialogFocus) dialogTrigger?.focus();
  dialogTrigger = null;
  dialogAnchor = null;
  dialogTable = null;
  restoreDialogFocus = false;
});

document.addEventListener('pointerdown', (event) => {
  if (!tableDialog?.open || tableDialog.contains(event.target)) return;
  if (event.target.closest('.seating-table__label')) return;
  closeTableGuests(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && tableDialog?.open) closeTableGuests();
});

window.addEventListener('resize', positionTableDialog);
window.addEventListener('scroll', positionTableDialog, { passive: true });
hallScroll.addEventListener('scroll', positionTableDialog, { passive: true });

function translateRenderedTables() {
  document.querySelectorAll('.seating-table').forEach((article) => {
    const table = tablesById.get(Number(article.dataset.tableId));
    if (!table) return;
    const label = getTableLabel(table);
    article.setAttribute('aria-label', getTranslations().table_aria(table.id, label));
    const numberLabel = article.querySelector('.seat-table-number span');
    const labelButton = article.querySelector('.seating-table__label');
    if (numberLabel) numberLabel.textContent = getTranslations().table_word;
    if (labelButton) {
      labelButton.textContent = label;
      labelButton.setAttribute('aria-label', getTranslations().table_guests_aria(table.id, label));
    }
  });
}

document.addEventListener('invitation:languagechange', () => {
  translateRenderedTables();

  if (loadFailed) {
    finderStatus.textContent = getTranslations().load_guests_error;
  } else if (selectedGuest) {
    renderSelectedGuestStatus();
  } else {
    renderSuggestions();
  }

  if (tableDialog?.open && dialogTable) {
    renderTableGuests(dialogTable);
    requestAnimationFrame(positionTableDialog);
  }
});

loadSeatingPlan();
