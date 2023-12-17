// Fetches recipes from the API and displays them in the DOM.
function searchRecipes(query) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('recipe-container');
            container.innerHTML = '';


            if (data.meals) {
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
                    <div class="card gap-3">
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
                container.innerHTML = 'No recipes found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}