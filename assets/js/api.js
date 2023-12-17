// api fetch request to get a random recipe
function fetchMeal() {
  return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      const recipe = {
        name: meal.strMeal,
        category: meal.strCategory,
        instructions: meal.strInstructions,
        image: meal.strMealThumb,
        ingredients: []
      };

      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          recipe.ingredients.push({
            ingredient: meal[`strIngredient${i}`],
            measure: meal[`strMeasure${i}`]
          });
        }
      }

      return recipe;
    });
}



// Fetch 5 random meals and display them in a Bootstrap carousel
Promise.all(Array(5).fill().map(fetchMeal))
.then(recipes => {
  const carouselInner = document.querySelector('.recipes-carousel');
  carouselInner.innerHTML = '';

  recipes.forEach((recipe, index) => {
    const activeClass = index === 0 ? 'active' : '';
    const html = `
    <div class="carousel-item ${activeClass}">
      <img src="${recipe.image}" height="auto" width="100%" class="d-block w-100" alt="${recipe.name}">
      <div class="carousel-caption">
        <h5 class="bg-black">${recipe.name}</h5>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${index}">
          See Recipe
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal${index}" tabindex="-1" aria-labelledby="exampleModalLabel${index}" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel${index}">${recipe.name}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>${recipe.instructions}</p>
            <ul>
              ${recipe.ingredients.map(ingredient => `<li>${ingredient.ingredient} - ${ingredient.measure}</li>`).join('')}
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `;

    carouselInner.innerHTML += html;
  });
})
.catch(error => {
  console.error('Error:', error);
});