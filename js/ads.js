import { getListAd } from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
const adTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createListAd = getListAd();

const facilityType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const getFacilityCapacity = (roomCount, guestCount) => {
  let roomCountInfo;
  let guestCountInfo;
  if (roomCount === 1) {
    roomCountInfo = 'комната';
  } else if (roomCount > 1 && roomCount < 5) {
    roomCountInfo = 'комнаты';
  } else {
    roomCountInfo = 'комнат';
  }
  if (guestCount === 1) {
    guestCountInfo = 'гостя';
  } else {
    guestCountInfo = 'гостей';
  }
  return `${roomCount} ${roomCountInfo} для ${guestCount} ${guestCountInfo}`;
};

const getFeatures = (elementClone, offerFeatures) => {
  const featureContainer = elementClone.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');

  featureList.forEach((featureListItem) => {
    const isNecessary = offerFeatures.some(
      (offerFeature) => featureListItem.classList.contains(`popup__feature--${offerFeature}`),
    );
    if (!isNecessary) {
      featureListItem.remove();
    }
  });
};

const getPhotos = (elementClone, offerPhotos) => {
  const photoContainer = elementClone.querySelector('.popup__photos');
  photoContainer.innerHTML = '';
  offerPhotos.forEach((offerPhoto) => {
    const newPhotoElement = document.createElement('img');
    newPhotoElement.src = `${offerPhoto}`;
    newPhotoElement.class = 'popup__photo';
    newPhotoElement.width = '45';
    newPhotoElement.height= '40';
    newPhotoElement.alt = 'Фотография жилья';

    photoContainer.append(newPhotoElement);
  });
};

const listAdFragment = document.createDocumentFragment();

createListAd.forEach((element) => {
  const adElement = adTemplate.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = element.offer.title || '';
  adElement.querySelector('.popup__text--address').textContent = element.offer.adress || '';
  adElement.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь` || '';
  adElement.querySelector('.popup__type').textContent = facilityType[element.offer.type] || '';
  adElement.querySelector('.popup__text--capacity').textContent = getFacilityCapacity(element.offer.rooms, element.offer.guests) || '';
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}.`;
  getFeatures(adElement, element.offer.features);
  adElement.querySelector('.popup__description').textContent = element.offer.description || '';
  getPhotos(adElement, element.offer.photos);
  adElement.querySelector('.popup__avatar').src = element.author.avatar || '';

  listAdFragment.append(adElement);
});

mapCanvas.append(listAdFragment.firstChild);

