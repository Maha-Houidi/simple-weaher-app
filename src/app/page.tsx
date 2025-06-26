'use client';
import { useState, ChangeEvent } from 'react';
import { fetchWeatherByCity } from './services/weatherService';


export default function Home() {
  const [cityName, setCityName] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };
 
  const handleSearch = async () => {
    if (!cityName.trim()) return;

    setError(null);
    setResult(null);

    try {
      const data = await fetchWeatherByCity(cityName);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Unknown error occurred');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-gray-800'>
      <h1 className='mb-5 text-3xl font-bold text-blue-600 '>Welcome to our weather app</h1>
      <label>Enter the city name: </label> <br />
      <input
        type="text"
        placeholder="type a city name here"
        value={cityName}
        onChange={handleChange}
        className='border border-gray-300 rounded-md p-2 w-full max-w-md'
      />

      <button onClick={handleSearch} className='mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'>Get weather</button>
      {error && (
        <p className="mt-4 text-red-600">
          Error: {error}
        </p>
      )}
      {result && (
        <div className="mt-6 p-6 bg-white rounded-xl shadow-md w-full max-w-md mx-auto text-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            Weather in {result.name}
          </h2>
          <ul className="space-y-2 text-sm">
            <li><strong>Temperature:</strong> {result.main.temp} °C</li>
            <li><strong>Weather:</strong> {result.weather[0].description}</li>
            <li><strong>Humidity:</strong> {result.main.humidity}%</li>
            <li><strong>Wind Speed:</strong> {result.wind.speed} m/s</li>
            <li><strong>Cloudiness:</strong> {result.clouds.all}%</li>
            <li><strong>Visibility:</strong> {result.visibility / 1000} km</li>
            <li><strong>Pressure:</strong> {result.main.pressure} hPa</li>
            <li><strong>Sunrise:</strong> {new Date(result.sys.sunrise * 1000).toLocaleTimeString()}</li>
            <li><strong>Sunset:</strong> {new Date(result.sys.sunset * 1000).toLocaleTimeString()}</li>
            <li><strong>Coordinates:</strong> {result.coord.lat}, {result.coord.lon}</li>
            <li><strong>Country:</strong> {result.sys.country}</li>
            <li><strong>Timezone:</strong> {result.timezone / 3600} hours from UTC</li>
          </ul>
        </div>
      )}



      {cityName && (
        <p className="mt-4 text-gray-600">
          Your city:  <strong>{cityName}</strong>
        </p>
      )}


    </div>
  );
}
