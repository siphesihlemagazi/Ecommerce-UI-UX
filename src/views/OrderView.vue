<template>
  <div class="OrderView">
    <div class="container mt-5 mb-5">
      <div class="border mb-3" v-for="(order, index) in orders" :key="index">
          <div class="text-start text-black p-4">
            <div class="small text-muted mb-4">
              <h5 class="text-uppercase text-nowrap">{{ order.customer }}</h5>
              <div><span>Status: {{ order.status }}</span><br>
                <span>Date: {{ order.created_at }}</span><br>
                <span>Order No. {{ order.order_number }}</span></div>
            </div>
            <h4 class="mb-5 text-success">Thanks for your order</h4>
            <p class="mb-0 text-success">Payment summary</p>
            <hr class="mt-2 mb-4"
              style="height: 0; background-color: transparent; opacity: .75; border-top: 2px dashed #9e9e9e;">

            <div class="d-flex justify-content-between">
              <p class="fw-bold mb-0">{{ order.product_name }} (Qty:{{ order.quantity }})</p>
              <p class="text-muted mb-0">R{{ order.total_price}}.00</p>
            </div>

            <div class="d-flex justify-content-between">
              <p class="small mb-0">Shipping</p>
              <p class="small mb-0">R00.00</p>
            </div>

            <div class="d-flex justify-content-between pb-1">
              <p class="small">Tax</p>
              <p class="small">R00.00</p>
            </div>

            <div class="d-flex justify-content-between">
              <p class="fw-bold">Total</p>
              <p class="fw-bold text-success">R{{ order.total_price}}.00</p>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>

export default {
  name: 'OrderView',
  props: ['orders'],
  components: {
  }
}
</script>
