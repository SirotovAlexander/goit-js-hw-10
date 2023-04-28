const PARAMS = 'name,capital,population,flags,languages';

function fetchCountries(name) {
  const URL = `https://restcountries.com/v3.1/name/${name}?${PARAMS}`;

  return fetch(URL).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export { fetchCountries };
