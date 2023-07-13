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

var getCity = function (city) {
  console.log(city);
};

cityFormEl.addEventListener('submit', citySubmit);



