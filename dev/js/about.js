$(document).ready(function(){ 
    const width = $(window).width();


    stageSlider(width)
    // stageScaleSl.on('init', function(event, slick){
    //
    //
    // });

    // tabs
	var tab = 0;
	$('body').on('click', '.js-stage-scale .js-stage-scale-el', function () {
		tab = $(this).attr('data-tab');
		let tabBody = $(this).closest('.js-stage-scale').siblings('.js-stage-content').find('.js-stage-content-el[data-tab="' + tab + '"]');
        if (width >= 601) {
            $(this).closest('.slick-track').find('._active').removeClass('_active');
        } else {
            $(this).siblings('._active').removeClass('_active');
        }
        
        $(this).addClass('_active')
        tabBody.addClass('_active').siblings('._active').removeClass('_active')
	
	});

})


const stageSlider = (width) => {
    const stageScaleSl = $('.js-stage-scale')
    const stageScaleSliderActive = stageScaleSl.find('.js-stage-scale-el._active')
    const stageScaleSliderActiveIndex = stageScaleSliderActive.attr('data-tab') - 1
    const stageScaleSliderActiveOffset = stageScaleSliderActive.offset()

    if(width > 600){
        stageScaleSl.slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            focusOnSelect: true,
            arrows: true,
            infinite: false,
            initialSlide: stageScaleSliderActiveIndex,
            responsive: [
                {
                    breakpoint: 1180,
                    settings: {
                        slidesToShow: 5,
                    }
                },
                {
                    breakpoint: 601,
                    settings: 'unslick'
                },
            ]
        });

        setTimeout(() => {
            stageScaleSl.slick('refresh')
        }, 0)
    }
    else{
        stageScaleSl.animate({scrollLeft:stageScaleSliderActiveOffset.left}, '500');
    }

}



