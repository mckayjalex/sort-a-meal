// initialise the fetch variables
var placesAPI =
    "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json",
  placesPhotoAPI =
    "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo",
  recipesAPI = "https://api.spoonacular.com/recipes/random",
  fetchedData = [],
  restaurants = [],
  recipes = [],
  favourites = { restaurants: [], recipes: [] },
  flag,
  count = 0,
  restaurantData,
  recipeData,
  blobImages = [],
  restaurantImages = [],
  savedFavourites = JSON.parse(localStorage.getItem("favourites")),
  cardItems;

// sample favourites
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

// get url parameters for fetech type and query
var url = window.location.search;
var urlParams = new URLSearchParams(url);
var type = urlParams.get("type");
var query = urlParams.get("q");
var coordinates = urlParams.get("coordinates");

// statically defining parameters if empty
if (!coordinates) {
  //   coordinates = "-35.504128,138.7823104";
  //   coordinates = "-27.6667481,152.9271662";
  coordinates = "-35.1935881,138.4983538";
}
if (!query) {
  query = "pizza";
}
// logging the parameters to the console
// console.log(
//   urlParams.has("type") && urlParams.has("coordinates") && urlParams.has("q")
// );
// on load check for parameters
$(document).ready(function () {
  checkParams();
  isViewInitialised();
  // initialise favourites from local storage if not null
  if (savedFavourites) {
    favourites = savedFavourites;
  } else {
    syncLocalStorage(favourites);
  }
});
// check if the required parameters are present or display error
function checkParams() {
  if (type === "restaurant" && query && coordinates) {
    // console.log(type, query, coordinates);
    fetchRestaurants();
  } else if (type === "recipe" && query) {
    // console.log(type, query);
    fetchRecipes();
  } else {
    console.error("Some parameters are not defined correctly!");
  }
}

// fetching data from the endpoints
// if restaurant
function fetchRestaurants() {
  console.log("Started fetching restaurants");
  fetch(
    `${placesAPI}?location=${coordinates}&radius=5000&type=restaurant&keyword=${query}&key=AIzaSyC4_oP_4B6Vj4Zf6-SMYRjShWxzpcZOcgc`
  )
    .then(function (response) {
      if (!response.ok) {
        return console.error("Something went wong!", response.json());
      }
      return response.json();
    })
    .then(function (data) {
      fetchedData = data.results;
      restaurantData = data.results;
    })
    .then(function () {
      for (let i = 0; i < restaurantData.length; i++) {
        fetchRestaurantImage(restaurantData[i].photos[0].photo_reference);
      }
    });
}
function fetchRestaurantImage(payload) {
  console.log("Started fetching image");
  fetch(
    `${placesPhotoAPI}?maxwidth=400&photo_reference=${payload}&key=AIzaSyC4_oP_4B6Vj4Zf6-SMYRjShWxzpcZOcgc`
  )
    .then(function (ref) {
      return ref.blob();
    })
    .then(function (image) {
      setImages(image);
      blobImages.push(image);
    })
    .then(function () {
      initialiseRestaurantsView(
        count,
        restaurantImages[count],
        restaurantData[count].name,
        restaurantData[count].vicinity,
        restaurantData[count].rating,
        restaurantData[count].opening_hours.open_now || false,
        restaurantData[count].place_id
      );
      count++;
    });
}

// if recipe
function fetchRecipes() {
  console.log("Started fetching recipes");
  fetch(
    `${recipesAPI}?limitLicense=true&tags=${query}&number=10&apiKey=b2a9988857174ce09bca833cfc9bb5f4`,
    {
      method: "GET",
    }
  )
    .then(function (response) {
      if (!response.ok) {
        return console.error("Something went wong! Recipes", response.json());
      }
      return response.json();
    })
    .then(function (data) {
      fetchedData = data.recipes;
      recipeData = data.recipes;
    })
    .then(function () {
      for (let i = 0; i < recipeData.length; i++) {
        initialiseRecipesView(
          i,
          recipeData[i].image,
          recipeData[i].title,
          recipeData[i].vegan,
          recipeData[i].extendedIngredients.length,
          recipeData[i].servings,
          recipeData[i].sourceUrl
        );
      }
    });
}

// initialising view for restaurants and recipes
// create restaurant card for each restaurant in array
function initialiseRestaurantsView(
  index,
  image,
  name,
  vicinity,
  ratings,
  status,
  ref
) {
  let container = $("#cards");
  let card = $("<div>")
    .addClass(
      "card inline-block w-96 p-4 mx-6 bg-maingreen absolute rounded-2xl shadow-lg mb-8 shadow-slate-400 hover:cursor-grab"
    )
    .attr("data-index", index);
  let cardInner = $("<div>").addClass(
    "relative p-4 border-8 border-darkgreen rounded-2xl bg-white"
  );

  let cardImg = $("<div>")
    .attr("id", "card-img")
    .addClass(
      `relative rounded-lg shadow-xl bg-grey-700 h-48 mb-6 bg-cover bg-[url('${image}')]`
    );

  let cardInfo = $("<div>")
    .attr("id", "card-info")
    .addClass("relative text-center");

  let infoName = $("<h2>")
    .attr("id", "info-name")
    .addClass("text-3xl text-darkgreen font-boogaloo uppercase mb-2")
    .text(name);

  let infoVicinity = $("<p>").attr("id", "info-vicinity").addClass("pt-2 mb-2");
  let vicinityIcon = $("<i>").addClass("fas fa-map-marker-alt");
  let vicinityData = $("<span>")
    .attr("id", "vicinity-data")
    .addClass("pl-2")
    .text(vicinity);
  infoVicinity.append(vicinityIcon, vicinityData);

  let infoTags = $("<div>").addClass("flex justify-around py-4");
  let ratingsBox = $("<span>")
    .attr("id", "info-ratings")
    .addClass("py-2 text-white bg-green-600 px-4 rounded");
  let ratingsIcon = $("<i>").addClass("fas fa-star");
  let ratingsData = $("<span>")
    .attr("id", "ratings-data")
    .addClass("pl-2")
    .text(ratings);
  ratingsBox.append(ratingsIcon, ratingsData);
  setRatingsBg(ratingsBox, ratings);
  let statusBox = $("<span>")
    .attr("id", "info-status")
    .addClass(
      `py-2 uppercase text-white px-4 rounded ${
        status ? "bg-lime-800" : "bg-red-800"
      }`
    );
  let statusIcon = $("<i>").addClass(
    status ? "fas fa-door-open" : "fas fa-door-closed"
  );
  let statusData = $("<span>")
    .attr("id", "status-data")
    .addClass("pl-2")
    .text(status ? "open" : "closed");
  statusBox.append(statusIcon, statusData);
  infoTags.append(ratingsBox, statusBox);

  let infoLink = $("<div>").addClass("mt-4 mb-3 text-darkgreen");
  let linkEl = $("<a>").attr(
    "href",
    `https://www.google.com/maps/place/?q=place_id:${ref}`
  );
  let linkIcon = $("<i>").addClass("fas fa-info-circle");
  let linkText = $("<span>").addClass("pl-2").text("View Info");
  linkEl.append(linkIcon, linkText);
  infoLink.append(linkEl);
  // append
  cardInfo.append(infoName, infoVicinity, infoTags, infoLink);
  cardInner.append(cardImg, cardInfo);
  card.append(cardInner);
  container.append(card);
  // call to set the data in array
  initialiseRestaurantsData(
    blobImages[index],
    name,
    vicinity,
    ratings,
    status,
    ref
  );
}

// create recipe card for each recipe in array
function initialiseRecipesView(
  index,
  image,
  title,
  vegan,
  ingredients,
  servings,
  ref
) {
  let container = $("#cards");
  let card = $("<div>")
    .addClass(
      "card inline-block w-96 p-4 mx-6 bg-maingreen absolute rounded-2xl shadow-lg mb-8 shadow-slate-400 hover:cursor-grab"
    )
    .attr("data-index", index);
  let cardInner = $("<div>").addClass(
    "relative p-4 border-8 border-darkgreen rounded-2xl bg-white"
  );

  let cardImg = $("<div>")
    .attr("id", "card-img")
    .addClass(
      `relative rounded-lg shadow-xl bg-grey-700 h-48 mb-6 bg-cover bg-[url('${image}')]`
    );

  let cardInfo = $("<div>")
    .attr("id", "card-info")
    .addClass("relative text-center");

  let infoTitle = $("<h2>")
    .attr("id", "info-name")
    .addClass("text-2xl text-darkgreen font-boogaloo uppercase mb-4")
    .text(title);

  let infoVegan = $("<span>")
    .attr("id", "info-vicinity")
    .addClass(
      `py-2 text-white px-4 rounded mt-4 ${
        vegan ? "bg-green-600" : "bg-gray-200"
      }`
    );
  let veganIcon = $("<i>").addClass("fas fa-seedling");
  let veganData = $("<span>")
    .attr("id", "vegan-data")
    .addClass("pl-2")
    .text("Vegan");
  infoVegan.append(veganIcon, veganData);

  let infoLines = $("<div>").addClass(
    "flex flex-col justify-around py-4 divide-y text-gray-800"
  );
  let ingrefientsBox = $("<span>").addClass("py-2 px-4");
  let ingredientsIcon = $("<i>").addClass("fas fa-shopping-basket");
  let ingredientsData = $("<span>")
    .attr("id", "ingredients-data")
    .addClass("pl-2")
    .text(`${ingredients} ingredients`);
  ingrefientsBox.append(ingredientsIcon, ingredientsData);
  let servingsBox = $("<span>").addClass("py-2 px-4");
  let servingsIcon = $("<i>").addClass("fas fa-clock");
  let servingsData = $("<span>")
    .attr("id", "servings-data")
    .addClass("pl-2")
    .text(`${servings} servings`);
  servingsBox.append(servingsIcon, servingsData);
  infoLines.append(ingrefientsBox, servingsBox);

  let infoLink = $("<div>").addClass("mt-4 mb-3 text-darkgreen");
  let linkEl = $("<a>").attr("href", ref);
  let linkIcon = $("<i>").addClass("fas fa-info-circle");
  let linkText = $("<span>").addClass("pl-2").text("View Info");
  linkEl.append(linkIcon, linkText);
  infoLink.append(linkEl);

  // append
  cardInfo.append(infoTitle, infoVegan, infoLines, infoLink);
  cardInner.append(cardImg, cardInfo);
  card.append(cardInner);
  container.append(card);
  // call to set the data in array
  initialiseRecipesData(image, title, vegan, ingredients, servings, ref);
}

// working with the data for setting the parameters in an array
// set the data from fetch and push to restaurant array
function initialiseRestaurantsData(
  image,
  name,
  vicinity,
  ratings,
  status,
  ref
) {
  let restaurantObj = {
    image: image,
    name: name,
    vicinity: vicinity,
    ratings: ratings,
    status: status,
    link: ref,
  };
  restaurants.push(restaurantObj);
}
// set the data from fetch and push to reipes array
function initialiseRecipesData(
  image,
  title,
  vegan,
  ingredients,
  servings,
  ref
) {
  let recipeObj = {
    image: image,
    title: title,
    vegan: vegan,
    ingredients: ingredients,
    servings: servings,
    link: ref,
  };
  recipes.push(recipeObj);
}

// update document
// add a resturant to favourites list
function addRestaurantToFavourites(index) {
  favourites.restaurants.push(restaurants[index]);
  syncLocalStorage(favourites);
}
// add a recipe to favourites list
function addRecipeToFavourites(index) {
  favourites.recipes.push(recipes[index]);
  syncLocalStorage(favourites);
}

// manage input
$("#selection").on("click", "button", function () {
  let input = $(this).data("add");
  console.log(input);
});

// check is all the data is loaded to the document
function isViewInitialised() {
  let cardsContainer = $("#cards");
  cardsContainer.addClass("hidden");
  // until each card is loaded the cards section must stay hidden
  // check if the no. of card items and length of data array matches
  let checkData = setInterval(function () {
    cardItems = $(".card");
    if (type === "restaurant" && cardItems.length === restaurantImages.length) {
      console.log("equal length");
      $(cardsContainer).removeClass("hidden");
      clearInterval(checkData);
    } else if (type === "recipe" && cardItems.length === fetchedData.length) {
      console.log("equal length");
      $(cardsContainer).removeClass("hidden");
      clearInterval(checkData);
    }
  }, 1000);
}
// stack the cards
function stackCards() {}
var newCards;
function initCards(card, index) {
  var newCards = document.querySelectorAll(".card:not(.removed)");
  console.log(newCards);
  newCards.forEach(function (card, index) {
    card.style.zIndex = cardItems.length - index;
    card.style.transform =
      "scale(" + (20 - index) / 20 + ") translateY(-" + 30 * index + "px)";
    card.style.opacity = (10 - index) / 10;
  });

  // tinderContainer.classList.add("loaded");
}

// helper functions
// set images data for further processing
function setImages(img) {
  var urlCreator = window.URL || window.webkitURL;
  var imgURL = urlCreator.createObjectURL(img);
  console.log(imgURL);
  restaurantImages.push(imgURL);
  //   this v works
  //   $("#card-img").addClass(`bg-[url('${imgURL}')]`);
}
// update ratings box background color based on the value
function setRatingsBg(el, n) {
  if (n > 0 && n <= 1) {
    el.addClass("bg-red-700");
  } else if (n > 1 && n <= 2.5) {
    el.addClass("bg-orange-700");
  } else if (n > 2.5 && n <= 3.5) {
    el.addClass("bg-yellow-500");
  } else if (n > 3.5 && n <= 4.5) {
    el.addClass("bg-lime-600");
  } else if (n > 4.5) {
    el.addClass("bg-green-600");
  } else {
    el.addClass("bg-stone-600");
  }
}
// set local stroage data to equal the favourites object
function syncLocalStorage(obj) {
  localStorage.setItem("favourites", JSON.stringify(obj));
}
