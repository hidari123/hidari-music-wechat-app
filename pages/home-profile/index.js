// pages/home-profile/index.js
import {
  getUserInfo
} from '../../service/api_login'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 获取用户信息
   */
  async handleGetUserInfo() {
    const res = await getUserInfo()
  }
})