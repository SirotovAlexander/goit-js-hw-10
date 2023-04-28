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
  } else if (listOfcountries.length > 1) {
    console.log(listOfcountries);
    // createListOfCountries(listOfcountries);
    const markup = listOfcountries
      .map(country => {
        return `<li class='list_box'><img class='list_img' src="${country.flags.svg}" alt="flag">${country.name.official}</li>`;
      })
      .join('');
    list.innerHTML = markup;
  } else if (listOfcountries.length === 1) {
    console.log(listOfcountries);
    // createOneCountry(listOfcountries);
    const markup = listOfcountries
      .map(country => {
        return `<div>
      <img src="${country.flags.svg}" width="50" height="30" alt="flag of ${
          country.name.official
        }">
      <h2 class="country-title">${country.name.official}</h2></div>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)}</p>`;
      })
      .join('');
    info.innerHTML = markup;
  }
}

// function createListOfCountries(arrItem) {
//   const markup = arrItem
//     .map(country => {
//       return `<li class='list_box'><img class='list_img' src="${country.flags.svg}" alt="flag">${country.name.official}</li>`;
//     })
//     .join('');
//   list.innerHTML = markup;
// }

// function createOneCountry(arrItem) {
//   const markup = arrItem
//     .map(country => {
//       return `<div>
//       <img src="${country.flags.svg}" width="50" height="30" alt="flag of ${
//         country.name.official
//       }">
//       <h2 class="country-title">${country.name.official}</h2></div>
//             <p><b>Capital</b>: ${country.capital}</p>
//             <p><b>Population</b>: ${country.population}</p>
//             <p><b>Languages</b>: ${Object.values(country.languages)}</p>`;
//     })
//     .join('');
//   info.innerHTML = markup;
// }
