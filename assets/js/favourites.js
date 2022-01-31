// Global variables
let favourites;

let restaurantBtn = document.querySelector('#restaurants');
let recipeBtn = document.querySelector('#recipes');
let restLine = document.querySelector('#restaurant-border');
let recipeLine = document.querySelector('#recipe-border');
let favContentRecipe = document.querySelector('#fav-content-recipe');
let favContentRestaurant = document.querySelector('#fav-content-restaurant');

function init() {
    getData();
    displayRestaurants(favourites.restaurants);
    displayRecipes(favourites.recipes);
}

function restaurantButtonGraphics() {
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
restaurantBtn.addEventListener('click', function () {
    favContentRecipe.classList.add('hidden');
    favContentRestaurant.classList.remove('hidden');
    restaurantButtonGraphics();
})
// Recipe tab button
recipeBtn.addEventListener('click', function () {
    favContentRestaurant.classList.add('hidden');
    favContentRecipe.classList.remove('hidden');
    recipeButtonGraphics();
})

function getData() {
    favourites = JSON.parse(localStorage.getItem('favourites'));
    restaurantLength = favourites.restaurants.length;
    recipeLength = favourites.recipes.length;
}

// Displays all favourite restaurants
function displayRestaurants(restaurants) {
    // Hiding recipes
    favContentRecipe.classList.add('hidden');
    for (let i = 0; i < restaurants.length; i++) {
        // Add container
        let container = document.createElement('div');
        container.classList.add('h-52', 'sm:h-72', 'md:h-72', 'flex', 'flex-row', 'justify-center', 'rounded-2xl', 'shadow-xl', 'shadow-slate-500')
        favContentRestaurant.append(container);
        // Add image
        let image = document.createElement('img');
        image.setAttribute('src', "./assets/images/restaurantFav.jpg");
        image.classList.add('w-40', 'sm:w-52', 'm-3', 'sm:m-6', 'rounded-md');
        container.append(image);
        // Add text container
        let textContainer = document.createElement('div');
        textContainer.classList.add('w-4/6', 'm-6', 'flex', 'flex-col', 'items-start', 'justify-between');
        container.append(textContainer);
        // Add name
        let name = document.createElement('h2');
        name.classList.add('font-boogaloo', 'text-left', 'text-md', 'sm:text-3xl', 'md:text-3xl', 'lg:text-xl', 'xl:text-3xl');
        name.textContent = restaurants[i].name;
        textContainer.append(name);
        // Add address
        let addressContainer = document.createElement('div');
        textContainer.append(addressContainer);
        addressContainer.classList.add('flex', 'justify-start', 'items-center');
        let mapIcon = document.createElement('i');
        mapIcon.classList.add('fas', 'fa-map-marker-alt', 'pr-2');
        addressContainer.append(mapIcon);
        let address = document.createElement('p');
        address.classList.add('font-boogaloo', 'text-sm', 'sm:text-lg', 'md:text-xl', 'lg:text-sm', 'xl:text-xl');
        address.textContent = restaurants[i].vicinity;
        addressContainer.append(address);
        // Add rating
        let ratingContainer = document.createElement('div');
        textContainer.append(ratingContainer);
        ratingContainer.classList.add('flex', 'justify-start', 'items-center');
        let rating = document.createElement('p');
        rating.classList.add('font-boogaloo', 'text-sm', 'sm:text-lg', 'md:text-xl', 'px-2', 'lg:text-lg', 'xl:text-2xl');
        if (restaurants[i].ratings < 3) {
            rating.classList.add('rounded-lg', 'bg-red-500');
        } else if (restaurants[i].ratings > 3 && restaurants[i].ratings < 4) {
            rating.classList.add('rounded-lg', 'bg-yellow-400');
        } else {
            rating.classList.add('rounded-lg', 'bg-green-500');
        }
        rating.textContent = restaurants[i].ratings;
        ratingContainer.append(rating);
        let ratingIcon = document.createElement('i');
        ratingIcon.classList.add('xl:text-xl', 'fas', 'fa-star', 'text-yellow-300', 'pl-2');
        ratingContainer.append(ratingIcon);

        // Add more info link and like 
        let linkLikeContainer = document.createElement('div');
        textContainer.append(linkLikeContainer);
        linkLikeContainer.classList.add('flex', 'flex-row', 'w-full', 'items-center', 'justify-between');
        let link = document.createElement('a');
        link.classList.add('font-boogaloo', 'text-sm', 'sm:text-xl', 'md:text-2xl', 'lg:text-lg', 'xl:text-xl', 'bg-slate-100', 'px-4', 'rounded-md', 'shadow-xl', 'shadow-slate-400', 'hover:bg-slate-300', 'cursor-pointer');
        link.textContent = 'More Info';
        link.setAttribute('href', 'https://www.google.com/maps/place/?q=place_id:' + restaurants[i].link);
        link.setAttribute('target', '_blank');
        linkLikeContainer.append(link);
        let like = document.createElement('i');
        like.setAttribute('data-index', i);
        like.classList.add('text-2xl', 'sm:text-3xl', 'md:text-5xl', 'lg:text-3xl', 'xl:text-5xl', 'fa', 'fa-heart', 'cursor-pointer', 'text-maingreen');
        linkLikeContainer.append(like);
    }
}
// Displays all favourite recipes
function displayRecipes(recipes) {
    // Add container
    for (let i = 0; i < recipes.length; i++) {
        // Add container
        let container = document.createElement('div');
        container.classList.add('h-52', 'sm:h-72', 'md:h-72', 'flex', 'flex-row', 'justify-center', 'rounded-2xl', 'shadow-xl', 'shadow-slate-500')
        favContentRecipe.append(container);
        // Add image
        let image = document.createElement('img');
        image.setAttribute('src', "./assets/images/recipeFav.jpg");
        image.classList.add('w-40', 'sm:w-52', 'm-3', 'sm:m-6', 'rounded-md');
        container.append(image);
        // Add text container
        let textContainer = document.createElement('div');
        textContainer.classList.add('w-4/6', 'm-6', 'flex', 'flex-col', 'items-start', 'justify-between');
        container.append(textContainer);
        // Add title
        let title = document.createElement('h2');
        title.classList.add('font-boogaloo', 'text-left', 'text-md', 'sm:text-3xl', 'md:text-3xl', 'lg:text-xl', 'xl:text-3xl');
        title.textContent = recipes[i].title;
        textContainer.append(title);
        // Add Vegan status
        let veganContainer = document.createElement('div');
        textContainer.append(veganContainer);
        veganContainer.classList.add('flex', 'justify-start', 'items-center', 'px-2', 'rounded');
        let vegan = document.createElement('h2');
        vegan.classList.add('font-boogaloo', 'text-md', 'sm:text-lg', 'md:text-xl', 'lg:text-xl', 'xl:text-xl');
        vegan.textContent = 'Vegan';
        veganContainer.append(vegan);
        if (recipes[i].vegan) {
            let veganIcon = document.createElement('i');
            veganIcon.classList.add('fas', 'fa-check', 'pl-2', 'text-green-400', 'text-2xl');
            veganContainer.append(veganIcon);
        } else {
            let veganIcon = document.createElement('i');
            veganIcon.classList.add('fas', 'fa-times', 'pl-2', 'text-red-400', 'text-2xl');
            veganContainer.append(veganIcon);
        }
        // Add servings
        let servingsContainer = document.createElement('div');
        textContainer.append(servingsContainer);
        servingsContainer.classList.add('flex', 'justify-start', 'items-center', 'bg-offgrey', 'px-2', 'rounded');
        let servings = document.createElement('h2');
        servings.classList.add('font-boogaloo', 'text-md', 'sm:text-lg', 'md:text-xl', 'lg:text-xl', 'xl:text-xl');
        servings.textContent = 'Servings: ' + recipes[i].servings;
        servingsContainer.append(servings);
        let servingsIcon = document.createElement('i');
        servingsIcon.classList.add('fas', 'fa-utensils', 'pl-2');
        servingsContainer.append(servingsIcon);
        // Add ingredients
        let ingredientsContainer = document.createElement('div');
        textContainer.append(ingredientsContainer);
        ingredientsContainer.classList.add('flex', 'justify-start', 'items-center');
        let ingredients = document.createElement('p');
        ingredients.classList.add('font-boogaloo', 'text-sm', 'sm:text-lg', 'md:text-xl', 'lg:text-sm', 'xl:text-xl');
        ingredients.textContent = 'Ingredients: ' + recipes[i].ingredients;
        ingredientsContainer.append(ingredients);
        let ingredientsIcon = document.createElement('i');
        ingredientsIcon.classList.add('fas', 'fa-balance-scale-left', 'pl-2');
        ingredientsContainer.append(ingredientsIcon);
        // Add more info link and like 
        let linkLikeContainer = document.createElement('div');
        textContainer.append(linkLikeContainer);
        linkLikeContainer.classList.add('flex', 'flex-row', 'w-full', 'items-center', 'justify-between');
        let link = document.createElement('a');
        link.classList.add('font-boogaloo', 'text-sm', 'sm:text-xl', 'md:text-2xl', 'lg:text-lg', 'xl:text-xl', 'bg-slate-100', 'px-4', 'rounded-md', 'shadow-xl', 'shadow-slate-400', 'hover:bg-slate-300', 'cursor-pointer');
        link.textContent = 'More Info';
        link.setAttribute('href', recipes[i].link);
        link.setAttribute('target', '_blank');
        linkLikeContainer.append(link);
        let like = document.createElement('i');
        like.setAttribute('data-index', i);
        like.classList.add('text-2xl', 'sm:text-3xl', 'md:text-5xl', 'lg:text-3xl', 'xl:text-5xl', 'fa', 'fa-heart', 'cursor-pointer', 'text-maingreen');
        linkLikeContainer.append(like);
    }
}


function removeRestaurantFavourites(int) {
    favourites.restaurants.splice(int, 1);
    localStorage.setItem('favourites', JSON.stringify(favourites));
}
function removeRecipeFavourites(int) {
    favourites.recipes.splice(int, 1);
    localStorage.setItem('favourites', JSON.stringify(favourites));
}
// Add link button animation
// Removal of favourite
favContentRecipe.addEventListener('click', function (event) {
    event.target.classList.remove('fa')
    event.target.classList.add('far');
    removeRecipeFavourites(event.target.dataset.index);
    location.reload();
})
// Add link button animation
// Removal of favourite
favContentRestaurant.addEventListener('click', function (event) {
    event.target.classList.remove('fa')
    event.target.classList.add('far');
    removeRestaurantFavourites(event.target.dataset.index);
    location.reload();
})

init();



