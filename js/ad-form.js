import { resetSlider } from './slider.js';
import { resetMainMarker } from './map.js';
import { sendData } from './get-send-data.js';
import { resetMapFilter } from './filters.js';

// Находим элементы формы в DOM
const adFormElement = document.querySelector('.ad-form');
const priceInputElement = adFormElement.querySelector('#price');
const typeInputElement = adFormElement.querySelector('#type');
const roomNumberInputElement = adFormElement.querySelector('#room_number');
const capasityInputElement = adFormElement.querySelector('#capacity');
const checkInInputElement = adFormElement.querySelector('#timein');
const checkOutInputElement = adFormElement.querySelector('#timeout');
const avatarElement = adFormElement.querySelector('#avatar');
const avatarPreviewElement = adFormElement.querySelector('.ad-form-header__preview');
const avatarPreviewImgElement = adFormElement.querySelector('.ad-form-header__preview img');
const facilityImageInputElement = adFormElement.querySelector('#images');
const facilityImagePreviewElement = adFormElement.querySelector('.ad-form__photo');
const submitButton = adFormElement.querySelector('.ad-form__submit');
const resetButton = adFormElement.querySelector('.ad-form__reset');

// Другие переменные
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_PER_NIGTH = 100000;
// соотношение Тип жилья и Минимальная цена за ночь
const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};
// соотношение Количества комнат и количества гостей
const CAPACITY = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

// переменная в которой определяем классы полей валидации
const pristine = new Pristine(adFormElement, {
  classTo: 'setup-ad-form',
  errorClass: 'setup-ad-form--invalid',
  seccessClass: 'setup-ad-form--valid',
  errorTextParent: 'setup-ad-form',
  consoleTextHelp: 'setup-ad-form__error-text',
  errorTextTag: 'span',
  errorTextClass: 'form-error',
});
// Валидация поля Заголовок
const validateTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;

pristine.addValidator(
  adFormElement.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

// Валидация поля Цена за ночь (максимальная цена):
const validateMaxPricePerNight = (value) => value <= MAX_PRICE_PER_NIGTH;

pristine.addValidator(
  priceInputElement,
  validateMaxPricePerNight,
  'Не более 100 000'
);

// Валидация поля Цена за ночь в привязке к типу жилья
const validatePricePerNight = (value) => value >= MIN_PRICE[typeInputElement.value];

const getValidationPriceMessage = () => `Не менее ${MIN_PRICE[typeInputElement.value]}`;

pristine.addValidator(
  priceInputElement,
  validatePricePerNight,
  getValidationPriceMessage
);

const onTypeChange = () => {
  priceInputElement.placeholder = MIN_PRICE[typeInputElement.value];
};

typeInputElement.addEventListener('change', onTypeChange);

// Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом,
// что при выборе количества комнат выводятся ограничения на допустимые варианты выбора количества гостей
const validateCapacity = () => CAPACITY[roomNumberInputElement.value].includes(capasityInputElement.value);
const getCapacityMessage = () => `Размещение ${capasityInputElement.value} ${capasityInputElement.value === '1' ? 'гостя' : 'гостей'} невозможно`;

pristine.addValidator(
  capasityInputElement,
  validateCapacity,
  getCapacityMessage
);
// «Время заезда», «Время выезда» — выбор опции одного поля автоматически изменят значение другого (2 функции)
const onCheckInChange = () => {
  checkOutInputElement.value = checkInInputElement.value;
};

checkInInputElement.addEventListener('change', onCheckInChange);

const onCheckOutChange = () => {
  checkInInputElement.value = checkOutInputElement.value;
};

checkOutInputElement.addEventListener('change', onCheckOutChange);

const onLoadAvatar = () => {
  const fileItem = avatarElement.files[0];
  avatarPreviewElement.style.padding = '0';
  avatarPreviewImgElement.classList.add('user-avatar');
  avatarPreviewImgElement.src = URL.createObjectURL(fileItem);
};

const resetAvatar = () => {
  avatarPreviewElement.style.padding = '0 15px';
  avatarPreviewImgElement.classList.remove('user-avatar');
  avatarPreviewImgElement.src = 'img/muffin-grey.svg';
};

avatarElement.addEventListener('change', onLoadAvatar);

const onLoadFacilityImage = () => {
  const imgItem = facilityImageInputElement.files[0];
  const photo = document.createElement('img');
  photo.classList.add('inlineImg');
  photo.src = URL.createObjectURL(imgItem);
  facilityImagePreviewElement.appendChild(photo);
};

const resetFacilityImage = () => {
  facilityImagePreviewElement.textContent = '';
};

facilityImageInputElement.addEventListener('change', onLoadFacilityImage);


const resetAdForm = () => {
  adFormElement.reset();
  resetSlider();
  resetMainMarker();
  resetAvatar();
  resetFacilityImage();
  resetMapFilter();
};
// сброс формы через кнопку Очистить
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetAdForm();
});

// Блокировка кнопки отправки данных формы
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем...';
};

// Разблокирока кнопки отправки данных формы
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// Обработчик события, запускающий валидацию и отправляющий данные на сервер
const setAdFormSubmit = (onSuccess) => {
  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          unblockSubmitButton();
        },
        new FormData (evt.target),
      );
    }
  });
};

export {setAdFormSubmit, resetAdForm };
