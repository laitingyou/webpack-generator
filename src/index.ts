import  Vue from 'vue'
import Hello from './components/hello.vue'
Vue.config.productionTip = false;
let vm= new Vue({
    el: '#app',
    render(h: Function){
        return h(Hello)
    }
})
