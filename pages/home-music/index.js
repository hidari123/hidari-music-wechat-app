// pages/home-music/index.js

import {
  getBanners
} from '../../service/api_music'
import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'

// 生成节流函数
const throttleQueryRect = throttle(queryRect)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    banners: [],
    // swiper轮播图高度(图片显示区域高度)
    swiperHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取页面数据
    this.getPageData()
  },

  /**
   * 事件处理 - 网络请求
   */
  getPageData() {
    getBanners().then(res => {
      /**
       * setData 是同步的还是异步的
       * setData 在设置 data 数据上 => 同步
       * 通过最新的数据对 wxml 进行渲染 => 异步
       * react 中是异步的
       */
      this.setData({
        banners: res.banners
      })
      // 可以直接拿到数据
      // console.log(this.data.banners)
    })
  },

  /**
   * 事件处理 - 点击搜索框
   */
  handleSearchClick() {
    wx.navigateTo({
      url: '/pages/detail-search/index',
    })
  },

  /**
   * 事件处理 - 获取图片高度
   */
  handleSwiperImageLoaded() {
    // 获取 image 组件的高度
    throttleQueryRect('.swiper-image').then(res => {
      const rect = res[0]
      // 此时1s内只会执行一次
      this.setData({
        swiperHeight: rect.height
      })
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})