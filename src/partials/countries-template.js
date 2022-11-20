export default function countriesTemplate(data) {
  return `<li class="country-list__item"><img src="${data.flags.svg}" width="25px"><span>${data.name.official}</span></li>`;
}
