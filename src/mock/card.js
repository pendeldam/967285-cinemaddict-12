import {FILM_NAMES, FILM_GENRES, FILM_DESCRIPTION, FILM_DIRECTORS, FILM_ACTORS, FILM_COUNTRIES, FILM_AGE_RATING} from '../const.js';
import {getRandomIntegerNumber, getRandomArrayItem, getRandomArray} from '../utils.js';

const getFilmName = (name) => {
  return name
    .split(`-`)
    .map((word) => {
      return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
    })
    .join(` `);
};

const getFilmWriters = () => getRandomArrayItem(FILM_DIRECTORS);

const getFilmActors = () => getRandomArrayItem(FILM_ACTORS);

const getFilmGenre = () => getRandomArrayItem(FILM_GENRES);

const getRandomText = () => getRandomArrayItem(FILM_DESCRIPTION.split(`.`));

const getRandomDate = () => {
  const day = getRandomIntegerNumber(1, 31);
  const month = getRandomIntegerNumber(0, 12);
  const year = getRandomIntegerNumber(1930, 2000);
  const date = new Date(year, month, day);

  return date;
};

export const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map((card, index) => {
      const poster = getRandomArrayItem(FILM_NAMES);
      const getRating = (min, max) => String(Math.random() * (max - min) + min).substring(0, 3);
      const date = getRandomDate();

      card = {
        id: index,
        poster,
        filmRating: +getRating(5, 10),
        name: getFilmName(poster),
        nameOriginal: `Original: ${getFilmName(poster)}`,
        director: getRandomArrayItem(FILM_DIRECTORS),
        writers: getRandomArray(getRandomIntegerNumber(1, 2), getFilmWriters),
        actors: getRandomArray(getRandomIntegerNumber(2, 5), getFilmActors),
        release: date.toLocaleString(`en-GB`, {day: `numeric`, month: `long`, year: `numeric`}),
        year: date.getFullYear(),
        duration: getRandomIntegerNumber(30, 300),
        country: getRandomArrayItem(FILM_COUNTRIES),
        ageRating: getRandomArrayItem(FILM_AGE_RATING),
        genre: getRandomArray(getRandomIntegerNumber(1, 3), getFilmGenre),
        description: getRandomArray(getRandomIntegerNumber(3, 5), getRandomText).join(`\n`),
        comments: getRandomIntegerNumber(0, 10),
        isWatchLater: Math.random() > 0.5 ? true : false,
        isWatchedAlready: Math.random() > 0.5 ? true : false,
        isFavorite: Math.random() > 0.5 ? true : false
      };

      return card;
    });
};
