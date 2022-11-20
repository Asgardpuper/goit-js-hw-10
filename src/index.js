import './css/styles.css';
import Handlebars from 'handlebars';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import CountriesApi from './js/countries-api';
import template from './partials/countries-template';

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
  countriesApi.fetchCountriesByName(searchCountry).then(data => {
    console.log(data.length);
    if (data.length > 10) {
      return Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    }
    if (data.length === 1) {
      data.map(item => {
        let x = buildTemplateHandlebars(item);
        refs.infoCountries.innerHTML = x;
      });
    }
  });
}

function buildTemplateHandlebars(countries) {
  const newTemplate = Handlebars.compile(template);
  const readyTemplate = newTemplate(countries);
  return readyTemplate;
}
