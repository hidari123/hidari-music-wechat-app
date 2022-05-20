/**
 * 封装登录api
 */

import {
  hidariLoginRequest
} from './index'

/**
 * 获取 code
 */
export const getLoginCode = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 1000,
      success: res => {
        // code
        const code = res.code
        console.log(code)
        resolve(code)
      },
      fail: reject
    })
  })
}

/**
 * code 发送给服务器
 * @param {String} code 唯一标识（令牌）
 */
export const codeToToken = (code) => {
  // 注意要 return 否则返回的是 undefined
  return hidariLoginRequest.post('/login', {
    code
  })
}


/**
 * 检查 token 是否过期
 * @param {String} token 服务器返回的 token => 封装后不需要再传
 */
export const checkToken = () => {
  /**
   * {} => 参数
   * true => 需要包含请求头
   */
  return hidariLoginRequest.post('/auth', {}, true)
}

/**
 * 判断 session 是否过期
 * 过期 => false
 * 未过期 => true
 */
export const checkSession = () => {
  return new Promise((resolve) => {
    wx.checkSession({
      success: () => {
        resolve(true)
      },
      fail: () => {
        resolve(false)
      }
    })
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: 'hello hidari!',
      success: res => {
        console.log(res)
        resolve(res)
      },
      fail: reject
    })
  })
}