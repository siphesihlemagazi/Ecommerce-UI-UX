<template>
  <div class="cartview">
    <div class="container mt-5 mb-5">
      <div class="row">
        <div class="col-md-8 mb-3">
          <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col-md-4" v-for="(item, index) in cart" :key="index">
              <div class="card h-100 rounded-0">
                <img :src="item.product.image" class="card-img-top rounded-0" alt="...">
                <div class="card-body text-center">
                  <span class="fw-bold">{{ item.product.name }}</span><br>
                  <span class="small text-muted">{{ item.product.description }}</span>
                  <br><span class="fw-bold">R{{ item.product.price }}.00</span>
                  <div class="d-flex justify-content-between mt-2">
                    <div>
                      <span class="fw-bold" @click="increaseQTY(index)">
                        <font-awesome-icon icon="plus" class="text-muted"></font-awesome-icon>
                      </span>
                      <span class="mx-3 fw-bold">{{ item.qty }}</span>
                      <span class="fw-bold" @click="decreaseQTY(index)">
                        <font-awesome-icon icon="minus" class="text-muted"></font-awesome-icon>
                      </span>
                    </div>
                    <div>
                      <font-awesome-icon icon="trash-can" class="text-muted"></font-awesome-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card rounded-0">
            <div class="card-body">
              <h5 class="card-title ms-2">SUMMERY</h5>
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">ITEMS</th>
                    <th scope="col">{{ this.cartQty }}</th>
                  </tr>
                  <tr>
                    <th scope="col">Subtotal</th>
                    <th scope="col">R{{ this.cartPrice }}.00</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Total <span class="fw-light">(including VAT)</span>:</th>
                    <th>R{{ this.cartPrice }}.00</th>
                  </tr>
                </tbody>
              </table>
              <a href="#" class="btn btn-sm btn-primary" @click="createOrder(this.user.token)">CHECKOUT</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

export default {
  name: 'CartView',
  props: ['cart', 'createOrder', 'user'],
  data() {
    return {
    }
  },
  components: {
    FontAwesomeIcon
  },
  computed: {
    cartPrice() {
      let total = 0
      for (var key in this.cart) {
        total += (this.cart[key].product.price * this.cart[key].qty)
      }
      return total
    },
    cartQty() {
      let total = 0;
      for (var key in this.cart) {
        total += (this.cart[key].qty)
      }
      return total
    }
  },
  methods: {
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
  },
}
</script>
