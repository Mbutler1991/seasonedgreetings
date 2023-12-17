
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

// Contact Page Script
    document.addEventListener('DOMContentLoaded', function () {
      const form = document.querySelector('.contact-form');
      const phoneInput = document.getElementById('phone');
      let errorMessageShown = false;

      form.addEventListener('submit', function (event) {
        const phoneValue = phoneInput.value.trim();

        // Define the regular expression for a valid international phone number
        const phoneRegex = /^\+\d{1,3}\s?\d{1,}$/;

        if (!phoneRegex.test(phoneValue)) {
          if (!errorMessageShown) {
            // Create a new error message element
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = 'Please enter a valid international phone number with the country code. For example, +123 4567890';

            // Insert the error message after the phone input
            phoneInput.parentNode.insertBefore(errorMessage, phoneInput.nextSibling);

            // Highlight the input field to draw attention
            phoneInput.classList.add('error');

            errorMessageShown = true; // Set the flag to true
          }

          // Prevent form submission
          event.preventDefault();
        }
      });

      // Remove the error message and styling when the phone input is focused
      phoneInput.addEventListener('focus', function () {
        const errorMessage = document.querySelector('.error-message');
        if (errorMessage) {
          errorMessage.remove();
          phoneInput.classList.remove('error');
          errorMessageShown = false; // Reset the flag
        }
      });
    });
