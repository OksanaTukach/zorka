$(document).ready(function () {
  const width = $(window).width();
  const height = $(window).height();

  console.log('Width: ' + width + 'px');
  console.log('Height: ' + height + 'px');

  svg4everybody();

  var lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy',
    load_delay: 100,
  });
  $(window).scroll(function () {
    $('.header').toggleClass('_sm', $(this).scrollTop() > 0);
  });

  if (
    /MSIE 9/i.test(navigator.userAgent) ||
    /rv:11.0/i.test(navigator.userAgent) ||
    /rv:10.0/i.test(navigator.userAgent)
  ) {
    //Добавить класс ie в боди
    document.body.className = 'ie';
    //Перенаправить на другую страницу
    window.location = '/ie.html';
  }

  // accordion

  $('body').on('click', '.js-accordion-head', function () {
    const accordion = $(this).closest('.js-accordion');

    accordion.toggleClass('_open');
    accordion.children('.js-accordion-body').slideToggle(300);
  });

  $(document).on('click', '.js-mobile-acc', function () {
    if (window.matchMedia('(max-width: 600px)').matches) {
      $(this).closest('[data-mobile-acc]').toggleClass('_open');
      $(this).siblings('[data-mobile-acc-dd]').slideToggle(300);
    }
  });

  //Клик в не блока
  $(document).mouseup(function (e) {
    var div = $('.header-search__container');
    if (!div.is(e.target) && div.has(e.target).length === 0) {
      div.find('.header-search').removeClass('_active');
    }
  });

  // Попап инит
  // $('.ajax-form').magnificPopup({
  // 	type: 'ajax',
  // 	ajaxContentAdded: function() {
  // 		console.log(this.content);
  // 	}
  // });

  if ($('.styler').length) {
    $('.styler').styler();
  }
  if (width <= 1180) {
    headerMobHeight();
    $('.header-menu').prependTo($('.header-mob__menu'));
    $('.header-info__btn._tel').prependTo($('.header-mob__info'));

    $('body').on('click', '.js-burger', function () {
      $(this).toggleClass('_open');
      $(this).siblings('.header-mob').toggleClass('_open');
    });
  }
  if (width <= 1180 && width > 600) {
    $('.footer-info').appendTo($('.footer-info__wrp'));
  }
  if (width <= 600) {
    $('body').on('click', '.js-footer-menu', function () {
      $(this).toggleClass('_open');
      $(this).find('.footer-menu__links').slideToggle(300);
    });
    $('.mp-ct__left .slick-prev').prependTo($('.mp-ct__left .slick-dots'));
    $('.mp-ct__left .slick-next').appendTo($('.mp-ct__left .slick-dots'));
  }
});

$(window).resize(function () {
  let width = $(window).width();
  let height = $(window).height();

  // if(width > 991){
  // 	$('.header').attr('data-mob', 'false');
  // 	menuDex()
  // }
  // else{
  // 	$('.header').attr('data-mob', 'true');
  // 	menuMob();
  // }
  if (width <= 1180) {
    $('.header-menu').prependTo($('.header-mob__menu'));
    $('.header-info__btn._tel').prependTo($('.header-mob__info'));
  }

  if (width <= 1180 && width > 600) {
    $('.footer-info').appendTo($('.footer-info__wrp'));
  }
});

$(window).on('load', function () {
  inputFocus();
});

function menuMob() {}

function menuDex() {}
function paralax(elem, vertical, horizontal) {
  if (elem.length) {
    var elementX = 0,
      elementY = 0,
      elementW = 0,
      elementH = 0,
      mouseX = 0,
      mouseY = 0;
    $(document).mousemove(function (e) {
      var position = elem.offset(),
        obj = elem;
      elementX = position.left;
      elementY = position.top;
      elementW = obj.width();
      elementH = obj.height();
      var halfW = elementW / 2;
      var halfH = elementH / 2;
      mouseX = (e.pageX - elementX - halfW) / halfW;
      mouseY = (e.pageY - elementY - halfH) / halfH;
      mouseX = Math.round(mouseX * 100) / 100;
      mouseY = Math.round(mouseY * 100) / 100;

      elem.css({
        transform:
          'translateY(' +
          mouseY * vertical +
          'px)  translateX(' +
          mouseX * horizontal +
          'px) ',
        '-webkit-transform':
          'translateY(' +
          mouseY * vertical +
          'px) translateX(' +
          mouseX * horizontal +
          'px) ',
        '-ms-transform':
          'translateY(' +
          (mouseY * vertical) / +'px) translateX(' +
          mouseX * horizontal +
          'px) ',
        '-o-transform':
          'translateY(' +
          mouseY * vertical +
          'px) translateX(' +
          mouseX * horizontal +
          'px) ',
        '-moz-transform':
          'translateY(' +
          mouseY * vertical +
          'px) translateX(' +
          mouseX * horizontal +
          'px) ',
      });
    });
  }
}
const headerMobHeight = () => {
  const headerMob = document.querySelector('.header-mob');
  const header = document.getElementById('header');
  setTimeout(function () {
    headerMob.style.height = window.innerHeight - header.clientHeight + 'px';
  }, 1);
};

const inputFocus = () => {
  // Функции фокуса на инпуты
  $('.input-text-label input, .input-text-label textarea').each(function () {
    if ($(this).val().length > 0) {
      $(this).closest('div').addClass('_focus');
    }
  });
  $('body').on(
    'focus',
    '.input-text-label input, .input-text-label textarea',
    function () {
      $(this).closest('.input-text-label').addClass('_focus');
    }
  );
  $('body').on(
    'blur',
    '.input-text-label input, .input-text-label textarea',
    function () {
      if ($(this).val() == '') {
        $(this).closest('.input-text-label').removeClass('_focus');
      }
    }
  );
  $('body').on(
    'change',
    '.input-text-label input, .input-text-label textarea',
    function () {
      if ($(this).val() == '') {
        $(this).closest('.input-text-label').removeClass('_focus');
      } else {
        $(this).closest('.input-text-label').addClass('_focus');
      }
    }
  );

  $('.input--mask--required.input-text-label').hover(
    function () {
      $(this).addClass('_hover');
    },
    function () {
      $(this).removeClass('_hover');
    }
  );
};

$(document).on('click', '.js-video-popup', function () {
  const href = $(this).attr('data-href');

  $.magnificPopup.open({
    items: {
      src: href,
    },
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 150,
  });
});

$(document).on('click', '[data-tab-btn]', function (e) {
  e.preventDefault();

  const tabName = $(this).attr('data-tab-btn');
  $(this).addClass('_active').siblings('._active').removeClass('_active');
  $(`[data-tab-content="${tabName}"]`)
    .addClass('_active')
    .siblings('._active')
    .removeClass('_active');
});

$(document).on('click', '.js-clear-search', function () {
  $(this).siblings('input[type="search"]').val('');
});

$(document).on('click', '.js-show-more', function () {
  $(this).find('span').toggleClass('hidden');
  $(this)
    .closest('.catalog-filter__group')
    .find('.more-hidden')
    .toggleClass('not-hidden');
});

$(document).on('click', '.js-search', function (e) {
  e.preventDefault();
  $('.header-search').toggleClass('_active');
});

const fixPage = () => {
  document.body.style.height = `${window.innerHeight}px`;
  document.body.classList.add('_overflow');
  document.querySelector('html').classList.add('_overflow');
  // document.querySelector('.mfp-bg').style.height = `${window.innerHeight}px`;
};

const unFixPage = () => {
  document.body.style.height = '';
  document.body.classList.remove('_overflow');
  document.querySelector('html').classList.remove('_overflow');
  // document.querySelector('.mfp-bg').style.height = '';
};
