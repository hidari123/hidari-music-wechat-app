// app.js

import {
  getLoginCode,
  codeToToken,
  checkToken,
  checkSession,
  getUserInfo
} from './service/api_login'
import {
  NAV_BAR_HEIGHT
} from './constants/device-const'
import {
  TOKEN_KEY
} from './constants/login-const'
App({
  // 定义全局数据
  globalData: {
    // 初始化屏幕宽度
    screenWidth: 0,
    // 初始化屏幕高度
    screenHeight: 0,
    // 状态栏高度
    statusBarHeight: 0,
    // 导航栏的高度
    navBarHeight: NAV_BAR_HEIGHT,
    // 屏幕高宽比
    deviceRatio: 0
  },
  // 程序启动生命周期
  onLaunch() {
    // 设置设备信息
    const info = wx.getSystemInfoSync()
    // 获取屏幕宽高
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
    // 获取状态栏高度
    this.globalData.statusBarHeight = info.statusBarHeight
    // 计算高宽比
    const ratio = info.screenHeight / info.screenWidth
    this.globalData.deviceRatio = ratio

    // 用户默认进行登录
    this.handleLogin()

    // 获取用户信息
  },
  /**
   * 用户登录
   * 判断用户要不要登录， 检查本地有没有token， 检查token有效期，检查session是否过期
   */
  async handleLogin() {
    const token = wx.getStorageSync(TOKEN_KEY)
    // token 是否过期
    const checkRes = await checkToken(token)
    // 判断 session 是否过期
    const isSessionExpire = await checkSession()
    if (!token || checkRes.errorCode || !isSessionExpire) {
      this.loginAction()
    }
  },
  /**
   * 登录
   */
  async loginAction() {
    // 获取 code
    const code = await getLoginCode()
    // code 发送给服务器
    const {
      token
    } = await codeToToken(code)
    // token 保存在 weapp 的 storage 中
    wx.setStorageSync(TOKEN_KEY, token)
  }
})