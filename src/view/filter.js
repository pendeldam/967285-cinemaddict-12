export const createFiltersMarkup = (films) => {
  const filters = {
    Watchlist: films.filter((film) => film.isWatchLater).length,
    History: films.filter((film) => film.isWatchedAlready).length,
    Favorites: films.filter((film) => film.isFavorite).length
  };

  const filterMarkup = Object.entries(filters)
    .map(([name, count]) => {
      return (
        `<a href="#${name.toLowerCase()}" class="main-navigation__item">${name}
           <span class="main-navigation__item-count">${count > 5 ? `` : count}</span>
        </a>`
      );
    })
    .join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filterMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};
