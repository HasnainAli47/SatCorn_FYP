import React, { useState, useEffect } from "react";

const API_KEY = "5835cb0e9b742e9b424d57b5d10bad80";
const GOOGLE_API_KEY = "AIzaSyDMQ9T53DzGbXOtXgrVdBXydpBZN5bgGDs";

const selectContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '450px' // Adjust this width as needed
};

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  color: '#333' // Dark text color
};

const headerStyles = {
  //color: '#007BFF', // Using a Blue color for the header
  borderBottom: '2px solid #007BFF', // Blue underline for emphasis
  paddingBottom: '10px',
  marginBottom: '20px',
  marginTop: '10px'
};

const weatherDataStyles = {
  backgroundColor: '#FFFFFF', // White background for the weather data
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
};

export default function WeatherComponent() {
  const [weatherData, setWeatherData] = useState(null);
  const [placeName, setPlaceName] = useState("");
  const [selectedFarm, setSelectedFarm] = useState("");
  const farmOptions = ["Farm 1", "Farm 2", "Farm 3", "Farm 4"]; // Dummy options


  async function fetchPlaceName(lat, lng) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`);
    const data = await response.json();
    if (data.results && data.results[0]) {
        const addressComponents = data.results[0].address_components;
        
        let city = null;
        let locality = null;
        let subLocality = null;

        for (let component of addressComponents) {
            if (component.types.includes("locality")) {
                city = component.long_name;
            } else if (component.types.includes("sublocality_level_1")) {
                locality = component.long_name;
             }// else if (component.types.includes("sublocality_level_2")) {
            //     subLocality = component.long_name;
            // }
        }

        if (city) {
            return city + (locality ? ` ${locality}` : "") + (subLocality ? ` ${subLocality}` : "");
        } else {
            return null;
        }
    }
    return null;
}


  // Dummy latitude and longitude for New York City
  const lat = 34.0151;
  const lng = 71.5249;

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch the place name
        const name = await fetchPlaceName(lat, lng);
        setPlaceName(name || "Unknown Location");

        // Fetch the weather data
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`);
        const weatherData = await response.json();
        if (weatherData.cod === 200) {
          setWeatherData(weatherData);
        } else {
          console.error("Error from API:", weatherData.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [lat, lng]);



  if (!weatherData) return <p>Loading...</p>;

  return (
    <div style={containerStyles} className="bg-lightBlue-200">
       <div style={selectContainerStyles} className="">
        <label style={{ flexGrow: 1 }} className="text-lg font-semibold">Please select the farm from here:</label>
        <select 
          value={selectedFarm} 
          onChange={(e) => setSelectedFarm(e.target.value)}
          className="bg-white border border-blueGray-50 rounded px-8 py-2 text-black shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"

        >
          <option value="" disabled>Select a farm</option>
          {farmOptions.map((farm) => (
            <option key={farm} value={farm}>{farm}</option>
          ))}
        </select>
      </div>
      <h1 style={headerStyles} className="text-lightBlue-600 text-md font-semibold">Weather Information for {placeName}</h1>
      <div style={weatherDataStyles}>
        {weatherData.weather && weatherData.weather[0] ? (
          <img
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
          />
        ) : null}
        <p>Temperature: {weatherData.main ? weatherData.main.temp : 'N/A'} °C</p>
        <p>Wind Speed: {weatherData.wind ? weatherData.wind.speed : 'N/A'} m/s</p>
        <p>Humidity: {weatherData.main ? weatherData.main.humidity : 'N/A'} %</p>
        {/* OpenWeatherMap does not provide "chances of rain" directly. You can infer it from other data if needed. */}
      </div>
    </div>
  );
}