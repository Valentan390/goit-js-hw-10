import { fetchBreeds, fetchCatByBreed } from './cat-api'
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import './styles.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selectEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const catInfoEl = document.querySelector('.cat-info');

errorEl.classList.add('is-hidden');
catInfoEl.classList.add('is-hidden');
selectEl.classList.add('is-hidden');


let arrBreedsId = [{placeholder: true, text: ''}];
console.log(arrBreedsId)
fetchBreeds()
    .then(data => {
    console.log(data)
        loaderEl.classList.add('is-hidden');
        selectEl.classList.remove('is-hidden');


        data.forEach(element => {
            arrBreedsId.push({ text: element.name, value: element.id });
        });

            new SlimSelect({
            select: selectEl,
            settings: {
                placeholderText: 'Select the cat breed from the drop-down list',
                allowDeselect: true 
            },
            data: arrBreedsId
            
        });

    })
    
    
    .catch(onFetchError);
    
 
selectEl.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {

    if (event.currentTarget.value === '') {
        catInfoEl.classList.add('is-hidden');
        return
    }
        let breedId = event.currentTarget.value;    

    loaderEl.classList.replace('is-hidden', 'loader');
    selectEl.classList.add('is-hidden');
    catInfoEl.classList.add('is-hidden');
        
    fetchCatByBreed(breedId)
        .then(data => {
            console.log(data[0])
        loaderEl.classList.replace('loader', 'is-hidden');
        selectEl.classList.remove('is-hidden');
        catInfoEl.classList.remove('is-hidden');
        
        const { url, breeds } = data[0];
        
            catInfoEl.innerHTML = `
            <div>
              <img src="${url}" alt="${breeds[0].name}" width="400"/>
            </div>
            <div class="box">
              <h1>${breeds[0].name}</h1>
              <p>${breeds[0].description}</p>
              <p><b>Temperament:</b> ${breeds[0].temperament}</p>
            </div>
        `
                    
        })
        
    .catch(onFetchError);
};

function onFetchError(error) {

    selectEl.classList.add('is-hidden');
    loaderEl.classList.add('is-hidden');
    catInfoEl.classList.add('is-hidden');
    
    Notify.failure('Oops! Something went wrong! Try reloading the page!', { position: 'center-top',
        timeout: 100000,
        width: '1050px',
        fontSize: '24px' });
}


