<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Ecommerce</a>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">
            <router-link :to="{ name: 'home' }">Home</router-link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <router-link :to="{ name: 'products' }">Products</router-link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <router-link :to="{ name: 'about' }">About</router-link></a>
        </li>
      </ul>
      <span class="text-white">
        <router-link :to="{ name: 'cartview' }">
        <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
        <span class="ms-1">({{ cart.length }})</span></router-link>
      </span>
    </div>
  </div>
</nav>
  <router-view :products="products" :cart="cart" :addToCart="addToCart" />
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import ProductView from "./views/ProductView.vue"

export default {
  name: 'App',
  components: {
    ProductView,
    FontAwesomeIcon,
  },
  data() {
    return {
      products: null,
      cart: [],
    }
  },
  mounted() {
    fetch("http://localhost:8000/api/products/")
      .then(response => response.json())
      .then(data => {
        this.products = data;
      })
    if (localStorage.cart) {
      this.cart = JSON.parse(localStorage.cart)
    }
  },
  watch: {
    cart: {
      handler(currentCart) {
        localStorage.cart = JSON.stringify(currentCart)
      },
      deep: true
    }
  },
  methods: {
    addToCart(product) {
      var whichProduct;
      var existing = this.cart.filter(function (item, index) {
        if (item.product.id == Number(product.id)) {
          whichProduct = index;
          return true;
        }
        else {
          return false;
        }
      });
      if (existing.length) {
        this.cart[whichProduct].qty++
      }
      else {
        this.cart.push({ product: product, qty: 1 })
      }
    },
    viewCart() {
      this.emitter.emit('view-cart', { 'data': this.cart })
    }
  },
}
</script>

<style>
nav a.router-link-exact-active {
  color: #42b983;
}
a{
  text-decoration: none !important;
}
</style>
