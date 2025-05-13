$(document).ready(function () {
    $('.js-ms-sl').slick({
        swipeToSlide: true,
        speed: 1000,
        autoplaySpeed: 5000,
        autoplay: true,
        arrows: true,
        infinite: true,
        dots: true,
        responsive: [
            {
              breakpoint: 991,
              settings: {
                arrows: false,
                dots: false,
              }
            },
        ]
    });
    $('.js-ct-sl').slick({
      swipeToSlide: true,
      speed: 1000,
      autoplaySpeed: 5000,
      slidesToShow: 3,
      autoplay: true,
      arrows: true,
      infinite: true,
      dots: false,
      responsive: [
        {
          breakpoint: 601,
          settings: {
            slidesToShow: 1,
            dots: true,
          }
        },
    ]
  });
})