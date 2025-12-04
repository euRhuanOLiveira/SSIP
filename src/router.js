import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import ServicePage from "./views/ServicePage.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/servico/:id", component: ServicePage }
  ]
});
