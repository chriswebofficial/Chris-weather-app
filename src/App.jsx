
import { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = "66d79c2a3c990b267456b192249499a6";

  const getWeather = async () => {
    if (!city) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const getLocalTime = (timezone) => {
    const localTime = new Date(Date.now() + timezone * 1000 - new Date().getTimezoneOffset() * 60000);
    return localTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white px-4 overflow-hidden">
      {/* 🔹 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔹 Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 -z-10"></div>

      {/* 🔹 App Content */}
      <h1 className="text-4xl font-bold mb-6">Weather App 🌤️</h1>

      <div className="flex gap-3 mb-5">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getWeather()}
          className="p-3 rounded-lg text-amber-50 outline-none"
        />
        <button
          onClick={getWeather}
          className="bg-yellow-400 hover:bg-yellow-500 text-amber-50 font-semibold px-5 py-3 rounded-lg"
        >
          Search
        </button>
      </div>

      {/* 🔹 Loading Spinner */}
      {loading && <p className="text-yellow-300 animate-pulse">Loading...</p>}

      {error && <p className="text-red-300">{error}</p>}

      {weather && (
        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl text-center shadow-lg mt-3">
          <h2 className="text-3xl font-bold">{weather.name}</h2>
          <p className="text-lg mt-2 capitalize">{weather.weather[0].description}</p>
          <p className="text-5xl font-semibold mt-4">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="mt-2 text-lg">
            🕒 Local Time: {getLocalTime(weather.timezone)}
          </p>
        </div>
      )}

      {/* 🔹 Footer with your contact info */}
      <footer className="absolute bottom-4 text-sm text-gray-300 text-center">
        <p>Developed by <span className="font-semibold text-amber-50">BALOGUN CHRISTOPHER</span></p>
        <p>Email: <a href="mailto:christoonz@gmail.com" className="text-amber-50 hover:underline">christoonz@gmail.com</a></p>
        <p>Phone: <span className="text-amber-50">09039550193</span></p>
      </footer>
    </div>
  );
}
