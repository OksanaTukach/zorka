var office = [
    {
        "name" : 'г. Минск, ул. Козлова, 35, пом. 1н (только скупка золота)',
        "coord": [53.903756, 27.553867],
    },
    {
        "name" : 'г. Минск, ул. Козлова, 35, пом. 1н (только скупка золота)',
        "coord": [53.901268, 27.551465],
    },
    {
        "name" : 'г. Минск, ул. Козлова, 35, пом. 1н (только скупка золота)',
        "coord": [53.904013, 27.598833],
    },
    {
        "name" : 'г. Гомель, ул. Козлова, 35, пом. 1н (только скупка золота)',
        "coord": [52.425968, 31.013861],
    },
    {
        "name" : 'г. Гомель, ул. Козлова, 35, пом. 1н (только скупка золота)',
        "coord": [52.432002, 31.009355],
    },
    {
        "name" : 'г. Могилев, ул. Козлова, 35, пом. 1н (только скупка золота)',
        "coord": [53.905703, 30.339066],
    },
    {
        "name" : 'г. Могилев, ул. Козлова, 35, пом. 1н (только скупка золота)',
        "coord": [53.909491, 30.336233],
    },



];

$(document).ready(function () {
    const width = $(window).width();
    const height = $(window).height();


    function initMap() {
        let centerMap = [53.901268, 27.551465];
        const myMap = new ymaps.Map("skupka-map", {
            center: centerMap,
            zoom: 13,
            controls: ["zoomControl", "fullscreenControl"]
        });

        $('body').on('click', '.js-to-map[data-to-obj]', function (e) {
             e.preventDefault();
            let coord = $(this).attr('data-to-obj');
            
            coord = coord.split(',');
            myMap.panTo([parseFloat(coord[0]), parseFloat(coord[1])], {});
        });
        let myCollection = new ymaps.GeoObjectCollection()
        addMarkers(myCollection)
        myMap.geoObjects.add(myCollection)

    }
    ymaps.ready(initMap);
});


const addMarkers = (myCollection) => {

    for (var i = 0; i < actualObj.length; i++) {
        var name = office[i].name;
        var coord = office[i].coord;
        myCollection.add(new ymaps.Placemark([parseFloat(coord[0]), parseFloat(coord[1])], {
            hintContent: name,
        }, {
            iconLayout: 'default#image',
            iconImageHref: './img/svg/marker.svg',
            iconImageSize: [50, 60],
            iconImageOffset: [-25, -30]
        }));
    }

}