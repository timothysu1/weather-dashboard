var apiKey = "d17b385827453e64acea3cc46849537a";
var cityContainerEl = document.querySelector("#city-container");
var fiveDayContainerEl = document.querySelector(".five-day-container");
var cityFormEl = document.querySelector("#city-form");
var currentWeather = document.querySelector(".current-weather");
var cityInput = document.querySelector("#city")
var row = document.querySelector(".row")
var h4 = document.querySelector("h4")

//Submit desired city for search
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

//turn city into button

var cityArray = [];

var cityButtons = function (arr) {
  // if(!cityArray.includes(city)){
  // cityArray.push(city);
  //}
  cityContainerEl.textContent = "";
  //console.log(cityArray)
  if (arr) {
    for (var i = 0; i < arr.length; i++) {
      var liEl = document.createElement('li');
      liEl.classList.add('list-group-item', 'my-1', 'border');
      liEl.textContent = arr[i]
      cityContainerEl.appendChild(liEl);
    }
  }
}

//changes city weather on click
var cityBtnClick = function (event) {
  if (event.target.tagName === 'LI') {
    console.log(event.target.textContent)
    currentWeather.textContent = "";
    fiveDayContainerEl.textContent = "";
    getCity(event.target.textContent);
  }
};

// WORK ON!!!!!!!!!
//save city to local storage
var citySaveLocal = function (city) {
  localStorage.setItem('cityStringify', JSON.stringify(city));
}

//render local storage
var cityRenderLocal = function () {
  cityArrayPrev = JSON.parse(localStorage.getItem('cityStringify'));
  cityButtons(cityArrayPrev);
}
cityRenderLocal();

// gets longitude and latitude of desired city
var getCity = function (city) {
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
  console.log(cityName + ': ' + lon + ', ' + lat)

  // convert longitude and latitude to local weather
  var apiUrlCurrnet = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

  fetch(apiUrlCurrnet).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);

        //creates array of cities


        if (!cityArray.includes(cityName)) {
          cityArray.push(cityName);
        }

        displayCurrent(data, cityName);
        cityButtons(cityArray);
        citySaveLocal(cityArray);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
  //convert to 5 day weather
  var apiUrlFive = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

  fetch(apiUrlFive).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayFiveDay(data);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

// Show current weather
var displayCurrent = function (weather, cityName) {
  //convert to fahrenheit 
  var temp = Math.round(((weather.main.temp - 273.15) * (9 / 5)) + 32);
  var date = dayjs(weather.coord.dt).format('M/D/YYYY');
  var wind = weather.wind.speed;
  var humidity = weather.main.humidity;
  var weatherIcon = 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '.png';
  console.log(cityName, temp, date, wind, humidity);

  //Card for current weather
  var cardCurrent = document.createElement('div');
  cardCurrent.classList.add('d-flex', 'flex-column', 'card');

  //Time n Place 
  var timePlaceEl = document.createElement('h2');
  timePlaceEl.classList.add('m-2');
  timePlaceEl.textContent = cityName + ' (' + date + ') '

  // Weather Icon
  var iconEl = document.createElement("img");
  iconEl.setAttribute("src", weatherIcon);
  timePlaceEl.append(iconEl);

  cardCurrent.appendChild(timePlaceEl);
  // add cardCurrent to html
  currentWeather.appendChild(cardCurrent);

  // Temperature
  var tempEl = document.createElement('div');
  tempEl.classList.add('m-2');
  tempEl.textContent = 'Temperature: ' + temp + '°' + 'F';
  cardCurrent.appendChild(tempEl);
  // Wind
  var windEl = document.createElement('div');
  windEl.classList.add('m-2');
  windEl.textContent = 'Wind: ' + wind + 'MPH';
  cardCurrent.appendChild(windEl);
  // Humidity
  var humidityEl = document.createElement('div');
  humidityEl.classList.add('m-2');
  humidityEl.textContent = 'Humidity: ' + humidity + '%';
  cardCurrent.appendChild(humidityEl);
}

//Show 5 day weather
var displayFiveDay = function (weather) {
  var fiveDayArray = weather.list;
  console.log(fiveDayArray);

  h4.textContent = '5 Day Forecast'


  for (i = 7; i < 40; i = i + 8) {
    var forecast = weather.list[i]
    var temp = Math.round(((forecast.main.temp - 273.15) * (9 / 5)) + 32);
    var date = dayjs(forecast.dt_txt).format('M/D');
    var wind = forecast.wind.speed;
    var humidity = forecast.main.humidity;
    var weatherIcon = 'http://openweathermap.org/img/wn/' + forecast.weather[0].icon + '.png';

    // 5 day forecast card
    var forecastCard = document.createElement('div');
    forecastCard.classList.add('d-flex', 'card', 'flex-column',);

    //Time
    var timePlaceEl = document.createElement('h2');
    timePlaceEl.classList.add('m-2');
    timePlaceEl.textContent = date

    // Weather Icon
    var iconEl = document.createElement("img");
    iconEl.setAttribute("src", weatherIcon);
    timePlaceEl.append(iconEl);

    forecastCard.appendChild(timePlaceEl);
    fiveDayContainerEl.appendChild(forecastCard);

    // Temperature
    var tempEl = document.createElement('div');
    tempEl.classList.add('m-2');
    tempEl.textContent = 'Temperature: ' + temp + '°' + 'F';
    forecastCard.appendChild(tempEl);
    // Wind
    var windEl = document.createElement('div');
    windEl.classList.add('m-2');
    windEl.textContent = 'Wind: ' + wind + 'MPH';
    forecastCard.appendChild(windEl);
    // Humidity
    var humidityEl = document.createElement('div');
    humidityEl.classList.add('m-2');
    humidityEl.textContent = 'Humidity: ' + humidity + '%';
    forecastCard.appendChild(humidityEl);

  }


}

var init = function () {
  var storedCity = JSON.parse(localStorage.getItem('cityStringify'));
  if (storedCity !==null) {
    cityArray = storedCity;
  }
}

init();

cityFormEl.addEventListener('submit', citySubmit);
cityContainerEl.addEventListener('click', cityBtnClick);
