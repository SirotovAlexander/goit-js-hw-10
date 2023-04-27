const END_POINT = 'https://restcountries.com/v3.1/all?fields=';
const KEY_VALUES = 'name,capital,population,flags,languages';

function fetchCountries() {
  const URL = `${END_POINT}${KEY_VALUES}`;
  return fetch(URL).then(resp => {
    console.log(URL);
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

fetchCountries()
  .then(data => console.log(data))
  .catch(error => console.log(error));

export { fetchCountries };
