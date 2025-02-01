let api_key = "";
let urlDataRoot = "http://api.openweathermap.org/geo/1.0/direct?q=";
let urlRoot = "https://api.openweathermap.org/data/3.0/onecall?lat=";
const pageBody = document.querySelector('body');
const city = document.getElementById("city-name");
const searchBtn = document.getElementById("search");
const info = document.querySelector(".weather");
const current_temp = document.querySelector(".temp");
const current_city = document.querySelector(".city");
const feels_like = document.querySelector(".feels_like_temp");
const pressure = document.querySelector(".pressure");
const windSpeed = document.querySelector(".wind")
const humidity = document.querySelector(".humidity");
const current_image = document.querySelector(".icon");


const loadConfig = async () => {
    try {
        const resp = await fetch("config/config.json");
        const data = await resp.json();
        api_key = data.api_key
    } catch (error) {
        console.log("Config error", error);
    }
}

loadConfig();

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    current_city.innerHTML = city.value;
    getCityData(city.value);
});

const showData = data => {
    let icon = data.current.weather[0].icon;
    let current_icon = `https://openweathermap.org/img/wn/${icon}@2x.png`
    if(data.current.weather[0].main === 'Clear') {
        document.body.style.backgroundImage = "url('./Assets/Images/sunny.jpeg')";
    } else if(data.current.weather[0].main === 'Rain') {
        document.body.style.backgroundImage = "url('./Assets/Images/rain.jpg')";
    } else if(data.current.weather[0].main === 'Snow') {
        document.body.style.backgroundImage = "url('./Assets/Images/snowfall.jpg')";
    } else if(data.current.weather[0].main === 'Clouds') {
        document.body.style.backgroundImage = "url('./Assets/Images/cloudy.jpg')";
        document.body.style.backgroundSize = 'cover';
    } else {
        console.log("Impossible!");
    }
    current_temp.innerHTML = data.current.temp + "°C";
    feels_like.innerHTML = data.current.feels_like + "°C";
    current_image.src = current_icon;
    pressure.innerHTML = data.current.pressure + "hPa";
    humidity.innerHTML = data.current.humidity + "%";
    windSpeed.innerHTML = data.current.wind_speed + "km/h";
    info.style.visibility = "visible";
}

const getCityData = async cityName => {
    let url = `${urlDataRoot}${cityName}&limit=${2}&appid=${api_key}`
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log("Successful response", result);
        let currLat = Math.round(result[0].lat * 100) / 100;
        let currLon = Math.round(result[0].lon * 100) / 100;
        getWeatherData( currLat, currLon);
    } catch (err) {
        console.log("Data error", err);
    }
}

const getWeatherData = async (lat, lon) => {
    console.log(lat, lon);
    let url = `${urlRoot}${lat}&lon=${lon}&units=metric&appid=${api_key}`;
    try {
        const response = await fetch(url)
        const res = await response.json();
        console.log("Success", res)
        showData(res);
    }    
    catch(err) {
        console.log("The current error: ",  err);
    };
};
