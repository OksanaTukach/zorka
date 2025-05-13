var office = [
    {
        "name" : '',
        "coord": [53.826141, 27.707475],
    },
];

$(document).ready(function () {
    const width = $(window).width();
    const height = $(window).height();

    function initMap() {
        var myCollection, myMap;

        myMap = new ymaps.Map("contact-map", {
            center: [53.826141, 27.707475],
            zoom: 12,
            controls: ["zoomControl", "fullscreenControl"]
        });

        myCollection = new ymaps.GeoObjectCollection();

        //Клик на показ магазина

        for (var i = 0; i < office.length; i++) {
            var name = office[i].name;
            var coord = office[i].coord;

            myCollection.add(new ymaps.Placemark([parseFloat(coord[0]), parseFloat(coord[1])], {
                hintContent: name,
            }, {
                iconLayout: 'default#image',
                iconImageHref: './img/svg/marker.svg',
                iconImageSize: [40, 55],
                iconImageOffset: [-20, -55]
            }));
        }
        myMap.geoObjects.add(myCollection);
        myMap.behaviors.disable(['scrollZoom', 'rightMouseButtonMagnifier']);
    }
    ymaps.ready(initMap);
});