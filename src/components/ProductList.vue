<template>
    <div id="productlist" class="container mt-5 mb-5">
        <div class="card-group">
            <div class="card"  v-for="(product, index) in products" :key="index">
                <img :src="product.image" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{ product.name }}</h5>
                    <p class="card-text small">{{ product.description }}</p>
                    <button type="button" class="btn btn-primary">Add to cart</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductList',
    data () {
        return {
            products: null
        }
    },
    mounted () {
        fetch("http://localhost:8000/api/products/")
            .then(response => response.json())
            .then(data => {
                this.products = data;
            });
    },
    components: {
    },
}
</script>