import './ads.js';
import './active-inactive-form.js';
import './ad-form.js';
import './slider.js';
import './filters.js';
import { createMarkers } from './map.js';
import { getData } from './get-send-data.js';
import { setAdFormSubmit, resetAdForm } from './ad-form.js';

const AD_COUNT = 10;

let data = [];

getData((ads) => {
  data = ads;
  createMarkers(ads.slice(0, AD_COUNT));
});

setAdFormSubmit(resetAdForm);

export {AD_COUNT, data};
