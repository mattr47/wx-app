var apiKey = "25350eb255dbcceee88e03ea210f3482";
var unit = "f"; // &#8457 Farenheit &#8451 Celsius
var tempD = 0;

if (navigator.geolocation) {
  // geolocation available
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude.toFixed(3);
    var long = position.coords.longitude.toFixed(3);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myWx = JSON.parse(this.responseText);
          tempD = myWx.main['temp'];
          document.getElementById('location').insertAdjacentHTML('beforeend',myWx.name);
          document.getElementById('temperature').insertAdjacentHTML('beforeend',Math.round(myWx.main['temp']) + '&#8457');
          document.getElementById('condition').insertAdjacentHTML('beforeend', myWx.weather[0].main);
          wxIcon(myWx.weather[0].id);
        }
    };
    xmlhttp.open("GET", "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&" + "lon=" + long + "&units=imperial&appid=" + apiKey, true);
    xmlhttp.send();
  });
} else {
  // geolocation not supported
  document.getElementById('wxApi').innerHTML = "Location not available.";
}

window.addEventListener('load',
  function() {
    document.getElementById('far').onclick = function() { tempSwapF() };
    document.getElementById('cel').onclick = function() { tempSwapC() };
});

function tempSwapC() {
    var newTemp = (tempD - 32) * .5556;
    document.getElementById('temperature').innerHTML = 'Current Temp: ' + Math.round(newTemp) + '&#8451';
};

function tempSwapF() {
    document.getElementById('temperature').innerHTML = 'Current Temp: ' + Math.round(tempD) + '&#8457';
};

function wxIcon(code) {
  var dorn= "";
  var prefix = 'wi wi-';
  var today = new Date();
  var hour = today.getHours();
  if (hour > 6 && hour < 20) {
    //Day time
    dorn = "day-";
  } else {
    //Night time
    dorn ="night-";
  }
  var icon = prefix + "owm-" + dorn + code;
  document.getElementById('wxIcon2').className = icon;
}
