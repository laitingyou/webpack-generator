import  Vue from 'vue'
Vue.use(globals)
import router from './routes/index'
import globals from './utils/globals'
import App from './App.vue'
Vue.config.productionTip = false;
import './index.scss'
const MockTest = require('./test/index')

let vm= new Vue({
    el: '#app',
    router,
    render(h: Function){
        return h(App)
    }
})
