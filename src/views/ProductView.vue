<template>
    <div id="products">
        <div class="container mt-5 mb-5">
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <div class="col" v-for="(item, index) in products" :key="index">
                    <div class="card rounded-0 h-100">
                        <img :src="item.image" class="card-img-top rounded-0" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{ item.name }}
                                <span class="float-end">R{{ item.price }}.00</span>
                            </h5>
                            <p class="card-text">{{ item.description }}</p>

                            <button type="button" @click="addToCart(item)" class="btn btn-sm btn-success">
                                <font-awesome-icon icon="shopping-cart" class="rounded-0"></font-awesome-icon>
                                ADD TO CART
                            </button>
                            <span class="float-end small text-muted">Stock: {{ item.stock }}</span>
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
    props: ['cart', 'products', 'viewCart'],
    data() {
        return {
        }
    },
    components: {
        FontAwesomeIcon,
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
        },
    },
}
</script>