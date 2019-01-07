import Vue, { VNode } from 'vue';
declare global {
    // declare let _sdi:any
    interface Window{
        _ios: boolean,
        _sdi: any,
        _env: number,
        TcsJSBridge: any,
        baseUrl: string,
        sdi_wx_user: any
    }
    const _sdi:any
    const TcsJSBridge:any
    const layerClickList:any
}
declare module 'vue/types/vue' {
    interface Vue {
        $showLoading: Function,
        $toast: Function
    }
}

  // namespace JSX {
    // tslint:disable no-empty-interface
    // interface Element extends VNode {}
    // tslint:disable no-empty-interface
    // interface ElementClass extends Vue {}
    // interface IntrinsicElements {
    //   [elem: string]: any;
    // }
  // }
