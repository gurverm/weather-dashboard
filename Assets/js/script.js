
// API variables created
var weatherAPIKey = "19b0fd9b15ce21fd2b0d022f1d7f1a64";

var city;
var limit = 5;


// using the geocoding API allows users to time in a city name to fetch results rather than long/lat inputs.
var geocodingURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=" + limit + "&appid=" + weatherAPIKey;
fetch(geocodingURL);





