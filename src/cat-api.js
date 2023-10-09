import axios from "axios";

// Оголосити і призначити значення ключа API
const apiKey = "live_KRGK14iZREdwtEGhSnQsBkuiz58h0w8qAZZgn6jKPJGgKxBlnwB42Xn50Fc0oquv";

// Налаштування заголовку x-api-key
axios.defaults.headers.common["x-api-key"] = apiKey;


// Функція для виконання HTTP-запиту та отримання списку порід
export function fetchBreeds() {
    // URL для запиту до API The Cat API
    const apiUrl = "https://api.thecatapi.com/v1/breeds";

    // Виконання GET-запиту до API
    return axios.get(apiUrl)
        .then(response => {
            // Отримання даних про породи з відповіді API
            const breeds = response.data;
            return breeds;
        })
        .catch(error => {
            throw error; // Обробка помилок у виклику коду, який викликав цю функцію
        });

}



// фича 2



export function fetchCatByBreed(breedId) {
    const apiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

    return axios.get(apiUrl)
        .then(response => {
            const catData = response.data[0]; // Отримуємо перший об'єкт з результатів

            // Отримуємо інформацію про породу кота
            const breedInfo = catData.breeds[0];
            const breedName = breedInfo.name;
            const breedDescription = breedInfo.description;
            const breedTemperament = breedInfo.temperament;

            // Отримуємо URL зображення кота
            const catImageUrl = catData.url;

            return {
                breedName,
                breedDescription,
                breedTemperament,
                catImageUrl,
            };
        })
        .catch(error => {
            throw error;
        });
}
