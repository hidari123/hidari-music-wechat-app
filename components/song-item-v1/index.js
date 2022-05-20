// components/song-item-v1/index.js
import {
  playerStore
} from '../../store/player-store'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 歌曲数据项
    item: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    handleItemClick() {
      // 获取歌曲 id
      const id = this.properties.item.id
      // 发送请求
      playerStore.dispatch("playMusicWithSongIdAction", {
        id
      })
      // 页面跳转
      wx.navigateTo({
        url: `/pages/music-player/index?id=${id}`,
      })
    }
  }
})