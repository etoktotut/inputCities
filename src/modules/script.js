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
//list Animation
const listAnimateToLeft = (list1, list2, time, callback) => {
    list1.style.position = "relative";
    list1.style.transform = `translate(0%)`;
    list2.style.position = "relative";
    list2.style.transform = `translate(100%)`;
    //    list2.style.display = 'block';

    let step = 100 / (time / 17);
    let step1 = 100 / (time / 17);
    let position1 = 0;
    let position2 = 100;
    let timerId;

    const draw2 = () => {
        list2.style.display = 'block';
        list1.style.display = 'none';
        position2 -= step1;
        if (position2 < step1) { step1 = position2; }
        list2.style.transform = `translate(${position2}%)`;
        if (position2 <= 0) {
            cancelAnimationFrame(timerId);

            list2.style.transform = `translate(0%)`;
            list1.style.transform = `translate(0%)`;
            if (typeof callback !== 'undefined') {
                callback();
            }
            return;
        }
        requestAnimationFrame(draw2);
    };

    const draw1 = () => {
        position1 -= step;
        if (100 - Math.abs(position1) < step) { step = 100 - Math.abs(position1); }
        list1.style.transform = `translate(${position1}%)`;
        if (Math.abs(position1) >= 100) {
            list1.style.transform = `translate(-100%)`;

            cancelAnimationFrame(timerId);
            timerId = requestAnimationFrame(draw2);
            return;
        }
        requestAnimationFrame(draw1);
    };
    timerId = requestAnimationFrame(draw1);

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
    // listSlideToleft(listDefault, 100);
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
    const listSelect = document.querySelector('.dropdown-lists__list--select');

    if (!isDefault) {
        //listDefault.style.display = 'block';
        listAnimateToLeft(listSelect, listDefault, 400, function () { listSelectDisableAndClear(); });
        //listSelectDisableAndClear();
    } else {
        const insideLine = event.target.closest('.dropdown-lists__total-line');
        let country = insideLine.querySelector('.dropdown-lists__country').textContent;
        listSelectCreate(country);
        listAnimateToLeft(listDefault, listSelect, 400);

    }

};

//Большой список

const listDefaultCreate = (countryName) => {
    const listDefault = document.querySelector('.dropdown-lists__list--default');
    const listsCol = listDefault.querySelector('.dropdown-lists__col');

    for (const item of data) {
        if (item.country === countryName) {
            const countryBlock = countryBlockCreate(item, listsCol);
            citiesForDefault(item, countryBlock);
        }
    }

    for (const item of data) {
        if (item.country !== countryName) {
            const countryBlock = countryBlockCreate(item, listsCol);
            citiesForDefault(item, countryBlock);
        }
    }
    return true;
};

// список по стране

const listSelectCreate = (country) => {
    const listSelect = document.querySelector('.dropdown-lists__list--select');
    const listsCol = listSelect.querySelector('.dropdown-lists__col');

    let indexOfCountry;
    for (let i = 0; i < data.length; i++) {
        if (data[i].country === country) {
            indexOfCountry = i;
            break;
        }
    }
    const countryBlock = countryBlockCreate(data[indexOfCountry], listsCol);
    citiesForSelect(data[indexOfCountry], countryBlock);
    //listSelect.style.display = 'block';
};

// список автопоиска

const listAutoCreate = (str) => {
    let counter = 0;
    const listAuto = document.querySelector('.dropdown-lists__list--autocomplete');
    const listsCol = listAuto.querySelector('.dropdown-lists__col');
    let alert = true;

    for (const item of data) {
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
const listWork = (countryName) => {
    let isListDefault = false;
    const selectCities = document.getElementById('select-cities');

    selectCities.addEventListener('click', () => {
        if (!isListDefault) {
            listSelectDisableAndClear();
            listAutoDisableAndClear();
            isListDefault = listDefaultCreate(countryName);
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

const localePrompts = (locale) => {
    const prompts = {
        "RU": {
            "label": "Страна или город",
            "button": "Перейти",
            "country": "Россия"
        },
        "EN": {
            "label": "Country or city",
            "button": "Go to",
            "country": "United Kingdom"
        },
        "DE": {
            "label": "Land oder Stadt",
            "button": "Gehe zu",
            "country": "Deutschland"
        },

    };
    document.querySelector('.label').textContent = prompts[locale].label;
    document.querySelector('.button').textContent = prompts[locale].button;

    return prompts[locale].country;
};



const fetchData = (locale, isFetchFromServer) => {
    const countryName = localePrompts(locale);
    const inputCities = document.querySelector('.input-cities');
    const mainDiv = document.querySelector('.main');

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

    if (!isFetchFromServer && (localStorage.getItem('data') !== null)) {
        mainDiv.removeChild(statusAnim);
        inputCities.style.display = "block";
        data = JSON.parse(localStorage.getItem('data'));
        listWork(countryName);
    } else {
        fetch(`http://localhost:3000/${locale}`)
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
                localStorage.setItem('data', JSON.stringify(data));
                listWork(countryName);
            })
            .catch((error) => console.error(error));
    }


};

const main = () => {

    window.onload = function () {
        document.getElementById('select-cities').value = '';
        listAutoDisableAndClear();
    };

    const popup = document.getElementById('prompt-form-container');
    popup.style.display = 'none';

    const locale = document.cookie.split('; ').find(row => row.startsWith('locale='));

    if (typeof locale === 'undefined') {
        const inputCities = document.querySelector('.input-cities');
        const popup = document.getElementById('prompt-form-container');
        const startButton = document.getElementById('start-button');
        const selectLocale = document.getElementById('locale');
        inputCities.style.display = 'none';
        popup.style.display = 'block';
        startButton.addEventListener('click', () => {
            popup.style.display = 'none';
            inputCities.style.display = 'block';
            document.cookie = `locale=${selectLocale.value}`;
            fetchData(selectLocale.value, true);
        });
    } else {
        const loc = locale.split('=')[1];
        fetchData(loc, false);
    }


};
export default main;