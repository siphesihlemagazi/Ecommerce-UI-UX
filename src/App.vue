<template>
  <div id="app">
    <main-nav />
    <product-list />
  </div>
</template>

<script>

import MainNav from "./components/MainNav.vue"
import ProductList from "./components/ProductList.vue"

export default {
  name: 'App',
  components: {
    MainNav,
    ProductList,
  }
}
</script>
