<template>
  <div id="app">
    <main-nav />
    <cart-items />
    <product-list />
  </div>
</template>

<script>


import ProductList from "./components/ProductList.vue"
import CartItems from "./components/CartItems.vue"

export default {
  name: 'App',
  components: {
    ProductList,
    CartItems,
  }
}
</script>
