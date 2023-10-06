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

// Функція для виконання HTTP-запиту та отримання даних про кота за ідентифікатором породи
// export function fetchCatByBreed(breedId) {
//     // URL для запиту до API The Cat API з параметром breed_ids
//     const apiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

//     // Виконання GET-запиту до API
//     return axios.get(apiUrl)
//         .then(response => {
//             // Отримання даних про кота з відповіді API
//             const catData = response.data[0]; // Беремо перший об'єкт з масиву, якщо він є
//             return catData;
//         })
//         .catch(error => {
//             throw error; // Обробка помилок у виклику коду, який викликав цю функцію
//         })
// }

