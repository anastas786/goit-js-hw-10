
import { fetchBreeds } from "./cat-api.js";

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