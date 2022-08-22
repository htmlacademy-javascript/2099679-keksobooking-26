import { setActiveForm } from './active-inactive-form.js';
import { getListAd } from './data.js';
import { createCustomPopup } from './ads.js';

const adressField = document.querySelector('#address');

const map = L.map('map-canvas')
  .setView({
    lat: 35.6895,
    lng: 139.692,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: 35.6895,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);

const listAd = getListAd();

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

listAd.forEach((element) => {
  const pinMarker = L.marker(
    element.location,
    {
      pinIcon,
    },
  );
  pinMarker
    .addTo(map)
    .bindPopup(createCustomPopup(element));
});

// Записывает координаты выбранной точки в поле adress
marker.on('moveend', (evt) => {
  adressField.value = evt.target.getLatLng();
});

// Возвращение главной метки в стартовые координаты по сбросу/отправке данных

// resetButton.addEventListener('click', () => {
//   mainPinIcon.setLatLng({
//     lat: 35.6895,
//     lng: 139.692,
//   });
// });

