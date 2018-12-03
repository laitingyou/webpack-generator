// import './index.scss'
// import Vue from 'vue'
//
// import Hello from './components/hello'
//
// new Vue({
//   el: '#app',
//   render(h){
//     return h(Hello)
//   }
// })
import React from 'react'
import ReactDom from 'react-dom'
import World from './components/World'
ReactDom.render(
  <World/>,
  document.getElementById('app')
)
