// pages/home-video/index.js

import {
  getTopMV
} from '../../service/api_video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 视频数据列表
    topMVs: [],
    // 是否有更多数据
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载 (created)
   */
  onLoad(options) {
    /**
     * 请求视频数据api
     */
    this.getTopMVData(0)
  },

  /**
   * 封装网络请求方法
   */
  async getTopMVData(offset) {
    // 判断是否可以请求
    // 如果没有更多数据, 直接返回
    if (!this.data.hasMore && offset !== 0) return
    // 展示加载动画
    wx.showNavigationBarLoading()
    // 主动触发下拉刷新 不能乱用 会一直刷新
    // if (offset === 0) {
    //   wx.startPullDownRefresh()
    // }
    // 请求数据
    const res = await getTopMV(offset)
    let newData = this.data.topMVs
    if (offset === 0) {
      newData = res.data
    } else {
      // 微信小程序的类库中没有包含数组的push()方法（给数组添加元素）
      newData = [...newData, ...res.data]
    }
    // 设置数据
    this.setData({
      topMVs: newData,
      hasMore: res.hasMore
    })
    // 关闭加载动画
    wx.hideNavigationBarLoading()
    // 关闭下拉刷新动画 需要写 不然已经加载结束动画也不会停止
    if (offset === 0) {
      wx.stopPullDownRefresh()
    }
  },

  /**
   * 封装事件处理的方法
   * 监听item点击事件
   */
  handleVideoItemClick(event) {
    // 得到点击的 item.id
    const id = event.currentTarget.dataset.item.id
    // 页面跳转
    wx.navigateTo({
      url: `/pages/detail-video/index?id=${id}`,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getTopMVData(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.getTopMVData(this.data.topMVs.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})