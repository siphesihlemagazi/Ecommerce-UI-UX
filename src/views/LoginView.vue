<template>
    <div class="LoginView container mt-5 d-flex justify-content-center">
        <div class="card ">
            <div class="card-header text-center fw-bold">
                LOGIN TO ECOMMERCE
            </div>
            <div class="card-body">
                <p class="alert alert-warning small text-center" role="alert" v-if="this.error">
                    {{ this.error }}
                </p>
                <form>
                    <div class="form-outline mb-4">
                        <input type="email" id="loginName" class="form-control" placeholder="Email"
                            v-model="loginDetails.email" />
                    </div>

                    <div class="form-outline mb-4">
                        <input type="password" id="loginPassword" class="form-control" placeholder="Password"
                            v-model="loginDetails.password" />
                    </div>

                    <div class="row mb-4">
                        <div class="col-md-6 d-flex justify-content-center small">
                            <div class="form-check mb-3 mb-md-0">
                                <input class="form-check-input" type="checkbox" value="" id="loginCheck" checked />
                                <label class="form-check-label text-nowrap" for="loginCheck"> Remember me </label>
                            </div>
                        </div>
                        <div class="col-md-6 d-flex justify-content-center small text-primary text-nowrap">
                            Forgot password?
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block mb-4 w-100"
                        @click.prevent="userLogin(loginDetails.email, loginDetails.password)">Sign in</button>

                    <div class="text-center small d-flex justify-content-center">
                        Don't have an account? 
                        <a class="nav-link ms-1" href="#">
                            <router-link :to="{ name: 'registerview' }">Register</router-link>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'LoginView',
    props: ['userLogin', 'user', 'authMSG'],
    data() {
        return {
            loginDetails: {
                email: null,
                password: null,
            },
            error: null
        }
    },
    watch: {
        authMSG: {
            handler(error) {
                this.error = error
            },
            deep: true
        }
    },
    components: {
    },
    methods: {
    },
}
</script>