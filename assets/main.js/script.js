// set global api keys & api url 
var aviationApiKey = `62814f5920de574f5ac12fc46d9bb829`;
var weatherApiKey = `6735dc29946d3cda39fe5ca05b775eab`;
var googleApiKey = `AIzaSyBUQL-4--T-AVcWTpL6FLw-FpMsIkEpjuU`
var aviationApiUrl = `http://api.aviationstack.com/v1/flights?access_key=${aviationApiKey}`;
var weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat={cityLat}&lon={cityLon}&units=imperial&exclude=minutely,hourly,alerts&appid=${weatherApiKey}`;

// not using
// var geoCodingUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid=${weatherApiKey}`
//var cityWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=${weatherApiKey}`;



// Global DOM elements
var inputEl = $(".input");
var currentWeatherEl = $(".current-weather");
var destinationWeatherEl = $(".destination-weather");
var currentFlightEl = $(".current-flight");



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
  var iconCode = data.current.weather[0].icon;
  var iconImgURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
 
  
  // log data 
  console.log(localTemp);
  console.log(localHumidity);
  console.log(localWindSpeed);
  console.log(localDesc);
  console.log(iconCode);

  // create elements & set content 
  var localTempEl = $("<p>").text(`Local Temp: ${localTemp} °F`);
  var localHumidityEl = $("<p>").text(`Local Humidity ${localHumidity} %`);
  var localWindSpeedEl = $("<p>").text(`Local Windspeed: ${localWindSpeed} MPH`);
  var localDescEl = $("<p>").text(`Local Weather Desc: ${localDesc}`);
  var iconImgEl = $("<img>").attr("src", iconImgURL);


  // append elements 
  currentWeatherEl.append(localTempEl, iconImgEl, localHumidityEl, localWindSpeedEl, localDescEl);
 
}


// destination weather function
function arrivalWeather(data) {

  // weather vars
  var temp = data.current.temp;
  var humidity = data.current.humidity;
  var windSpeed = data.current.wind_speed;
  var desc = data.current.weather[0].description;
  var iconCode = data.current.weather[0].icon;
  var iconImgURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
 
  
  // log data 
  console.log(temp);
  console.log(humidity);
  console.log(windSpeed);
  console.log(desc);
  console.log(iconCode);

  // create elements & set content 
  var arrTempEl = $("<p>").text(`Destination Temp: ${temp} F`);
  var arrHumidityEl = $("<p>").text(`Destination Humidity ${humidity} %`);
  var arrWindSpeedEl = $("<p>").text(`Destination Windspeed: ${windSpeed} MPH`);
  var arrDescEl = $("<p>").text(`Destination Weather Desc: ${desc}`);
  var arrIconImgEl = $("<img>").attr("src", iconImgURL);


  // append elements 
  arrTempEl.append(arrIconImgEl);
  destinationWeatherEl.append(arrTempEl, arrHumidityEl, arrWindSpeedEl, arrDescEl);
 
}


function airportData(data) {

  var lat = data.results[0].geometry.location.lat;
  var lng = data.results[0].geometry.location.lng;

  weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=imperial&exclude=minutely,hourly,alerts&appid=${weatherApiKey}`;
 
  
  // get data from weathermap 
  fetch(weatherApiUrl)
      .then(function (response) {
      if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
          
          // call arrival weather and pass data  
          arrivalWeather(data);
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


// fetches airport data through google maps api
function airportLocation(iata) {
  
  var airport = iata;


  var geocodeURl =  `https://maps.googleapis.com/maps/api/geocode/json?address=${airport}&key=${googleApiKey}`;

  console.log(geocodeURl);

  fetch(geocodeURl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
        console.log(data);
        airportData(data);
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




function renderFlightData(data) {

  // flight local variables from data
  var flightStatus = data.data[0].flight_status;
  var arrAirport = data.data[0].arrival.airport;
  var arrIATA = data.data[0].arrival.iata;
  var terminal = data.data[0].arrival.terminal;
  var gate = data.data[0].arrival.gate;

  // logging flight data
  console.log(flightStatus);
  console.log(arrAirport);
  console.log(arrIATA);
  console.log(terminal);
  console.log(gate);

  // create elements & set content 
  var flightStatusEl = $("<p>").text(`Flight Status: ${flightStatus}`);
  var airportEl = $("<p>").text(`Airport: ${arrAirport}`);
  var terminalEl = $("<p>").text(`Terminal: ${terminal}`);
  var gateEl = $("<p>").text(`Gate: ${gate}`);
 
  // append elements 
  currentFlightEl.append(flightStatusEl, airportEl, terminalEl, gateEl);

  airportLocation(arrIATA);
}

// dont forget to add input parameter
function flightData(input) {

  // flight number
  var flightNum = input;

  aviationApiUrl = `http://api.aviationstack.com/v1/flights?access_key=${aviationApiKey}&flight_iata=${flightNum}`;
  console.log(aviationApiUrl);

  // get data from weathermap 
  fetch(aviationApiUrl)
      .then(function (response) {
      if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
      
          // call RenderFlightData
          renderFlightData(data);
          
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




// flight input search function
function handleFlightSearch() {

  // if no data from user
  if(!inputEl.val()) {
    // please enter valid flight number
    console.log(inputEl.val())
    return;
  }
  // fetch flight data 
  var input = inputEl.val();
  console.log(input);
  // fetch flight data function passing input 
  flightData(input);
}




// error function message 
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  }




// calls get client current position 
navigator.geolocation.getCurrentPosition(showLocation, error, options);

// click listener will call handle flight search 
$("#btn-search").click(handleFlightSearch);

  
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
