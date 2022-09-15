import { setActiveForm } from './active-inactive-form.js';
import { createCustomPopup } from './ads.js';

const DIGIT_AMOUNT = 5;
const ZOOM = 13;
const LAT_CITY = 35.678355;
const LNG_CITY = 139.754826;
const LAYER_CITY = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const adFormItem = document.querySelector('.ad-form');
const adressField = document.querySelector('#address');
// Загружаем карту и делаем активной форму объявления
const map = L.map('map-canvas')
  .on('load', () => {
    setActiveForm(adFormItem);
  })
  .setView({
    lat: LAT_CITY,
    lng: LNG_CITY,
  }, ZOOM);

L.tileLayer(
  LAYER_CITY,
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: LAT_CITY,
    lng: LNG_CITY,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);

// Записывает координаты выбранной точки в поле адреса
mainMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  adressField.value = `${lat.toFixed(DIGIT_AMOUNT)}, ${lng.toFixed(DIGIT_AMOUNT)}`;
});

const setDefaultAdress = () => {
  adressField.value = `${LAT_CITY}, ${LNG_CITY}`;
};

setDefaultAdress();

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarkers = (array) => {
  markerGroup.clearLayers();
  array.forEach((element) => {
    const pinMarker = L.marker(
      element.location,
      {
        pinIcon,
      },
    );
    pinMarker
      .addTo(markerGroup)
      .bindPopup(createCustomPopup(element));
  });
};

// Возвращение главной метки в стартовые координаты по сбросу/отправке данных и запись новых данных в поле адрес
const resetMainMarker = () => {
  mainMarker.setLatLng({
    lat: LAT_CITY,
    lng: LNG_CITY,
  });
  map.closePopup();
  setDefaultAdress();
};

export { createMarkers, resetMainMarker };
