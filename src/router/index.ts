import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../Pages/HomeView.vue';
import WeeklyView from '../Pages/WeeklyView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/weekly', component: WeeklyView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
