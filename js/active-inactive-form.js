const adForm = document.querySelector('.ad-form');
const adMapFilter = document.querySelector('.map__filters');


const getInactiveForm = (adFormPart) => {
  adFormPart.classList.add(`${adFormPart.classList[0]}--disabled`);

  const adFormPartElements = Array.from(adFormPart.children);
  adFormPartElements.forEach((adFormElement) => {
    adFormElement.setAttribute('disabled', '');
  });
};

const getActiveForm = (adFormPart) => {
  adFormPart.classList.remove(`${adFormPart.classList[0]}--disabled`);

  const adFormPartElements = Array.from(adFormPart.children);
  adFormPartElements.forEach((adFormElement) => {
    adFormElement.removeAttribute('disabled');
  });
};

//getInactiveForm(adForm);
//getInactiveForm(adMapFilter);

getActiveForm(adForm);
getActiveForm(adMapFilter);

export {getInactiveForm};
export {getActiveForm};
