// components/song-menu-area/index.js

// 拿到app数据
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 标题
    title: {
      type: String,
      value: "默认歌单"
    },
    // 歌单
    songMenu: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 获取屏幕宽度
    screenWidth: app.globalData.screenWidth
  },

  /**
   * 组件的方法列表
   */
  methods: {}
})