// Fonction toggle pour le dropdown

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(function (dropdown) {
  const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
  const dropdownMenu = dropdown.querySelector('.dropdown-menu');

  dropdownToggle.addEventListener('click', function () {
    dropdownMenu.classList.toggle('show');
  });
});

document.addEventListener('click', function (event) {
  dropdowns.forEach(function (dropdown) {
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');

    if (!dropdown.contains(event.target)) {
      dropdownMenu.classList.remove('show');
    }
  });
});

// fetch pour récuprer les recettes 

fetch('data/recipes.json')
  .then(response => response.json())
  .then(data => {
    // `data` contient les données du tableau JSON
    console.log(data);
    const section = document.querySelector('.recipeDisplay');
    for (let i = 0; i < data.length; i++) {

      const card = document.createElement('div');
      const image = document.createElement('div');
      const infos = document.createElement('div');
      const recipeNameAndTime = document.createElement('div');
      const recipeName = document.createElement('p');
      const recipeTime = document.createElement('p');
      const ingredientsAndDescription = document.createElement('div');
      const recipeDescription = document.createElement('div');
      const recipeIngredients = document.createElement('div');

      card.classList.add('recipeCard');
      image.classList.add('recipeCardImage');
      infos.classList.add('recipeCardInfos');
      recipeDescription.classList.add('recipeDescription');
      recipeIngredients.classList.add('recipeIngredients');
      ingredientsAndDescription.classList.add('ingredientsAndDescription')
      recipeName.classList.add('recipeName');
      recipeNameAndTime.classList.add('recipeNameAndTime')




      recipeName.textContent = `${data[i].name}`;
      recipeTime.textContent = `${data[i].time}`;
      recipeDescription.textContent = `${data[i].description}`;

      recipeNameAndTime.appendChild(recipeName);
      recipeNameAndTime.appendChild(recipeTime);
      infos.appendChild(recipeNameAndTime);

      data[i].ingredients.forEach(ingredient => {
        const ingredientItem = document.createElement('li');
        ingredientItem.textContent = `${ingredient.ingredient}: ${ingredient.quantity} ${ingredient.unit || ''}`;
        recipeIngredients.appendChild(ingredientItem);
        infos.appendChild(ingredientsAndDescription);

      });
      section.appendChild(card);

      card.appendChild(image);

      card.appendChild(infos);

      ingredientsAndDescription.appendChild(recipeIngredients);
      ingredientsAndDescription.appendChild(recipeDescription);



    }
  })
  .catch(error => console.error(error));

