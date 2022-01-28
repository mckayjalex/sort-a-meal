// TEMP FAV STORAGE
var sampleFavouritesObj = {
    restaurants: [
        {
            image: {},
            name: "Zarelli's Cafe Ristorante",
            vicinity: "Shop 9/1 Prow Dr, Seaford Meadows",
            ratings: 4.3,
            status: true,
            link: "ChIJMx6SzggksWoRTcjNHlzavlY",
        },
        {
            image: {},
            name: "Vasarelli Cellar Door Restaurant",
            vicinity: "169 Main Rd, McLaren Vale",
            ratings: 4.7,
            status: true,
            link: "ChIJcewYS58lsWoRs9Bj2d9RN-U",
        },
        {
            image: {},
            name: "Boony's Restaurant and Pizzeria",
            vicinity: "1/32 Saltfleet St, Port Noarlunga",
            ratings: 4.5,
            status: true,
            link: "ChIJ-RxcV1AhsWoRBX2oukgIEHQ",
        },
        {
            image: {},
            name: "Ren's Pizzeria",
            vicinity: "3/50 Babbacombe Dr, Moana",
            ratings: 4.2,
            status: true,
            link: "ChIJHWGyAGAjsWoRWEU-eFvkXEE",
        },
        {
            image: {},
            name: "Portseaya Pizza",
            vicinity: "6/9 Gawler St, Port Noarlunga",
            ratings: 4.4,
            status: true,
            link: "ChIJffytZf8hsWoR0YXjQKplNwY",
        },
        {
            image: {},
            name: "Oscars Restaurant",
            vicinity: "201 Main Rd, McLaren Vale",
            ratings: 4.2,
            status: true,
            link: "ChIJr_PHs6MlsWoRrngUeMiXwus",
        },
        {
            image: {},
            name: "Honeypot Takeaway",
            vicinity: "236 Honeypot Rd, Huntfield Heights",
            ratings: 4.2,
            status: true,
            link: "ChIJLVYKxfEmsWoRtZY74v7wDHo",
        },
        {
            image: {},
            name: "Carmels Cafe Bar grill",
            vicinity: "250 Main Rd, McLaren Vale",
            ratings: 4.4,
            status: true,
            link: "ChIJ3xcE66QlsWoRL9mXYxJyDeM",
        },
        {
            image: {},
            name: "Deep Blue Cafe",
            vicinity: "324 Esplanade, Moana",
            ratings: 4.5,
            status: true,
            link: "ChIJZWK2K3ojsWoRLbUB3tPmM5A",
        },
    ],
    recipes: [
        {
            image: "https://spoonacular.com/recipeImages/663824-556x370.jpg",
            title: "Trinidadian Chicken Potato Curry",
            vegan: false,
            ingredients: 19,
            servings: 4,
            link: "https://www.foodista.com/recipe/DLRB38NQ/trinidadian-chicken-potato-curry",
        },
        {
            image: "https://spoonacular.com/recipeImages/798400-556x370.jpg",
            title: "Spicy Black-Eyed Pea Curry with Swiss Chard and Roasted Eggplant",
            vegan: true,
            ingredients: 15,
            servings: 6,
            link: "http://foodandspice.blogspot.com/2016/08/spicy-black-eyed-pea-curry-with-swiss.html",
        },
        {
            image: "https://spoonacular.com/recipeImages/641904-556x370.jpg",
            title: "Easy Chicken Tandoori",
            vegan: false,
            ingredients: 6,
            servings: 12,
            link: "http://www.foodista.com/recipe/X8BXB6WT/easy-chicken-tandoori",
        },
        {
            image: "https://spoonacular.com/recipeImages/640634-556x370.jpg",
            title: "Creamy Curry Chicken With Yellow Rice",
            vegan: true,
            ingredients: 16,
            servings: 3,
            link: "https://www.foodista.com/recipe/FH4M8SNQ/creamy-curry-chicken-with-yellow-rice",
        },
        {
            image: "https://spoonacular.com/recipeImages/647799-556x370.jpg",
            title: "Indian Butter Chicken",
            vegan: false,
            ingredients: 12,
            servings: 48,
            link: "http://www.foodista.com/recipe/YFDM66DG/indian-butter-chicken-mommie-cooks",
        },
        {
            image: "https://spoonacular.com/recipeImages/647830-556x370.jpg",
            title: "Indian Lentil Dahl",
            vegan: true,
            ingredients: 12,
            servings: 4,
            link: "http://www.foodista.com/recipe/XMH8PZ48/indian-lentil-dahl",
        },
        {
            image: "https://spoonacular.com/recipeImages/652834-556x370.jpg",
            title: "My Chicken Korma",
            vegan: false,
            ingredients: 10,
            servings: 3,
            link: "http://www.foodista.com/recipe/DYMLK2QG/my-chicken-korma",
        },
        {
            image: "https://spoonacular.com/recipeImages/640621-556x370.jpg",
            title: "Creamy Chicken Tikka Masala",
            vegan: false,
            ingredients: 16,
            servings: 4,
            link: "http://www.foodista.com/recipe/B37W5NWL/creamy-chicken-tikka-masala",
        },
        {
            image: "https://spoonacular.com/recipeImages/716364-556x370.jpg",
            title: "Rice and Peas with Coconut Curry Mackerel",
            vegan: false,
            ingredients: 10,
            servings: 4,
            link: "http://www.afrolems.com/2014/10/31/rice-and-peas-with-coconut-curry-mackerel/",
        },
        {
            image: "https://spoonacular.com/recipeImages/716202-556x370.jpg",
            title: "Fenugreek Roti",
            vegan: false,
            ingredients: 13,
            servings: 10,
            link: "http://foodandspice.blogspot.com/2012/07/fenugreek-roti.html",
        },
    ],
};
localStorage.setItem('favourites', JSON.stringify(sampleFavouritesObj));
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
    displayRestaurants(sampleFavouritesObj.restaurants);
    displayRecipes(sampleFavouritesObj.recipes);
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
        image.setAttribute('src', "./assets/images/restaurant.jpg");
        image.classList.add('w-52', 'h-60', 'm-6', 'rounded-md');
        container.append(image);
        // Add text container
        let textContainer = document.createElement('div');
        textContainer.classList.add('w-4/6', 'm-6', 'bg-offgrey');
        container.append(textContainer);
        // Add name
        let name = document.createElement('h2');
        name.textContent = restaurants[0].name;
        textContainer.append(name);
        // Add address
        let address = document.createElement('p');
        address.textContent = restaurants[i].vicinity;
        textContainer.append(address);
        // Add rating
        let rating = document.createElement('p');
        rating.textContent = restaurants[i].ratings;
        textContainer.append(rating);
        // Add more info link
        let link = document.createElement('a');
        link.textContent = 'More Info';
        link.setAttribute('src', restaurants[i].link);
        textContainer.append(link);
        favContentRestaurant.append(container);
    }
}
// Displays all favourite recipes
function displayRecipes(recipes) {
    // Add container
    for (let i = 0; i < recipes.length; i++) {
        let container = document.createElement('div');
        container.classList.add('h-52', 'sm:h-72', 'md:h-72', 'flex', 'flex-row', 'justify-center', 'rounded-2xl', 'shadow-xl', 'shadow-slate-500')
        favContentRecipe.append(container);
        // Add image
        let image = document.createElement('img');
        image.setAttribute('src', "./assets/images/recipe.jpg");
        image.classList.add('w-52', 'h-60', 'm-6', 'rounded-md');
        container.append(image);
        // Add text container
        let textContainer = document.createElement('div');
        textContainer.classList.add('flex', 'flex-col', 'align-start', 'w-4/6', 'm-6', 'bg-offgrey');
        container.append(textContainer);
        // Add title
        let title = document.createElement('h2');
        title.textContent = recipes[i].title;
        textContainer.append(title);
        // Add ingredients
        let ingredients = document.createElement('p');
        ingredients.textContent = recipes[i].ingredients;
        textContainer.append(ingredients);
        // Add servings
        let servings = document.createElement('p');
        servings.textContent = recipes[i].servings;
        textContainer.append(servings);
        // Add vegan details 
        let veganStatus = document.createElement('p');
        if (recipes[i].vegan) {
            veganStatus.textContent = 'Vegan';
        }
        textContainer.append(veganStatus);
        // Add more info link
        let link = document.createElement('a');
        link.textContent = 'More Info';
        link.setAttribute('src', recipes[i].link);
        textContainer.append(link);
    }

}
init();