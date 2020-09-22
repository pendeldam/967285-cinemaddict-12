import {formatDuration, formatTime} from '../utils.js';

const createFilmDetailsMarkup = (details) => {
  return Object.entries(details)
    .map(([key, value]) => {
      if (key === `Genres`) {
        return (
          `<tr class="film-details__row">
            <td class="film-details__term">${key}</td>
            <td class="film-details__cell">
              ${value.map((item) => `<span class="film-details__genre">${item}</span>`).join(`\n`)}
            </td>
        </tr>`
        );
      }
      return (
        `<tr class="film-details__row">
          <td class="film-details__term">${key}</td>
          <td class="film-details__cell">${value instanceof Array ? value.join(`, `) : value}</td>
        </tr>`
      );
    })
    .join(`\n`);
};

const createFilmControlsMarkup = (controls) => {
  return Object.entries(controls)
    .map(([key, value]) => {
      return (
        `<input type="checkbox" class="film-details__control-input visually-hidden" id="${key}" name="${key}">
        <label for="${key}" class="film-details__control-label film-details__control-label--${key}">${value}</label>`
      );
    })
    .join(`\n`);
};

const createCommentsMarkup = (comments, commentsModel) => {
  return comments.map((it) => {
    const comment = commentsModel[it];

    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${comment.text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${formatTime(comment.date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    );
  }).join(`\n`);
};

export const createFilmCardFullMarkup = (card, commentsModel) => {
  const {poster, filmRating, name, nameOriginal, director, writers, actors, release, country, duration, genre, ageRating, description, comments} = card;

  const filmDetails = {
    Director: director,
    Writers: writers,
    Actors: actors,
    [`Release Date`]: release,
    Runtime: formatDuration(duration),
    Country: country,
    Genres: genre
  };

  const filmControls = {
    watchlist: `Add to watchlist`,
    watched: `Already watched`,
    favorite: `Add to favorites`
  };

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}.jpg" alt="${name}">

            <p class="film-details__age">${ageRating}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${name}</h3>
                <p class="film-details__title-original">${nameOriginal}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${filmRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              ${createFilmDetailsMarkup(filmDetails)}
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          ${createFilmControlsMarkup(filmControls)}
        </section>
      </div>

      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${createCommentsMarkup(comments, commentsModel)}
          </ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`
  );
};
