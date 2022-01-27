// devine variables
var url = "/categories.html";
var coordinates;
var modal = document.getElementById("modal");
var redbox = document.getElementById("redbox");

modal.style.display = "none";

// get the user location to set the value for the variable
getUserLocation();
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

//once coodinates variable has been set, allow onclick function for recipe and restarant
//add recipe/restaurant url params to the end of url, then add coords to end

$("#recipe").on("click", function () {
  url = url + "?type=recipe";
  window.location = url;
});

$("#restaurant").on("click", function () {
  if (coordinates) {
    url = url + "?type=restaurant";
    url = url + `&coordinates=${coordinates}`;
    window.location = url;
  } else modal.style.display = "block";
});

//Pull up a modal over the Sort a restaurant, until coords are set.

check();

function check() {
  if (!coordinates) {
    setInterval(checkCoordinates, 1000);
  } else {
    redbox.style.display = "none";
  }
}

//Call a function that checks every second for coordinates. Once it has coordiantes, it clears the model.

function checkCoordinates() {
  check();
}

$("#modal-click").on("click", function () {
  getUserLocation();
  modal.style.display = "none";
});
