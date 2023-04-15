const weatherDiv = document.getElementById("weather");
const form = document.querySelector("form");


form.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = document.getElementById("location").value;
  const unit = document.getElementById("unit").value;
  const url = "http://localhost:5000/weather";
  const data = { location, unit };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const temp = Math.round(data.main.temp);
      const description = data.weather[0].description;
      const cityName = data.name;
      const country = data.sys.country;
      const feelsLike = Math.round(data.main.feels_like);
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

      let icon;
      if (temp >= 30) {
        icon = "☀️";
      } else if (temp <= 0) {
        icon = "❄️";
      } else {
        icon = "🌤️";
      }

      weatherDiv.innerHTML = `
          <p>${icon} The temperature in ${cityName}, ${country} is ${temp} degrees ${unit === "metric" ? "Celsius" : "Fahrenheit"} with ${description}.</p>
          <p>${icon} Feels like ${feelsLike} degrees ${unit === "metric" ? "Celsius" : "Fahrenheit"}.</p>
          <p>💧 Humidity is ${humidity}%.</p>
          <p>💨 Wind speed: ${windSpeed} m/s.</p>
          <p>🌅 Sunrise is at ${sunrise}.</p>
          <p>🌇 Sunset is at ${sunset}.</p>
        `;
    })
    .catch((error) => {
      weatherDiv.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    });
});
