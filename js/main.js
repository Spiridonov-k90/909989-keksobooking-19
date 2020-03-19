'use strict';

var TOTAL_OFFERS = 8; // Число предложений

var getAds = function () {
  /* Данные для заполнения предложений*/
  var allOffersUsers = [];
  var typeOffers = ['palace', 'flat', 'house', 'bungalo']; // Тип предложения
  var checkOffers = ['12:00', '13:00', '14:00']; // Время заезда/выезда
  var featuresOffers = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; // Опции жилья
  var photosOffers = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var priceOffers = [1000, 2000, 3000, 4000, 5000];
  var maxGuests = 3;
  var maxRoom = 3;
  var street = ['Ломоносова', 'Пушкина', 'Плеханова', 'Герцена', 'Крестовая', 'Гагарина', 'Фурманова', 'Блюхера'];
  var titleOffers = ['Сдается ', 'Продается '];
  var descriptionOffers = ['А Б В', 'Г Д Е', 'Ж З И', 'К Л М', 'Н П Р', 'С Т У'];


  /* Функция случайного выбора из массива*/
  var getRandomNumberArray = function (optionOffers) {
    var randomNumberArray = Math.floor(Math.random() * optionOffers.length);
    return randomNumberArray;
  };
  /* Функция случайного выбора из чисел*/
  var getRandomNumber = function (optionOffers) {
    var randomNumber = Math.round(Math.random() * optionOffers);
    return randomNumber;
  };
  /* Функция заполнения раздела предложения*/
  var getContentOffers = function (optionOffers) {
    var list = [];
    var randomNumber = Math.floor(Math.random() * optionOffers.length + 1);
    for (var j = 0; j < randomNumber; j++) {
      var index = Math.floor(Math.random() * optionOffers.length);
      list.push(optionOffers[index]);
    }
    return list;
  };

  /* Функция определения координаты X и Y*/
  var getСoordinate = function () {
    var posirionMarker = Math.floor(Math.random() * 630);
    if (posirionMarker < 130) {
      posirionMarker = 130;
    }
    return posirionMarker;
  };

  /* Формирование предложений*/
  for (var i = 0; i < TOTAL_OFFERS; i++) {
    allOffersUsers[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: titleOffers[getRandomNumberArray(titleOffers)],
        address: 'Улица ' + street[getRandomNumberArray(street)],
        price: priceOffers[getRandomNumberArray(priceOffers)],
        type: typeOffers[getRandomNumberArray(typeOffers)],
        rooms: getRandomNumber(maxGuests),
        guests: getRandomNumber(maxRoom),
        checkin: checkOffers[getRandomNumberArray(checkOffers)],
        checkout: checkOffers[getRandomNumberArray(checkOffers)],
        features: getContentOffers(featuresOffers),
        description: descriptionOffers[getRandomNumberArray(descriptionOffers)],
        photos: getContentOffers(photosOffers)
      },
      location: {
        x: getСoordinate(),
        y: getСoordinate()
      }
    };
    allOffersUsers[i].offer.title += allOffersUsers[i].offer.type;
  }
  return allOffersUsers;
};
var allOffersUsers = getAds();
// console.log(allOffersUsers);

/* Переключение карты из неактивного состояния в активное */
var map = document.querySelector('.map');
map.classList.remove('map--faded');

/* Создание DOM-элементов*/
var getElement = (function () {
  var mapPin = document.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var template = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < allOffersUsers.length; i++) {
    var element = template.cloneNode(true);
    var img = element.children[0];
    img.src = allOffersUsers[i].author.avatar;
    img.alt = allOffersUsers[i].offer.title;
    element.style = 'left: ' + allOffersUsers[i].location.x + 'px; top: ' + allOffersUsers[i].location.y + 'px;';
    var newElement = fragment.appendChild(element);
  }
  mapPins.appendChild(fragment);
}());
