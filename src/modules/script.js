'use strict';
//import data from './db_cities.js';
let data;

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
const insertToInput = str => {

    const selectCities = document.getElementById('select-cities');
    selectCities.value = str;
    selectCities.focus();
};

const buttonClearAndDisable = () => {
    const btn = document.querySelector('.button');
    btn.setAttribute('disabled', 'true');
    btn.setAttribute('href', "#");


};

const insertToButton = str => {
    const btn = document.querySelector('.button');
    btn.removeAttribute('disabled');
    btn.setAttribute('href', str);

};

const closeButtonActivate = () => {
    const closeBtn = document.querySelector('.close-button');
    closeBtn.style.display = "block";
    closeBtn.addEventListener('click', e => {
        listSelectDisableAndClear();
        listAutoDisableAndClear();
        listDefaultDisable();
        document.getElementById('select-cities').value = '';
        closeBtn.style.display = "none";
    });
};

// добавляем города в список внутрь elem
const addCityToList = (elem, city) => {
    const listsLine = document.createElement('div');
    listsLine.className = 'dropdown-lists__line';
    listsLine.addEventListener('click', e => {
        const targetCity = e.target.closest('.dropdown-lists__line').querySelector('.dropdown-lists__city');
        insertToInput(targetCity.textContent);
        insertToButton(`${city.link}`);
        closeButtonActivate();
    });


    const listsCity = document.createElement('div');
    listsCity.className = 'dropdown-lists__city';
    listsCity.textContent = city.name;


    const listsCount = document.createElement('div');
    listsCount.className = 'dropdown-lists__count';

    listsCount.textContent = city.count;

    elem.insertAdjacentElement('beforeend', listsLine);
    listsLine.insertAdjacentElement('beforeend', listsCity);
    listsLine.insertAdjacentElement('beforeend', listsCount);
};

// добавляем города в список внутрь elem
const addCityToListSpecial = (elem, city, str, country) => {
    const listsLine = document.createElement('div');
    listsLine.className = 'dropdown-lists__line';
    listsLine.addEventListener('click', e => {
        const targetCity = e.target.closest('.dropdown-lists__line').querySelector('.dropdown-lists__city');
        insertToInput(targetCity.textContent);
        insertToButton(`${city.link}`);
        closeButtonActivate();
    });


    const listsCity = document.createElement('div');
    listsCity.className = 'dropdown-lists__city';
    let firstPart = city.name.slice(0, str.length);
    let leftPart = city.name.slice(str.length);
    listsCity.style.fontweight = "bold";
    listsCity.innerHTML = `<span style="font-weight: bold !important;">${firstPart}</span>${leftPart}`;




    const listsCount = document.createElement('div');
    listsCount.className = 'dropdown-lists__count';

    listsCount.textContent = country;

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
    totalLine.addEventListener('click', e => {
        const targetCountry = e.target.closest('.dropdown-lists__total-line').querySelector('.dropdown-lists__country');
        insertToInput(targetCountry.textContent);
        buttonClearAndDisable();
        listAutoDisableAndClear();
        toggleLists(e);
        closeButtonActivate();
    });

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

// создание блока страны SPECIAL- вставляется после item, возвращаем созданный countryBlock
const countryBlockCreateSpecial = (item, listsCol, str) => {

    const countryBlock = document.createElement('div');
    countryBlock.className = 'dropdown-lists__countryBlock';
    listsCol.insertAdjacentElement('beforeend', countryBlock);

    const totalLine = document.createElement('div');
    totalLine.className = 'dropdown-lists__total-line';
    countryBlock.insertAdjacentElement('afterbegin', totalLine);
    totalLine.addEventListener('click', e => {
        const targetCountry = e.target.closest('.dropdown-lists__total-line').querySelector('.dropdown-lists__country');
        insertToInput(targetCountry.textContent);
        buttonClearAndDisable();
        listAutoDisableAndClear();
        toggleLists(e);
        closeButtonActivate();
    });

    const listsCountry = document.createElement('div');
    listsCountry.className = 'dropdown-lists__country';
    let firstPart = item.country.slice(0, str.length);
    let leftPart = item.country.slice(str.length);
    listsCountry.style.fontweight = "normal";
    listsCountry.innerHTML = `${firstPart}<span style="font-weight: normal !important;">${leftPart}</span>`;
    totalLine.insertAdjacentElement('afterbegin', listsCountry);

    // const listsCount = document.createElement('div');
    // listsCount.className = 'dropdown-lists__count';
    // listsCount.textContent = item.count;
    // totalLine.insertAdjacentElement('beforeend', listsCount);

    return countryBlock;
};




// 3 города для страны
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

// все города страны
const citiesForSelect = (item, elem) => {
    for (const city of item.cities) {
        addCityToList(elem, city);
    }
};

// очистка списка
const listClear = list => {
    list.querySelector('.dropdown-lists__col').innerHTML = '';
};

const listDefaultDisable = () => {
    const listDefault = document.querySelector('.dropdown-lists__list--default');
    listDefault.style.display = 'none';
};

const listDefaultEnable = () => {
    const listDefault = document.querySelector('.dropdown-lists__list--default');
    listDefault.style.display = 'block';
};

const listSelectDisableAndClear = () => {
    const listSelect = document.querySelector('.dropdown-lists__list--select');
    listSelect.style.display = 'none';
    listClear(listSelect);
};
const listAutoDisableAndClear = () => {
    const listAuto = document.querySelector('.dropdown-lists__list--autocomplete');
    listAuto.style.display = 'none';
    listClear(listAuto);
};


const toggleLists = event => {
    const isDefault = event.target.closest('.dropdown-lists__list--default');
    const listDefault = document.querySelector('.dropdown-lists__list--default');

    if (!isDefault) {
        listDefault.style.display = 'block';
        listSelectDisableAndClear();
    } else {
        const insideLine = event.target.closest('.dropdown-lists__total-line');
        let country = insideLine.querySelector('.dropdown-lists__country').textContent;
        listSelectCreate(country);
        listDefaultDisable();
    }

};

//Большой список

const listDefaultCreate = () => {
    const listDefault = document.querySelector('.dropdown-lists__list--default');
    const listsCol = listDefault.querySelector('.dropdown-lists__col');

    for (const item of data.RU) {
        const countryBlock = countryBlockCreate(item, listsCol);
        citiesForDefault(item, countryBlock);
    }

    return true;
};

// список по стране

const listSelectCreate = (country) => {
    const listSelect = document.querySelector('.dropdown-lists__list--select');
    const listsCol = listSelect.querySelector('.dropdown-lists__col');

    let indexOfCountry;
    for (let i = 0; i < data.RU.length; i++) {
        if (data.RU[i].country === country) {
            indexOfCountry = i;
            break;
        }
    }
    const countryBlock = countryBlockCreate(data.RU[indexOfCountry], listsCol);
    citiesForSelect(data.RU[indexOfCountry], countryBlock);
    listSelect.style.display = 'block';
};

// список автопоиска

const listAutoCreate = (str) => {
    let counter = 0;
    const listAuto = document.querySelector('.dropdown-lists__list--autocomplete');
    const listsCol = listAuto.querySelector('.dropdown-lists__col');
    let alert = true;

    for (const item of data.RU) {
        let countryBlock;
        if (item.country.toLowerCase().indexOf(str.toLowerCase()) === 0) {
            countryBlock = countryBlockCreateSpecial(item, listsCol, str);
            alert = false;
        }
        for (const city of item.cities) {
            if (city.name.toLowerCase().indexOf(str.toLowerCase()) === 0) {
                if (typeof countryBlock === 'undefined') {
                    countryBlock = document.createElement('div');
                    countryBlock.className = 'dropdown-lists__countryBlock';
                    listsCol.insertAdjacentElement('beforeend', countryBlock);
                }

                addCityToListSpecial(countryBlock, city, str, item.country);
                alert = false;
                counter++;
            }
        }
    }
    if (alert) {
        const listsLine = document.createElement('div');
        listsLine.className = 'dropdown-lists__line';
        const listsCity = document.createElement('div');
        listsCity.className = 'dropdown-lists__city';
        listsCity.textContent = "Ничего не найдено";
        listsCol.insertAdjacentElement('afterbegin', listsLine);
        listsLine.insertAdjacentElement('beforeend', listsCity);
    }
    return counter;
};


// обработка ввода в input
const inputHandler = () => {
    const selectCities = document.getElementById('select-cities');
    listDefaultDisable();
    listSelectDisableAndClear();

    const listAuto = document.querySelector('.dropdown-lists__list--autocomplete');
    listAuto.style.display = 'Block';
    listClear(listAuto);

    if (selectCities.value === '') {
        listSelectDisableAndClear();
        listAutoDisableAndClear();
        listDefaultEnable();
        buttonClearAndDisable();
    } else if (listAutoCreate(selectCities.value) > 1) {
        buttonClearAndDisable();
    }

};


// начальная набивка списков
const listWork = () => {
    let isListDefault = false;
    const selectCities = document.getElementById('select-cities');
    selectCities.addEventListener('click', () => {
        if (!isListDefault) {
            isListDefault = listDefaultCreate();
        } else if (selectCities.value === '') {
            listSelectDisableAndClear();
            listAutoDisableAndClear();
            listDefaultEnable();
        }

    });
    selectCities.addEventListener('input', () => inputHandler());
    const wbody = document.querySelector('body');
    wbody.addEventListener('click', (e) => {
        if (selectCities.value !== '') {
            selectCities.focus();
        }
    });

};

const main = () => {

    window.onload = function () {
        const selectCities = document.getElementById('select-cities');
        selectCities.value = '';
    };

    const mainDiv = document.querySelector('.main');
    const inputCities = document.querySelector('.input-cities');

    const statusAnim = document.createElement('div');
    statusAnim.innerHTML = `<div class="sk-circle">
        <div class="sk-circle-dot"></div>
        <div class="sk-circle-dot"></div>
        <div class="sk-circle-dot"></div>
        <div class="sk-circle-dot"></div>
        <div class="sk-circle-dot"></div>
        <div class="sk-circle-dot"></div>
        <div class="sk-circle-dot"></div>
        <div class="sk-circle-dot"></div>
        <div class="sk-circle-dot"></div>
        <div class="sk-circle-dot"></div>
        <div class="sk-circle-dot"></div>
        <div class="sk-circle-dot"></div>
    </div>`;
    statusAnim.setAttribute('style', '--sk-color: white; margin-top: 200px');

    inputCities.style.display = "none";
    mainDiv.appendChild(statusAnim);
    fetch('./db_cities.json')
        .then((response) => {
            if (response.status !== 200) {
                throw new Error('status network not 200');
            }
            setTimeout(function () {
                mainDiv.removeChild(statusAnim);
                inputCities.style.display = "block";
            }, 2000);
            return (response.json());
        })
        .then((response) => {
            data = response;
            console.log(data);
            listWork();
        })
        .catch((error) => console.error(error));

};
export default main;