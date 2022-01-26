// initialise the fetch variables
var placesAPI =
    "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json",
  placesPhotoAPI =
    "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo",
  recipesAPI = "https://api.spoonacular.com/recipes/random",
  restaurants,
  recipes,
  flag,
  count = 0,
  restaurantData,
  recipeData,
  restaurantImages = [];

// sample objects
var restaurant1 = {
  name: "Something",
  ratings: 4.5,
  photo: "blob",
  vicinity: "Some street, city",
  status: true,
  link: "https://www.google.com/maps/place/?q=place_id:ChIJp4JiUCNP0xQR1JaSjpW_Hms",
};
var recipe1 = {
  title: "Let's cook something",
  readyIn: "5 Mins",
  servings: 5,
  image: "url",
  isVegan: false,
  noOfIngredients: 10,
  source: "link",
};

// get url parameters for fetech type and query
var url = window.location.search;
var urlParams = new URLSearchParams(url);
var type = urlParams.get("type");
var query = urlParams.get("q");
var coordinates = urlParams.get("coordinates");

// statically defining parameters if empty
if (!coordinates) {
  coordinates = "-35.504128,138.7823104";
}
if (!query) {
  query = "pizza";
}

console.log(
  urlParams.has("type") && urlParams.has("coordinates") && urlParams.has("q")
);
// check if the required parameters are present or display error
function checkParams() {
  if (type === "restaurant" && query && coordinates) {
    console.log(type, query, coordinates);
    fetchRestaurants();
  } else if (type === "recipe" && query) {
    console.log(type, query);
    fetchRecipes();
  } else {
    console.log("Invalid Type");
  }
}
checkParams();
// fetchRestaurants();
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
      getImages(image);
    })
    .then(function () {
      initialiseRestaurantView(
        count,
        restaurantImages[count],
        restaurantData[count].name,
        restaurantData[count].vicinity,
        restaurantData[count].rating,
        restaurantData[count].opening_hours.open_now ? true : false,
        restaurantData[count].place_id
      );
      count++;
    });
}
// temp
function getImages(img) {
  //   var urlCreator = window.URL || window.webkitURL;
  //   console.log(urlCreator);
  //   document.getElementById("myImage").src = urlCreator.createObjectURL(data);
  //   var temp = urlCreator.createObjectURL(img);
  //   console.log(temp);
  //   $("#card-img").addClass(`bg-[url('${temp}')]`);
  var urlCreator = window.URL || window.webkitURL;
  var imgURL = urlCreator.createObjectURL(img);
  console.log(imgURL);
  restaurantImages.push(imgURL);
  //   this v works
  //   $("#card-img").addClass(`bg-[url('${imgURL}')]`);
}

// initialising data and view for restaurants and recipes
// set the data from fetch and push to restaurant array
function initialiseRestaurantData(data) {
  let name;
  let ratings;
  let photo;
  let vicinity;
  let isOpen;
  let link;
}
// create restaurant card for each restaurant in array
function initialiseRestaurantView(
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
    .attr("id", "restaurant-card")
    .addClass(
      "inline-block w-96 p-4 mx-auto bg-maingreen rounded-2xl shadow-lg mb-8 shadow-slate-400 hover:cursor-grab"
    )
    .attr("data-index", index);
  let cardInner = $("<div>").addClass(
    "relative p-4 border-8 border-darkgreen rounded-2xl bg-white"
  );

  let cardImg = $("<div>")
    .attr("id", "card-img")
    .addClass(
      `relative rounded-lg shadow-xl bg-grey-700 h-48 mb-6 bg-cover bg-[url('${image}`
    );
  //   setRestaurantImg(cardImg, image);

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
  let linkEl = $("<a>").attr("href", `/details.html?placeid=${ref}`);
  let linkIcon = $("<i>").addClass("fas fa-info-circle");
  let linkText = $("<span>").addClass("pl-2").text("View Info");
  linkEl.append(linkIcon, linkText);
  infoLink.append(linkEl);

  // append
  cardInfo.append(infoName, infoVicinity, infoTags, infoLink);
  cardInner.append(cardImg, cardInfo);
  card.append(cardInner);
  container.append(card);
}

// initialiseRestaurantView(
//   0,
//   "/assets/images/sample-restaurant-bg.jpg",
//   "KFC - Adelaide",
//   "1 Main St, Springfield",
//   3.5,
//   true,
//   "lkajsdsadfasfsdffjaksjdkfj"
// );
// set the data from fetch and push to reipes array
function initialiseRecipeData() {}
// create recipe card for each recipe in array
function initialiseRecipeView(
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
    .attr("id", "recipe-card")
    .addClass(
      "inline-block w-96 p-4 mx-auto bg-maingreen rounded-2xl shadow-lg mb-8 shadow-slate-400 hover:cursor-grab"
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
  let veganIcon = $("<i>").addClass("fas fa-map-marker-alt");
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
  let linkEl = $("<a>").attr("href", `/details.html?recipeid=${ref}`);
  let linkIcon = $("<i>").addClass("fas fa-info-circle");
  let linkText = $("<span>").addClass("pl-2").text("View Info");
  linkEl.append(linkIcon, linkText);
  infoLink.append(linkEl);

  // append
  cardInfo.append(infoTitle, infoVegan, infoLines, infoLink);
  cardInner.append(cardImg, cardInfo);
  card.append(cardInner);
  container.append(card);
}

// initialiseRecipeView(
//   0,
//   "https://spoonacular.com/recipeImages/715538-556x370.jpg",
//   "What to make for dinner tonight?? Bruschetta Style Pork & Pasta",
//   true,
//   12,
//   45,
//   "715538"
// );

// if recipe
function fetchRecipes() {
  console.log("Started fetching recipes");
  fetch(
    `${recipesAPI}?limitLicense=true&tags=${query}&number=10&apiKey=b2a9988857174ce09bca833cfc9bb5f4`,
    {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
    }
  )
    .then(function (response) {
      if (!response.ok) {
        return console.error("Something went wong! Recipes", response.json());
      }
      return response.json();
    })
    .then(function (data) {
      recipeData = data.recipes;
    })
    .then(function () {
      for (let i = 0; i < recipeData.length; i++) {
        initialiseRecipeView(
          i,
          recipeData[i].image,
          recipeData[i].title,
          recipeData[i].vegan,
          recipeData[i].extendedIngredients.length,
          recipeData[i].servings,
          recipeData[i].id
        );
      }
    });
}
// fetchRecipes();

// update document

// manage input

// helper functions
// manage ratings color based on the value
// update ratings box background color based on the value
// function setRestaurantImg(el, blob) {
//   let urlCreator = window.URL || window.webkitURL;
//   let img = urlCreator.createObjectURL(blob);
//   el.addClass(`bg-[url('${img}')]`);
// }
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
//
function setOpenOrClosedColor(bool) {
  let isOpen = $("<i>").addClass("fas fa-door-open");
  let isClosed = $("<i>").addClass("fas fa-door-closed");
  if (b) {
    return isOpen;
  } else {
    return isClosed;
  }
}
// manage span background color based on boolean value
