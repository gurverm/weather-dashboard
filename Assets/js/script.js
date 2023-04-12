// create DOM elements vor all IDs
$(function () {
  var searchFormEl = document.querySelector("#search-form");
  var searchInputEl = document.querySelector("#search-input");
  // var searchBtnEl = document.querySelector("#fetch-button");
  // var searchHistoryEl = document.querySelector("#search-history");
  // var searchHistoryListEl = document.querySelector("#search-history-list");
  // var currentWeatherEl = document.querySelector("#current-weather");

  // var cityNameEl = document.querySelector("#city-name");
  // var dateEl = document.querySelector("#date");
  // var faviconEl = document.querySelector("#favicon");
  // var temperatureEl = document.querySelector("#temperature");
  // var humidityEl = document.querySelector("#humidity");
  // var windSpeedEl = document.querySelector("#wind-speed");
  // var forecastEl = document.querySelector("#forecast");
  var forecastCardsEl = $("#forecast-cards");

  // API variables created
  var weatherAPIKey = "fa91889f3e94337a7424b4068b6b64dc";

  var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = searchInputEl.value.trim();

    if (city) {
      getCityResults(city);
    } else {
      alert("please enter a valid city");
    }
  };

  searchFormEl.addEventListener("submit", formSubmitHandler);

  //var limit = 5;

  //var fetchButton = document.getElementById('fetch-button');

  // using the geocoding API allows users to time in a city name to fetch results rather than long/lat inputs.
  //var geocodingURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=" + limit + "&appid=" + weatherAPIKey;

  var getCityResults = function (user) {
    var geocodingURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      user +
      "&appid=" +
      weatherAPIKey;

    //console.log(geocodingURL);

    fetch(geocodingURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        // showing current weather

        var currentWeatherCard = `<h2>Current Weather: </h2>
          <img class="card-img-top" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Card image cap"  height="20%" width="20%">
          <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text"></p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>`;

        forecastCardsEl.append(currentWeatherCard);

        displayForcast(user);
      })
      .catch(function (error) {
        if (error) throw error;
      });
  };

  var displayForcast = function (userCity) {
    var geocodingURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      userCity +
      "&appid=" +
      weatherAPIKey;
  };
});


//https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=fa91889f3e94337a7424b4068b6b64dc&units=metric