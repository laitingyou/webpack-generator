import Vue from 'vue';
import Hello from './components/hello.vue';
var vm = new Vue({
    el: '#app',
    render: function (h) {
        return h(Hello);
    }
    // template: `<div>12321321</div>`
});
// console.log(vm.$refs)
