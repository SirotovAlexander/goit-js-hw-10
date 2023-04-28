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

  fetchCountries(nameOfCountry)
    .then(data => choisOneOfArray(data))
    .catch(error => {
      console.log(error);
      list.innerHTML = '';
      info.innerHTML = '';
      Notiflix.Notify.failure('Oops, there is no country with that name');
      return;
    });
}

function choisOneOfArray(listOfcountries) {
  if (listOfcountries.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (listOfcountries.length > 1) {
    info.innerHTML = '';
    const markup = listOfcountries
      .map(country => {
        return `<li class='list_box'><img class='list_img' src="${country.flags.svg}" alt="flag">${country.name.official}</li>`;
      })
      .join('');
    list.innerHTML = markup;
  } else if (listOfcountries.length === 1) {
    list.innerHTML = '';

    const markup = listOfcountries
      .map(country => {
        return `<div class='info_wrapper'>
      <img class='list_img' src="${country.flags.svg}" alt="flag">
      <h2>${country.name.common}</h2></div>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)}</p>`;
      })
      .join('');
    info.innerHTML = markup;
  }
}
