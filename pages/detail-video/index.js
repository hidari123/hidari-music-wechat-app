// pages/detail-video/index.js

import {
  getMVURL,
  getMVDetail,
  getRelatedVideo
} from '../../service/api_video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 请求播放地址信息
    mvURLInfo: {},
    // mv详情信息
    mvDetail: {},
    // mv相关视频信息
    relatedVideos: [],
    // 弹幕数据
    danmuList: [{
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#00ff00',
        time: 3
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 得到传入的 id
    const id = options.id

    // 获取请求数据
    this.getPageData(id)
  },

  /**
   * 获取网络请求
   */
  getPageData(id) {
    // 如果用 async await 会等带上一个请求结束后再开始下一个请求, 效率低
    // 用 promise.then() 同时发送三个请求 效率更高

    // 请求播放地址
    getMVURL(id).then(res => {
      this.setData({
        mvURLInfo: res.data
      })
    })

    // 请求视频信息
    getMVDetail(id).then(res => {
      this.setData({
        mvDetail: res.data
      })
    })

    // 请求相关视频
    getRelatedVideo(id).then(res => {
      this.setData({
        relatedVideos: res.data
      })
    })
  },

  /**
   * 封装事件处理的方法
   * 监听item点击事件
   */
  handleVideoItemClick(event) {
    // 得到点击的 item.id
    const vid = event.currentTarget.dataset.item.vid
    console.log(vid);
    // 页面跳转
    wx.navigateTo({
      url: `/pages/detail-video/index?id=${vid}`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

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