     // Fonction toggle pour le dropdown

     const dropdowns = document.querySelectorAll('.dropdown');

     dropdowns.forEach(function(dropdown) {
       const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
       const dropdownMenu = dropdown.querySelector('.dropdown-menu');
     
       dropdownToggle.addEventListener('click', function() {
         dropdownMenu.classList.toggle('show');
       });
     });
     
     document.addEventListener('click', function(event) {
       dropdowns.forEach(function(dropdown) {
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
  })
  .catch(error => console.error(error));

     