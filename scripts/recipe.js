import { loadRecipesFromStorage, deleteRecipe, formatMinutes } from "./main.js";

function getIdFromURL() {
  return new URLSearchParams(window.location.search).get("id");
}

// Load all
loadRecipesFromStorage();
let recipes = JSON.parse(localStorage.getItem("gourmetGridRecipes")) || [];

const recipeId = getIdFromURL();
const recipe = recipes.find((r) => r.id === recipeId);

const content = document.getElementById("details-content");

if (!recipe) {
  content.innerHTML = `<p class="text-red-500 text-lg">Recipe not found!</p>`;
} else {
  const imgUrl = recipe.imageUrl || "default.jpg";

  const prep = recipe.prepTime ? formatMinutes(recipe.prepTime) : "N/A";
  const cook = recipe.cookTime ? formatMinutes(recipe.cookTime) : "N/A";
  const total =
    recipe.prepTime && recipe.cookTime
      ? formatMinutes(recipe.prepTime + recipe.cookTime)
      : "N/A";

  const difficultyText = "⭐".repeat(recipe.difficulty || 1);

  content.innerHTML = `
    <h1 class="text-3xl font-bold mb-4">${recipe.title}</h1>

    <img src="${imgUrl}" class="w-full h-64 object-cover rounded-lg mb-4 shadow-md">

    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <p><strong>Prep Time:</strong> ${prep}</p>
      <p><strong>Cook Time:</strong> ${cook}</p>
      <p><strong>Total Time:</strong> ${total}</p>
      <p><strong>Difficulty:</strong> ${difficultyText}</p>
    </div>

    <h2 class="mt-6 font-bold text-xl mb-2">Ingredients</h2>
    <ul class="list-disc pl-6 text-gray-800">
      ${recipe.ingredients.map((i) => `<li>${i}</li>`).join("")}
    </ul>

    <h2 class="mt-6 font-bold text-xl mb-2">Steps</h2>
    <ol class="list-decimal pl-6 text-gray-800 space-y-1">
      ${recipe.steps.map((s) => `<li>${s}</li>`).join("")}
    </ol>

    <div class="flex justify-between mt-8">
      <button id="back-btn"
        class="py-2 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-sm transition">
        <i class="ph-arrow-left-bold mr-1"></i> Back
      </button>



        <button id="delete-recipe-btn"
          class="py-2 px-6 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition">
          <i class="ph-trash-fill mr-1"></i> Delete
        </button>
      </div>
    </div>
  `;
}

// Back
document.getElementById("back-btn")?.addEventListener("click", () => {
  window.location.href = "index.html";
});

// Delete
document.getElementById("delete-recipe-btn")?.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete this recipe?")) {
    deleteRecipe(recipeId);
  }
});
