var apiKey = "d17b385827453e64acea3cc46849537a";
var cityContainerEl = document.querySelector("#city-container");
var fiveDayContainerEl = document.querySelector(".five-day-container");
var cityFormEl = document.querySelector("#city-form");
var currentWeather = document.querySelector(".current-weather");
var cityInput = document.querySelector("#city")

var citySubmit = function (event) {
  event.preventDefault();

  var city = cityInput.value.trim();
  if (city) {
    getCity(city);

    currentWeather.textContent = "";
    fiveDayContainerEl.textContent = "";
    cityInput.value = "";
  } else {
    alert("Please enter a city")
  }

};

var cityBtnClick = function (event) {

};
// gets longitude and latitude of desired city
var getCity = function (city) {
  console.log(city);
  var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        getCurrentWeather(data)
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

// convert longitude and latitude to local weather

var getCurrentWeather = function (city) {
  if (city.length === 0) {
    currentWeather.textContent = "City not found";
    return;
  }

  var lon = city[0].lon;
  var lat = city[0].lat;
  var cityName = city[0].name;
  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
  console.log(cityName + ': ' + lon + ', ' + lat)

  fetch(apiUrl).then(function(response){
    if (response.ok){
      response.json().then(function(data){
        console.log(data);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};



cityFormEl.addEventListener('submit', citySubmit);



