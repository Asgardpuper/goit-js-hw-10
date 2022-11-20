export default function infoCountry(country) {
  return `<ul class="country-info__list"><li>Capital:${
    country.capital
  }</li><li>Population: ${country.population}</li><li>Languages:${Object.values(
    country.languages
  )}</ul>`;
}
