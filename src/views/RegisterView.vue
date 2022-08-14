<template>
    <div class="Register container d-flex justify-content-center mb-5 mt-5">
        <div class="card" style="width: 18rem;">
            <div class="card-header text-center fw-bold">
                REGISTER
            </div>
            <div class="card-body">
                <p class="alert alert-warning small text-center" role="alert" v-if="this.registerResponse">
                    {{ this.registerResponse }}
                </p>
                <form @submit.prevent="formData">
                    <div class="form-outline mb-4">
                        <input type="text" v-model="firstName" class="form-control" placeholder="Firstname" required />
                    </div>

                    <div class="form-outline mb-4">
                        <input type="text" v-model="lastName" class="form-control" placeholder="Lastname" required />
                    </div>

                    <div class="form-outline mb-4">
                        <input type="text" v-model="userName" class="form-control" placeholder="Username" required />
                    </div>

                    <div class="form-outline mb-4">
                        <input type="email" v-model="email" class="form-control" placeholder="Email" required />
                    </div>

                    <div class="form-outline mb-4">
                        <input type="password" v-model="password1" class="form-control" placeholder="Password"
                            required />
                        <span class="small text-danger ms-1" v-if="this.passwordShortError">{{ this.passwordShortError
                        }}</span>
                        <span class="small text-danger ms-1" v-if="this.passwordMatchError">{{ this.passwordMatchError
                        }}</span>
                    </div>

                    <div class="form-outline mb-4">
                        <input type="password" v-model="password2" class="form-control" placeholder="Repeat password"
                            required />
                        <span class="small text-danger ms-1" v-if="this.passwordShortError">{{ this.passwordShortError
                        }}</span>
                        <span class="small text-danger ms-1" v-if="this.passwordMatchError">{{ this.passwordMatchError
                        }}</span>
                    </div>

                    <div class="form-check d-flex justify-content-center small mb-4">
                        <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                            aria-describedby="registerCheckHelpText" />
                        <label class="form-check-label" for="registerCheck">
                            I have read and agree to the terms
                        </label>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block mb-4 w-100">Create account</button>

                    <div class="text-center small d-flex justify-content-center">
                        Already have an account?
                        <a class="nav-link ms-1" href="#">
                            <router-link :to="{ name: 'loginview' }">Login</router-link>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'RegisterView',
    props: ['user'],
    data() {
        return {
            registerResponse: null,
            firstName: null,
            lastName: null,
            userName: null,
            email: null,
            password1: null,
            password2: null,
            passwordMatchError: null,
            passwordShortError: null,
        }
    },
    methods: {
        formData() {
            this.passwordShortError = this.password1.length > 7 ? null : 'Password must be atleast 8 charactors'
            this.passwordMatchError = this.password1 === this.password2 ? null : 'Password do not match'

            if (!this.passwordShortError && !this.passwordMatchError) {

                const payload = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: this.userName, email: this.email, first_name:
                            this.firstName, last_name: this.lastName, password: this.password2
                    })
                }
                fetch('http://127.0.0.1:8000/api/auth/register/', payload)
                    .then(response => response.json())
                    .then(data => { this.register(data) })
            }
        },
        register(response) {
            if (response.email) {
                // if response.email.length === 1 mean registration was successful or its an error msg
                if (response.email.length === 1) {
                    return this.registerResponse = `A ${response.email[0]}`
                }
                else {
                    this.registerResponse = "Account was created successfully"
                    this.$router.push(this.$route.query.redirect || 'login')
                }
            }
            else if (response.username) {
                if (response.username.length === 1) {
                    return this.registerResponse = response.username[0]
                }
                else {
                    this.registerResponse = "Account was created successfully"
                    this.$router.push(this.$route.query.redirect || 'login')
                }
            }
        }
    },
}


</script>