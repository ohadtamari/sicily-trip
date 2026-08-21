// בקר ראשי: ניתוב טאבים, פס הקשר-יום, ורינדור תוכן העמודים

const ENGLISH_WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const PAGES_WITH_DAY_BAR = ['map', 'itinerary', 'checklist', 'food', 'transport'];

function sanitizeKey(s) { return s.replace(/[^\p{L}\p{N}]+/gu, '_'); }

const WAZE_ICON = `<svg viewBox="0 0 24 24" width="16" height="16" fill="#33ccff" stroke="none"><path d="M12 2 3 21l9-4.5L21 21 12 2z"/></svg>`;

/* ===== ניווט טאבים ===== */
function showPage(pageId) {
  AppState.currentPage = pageId;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.page === pageId));
  document.querySelectorAll('.page').forEach(p => p.classList.toggle('active', p.id === 'page-' + pageId));
  document.getElementById('dayContextBar').style.display = PAGES_WITH_DAY_BAR.includes(pageId) ? 'flex' : 'none';

  if (pageId === 'map') { initMap(); setTimeout(() => _leafletMap && _leafletMap.invalidateSize(), 50); }
  else if (typeof stopLocating === 'function') { stopLocating(); }
  if (pageId === 'itinerary') renderItinerary();
  if (pageId === 'checklist') renderChecklist();
  if (pageId === 'food') { renderFoodPlaces(); renderFoodDishes(); }
  if (pageId === 'transport') renderTransport();
  if (pageId === 'packing') renderPacking();
  if (pageId === 'weather') initWeather();
}

function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => showPage(btn.dataset.page));
  });
}

/* ===== פס הקשר יום ===== */
function renderDayContextBar() {
  const day = getDayByNum(AppState.selectedDayNum);
  document.getElementById('dayNumLabel').textContent = `יום ${day.num} מתוך ${TRIP_DAYS.length}`;
  document.getElementById('dayDateLabel').textContent = `${formatDDMM(day.date)} · ${day.weekday}`;
  document.getElementById('dayPrev').disabled = day.num >= TRIP_DAYS.length;
  document.getElementById('dayNext').disabled = day.num <= 1;
  document.getElementById('btnAll').classList.toggle('active', AppState.allSelected);
  document.getElementById('dayContextBar').classList.toggle('all-mode', AppState.allSelected);
}

function stepDay(delta) {
  AppState.allSelected = false;
  AppState.selectedDayNum = Math.min(TRIP_DAYS.length, Math.max(1, AppState.selectedDayNum + delta));
  onDayContextUpdated();
}

function setupDayNav() {
  document.getElementById('dayPrev').addEventListener('click', () => stepDay(1));
  document.getElementById('dayNext').addEventListener('click', () => stepDay(-1));
  document.getElementById('btnAll').addEventListener('click', () => {
    AppState.allSelected = !AppState.allSelected;
    onDayContextUpdated();
  });
}

/* ===== ניווט בין ימים ע"י החלקה (swipe) - ימינה = יום הבא, שמאלה = יום קודם (RTL) =====
   מבוטל בתוך מפת ה-Leaflet עצמה כדי לא להתנגש עם גרירת/הזזת המפה. */
function setupSwipeNav() {
  const SWIPE_MIN_DISTANCE = 60;
  const SWIPE_MAX_VERTICAL = 60;
  const SWIPE_MAX_DURATION = 700;
  let startX = 0, startY = 0, startTime = 0, tracking = false;

  document.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) { tracking = false; return; }
    if (!PAGES_WITH_DAY_BAR.includes(AppState.currentPage)) { tracking = false; return; }
    if (e.target.closest('#map')) { tracking = false; return; }
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startTime = Date.now();
    tracking = true;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (!tracking) return;
    tracking = false;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    if (Date.now() - startTime > SWIPE_MAX_DURATION) return;
    if (Math.abs(deltaX) < SWIPE_MIN_DISTANCE || Math.abs(deltaY) > SWIPE_MAX_VERTICAL) return;
    stepDay(deltaX < 0 ? -1 : 1);
  }, { passive: true });
}

function onDayContextUpdated() {
  renderDayContextBar();
  notifyDayContextChange();
  if (AppState.currentPage === 'itinerary') renderItinerary();
  if (AppState.currentPage === 'checklist') renderChecklist();
  if (AppState.currentPage === 'food') renderFoodPlaces();
  if (AppState.currentPage === 'transport') renderTransport();
}

/* ===== מסלול ===== */
function renderItinItem(item, day) {
  const badge = item.dayOffset ? `<span class="itin-badge">+${item.dayOffset}</span>` : '';
  return `
    <div class="card itin-item">
      <div class="itin-icon">${item.icon || '📍'}</div>
      <div style="flex:1">
        <div><span class="itin-time">${item.time}${badge}</span> <span class="itin-title">${item.title}</span></div>
        ${item.desc ? `<div class="itin-desc">${item.desc}</div>` : ''}
      </div>
    </div>`;
}

function renderItinerary() {
  const el = document.getElementById('itineraryList');
  let html = '';
  const days = AppState.allSelected ? TRIP_DAYS : [getDayByNum(AppState.selectedDayNum)];
  days.forEach(day => {
    if (AppState.allSelected) html += `<div class="card-day-heading">יום ${day.num} · ${formatDDMM(day.date)} · ${day.weekday} - ${day.title}</div>`;
    day.items.forEach(item => { html += renderItinItem(item, day); });
    if (day.note) html += `<div class="itin-note">💡 ${day.note}</div>`;
  });
  el.innerHTML = html;
}

/* ===== מה לעשות ===== */
function renderChecklistItem(item) {
  const checked = !!(SyncService.state.checklist && SyncService.state.checklist[item.id]);
  const url = checklistMapUrl(item.lat, item.lng, item.placeId);
  const noteParts = [item.note, item.friendName ? `המלצת ${item.friendName}` : ''].filter(Boolean);
  return `
    <div class="card checklist-item ${checked ? 'is-done' : ''} ${item.optional ? 'is-optional' : ''}">
      <input type="checkbox" class="checklist-check" data-id="${item.id}" ${checked ? 'checked' : ''}>
      <div class="checklist-body">
        <div class="checklist-name-row">
          <div class="checklist-name">${item.nameHe}<span class="checklist-name-en"> · ${item.nameIt}</span></div>
          <a class="checklist-map-link" target="_blank" rel="noopener" href="${url}" title="פתח ב-Google Maps" aria-label="פתח ב-Google Maps">↗</a>
          <span class="checklist-day-badge">${item.dayLabel}</span>
        </div>
        ${noteParts.length ? `<div class="checklist-note">${noteParts.join(' · ')}</div>` : ''}
      </div>
    </div>`;
}

function renderChecklist() {
  const el = document.getElementById('checklistList');
  const day = AppState.allSelected ? null : getDayByNum(AppState.selectedDayNum);
  const relevantBases = day ? getRelevantBasesForDay(day) : null;
  const items = relevantBases ? CHECKLIST_ITEMS.filter(it => relevantBases.has(it.base)) : CHECKLIST_ITEMS;

  let html = '';
  if (day) {
    html += `<div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:8px;">פעילויות רלוונטיות ליום ${day.num} (${Array.from(relevantBases).map(b => BASES[b] ? BASES[b].label : b).join(' / ')}) - לחצו "הכל" למעלה כדי לראות את כל הרשימה.</div>`;
  }
  if (items.length === 0) {
    html += `<div class="card">אין המלצות ספציפיות ליום הזה - ראו "הכל" למעלה.</div>`;
  }

  if (day) {
    items.forEach(item => { html += renderChecklistItem(item); });
  } else {
    CHECKLIST_AREAS.forEach(area => {
      const areaItems = items.filter(it => it.areaId === area.id);
      if (!areaItems.length) return;
      html += `<div class="card-day-heading${area.id === 'optional' ? ' checklist-optional-heading' : ''}">${area.label}</div>`;
      areaItems.forEach(item => { html += renderChecklistItem(item); });
    });
  }

  el.innerHTML = html;
  el.querySelectorAll('.checklist-check').forEach(cb => {
    cb.addEventListener('change', () => SyncService.setChecklistItem(cb.dataset.id, cb.checked));
  });
}

/* ===== אוכל ===== */
function escapeHtml(str) {
  return String(str || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

const _noteDebounceTimers = {};
function debouncedSaveNote(placeId, text) {
  clearTimeout(_noteDebounceTimers[placeId]);
  _noteDebounceTimers[placeId] = setTimeout(() => SyncService.setPlaceNote(placeId, text), 600);
}
function flushSaveNote(placeId, text) {
  clearTimeout(_noteDebounceTimers[placeId]);
  SyncService.setPlaceNote(placeId, text);
}

const PENCIL_ICON = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>`;
const _notesEditingIds = new Set();

function renderFoodPlaces() {
  const el = document.getElementById('placesList');
  const day = AppState.allSelected ? null : getDayByNum(AppState.selectedDayNum);
  const weekdayEn = day ? ENGLISH_WEEKDAYS[new Date(day.date + 'T12:00:00').getDay()] : null;
  const relevantBases = day ? getRelevantBasesForDay(day) : null;

  const places = relevantBases ? FOOD_PLACES.filter(p => relevantBases.has(p.base)) : FOOD_PLACES;

  let html = '';
  if (day) {
    html += `<div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:8px;">מסעדות רלוונטיות ליום ${day.num} (${Array.from(relevantBases).map(b => BASES[b] ? BASES[b].label : b).join(' / ')}) - לחצו "הכל" למעלה כדי לראות את כל הרשימה.</div>`;
  }
  if (places.length === 0) {
    html += `<div class="card">אין המלצות מסעדה ספציפיות ליום הזה - ראו "הכל" למעלה, או חפשו לפי הבסיס הנוכחי.</div>`;
  }
  places.forEach(place => {
    const isClosed = weekdayEn && place.closedDays.includes(weekdayEn);
    const src = FOOD_SOURCES[place.source] || FOOD_SOURCES.other;
    const note = (SyncService.state.placeNotes && SyncService.state.placeNotes[place.id]) || '';
    html += `
      <div class="card place-card ${isClosed ? 'closed' : ''}">
        <div class="place-name-row">
          <div class="place-name">${place.name}</div>
          <span class="source-chip source-${place.source}">${src.icon} ${src.label}${place.friendName ? ' - ' + place.friendName : ''}</span>
        </div>
        <div class="place-area">${place.area}</div>
        <a class="place-address-link" target="_blank" rel="noopener" href="${googleMapsSearchUrl(place.name, place.area)}">📍 ${place.address} <span class="ext-icon">↗</span></a>
        ${place.tip ? `<div class="place-tip">${place.tip}</div>` : ''}
        ${isClosed ? `<div class="place-closed-flag">סגור ב${day.weekday} (${day.date.split('-').reverse().slice(0,2).join('.')})</div>` : ''}
        ${renderPlaceNoteBlock(place.id, note)}
      </div>`;
  });
  el.innerHTML = html;

  el.querySelectorAll('.place-note-edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      _notesEditingIds.add(btn.dataset.place);
      renderFoodPlaces();
      const ta = el.querySelector(`.place-note-textarea[data-place="${btn.dataset.place}"]`);
      if (ta) { ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); }
    });
  });
  el.querySelectorAll('.place-note-textarea').forEach(ta => {
    ta.addEventListener('input', () => debouncedSaveNote(ta.dataset.place, ta.value));
    ta.addEventListener('blur', () => {
      flushSaveNote(ta.dataset.place, ta.value);
      _notesEditingIds.delete(ta.dataset.place);
      renderFoodPlaces();
    });
  });
}

function renderPlaceNoteBlock(placeId, note) {
  const isEditing = _notesEditingIds.has(placeId);
  if (isEditing) {
    return `<textarea class="place-note-textarea" data-place="${placeId}" placeholder="הוסיפו הערה משותפת...">${escapeHtml(note)}</textarea>`;
  }
  if (note.trim()) {
    return `
      <div class="place-note-display">
        <span class="place-note-text">${escapeHtml(note)}</span>
        <button type="button" class="place-note-edit-btn" data-place="${placeId}" title="ערוך הערה">${PENCIL_ICON}</button>
      </div>`;
  }
  return `<button type="button" class="place-note-add-btn place-note-edit-btn" data-place="${placeId}">${PENCIL_ICON} הוסיפו הערה משותפת</button>`;
}

function renderFoodDishes() {
  const el = document.getElementById('dishesList');
  let html = '';
  FOOD_DISHES.forEach(dish => {
    const checked = !!(SyncService.state.foodDishes && SyncService.state.foodDishes[dish.id]);
    const imgHtml = dish.img
      ? `<img class="dish-img" src="${wikimediaImgUrl(dish.img)}" alt="${dish.name}" onerror="this.outerHTML='<div class=&quot;dish-emoji&quot;>${dish.emoji}</div>'">`
      : `<div class="dish-emoji">${dish.emoji}</div>`;
    html += `
      <div class="card dish-card">
        ${imgHtml}
        <div class="dish-info">
          <div class="dish-name">${dish.name}</div>
          <div class="dish-desc">${dish.desc}</div>
        </div>
        <input type="checkbox" class="dish-check" data-dish="${dish.id}" ${checked ? 'checked' : ''}>
      </div>`;
  });
  el.innerHTML = html;
  el.querySelectorAll('.dish-check').forEach(cb => {
    cb.addEventListener('change', () => SyncService.setDish(cb.dataset.dish, cb.checked));
  });
}

/* ===== תחבורה ===== */
function renderTransport() {
  const el = document.getElementById('transportContent');
  const day = AppState.allSelected ? null : getDayByNum(AppState.selectedDayNum);
  let html = '';

  const showPickup = !day || day.num === CAR_RENTAL.pickup.dayNum;
  const showReturn = !day || day.num === CAR_RENTAL.return.dayNum;
  const showReminders = !day || day.hasCar;
  const relevantGas = day ? GAS_STATIONS.filter(g => g.dayNum === day.num) : GAS_STATIONS;
  const relevantDrives = day ? DRIVES.filter(d => d.fromDay === day.num) : DRIVES;

  if (showPickup) {
    html += `<div class="card transport-block">
      <h2>🚗 ${CAR_RENTAL.pickup.label} (יום ${CAR_RENTAL.pickup.dayNum}) · ${formatDDMM(CAR_RENTAL.pickup.date)} ${CAR_RENTAL.pickup.time}</h2>
      <div><b>${CAR_RENTAL.pickup.place}</b></div>
      <div class="place-address">📍 ${CAR_RENTAL.pickup.address}</div>
      <div class="place-tip">${CAR_RENTAL.pickup.note}</div>
      <a class="place-map-link" target="_blank" rel="noopener" href="${googleMapsSearchUrl(CAR_RENTAL.pickup.place, '')}">פתח ב-Google Maps ↗</a>
    </div>`;
  }
  if (showReturn) {
    html += `<div class="card transport-block">
      <h2>🚗 ${CAR_RENTAL.return.label} (יום ${CAR_RENTAL.return.dayNum}) · ${formatDDMM(CAR_RENTAL.return.date)} ${CAR_RENTAL.return.time}</h2>
      <div><b>${CAR_RENTAL.return.place}</b></div>
      <div class="place-address">📍 ${CAR_RENTAL.return.address}</div>
      <div class="place-tip">${CAR_RENTAL.return.note}</div>
      <a class="place-map-link" target="_blank" rel="noopener" href="${googleMapsSearchUrl(CAR_RENTAL.return.place, '')}">פתח ב-Google Maps ↗</a>
    </div>`;
  }
  if (showReminders) {
    html += `<div class="card transport-block">
      <h2>📝 לזכור</h2>
      <ul class="plain">${CAR_RENTAL.reminders.map(r => `<li>${r}</li>`).join('')}</ul>
    </div>`;
  }
  if (relevantGas.length) {
    html += `<div class="card transport-block">
      <h2>⛽ תדלוק וחניה</h2>
      ${relevantGas.map(g => `<div style="margin-bottom:8px;"><b>${g.name}</b><div class="place-tip">${g.note}</div></div>`).join('')}
    </div>`;
  }
  if (relevantDrives.length) {
    html += `<div class="card transport-block"><h2>🛣️ נסיעות</h2>`;
    relevantDrives.forEach(d => {
      const wazeLink = (d.toLat && d.toLng)
        ? `<a class="waze-link" target="_blank" rel="noopener" href="${wazeNavUrl(d.toLat, d.toLng)}" title="נווט ב-Waze" aria-label="נווט ב-Waze">${WAZE_ICON}</a>`
        : '';
      html += `<div class="drive-row"><span>${d.from} ← ${d.to}</span><span class="drive-row-right">${d.duration}${wazeLink}</span></div>`;
    });
    html += `</div>`;
  }
  if (day && !showPickup && !showReturn && !showReminders && !relevantGas.length && !relevantDrives.length) {
    html += `<div class="card">אין תוכן תחבורה ליום הזה (אין רכב) - ראו "הכל" למעלה לתמונה המלאה.</div>`;
  }
  el.innerHTML = html;
}

/* ===== ציוד ===== */
const EYE_ICON = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
const EYE_OFF_ICON = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

function renderPacking() {
  const el = document.getElementById('packingList');
  let html = '';
  PACKING_LIST.forEach(cat => {
    html += `<div class="card-day-heading">${cat.icon} ${cat.category}</div><div class="card">`;
    cat.items.forEach(item => {
      const itemName = typeof item === 'string' ? item : item.name;
      const itemQty = typeof item === 'string' ? '' : item.qty;
      const key = sanitizeKey(cat.category) + '__' + sanitizeKey(itemName);
      const state = (SyncService.state.packing && SyncService.state.packing[key]) || {};
      const hidden = !!state.hidden;
      html += `
        <div class="packing-item ${hidden ? 'is-hidden' : ''}">
          <div class="packing-name">${itemName}${itemQty ? `<span class="packing-qty">${itemQty}</span>` : ''}</div>
          <div class="packing-checks">
            <button type="button" class="packing-hide-btn" data-hide-key="${key}" title="${hidden ? 'סמן כרלוונטי' : 'סמן כלא רלוונטי'}">${hidden ? EYE_ICON : EYE_OFF_ICON}</button>
            <label class="packing-check-wrap">עידן<input type="checkbox" data-key="${key}" data-person="idan" ${state.idan ? 'checked' : ''} ${hidden ? 'disabled' : ''}></label>
            <label class="packing-check-wrap">אוהד<input type="checkbox" data-key="${key}" data-person="ohad" ${state.ohad ? 'checked' : ''} ${hidden ? 'disabled' : ''}></label>
          </div>
        </div>`;
    });
    html += `</div>`;
  });
  el.innerHTML = html;
  el.querySelectorAll('input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', () => SyncService.setPacking(cb.dataset.key, cb.dataset.person, cb.checked));
  });
  el.querySelectorAll('.packing-hide-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.hideKey;
      const current = (SyncService.state.packing && SyncService.state.packing[key] && SyncService.state.packing[key].hidden) || false;
      SyncService.setPacking(key, 'hidden', !current);
    });
  });
}

/* ===== אתחול ===== */
function init() {
  AppState.selectedDayNum = computeAutoDayNum();
  setupTabs();
  setupDayNav();
  setupSwipeNav();
  renderDayContextBar();
  showPage('itinerary');
  SyncService.subscribe(() => {
    if (AppState.currentPage === 'food') {
      renderFoodDishes();
      const editingNote = document.activeElement && document.activeElement.classList.contains('place-note-textarea');
      if (!editingNote) renderFoodPlaces();
    }
    if (AppState.currentPage === 'packing') renderPacking();
    if (AppState.currentPage === 'checklist') renderChecklist();
  });
}

document.addEventListener('DOMContentLoaded', init);
