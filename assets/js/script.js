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
