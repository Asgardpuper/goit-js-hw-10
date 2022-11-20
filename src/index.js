import './css/styles.css';
import Handlebars from 'handlebars';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import CountriesApi from './js/countries-api';
import countriesTemplate from './partials/countries-template';
import infoCountry from './partials/info-country-template';

const URL = 'https://restcountries.com/v3.1/name/';
const DEBOUNCE_DELAY = 300;

const refs = {
  inputField: document.querySelector('#search-box'),
  listCountries: document.querySelector('.country-list'),
  infoCountries: document.querySelector('.country-info'),
};

refs.inputField.addEventListener(
  'input',
  debounce(onInputChange, DEBOUNCE_DELAY)
);

const countriesApi = new CountriesApi(URL);

function onInputChange(e) {
  const searchCountry = e.target.value.trim();
  countriesApi
    .fetchCountriesByName(searchCountry)
    .then(data => {
      refs.listCountries.innerHTML = '';
      refs.infoCountries.innerHTML = '';
      if (data.length > 10) {
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (data.length === 1) {
        return data.map(elem => {
          const outputList = countriesTemplate(elem);
          refs.listCountries.insertAdjacentHTML('beforeend', outputList);
          const outputInfo = infoCountry(elem);
          refs.infoCountries.insertAdjacentHTML('beforeend', outputInfo);
        });
      }
      data.map(elem => {
        const outputList = countriesTemplate(elem);
        refs.listCountries.insertAdjacentHTML('beforeend', outputList);
      });
    })
    .catch(err => {
      if (searchCountry) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });
}
