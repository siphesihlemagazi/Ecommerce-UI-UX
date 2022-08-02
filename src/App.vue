<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Ecommerce</a>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              <router-link :to="{ name: 'home' }">Home</router-link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <router-link :to="{ name: 'products' }">Products</router-link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <router-link :to="{ name: 'about' }">About</router-link>
            </a>
          </li>
        </ul>
        <span class="text-white d-flex">
          <a class="nav-link text-primary" href="#">
            <font-awesome-icon icon="user-circle"></font-awesome-icon>
          </a>
          <a class="nav-link ms-3" href="#">
            <router-link :to="{ name: 'orderview' }">Orders</router-link>
          </a>
          <a class="nav-link ms-3" href="">
            <router-link :to="{ name: 'cartview' }">
              <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
              <span class="ms-1">({{ cart.length }})</span>
            </router-link>
          </a>
        </span>
      </div>
    </div>
  </nav>
  <router-view :products="products" :cart="cart" :addToCart="addToCart" :increaseQTY="increaseQTY"
    :decreaseQTY="decreaseQTY" :cartTotal="cartTotal" :createOrder="createOrder" :orders="orders" />
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
      orders: null,
    }
  },
  mounted() {
    fetch("http://localhost:8000/api/products/")
      .then(response => response.json())
      .then(data => { this.products = data })
    if (localStorage.cart) {
      this.cart = JSON.parse(localStorage.cart)
    }
    const headers = { "Content-Type": "application/json", 'Authorization': 'Token authId', };
    fetch("http://localhost:8000/api/orders/", { headers })
      .then(response => response.json())
      .then(data => { this.orders = data })
  },
  watch: {
    cart: {
      handler(currentCart) {
        localStorage.cart = JSON.stringify(currentCart)
      },
      deep: true
    }
  },
  computed: {
    cartTotal() {
      let sum = 0;
      for (var key in this.cart) {
        sum = sum + (this.cart[key].product.price * this.cart[key].qty);
      }
      return sum;
    },
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
    },
    decreaseQTY: function (id) {
      if (this.cart[id].qty > 1) {
        this.cart[id].qty--
      }
      else {
        this.cart.splice(id, 1);
      }
    },
    increaseQTY: function (id) {
      if (this.cart[id].qty) {
        this.cart[id].qty++
      }
    },
    createOrder: function () {
      for (var item in this.cart) {
        const payload = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token authId',
          },
          body: JSON.stringify({ product: this.cart[item].product.id, quantity: this.cart[item].qty })
        };
        fetch('http://localhost:8000/api/orders/', payload)
          .then(response => response.json())
          .then(data => this.orderId = data.id)
      }
    }
  },
}
</script>

<style>
nav a.router-link-exact-active {
  color: #42b983;
}

a {
  text-decoration: none !important;
}
</style>
