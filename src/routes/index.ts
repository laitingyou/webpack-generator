import Vue from "vue";
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Hello from '../components/Home.vue'
import Invite from '../components/Invite.vue'
// import util from 'utils/util'
const router = new VueRouter({
  routes:[
    {
      path: '/',
      component: Hello,
        redirect: '/invite'
      // beforeEnter: (to, from, next) => {
      //   let env = window._env
      //   let source = util.getQuery('source')
      //   if(env === 2 ){
      //     if(source){
      //       next('/wx')
      //     }else {
      //       next('/home')
      //     }
      //   }else if(env === 5 ){
      //       next('/home')
      //   }else {
      //     next('/error')
      //   }
      // }
    },
      {
          path: '/invite',
          component: Invite,
      },

  ]
})
export default router
