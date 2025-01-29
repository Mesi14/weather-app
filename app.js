const api_key = '';
const city = document.getElementById("city-name");
const searchBtn = document.getElementById("search");
const info = document.querySelector(".weather");
const current_temp = document.querySelector(".temp");
const current_city = document.querySelector(".city");
const minTemp = document.querySelector(".min_temp");
const maxTemp = document.querySelector(".max_temp");
const windSpeed = document.querySelector(".wind")
const humidity = document.querySelector(".humidity");

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getWetherData(city.value);
});

const showData = data => {
    current_temp.innerHTML = data.temp + "°C";
    minTemp.innerHTML = data.min_temp + "°C";
    maxTemp.innerHTML = data.max_temp + "°C";
    humidity.innerHTML = data.humidity + "%";
    windSpeed.innerHTML = data.wind_speed + "km/h";

    info.style.visibility = "visible";
}


// cloud_pct
// : 
// 75
// feels_like
// : 
// 4
// humidity
// : 
// 76
// max_temp
// : 
// 8
// min_temp
// : 
// 7
// sunrise
// : 
// 1738135573
// sunset
// : 
// 1738167645

// wind_degrees
// : 
// 240
// wind_speed
// : 
// 7.2

const getWetherData = async city => {
    let url = `https://api.api-ninjas.com/v1/weather?city=${city}`
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-Api-Key": api_key
            }
        },)
        const res = await response.json();
        console.log("Success", res)
        city.innerHTML = city.value
        showData(res);

    }    
    catch(err) {
        console.log("Sorry", err);
    };
};
