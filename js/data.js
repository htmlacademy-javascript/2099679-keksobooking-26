import { getRandomPositiveFloat, getRandomPositiveInteger, getRandomElement, getNewList } from './util.js';

const COUNT_OF_AD = 10;
const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const CHECKIN_CHECKOUT = ['12:00', '13:00', '14:00'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const getIncrement = () => {
  let a = 0;
  return () => {
    ++a;
    return (a < 10) ? `0${a}` : a;
  };
};

const getIndexOfAvatar = getIncrement();      // создаем индекс аватара

const getAuthor = () =>
  ({                                               // создаем аватар
    avatar: `img/avatars/user${getIndexOfAvatar()}.png`,
  });

const getLocation = () =>                  // создаем координаты локации
  ({
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5)
  });

const getOffer = (location) =>
  ({                                              // создаем предложение
    title: 'Best offer',
    adress: `${location.lat}, ${location.lng}`,
    price: getRandomPositiveInteger(10000, 25000),
    type: getRandomElement(TYPE),
    rooms: getRandomPositiveInteger(1, 4),
    guests: getRandomPositiveInteger(1, 4),
    checkin: getRandomElement(CHECKIN_CHECKOUT),
    checkout: getRandomElement(CHECKIN_CHECKOUT),
    features: getNewList(FEATURES),
    description: 'clean, comfortable, safe',
    photos: getNewList(PHOTOS)
  });

const getAd = () => {                            // создаем объявление
  const location = getLocation();
  return {
    author: getAuthor(),
    location,
    offer: getOffer(location)
  };
};

const getListAd = () => Array.from({length: COUNT_OF_AD}, getAd);

export { getListAd };
