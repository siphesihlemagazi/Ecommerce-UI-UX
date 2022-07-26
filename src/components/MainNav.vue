<template>
  <div id="mainnav">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand">Main Navbar</a>
        <div class="d-flex">
          <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

export default {
  name: 'MainNav',
  components: {
    FontAwesomeIcon,
  }
}
</script>

