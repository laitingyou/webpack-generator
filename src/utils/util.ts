import Vue from 'vue'
// import Api from "./api"
// const aids = {
//   '2018122910384511874': ['sendCard', 'demandCard'],
//   '2018122910403411942': ['getSendCard', 'sendCardByDemand'],
//   '2018122910433211382': [], // 'openRedBag'
//   '2018122910465811917': ['getHelpList'], // 'mergeLargeBag'
//   // '2018120316505511204': []
// }
const bids = ['2018120316505511204','2018122910384511874', '2018122910403411942', '2018122910433211382', '2018122910465811917']
// let getAid = function (name) {
//   for (let inf in Api) {
//     if(Api[inf] == name){
//       for(let aid in aids){
//         if(aids[aid].indexOf(inf) > -1){
//           return aid
//         }
//       }
//     }
//   }
//   return sdi_aid
// }
/**
 * TODO 获取token
 * @param token 是否需要请求token, 默认 true
 * @param ignoreToken 无论是否获取到token, 都请求接口, 默认 false
 * @returns {Promise<any>}
 */
let getActToken = function (token:boolean, ignoreToken:boolean, target:string, reTryingTime:number, bidIndex:number) {
  return new Promise(function (resolve, reject) {
    if(window._env !== 5 || !token){
      resolve({})
      return
    }
    // let aid = getAid(target)
    // TcsJSBridge.invoke('getActToken',
    window._sdi.tool.GjJs("getActToken", {
      id: bids[bidIndex]
    }, function (res:any) {
      if (res.err_msg == "ok" && res.ret == 0) {
        resolve({...res, bid: bids[bidIndex]})
      } else {
        if(ignoreToken){
          resolve({
            token: '',
            bid: bids[bidIndex]
          })
        }else {
          if(!reTryingTime){
            reject(res)
          }
        }

        // 失败参数统计
        switch (~~res.ret) {
          case 1:
            if(!ignoreToken){
              setTimeout(()=>{
                getActToken(token, ignoreToken, target, reTryingTime--, bidIndex).then(res=>{
                  resolve(res)
                }).catch(err=>{
                  reject(err)
                })
              }, 500)
            }else {
              resolve(res)
            }
            window._sdi.stat({ptype:'10',stype:'2'});
            break
          case 7:
            // 重试玩第五个bid还不成功就报错
            if(bidIndex === 4){
              return reject(res)
            }
            // 金山那边的接口不重试
            if([
              '/fission/relation/add',
              '/fission/relation/add',
              '/money/query',
              '/money/draw'
            ].indexOf(target) > -1){
              return reject(res)
            }
            if(!ignoreToken){
                getActToken(token, ignoreToken, target, 3, ++bidIndex).then(res=>{
                  resolve(res)
                }).catch(err=>{
                  reject(err)
                })
            }else {
              resolve(res)
            }
              window._sdi.stat({ptype:'10',stype:'1'});
            break
          default:
            reject(res)
              window._sdi.stat({ptype:'10',stype:'3'});
        }

        // 总失败 统计
          window._sdi.stat({ptype:'7',stype:'9'});

        // ios和安卓失败统计
        if(window._ios){
            window._sdi.stat({ptype:'11',stype:'1'});
        }else {
            window._sdi.stat({ptype:'11',stype:'2'});
        }

      }
    })
  })
}

/**
 * TODO 登录微信
 * @param callback
 */
let loginWX = function () {
  return new Promise(function (resolve, reject) {
    _sdi.tool.GjJs("loginWX", {}, function (res:any) {
      if (res.err_msg == "ok" && res.ret == 0) {
        resolve()
      } else {
        reject("登录失败，err_msg: " + res.err_msg + " res.ret: " + res.ret);
      }
    })
  })

}

/**
 *  TODO 获取登录态
 * @returns {Promise<any>}
 */
let getWXLoginState = function () {
  return new Promise(function (resolve, reject) {
    if(window._env !== 5){
      resolve(window.sdi_wx_user)
      return
    }
    let  wifi_userInfo = window.localStorage.getItem('wifi_userInfo')
    if(wifi_userInfo){
      resolve(JSON.parse(wifi_userInfo))
      return
    }
    window._sdi.tool.GjJs("getWXLoginState", {
      uin: ""
    }, function (res:any) {
      if (res.err_msg == "ok" && res.ret == 0) {
        if (res.state == "online") {
            Promise.all([ getInfo([ 'guid', 'imei' ]) ]).then(infoRes => {
              window.localStorage.setItem('wifi_userInfo', JSON.stringify({ ...res, ...infoRes[ 0 ] }))
              resolve({ ...res, ...infoRes[ 0 ] })
            })
        } else/* if(res.state == "offline")*/ {
          loginWX().then(res => {
            console.log('登录成功')
            return getWXLoginState().then(res=>{
              resolve(res)
            })
          })
        }
      } else {
        reject('获取登录态失败')
      }
    })
  })

}

/**
 * TODO 获取手机信息
 * @param aKey
 * @returns {Promise<any>}
 */
let getInfo = function (aKey:Array<string> = []) : Promise<any>{
  return new Promise(function (resolve, reject) {
    if(window._env !== 5){
      resolve({})
      return
    }
    let length = aKey.length
    let body:any = {}
    aKey.map(function (item, index) {
      TcsJSBridge !== void 0 && TcsJSBridge.invoke("getInfo", {
        key: item,
        simplot: 0
      }, function (res:any) {
        if (res.err_msg == "ok") {
          // console.log("获取成功，value: " + res.ret);
          if (item == "advertisingID") {
            body[ "imei" ] = res.ret
          } else {
            body[ item ] = res.ret
          }
          if (length === index + 1) {
            resolve(body)
          }

        } else {
          reject("获取失败，err_msg: " + res.err_msg);
        }
      })
    })

  })

}

/**
 *  TODO 微信加参数，带到管家页面
 *
 * @param data
 */
let addParamToApp = function ( data:any = {}):void {
  let query = window.baseUrl.indexOf('?') > -1 ? '&' : '?'
  for (let param in data) {
    if (query === '?') {
      query += `${param}=${data[ param ]}`
    } else {
      query += `&${param}=${data[ param ]}`
    }
  }
  if (Vue.prototype.$ios) {
    layerClickList.nbLayer1.openData.ios.openUrl = `GTfreewifi://mqqwebview?url=${encodeURIComponent(window.baseUrl+query+'#/home')}`
  } else {
    layerClickList.nbLayer1.openData.android.viewId = `{'dest_view':65538,'show_id':'show_001','show_channel':'channel_001'}{'extra_url':'${window.baseUrl}${query}#/home'}`
  }

}

/**
 * TODO 获取POI
 * @returns {Promise<any>}
 */
let getPoi = function ():Promise<object> {
  return new Promise(function (resolve, reject) {
    if(window._env !== 5){
      resolve({})
      return
    }
    TcsJSBridge.invoke('sendMessage', {
      "info_type": "get_wifi_activity_info",
      "plugin_id": 183
    }, function (res:any) {
      if (res.err_msg == "ok") {
        resolve({
          poi: res.data
        })
      } else {
        reject("sendMessage => 通知失败:" + JSON.stringify(res))
      }
    })
  })
}

/**
 * TODO 解析参数
 * @param param
 * @param link
 * @returns {string}
 */
let getQuery = function (param:string, link = window.location.href):any {
  try {
    let reg = new RegExp(`[&?]${param}\=(.*?)(#|&|$)`)
    return (reg.exec(link) as Array<any>)[ 1 ]
  }catch (e) {
    return null
  }

}

let gotoAppView = function (finishCurrentWebView = true) {
  if (window._ios) {
    TcsJSBridge.invoke("gotoAppView", {
      viewId_ios: -1,
      finishSelf: true
    }, function (res:any) {});
  }
  TcsJSBridge.invoke("gotoAppView", {
    viewId: 11993089,
    viewId_ios: 7,
    // str1: "nationDay",
    // str2: "str param 2",
    int1: 2,
    int2: 1,
    pkg: "com.tencent.wifimanager",
    finishSelf : finishCurrentWebView,

  }, function(res:any) {
  });
}


let deepCopy = function (obj:(object|Array<any>)) {
  return JSON.parse(JSON.stringify(obj))
}


export default {
  getActToken,
  loginWX,
  getWXLoginState,
  addParamToApp,
  getPoi,
  getQuery,
  gotoAppView,
  deepCopy
}
