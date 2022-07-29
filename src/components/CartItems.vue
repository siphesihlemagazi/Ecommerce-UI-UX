<template>
  <div id="cartitems">
    {{ cart }}
   <div v-if="this.items.length>0">
    {{ this.items }}
   </div>
  </div>
</template>

<script>

export default {
  name: 'CartItems',
  props: ['cart'],
  data: function () {
    return {
      items: [],
    }
  },
  created() {
    this.emitter.on('view-cart', (evt) => {
      this.items = evt.data
    })
  },
  components: {
  }
}
</script>
