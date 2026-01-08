export const RECIPES_STORAGE_KEY = "gourmetGridRecipes";
export let recipes = [];

// Load recipes from localStorage
export function loadRecipesFromStorage() {
  const stored = localStorage.getItem(RECIPES_STORAGE_KEY);
  recipes = stored ? JSON.parse(stored) : [];
}

// Save recipes
export function saveRecipesToStorage() {
  localStorage.setItem(RECIPES_STORAGE_KEY, JSON.stringify(recipes));
}

// Add a recipe
export function addRecipe(recipeData) {
  loadRecipesFromStorage();

  const newRecipe = {
    id: Date.now().toString(),
    ...recipeData,
  };

  recipes.push(newRecipe);
  saveRecipesToStorage();

  alert(`Recipe "${recipeData.title}" saved!`);
  window.location.href = "index.html";
}

// Delete a recipe
export function deleteRecipe(recipeId) {
  loadRecipesFromStorage();

  recipes = recipes.filter((r) => r.id !== recipeId);
  saveRecipesToStorage();

  alert("Recipe deleted!");
  window.location.href = "index.html";
}

// Format minutes to readable text
export function formatMinutes(minutes) {
  if (minutes < 60) return `${minutes} min`;

  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}

// Render recipe cards
export function renderRecipes() {
  const grid = document.getElementById("recipes-grid");
  const search =
    document.getElementById("search-input")?.value.toLowerCase() || "";
  const noMsg = document.getElementById("no-recipes-message");

  if (!grid) return;

  grid.innerHTML = "";

  const filtered = recipes.filter(
    (r) =>
      r.title.toLowerCase().includes(search) ||
      r.ingredients.some((i) => i.toLowerCase().includes(search))
  );

  if (filtered.length === 0) {
    noMsg?.classList.remove("hidden");
  } else {
    noMsg?.classList.add("hidden");
  }

  filtered.forEach((r) => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow-lg p-2 cursor-pointer";
    card.onclick = () => (window.location.href = `recipe.html?id=${r.id}`);

    const imgUrl =
      r.imageUrl ||
      `https://placehold.co/400x250/10B981/ffffff?text=${encodeURIComponent(
        r.title
      )}`;

    card.innerHTML = `
      <img src="${imgUrl}" class="w-full h-40 object-cover mb-2">
      <h3 class="font-bold">${r.title}</h3>
    `;

    grid.appendChild(card);
  });
}
