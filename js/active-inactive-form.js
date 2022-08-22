const adFormItem = document.querySelector('.ad-form');
const adMapFilter = document.querySelector('.map__filters');


const setInactiveForm = (adFormPart) => {
  adFormPart.classList.add(`${adFormPart.classList[0]}--disabled`);

  const adFormPartElements = Array.from(adFormPart.children);
  adFormPartElements.forEach((adFormElement) => {
    adFormElement.setAttribute('disabled', '');
  });
};

const setActiveForm = (adFormPart) => {
  adFormPart.classList.remove(`${adFormPart.classList[0]}--disabled`);

  const adFormPartElements = Array.from(adFormPart.children);
  adFormPartElements.forEach((adFormElement) => {
    adFormElement.removeAttribute('disabled');
  });
};

//setInactiveForm(adFormItem);
//setInactiveForm(adMapFilter);

setActiveForm(adFormItem);
setActiveForm(adMapFilter);

export {setInactiveForm};
export {setActiveForm};
