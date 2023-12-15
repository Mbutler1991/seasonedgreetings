
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

document.addEventListener('DOMContentLoaded', function () {
    var currentIndex = 0; // Track the current index of the active item
    var items = document.querySelectorAll('.carousel-item'); // Get all carousel items

    // Function to show a specific slide by index
    function showSlide(index) {
        if (index < 0) {
            index = items.length - 1; // Loop to the last item if at the beginning
        } else if (index >= items.length) {
            index = 0; // Loop to the first item if at the end
        }

        // Move all items to the left
        items.forEach(function (item) {
            var newIndex = (parseInt(item.dataset.index) + 1) % items.length;
            item.dataset.index = newIndex;
            item.style.transform = 'translateX(' + (newIndex - index) * 100 + '%)';
        });

        // Update the current index
        currentIndex = index;
    }

    // Function to show the next slide
    window.nextSlide = function () {
        showSlide(currentIndex + 1);
    };

    // Function to show the previous slide
    window.prevSlide = function () {
        showSlide(currentIndex - 1);
    };

    // Show the initial slide (first item)
    showSlide(currentIndex);
});