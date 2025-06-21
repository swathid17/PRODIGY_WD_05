const apiKey = "57d6323a09d2df68f537171a0b52dab4"; 
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.getElementById("weatherIcon"); 

searchBtn.addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) return alert("Please enter a city name");

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
        
            if (data.cod !== 200) {
                alert(`Error: ${data.message || "City not found or API error."}`);
                document.getElementById("weatherBox").style.display = "none"; 
                return; 
            }

            document.querySelector(".city").textContent = `📍 ${data.name}`;
            const today = new Date();
            document.querySelector(".date").textContent = today.toLocaleDateString();
            document.querySelector(".day").textContent = today.toLocaleDateString('en-US', { weekday: 'long' });
            document.querySelector(".temperature").textContent = `${Math.round(data.main.temp)}°`;
            document.querySelector(".feels-like").textContent = `🌡️ Feels like ${Math.round(data.main.feels_like)}°`;
            document.querySelector(".weather-condition").textContent = data.weather[0].description;

            
            const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            document.querySelector(".sunrise span").textContent = sunrise;
            document.querySelector(".sunset span").textContent = sunset;
            document.querySelector(".humidity span").textContent = `${data.main.humidity}%`;
            document.querySelector(".visibility span").textContent = `${data.visibility / 1000} km`; 
            document.querySelector(".wind span").textContent = `${data.wind.speed} km/h`;
            const condition = data.weather[0].main.toLowerCase();

            if (condition.includes("cloud")) {
                weatherIcon.src = "images/cloudy.svg";
            } else if (condition.includes("rain") || condition.includes("drizzle") || condition.includes("thunderstorm")) {
                weatherIcon.src = "images/rainy.svg";
            } else if (condition.includes("clear")) {
                weatherIcon.src = "images/sunny.svg";
            } else {
                
                weatherIcon.src = "images/default.svg";
            }

           
            document.getElementById("weatherBox").style.display = "flex";
        })
        .catch(err => {
          
            alert("Could not fetch weather data. Please check city name or your internet connection: " + err.message);
            document.getElementById("weatherBox").style.display = "none"; 
        });
});