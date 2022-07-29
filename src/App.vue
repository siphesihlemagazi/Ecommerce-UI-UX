<template>
  <div id="app">
    <main-nav />
    <cart-items :cart="cart" />
    <product-list :cart="cart" :products="products" :addToCart="addToCart" :viewCart="viewCart" />
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
