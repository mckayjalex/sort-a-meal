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
