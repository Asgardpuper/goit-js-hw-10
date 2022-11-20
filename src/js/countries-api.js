export default class CountriesApi {
  constructor(url) {
    this.url = url;
  }
  fetchCountriesByName(name) {
    return fetch(
      `${this.url}${name}?fields=name,capital,flags,population,languages`
    ).then(data => data.json());
  }
}
