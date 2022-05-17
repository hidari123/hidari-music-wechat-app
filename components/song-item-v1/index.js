// components/song-item-v1/index.js
// import { playerStore } from "../../store/index"
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
    handleItemClick(event) {
      const id = event.currentTarget.dataset.item.id;
      // playerStore.dispatch("playMusicWithSongIdAction", {
      //   id
      // });
      wx.navigateTo({
        url: '/packagePlayer/pages/music-player/index?id=' + id,
      })
    }
  }
})