// pages/detail-video/index.js

import {
  getMVURL,
  getMVDetail,
  getRelatedVideo,
  getMoreVideoDetail,
  getMoreMVURL
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
    ],
    // 发布时间
    publishTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 得到传入的 id
    const id = options.id

    // 获取请求数据
    if (id.length < 20) {
      this.getPageData(id)
    } else {
      this.getMoreData(id)
    }

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
   * 请求更多视频信息
   * @param {*} event 
   */
  getMoreData(vid) {
    // 请求更多视频详情
    getMoreVideoDetail(vid).then(res => {
      this.setData({
        mvDetail: res.data,
        // /(?<=\u0020).*/ => 匹配空格后的字符，替换为空格（删除）
        publishTime: new Date(parseInt(res.data.publishTime)).toLocaleString().replace(/(?<=\u0020).*/, ' ')
      })
    })
    // 请求更多视频播放地址
    getMoreMVURL(vid).then(res => {
      this.setData({
        mvURLInfo: res.urls[0]
      })
    })
    // 请求相关视频
    getRelatedVideo(vid).then(res => {
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
    // 页面跳转
    wx.navigateTo({
      url: `/pages/detail-video/index?id=${vid}`,
    })
  }
})