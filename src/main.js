import {createProfileRatingMarkup} from './view/profile.js';
import {createSiteMenuMarkup} from './view/site-menu.js';
import {createSortMarkup} from './view/sort.js';
import {createFilmsListMarkup} from './view/films-list.js';
import {createFilmCardMarkup} from './view/card.js';
import {createFilmDetailsMarkup} from './view/detail.js';
import {createShowMoreBtn} from './view/show-more-button.js';
import {createFilmsExtraMarkup} from './view/extra.js';
import {createFilmsCountMarkup} from './view/count.js';

const FILMS_COUNT = 5;
const mainEl = document.querySelector(`.main`);
const footerEl = document.querySelector(`.footer__statistics`);

const render = (container, element, location) => {
  container.insertAdjacentHTML(location, element);
};

render(document.querySelector(`.header`), createProfileRatingMarkup(), `beforeend`);
render(mainEl, createSiteMenuMarkup(), `beforeend`);
render(mainEl, createSortMarkup(), `beforeend`);
render(mainEl, createFilmsListMarkup(), `beforeend`);

const filmListEl = mainEl.querySelector(`.films-list__container`);

for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmListEl, createFilmCardMarkup(), `beforeend`);
}

render(filmListEl, createShowMoreBtn(), `afterend`);
render(mainEl.querySelector(`.films-list`), createFilmsExtraMarkup(), `afterend`);

const filmsExtraEl = mainEl.querySelector(`.films-list--extra`);

render(filmsExtraEl.querySelector(`.films-list__container`), createFilmCardMarkup(), `beforeend`);
render(footerEl, createFilmsCountMarkup(), `beforeend`);
