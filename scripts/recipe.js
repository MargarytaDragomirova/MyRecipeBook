import {
  loadRecipesFromStorage,
  saveRecipesToStorage,
  formatMinutes,
} from "./main.js";

function getIdFromURL() {
  return new URLSearchParams(window.location.search).get("id");
}

// Load recipes
loadRecipesFromStorage();
let recipes = JSON.parse(localStorage.getItem("gourmetGridRecipes")) || [];

const recipeId = getIdFromURL();
const recipe = recipes.find((r) => r.id === recipeId);

const content = document.getElementById("details-content");

if (recipe) {
  content.innerHTML = `
    <h1 class="text-3xl font-bold mb-4">${recipe.title}</h1>
    <img src="${recipe.imageUrl}" class="w-full h-64 object-cover mb-4">
    <p><strong>Prep:</strong> ${formatMinutes(recipe.prepTime)} | 
       <strong>Cook:</strong> ${formatMinutes(recipe.cookTime)} | 
       <strong>Difficulty:</strong> ${recipe.difficulty}</p>

    <h2 class="mt-6 font-bold text-xl">Ingredients</h2>
    <ul class="list-disc pl-6">${recipe.ingredients
      .map((i) => `<li>${i}</li>`)
      .join("")}</ul>

    <h2 class="mt-6 font-bold text-xl">Steps</h2>
    <ol class="list-decimal pl-6">${recipe.steps
      .map((s) => `<li>${s}</li>`)
      .join("")}</ol>

    <div id="recipe-buttons" class="flex justify-between mt-6">
      <button id="back-btn" class="py-2 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition duration-300 shadow-sm">
        <i class="ph-arrow-left-bold mr-1"></i> Back
      </button>
      <div class="flex space-x-2">
        <button id="edit-btn" class="py-2 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition duration-300 shadow-md">
          <i class="ph-pencil-fill mr-1"></i> Edit Recipe
        </button>
        <button id="delete-recipe-btn" class="py-2 px-6 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-300 shadow-md">
          <i class="ph-trash-fill mr-1"></i> Delete
        </button>
      </div>
    </div>
  `;
} else {
  content.innerHTML = '<p class="text-red-500">Recipe not found!</p>';
}

// Back button
document.getElementById("back-btn")?.addEventListener("click", () => {
  window.location.href = "index.html";
});

// Edit button
document.getElementById("edit-btn")?.addEventListener("click", () => {
  window.location.href = `add.html?id=${recipeId}`;
});

// Delete button
document.getElementById("delete-recipe-btn")?.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete this recipe?")) {
    recipes = recipes.filter((r) => r.id !== recipeId);
    localStorage.setItem("gourmetGridRecipes", JSON.stringify(recipes));
    window.location.href = "index.html";
  }
});
