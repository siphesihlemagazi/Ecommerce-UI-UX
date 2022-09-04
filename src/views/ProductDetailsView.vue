<template>
    <div class="ProductDetails container mt-5 mb-5">
        <h1 class="text-center mb-5">{{ productDetails[0].name }} Details</h1>
        <div class="row justify-content-center">
            <div class="product" style="width:fit-content">
                <div class="card mb-3 border-0">
                    <div class="row g-0">
                        <div class="col-md-6 d-flex justify-content-center">
                            <img :src="productDetails[0].image" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col">
                            <div class="card-body">
                                <h5 class="card-title">{{ productDetails[0].name }}
                                    <span class="fw-bold float-end">R{{ productDetails[0].price }}.00</span>
                                </h5>
                                <p class="card-text">{{ productDetails[0].description }}</p>
                                <p class="card-text">Stock: {{ productDetails[0].stock }}</p>
                                <p class="card-text">Quantity: {{ productDetails[0].stock }}</p>

                                <div aria-label="Page navigation example">
                                    Size:
                                    <ul class="pagination">
                                        <li class="border p-3 me-2">5</li>
                                        <li class="border p-3 me-2">6</li>
                                        <li class="border p-3 me-2">7</li>
                                        <li class="border p-3 me-2">8</li>
                                        <li class="border p-3 me-2">9</li>
                                    </ul>
                                </div>
                                <button type="button" @click="addToCart(productDetails)" class="btn btn-success">
                                    <font-awesome-icon icon="shopping-cart" class="rounded-0"></font-awesome-icon>
                                    ADD TO CART
                                </button>
                            </div>
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
    name: 'ProductDetailsView',
    props: ['getProductDetails', 'productDetails'],
    data() {
        return {
        }
    },
    mounted() {

    },
    watch: {
    },
    components: {
        FontAwesomeIcon
    },
    methods: {
    },
}
</script>