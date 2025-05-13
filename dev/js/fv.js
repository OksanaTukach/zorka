$(document).ready(function () {
  // --- Инициализация стилизации полей input ---
  if ($('.styler').length) {
    $('.styler').styler({
      onFormStyled: function () {
        selectLoadImages();
      },
      onSelectOpened: function () {
        if ($(this).closest('.input-style').length) {
          $(this).closest('.input-style').addClass('_zIndexSup');
          if ($(this).hasClass('dropup')) {
            $(this).closest('.input-style').addClass('_hide-label');
          }
        }
      },
      onSelectClosed: function () {
        if ($(this).closest('.input-style').length) {
          $(this).closest('.input-style').removeClass('_zIndexSup _hide-label');
        }
      },
    });
  }

  // --- Инициализация вызова popup (ajax) ---
  $('body').on('click', '.ajax-form', function (e) {
    e.preventDefault();
    var url = $(this).attr('href') || $(this).attr('data-href');
    var mainClass = $(this).attr('data-class');
    $.magnificPopup.open({
      type: 'ajax',
      items: {
        src: url,
      },
      overflowY: 'scroll',
      mainClass: mainClass,
      callbacks: {
        open: function () {
          fixPage();
        },
        ajaxContentAdded: function () {
          if ($('.styler').length)
            $('.styler').styler({
              onFormStyled: function () {
                selectLoadImages();
                fileListcontroll();
              },
            });
          datePicker();
          keyup_form();
          click_submit();
          tableScroll();
        },
        afterClose: function () {
          unFixPage();
        },
      },
    });
  });

  // --- Инициализация вызова popup (inline) ---
  $('.js-inline-popup').magnificPopup({
    type: 'inline',
    callbacks: {
      beforeOpen: function () {
        console.log('Start of popup initialization');
      },
    },
  });

  datePicker();
  fileListcontroll();
  keyup_form();
  click_submit();
});

function tableScroll() {
  if (window.innerWidth > 990 && $('.js-table-scroll').length) {
    $('.js-table-scroll.table-size__overflow').mCustomScrollbar({
      axis: 'x',
    });
  }
}

// ------ Event's listners ------

// --- Переключение режима отображения пароля (показать) ---
$(document).on('mousedown', '.password-control', function () {
  if ($(this).siblings('input').attr('type') == 'password') {
    $(this).addClass('view');
    $(this).siblings('input').attr('type', 'text');
  }
});

// --- Переключение иконки флага страны ---
$(document).on('change', '.input-country select', function () {
  let $thisSelected = $(this).find(':selected'),
    $thisMask = $(this).attr('data-value'),
    $thisBlock = $(this).closest('.input-country'),
    $thisPlaceholder = $thisSelected.attr('data-placeholder'),
    $thisImg = $thisSelected.attr('data-img'),
    $this = $thisBlock.find('input[data-mask]');

  $this.val('');
  $this.inputmask('remove');

  $thisSelected.hasClass('no-mask')
    ? ($thisBlock
        .find('.jq-selectbox__select-text')
        .css('background-image', 'none'),
      $this.attr({
        placeholder: '_______',
        'data-mask': '',
        'data-placeholder': '',
      }))
    : ($thisBlock
        .find('.jq-selectbox__select-text')
        .css('background-image', 'url(' + $thisImg + ')'),
      $this.attr({
        placeholder: $thisPlaceholder,
        'data-mask': $thisMask,
        'data-placeholder': $thisPlaceholder,
      }),
      inputMask(),
      inputMaskRequired());
});

// --- Удаление файлов из списка ---
$(document).on('click', '.input-file-list span', function () {
  delete object[$(this).closest('p').attr('id')];
  $(this).closest('p').remove();
  fileQuantity(object);
});

// ------ Event's listners end ------

// ------ Function's ------

// --- Вывод текста ошибка ---
function popupForm_error(form, count) {
  const informBlock = form.closest('form').find('.fv__error');
  if (count >= 1 && informBlock.length) {
    informBlock.addClass('error');
    return false;
  } else {
    informBlock.removeClass('error');
  }
}

// --- Проверка ввода текстового поля ---
function required_input() {
  $(document).on('keyup', '.required--input input', function () {
    const wrapBlock = $(this).closest('.required--input'),
      inputVal = $(this).val();

    let inputLenght = null;

    if (wrapBlock.hasClass('required--email')) {
      return false;
    } else {
      if ($(this).attr('data-length')) {
        inputLenght = $(this).attr('data-length') - 1;
      } else {
        inputLenght = 3;
      }

      if (inputVal.length > inputLenght) {
        wrapBlock.removeClass('error error-online').addClass('succes');
      } else {
        wrapBlock.removeClass('succes').addClass('error-online');
      }
    }
  });
}

// --- Проверка ввода textarea ---
function required_textarea() {
  $(document).on('keyup', '.required--textarea textarea', function () {
    const wrapBlock = $(this).closest('.required--textarea'),
      textareaVal = $(this).val();

    let textareaLenght = null;

    if ($(this).attr('data-length')) {
      textareaLenght = $(this).attr('data-length') - 1;
    } else {
      textareaLenght = 3;
    }

    if (textareaVal.length > textareaLenght) {
      wrapBlock.removeClass('error error-online').addClass('succes');
    } else {
      wrapBlock.removeClass('succes').addClass('error-online');
    }
  });
}

// --- Запрет ввода букв ---
function num_inset() {
  $(document).on('change keyup input click', '.num--inset input', function () {
    if (this.value.match(/[^0-9^+]/g)) {
      this.value = this.value.replace(/[^0-9]/g, '');
    }
  });
}
// --- Запрет ввода цифр ---
function letter_inset() {
  $(document).on(
    'change keyup input click',
    '.letter--inset input',
    function () {
      this.value = this.value.replace(/[^a-zа-яё\s]/gi, '');
    }
  );
}

// --- Проверка ввода пароля (первый шаг) ---
let firstPasswordSucces = 0,
  firstPasswordValue = 0,
  secondPasswordSucces = 0,
  secondPasswordValue = 0;

function first_password() {
  $(document).on(
    'change keyup input click',
    '.password-first input',
    function () {
      let mainBlock = $(this).closest('.required--password'),
        firstPassword = mainBlock.find('.password-first'),
        secondPassword = mainBlock.find('.password-second');

      var password = $(this).val(); // Получаем пароль из формы
      var s_letters = 'qwertyuiopasdfghjklzxcvbnm'; // Буквы в нижнем регистре
      var b_letters = 'QWERTYUIOPLKJHGFDSAZXCVBNM'; // Буквы в верхнем регистре
      var digits = '0123456789'; // Цифры
      var specials = '!@#$%^&*()_-+=|/.,:;[]{}'; // Спецсимволы
      var is_s = false; // Есть ли в пароле буквы в нижнем регистре
      var is_b = false; // Есть ли в пароле буквы в верхнем регистре
      var is_d = false; // Есть ли в пароле цифры
      var is_sp = false; // Есть ли в пароле спецсимволы
      for (var i = 0; i < password.length; i++) {
        /* Проверяем каждый символ пароля на принадлежность к тому или иному типу */
        if (!is_s && s_letters.indexOf(password[i]) != -1) is_s = true;
        else if (!is_b && b_letters.indexOf(password[i]) != -1) is_b = true;
        else if (!is_d && digits.indexOf(password[i]) != -1) is_d = true;
        else if (!is_sp && specials.indexOf(password[i]) != -1) is_sp = true;
      }
      var rating = 0;
      var text = '';
      if (is_s) rating++; // Если в пароле есть символы в нижнем регистре, то увеличиваем рейтинг сложности
      if (is_b) rating++; // Если в пароле есть символы в верхнем регистре, то увеличиваем рейтинг сложности
      if (is_d) rating++; // Если в пароле есть цифры, то увеличиваем рейтинг сложности
      if (is_sp) rating++; // Если в пароле есть спецсимволы, то увеличиваем рейтинг сложности

      if (password.length >= 6 && rating == 3) {
        firstPassword.addClass('succes').removeClass('error-online');
        secondPassword.addClass('show').removeClass('error-online');
        secondPassword.find('input').val('');
        mainBlock.removeClass('succes');
      } else {
        firstPassword.removeClass('succes').addClass('error-online');
        mainBlock.removeClass('succes');
        secondPassword.removeClass('show').addClass('error-online');
        secondPassword.find('input').val('');
      }
      firstPasswordValue = this.value;
    }
  );
}

// --- Проверка ввода пароля (второй шаг) ---
function second_password() {
  $(document).on(
    'change keyup input click',
    '.password-second input',
    function () {
      let mainBlock = $(this).closest('.required--password');
      if ($(this).val() != firstPasswordValue) {
        mainBlock.removeClass('succes').addClass('error error-online');
      } else {
        mainBlock.removeClass('error error-online').addClass('succes');
      }
    }
  );
}

// --- Инит маски (если поле НЕ является обязательным) ---
function inputMask() {
  $('.input--mask input[data-mask]').each(function () {
    let $this = $(this),
      $thisMask = $this.attr('data-mask'),
      $thisPlaceholder = $this.attr('data-placeholder');

    if ($thisPlaceholder == '' || !$thisPlaceholder) {
      $this.inputmask('' + $thisMask + '', {
        clearMaskOnLostFocus: true,
        clearIncomplete: true,
      });
    } else {
      if ($this.closest('.input--mask').hasClass('date')) {
        $this.inputmask($thisMask);
        return;
      }
      $this.inputmask('' + $thisMask + '', {
        clearMaskOnLostFocus: true,
        clearIncomplete: true,
        placeholder: '' + $thisPlaceholder + '',
      });
    }
  });
}

// --- Инит маски (если поле является обязательным) ---
function inputMaskRequired() {
  $('.input--mask--required input[data-mask]').each(function () {
    const $this = $(this),
      $thisDiv = $this.closest('.input--mask--required'),
      $thisMask = $this.attr('data-mask'),
      $thisPlaceholder = $this.attr('data-placeholder');

    if ($thisPlaceholder == '' || !$thisPlaceholder) {
      $this.inputmask('' + $thisMask + '', {
        clearMaskOnLostFocus: true,
        clearIncomplete: true,
        oncomplete: function () {
          $thisDiv.removeClass('error error-online').addClass('succes');
        },
        oncleared: function () {
          $thisDiv.removeClass('succes').addClass('error-online');
        },
        onincomplete: function oncomplete() {
          $thisDiv.removeClass('succes').addClass('error-online');
        },
        onKeyValidation: function (key, result) {
          $thisDiv.removeClass('error error-online').addClass('succes');
        },
      });
    } else {
      if ($this.closest('.input--mask').hasClass('date')) {
        $this.inputmask($thisMask);
        return;
      }
      $this.inputmask('' + $thisMask + '', {
        placeholder: '' + $thisPlaceholder + '',
        clearMaskOnLostFocus: true,
        clearIncomplete: true,
        oncomplete: function () {
          $thisDiv.removeClass('error error-online').addClass('succes');
        },
        oncleared: function () {
          $thisDiv.removeClass('succes').addClass('error-online');
        },
        onincomplete: function oncomplete() {
          $thisDiv.removeClass('succes').addClass('error-online');
        },
        onKeyValidation: function (key, result) {
          $thisDiv.removeClass('error error-online').addClass('succes');
        },
      });
    }
  });
}

// --- Проверка ввода необязательного поля с маской ---
function maskInputControl() {
  $('.mask-input-control input[data-mask]').each(function () {
    const $this = $(this),
      $thisDiv = $this.closest('.mask-input-control'),
      $thisMask = $this.attr('data-mask'),
      $thisPlaceholder = $this.attr('data-placeholder');

    if ($thisPlaceholder == '' || !$thisPlaceholder) {
      $this.inputmask('' + $thisMask + '', {
        oncomplete: function () {
          $thisDiv.removeClass('error error-online').addClass('succes');
        },
        oncleared: function () {
          $thisDiv.removeClass('error error-online succes');
        },
        onincomplete: function oncomplete() {
          if ($this.val() !== '')
            $thisDiv.removeClass('succes').addClass('error-online');
          else return;
        },
        onKeyValidation: function (key, result) {},
      });
    } else {
      if ($thisDiv.hasClass('date')) {
        $this.inputmask($thisMask);
        return;
      }
      $this.inputmask('' + $thisMask + '', {
        placeholder: '' + $thisPlaceholder + '',
        oncomplete: function () {
          $thisDiv.removeClass('error error-online').addClass('succes');
        },
        oncleared: function () {
          $thisDiv.removeClass('error error-online succes');
        },
        onincomplete: function oncomplete() {
          if ($this.val() !== '')
            $thisDiv.removeClass('succes').addClass('error-online');
          else return;
        },
        onKeyValidation: function (key, result) {},
      });
    }
  });
}

// --- Проверка datepicker при вводе данных ---
function required_date() {
  $(document).on(
    'change',
    '.input--mask--required.required--date input',
    function () {
      const thisDateBlock = $(this).closest('.required--date');

      if ($(this).val() != '') {
        thisDateBlock.removeClass('error error-online').addClass('succes');
      } else {
        thisDateBlock.remove('succes').addClass('error-online');
      }
    }
  );
}

// ---- Проверка ввода поля емайл ---
function required_email() {
  $(document).on('keyup', '.required--email input', function () {
    const email = $(this).val(),
      emailDiv = $(this).closest('.required--email');

    if (
      email.length >= 0 &&
      (email.match(/[a-z0-9]\@.+[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}/g) || [])
        .length !== 1
    ) {
      emailDiv.removeClass('succes').addClass('error-online');
    } else if (email == '') {
      emailDiv.removeClass('error error-online').addClass('succes');
    } else {
      emailDiv.removeClass('error error-online').addClass('succes');
    }
  });
}

// ---- Проверка ввода поля url ---
function required_url() {
  $(document).on('keyup', '.required--url input', function () {
    const url = $(this).val(),
      urlDiv = $(this).closest('.required--url');

    if (
      url.length >= 0 &&
      (
        url.match(
          /^((https?|ftp)\:\/\/)?([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z]{2,6})(\/?)$/g
        ) || []
      ).length !== 1
    ) {
      urlDiv.removeClass('succes').addClass('error-online');
    } else if (url == '') {
      urlDiv.removeClass('error error-online').addClass('succes');
    } else {
      urlDiv.removeClass('error error-online').addClass('succes');
    }
  });
}

// --- Проверка ввода поля емайл ---
function emailInputControl() {
  $('.email-input-control input').keyup(function () {
    const email = $(this).val(),
      emailDiv = $(this).closest('.email-input-control');

    if (
      email.length > 0 &&
      (email.match(/[a-z0-9]\@.+[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}/g) || [])
        .length !== 1 &&
      !emailDiv.hasClass('error-online')
    ) {
      emailDiv
        .addClass('error-online required--email')
        .append('<span class="email-input-error-text">Неверный email</span>');
    } else if (
      email.length > 0 &&
      (email.match(/[a-z0-9]\@.+[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}/g) || [])
        .length !== 1 &&
      emailDiv.hasClass('error-online')
    ) {
      return;
    } else if (email.length === 0) {
      emailDiv.removeClass('error-online error required--email succes');
      emailDiv.find('.email-input-error-text').remove();
    } else {
      emailDiv
        .removeClass('error-online error required--email')
        .addClass('succes');
      emailDiv.find('.email-input-error-text').remove();
    }
  });
}

// --- Проверка изминения радио баттона ---
function radioChange() {
  $(document).on('change', '.radio--required :radio', function () {
    const radiolDiv = $(this).closest('.radio--required');
    radiolDiv.removeClass('error').addClass('succes');
  });
}

// --- Проверка изминения селекта ---
function selectChange() {
  $(document).on('change', '.required--select select', function () {
    const val = $(this).val(),
      selectDiv = $(this).closest('.required--select');

    if (val === 'Not selected') {
      selectDiv.removeClass('succes').addClass('error');
      return false;
    } else {
      selectDiv.removeClass('error').addClass('succes');
    }
  });
}

// --- Проверка изминения одного чекбокса ---
function checkChange() {
  $(document).on('change', '.required--check :checkbox', function () {
    let val = $(this).prop('checked'),
      checkDiv = $(this).closest('.required--check');

    if (val) {
      checkDiv.removeClass('error').addClass('succes');
      $(this)
        .closest('label')
        .siblings()
        .find(':checkbox')
        .prop('checked', false);
    } else {
      checkDiv.removeClass('succes').addClass('error');
    }
    checkDiv.find('.styler').trigger('refresh');
  });
}

// --- Проверка изминения множественного чебокса ---
function checkMoreChange() {
  $(document).on('change', '.check-more :checkbox', function () {
    let val = $(this).prop('checked'),
      checkDiv = $(this).closest('.check-more');

    if (val) {
      checkDiv.removeClass('error').addClass('succes');
    } else if (!$('.check-more :checked').length) {
      checkDiv.removeClass('succes').addClass('error');
    }
  });
}

// --- Проверка изминения input file ---
function fileChange() {
  $(document).on('change', '.required--file input[type="file"]', function () {
    const val = $(this).val(),
      fileDiv = $(this).closest('.required--file');

    if (val === '') {
      fileDiv.removeClass('succes').addClass('error');
    } else {
      fileDiv.removeClass('error').addClass('succes');
    }
  });
}

// --- Проверка изминения input file multiple ---
function fileChangeMultiple() {
  $(document).on(
    'change',
    '.required--file--multiple input[type="file"]',
    function () {
      const fileDiv = $(this).closest('.required--file--multiple'),
        val = fileDiv.find('.input-file-list p').length,
        max = fileDiv.attr('data-max');

      if (val > max || val == 0) {
        fileDiv.removeClass('succes').addClass('error');
      } else {
        fileDiv.removeClass('error').addClass('succes');
      }
    }
  );
}

// --- Датапикер ---
function datePicker() {
  $('.date-picker').each(function () {
    var $this = $(this);

    var dataLang = $(this).attr('data-lang');
    var dayNames, dayNamesShort, dayNamesMin, monthNames, monthNamesShort;

    let img = $(this).attr('data-src');
    let template = $(this).attr('data-template');

    let yearRange = '2014:c+10';
    let minDate = new Date(2014, 10 - 1, 25);
    let maxDate = new Date(2021, 10 - 1, 25);
    if ($(this).hasClass('year-date')) {
      yearRange = '-100:-16';
      minDate = '-100y';
      maxDate = '-10y';
    }

    $.getJSON(getConstant('date-picker-path'), function (data) {
      if (dataLang == 'ru') {
        var lang = data.ru;
      }
      if (dataLang == 'en') {
        var lang = data.en;
      }

      for (var item in lang) {
        if (lang[item].dayNames) {
          dayNames = lang[item].dayNames;
        }

        if (lang[item].dayNamesShort) {
          dayNamesShort = lang[item].dayNamesShort;
        }
        if (lang[item].dayNamesMin) {
          dayNamesMin = lang[item].dayNamesMin;
        }
        if (lang[item].monthNames) {
          monthNames = lang[item].monthNames;
        }
        if (lang[item].monthNamesShort) {
          monthNamesShort = lang[item].monthNamesShort;
        }
      }
    }).done(function () {
      $this
        .datepicker({
          firstDay: 1,
          changeMonth: true,
          changeYear: true,
          yearRange: yearRange,
          minDate: minDate,
          maxDate: maxDate,
          showOn: 'button',
          dateFormat: template,
          buttonImage: img,
          buttonImageOnly: true,
          dayNames: dayNames,
          dayNamesShort: dayNamesShort,
          monthNames: monthNames,
          dayNamesMin: dayNamesMin,
          monthNamesShort: monthNamesShort,
          afterShow: function (inst) {
            $('.ui-datepicker-title select').styler();
          },
        })
        .click(function () {
          $(this).datepicker('show');
        });
    });
  });
}

// --- Пользовательское событие для для datepicker ---
$(function () {
  if ($('.date-picker').length) {
    $.datepicker._updateDatepicker_original = $.datepicker._updateDatepicker;
    $.datepicker._updateDatepicker = function (inst) {
      $.datepicker._updateDatepicker_original(inst);
      var afterShow = this._get(inst, 'afterShow');
      if (afterShow) afterShow.apply(inst.input ? inst.input[0] : null);
    };
  }
});

// --- Загрузка иконок стран в select ---
function selectLoadImages() {
  const inputCountrySelect = $('.input-country select');

  if (inputCountrySelect.length) {
    inputCountrySelect.each(function () {
      $(this)
        .find('option')
        .each(function () {
          if (!$(this).hasClass('no-mask')) {
            const inputCountryDiv = $(this).closest('.input-country');

            inputCountryDiv
              .find('.jq-selectbox__dropdown ul li')
              .eq($(this).index())
              .css('background-image', `url(" ${$(this).attr('data-img')} ")`);
            inputCountryDiv
              .find('.jq-selectbox__select-text')
              .css(
                'background-image',
                inputCountryDiv.find('.selected.sel').css('background-image')
              );
          }
        });
    });
  }
}

// --- Удаление выбранных файлов из input-file ---
let $inputFile = $('.required--file--multiple input[type="file"]'),
  $fileList = $('.input-file-list'),
  $input,
  object = {},
  i,
  j = 0;

function fileListcontroll() {
  $inputFile.styler({
    fileBrowse: '',
    filePlaceholder: '',
    fileNumber: '',
  });

  $inputFile.on('change', function (e) {
    $input = e.target;

    for (i = 0; i < $input.files.length; i++, j++) {
      $(
        '<p id="' + j + '">' + $input.files[i].name + '<span></span></p>'
      ).appendTo($fileList);
      object[j] = $input.files[i];
    }
    fileQuantity(object);
  });
}

// --- Подсчет количества выбранных файлов ---
function fileQuantity(object) {
  let length = $('.input-file-list p').length;
  if (
    Object.keys(object).length >
      $('.required--file--multiple').attr('data-max') ||
    Object.keys(object).length == 0
  ) {
    $('.required--file--multiple').removeClass('succes').addClass('error');
  } else {
    $('.required--file--multiple').removeClass('error').addClass('succes');
  }
}

// Сбор номера телефона код + номер
// Select
$(document).on('change', 'select.js-value', function () {
  const $thisBlock = $(this).closest('.js-phone'),
    $thisSelected = $(this).find(':selected'),
    $thisPlaceholder = $thisSelected.attr('data-placeholder'),
    $thisMask = $thisSelected.attr('data-value'),
    $thisInput = $thisBlock.find('input[data-mask]'),
    select = $thisBlock.find('select'),
    input = $thisBlock.find('.input--main'),
    result = $thisBlock.find('.input--hidden');

  $thisInput.val('');
  $thisBlock.removeClass('succes').addClass('error-online');

  $thisInput.inputmask('remove');

  if ($thisSelected.hasClass('no-mask')) {
    $thisBlock.removeClass('input--mask--required error error-online');
    $thisBlock.addClass('required--input num--inset');

    if ($thisBlock.hasClass('required')) {
      $thisBlock.addClass('required--input');
    }

    $thisInput.attr({
      placeholder: '_______',
      'data-mask': '',
      'data-placeholder': '',
    });

    result.val(input.val());
  } else {
    $thisBlock.removeClass('required--input num--inset');

    if ($thisBlock.hasClass('required')) {
      $thisBlock.addClass('input--mask--required');
    } else {
      $thisBlock.addClass('input--mask');
    }

    $thisInput.attr({
      placeholder: $thisPlaceholder,
      'data-mask': $thisMask,
      'data-placeholder': $thisPlaceholder,
    });
    inputMask();
    inputMaskRequired();
    result.val(select.val() + ' ' + input.val());
  }
});

// Input
$(document).on('input', 'input.js-value', function () {
  const block = $(this).closest('.js-phone'),
    select = block.find('select'),
    selected = block.find(':selected'),
    input = block.find('.input--main'),
    result = block.find('.input--hidden');

  selected.hasClass('no-mask')
    ? result.val(input.val())
    : result.val(select.val() + ' ' + input.val());
});

// --- Функция сабмита ---
function click_submit() {
  $('body').on('click', '.required--sbmt', function (e) {
    const $this = $(this),
      $thisForm = $this.closest('form');
    let Errorcount = 0;

    // --- Проверка полей с паролем
    let passwordRequired = $thisForm.find('.required--password');

    if (passwordRequired.length) {
      if (!passwordRequired.hasClass('succes')) {
        passwordRequired.addClass('error');
        Errorcount++;
      } else {
        passwordRequired.removeClass('error');
      }
    }

    // --- Проверка инпутов на пустоту ---
    const inputRequired = $thisForm.find('.required--input input');
    if (inputRequired.length) {
      inputRequired.each(function () {
        let $this = $(this),
          inputValue = $this.val(),
          wrapBlock = $this.closest('.required--input');

        if (inputValue == '') {
          wrapBlock.removeClass('succes').addClass('error');
          Errorcount++;
        } else if (
          !inputValue == '' &&
          wrapBlock.hasClass('error') &&
          !wrapBlock.hasClass('error-online')
        ) {
          wrapBlock.removeClass('error').addClass('succes');
        }
      });
    }

    // --- Проверка textarea на пустоту ---
    const inputTextarea = $thisForm.find('.required--textarea textarea');
    if (inputTextarea.length) {
      inputTextarea.each(function () {
        const $this = $(this),
          inputValue = $this.val(),
          wrapBlock = $this.closest('.required--textarea');

        if (inputValue == '') {
          wrapBlock.removeClass('succes').addClass('error');
          Errorcount++;
        } else if (
          !inputValue == '' &&
          wrapBlock.hasClass('error') &&
          !wrapBlock.hasClass('error-online')
        ) {
          wrapBlock.removeClass('error').addClass('succes');
        }
      });
    }

    // --- Проверка маски  ---
    const maskReq = $thisForm.find('.input--mask--required');
    maskReq.each(function () {
      let $thisValLength = $(this).find('input').val().length;
      let $thisMaskLength = $(this).find('input').attr('data-mask').length;

      if ($thisValLength != $thisMaskLength) {
        if (!$(this).hasClass('succes')) {
          $(this).removeClass('succes').addClass('error');
          Errorcount++;
        }
      }
    });

    // --- Проверка маски  ---
    const maskReqTemp = $thisForm.find('.mask-input-control');
    maskReqTemp.each(function () {
      if ($(this).hasClass('error') || $(this).hasClass('error-online')) {
        Errorcount++;
      }
    });

    // --- Проверка поля с email ---
    const emailRequired = $thisForm.find('.required--email input');
    if (emailRequired.length) {
      emailRequired.each(function () {
        const $this = $(this),
          inputValue = $this.val(),
          wrapBlock = $this.closest('.required--email');

        if (
          inputValue.length >= 0 &&
          (
            inputValue.match(/.+?\@.+[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}/g) ||
            []
          ).length !== 1
        ) {
          wrapBlock.removeClass('succes').addClass('error');
          Errorcount++;
        } else if (inputValue == '') {
          wrapBlock.removeClass('succes').addClass('error');
          Errorcount++;
        } else if (
          !inputValue == '' &&
          wrapBlock.hasClass('error') &&
          !wrapBlock.hasClass('error-online')
        ) {
          wrapBlock.removeClass('error').addClass('succes');
        }
      });
    }

    // --- Проверка поля с Url ---
    const urlRequired = $thisForm.find('.required--url input');
    if (urlRequired.length) {
      urlRequired.each(function () {
        const $this = $(this),
          inputValue = $this.val(),
          wrapBlock = $this.closest('.required--url');

        if (
          inputValue.length >= 0 &&
          (
            inputValue.match(
              /^((https?|ftp)\:\/\/)?([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z]{2,6})(\/?)$/g
            ) || []
          ).length !== 1
        ) {
          wrapBlock.removeClass('succes').addClass('error');
          Errorcount++;
        } else if (inputValue == '') {
          wrapBlock.removeClass('succes').addClass('error');
          Errorcount++;
        } else if (
          !inputValue == '' &&
          wrapBlock.hasClass('error') &&
          !wrapBlock.hasClass('error-online')
        ) {
          wrapBlock.removeClass('error').addClass('succes');
        }
      });
    }

    // --- Проверка одиночного чекбокса ---
    const checkRequired = $thisForm.find('.required--check');
    if (checkRequired.length) {
      let checked = 0;

      checkRequired.each(function () {
        $(this)
          .find(':checkbox')
          .each(function () {
            if ($(this).prop('checked')) {
              checked++;
            }
          });
        if (checked > 0) {
          $(this).removeClass('error');
        } else {
          $(this).addClass('error');
          Errorcount++;
        }
      });
    }

    // --- Проверка нескольких чекбоксов ---
    const checkMore = $thisForm.find('.check-more');
    if (checkMore.length) {
      let checked = 0;

      checkMore.each(function () {
        $(this)
          .find(':checkbox')
          .each(function () {
            if ($(this).prop('checked')) {
              checked++;
            }
          });
        if (checked != 0) {
          $(this).removeClass('error');
        } else {
          $(this).addClass('error');
          Errorcount++;
        }
      });
    }

    // --- Проверка радиобатона ---
    const radioReq = $thisForm.find('.radio--required');
    if (radioReq.length) {
      let checked = 0;

      radioReq.each(function () {
        $(this)
          .find(':radio')
          .each(function () {
            if ($(this).prop('checked')) {
              checked++;
            }
          });
        if (checked > 0) {
          $(this).removeClass('error error-online').addClass('succes');
        } else {
          $(this).removeClass('succes').addClass('error');
          Errorcount++;
        }
      });
    }

    // --- Проверка селекта ---
    const selectReq = $thisForm.find('.required--select');
    if (selectReq.length) {
      selectReq.each(function () {
        const sel = $(this).find('select :selected'),
          wrapBlock = sel.closest('.required--select');

        if (sel.val() === 'Not selected') {
          wrapBlock.removeClass('succes').addClass('error');
          Errorcount++;
        } else {
          wrapBlock.removeClass('error').addClass('succes');
        }
      });
    }

    // --- Проверка файла (одниночный) ---
    const fileReq = $thisForm.find('.required--file');
    if (fileReq.length) {
      fileReq.each(function () {
        const file = $(this).find('input'),
          wrapBlock = file.closest('.required--file');

        if (file.val() == '') {
          wrapBlock.removeClass('succes').addClass('error');
          Errorcount++;
        } else {
          wrapBlock.removeClass('error').addClass('succes');
        }
      });
    }

    // --- Проверка файла (multiple) ---
    const fileReqMultiple = $thisForm.find('.required--file--multiple');
    if (fileReqMultiple.length) {
      fileReqMultiple.each(function () {
        const files = $(this).find('.input-file-list p'),
          maxLength = $(this).attr('data-max'),
          wrapBlock = $(this).closest('.required--file--multiple');

        if (files.length == '' || files.length > maxLength) {
          wrapBlock.removeClass('succes').addClass('error');
          Errorcount++;
        } else {
          wrapBlock.removeClass('error').addClass('succes');
        }
      });
    }

    // --- Проверка date-picker ---
    const dataPicker = $thisForm.find('.required--date');
    dataPicker.each(function () {
      const val = $(this).find('input').val(),
        $thisDate = $(this).closest('.required--date');

      if (val == '') {
        $thisDate.removeClass('succes').addClass('error');
        Errorcount++;
      } else if (
        !val == '' &&
        $thisDate.hasClass('error') &&
        !$thisDate.hasClass('error-online')
      ) {
        $thisDate.removeClass('error error-online').addClass('succes');
      }
    });

    // --- Вывод ошибки вверху ---
    popupForm_error($thisForm, Errorcount);

    console.log(Errorcount);

    // --- Отпралять или нет ---
    if (Errorcount > 0) {
      return false;
    }
  });
}

// --- Функция общая функция для keyUp ---
function keyup_form() {
  num_inset();
  letter_inset();
  required_email();
  required_input();
  required_textarea();
  required_date();
  first_password();
  second_password();
  inputMask();
  inputMaskRequired();
  maskInputControl();
  radioChange();
  selectChange();
  checkChange();
  checkMoreChange();
  fileChange();
  emailInputControl();
  required_url();
}

// ------ Function's end ------
