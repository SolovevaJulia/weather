<template>
  <div class="container">
    <div class="weather">
    <div class="weather__header">
      <h1 class="weather__title">Погода в городе {{ selectedCity }}</h1>
      <p class="weather__date">{{ formattedDate }}</p>
    </div>

    <div v-if="weatherData" class="weather__main">
      <div class="weather__current">
        <div class="weather__left">
          <div class="weather__icon">
            <img 
              :src="iconMap[weatherData.weather[0].icon] || cloudyIcon" 
              :alt="weatherData.weather[0].description"
            />
          </div>
          <div class="weather__info">
            <p class="weather__temp">{{ Math.round(weatherData.main.temp) }}°C</p>
          </div>
        </div>

        <div class="weather__right">
          <p class="weather__details">{{ weatherData.weather[0].description }}</p>
          <p class="weather__details">Влажность: {{ weatherData.main.humidity }}%</p>
          <p class="weather__details">Ветер: {{ weatherData.wind.speed }} м/с</p>
        </div>
      </div>

      <div class="weather__hourly">
        <div class="weather__hourly-list">
          <div class="weather-hour" v-for="hour in hourlyWeather" :key="hour.time">
            <div class="weather-hour__time">
              <p>{{ hour.time }}</p>
              <p>{{ hour.dayTime }}</p>
            </div>
            <p class="weather-hour__temp">{{ hour.temp }}°</p>
            <img :src="hour.icon" :alt="hour.condition" class="weather-hour__icon" />
            <p class="weather-hour__condition">{{ hour.condition }}</p>
            <p class="weather-hour__condition">{{ hour.wind }}</p>
            <p class="weather-hour__condition">{{ hour.humidity }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="weather__popular">
      <div class="weather__subtitle">
        <h2>Погода в популярных городах</h2>
        <button>
          <img :src="vector" :alt="vector" />
        </button>
        
      </div>
      <div class="weather__popular-list">
        <div class="weather-card" v-for="city in popularCitiesData" :key="city.name">
          <p class="weather-card__city">{{ city.name }}</p>
          <p class="weather-card__condition">{{ city.condition }}</p>
          <img 
            :src="iconMap[city.iconCode] || cloudyIcon" 
            :alt="city.condition" 
            class="weather-card__icon"
          />
          <p class="weather-card__temp">{{ city.temp }}°</p>
          <p class="weather-card__humidity">Влажность: {{ city.humidity }}%</p>
        </div>
      </div>
    </div>
  </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref, onMounted, watch, inject } from 'vue';
import type { Ref } from 'vue';
import '../styles/main.sass';
import cloudyIcon from '@/assets/img/cloudy.svg';
import sunnyIcon from '@/assets/img/sunny.svg';
import windyIcon from '@/assets/img/windy.svg';
import rainyIcon from '@/assets/img/rainy.svg';
import vector from '@/assets/img/vector.svg';

const hourlyWeather = ref([
  { time: '00:00', dayTime:'Ночь', temp: 34, condition: 'Облачно', icon: cloudyIcon, wind: '1 м/с', humidity: '85%' },
  { time: '03:00', dayTime:'Ночь', temp: 34, condition: 'Солнечно', icon: sunnyIcon, wind: '1 м/с', humidity: '85%' },
  { time: '06:00', dayTime:'Утро', temp: 34, condition: 'Ветрено', icon: windyIcon, wind: '1 м/с', humidity: '85%' },
  { time: '09:00', dayTime:'Утро', temp: 34, condition: 'Дождливо', icon: rainyIcon, wind: '1 м/с', humidity: '85%' },
  { time: '12:00', dayTime:'День', temp: 34, condition: 'Облачно', icon: cloudyIcon, wind: '1 м/с', humidity: '85%' },
  { time: '15:00', dayTime:'День', temp: 34, condition: 'Солнечно', icon: sunnyIcon, wind: '1 м/с', humidity: '85%' },
  { time: '18:00', dayTime:'Вечер', temp: 34, condition: 'Дождливо', icon: rainyIcon, wind: '1 м/с', humidity: '85%' },
  { time: '21:00', dayTime:'Вечер', temp: 34, condition: 'Облачно', icon: cloudyIcon, wind: '1 м/с', humidity: '85%' },
]);

const iconMap = {
  '01d': sunnyIcon,
  '01n': sunnyIcon,
  '02d': cloudyIcon,
  '02n': cloudyIcon,
  '03d': cloudyIcon,
  '04d': cloudyIcon,
  '09d': rainyIcon,
  '10d': rainyIcon,
  '11d': rainyIcon,
  '13d': rainyIcon,
  '50d': cloudyIcon,
};

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY; 
const selectedCity = inject('selectedCity') as Ref<string>;
const weatherData = ref<any>(null);
const formattedDate = ref(new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' }));
const popularCityNames = ['Москва', 'Новосибирск', 'Краснодар', 'Красноярск', 'Тула'];
const popularCitiesData = ref<any[]>([]);

const fetchWeather = async () => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity.value}&appid=${API_KEY}&units=metric&lang=ru`
  );
  const data = await response.json();
  weatherData.value = data;
};

const fetchPopularCities = async () => {
  const requests = popularCityNames.map(city => 
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
    ).then(response => response.json())
  );

  const citiesData = await Promise.all(requests);
  popularCitiesData.value = citiesData.map(data => ({
    name: data.name,
    temp: Math.round(data.main.temp),
    condition: data.weather[0].description,
    humidity: data.main.humidity,
    iconCode: data.weather[0].icon
  }));
};

onMounted(() => {
  fetchWeather();
  fetchPopularCities();
});
watch(selectedCity, fetchWeather);

console.log("API Key:", import.meta.env.VITE_OPENWEATHER_API_KEY);

</script>
