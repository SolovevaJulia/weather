import axios from 'axios';

const API_KEY = '5249d505c69c0c20de89cb4166d85a32';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function getWeather(city: string) {
  const response = await axios.get(BASE_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
      lang: 'ru',
    },
  });
  return response.data;
}
