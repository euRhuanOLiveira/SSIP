<script setup>
import config from "../data/config.json";
const services = config.services;
</script>

<template>
  <div class="services-grid">

    <router-link
  v-for="service in services"
  :key="service.id"
  :to="`/servico/${service.id}`"
  class="card"
>
  <div
    class="card__bar"
    :style="{ backgroundColor: service.color }"
  ></div>

  <h3 class="card__title">{{ service.title }}</h3>
  <p class="card__desc">{{ service.desc }}</p>
  <button class="card__action">Acessar →</button>
</router-link>


  </div>
</template>

<style scoped src="../styles/services.css"></style>
