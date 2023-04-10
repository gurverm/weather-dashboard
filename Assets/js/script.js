
// API variables created
var weatherAPIKey = "fa91889f3e94337a7424b4068b6b64dc";

var city = document.querySelector('#search-form');
var limit = 5;

var fetchButton = document.getElementById('fetch-button');

// using the geocoding API allows users to time in a city name to fetch results rather than long/lat inputs.
var geocodingURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=" + limit + "&appid=" + weatherAPIKey;

var geocodingURL = "api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="{API key}
// fetch(geocodingURL);
console.log(geocodingURL);

function getApi() {
  fetch(geocodingURL)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log(data)
    for(var i = 0; i < data.length; i++) {
      var createTableRow = document.createElement('tr');
      var tableData = document.createElement('td');

      createTableRow.appendChild(tableData);
      tableBody.appendChild(createTableRow);
    }
  })
}
fetchButton.addEventListener('submit', getApi);




