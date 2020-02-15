
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  let weekday = weekdays[date.getDay()];
  let day = date.getDate();
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let month = months[date.getMonth()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours<10) {
    hours = `0${hours}`;
  }
  if (minutes <10) {
    minutes = `0${minutes}`;
  }
return `${weekday}, ${day} ${month}, ${hours}:${minutes}`;
}

function showWeather(response) {
  document.querySelector("#city-display").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature-value").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#weather-description-display").innerHTML = response.data.weather[0].description;
  document.querySelector("#time-stamp-display").innerHTML = formatDate(response.data.dt*1000);
  document.querySelector("#main-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#main-icon").setAttribute("alt", response.data.weather[0].description);
}

function getTemperature(city) {
if (city) {
  let apiKey = "dc3cada4523181d62d387960cea623b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showWeather);
}}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searched-city").value;
  getTemperature(searchInput);
}

  
function getCurrentTemperature(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "dc3cada4523181d62d387960cea623b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showWeather);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getCurrentTemperature);
}

function displayCelsiusTemperature(event){
  event.preventDefault();
  celsiusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature-value");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitButton.classList.add("active");
  celsiusButton.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature-value");
  let fahrenheitTemperature = (celsiusTemperature * 9)/5+32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", handleSubmit);

let button = document.querySelector("#button-current-location");
button.addEventListener("click", getCurrentLocation);

let celsiusButton = document.querySelector("#celsius-button");
celsiusButton.addEventListener("click", displayCelsiusTemperature);

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", displayFahrenheitTemperature);

getTemperature("New York");