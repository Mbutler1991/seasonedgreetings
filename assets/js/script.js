
// HIDE CAROUSEL FUNCTION
function hideCarousel() {
    document.getElementById("carousel-container").classList.add("hide");
    document.getElementById("search-results").classList.remove("hide");
}

//CALL API FUNCTION
async function callApi() {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    if (response.status >= 200 && response.status <= 299) {
        data = await response.json();
        // hides the carousel and display search results with data called from API
        hideCarousel();
        searchResults(data);
    } else
        // This is where the error is handled - redirects to 500 page
        window.location.assign("500.html");
}

// adds event listener to search button which calls api function
search.addEventListener('click', callApi);