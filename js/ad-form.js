import { resetSlider } from './slider.js';
import { resetMainMarker } from './map.js';
import { sendData } from './get-send-data.js';

// Находим элементы формы в DOM
const adForm = document.querySelector('.ad-form');
const adFormPriceInput = adForm.querySelector('#price');
const adFormFacilityType = adForm.querySelector('#type');
const adFormRoomInput = adForm.querySelector('#room_number');
const adFormCapasityField = adForm.querySelector('#capacity');
const adFormCheckin = adForm.querySelector('#timein');
const adFormCheckout = adForm.querySelector('#timeout');
const adFormAvatar = adForm.querySelector('#avatar');
const avatarPreview = adForm.querySelector('.ad-form-header__preview');
const avatarPreviewImg = adForm.querySelector('.ad-form-header__preview img');
const userImageInput = adForm.querySelector('#images');
const userImagePreview = adForm.querySelector('.ad-form__photo');
const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = adForm.querySelector('.ad-form__reset');

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
const pristine = new Pristine(adForm, {
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
  adForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

// Валидация поля Цена за ночь (максимальная цена):
const validateMaxPricePerNight = (value) => value <= MAX_PRICE_PER_NIGTH;

pristine.addValidator(
  adFormPriceInput,
  validateMaxPricePerNight,
  'Не более 100 000'
);

// Валидация поля Цена за ночь в привязке к типу жилья
const validatePricePerNight = (value) => value >= MIN_PRICE[adFormFacilityType.value];

const getValidationPriceMessage = () => `Не менее ${MIN_PRICE[adFormFacilityType.value]}`;

pristine.addValidator(
  adFormPriceInput,
  validatePricePerNight,
  getValidationPriceMessage
);

const onFacilityTypeChange = () => {
  adFormPriceInput.placeholder = MIN_PRICE[adFormFacilityType.value];
};

adFormFacilityType.addEventListener('change', onFacilityTypeChange);

// Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом,
// что при выборе количества комнат выводятся ограничения на допустимые варианты выбора количества гостей
const validateCapacity = () => CAPACITY[adFormRoomInput.value].includes(adFormCapasityField.value);
const getCapacityMessage = () => `Размещение ${adFormCapasityField.value} ${adFormCapasityField.value === '1' ? 'гостя' : 'гостей'} невозможно`;

pristine.addValidator(
  adFormCapasityField,
  validateCapacity,
  getCapacityMessage
);
// «Время заезда», «Время выезда» — выбор опции одного поля автоматически изменят значение другого (2 функции)
const onCheckinChange = () => {
  adFormCheckout.value = adFormCheckin.value;
};

adFormCheckin.addEventListener('change', onCheckinChange);

const onCheckoutChange = () => {
  adFormCheckin.value = adFormCheckout.value;
};

adFormCheckout.addEventListener('change', onCheckoutChange);

const onLoadAvatar = () => {
  const fileItem = adFormAvatar.files[0];
  avatarPreview.style.padding = '0';
  avatarPreviewImg.classList.add('user-avatar');
  avatarPreviewImg.src = URL.createObjectURL(fileItem);
};

const resetAvatar = () => {
  avatarPreview.style.padding = '0 15px';
  avatarPreviewImg.classList.remove('user-avatar');
  avatarPreviewImg.src = 'img/muffin-grey.svg';
};

adFormAvatar.addEventListener('change', onLoadAvatar);

const onLoadUserImage = () => {
  const imgItem = userImageInput.files[0];
  const photo = document.createElement('img');
  photo.classList.add('inlineImg');
  photo.src = URL.createObjectURL(imgItem);
  userImagePreview.appendChild(photo);
};

const resetUserImage = () => {
  userImagePreview.textContent = '';
};

userImageInput.addEventListener('change', onLoadUserImage);


const resetAdForm = () => {
  adForm.reset();
  resetSlider();
  resetMainMarker();
  resetAvatar();
  resetUserImage();
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
  adForm.addEventListener('submit', (evt) => {
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
