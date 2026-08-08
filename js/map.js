// טאב המפה: Leaflet + OpenStreetMap. מגיב לפס הקשר-היום - מדגיש את נקודות/מסלול
// היום הנבחר (שאר הנקודות מעומעמות), ו"הכל" מציג הכל בלי הדגשה/קו מסלול.

let _leafletMap = null;
let _tileLayer = null;
let _markersLayer = null;
let _routeLayer = null;
let _allMapPoints = [];

// טיילים מונוכרומטיים (CARTO, חינמי ללא מפתח) - כדי שהסימונים שלנו יבלטו יותר
// מרקע מפה עמוס; בוחר גרסה בהירה/כהה לפי ערכת הנושא הנוכחית.
const MAP_TILES = {
  light: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
};

function buildMapPoints() {
  const points = [];
  TRIP_DAYS.forEach(day => {
    day.items.forEach(item => {
      if (item.lat && item.lng) {
        points.push({
          dayNum: day.num, time: item.time, label: item.title,
          icon: item.icon || '📍', type: 'attraction',
        });
        points[points.length - 1].lat = item.lat;
        points[points.length - 1].lng = item.lng;
      }
    });
  });
  HOTELS_PLACEHOLDER.forEach(h => {
    points.push({ dayNum: h.dayNum, time: '', label: h.name + (h.note ? ' - ' + h.note : ''), icon: '🏨', lat: h.lat, lng: h.lng, type: 'hotel' });
  });
  points.push({ dayNum: CAR_RENTAL.pickup.dayNum, time: '', label: CAR_RENTAL.pickup.place + ' (איסוף)', icon: '🚗', lat: CAR_RENTAL.pickup.lat, lng: CAR_RENTAL.pickup.lng, type: 'car' });
  points.push({ dayNum: CAR_RENTAL.return.dayNum, time: '', label: CAR_RENTAL.return.place + ' (החזרה)', icon: '🚗', lat: CAR_RENTAL.return.lat, lng: CAR_RENTAL.return.lng, type: 'car' });
  AIRPORTS.forEach(a => {
    points.push({ dayNum: a.dayNum, time: '', label: a.name, icon: '🛬', lat: a.lat, lng: a.lng, type: 'airport' });
  });
  return points;
}

function emojiDivIcon(emoji, dim) {
  const size = dim ? 26 : 34;
  return L.divIcon({
    html: `<div style="
        width:${size}px;height:${size}px;border-radius:50%;
        background:var(--bg-elevated);border:2px solid var(--accent);
        display:flex;align-items:center;justify-content:center;
        font-size:${dim ? '0.9rem' : '1.25rem'};opacity:${dim ? 0.45 : 1};
        box-shadow:0 2px 6px rgba(0,0,0,.35);">${emoji}</div>`,
    className: '', iconSize: [size, size], iconAnchor: [size / 2, size / 2],
  });
}

function initMap() {
  if (_leafletMap) return;
  _allMapPoints = buildMapPoints();
  _leafletMap = L.map('map', { scrollWheelZoom: true }).setView([37.9, 14.6], 8);
  _markersLayer = L.layerGroup().addTo(_leafletMap);
  _routeLayer = L.layerGroup().addTo(_leafletMap);
  refreshMapTiles();
  renderMap();
}

function refreshMapTiles() {
  if (!_leafletMap) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const conf = isDark ? MAP_TILES.dark : MAP_TILES.light;
  if (_tileLayer) _leafletMap.removeLayer(_tileLayer);
  _tileLayer = L.tileLayer(conf.url, { attribution: conf.attribution, maxZoom: 20, subdomains: 'abcd' }).addTo(_leafletMap);
  _tileLayer.bringToBack();
}

function renderMap() {
  if (!_leafletMap) return;
  _markersLayer.clearLayers();
  _routeLayer.clearLayers();

  const selectedDay = AppState.allSelected ? null : AppState.selectedDayNum;
  const bounds = [];

  _allMapPoints.forEach(p => {
    const isHighlighted = selectedDay === null || p.dayNum === selectedDay;
    const marker = L.marker([p.lat, p.lng], { icon: emojiDivIcon(p.icon, !isHighlighted) });
    const timeStr = p.time ? `<b>${p.time}</b> · ` : '';
    marker.bindPopup(`${timeStr}${p.label}`);
    marker.addTo(_markersLayer);
    if (isHighlighted) bounds.push([p.lat, p.lng]);
  });

  if (selectedDay !== null) {
    const dayPoints = _allMapPoints
      .filter(p => p.dayNum === selectedDay && p.time)
      .sort((a, b) => a.time.localeCompare(b.time));
    if (dayPoints.length > 1) {
      const latlngs = dayPoints.map(p => [p.lat, p.lng]);
      L.polyline(latlngs, { color: getComputedStyle(document.documentElement).getPropertyValue('--color-red').trim() || '#CD212A', weight: 3, dashArray: '6,6', opacity: 0.85 })
        .addTo(_routeLayer);
    }
  }

  if (bounds.length) {
    _leafletMap.fitBounds(bounds, { padding: [30, 30], maxZoom: 13 });
  }
}

function refreshMapForDayContext() {
  if (!_leafletMap) return;
  renderMap();
}

onDayContextChange(refreshMapForDayContext);
