<template>
    <div id="products">
        <div class="container mt-5 mb-5">
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <div class="col" v-for="(item, index) in products" :key="index">
                    <div class="card rounded-0">
                        <img :src="item.image" class="card-img-top rounded-0" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{ item.name }}</h5>
                            <p class="card-text">{{ item.description }}</p>
                            <button type="button" @click="addToCart(item)" class="btn btn-success">Add to cart</button>
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
    name: 'Products',
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