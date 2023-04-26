// create DOM elements vor all IDs
$(function () {
  var searchFormEl = document.querySelector("#search-form");
  var searchInputEl = document.querySelector("#search-input");
  var forecastCardsEl = $("#forecast-cards");
  var fiveForecastCardsEl = $("#forecast-cards-small");

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

// Function to save search query and result in local storage
function saveSearchResult(query, result) {
  localStorage.setItem(query, JSON.stringify(result));
}

// Function to retrieve all keys from local storage
function getSearchHistory() {
  var keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    keys.push(localStorage.key(i));
  }
  return keys;
}
//      <h3>Search History</h3>
// <ul class="list-group list-group-flush" id="search-history-list">
// <li class="list-group-item"></li>
// <li class="list-group-item"></li>
// <li class="list-group-item"></li>
// <li class="list-group-item"></li>
// <li class="list-group-item"></li>
// </ul>// 

// Function to retrieve weather data from local storage
function getSearchResult(query) {
  var result = localStorage.getItem(query);
  return result ? JSON.parse(result) : null;
}

// Example usage
var searchQuery = '';
var weatherData = {};
saveSearchResult(searchQuery, weatherData);

var previousSearches = getSearchHistory(); 
var result = getSearchResult('');



  //var limit = 5;

  //var fetchButton = document.getElementById('fetch-button');

  // using the geocoding API allows users to time in a city name to fetch results rather than long/lat inputs.
  //var geocodingURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=" + limit + "&appid=" + weatherAPIKey;

  var getCityResults = function (user) {
    var geocodingURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      user +
      "&appid=" +
      weatherAPIKey +
      "&units=metric";

    //console.log(geocodingURL);

    fetch(geocodingURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        // showing current weather

        var lat = data.coord.lat;
        var lon = data.coord.lon;

        var currentWeatherCard = `<h2>Current Weather: </h2>
          <img class="" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Card image cap"  width = 10%>
          <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">Temperature: ${data.main.temp} °C</p>
            <p class="card-text">Humidity: ${data.main.humidity} %</p>
            <p class="card-text">Wind-Speed: ${data.wind.speed} km/h</p>
          </div>`;

        forecastCardsEl.append(currentWeatherCard);

        displayForcast(user);

        getFiveDayForecast(user, lat, lon);
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

  var getFiveDayForecast = function (city, lat, lon) {
    var fiveDayForecastURL =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      weatherAPIKey +
      "&units=metric";

    console.log(fiveDayForecastURL);

    fetch(fiveDayForecastURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        // showing current weather

        console.log(data.list[0].weather[0].icon);

        var fiveDayForecastCard = `
        <h3>5-Day Forecast:</h3>
        <div class="card-group" id="forecast-cards-small">`;

        for (var i = 0; i < data.list.length; i += 8) {
          fiveDayForecastCard += `
          <div class="card">
            
          <img class="" src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt="Card image cap"  width = 40%>

            
            <div class="card-body">
              <h5 class="card-title">Date: ${data.list[i].dt_txt}</h5>
              <p class="card-text">Temperature: ${data.list[i].main.temp} °C</p> 
              <p class="card-text">Humidity: ${data.list[i].main.humidity} %</p> 
              <p class="card-text">Wind-Speed: ${data.list[i].wind.speed} km/h</p> 
            </div>
          </div>`;
        }

        fiveForecastCardsEl.append(fiveDayForecastCard);

        // displayFiveDayForcast(user);
      })
      .catch(function (error) {
        if (error) throw error;
      });
  };
  var displayFiveDayForcast = function (userCity) {
    var fiveDayForecastURL =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      weatherAPIKey +
      "&units=metric";
  };
});

//https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=fa91889f3e94337a7424b4068b6b64dc&units=metric
