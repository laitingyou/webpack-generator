// import './index.scss'
import Vue from 'vue'

import Hello from './components/hello'

new Vue({
  el: '#app',
  render(h){
    return h(Hello)
  }
})
