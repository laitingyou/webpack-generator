import Toast from '../components/common/Toast.vue'
import Loading from '../components/common/Loading.vue'

let globals:any = {}
let  instance:any = null
let loadingInstance:any = null
globals.install = function (Vue:any, options?:object){
  let ios = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLocaleLowerCase())
  Vue.prototype.$env = window._sdi && window._sdi.tool.getApp()
  Vue.prototype.$ios =  ios
  window._ios = ios
  Vue.prototype.$toast = function (text?:string) {
    if(!instance){
      const ToastConstructor = Vue.extend(Toast)
      instance = new ToastConstructor({
        el: document.createElement('div')
      })
      document.body.appendChild(instance.$el);
    }
    Vue.nextTick(() => {
      instance.visible = true;
      instance.text = text;
      });
  }
  Vue.prototype.$showLoading = function (text?:string, type:number = 1) {
    if(!loadingInstance){
      const LoadingConstructor = Vue.extend(Loading)
      loadingInstance = new LoadingConstructor({
        el: document.createElement('div')
      })
      document.body.appendChild(loadingInstance.$el);
    }
    Vue.nextTick(() =>{
        loadingInstance.visible = true;
        loadingInstance.text = text;
        loadingInstance.type = type;
    });
  }
  Vue.prototype.$closeLoading = function () {
    Vue.nextTick(() => {
      loadingInstance.visible = false;
    });
  }
}

export default globals

