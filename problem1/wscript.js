const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

const API_KEY = '55c2535958974d35ad645019242904';
const URL = 'https://api.weatherapi.com/v1';

form.addEventListener('submit', (b) => {
    b.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city)
        getForecast(city);
    } else {
        alert('Not a valid city, please try again.');
    }
});

async function getWeather(city) {
    const response = await fetch(`${URL}/current.json?key=${API_KEY}&q=${city}`);
    const data = await response.json();
    displayWeather(data);
}

async function getForecast(city) {
    const response = await fetch(`${URL}/forecast.json?key=${API_KEY}&q=${city}&days=5`);
    const data = await response.json();
    displayForecast(data);
}

function displayWeather(data) {
    weatherInfo.innerHTML = `
        <h2>Today in ${data.location.name}, ${data.location.country}</h2>
        <p>Current Time: ${data.location.localtime}</p>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <img id="weatherIcon" src="https:${data.current.condition.icon}" alt="Weather Icon">
        <p>Condition: ${data.current.condition.text} </p>
        <p>Humidity: ${data.current.humidity}%</p>
    `;

}

function displayForecast(data) {
    const forecastDays = data.forecast.forecastday;
    let forecastHTML = '<h3>5-Day Forecast:</h3>';
    forecastHTML += '<table>';
    forecastHTML += `<tr><th>Date</th>
                     <th>High (°C)</th>
                     <th>Low (°C)</th>
                     <th>Overcast</th></tr>`;
    forecastDays.forEach(day => {
        forecastHTML += `
            <tr>
                <td>${day.date}</td>
                <td>${day.day.maxtemp_c}</td>
                <td>${day.day.mintemp_c}</td>
                <td><img src="https:${day.day.condition.icon}" alt="Weather Icon">${day.day.condition.text} </td>
            </tr>
        `;
    });
    forecastHTML += '</table>';
    forecastInfo.innerHTML = forecastHTML;
}