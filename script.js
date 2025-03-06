const API_KEY = "74eb9c0415bdebbf3dfe446ddd81aab3"; // Your OpenWeatherMap API Key

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const weatherContainer = document.getElementById("weatherContainer");

    searchButton.addEventListener("click", () => {
        const city = searchInput.value.trim();
        if (city !== "") {
            fetchWeather(city);
        }
    });

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const city = searchInput.value.trim();
            if (city !== "") {
                fetchWeather(city);
            }
        }
    });

    function fetchWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => {
                weatherContainer.innerHTML = `<p class="error">Error fetching weather data. Please try again.</p>`;
                console.error("Error:", error);
            });
    }

    function displayWeather(data) {
        if (data.cod !== 200) {
            weatherContainer.innerHTML = `<p class="error">City not found. Please enter a valid city name.</p>`;
            return;
        }

        const { name, main, weather, wind } = data;
        weatherContainer.innerHTML = `
            <div class="weather-card">
                <h2>${name}</h2>
                <p><strong>Temperature:</strong> ${main.temp}°C</p>
                <p><strong>Feels Like:</strong> ${main.feels_like}°C</p>
                <p><strong>Humidity:</strong> ${main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
                <p><strong>Weather:</strong> ${weather[0].main} - ${weather[0].description}</p>
                <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="Weather Icon">
            </div>
        `;
    }
});
