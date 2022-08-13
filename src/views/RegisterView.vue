<template>
    <div class="Register container d-flex justify-content-center mb-5 mt-5">
        <div class="card" style="width: 18rem;">
            <div class="card-header text-center fw-bold">
                REGISTER
            </div>
            <div class="card-body">
                <form>
                    <div class="form-outline mb-4">
                        <input type="text" id="registerFirstname" class="form-control" placeholder="Firstname" />
                    </div>

                    <div class="form-outline mb-4">
                        <input type="text" id="registerLastname" class="form-control" placeholder="Lastname" />
                    </div>

                    <div class="form-outline mb-4">
                        <input type="text" id="registerUsername" class="form-control" placeholder="Username" />
                    </div>

                    <div class="form-outline mb-4">
                        <input type="email" id="registerEmail" class="form-control" placeholder="Email" />
                    </div>

                    <div class="form-outline mb-4">
                        <input type="password" id="registerPassword" class="form-control" placeholder="Password" />
                    </div>

                    <div class="form-outline mb-4">
                        <input type="password" id="registerRepeatPassword" class="form-control"
                            placeholder="Repeat password" />
                    </div>

                    <div class="form-check d-flex justify-content-center small mb-4">
                        <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                            aria-describedby="registerCheckHelpText" />
                        <label class="form-check-label" for="registerCheck">
                            I have read and agree to the terms
                        </label>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block mb-4 w-100">Sign in</button>

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
        }
    },
    methods: {
        userRegister(email, password) {
            const payload = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password })
            }
            fetch('http://127.0.0.1:8000/api/auth/login/', payload)
                .then(response => response.json())
                .then(data => { this.login(data) })

        },
    },
}


</script>