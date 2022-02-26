
const region = document.querySelector("#location");
const weather = document.querySelector("#weather");

const API_KEY = "9143b0b17732605ae833d65b34917846";

function geoSuccess(info){
    const lat = info.coords.latitude;
    const lon = info.coords.longitude;
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json())
    .then(data => {
        region.innerText = data.name;
        weather.innerText = `${Math.round(data.main.temp)}℃ , ${data.weather[0].main}`;
    });
}

function geoFail(){
    alert("Can't find you.");
}

navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);