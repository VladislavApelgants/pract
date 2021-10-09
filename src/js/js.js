import _debounce from 'debounce';
import genres from './genr';
import cardHbs from '../hbs/card.hbs';
import validator from 'validator';
import serviceApi from './api.js';

const refs = {
  list: document.querySelector('.list'),
  input: document.querySelector('.search'),
  notifyEr: document.querySelector('#message-error'),
};

const { list, input, notifyEr } = refs;

input.addEventListener(
  'input',
  _debounce(e => {
    const queryValue = e.target.value.trim(' ');
    const validateQueryValue = validator.isEmpty(queryValue);
    notifyEr.classList.add('hide');
    list.innerHTML = ' ';
    //  проверка валидаторм, если ОК вызываем функцию отрисовки
    if (!validateQueryValue) {
      render(queryValue);
    }
  }, 300),
);

const mapGenre = genreId => {
  const foundGenre = genres.find(genre => genre.id === genreId);
  if (foundGenre) {
    return foundGenre.name;
  }
  return '';
};

const updateMovieGenres = movie => {
  if (!movie.genre_ids.length) {
    return { ...movie, mappedGenres: 'Other' };
  }

  if (movie.genre_ids.length <= 3) {
    return { ...movie, mappedGenres: movie.genre_ids.map(mapGenre).join(', ') };
  }

  return {
    ...movie,
    mappedGenres: movie.genre_ids.map(mapGenre).slice(0, 2).concat('Other').join(', '),
  };
};
console.log(genres);

function render(query) {
  //  берем данные с запроса
  serviceApi
    .fetchDataDb(query)
    .then(param => {
      //  берем массив фильмов
      const showArrayElement = param.results;
      if (showArrayElement.length == 0) {
        notifyEr.classList.remove('hide');
        list.innerHTML = ' ';
      }
      return showArrayElement;
    })
    .then(elem => {
      const mappedMovies = elem.map(updateMovieGenres);
      console.log('mappedMovies:', mappedMovies);
      // вызываем handlebars, передаём массив фильмов
      const render = cardHbs(mappedMovies);
      // отрисовываем массив фильмов
      list.insertAdjacentHTML('beforeend', render);
    });
}
