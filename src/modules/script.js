'use strict';
import data from './db_cities.js';

const threeMax = (arr) => {
    let out = [];
    for (let i = 1; i <= 3; i++) {
        let max = arr.reduce(function (a, b) {
            return Math.max(a, b);
        });
        arr.splice(arr.indexOf(max), 1);
        out.push(max);
    }
    return out;
};

// добавляем города в список внутрь elem
const addCityToList = (elem, city) => {
    const listsLine = document.createElement('div');
    listsLine.className = 'dropdown-lists__line';
    const listsCity = document.createElement('div');
    listsCity.className = 'dropdown-lists__city';
    const listsCount = document.createElement('div');
    listsCount.className = 'dropdown-lists__count';
    listsCity.textContent = city.name;
    listsCity.setAttribute('href', `${city.link}`);
    listsCount.textContent = city.count;

    elem.insertAdjacentElement('beforeend', listsLine);
    listsLine.insertAdjacentElement('beforeend', listsCity);
    listsLine.insertAdjacentElement('beforeend', listsCount);
};
// создание блока страны - вставляется после item, возвращаем созданный countryBlock
const countryBlockCreate = (item, listsCol) => {
    const countryBlock = document.createElement('div');
    countryBlock.className = 'dropdown-lists__countryBlock';
    listsCol.insertAdjacentElement('beforeend', countryBlock);

    const totalLine = document.createElement('div');
    totalLine.className = 'dropdown-lists__total-line';
    countryBlock.insertAdjacentElement('afterbegin', totalLine);

    const listsCountry = document.createElement('div');
    listsCountry.className = 'dropdown-lists__country';
    listsCountry.textContent = item.country;
    totalLine.insertAdjacentElement('afterbegin', listsCountry);

    const listsCount = document.createElement('div');
    listsCount.className = 'dropdown-lists__count';
    listsCount.textContent = item.count;
    totalLine.insertAdjacentElement('beforeend', listsCount);

    return countryBlock;
};


const citiesForDefault = (item, elem) => {
    let arrCounts = [];
    //    let arrCountsResult = [];
    item.cities.forEach(city => arrCounts.push(+city.count));
    if (arrCounts.length > 3) {
        arrCounts = threeMax(arrCounts);
    }

    for (const city of item.cities) {
        if (arrCounts.length !== 0 && arrCounts.indexOf(+city.count) !== -1) {
            //а вддруг в городах одинаковое число жителей?
            arrCounts.splice(arrCounts.indexOf(+city.count), 1);
            addCityToList(elem, city);
        }
    }
};

const citiesForSelect = (item, elem) => {
    for (const city of item.cities) { addCityToList(elem, city); }
};

const toggleLists = event => {
    const insideLine = event.target.closest('.dropdown-lists__total-line');
    let country = insideLine.querySelector('.dropdown-lists__country').textContent;
    console.log('country: ', country);
    let indexOfCountry;
    for (let i = 0; i < data.RU.length; i++) {
        if (data.RU[i].country === country) {
            indexOfCountry = i;
            break;
        }
    }
    listSelectCreate(indexOfCountry);
    const listDefault = document.querySelector('.dropdown-lists__list--default');
    listDefault.style.display = 'none';
    const listSelect = document.querySelector('.dropdown-lists__list--select');
    listSelect.style.display = 'block';

};

const listDefaultCreate = () => {
    const listDefault = document.querySelector('.dropdown-lists__list--default');
    const listsCol = listDefault.querySelector('.dropdown-lists__col');

    for (const item of data.RU) {
        const countryBlock = countryBlockCreate(item, listsCol);
        citiesForDefault(item, countryBlock);
    }

    const totalLines = listsCol.querySelectorAll('.dropdown-lists__total-line');
    totalLines.forEach(item => item.addEventListener('click', event => toggleLists(event)));
    return true;
};

const listSelectCreate = (indexOfCountry) => {
    const listSelect = document.querySelector('.dropdown-lists__list--select');
    const listsCol = listSelect.querySelector('.dropdown-lists__col');
    const countryBlock = countryBlockCreate(data.RU[indexOfCountry], listsCol);


    citiesForSelect(data.RU[indexOfCountry], countryBlock);

};

const main = () => {
    let isListDefault = false;
    const selectCities = document.getElementById('select-cities');
    selectCities.addEventListener('click', () => {
        if (!isListDefault) {
            isListDefault = listDefaultCreate();
        }
    });
};
export default main;