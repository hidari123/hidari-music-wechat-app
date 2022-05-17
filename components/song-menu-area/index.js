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
  methods: {
    /**
     * 事件处理 - 点击歌单 item 跳转到更多歌曲页面
     */
    handleMenuItemClick(event) {
      const item = event.currentTarget.dataset.item
      wx.navigateTo({
        url: `/pages/detail-songs/index?id=${item.id}&&type=menu`,
      })
    },
  }
})