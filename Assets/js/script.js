// create DOM elements vor all IDs
var searchFormEl = document.querySelector('#search-form');
var searchInputEl = document.querySelector('#search-input');
var searchBtnEl = document.querySelector('#fetch-button');
var searchHistoryEl = document.querySelector('#search-history');
var searchHistoryListEl = document.querySelector('#search-history-list');
var currentWeatherEl = document.querySelector('#current-weather');

var cityNameEl = document.querySelector('#city-name');
var dateEl = document.querySelector('#date');
var faviconEl = document.querySelector('#favicon');
var temperatureEl = document.querySelector('#temperature');
var humidityEl = document.querySelector('#humidity');
var windSpeedEl = document.querySelector('#wind-speed');
var forecastEl = document.querySelector('#forecast');
var forecastCardsEl = document.querySelector('#forecast-cards');

// API variables created
var weatherAPIKey = "fa91889f3e94337a7424b4068b6b64dc";

var formSubmitHandler = function(event){
  event.preventDefault();

  var city  = searchInputEl.value.trim();

  if (city){
    getCityResults(city);

    currentWeatherEl.textContent = "";
    searchInputEl.value = "";
  } else {
    alert('please enter a valid city');
  }
};

searchFormEl.addEventListener('submit',formSubmitHandler);


//var limit = 5;

//var fetchButton = document.getElementById('fetch-button');

// using the geocoding API allows users to time in a city name to fetch results rather than long/lat inputs.
//var geocodingURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=" + limit + "&appid=" + weatherAPIKey;

var getCityResults = function(user) {

  var geocodingURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + user + "&appid=" + weatherAPIKey;
  
  console.log(geocodingURL);

  fetch(geocodingURL)
    .then(function(response){
      console.log(response)
      return response.json();
      if(response.ok) {
        response.json().then(function(data){
          displayWeather(data,user);
        });
      } else {
        alert('Error: '+ response.statusText);
      }
    })
    .catch(function(error){
      alert('unable to retrieve city weather report');
    });
};

var displayWeather = function (repos, searchTerm) {
  if (repos.length === 0) {
    currentWeatherEl.textContent = 'No data found.';
    return;
  }
}


