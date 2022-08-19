<template>
    <div id="products">
        <div class="container mt-5 mb-5">

            <nav class="navbar navbar-expand-lg navbar-white bg-white mb-4 text-uppercase">
                <div class="container-fluid p-0">
                    <span class="me-5 text-success" href="#">FILTERS:</span>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#ProductFilter" aria-controls="ProductFilter" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <font-awesome-icon icon="filter"></font-awesome-icon>
                    </button>
                    <div class="collapse navbar-collapse" id="ProductFilter">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item me-5">
                                <a class="nav-link active" href="#" @click.prevent="this.search = ''">All products</a>
                            </li>
                            <li class="nav-item me-5">
                                <a class="nav-link" href="#" @click.prevent="this.search = 'Clothing'">Clothing</a>
                            </li>
                            <li class="nav-item me-5">
                                <a class="nav-link" href="#" @click.prevent="this.search = 'Food'">Groceries</a>
                            </li>
                            <li class="nav-item me-5">
                                <a class="nav-link" href="#" @click.prevent="this.search = 'New Arrivals'">New Arrivals</a>
                            </li>
                            <li class="nav-item me-5">
                                <a class="nav-link" href="#" @click.prevent="this.search = 'Trending'">Trending</a>
                            </li>
                        </ul>
                        <form class="d-flex">
                            <input type="search" class="form-control rounded" placeholder="Search product"
                                v-model="search" />
                            <button type="button" class="btn btn-primary">
                                <font-awesome-icon icon="magnifying-glass"></font-awesome-icon>
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            <div class="row row-cols-1 row-cols-md-3 g-4">
                <div class="col" v-for="(item, index) in filteredProducts" :key="index">
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
            search: "",
        }
    },
    components: {
        FontAwesomeIcon,
    },
    computed: {
        filteredProducts() {
            if (this.products) {
                return this.products.filter((product) => {
                    return product.name.toLowerCase().match(this.search.toLowerCase()) || 
                    product.category_name.toLowerCase().match(this.search.toLowerCase())
                })
            }
        }
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