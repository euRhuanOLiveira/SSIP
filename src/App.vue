<template>
  <Header />
  <CartSidebar />
  <router-view />
</template>

<script setup>
import Header from "./components/Header.vue";
import CartSidebar from "./components/CartSidebar.vue";
</script>
