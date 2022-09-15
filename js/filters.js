import { debounce } from './util.js';
import { createMarkers } from './map.js';
import { AD_COUNT, data } from './main.js';

const RERENDER_DELAY = 500;

const DEFAULT_VALUE = 'any';
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const mapFilter = document.querySelector('.map__filters');
const typeFilter = mapFilter.querySelector('#housing-type');
const priceFilter = mapFilter.querySelector('#housing-price');
const roomsFilter = mapFilter.querySelector('#housing-rooms');
const guestsFilter = mapFilter.querySelector('#housing-guests');

const getTypeFilterValue = (type) => typeFilter.value === type || typeFilter.value === DEFAULT_VALUE;
const getRoomsFilterValue = (rooms) => Number(roomsFilter.value) === rooms || roomsFilter.value === DEFAULT_VALUE;
const getGuestsFilterValue = (guests) => Number(guestsFilter.value) === guests || guestsFilter.value === DEFAULT_VALUE;

const getPriceFilterValue = (offer) => {
  const getPriceValue = () => {
    if (Number(offer.price) < LOW_PRICE) {return 'low';}
    if (Number(offer.price) > HIGH_PRICE) {return 'high';}
    if (Number(offer.price) > LOW_PRICE && Number(offer.price) < HIGH_PRICE) {return 'middle';}
  };
  return getPriceValue() === priceFilter.value || priceFilter.value === DEFAULT_VALUE;
};

const getCheckedFeatures = (offer) => {
  const checkedFeatures = document.querySelectorAll('[name="features"]:checked');
  const checkedFeaturesArray = Array.from(checkedFeatures).map((item) => item.value);
  return checkedFeaturesArray.every((el) => {
    if (offer.features) {
      return offer.features.includes(el);
    }
  });
};

const filterAds = (offers, newArray) => {
  const filteredAds = offers.filter(({offer}) =>
    getTypeFilterValue(offer.type) &&
    getRoomsFilterValue(offer.rooms) &&
    getGuestsFilterValue(offer.guests) &&
    getPriceFilterValue(offer) &&
    getCheckedFeatures(offer)
  );
  newArray(filteredAds.slice(0, AD_COUNT));
};

const onChangeFilter = debounce(() => {
  filterAds(data, createMarkers);
}, RERENDER_DELAY);

mapFilter.addEventListener('change', onChangeFilter);
