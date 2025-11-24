import { addRecipe } from "./main.js";

// Form submit
document.getElementById("add-recipe-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const imageUrl = document.getElementById("imageUrl").value.trim();
  const prepTime = parseInt(document.getElementById("prepTime").value);
  const cookTime = parseInt(document.getElementById("cookTime").value);
  const difficulty = parseInt(document.getElementById("difficulty").value);

  // Ingredients separated by commas
  const ingredientsRaw = document.getElementById("ingredients-input").value;
  const ingredients = ingredientsRaw
    .split(",")
    .map((i) => i.trim())
    .filter((v) => v);

  // Steps: one per line
  const stepsRaw = document.getElementById("steps-input").value;
  const steps = stepsRaw
    .split("\n")
    .map((s) => s.trim())
    .filter((v) => v);

  if (!title || ingredients.length === 0 || steps.length === 0) {
    alert("Please fill all fields");
    return;
  }

  addRecipe({
    title,
    imageUrl,
    prepTime,
    cookTime,
    difficulty,
    ingredients,
    steps,
  });

  // Optional: clear form after submit
  document.getElementById("add-recipe-form").reset();
});
