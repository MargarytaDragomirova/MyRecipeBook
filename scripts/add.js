import { addRecipe } from "./main.js";

// IMAGE PICKER → PREVIEW → STORE BASE64
const imagePicker = document.getElementById("imagePicker");
const imagePreview = document.getElementById("imagePreview");
const imageUrlHidden = document.getElementById("imageUrl");

imagePicker.addEventListener("change", () => {
  const file = imagePicker.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    imagePreview.src = reader.result;
    imagePreview.classList.remove("hidden");
    imageUrlHidden.value = reader.result; // Base64 stored
  };
  reader.readAsDataURL(file);
});

// INGREDIENTS
const ingredients = [];
document.getElementById("add-ingredient-btn").onclick = () => {
  const value = document.getElementById("ingredient-input").value.trim();
  if (!value) return;

  ingredients.push(value);
  updateIngredientsUI();
  document.getElementById("ingredient-input").value = "";
};

function updateIngredientsUI() {
  const container = document.getElementById("ingredients-list");
  container.innerHTML = "";

  ingredients.forEach((ing, index) => {
    const chip = document.createElement("div");
    chip.className =
      "px-3 py-1 bg-orange-100 text-orange-800 rounded-full flex items-center gap-2";

    chip.innerHTML = `
      <span>${ing}</span>
      <button class="text-red-500" data-index="${index}">
        <i class="ph-x"></i>
      </button>
    `;

    container.appendChild(chip);
  });

  container.querySelectorAll("button").forEach((btn) => {
    btn.onclick = () => {
      ingredients.splice(btn.dataset.index, 1);
      updateIngredientsUI();
    };
  });

  document.getElementById("ingredients-hidden").value =
    JSON.stringify(ingredients);
}

// STEPS
const steps = [];
document.getElementById("add-step-btn").onclick = () => {
  const value = document.getElementById("step-input").value.trim();
  if (!value) return;

  steps.push(value);
  updateStepsUI();
  document.getElementById("step-input").value = "";
};

function updateStepsUI() {
  const container = document.getElementById("steps-list");
  container.innerHTML = "";

  steps.forEach((st, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center";

    li.innerHTML = `
      <span>${st}</span>
      <button class="text-red-500" data-index="${index}">
        <i class="ph-x"></i>
      </button>
    `;

    container.appendChild(li);
  });

  container.querySelectorAll("button").forEach((btn) => {
    btn.onclick = () => {
      steps.splice(btn.dataset.index, 1);
      updateStepsUI();
    };
  });

  document.getElementById("steps-hidden").value = JSON.stringify(steps);
}

// SUBMIT
document.getElementById("add-recipe-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const imageUrl = imageUrlHidden.value; // Base64
  const prepTime = parseInt(document.getElementById("prepTime").value);
  const cookTime = parseInt(document.getElementById("cookTime").value);
  const difficulty = parseInt(document.getElementById("difficulty").value);

  if (!imageUrl) {
    alert("Please upload an image!");
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
});
