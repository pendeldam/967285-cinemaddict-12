export const createFilmsExtraMarkup = (type) => {
  const title = type === `Top rated`
    ? `<h2 class="films-list__title">Top rated</h2>`
    : `<h2 class="films-list__title">Most commented</h2>`;

  const id = type.toLowerCase().split(` `).join(`-`);

  return (
    `<section class="films-list--extra">
      ${title}
      <div class="films-list__container" id="extra-${id}"></div>
    </section>`
  );
};
