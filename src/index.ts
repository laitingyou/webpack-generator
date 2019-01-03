import  Vue from 'vue'
import Hello from './components/hello.vue'
let vm= new Vue({
    el: '#app',
    render(h: Function){
        return h(Hello)
    }
    // template: `<div>12321321</div>`
})
// console.log(vm.$refs)
