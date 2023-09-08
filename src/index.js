import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

// ? вішаємо лісенера на select
refs.select.addEventListener('change', selectHandler);

// ? анімація загрузки з notiflix-loading
Loading.hourglass('Loading...');

refs.select.innerHTML = `<option disabled selected>Select a breed...</option>`;

fetchBreeds()
  .then(data => {
    const breedList = data.map(breed => {
      return { name: breed.name, id: breed.id };
    });
    return breedList;
  })
  .then(breedList => {
    refs.select.insertAdjacentHTML(
      'beforeend',
      selectMarkup(breedList).join('')
    );
  })
  .catch(err => {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
    refs.error.classList.remove('visually-hidden');
    refs.loader.classList.remove('visually-hidden');

    console.log(err);
  })
  .finally(data => {
    refs.select.style.display = 'block';
    Loading.remove();
  });

function selectHandler(evt) {
  Loading.hourglass('Loading');
  fetchCatByBreed(evt.currentTarget.value)
    .then(data => {
      Loading.hourglass('Loading');
      refs.catInfo.innerHTML = infoMarkup(data);
    })
    .catch(err => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      console.log(err);
    })
    .finally(data => Loading.remove());
}

function selectMarkup(arr) {
  return arr.map(({ name, id }) => `<option value="${id}">${name}</option>`);
}

function infoMarkup(breed) {
  const { name, description, temperament } = breed[0].breeds[0];
  const imgUrl = breed[0].url;
  const markup = `
  <div class="img-container">
    <img src="${imgUrl}" alt="${name}" width="600" preload="lazy">
  </div>
  <div class="cat-text">      
    <h1>${name}</h1>
    <h2>${temperament}</h2>
    <p>${description}</p>
  </div>`;
  return markup;
}
