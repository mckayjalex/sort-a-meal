// initialise the fetch variables
var placesAPI =
    "https://cors-cache-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json",
  placesPhotoAPI =
    "https://cors-cache-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo",
  recipesAPI = "https://api.spoonacular.com/recipes/random",
  fetchedData = [],
  restaurants = [],
  recipes = [],
  favourites = { restaurants: [], recipes: [] },
  flag,
  count = 0,
  blobImages = [],
  restaurantImages = [],
  savedFavourites = JSON.parse(localStorage.getItem("favourites")),
  cardItems,
  currentCard = 0;

// get url parameters for fetech type and query
var url = window.location.search;
var urlParams = new URLSearchParams(url);
var type = urlParams.get("type");
var query = urlParams.get("q");
var coordinates = urlParams.get("coordinates");

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
    window.location = "./home.html";
  }
}

// fetching data from the endpoints
// for restaurants
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
      data.results.forEach(function (obj) {
        // only add restaurants which are operational, has opening hours defined and their photo is available
        if (
          obj.business_status == "OPERATIONAL" &&
          obj.opening_hours !== undefined &&
          obj.photos !== undefined
        ) {
          fetchedData.push(obj);
        }
      });
      // fetchedData = data.results;
    })
    .then(function () {
      for (let i = 0; i < fetchedData.length; i++) {
        fetchRestaurantImage(fetchedData[i].photos[0].photo_reference);
      }
    });
}
// for restaurant images
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
        fetchedData[count].name,
        fetchedData[count].vicinity,
        fetchedData[count].rating,
        fetchedData[count].opening_hours.open_now || false,
        fetchedData[count].place_id
      );
      count++;
    });
}
// for recipes
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
    })
    .then(function () {
      for (let i = 0; i < fetchedData.length; i++) {
        initialiseRecipesView(
          i,
          fetchedData[i].image,
          fetchedData[i].title,
          fetchedData[i].vegan,
          fetchedData[i].extendedIngredients.length,
          fetchedData[i].servings,
          fetchedData[i].sourceUrl
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
      "card relative p-6 shadow-xl bg-maingreen ring-1 ring-gray-900/5 max-w-md md:min-w-[28rem] mx-auto rounded-2xl hover:cursor-grab"
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
      "card relative p-6 shadow-xl bg-maingreen ring-1 ring-gray-900/5 max-w-md md:min-w-[28rem] mx-auto rounded-2xl hover:cursor-grab"
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
function addRestaurantToFavourites(int) {
  // to check if the item is already added to favourites
  let flag1 = 0;
  favourites.restaurants.forEach(function (element) {
    if (element.name === restaurants[int].name) {
      flag1 -= 1;
    }
  });
  if (flag1 === 0) {
    favourites.restaurants.push(restaurants[int]);
    syncLocalStorage(favourites);
  }
}
// add a recipe to favourites list
function addRecipeToFavourites(int) {
  // to check if the item is already added to favourites
  let flag2 = 0;
  favourites.recipes.forEach(function (element, index) {
    if (element.title === recipes[int].title) {
      flag2 -= 1;
    }
  });
  if (flag2 === 0) {
    favourites.recipes.push(recipes[int]);
    syncLocalStorage(favourites);
  }
}

// check is all the data is loaded to the document
function isViewInitialised() {
  let cardsContainer = $("#cards");
  cardsContainer.addClass("hidden");
  // until each card is loaded the cards section must stay hidden
  // check if the no. of card items and length of data array matches
  let checkData = setInterval(function () {
    cardItems = $(".card");
    if (type === "restaurant" && cardItems.length === fetchedData.length) {
      console.log("equal length");
      stackCards();
      $("#message").addClass("hidden");
      $(cardsContainer).removeClass("hidden");
      clearInterval(checkData);
    } else if (type === "recipe" && cardItems.length === fetchedData.length) {
      console.log("equal length");
      stackCards();
      $("#message").addClass("hidden");
      $(cardsContainer).removeClass("hidden");
      clearInterval(checkData);
    }
  }, 3000);
}

// stack the cards
function stackCards() {
  for (let i = 0; i < cardItems.length; i++) {
    $(cardItems[i]).addClass("hidden");
    if (i === currentCard) {
      $(cardItems[i]).removeClass("hidden");
    }
  }
}

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

// manage user input
$("#selection").on("click", "button", function () {
  let input = $(this).data("add");
  console.log(input);
  if (type === "restaurant" && input === "yay") {
    addRestaurantToFavourites(currentCard);
  } else if (type === "recipe" && input === "yay") {
    addRecipeToFavourites(currentCard);
  }
  currentCard++;
  if (currentCard === fetchedData.length) {
    window.location = "./favourites.html";
  } else {
    stackCards();
  }
});

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
