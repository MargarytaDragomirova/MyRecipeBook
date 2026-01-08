import { loadRecipesFromStorage } from "./main.js";

const recipes = loadRecipesFromStorage();

// sadece image olanlar
const images = recipes
  .filter((r) => r.imageUrl)
  .map((r) => ({
    src: r.imageUrl,
    thumbSrc: r.imageUrl,
    caption: r.title,
  }));

const gallery = document.getElementById("gallery");

images.forEach((img, index) => {
  const el = document.createElement("img");
  el.src = img.thumbSrc;
  el.className = "w-full h-40 object-cover rounded-lg shadow cursor-pointer";

  el.addEventListener("click", () => {
    Fancybox.show(images, {
      startIndex: index,
    });
  });

  gallery.appendChild(el);
});
    