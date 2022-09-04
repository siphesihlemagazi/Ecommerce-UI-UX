<template>
    <div class="ProductDetails">
        <h1>Product Details</h1>
        {{ this.productDetails }}
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card rounded-0 h-100">
                    <img :src="productDetails[0].image" class="card-img-top rounded-0" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ productDetails.name }}
                            <span class="float-end">R{{ productDetails.price }}.00</span>
                        </h5>
                        <p class="card-text">{{ productDetails.description }}</p>

                        <button type="button" @click="addToCart(productDetails)" class="btn btn-sm btn-success">
                            <font-awesome-icon icon="shopping-cart" class="rounded-0"></font-awesome-icon>
                            ADD TO CART
                        </button>
                        <span class="float-end small text-muted">Stock: {{ productDetails.stock }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
  
<script>

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
    },
    methods: {
    },
}
</script>