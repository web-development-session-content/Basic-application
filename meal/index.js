document.addEventListener("DOMContentLoaded", () => {
  loadRandomMeals();
  loadCategories();
});

function showTab(tabName) {
  document.querySelectorAll(".tab-content").forEach(tab => {
    tab.style.display = "none";
  });
  document.getElementById(tabName).style.display = "flex";
}

async function loadRandomMeals() {
  const container = document.getElementById("random");
  container.innerHTML = "Loading...";
  const meals = [];

  for (let i = 0; i < 10; i++) {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await res.json();
    meals.push(data.meals[0]);
  }

  container.innerHTML = "";
  meals.forEach(meal => {
    const div = document.createElement("div");
    div.className = "meal-card";
    div.innerHTML = `
      <img src="${meal.strMealThumb}" />
      <h3>${meal.strMeal}</h3>
    `;
    div.onclick = () => {
      window.location.href = `detail.html?id=${meal.idMeal}`;
    };
    container.appendChild(div);
  });
}

async function loadCategories() {
  const container = document.getElementById("categories");
  container.innerHTML = "Loading...";

  const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
  const data = await res.json();

  container.innerHTML = "";
  data.categories.forEach(cat => {
    const div = document.createElement("div");
    div.className = "meal-card";
    div.innerHTML = `
      <img src="${cat.strCategoryThumb}" />
      <h3>${cat.strCategory}</h3>
    `;
    div.onclick = () => {
      fetchMealsByCategory(cat.strCategory);
    };
    container.appendChild(div);
  });
}


async function searchMeal() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  const container = document.getElementById("searchResults");
  container.innerHTML = "Searching...";
  showTab("searchResults");

  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const data = await res.json();

  if (!data.meals) {
    container.innerHTML = "<p>No meals found.</p>";
    return;
  }

  container.innerHTML = "";
  data.meals.forEach(meal => {
    const div = document.createElement("div");
    div.className = "meal-card";
    div.innerHTML = `
      <img src="${meal.strMealThumb}" />
      <h3>${meal.strMeal}</h3>
    `;
    div.onclick = () => {
      window.location.href = `detail.html?id=${meal.idMeal}`;
    };
    container.appendChild(div);
  });
}

async function fetchMealsByCategory(category) {
  const container = document.getElementById("categories");
  container.innerHTML = `Meals in category: <b>${category}</b><br>Loading...`;

  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await res.json();

  container.innerHTML = `<h2>${category}</h2>`;
  data.meals.forEach(meal => {
    const div = document.createElement("div");
    div.className = "meal-card";
    div.innerHTML = `
      <img src="${meal.strMealThumb}" />
      <h3>${meal.strMeal}</h3>
    `;
    div.onclick = () => {
      window.location.href = `detail.html?id=${meal.idMeal}`;
    };
    container.appendChild(div);
  });
}

