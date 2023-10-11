import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import SlimSelect from 'slim-select';


const selectElement = document.querySelector(".breed-select");
const catInfoElement = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");



// Функция для заполнения select опциями
function populateBreedSelect(breeds) {
    selectElement.innerHTML = ''; // Очистка select перед добавлением опций
    breeds.forEach(breed => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        selectElement.appendChild(option);
    });
}

// Загрузка пород и заполнение select элемента опциями
fetchBreeds()
    .then(breeds => {
        populateBreedSelect(breeds);
    })
    .catch(error => {
        console.error("Error fetching breeds:", error);
        showError();
    });




// Обработчик события при выборе опции в select//

selectElement.addEventListener("change", () => {
    const selectedBreedId = selectElement.value;
    showLoaderForCatInfo();
    // Вызываем функцию для получения информации о коте по идентификатору породы
    fetchCatByBreed(selectedBreedId)
        .then(catData => {
            // Отображаем информацию о коте на странице
            catInfoElement.innerHTML = `
                <h2>${catData.breedName}</h2>
                <p>Description: ${catData.breedDescription}</p>
                <p>Temperament: ${catData.breedTemperament}</p>
                <img src="${catData.catImageUrl}" alt="Cat Image">
            `;
            console.log("Selected Breed ID:", selectedBreedId);
        })
        .catch(error => {
            console.error("Error fetching cat data:", error);
            showError();
        })
        .finally(() => {
            // После завершения запроса скрываем индикатор загрузки
            catInfoElement.style.display = "block";
            hideLoader();
        });
});

// Показываем индикатор загрузки при запросе списка пород
function showLoaderForBreeds() {
    selectElement.classList.add("hidden");
    loader.classList.remove("hidden");
    hideError(); // Скрываем элемент ошибки
}
showLoaderForBreeds();

// Показываем индикатор загрузки при запросе информации о коте
function showLoaderForCatInfo() {
    catInfoElement.classList.add("hidden");
    loader.classList.remove("hidden");
    hideError(); // Скрываем элемент ошибки
}

// Загрузка пород и обработка результатов запроса
fetchBreeds()
    .then(data => {
        // Обработка результатов запроса
    })
    .catch(error => {
        // Обработка ошибок
        showError();
    })
    .finally(() => {
        // После завершения запроса
        hideLoader();
    });

// Скрытие индикатора загрузки после любого запроса
function hideLoader() {
    selectElement.classList.remove("hidden");
    loader.classList.add("hidden");
}

// Функция для показа элемента ошибки
function showError() {
    const errorElement = document.querySelector(".error");
    errorElement.classList.remove("hidden-error");
}

// Функция для скрытия элемента ошибки
function hideError() {
    const errorElement = document.querySelector(".error");
    errorElement.classList.add("hidden-error");
}