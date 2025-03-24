import { createRouter, createWebHistory } from 'vue-router';
import DemoForm1 from '@/views/DemoForm1.vue';
import DemoForm2 from '@/views/DemoForm2.vue';

const routes = [
  { path: '/', component: DemoForm1 },
  { path: '/demo2', component: DemoForm2 }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
