// devine variables
var url = "/categories.html";
var coordinates;
var modal = document.getElementById("modal");
var redbox = document.getElementById("redbox");
var restarant = document.getElementById("restaurant");

// modal.style.display = "none";
modal.classList.add("hidden");
restarant.style.opacity = "0.1";

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

///add recipe/restaurant url params to the end of url, then add coords to end

$("#recipe").on("click", function () {
  url = url + "?type=recipe";
  window.location = url;
});

$("#restaurant").on("click", function () {
  if (coordinates) {
    url = url + "?type=restaurant";
    url = url + `&coordinates=${coordinates}`;
    window.location = url;
  } else {
    // modal.style.display = "block";
    modal.classList.remove("hidden");
  }
});

$("#modal-click").on("click", function () {
  getUserLocation();
  // modal.style.display = "none";
  modal.classList.add("hidden");
});

//function checks coordinates. Makes restaurant div visible.

check();

function check() {
  if (!coordinates) {
    setInterval(checkCoordinates, 1000);
  } else {
    restarant.style.opacity = "1";
  }
}

function checkCoordinates() {
  check();
}
