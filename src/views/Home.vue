<script setup>
import ServicesList from "../components/ServicesList.vue";
import FooterGov from "../components/FooterGov.vue";
</script>

<template>
  <main class="home">

    <!-- TÍTULO CENTRAL -->
    <section class="home__hero">
      <h1>SIPP</h1>
      <p>Sistema Integrado de Preços Públicos</p>
    </section>

    <!-- LISTA DE SERVIÇOS -->
    <ServicesList />

    <!-- RODAPÉ -->
    <FooterGov />

  </main>
</template>

<style>
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.home__hero {
  text-align: center;
  padding: 50px 20px;
}

.home__hero h1 {
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 8px;
  color: #005bbb;
}

.home__hero p {
  font-size: 18px;
  font-weight: 500;
  color: #444;
}
</style>
