import _debounce from 'debounce';
import cardHbs from '../hbs/card.hbs';
import validator from 'validator';
import serviceApi from './api.js';


const refs = {
    list: document.querySelector('.list'),
    input: document.querySelector('.search'),
    notifyEr: document.querySelector('#message-error'),
}

const { list, input, notifyEr} = refs;

input.addEventListener('input', _debounce((e) => {
    const queryValue = e.target.value.trim(' ');
    const validateQueryValue = validator.isEmpty(queryValue);
notifyEr.classList.add('hide')
    list.innerHTML = " ";
 //  проверка валидаторм, если ОК вызываем функцию отрисовки
    if (!validateQueryValue) {
        render(queryValue);
    }
    
}, 300));




function render(query) {
    //  берем данные с запроса
    serviceApi.fetchDataDb(query).then((param) => {
        //  берем массив фильмов
        const showArrayElement = param.results;
        if (showArrayElement.length == 0) {
            notifyEr.classList.remove('hide')
            list.innerHTML = " ";
        }
        return showArrayElement;
    }).then((elem) => {
        console.log(elem)
        // вызываем handlebars, передаём массив фильмов
        const render = cardHbs(elem);
        // отрисовываем массив фильмов
        list.insertAdjacentHTML('beforeend', render);
    });
};

