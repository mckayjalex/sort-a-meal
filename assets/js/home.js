// devine a variable for the url
var url = "/categories.html";
// define a variable for coordinates
var coordinates;
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
  if (coordinates) {
    url = url + "?type=recipe";
    url = url + `&coordinates=${coordinates}`;
    window.location = url;
  } else alert("Location is not defined");
});

$("#restaurant").on("click", function () {
  if (coordinates) {
    url = url + "?type=restaurant";
    url = url + `&coordinates=${coordinates}`;
    window.location = url;
  } else alert("Location is not defined");
});
