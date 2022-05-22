// pages/home-profile/index.js
import {
  getUserInfo
} from '../../service/api_login'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    userInfo: {}
  },

  /**
   * 获取用户信息
   */
  async handleGetUserInfo() {
    const {
      userInfo
    } = await getUserInfo()
    this.setData({
      userInfo
    })
  },

  /**
   * 获取手机号码
   */
  async handleGetPhoneNumber(event) {
    console.log(event)
    // getPhoneNumber:fail no permission
  }
})