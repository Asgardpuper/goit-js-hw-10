export default class CountriesApi {
  constructor(url) {
    this.url = url;
  }
  fetchCountriesByName(name) {
    return fetch(
      `${this.url}${name}?fields=name,capital,flags,population`
    ).then(data => data.json());
  }
}
