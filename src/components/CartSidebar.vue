<script setup>
import { useCart } from "../store/cart";
const cart = useCart();
</script>

<template>
  <div class="overlay" v-if="cart.state.open" @click="cart.toggle"></div>

  <aside class="cart" :class="{ open: cart.state.open }">

    <header class="cart__header">
      <h2>Sacola de Serviços</h2>
      <button @click="cart.toggle" class="close">×</button>
    </header>


    <div class="cart__body" v-if="cart.state.items.length">

      <div
        v-for="item in cart.state.items"
        :key="item.name"
        class="cart__item"
      >

        <div class="row">
          <strong>{{ item.name }}</strong>

          <button class="remove" @click="cart.remove(item)">remover</button>
        </div>

        <div class="row">
          <span>{{ item.price === 0 ? "ISENTO" : `R$ ${item.price.toFixed(2)}` }}</span>

          <input
            type="number"
            min="1"
            :value="item.qty"
            @input="e => cart.changeQty(item, parseInt(e.target.value))"
            class="qty"
          />
        </div>

        <div class="subtotal">
          Subtotal: 
          <strong>
            R$ {{ (item.price * item.qty).toFixed(2) }}
          </strong>
        </div>

      </div>

      <!-- TOTAL -->
      <div class="cart__total">
        Total: <strong>R$ {{ cart.total.toFixed(2) }}</strong>
      </div>

      <button class="btn-print">
        Gerar documento →
      </button>
    </div>


    <div v-else class="cart__empty">
      Nenhum serviço selecionado.
    </div>

  </aside>
</template>

<style scoped>
/*******************
  OVERLAY
*******************/
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.45);
  z-index: 90;
}

/*******************
  SIDEBAR
*******************/
.cart {
  position: fixed;
  top: 0;
  right: -380px;
  width: 360px;
  height: 100vh;
  background: #ffffff;
  z-index: 100;
  box-shadow: -4px 0 18px rgba(0,0,0,.2);
  display: flex;
  flex-direction: column;
  transition: .3s;
}

.cart.open {
  right: 0;
}

.cart__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  border-bottom: 1px solid #eee;
  background: #003C88;
  color: white;
}

.close {
  background: none;
  border: none;
  font-size: 26px;
  color: white;
  cursor: pointer;
}

.cart__body {
  padding: 18px;
  overflow-y: auto;
  flex: 1;
}

.cart__item {
  padding: 14px 0;
  border-bottom: 1px solid #eee;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.qty {
  width: 60px;
  padding: 6px;
}

.remove {
  background: none;
  color: #c33;
  border: none;
  font-size: 13px;
  cursor: pointer;
}

.subtotal {
  font-size: 14px;
  margin-top: 4px;
}

.cart__total {
  font-size: 18px;
  font-weight: 600;
  padding: 18px 0;
  text-align: right;
}

.btn-print {
  width: 100%;
  background: #008D3B;
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.cart__empty {
  padding: 28px;
  text-align: center;
  color: #777;
}
</style>
