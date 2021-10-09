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

    list.innerHTML = " ";

    if (!validateQueryValue) {
        render(queryValue);
        notifyEr.classList.add('hide')
    } else {
        notifyEr.classList.add('hide')
    };
    
}, 300));




function render(query){
    serviceApi.fetchDataDb(query).then((param) => {
        const showArrayElement = param.results;
        console.log(param.results)
        if (showArrayElement.length == 0) {
            notifyEr.classList.remove('hide')
            list.innerHTML = " ";
        }
        return showArrayElement;
    }).then((elem) => {
        const render = cardHbs(elem);
        list.insertAdjacentHTML('beforeend', render);
    });
};


serviceApi.genre().then((gen) => {
    // console.log(gen.genres)
    const maping = gen.genres
    
    const body = document.querySelector('body')
    
    maping.map((e) => {
       console.log(e)
    })
   
})