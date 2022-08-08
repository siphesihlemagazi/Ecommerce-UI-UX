<template>
    <div class="AuthView">
        <div class="container mb-5 mt-5">
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="nav nav-pills nav-justified">
                                <li class="nav-item" @click="tab = 'login'">
                                    <a class="nav-link" :class="{ active: tab == 'login' }">Login</a>
                                </li>
                                <li class="nav-item" @click="tab = 'register'">
                                    <a class="nav-link" :class="{ active: tab == 'register' }">Register</a>
                                </li>
                            </div>
                        </div>
                        <div class="card-body">
                            <div v-if="tab == 'login'">
                                <login :submitLogin="submitLogin" />
                            </div>
                            <div v-if="tab == 'register'">
                                <register />
                            </div>

                            {{ user }}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'

export default {
    name: 'AuthView',
    data() {
        return {
            tab: 'login',
            loginDetails: {
                email: null,
                password: null
            },
            user: null,
            errors: []
        }
    },
    mounted() {
        if (localStorage.user) {
            this.user = JSON.parse(localStorage.user)
        }
    },
    watch: {
        user: {
            handler(currentUser) {
                localStorage.user = JSON.stringify(currentUser)
            },
            deep: true
        }
    },
    components: {
        Register,
        Login
    },
    methods: {
        submitLogin(email, password) {
            this.loginDetails.email = email
            this.loginDetails.password = password
            const payload = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: this.loginDetails.email, password: this.loginDetails.password })
            }
            fetch('http://127.0.0.1:8000/api/auth/login/', payload)
                .then(response => response.json())
                .then(data => { this.user = data })
        },
    },
}
</script>