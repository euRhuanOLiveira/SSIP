<script setup>
import { ref } from "vue";
import { equipmentTable } from "../equipmentData";

const selected = ref(null);
const quantidade = ref(1);
const carrinho = ref([]);

const adicionar = () => {
  if (!selected.value) return;

  carrinho.value.push({
    ...selected.value,
    quantidade: quantidade.value,
    total: selected.value.valor * quantidade.value
  });

  quantidade.value = 1;
  selected.value = null;
};

const totalGeral = () => {
  return carrinho.value.reduce((acc, item) => acc + item.total, 0).toFixed(2);
};
</script>

<template>
  <div style="background: white; padding: 20px; border-radius: 6px; box-shadow:0 0 6px rgba(0,0,0,.15);">

    <label style="display:block;font-weight:bold;margin-bottom:8px;">Item:</label>
    <select v-model="selected" style="width:100%;padding:10px;margin-bottom:20px;">
      <option :value="null">-- Selecione --</option>
      <option v-for="item in equipmentTable" :key="item.id" :value="item">
        {{ item.descricao }} — R$ {{ item.valor.toFixed(2) }} / {{ item.unidade }}
      </option>
    </select>

    <label style="display:block;font-weight:bold;margin-bottom:8px;">Quantidade:</label>
    <input
      type="number"
      v-model="quantidade"
      min="1"
      style="width:100%;padding:10px;margin-bottom:20px;"
    />

    <button
      @click="adicionar"
      style="width:100%;padding:12px;background:#2563eb;color:white;font-weight:bold;border-radius:4px;"
    >
      Adicionar
    </button>

  </div>

  <div style="margin-top:30px;background:white;padding:20px;border-radius:6px;box-shadow:0 0 6px rgba(0,0,0,.15);">
    <h2 style="font-size:20px;font-weight:bold;margin-bottom:20px;">Itens</h2>

    <div v-if="!carrinho.length">
      Nenhum item adicionado.
    </div>

    <ul v-else>
      <li v-for="(item, index) in carrinho" :key="index" style="margin-bottom:10px;border-bottom:1px solid #ddd;padding-bottom:8px;">
        <strong>{{ item.descricao }}</strong><br />
        {{ item.quantidade }} × R$ {{ item.valor.toFixed(2) }}
        =
        <strong>R$ {{ item.total.toFixed(2) }}</strong>
      </li>
    </ul>

    <div v-if="carrinho.length" style="font-size:22px;font-weight:bold;margin-top:20px;">
      Total geral: R$ {{ totalGeral() }}
    </div>
  </div>
</template>
