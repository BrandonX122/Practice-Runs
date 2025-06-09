const apiKey = "";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status === 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    } else {
        document.querySelector('.error').style.display = 'none';
        document.querySelector('.weather').style.display = 'block';
    }
    let data = await response.json();
    //easier to handle HTTP request, fetch() is a get request to the API
    console.log(data);

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°F"; 
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + ' MPH';


}

searchBtn.addEventListener('click', () => {
    const cityName = searchBox.value;
    checkWeather(cityName);
});
