// define a variable for coordinates
var coordinates;
// get the user location to set the value for the variable
function getUserLocation() {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var location = pos.coords;
    coordinates = `${location.latitude},${location.longitude}`;
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
}





// var sort = document.getElementById("sortbtn");

// sort.addEventListener("click", text());

// function test() {

//     console.log("clicked")
// }

// test = 'https://www.sortameal.com/categories.html/type/restaurant/Calzon'
// https://www.sortameal.com/index.html
// https://www.sortameal.com/home.html
// https://www.sortameal.com/categories.html/type/recipe/rice


// document.location.href.split('/').reverse()[0]



// /categories.html?type:restaurant


// categories.html ? type : recipe

// var item;
// if(categories.html == true){
//     item = type;
// } else {
//     item = recipe;
// }

// let x;

// if(x > 0) {
//     return 
// }