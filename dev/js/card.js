window.addEventListener('load', () => {
  const doubleSlider = document.querySelectorAll('.js-double-slider');
  if (doubleSlider.length) {
    doubleSlider.forEach((item) => {
      doubleSliderInit(item);
    });
  }

  const singleSlider = document.querySelectorAll('.js-single-slider');
  if (singleSlider.length) {
    singleSlider.forEach((item) => {
      singleSliderInit(item);
    });
  }
});

document.addEventListener('click', (e) => {
  const btn = e.target;

  if (btn.classList.contains('js-show-btn-popup')) {
    btn.classList.add('_btn-popup-visible');
    setTimeout(() => {
      btn.classList.remove('_btn-popup-visible');
    }, 1000);
  }
});

window.addEventListener('resize', slickSlidersResize);

function slickSlidersResize() {
  const slicksSliders = document.querySelectorAll('.slick-initialized');
  if (slicksSliders.length) {
    slicksSliders.forEach((item) => {
      $(item).slick('refresh');
    });
  }
}

function doubleSliderInit(wrapper) {
  const mainSliderSelector = '.card-slider__main';
  const navSliderSelector = '.card-slider__nav';

  $(wrapper.querySelector(mainSliderSelector)).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    // arrows: false,
    fade: true,
    asNavFor: navSliderSelector,
    swipeToSlide: true,
  });

  $(this).on('beforeChange', function () {
    let img = $(this).find('.lazy:not(.loaded)');
    lazyLoadInstance.update();
  });

  $(wrapper.querySelector(navSliderSelector)).slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    // arrows: false,
    vertical: true,
    verticalSwiping: true,
    asNavFor: mainSliderSelector,
    focusOnSelect: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          vertical: false,
          verticalSwiping: false,
        },
      },
    ],
  });
}

function singleSliderInit(wrapper) {
  $(wrapper).slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1181,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 801,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 601,
        settings: {
          slidesToShow: 2,
        },
      },
      // {
      //   breakpoint: 451,
      //   settings: {
      //     slidesToShow: 1,
      //   },
      // },
    ],
  });
}
