import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_biagS9jDfEE5BBK9koR7YnF83XsxbY7j8p4BoxKYjBHHAPGhU90hxK9BRcotDJfM';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_biagS9jDfEE5BBK9koR7YnF83XsxbY7j8p4BoxKYjBHHAPGhU90hxK9BRcotDJfM';

const options = {
  method: 'GET',
  headers: { 'x-api-key': API_KEY },
};

function fetchBreeds() {
  const END_POINT = '/breeds';
  return fetch(`${BASE_URL}${END_POINT}`, options).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  const END_POINT = '/images/search';
  return fetch(`${BASE_URL}${END_POINT}?breed_ids=${breedId}`, options).then(
    response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }
  );
}

export { fetchBreeds, fetchCatByBreed };
