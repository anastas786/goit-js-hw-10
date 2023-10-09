import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

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
    });



// фича 2//


const selectElement = document.querySelector(".breed-select");
const catInfoElement = document.querySelector(".cat-info");


// Опрацювання стану завантаження..


const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

// Під час запиту за списком порід
function showLoaderForBreeds() {
    selectElement.style.display = "none"; // Приховати селект порід
    loader.style.display = "block"; // Показати завантажувач
    error.style.display = "none"; // Приховати повідомлення про помилку (якщо воно було видимим)

}
showLoaderForBreeds();

// Обробник події при виборі опції в селекті
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
        })
        .finally(() => {
            // Після завершення запиту приховуємо завантажувач
            hideLoader();
            catInfoElement.style.display = "block";
        });
});

// Опрацювання стану завантаження..

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
    catInfoElement.style.display = "none"; // Приховати інформацію про кота
    loader.style.display = "block"; // Показати завантажувач
    error.style.display = "none"; // Приховати повідомлення про помилку (якщо воно було видимим)
}

fetchBreeds()
    .then(data => {
        // Обробка результатів запиту
    })
    .catch(error => {
        // Обробка помилок
        error.style.display = "block"; // Показати повідомлення про помилку
    })
    .finally(() => {
        // Після завершення запиту
        hideLoader();
    });
// Після завершення будь-якого запиту
function hideLoader() {
    selectElement.style.display = "block"; // Показати селект порід
    loader.style.display = "none"; // Приховати завантажувач
}  