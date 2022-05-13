/**
 * 封装 wx.request({}) 请求
 */
// base_url 常量
const BASE_URL = 'http://123.207.32.32:9001'
class HidariRequest {
  /**
   * 封装 wx.request({})请求方法
   * @param {String} url 请求地址
   * @param {String} method 请求方法
   * @param {Object} params 请求参数
   */
  request(url, method, params) {
    // 通过 promise 返回拿到结果
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        method: method,
        data: params,
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
   */
  get(url, params) {
    return this.request(url, 'GET', params)
  }

  /**
   * 封装 post 请求
   * @param {String} url 请求地址
   * @param {String} params 请求参数
   */
  post(url, params) {
    return this.request(url, 'POST', params)
  }
}

const hidariRequest = new HidariRequest()

export default hidariRequest