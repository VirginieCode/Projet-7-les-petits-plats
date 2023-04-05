// Fonction ouvrir et fermer le dropdown

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(function (dropdown) {
  const dropdownToggle = dropdown.querySelector(".dropdown-toggle");
  const dropdownMenu = dropdown.querySelector(".dropdown-menu");

  dropdownToggle.addEventListener("click", function () {
    dropdownMenu.classList.toggle("show");
  });
});

document.addEventListener("click", function (event) {
  dropdowns.forEach(function (dropdown) {
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");

    if (!dropdown.contains(event.target)) {
      dropdownMenu.classList.remove("show");
    }
  });
});

//Fetch pour récuprer le data du fichier json

fetch("data/recipes.json")
  .then((response) => response.json())
  .then((data) => {
    allRecipes = data;
    displayRecipes(data);
    ingredientDropdown(data);
  })
  .catch((error) => console.error(error));


// Création des card des recettes

function displayRecipes(recipes) {
  const section = document.querySelector(".recipeDisplay");
  section.innerHTML = "";

  for (let i = 0; i < recipes.length; i++) {
    const card = document.createElement("div");
    const image = document.createElement("div");
    const infos = document.createElement("div");
    const recipeNameAndTime = document.createElement("div");
    const recipeName = document.createElement("p");
    const recipeTime = document.createElement("p");
    const ingredientsAndDescription = document.createElement("div");
    const recipeDescription = document.createElement("div");
    const recipeIngredients = document.createElement("div");

    card.classList.add("recipeCard");
    image.classList.add("recipeCardImage");
    infos.classList.add("recipeCardInfos");
    recipeDescription.classList.add("recipeDescription");
    recipeIngredients.classList.add("recipeIngredients");
    ingredientsAndDescription.classList.add("ingredientsAndDescription");
    recipeName.classList.add("recipeName");
    recipeNameAndTime.classList.add("recipeNameAndTime");

    recipeName.textContent = `${recipes[i].name}`;
    recipeTime.textContent = `${recipes[i].time}`;
    recipeDescription.textContent = `${recipes[i].description}`;

    recipeNameAndTime.appendChild(recipeName);
    recipeNameAndTime.appendChild(recipeTime);
    infos.appendChild(recipeNameAndTime);

    recipes[i].ingredients.forEach((ingredient) => {
      const ingredientName = ingredient.ingredient;

      const ingredientItem = document.createElement("li");
      ingredientItem.textContent = `${ingredient.ingredient}: ${
        ingredient.quantity
      } ${ingredient.unit || ""}`;
      recipeIngredients.appendChild(ingredientItem);
      infos.appendChild(ingredientsAndDescription);
    });

    section.appendChild(card);

    card.appendChild(image);

    card.appendChild(infos);

    ingredientsAndDescription.appendChild(recipeIngredients);
    ingredientsAndDescription.appendChild(recipeDescription);
  }
}
function ingredientDropdown(filteredRecipes) {
  const dropdownIngredients = document.querySelector(".dropdown-menu.ingredient");

  dropdownIngredients.innerHTML = "";

  let ingredients = new Set();

  for (let i = 0; i < filteredRecipes.length; i++) {
    filteredRecipes[i].ingredients.forEach((ingredient) => {
      ingredients.add(ingredient.ingredient);
    });
  }

  ingredients.forEach((ingredient) => {
    dropdownIngredients.innerHTML += `<a><li>${ingredient}</li></a>`;
    dropdownIngredients.classList.add("eachIngredient");
  });


}


//Lecture des termes entrés dans la barre de recherche

const searchBar = document.querySelector("#searchBar");

searchBar.addEventListener("input", (event) => {
  const searchInput = event.target;
  const searchTerm = searchInput.value.toLowerCase().trim();
  filterRecipes(searchTerm);
});

//Filtrage des recettes

let allRecipes = [];

function filterRecipes(searchTerm) {
  // Condition if pour vérifier la longueur de searchTerm
  if (searchTerm.length < 3) {
    displayRecipes(allRecipes); //Si inférieur à 3 alors toutes les recherches sont affichées
    return;
  }

  // Sinon le filtrage commence

  const filteredRecipes = allRecipes.filter((recipe) => {
    const recipeName = recipe.name.toLowerCase();
    const recipeDescription = recipe.description.toLowerCase();

    const ingredientsCheck = recipe.ingredients.some((ingredient) => {
      const ingredientName = ingredient.ingredient.toLowerCase();
      return ingredientName.includes(searchTerm);
    });
    //Si la recherche inclus les caractères dans le nom, ingrédients ou description
    return (
      recipeName.includes(searchTerm) ||
      ingredientsCheck ||
      recipeDescription.includes(searchTerm)
    );
  });
   displayRecipes(filteredRecipes);
  ingredientDropdown(filteredRecipes);
}





