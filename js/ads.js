const adTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

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

const setFeatures = (elementClone, offerFeatures) => {
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

const createCustomPopup = (element) => {
  const popupElement = adTemplate.cloneNode(true);
  popupElement.querySelector('.popup__title').textContent = element.offer.title || '';
  popupElement.querySelector('.popup__text--address').textContent = element.offer.adress || '';
  popupElement.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь` || '';
  popupElement.querySelector('.popup__type').textContent = facilityType[element.offer.type] || '';
  popupElement.querySelector('.popup__text--capacity').textContent = getFacilityCapacity(element.offer.rooms, element.offer.guests) || '';
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}.`;
  setFeatures(popupElement, element.offer.features);
  popupElement.querySelector('.popup__description').textContent = element.offer.description || '';
  getPhotos(popupElement, element.offer.photos);
  popupElement.querySelector('.popup__avatar').src = element.author.avatar || '';

  return popupElement;
};

export { createCustomPopup };
export { setFeatures }; // вызвал, чтобы не ругался линт
