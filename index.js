const img = document.querySelector("img");
const searchBox = document.querySelector("#search-box");
const searchButton = document.querySelector("#search-btn");
const errorMessage = document.querySelector("#error-msg");

let searchTerm = "cats"; //default

const defaultGifUrl = "https://via.placeholder.com/300x200?text=No+GIF+found";

function fetchGif(term) {
  const URL = `https://api.giphy.com/v1/gifs/translate?api_key={YOUR-API-KEY}=${term}`;

  fetch(URL, {
    mode: "cors",
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.data && response.data.images) {
        img.src = response.data.images.original.url;
        errorMessage.textContent = "";
      } else {
        img.src = defaultGifUrl;
        errorMessage.textContent =
          "No GIF found for this search term. Try something else!";
      }
    })
    .catch((error) => {
      img.src = defaultGifUrl;
      errorMessage.textContent =
        "An error occurred. Please check your internet connection or API key.";
      console.error("Error fetching the GIF:", error);
    });
}

fetchGif(searchTerm);

searchButton.addEventListener("click", () => {
  searchTerm = searchBox.value.trim() || "cats";
  fetchGif(searchTerm);
});
