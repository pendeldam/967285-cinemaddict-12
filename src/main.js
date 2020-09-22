import {createProfileRatingMarkup} from './view/profile.js';
import {createFiltersMarkup} from './view/filter.js';
import {createSortMarkup} from './view/sort.js';
import {createFilmsListMarkup} from './view/films-list.js';
import {createFilmCardMarkup} from './view/card.js';
import {createFilmCardFullMarkup} from './view/card-full.js';
import {createShowMoreBtn} from './view/show-more-button.js';
import {createFilmsExtraMarkup} from './view/extra.js';
import {createFilmsCountMarkup} from './view/count.js';
import {cards, comments} from './mock/card.js';
import {getRandomIntegerNumber} from './utils.js';

const mainEl = document.querySelector(`.main`);
const footerEl = document.querySelector(`.footer__statistics`);

console.log(cards);
console.log(comments);

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
  const sortedByType = type === `comments`
    ? films.sort((a, b) => b[type].length - a[type].length)
    : films.sort((a, b) => b[type] - a[type]);

  const allEqualed = films.filter((film) => film[type] === sortedByType[0][type]);

  if (allEqualed.length === films.length) {
    if (allEqualed[0][type] === 0) {
      return false;
    }

    let result = [];

    if (allEqualed.length > 2) {
      result.push(films[getRandomIntegerNumber(0, films.length)]);
      result.push(films.find((film) => film.id !== result[0].id));
      return result;
    }
    return films;
  }

  return sortedByType.slice(0, 2);
};

const renderExtras = (array, type) => {
  render(mainEl.querySelector(`.films`), createFilmsExtraMarkup(type), `beforeend`);

  const id = type.toLowerCase().split(` `).join(`-`);

  array.forEach((it) => {
    render(mainEl.querySelector(`#extra-${id}`), createFilmCardMarkup(it), `beforeend`);
  });
};

const topRated = getExtras(cards, `filmRating`);
const topComments = getExtras(cards, `comments`);

if (topRated.length) {
  renderExtras(topRated, `Top rated`);
}

if (topComments.length) {
  renderExtras(topComments, `Most commented`);
}

render(footerEl, createFilmsCountMarkup(cards.length), `beforeend`);
render(footerEl, createFilmCardFullMarkup(cards[0], comments), `afterend`);
