import serviceApi from './api.js';

function genArr() {
    const genreArr = serviceApi.genre().then((arr) => {
        console.log(arr.genres)
        arr.genres.map((e) => {
            console.log(JSON.stringify(e))
            const bod = document.querySelector('body')
            bod.insertAdjacentHTML('beforeend', JSON.stringify(e)) 
        })
      
})
}

genArr()

