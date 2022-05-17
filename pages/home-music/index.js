// pages/home-music/index.js

import {
  rankingStore
} from '../../store/index'
import {
  getBanners,
  getSongMenu
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
    swiperHeight: 0,
    // 推荐歌曲
    recommendSongs: [],
    // 热门歌单
    hotSongMenu: [],
    // 推荐歌单
    recommendSongMenu: [],
    // 巅峰榜数据 为了防止请求快的数据打乱原本的顺序，直接根据 idx 确定数据位置
    rankings: {
      0: {},
      2: {},
      3: {}
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取页面数据
    this.getPageData()
    // 发起共享数据请求
    rankingStore.dispatch('getRankingDataAction')
    // 从 store 获取共享的数据
    this.setupPlayerStoreListener()
  },

  /**
   * 事件处理 - 从 store 获取共享的数据
   */
  setupPlayerStoreListener() {
    // store 中取出热门歌单数据
    rankingStore.onState('hotRankings', (res) => {
      if (!res.tracks) return
      this.setData({
        recommendSongs: res.tracks.slice(0, 6)
      })
    })
    // store 中取出巅峰榜数据
    rankingStore.onState("newRankings", this.getHandleRankingsData(0));
    rankingStore.onState("originRankings", this.getHandleRankingsData(2));
    rankingStore.onState("upRankings", this.getHandleRankingsData(3));
  },

  /**
   * 事件处理 - 获取榜单数据
   * 因为有3个 state 都需要返回同一种格式的数据，调用三次，直接返回另外一个函数
   * 在state变化时会监听三个函数
   * @param {Number} idx 需要监听的 state 的回调函数参数
   */
  getHandleRankingsData(idx) {
    return (res) => {
      // 如果没有数据 => 直接返回
      if (Object.keys(res).length === 0) return
      const name = res.name
      const songlist = res.tracks.slice(0, 3)
      const coverImgUrl = res.coverImgUrl
      const playCount = res.playCount
      const rankingObj = {
        name,
        songlist,
        coverImgUrl,
        playCount
      }
      // 展开拿到原来的数据 加上新的对象
      const newRankings = {
        ...this.data.rankings,
        // 如果不加 [] => idx，加上[] => 动态展示 idx 对应的数据
        [idx]: rankingObj
      };
      this.setData({
        rankings: newRankings
      })
    }
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

    /**
     * 热门歌单
     */
    getSongMenu().then(res => {
      this.setData({
        hotSongMenu: res.playlists
      })
    })

    /**
     * 华语歌单
     */
    getSongMenu("华语").then(res => {
      this.setData({
        recommendSongMenu: res.playlists
      })
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
  }
})