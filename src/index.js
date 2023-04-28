import './css/styles.css';

const DEBOUNCE_DELAY = 300;
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  const nameOfCountry = event.target.value.trim();
  if (!nameOfCountry) {
    list.innerHTML = '';
    info.innerHTML = '';
  }
  fetchCountries(nameOfCountry)
    .then(data => choisOneOfArray(data))
    .catch(error => console.log(error));
}

function choisOneOfArray(listOfcountries) {
  if (listOfcountries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (listOfcountries.length <= 5) {
    console.log(listOfcountries);
  } else if (listOfcountries.length === 1) {
    console.log(listOfcountries);
  }
}

console.log(input);
console.log(list);
console.log(info);
