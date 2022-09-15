import { openSuccessMessage, openErrorMessage } from './success-error-msg.js';
import { showAlert } from './util.js';
import { setActiveForm } from './active-inactive-form.js';

const GET_URL = 'https://26.javascript.pages.academy/keksobooking/data';
const SEND_URL = 'https://26.javascript.pages.academy/keksobooking';
const adMapFilter = document.querySelector('.map__filters');

const getData = (onSuccess) => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        setActiveForm(adMapFilter);
        return response.json();
      } else {
        throw new Error('Не удалось загрузить данные. Попробуйте еще раз.');
      }
    })
    .then((ads) => onSuccess(ads))
    .catch(() => {
      showAlert('Не удалось загрузить данные. Попробуйте еще раз.');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        openSuccessMessage();
      } else {
        onFail();
        openErrorMessage();
      }
    })
    .catch(() => {
      onFail();
      openErrorMessage();
    });
};

export {getData, sendData};
