import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'

import "bootstrap"
import { library } from "@fortawesome/fontawesome-svg-core"
import "bootstrap/dist/css/bootstrap.css"


import {
    faShoppingCart,
    faDollarSign,
    faTrashCan,
    faPlus,
    faMinus,
    faCircleUser,
    faFilter,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons"

library.add(faShoppingCart, faDollarSign, faTrashCan, faPlus, faMinus, faCircleUser, faFilter, faMagnifyingGlass)

const emitter = mitt()
const app = createApp(App)

app.config.globalProperties.emitter = emitter

createApp(App).use(router).mount('#app')
