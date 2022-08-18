<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Ecommerce</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#MainNavigation"
        aria-controls="MainNavigation" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="MainNavigation">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="#"><router-link :to="{ name: 'home' }">Home</router-link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><router-link :to="{ name: 'products' }">Products</router-link></a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              More
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#"><router-link :to="{ name: 'about' }">About</router-link></a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link text-primary" href="#">
            <router-link :to="{ name: 'loginview' }">
              <font-awesome-icon icon="user-circle"></font-awesome-icon>
            </router-link>
          </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
            <router-link :to="{ name: 'orderview' }">Orders</router-link>
          </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
            <router-link :to="{ name: 'cartview' }">
              <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
              <span class="ms-1">({{ cart.length }})</span>
            </router-link>
          </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view :products="products" :cart="cart" :orders="orders" :viewCart="viewCart" :userLogin="userLogin"
    :user="user" :authMSG="authMSG" :createOrder="createOrder" />
  <a class="logout small bg-light p-3" @click="logout" v-if="this.user != null">Logout</a>
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
      user: null,
      authMSG: null
    }
  },
  mounted() {

    fetch("http://localhost:8000/api/products/")
      .then(response => response.json())
      .then(data => { this.products = data })

    if (localStorage.cart) {
      this.cart = JSON.parse(localStorage.cart)
    }

    if (localStorage.user != 'null') {
      this.user = JSON.parse(localStorage.user)
      console.log("Refetch orders..!!")
      this.getOrders(this.user.token)
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
      },
      deep: true
    }
  },
  computed: {
  },
  methods: {
    viewCart() {
      this.emitter.emit('view-cart', { 'data': this.cart })
    },
    createOrder(token) {
      for (var item in this.cart) {
        const payload = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
          body: JSON.stringify({ product: this.cart[item].product.id, quantity: this.cart[item].qty })
        };
        fetch('http://localhost:8000/api/orders/', payload)
          .then(response => response.json())
          .then(data => this.orderId = data.id)
      }
    },
    getOrders(token) {
      const headers = {
        "Content-Type": "application/json",
        'Authorization': `Token ${token}`
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
        .then(data => { this.login(data) })

    },
    login(response) {
      if (response.message != 'Invalid credentials, try again') {
        this.user = response
        this.getOrders(this.user.token)
        localStorage.user = JSON.stringify(response)
        this.$router.push(this.$route.query.redirect || 'products')
      }
      else {
        this.authMSG = response.message
      }
    },
    logout() {
      this.user = null
      this.orders = null
      localStorage.removeItem('user')
      this.$router.push('login')
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

.logout {
  position: fixed;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
