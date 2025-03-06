<template>
  <div class="container">
    <header class="header">
    <nav class="nav">
      <router-link to="/" class="nav__link" active-class="nav__link--active">Главная</router-link>
      <router-link to="/weekly" class="nav__link" active-class="nav__link--active">Погода за неделю</router-link>
    </nav>

    <div class="select" @click="toggleDropdown">
      <div class="select__control">
        {{ selectedCity }}
        <span class="select__arrow"></span>
      </div>
      <ul v-if="dropdownOpen" class="select__list">
        <li v-for="city in cities" :key="city" @click="selectCity(city)" class="select__option">
          {{ city }}
        </li>
      </ul>
    </div>
  </header>
  </div>
  
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import type { Ref } from 'vue';
import '../styles/main.sass';
const selectedCity = inject('selectedCity') as Ref<string>;
const dropdownOpen = ref(false);
const cities = ref(['Казань', 'Краснодар', 'Уфа', 'Новосибирск', 'Красноярск', 'Москва']);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectCity = (city: string) => {
  selectedCity.value = city; // Теперь выбранный город меняется глобально
  dropdownOpen.value = false;
};

document.addEventListener('click', (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.select')) {
    dropdownOpen.value = false;
  }
});
</script>