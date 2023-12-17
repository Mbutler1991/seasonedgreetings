// Fetches recipes from the API and displays them in the DOM.
function searchRecipes(query, page = 1) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('recipe-container');
            container.innerHTML = '';

            if (data.meals) {
                // Calculate start and end indices for slicing the meals array
                const startIndex = (page - 1) * 5;
                const endIndex = startIndex + 5;

                // Slice the meals array to get only the recipes for the current page
                const meals = data.meals.slice(startIndex, endIndex);

                meals.forEach(recipe => {
                    const recipeElement = document.createElement('div');
                    recipeElement.classList.add('recipe');

                    const titleElement = document.createElement('h2');
                    titleElement.textContent = recipe.strMeal;
                    recipeElement.appendChild(titleElement);

                    const imageElement = document.createElement('img');
                    imageElement.src = recipe.strMealThumb;
                    recipeElement.appendChild(imageElement);

                    container.appendChild(recipeElement);
                });
            } else {
                container.innerHTML = 'No recipes found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}