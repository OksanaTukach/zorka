window.addEventListener('load', () => {
  const uiSliderGrops = document.querySelectorAll('.js-ui-group');
  if (uiSliderGrops.length) {
    uiSliderGrops.forEach(group => uiSliderInit(group));
  }

  const filterBtns = document.querySelectorAll('.js-filter');
  if (filterBtns.length) {
    filterBtns.forEach(item => {
      item.addEventListener('click', () => {
        const filter = document.querySelector('.catalog-filter');
        document.body.classList.toggle('_overflow');
        filter.classList.toggle('_opened');
      });
    });
  }
})

function uiSliderInit(uiGroup) {
  const uiSlider = uiGroup.querySelector('.js-ui-slider'),
    inputMin = uiGroup.querySelector('.js-input-min'),
    inputMinData = parseFloat(inputMin.getAttribute('min')),
    inputMinValue = parseFloat(inputMin.value) || inputMinData,
    inputMax = uiGroup.querySelector('.js-input-max'),
    inputMaxData = parseFloat(inputMax.getAttribute('max')),
    inputMaxValue = parseFloat(inputMax.value) || inputMaxData,
    inputStep = parseFloat(inputMin.getAttribute('step') || inputMax.getAttribute('step')),
    minMaxinputs = [];

  minMaxinputs.push(inputMin);
  minMaxinputs.push(inputMax);

  noUiSlider.create(uiSlider, {
    start: [inputMinValue, inputMaxValue],
    step: inputStep,
    connect: true,
    range: {
      'min': inputMinData,
      'max': inputMaxData
    }
  });

  uiSlider.noUiSlider.on('update', setValues);

  minMaxinputs.forEach((input, handle) => {

    input.addEventListener('keydown', function (e) {

      var values = uiSlider.noUiSlider.get(),
        value = Number(values[handle]),
        steps = uiSlider.noUiSlider.steps(),
        step = steps[handle],
        position;

      switch (e.which) {
        case 13:
          uiSlider.noUiSlider.setHandle(handle, this.value)
          break;
        case 38:
          position = step[1]
          if (position === false) {
            position = 1;
          }
          if (position !== null) {
            uiSlider.noUiSlider.setHandle(handle, value + position);
          }
          break;
        case 40:
          position = step[0]
          if (position === false) {
            position = 1;
          }
          if (position !== null) {
            uiSlider.noUiSlider.setHandle(handle, value - position);
          }
          break;
      }
    })
  })

  function setValues(values, handle) {
    minMaxinputs[handle].value = values[handle];
  }
}
