<template>
    <div id="productlist" class="container mt-5 mb-5">
        <div class="card-group">
            <div class="card" v-for="(item, index) in products" :key="index">
                <img :src="item.image" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{ item.name }}</h5>
                    <p class="card-text small">{{ item.description }}</p>
                    <button type="button" v-on:click="addToCart(item)" class="btn btn-success">Add to cart</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductList',
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
            });
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
            this.emitter.emit('current-cart', {'data': this.cart})
        },
    },
    components: {
    },
}
</script>