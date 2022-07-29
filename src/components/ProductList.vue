<template>
    <div id="productlist">
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand">Main Navbar</a>
                <button type="button" class="btn btn-success btn-sm" @click="viewCart()">
                    <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
                    <span class="ms-1">{{ this.cart.length}}</span>
                </button>
            </div>
        </nav>
        <div class="container mt-5 mb-5">
            <div class="card-group">
                <div class="card" v-for="(item, index) in products" :key="index">
                    <img :src="item.image" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <p class="card-text small">{{ item.description }}</p>
                        <button type="button" @click="addToCart(item)" class="btn btn-success">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

export default {
    name: 'ProductList',
    props: ['cart', 'products', 'addToCart', 'viewCart'],
    data() {
        return {
        }
    },
    components: {
        FontAwesomeIcon,
    },
}
</script>