async function getWeather() {
      const city = document.getElementById("cityInput").value.trim();
      const apiKey = "44aa6714457beeeb162370057824d42e"; // Replace with your OpenWeatherMap API Key
      const weatherResult = document.getElementById("weatherResult");

      if (!city) {
        weatherResult.innerHTML = "<p class='error'>Please enter a city name.</p>";
        return;
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},IN&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 404 || data.cod === "404") {
          weatherResult.innerHTML = `<p class="error">City not found.</p>`;
          return;
        }

        const output = `
          <h3>${data.name}, ${data.sys.country}</h3>
          <p>🌡️ Temperature: ${data.main.temp} °C</p>
          <p>🌩️ Weather: ${data.weather[0].description}</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
          <p>❄️ Wind: ${data.wind.speed} m/s</p>
        `;

        weatherResult.innerHTML = output;
      } catch (error) {
        weatherResult.innerHTML = `<p class="error">Error fetching data.</p>`;
        console.error(error);
      }
    }
