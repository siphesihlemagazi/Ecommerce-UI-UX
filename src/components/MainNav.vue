<template>
  <div id="mainnav">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand">Main Navbar</a>
        <div class="d-flex align-items-center bg-success text-white p-1 rounded small">
          <font-awesome-icon icon="shopping-cart"></font-awesome-icon> <span class="ms-1">({{ this.cart  }})</span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

export default {
  name: 'MainNav',
  data: function () {
    return {
      cart: [],
    }
  },
  created() {
    this.emitter.on('current-cart', (evt) => {
      this.cart = evt.data
    })
  },
  components: {
    FontAwesomeIcon,
  }
}
</script>
