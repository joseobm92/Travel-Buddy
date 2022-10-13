var aviationApiKey = "7816c8081349207f6be21d8c375a0feb";
var weatherApiKey = `6735dc29946d3cda39fe5ca05b775eab`;
var aviationApiUrl = `http://api.aviationstack.com/v1/flights?access_key=${aviationApiKey}`;
var geoCodingUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid=${weatherApiKey}`
//var weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude=minutely,hourly,alerts&appid=${weatherApiKey}`;

console.log(aviationApiUrl);


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

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function showLocation(pos) {
    const coords = pos.coords;
  
    console.log(pos);
    console.log(coords);
    console.log(`Latitude : ${coords.latitude}`);
    console.log(`Longitude: ${coords.longitude}`);

    var weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coords.latitude}&lon=${coords.longitude}&units=imperial&exclude=minutely,hourly,alerts&appid=${weatherApiKey}`;
    

    
    console.log(weatherApiUrl);
    
    fetch(weatherApiUrl)
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
    
    geoCodingUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&limit=5&appid=${weatherApiKey}`;

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


}
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(showLocation, error, options);