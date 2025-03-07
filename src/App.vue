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

provide('selectedCity', selectedCity);
</script>
