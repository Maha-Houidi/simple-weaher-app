
export async function fetchWeatherByCity(cityName: string): Promise<any> {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=fe824cb856a37281c8c13e7a5fbbd488&units=metric`);
  
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Data not found');
        }
        throw new Error(`Server error (${response.status})`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  