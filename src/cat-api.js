const url = 'https://api.thecatapi.com/v1/';
const api_key = "live_Jx8Qk6Ppm0yJIuElAtPGTaTZGsPzq1UqAG9iPLvSfEgGzlXrpMe29TEkz2iLuQsB";


 export function fetchBreeds() {

    return fetch(`${url}breeds?api_key=${api_key}`)
        .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );

}


export function fetchCatByBreed(breedId) {
     

    return fetch(`${url}images/search?breed_ids=${breedId}&api_key=${api_key}`)
        .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );

}