/**
 * 封装 wx.request({}) 请求
 */
import {
  TOKEN_KEY
} from '../constants/login-const'
const token = wx.getStorageSync(TOKEN_KEY)
// base_url 常量
const BASE_URL = 'http://123.207.32.32:9001'
// 登录的 base_URL
const LOGIN_BASE_URL = "http://123.207.32.32:3000"
class HidariRequest {
  // 外界传进来一个 baseUrl
  constructor(baseURL, authHEADER = {}) {
    this.baseURL = baseURL
    this.authHEADER = authHEADER
  }
  /**
   * 封装 wx.request({})请求方法
   * @param {String} url 请求地址
   * @param {String} method 请求方法
   * @param {Object} params 请求参数
   * @param {*} isAuth 是否需要授权 默认 false
   * @param {*} header 请求头 默认为空对象
   */
  request(url, method, params, isAuth = false, header = {}) {
    // 获取最终 header，如果需要授权，把header和传进来的header放到同一个数组中
    const finalHeader = isAuth ? {
      ...this.authHEADER,
      ...header
    } : header
    // 通过 promise 返回拿到结果
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseURL + url,
        method: method,
        data: params,
        header: finalHeader,
        success: (res) => {
          resolve(res.data)
          console.log(res.data)
        },
        fail: reject // js 简写形式 相当于
        /**
         * fail: (err) => reject(err)
         */
      })
    })
  }

  /**
   * 封装 get 请求
   * @param {String} url 请求地址
   * @param {String} params 请求参数
   * @param {*} isAuth 是否需要授权 默认 false
   * @param {*} header 请求头 默认为空对象
   */
  get(url, params, isAuth = false, header) {
    return this.request(url, 'GET', params, isAuth, header)
  }

  /**
   * 封装 post 请求
   * @param {String} url 请求地址
   * @param {String} params 请求参数
   * @param {*} isAuth 是否需要授权 默认 false
   * @param {*} header 请求头 默认为空对象
   */
  post(url, params, isAuth = false, header) {
    return this.request(url, 'POST', params, isAuth, header)
  }
}
// 其他request
const hidariRequest = new HidariRequest(BASE_URL)
// 登录相关request
const hidariLoginRequest = new HidariRequest(LOGIN_BASE_URL, {
  token
})

export default hidariRequest
export {
  hidariLoginRequest
}