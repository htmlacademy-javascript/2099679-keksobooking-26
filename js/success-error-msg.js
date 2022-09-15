import {isEscapeKey} from './util.js';

const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;
const bodyElement = document.querySelector('body');

const onEscapeKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onSuccessMessageClose();
  }
};

const onWindowClick = (evt) => {
  if (evt.target.closest('div')) {
    onSuccessMessageClose();
    window.removeEventListener('click', onWindowClick);
  }
};

const openSuccessMessage = () => {
  const successMessageElement = successMessageTemplate.cloneNode(true);
  bodyElement.append(successMessageElement);

  document.addEventListener('keydown', onEscapeKeyDown);
  document.addEventListener('click', onWindowClick);
};

function onSuccessMessageClose () {
  const successMessage = document.querySelector('.success');
  successMessage.remove();

  document.removeEventListener('keydown', onEscapeKeyDown);
  document.removeEventListener('click', onWindowClick);
}

const onErrorEscapeKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onErrorMessageClose();
  }
};

const onWindowClickError = (evt) => {
  if (evt.target.closest('div')) {
    onErrorMessageClose();
    window.removeEventListener('click', onWindowClickError);
  }
};

const openErrorMessage = () => {
  const errorMessageElement = errorMessageTemplate.cloneNode(true);
  bodyElement.append(errorMessageElement);

  document.addEventListener('keydown', onErrorEscapeKeyDown);
  const closeErrorMessageButton = document.querySelector('.error__button');
  closeErrorMessageButton.addEventListener('click', onErrorMessageClose);
  document.addEventListener('click', onWindowClickError);
};

function onErrorMessageClose () {
  const errorMessage = document.querySelector('.error');
  errorMessage.remove();

  document.removeEventListener('keydown', onErrorEscapeKeyDown);
  document.removeEventListener('click', onWindowClickError);
}

export {openSuccessMessage, openErrorMessage};
