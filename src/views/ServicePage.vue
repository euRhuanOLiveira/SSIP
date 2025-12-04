<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const id = route.params.id;

const service = ref({ title: "", subtitle: "", items: [] });
const selected = ref([]);
const tooltip = ref(null);

// Carregar JSON dinamicamente
(async () => {
  try {
    const module = await import(`../data/services/${id}.json`);
    service.value = module.default;
  } catch (err) {
    console.error("Erro ao carregar serviço:", err);
  }
})();

// Selecionar / desmarcar item
function toggleItem(item) {
  const found = selected.value.find(i => i.name === item.name);

  if (!found) {
    selected.value.push({ ...item, qty: 1 });
  } else {
    selected.value = selected.value.filter(i => i.name !== item.name);
  }
}

// Alterar quantidade
function changeQty(item, e) {
  const qty = parseInt(e.target.value);
  if (qty >= 1 && qty <= 999) {
    const found = selected.value.find(i => i.name === item.name);
    if (found) found.qty = qty;
  }
}

// Tooltip
function toggleTooltip(item) {
  tooltip.value = tooltip.value === item.name ? null : item.name;
}
</script>

<template>
  <main class="service-page">

    <!-- INTRO -->
    <section class="intro">
      <h1>{{ service.title }}</h1>
      <p class="subtitle">{{ service.subtitle }}</p>

      <p class="explain">
        O serviço de <strong>{{ service.title }}</strong> corresponde a taxas
        oficiais definidas em decreto municipal. Os valores podem ser selecionados
        para gerar um resumo ao final da simulação.
      </p>
    </section>


    <!-- CABEÇALHO -->
    <div class="list-head">
      <span>Serviço</span>
      <span>Valor</span>
      <span>Qtd.</span>
    </div>


    <!-- LISTA -->
    <section class="panel">

      <div
        v-for="item in service.items"
        :key="item.name"
        class="service-item"
      >

        <!-- CHECKBOX -->
        <input
          type="checkbox"
          @change="toggleItem(item)"
          :checked="selected.some(s => s.name === item.name)"
          class="check"
        />

        <!-- NOME + TOOLTIP -->
        <div class="name-wrap">
          <span class="service-name">{{ item.name }}</span>

          <button class="info" @click="toggleTooltip(item)">?</button>

          <div
            class="tooltip"
            v-if="tooltip === item.name"
          >
            {{ item.info }}
          </div>
        </div>

        <!-- PREÇO -->
        <span class="service-price">
          {{ item.price === 0 ? "ISENTO" : `R$ ${item.price.toFixed(2)}` }}
        </span>

        <!-- QUANTIDADE -->
        <input
          v-if="selected.some(s => s.name === item.name)"
          type="number"
          min="1"
          step="1"
          class="qty"
          :value="selected.find(s => s.name === item.name).qty"
          @input="e => changeQty(item, e)"
        />
      </div>
    </section>

  </main>
</template>

<style scoped src="../styles/page-servico.css"></style>
