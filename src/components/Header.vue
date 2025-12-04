<script setup>
import { ref } from "vue";
import { useCart } from "../store/cart";

const cart = useCart();
const search = ref("");
</script>

<template>
  <header class="gov-header">

    <!-- LOGO + NOME -->
    <div class="brand">
      <img src="/src/assets/logos/prefeitura.png" alt="Prefeitura" class="logo" />

      <div class="gov-title">
        <strong>SIPP</strong>
        <span>Sistema Integrado de Preços Públicos</span>
      </div>
    </div>


    <!-- PESQUISA -->
    <div class="search-box">
      <input
        type="text"
        v-model="search"
        placeholder="Buscar serviços..."
      />
    </div>


    <!-- SACOLINHA -->
    <button class="cart-btn" @click="cart.toggle">
      🛒
      <span v-if="cart.state.items.length" class="badge">
        {{ cart.state.items.length }}
      </span>
    </button>

  </header>
</template>

<style scoped>
/*******************************************
  HEADER INSTITUCIONAL
*******************************************/
.gov-header {
  background: #003C88;
  padding: 14px 26px;
  color: white;
  display: flex;
  align-items: center;
  gap: 26px;
  position: sticky;
  top: 0;
  z-index: 50;
}

/********* LOGO + NOME *********/
.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  width: 48px;
  height: 48px;
}

.gov-title strong {
  font-size: 19px;
  line-height: 1.1;
}

.gov-title span {
  font-size: 13px;
  opacity: 0.9;
}

/********* PESQUISA *********/
.search-box input {
  width: 280px;
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
}

/********* SACOLA *********/
.cart-btn {
  background: #0055cc;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  font-weight: 600;
}

/********* CONTADOR *********/
.badge {
  background: #FFB800;
  color: #222;
  font-size: 13px;
  padding: 2px 8px;
  border-radius: 20px;
  margin-left: 6px;
}
</style>
