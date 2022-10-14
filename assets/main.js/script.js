// set global api keys & api url 
var aviationApiKey = `7816c8081349207f6be21d8c375a0feb`;
var weatherApiKey = `6735dc29946d3cda39fe5ca05b775eab`;
var aviationApiUrl = `http://api.aviationstack.com/v1/flights?access_key=${aviationApiKey}`;
// var geoCodingUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid=${weatherApiKey}`
var weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat={cityLat}&lon={cityLon}&units=imperial&exclude=minutely,hourly,alerts&appid=${weatherApiKey}`;
var cityWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=${weatherApiKey}`;


var today = moment().format('MMMM Do YYYY');
console.log(today);

// options for client coords 
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
// get client coords function  
function showLocation(pos) {
  const coords = pos.coords;

  console.log(pos);
  console.log(coords);
  console.log(`Latitude : ${coords.latitude}`);
  console.log(`Longitude: ${coords.longitude}`);

  weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coords.latitude}&lon=${coords.longitude}&units=imperial&exclude=minutely,hourly,alerts&appid=${weatherApiKey}`;
  console.log(weatherApiUrl);
  
  // get data from weathermap 
  fetch(weatherApiUrl)
      .then(function (response) {
      if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
          
          // data logs 
          console.log(data);
          console.log(data.current.temp);
          // call local weather function pass in data 
          localWeather(data);
          });
      } 
      else {
          alert('Error: ' + response.statusText);
      }
      })
      .catch(function (error) {
      alert('Unable to connect to Server');
      });
}

// local weather function
function localWeather(data) {

  // local weather vars
  var localTemp = data.current.temp;
  var localHumidity = data.current.humidity;
  var localWindSpeed = data.current.wind_speed;
  var localDesc = data.current.weather[0].description;
  var icon = data.current.weather[0].icon;

 
  // log data 
  console.log(localTemp);
  console.log(localHumidity);
  console.log(localWindSpeed);
  console.log(localDesc);
  console.log(icon);

  // create elements

  // append elements 

  // give elements data/content 

}

function airportLocation() {
  
  var airport = "George Bush Intercontinental";

  aviationApiUrl = `http://api.aviationstack.com/v1/airports?access_key=${aviationApiKey}`;
  console.log(aviationApiUrl);

  

}

airportLocation();

// dont forget to add input parameter
function flightData() {
  // flight number method 1
  
  var flightNum = `UA2261`;
  var airline = 'Frontier'
  aviationApiUrl = `http://api.aviationstack.com/v1/flights?access_key=${aviationApiKey}&flight_iata=${flightNum}`;
  console.log(aviationApiUrl);

  // get data from weathermap 
  fetch(aviationApiUrl)
      .then(function (response) {
      if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
          
          // data logs 
          console.log(data);
          console.log(data.data[0].arrival.airport);
          // call local weather function pass in data 
          //localWeather(data);
          });
      } 
      else {
          alert('Error: ' + response.statusText);
      }
      })
      .catch(function (error) {
      alert('Unable to connect to Server');
      });


}



flightData();

/*
function handleFlightSearch() {

  // if no data from user
  if(!inputEl.value) {
    // please enter valid flight number
    return;
  }
  // fetch flight data 
  var input = inputEl.value;
  flightData(input);

}

*/


// error function message 
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  }




// Input flight number 
// Output the city's data lat, long, city name, city weather, flight status  
// calls get client current position 
navigator.geolocation.getCurrentPosition(showLocation, error, options);

// click listener will call handle flight search 


  
/* generic fetch 
fetch(apiUrl)
.then(function (response) {
  if (response.ok) {
    console.log(response);
    response.json().then(function (data) {
      console.log(data);
    });
  } 
  else {
    alert('Error: ' + response.statusText);
  }
})
.catch(function (error) {
  alert('Unable to connect to Server');
});

*/

/*
    fetch(geoCodingUrl)
    .then(function (response) {
    if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
        console.log(data);
        });
    } 
    else {
        alert('Error: ' + response.statusText);
    }
    })
    .catch(function (error) {
    alert('Unable to connect to Server');
    });
    */