const params = new URLSearchParams(window.location.search);
const mealId = params.get("id");

async function loadMealDetails(id) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  const meal = data.meals[0];

  const container = document.getElementById("mealDetail");
  container.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" style="width: 100%; max-width: 400px;" />
    <p><strong>Category:</strong> ${meal.strCategory}</p>
    <p><strong>Area:</strong> ${meal.strArea}</p>
    <p><strong>Instructions:</strong></p>
    <p>${meal.strInstructions}</p>
    <a href="${meal.strYoutube}" target="_blank">📺 Watch on YouTube</a>
  `;
}

loadMealDetails(mealId);
