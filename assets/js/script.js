// set global api keys & api url 
var aviationApiKey = `3c291d3c8bfd6948b2e381634b73dc41`;
var weatherApiKey = `6735dc29946d3cda39fe5ca05b775eab`;
var googleApiKey = `AIzaSyBUQL-4--T-AVcWTpL6FLw-FpMsIkEpjuU`
var aviationApiUrl = `http://api.aviationstack.com/v1/flights?access_key=${aviationApiKey}`;
var weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat={cityLat}&lon={cityLon}&units=imperial&exclude=minutely,hourly,alerts&appid=${weatherApiKey}`;



// Global DOM elements
var inputEl = $(".input");
var destinationWeatherEl = $("#weather-status-info");
var currentFlightEl = $("#flight-status-info");
var searchHistoryEl = $(".search-history");
var mediaEl = $("#media-section");


var today = moment().format('MMMM Do YYYY');
console.log(today);


// render search history on page 
function renderSearchHistory() {
  // empty the search history container
  searchHistoryEl.empty();

  // loop through the history array creating a button for each item
  for(var i = 0; i < localStorage.length; i ++) {
  
      var flightNum = localStorage.getItem(localStorage.key(i));
      var flightNumBtn = $("<button>").addClass("btn-search-history button is-link is-rounded is-outlined");
      
      flightNumBtn.text(flightNum);

      searchHistoryEl.append(flightNumBtn);
  }
}

// render destination airport weather function
function arrivalWeather(data) {

  // clear container first 
  destinationWeatherEl.empty();

  // weather vars
  var temp = data.current.temp;
  var humidity = data.current.humidity;
  var windSpeed = data.current.wind_speed;
  var desc = data.current.weather[0].description;
  var iconCode = data.current.weather[0].icon;
  var iconImgURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
 
  
  // create elements & set content 
  var arrTempEl = $("<p>").text(`Temperature: ${temp} F`).addClass("title is-5");
  var arrHumidityEl = $("<p>").text(`Humidity ${humidity} %`).addClass("title is-5");
  var arrWindSpeedEl = $("<p>").text(`Windspeed: ${windSpeed} MPH`).addClass("title is-5");
  var arrDescEl = $("<p>").text(`Weather Desc: ${desc}`).addClass("title is-5");
  var arrIconImgEl = $("<img>").attr("src", iconImgURL);

  var h1WeatherEl = $("<h1>").text(`Weather Information`).addClass("title is-2");
  var pWeatherEl = $("<p>").text(`This is the Weather for your destination city:`).addClass("title is-5");

  $(".weather-data").addClass("basic-card-style");
  
  // append elements 
  destinationWeatherEl.append(h1WeatherEl, pWeatherEl, arrIconImgEl, arrTempEl, arrDescEl, arrHumidityEl, arrWindSpeedEl);
 
}

// fetch airport weather data
function airportData(data) {

  // airport lat & long from google maps API
  var lat = data.results[0].geometry.location.lat;
  var lng = data.results[0].geometry.location.lng;

  weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=imperial&exclude=minutely,hourly,alerts&appid=${weatherApiKey}`;
 
  
  // get data from weathermap 
  fetch(weatherApiUrl)
      .then(function (response) {
      if (response.ok) {
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


  fetch(geocodeURl)
    .then(function (response) {
      if (response.ok) {

        response.json().then(function (data) {
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



// render flight data on page function
function renderFlightData(data) {
  // clear container first 
  currentFlightEl.empty();

  // arr flight local variables from data
  var arrAirport = data.data[0].arrival.airport;
  var arrIATA = data.data[0].arrival.iata;
  var terminal = data.data[0].arrival.terminal;
  var gate = data.data[0].arrival.gate;

  // airline, flight num, status & date
  var airline = data.data[0].airline.name;
  var flightNum = data.data[0].flight.iata;
  var flightDate = data.data[0].flight_date;
  var flightStatus = data.data[0].flight_status;

  // departure flight local variables from data
  var depAirport = data.data[0].departure.airport;
  var depIATA = data.data[0].departure.iata;
  var depTerminal = data.data[0].departure.terminal;
  var depGate = data.data[0].departure.gate;


  // create elements & set content
  var h1FlightEl = $("<h1>").text(`Flight Information`).addClass("title is-2");
  var pFlightEl = $("<p>").text(`This is the most up to date information about your current flight:`).addClass("title is-5");

  var airlineEl = $("<p>").text(`Airline: ${airline}`).addClass("title is-5");
  var flightNumEl = $("<p>").text(`Flight Number: ${flightNum}`).addClass("title is-5");
  var flightDateEl = $("<p>").text(`Date: ${flightDate}`).addClass("title is-5");
  
  // departure info vars
  var depTitleEl = $("<h2>").text(`Departure Information`);
  var depAirportEl = $("<p>").text(`Airport: ${depAirport} (${depIATA})`).addClass("title is-5");
  var depTerminalEl = $("<p>").text(`Terminal: ${depTerminal}`).addClass("title is-5");
  var depGateEl = $("<p>").text(`Gate: ${depGate}`).addClass("title is-5");
  
  // arrival info vars
  var arrTitleEl = $("<h2>").text(`Arrival Information`);
  var arrFlightStatusEl = $("<p>").text(`Flight Status: ${flightStatus}`).addClass("title is-5");
  var arrAirportEl = $("<p>").text(`Airport: ${arrAirport} (${arrIATA})`).addClass("title is-5");
  var arrTerminalEl = $("<p>").text(`Terminal: ${terminal}`).addClass("title is-5");
  var arrGateEl = $("<p>").text(`Gate: ${gate}`).addClass("title is-5");

  // create departure info div
  var depInfoEl = $("<div>").addClass("dep-info");
  var arrInfoEl = $("<div>").addClass("arr-info");

  $(".flight-status").addClass("basic-card-style");
 
  // append elements 
  currentFlightEl.append(h1FlightEl, pFlightEl);
  depInfoEl.append(depTitleEl, depAirportEl, depTerminalEl, depGateEl);
  arrInfoEl.append(arrTitleEl, arrAirportEl, arrTerminalEl, arrGateEl);
  currentFlightEl.append(airlineEl, flightNumEl, flightDateEl, arrFlightStatusEl, depInfoEl, arrInfoEl);

  // call render search history & airportlocation
  renderSearchHistory();
  airportLocation(arrIATA);
}

// fetch flight data through input 
function flightData(input) {

  // flight number
  var flightNum = input;

  // save to local storage
  localStorage.setItem(flightNum, flightNum);

  aviationApiUrl = `http://api.aviationstack.com/v1/flights?access_key=${aviationApiKey}&flight_iata=${flightNum}`;

  // get data from weathermap 
  fetch(aviationApiUrl)
      .then(function (response) {
      if (response.ok) {
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

function clearLocalStorage() {
  // clear local storage
  localStorage.clear();
  // render on page
  renderSearchHistory();
}


function handleSearchHistoryBtn() {
  console.log($(this));

  var input = $(this).text();
  console.log(input);

  flightData(input);
}


// flight input search function
function handleFlightSearch() {

  // if no data from user
  if(!inputEl.val()) {
    // please enter valid flight number
    return;
  }
  // fetch flight data 
  var input = inputEl.val();
  // fetch flight data function passing input 
  flightData(input);
}

function toggleModal() {
  mediaEl.toggle();
}

 // Modal functionality 
 $(".modal-background").on('click', () => {
  $(".modal").removeClass("is-active")
})

  
// load local storage on reload
renderSearchHistory();

// event listeners 

// click listener will call handle flight search 
$("#btn-search").on("click", handleFlightSearch);
// clear local storage
$("#btn-clear").on("click", clearLocalStorage);
// toggle modal 
$("#delete-btn").on("click", toggleModal);

// search history button
$(".search-history").on("click", "button", handleSearchHistoryBtn);



