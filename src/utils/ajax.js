import Axios from 'axios'
import util from './util'
import Vue from 'vue'

const host = {
  com: 'https://sdi.m.qq.com',
  test: 'https://sdiface.sparta.html5.qq.com'
}
const env = 'com'
const request = {}


function baseRequest(
  {
    method,
    url,
    data,
    error,
    token,
    ignoreToken
  }
){
  return new Promise(function (resolve, reject) {
    util.getWXLoginState().then(res=>{
      !token && delete res.token
      util.getActToken(token, ignoreToken, url, 3, 0).then((_res)=>{
        window.$userData = {
          unionid: res.unionid || res.uin,
          nickname: res.name,
        }
        if(window._env === 5){
          data = {
            accountId: res.accountid,
            unionid: res.uin,
            token: _res.token,
            nickname: res.name,
            openid: res.openid,
            headimgurl: res.wx_faceUrl || "",
            bid: _res.bid || sdi_aid,
            aid: sdi_aid,
            env: window._env,
            guid: res.guid,
            gjid: res.accountid,
            user: {
              headimg: res.wx_faceUrl,
              nickname: res.name,
            },
            imei: res.imei || res.guid,
            ...data,
          }
        }else {
          data = {
            unionid: res.unionid,
            token: res.token,
            nickname: res.nickname,
            openid: res.openid,
            headimgurl: res.headimgurl + 132 || "",
            aid: sdi_aid,
            bid: sdi_aid,
            env: window._env,
            ...data,
          }
        }
        Axios({
          method,
          url: host[env] + url,
          data: method === 'post' ? data : {},
          params: method === 'get' ? data : {},
        }).then(res=>{
          if(res.data.success === 0 || res.data.success === 1){
            resolve(res.data)
          }else if(res.data.success === -1){
            Vue.prototype.$closeLoading()
              if(error){
              Vue.prototype.$toast(res.data.message)
            }
            reject(res.data)
          }else {
            Vue.prototype.$closeLoading()
            Vue.prototype.$toast('网络异常')
            reject()
          }
        }).catch(err=>{
          Vue.prototype.$closeLoading()
          Vue.prototype.$toast('网络异常')
          reject()
        })
      }).catch(err=>{
        Vue.prototype.$closeLoading()
        Vue.prototype.$toast(`活动太火爆了，请稍后再试(${err.ret})`)
      })
    }).catch(err=>{
      Vue.prototype.$closeLoading()
      Vue.prototype.$toast('登录失败')
    })

  })

}

request.get = function (
  {
    url,
    data = {},
    error = true,
    token = true,
    ignoreToken = false
  }
) {
  return baseRequest({
    method: 'get',
    url,
    data,
    error,
    token,
    ignoreToken
  })
}

request.post = function (
  {
    url,
    data = {},
    error = true,
    token = true,
    ignoreToken = false
  }
) {
  return baseRequest({
    method: 'post',
    url,
    data,
    error,
    token,
    ignoreToken
  })
}

export default request
