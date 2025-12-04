import { reactive, computed } from "vue";

const state = reactive({
  open: false,
  items: []
});

export function useCart() {

  function toggle() {
    state.open = !state.open;
  }

  function add(item) {
    const found = state.items.find(i => i.name === item.name);

    if (!found) {
      state.items.push({ ...item, qty: 1 });
    } else {
      found.qty++;
    }
    save();
  }

  function remove(item) {
    state.items = state.items.filter(i => i.name !== item.name);
    save();
  }

  function changeQty(item, qty) {
    const found = state.items.find(i => i.name === item.name);
    if (found && qty >= 1) {
      found.qty = qty;
    }
    save();
  }

  function clear() {
    state.items = [];
    save();
  }

  const total = computed(() =>
    state.items.reduce((sum, i) => sum + (i.price * i.qty), 0)
  );

  function save() {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }

  function load() {
    const data = localStorage.getItem("cart");
    if (data) {
      state.items = JSON.parse(data);
    }
  }

  load();

  return {
    state,
    add,
    remove,
    changeQty,
    clear,
    toggle,
    total
  };
}
