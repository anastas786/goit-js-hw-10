import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const selectElement = document.querySelector(".breed-select");
const catInfoElement = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

//Фича 1//

// Функція для заповнення select опціями

function populateBreedSelect(breeds) {
    const selectElement = document.querySelector(".breed-select");

    breeds.forEach(breed => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        selectElement.appendChild(option);
    });
}

// Завантаження порід та наповнення select елементу опціями
fetchBreeds()
    .then(breeds => {
        populateBreedSelect(breeds);
    })
    .catch(error => {
        console.error("Error fetching breeds:", error);
        showError();
        hideError();
    });



//Фича 2// пишемо функцію для отримання інформації про кота

selectElement.addEventListener("change", () => {
    const selectedBreedId = selectElement.value;
    showLoaderForCatInfo();
    // Викликаємо функцію для отримання інформації про кота за ідентифікатором породи
    fetchCatByBreed(selectedBreedId)
        .then(catData => {
            // Відображаємо інформацію про кота на сторінці
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
            hideError();
        })
        .finally(() => {
            // Після завершення запиту приховуємо завантажувач

            catInfoElement.style.display = "block";
            hideLoader();
        });
});
// Опрацювання стану завантаження.. фича 3

// Під час запиту за списком порід
function showLoaderForBreeds() {
    selectElement.classList.add("hidden");
    loader.classList.remove("hidden");
    error.classList.add("hidden-error"); // Приховуємо елемент помилки
}
showLoaderForBreeds();


// Обробник події при виборі опції в селекті

//Функція для приховання елемента
function hideElement(element) {
    element.classList.add("hidden");
}

// Функція для показу елемента
function showElement(element) {
    element.classList.remove("hidden");
}
// Під час запиту за інформацією про кота
function showLoaderForCatInfo() {
    console.log("Showing loader for cat info...");
    catInfoElement.classList.add("hidden");
    loader.classList.remove("hidden");
    error.classList.add("hidden-error"); // Приховуємо елемент помилки
    loader.style.display = "block"; // Показати завантажувач
}

fetchBreeds()
    .then(data => {
        // Обробка результатів запиту
    })
    .catch(error => {
        // Обробка помилок
        error.style.display = "block"; // Показати повідомлення про помилку
        showError();
        hideError();
    })
    .finally(() => {
        // Після завершення запиту
        hideLoader();
    });
// Після завершення будь-якого запиту
function hideLoader() {
    selectElement.classList.remove("hidden");
    loader.classList.add("hidden");
    selectElement.style.display = "block"; // Показати селект порід
    loader.style.display = "none"; // Приховати завантажувач
}

//Фича 4 //

// Функція для показу елемента помилки
function showError() {
    const errorElement = document.querySelector(".error");
    errorElement.classList.remove("hidden-error");
}

// Функція для приховування елемента помилки
function hideError() {
    const errorElement = document.querySelector(".error");
    errorElement.classList.add("hidden-error");
}
