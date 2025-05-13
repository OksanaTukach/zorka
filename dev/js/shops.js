var office = [
    {
        "name" : 'г. Минск. ТРЦ «Palazzo» Ювелирные украшения «Мономах», ул. Тимирязева, 74А.',
        "coord": [53.927035, 27.509855],
    },
    {
        "name" : 'г. Минск. ТРЦ «МОМО» Ювелирные украшения «Мономах», пр. Партизанский, 150А.',
        "coord": [53.859626, 27.674031],
    },
    {
        "name" : 'г. Минск. «Ювелирный центр» Ювелирные украшения «Мономах», ул. Кропоткина, 72',
        "coord": [53.918386, 27.557789],
    },
    {
        "name" : 'г. Минск. Ювелирные украшения «Мономах», ул. Куйбышева, 69',
        "coord": [53.920745, 27.576069],
    },
    {
        "name" : 'г. Минск. ТРЦ «DanaMall» Ювелирные украшения «Мономах», ул. Петра Мстиславца, 11',
        "coord": [53.933553, 27.651699],
    },
    {
        "name" : 'г. Минск. ТРЦ «Титан» Ювелирные украшения «Мономах», пр. Дзержинского, 104',
        "coord": [53.861872, 27.480399],
    },
    {
        "name" : 'г. Минск. ТРЦ «GreenCity» Ювелирные украшения «Мономах», ул. Притыцкого, 156',
        "coord": [53.908885, 27.432442],
    },
    {
        "name" : 'г. Минск. «ЦУМ Минск». Адрес: пр. Независимости, 54',
        "coord": [53.916313, 27.585861],
    },
    {
        "name" : 'г. Минск. «ГУМ». Адрес: пр. Независимости, 21',
        "coord": [53.900496, 27.557959],
    },{
        "name" : 'г. Минск, Торговый дом «На Немиге». Адрес: ул. Немига, 8',
        "coord": [53.903622, 27.550640],
    },
    {
        "name" : 'г. Минск, Универмаг «Беларусь». Адрес: ул. Жилуновича, 4',
        "coord": [53.869624, 27.629196],
    },
    {
        "name" : 'г. Минск, «Кирмаш». Адрес: пр. Дзержинского,100',
        "coord": [53.863592, 27.482815],
    },
    {
        "name" : 'г. Минск, «Кирмаш». Адрес: ул. Веры Хоружей, 21',
        "coord": [53.920725, 27.568775],
    },
];

$(document).ready(function () {
    const width = $(window).width();
    const height = $(window).height();

    function initMap() {
        var myCollection, myMap;

        myMap = new ymaps.Map("shops-map", {
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