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
            <router-link :to="{ name: 'loginview' }">
              <font-awesome-icon icon="user-circle"></font-awesome-icon>
            </router-link>
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
  <a @click="logout">Logout</a>
  {{ this.user }} {{ this.authId }}
  <router-view :products="products" :cart="cart" :orders="orders" :viewCart="viewCart" :userLogin="userLogin"
    :user="user" />
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
      authId: null,
      user: null,
      isLogged: null
    }
  },
  mounted() {

    fetch("http://localhost:8000/api/products/")
      .then(response => response.json())
      .then(data => { this.products = data })

    if (localStorage.cart) {
      this.cart = JSON.parse(localStorage.cart)
    }

    if (localStorage.user) {
      this.user = JSON.parse(localStorage.user)
      this.authId = `Token ${JSON.parse(localStorage.user).token}`
      this.getOrders()
      this.isLogged = this.user.email
    }

  },
  watch: {
    cart: {
      handler(currentCart) {
        localStorage.cart = JSON.stringify(currentCart)
      },
      deep: true
    },
    user: {
      handler(currentUser) {
        localStorage.user = JSON.stringify(currentUser)
        this.authId = `Token ${JSON.parse(localStorage.user).token}`
        this.getOrders()
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
    viewCart() {
      this.emitter.emit('view-cart', { 'data': this.cart })
    },
    createOrder() {
      for (var item in this.cart) {
        const payload = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.authId,
          },
          body: JSON.stringify({ product: this.cart[item].product.id, quantity: this.cart[item].qty })
        };
        fetch('http://localhost:8000/api/orders/', payload)
          .then(response => response.json())
          .then(data => this.orderId = data.id)
      }
    },
    getOrders() {
      const headers = {
        "Content-Type": "application/json",
        'Authorization': this.authId
      }
      fetch("http://localhost:8000/api/orders/", { headers })
        .then(response => response.json())
        .then(data => { this.orders = data })
    },
    userLogin(email, password) {
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password })
      }
      fetch('http://127.0.0.1:8000/api/auth/login/', payload)
        .then(response => response.json())
        .then(data => { this.user = data, this.loginRedirect(data) })

    },
    loginRedirect(response) {
      if (response.message != 'Invalid credentials, try again') {
        this.$router.push(this.$route.query.redirect || 'products')
      }
    },
    logout(){
      localStorage.removeItem('user')
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
