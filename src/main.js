import {createProfileRatingMarkup} from './view/profile.js';
import {createFiltersMarkup} from './view/filter.js';
import {createSortMarkup} from './view/sort.js';
import {createFilmsListMarkup} from './view/films-list.js';
import {createFilmCardMarkup} from './view/card.js';
import {createFilmCardFullMarkup} from './view/card-full.js';
import {createShowMoreBtn} from './view/show-more-button.js';
import {createFilmsExtraMarkup} from './view/extra.js';
import {createFilmsCountMarkup} from './view/count.js';
import {generateCards} from './mock/card.js';
import {getRandomIntegerNumber} from './utils.js';

const FILMS_COUNT = 5;
const cards = generateCards(FILMS_COUNT);
const mainEl = document.querySelector(`.main`);
const footerEl = document.querySelector(`.footer__statistics`);

const render = (container, element, location) => {
  container.insertAdjacentHTML(location, element);
};

render(document.querySelector(`.header`), createProfileRatingMarkup(), `beforeend`);
render(mainEl, createFiltersMarkup(cards), `beforeend`);
render(mainEl, createSortMarkup(), `beforeend`);
render(mainEl, createFilmsListMarkup(), `beforeend`);

const filmListEl = mainEl.querySelector(`.films-list__container`);
cards.forEach((card) => render(filmListEl, createFilmCardMarkup(card), `beforeend`));

render(filmListEl, createShowMoreBtn(), `afterend`);

const getExtras = (films, type) => {
  const sortByType = films.sort((a, b) => b[type] - a[type]);
  const allEqual = films.filter((film) => film[type] === sortByType[0][type]);

  if (allEqual.length === films.length) {
    if (allEqual[0][type] === 0) {
      return false;
    }

    let result = [];

    if (allEqual.length > 1) {
      result.push(films[getRandomIntegerNumber(0, films.length)]);
      result.push(films.find((film) => film.id !== result[0].id));
      return result;
    }
    return films;
  }

  return sortByType.slice(0, 2);
};

const renderExtras = (array, type) => {
  render(mainEl.querySelector(`.films`), createFilmsExtraMarkup(type), `beforeend`);

  const id = type.toLowerCase().split(` `).join(`-`);

  array.forEach((it) => {
    render(mainEl.querySelector(`#extra-${id}`), createFilmCardMarkup(it), `beforeend`);
  });
};

const topRated = getExtras(cards, `rating`);
const topComments = getExtras(cards, `comments`);

if (topRated.length) {
  renderExtras(topRated, `Top rated`);
}

if (topComments.length) {
  renderExtras(topComments, `Most commented`);
}

render(footerEl, createFilmsCountMarkup(cards.length), `beforeend`);
render(footerEl, createFilmCardFullMarkup(cards[0]), `afterend`);
