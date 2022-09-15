const sliderForPrice = document.querySelector('.ad-form__slider');
const adFormPriceInput = document.querySelector('#price');

noUiSlider.create(sliderForPrice, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 1000,
  connect: 'lower',
  format: {
    to: function (value) {
      return value;
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderForPrice.noUiSlider.on('update', () => {
  adFormPriceInput.value = sliderForPrice.noUiSlider.get();
});

const resetSlider = () => {
  sliderForPrice.noUiSlider.reset();
};

export { resetSlider };
