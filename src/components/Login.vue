<template>
    <div class="Register">
        <form>
            <p class="text-center">Login</p>

            <div class="form-outline mb-4">
                <input type="email" id="loginName" class="form-control" placeholder="Email" v-model="email" />
            </div>

            <div class="form-outline mb-4">
                <input type="password" id="loginPassword" class="form-control" placeholder="Password" v-model="password" />
            </div>

            <div class="row mb-4">
                <div class="col-md-6 d-flex justify-content-center">
                    <div class="form-check mb-3 mb-md-0">
                        <input class="form-check-input" type="checkbox" value="" id="loginCheck" checked />
                        <label class="form-check-label" for="loginCheck"> Remember me </label>
                    </div>
                </div>
                <div class="col-md-6 d-flex justify-content-center">
                    <a href="#!">Forgot password?</a>
                </div>
            </div>

            <button type="submit" class="btn btn-primary btn-block mb-4 w-100" @click.prevent="submitLogin(email, password)">Sign in</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    props: ['email', 'password', 'submitLogin'],
    data: function () {
        return {

        }
    },
    created() {
    },
    components: {
    },

}
</script>