let restaurantBtn = document.querySelector('#restaurants');
let recipeBtn = document.querySelector('#recipes');
let restLine = document.querySelector('#restaurant-border');
let recipeLine = document.querySelector('#recipe-border');
let favContent = document.querySelector('#fav-content')

function restButtonGraphics() {
    restLine.classList.remove('bg-transparent');
    recipeLine.classList.add('bg-transparent');
    recipeLine.classList.remove('bg-maingreendark');
    restLine.classList.add('bg-maingreendark');
    restaurantBtn.classList.remove('text-gray-500');
    restaurantBtn.classList.add('text-gray-900');
    recipeBtn.classList.remove('text-gray-900');
    recipeBtn.classList.add('text-gray-500');
}
function recipeButtonGraphics() {
    recipeLine.classList.remove('bg-transparent');
    restLine.classList.add('bg-transparent');
    restLine.classList.remove('bg-maingreendark');
    recipeLine.classList.add('bg-maingreendark');
    recipeBtn.classList.remove('text-gray-500');
    recipeBtn.classList.add('text-gray-900');
    restaurantBtn.classList.remove('text-gray-900');
    restaurantBtn.classList.add('text-gray-500');
}
// Restaurant tab button
restaurantBtn.addEventListener('click', function() {
    restButtonGraphics();
    displayRestaurants();
})
// Recipe tab button
recipeBtn.addEventListener('click', function() {
    recipeButtonGraphics();
    displayRecipes();
})


// Displays all favourite restaurants
function displayRestaurants() {
    favContent.innerHTML = '';
    
}
// Displays all favourite recipes
function displayRecipes() {
    favContent.innerHTML = '';
}
