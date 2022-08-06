<template>
    <div class="Register">
        <form>
            <p class="text-center">Register</p>

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
                <input type="password" id="registerRepeatPassword" class="form-control" placeholder="Repeat password" />
            </div>

            <div class="form-check d-flex justify-content-center mb-4">
                <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                    aria-describedby="registerCheckHelpText" />
                <label class="form-check-label" for="registerCheck">
                    I have read and agree to the terms
                </label>
            </div>

            <button type="submit" class="btn btn-primary btn-block mb- w-100">Sign in</button>
        </form>
    </div>
</template>