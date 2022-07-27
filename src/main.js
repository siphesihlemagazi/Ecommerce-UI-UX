import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'

import "bootstrap"
import {library} from "@fortawesome/fontawesome-svg-core" 
import "bootstrap/dist/css/bootstrap.css"
import "animate.css/animate.css"


import {
    faShoppingCart,
    faDollarSign
} from "@fortawesome/free-solid-svg-icons"

library.add(faShoppingCart, faDollarSign)

const emitter = mitt()
const app = createApp(App)

app.config.globalProperties.emitter = emitter
app.mount('#app')
