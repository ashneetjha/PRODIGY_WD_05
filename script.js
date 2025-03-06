const apiKey = "74eb9c0415bdebbf3dfe446ddd81aab3";

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                alert("City not found. Please try again.");
                return;
            }

            const weatherContainer = document.getElementById("weatherContainer");
            const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            weatherContainer.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <h3>${data.weather[0].main} - ${data.weather[0].description}</h3>
                <img src="${iconUrl}" alt="Weather Icon">
                <h3>🌡️ Temperature: ${data.main.temp}°C</h3>
                <h3>💨 Wind Speed: ${data.wind.speed} m/s</h3>
                <h3>💧 Humidity: ${data.main.humidity}%</h3>
            `;
        })
        .catch(error => {
            alert("Error fetching weather data. Please try again.");
            console.error("Fetch error:", error);
        });
}
