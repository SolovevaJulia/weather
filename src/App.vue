<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import Header from './components/Header.vue';
import './styles/main.sass';

const selectedCity = ref('Казань');

// Делаем переменную доступной в других компонентах
provide('selectedCity', selectedCity);
</script>
