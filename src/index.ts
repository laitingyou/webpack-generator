import  Vue from 'vue'
Vue.use(globals)
import router from './routes/index'
import globals from './utils/globals'
import App from './App.vue'
Vue.config.productionTip = false;
import './index.scss'
const MockTest = require('./test/index')

import WButton from './components/common/Button.vue'
Vue.component('WButton', WButton)

let vm= new Vue({
    el: '#app',
    router,
    render(h: Function){
        return h(App)
    }
})
