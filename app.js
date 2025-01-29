const api_key = '';
const city = document.getElementById("city-name");
const searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(city.value);
});

let url = `https://api.api-ninjas.com/v1/weather?city=${city.value}`
const getWetherData = city => {
    try {
        const response = await fetch(url)
    }    
};
