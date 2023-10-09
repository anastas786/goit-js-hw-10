import { fetchBreeds } from "./cat-api.js";
import { fetchCatByBreed } from "./cat-api.js";

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

console.log(populateBreedSelect)


// фича 2//


const selectElement = document.querySelector(".breed-select");
const catInfoElement = document.querySelector(".cat-info");

// Завантаження порід та наповнення select елементу опціями
fetchBreeds()
    .then(breeds => {
        populateBreedSelect(breeds);
    })
    .catch(error => {
        console.error("Error fetching breeds:", error);
    });

// Опції для select елементу
function populateBreedSelect(breeds) {
    breeds.forEach(breed => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        selectElement.appendChild(option);
    });
}

// Обробник події при виборі опції в селекті
selectElement.addEventListener("change", () => {
    const selectedBreedId = selectElement.value;

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
        });

});
