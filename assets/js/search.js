// Fetches recipes from the API and displays them in the DOM.
function searchRecipes(query) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('recipe-container');
            const carousel = document.querySelector('.carousel');
            container.innerHTML = '';

            // Hide the carousel when a search is performed
            carousel.style.display = 'none';

            if (data.meals) {
                container.innerHTML = '<h1>Search results:</h1>';
                data.meals.forEach(meal => {
                    const recipe = {
                        name: meal.strMeal,
                        category: meal.strCategory,
                        instructions: meal.strInstructions,
                        image: meal.strMealThumb,
                        ingredients: []
                    };

                    for (let i = 1; i <= 20; i++) {
                        const ingredient = meal[`strIngredient${i}`];
                        const measure = meal[`strMeasure${i}`];

                        if (ingredient && ingredient !== "" && measure && measure !== "") {
                            recipe.ingredients.push({
                                ingredient: ingredient,
                                measure: measure
                            });
                        }
                    }

                    const html = `
                    <br>
                    <div class="card">
                        <img src="${recipe.image}" class="card-img-top" alt="${recipe.name}">
                        <div class="card-body gap-3">
                            <h5 class="card-title">${recipe.name}</h5>
                            <p class="card-text">${recipe.instructions}</p>
            <ul>
              ${recipe.ingredients.map(ingredient => `<li>${ingredient.ingredient} - ${ingredient.measure}</li>`).join('')}
            </ul>                     
                        </div>
                    </div>
                    `;

                    container.innerHTML += html;
                });
            } else {
                container.innerHTML = `
                <div class="d-flex justify-content-center align-items-center">
                <h2>No recipes found.</h2>
                </div>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const searchInput = document.getElementById('search-input');


searchInput.addEventListener('input', () => {
    if (!searchInput.value) {
        // Show the border carousel when the search input is cleared
        carousel.style.display = 'block';
    }
});