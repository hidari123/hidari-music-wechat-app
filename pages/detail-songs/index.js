import {
  rankingStore,
  playerStore
} from '../../store/index'
import {
  getSongData
} from '../../service/api_music'
// pages/detail-songs/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 跳转过来的榜单名称
    rankingName: "",
    // 歌单信息
    songsInfo: {},
    // 跳转过来的数据是哪个类型
    type: ''
  },


  /**
   * 生命周期函数--监听页面加载
   * @param {*} options 路径传递来的参数集合对象
   */
  onLoad(options) {
    this.setData({
      type: options.type
    })
    if (this.data.type === 'menu') {
      // type 是歌单 => 从歌单跳转
      const id = options.id
      // 请求数据
      getSongData(id).then(res => {
        this.setData({
          songsInfo: res.playlist
        })
      })
    } else if (this.data.type === 'rank') {
      // type 是 榜单 => 从榜单跳转
      const rankingName = options.ranking
      this.setData({
        rankingName
      })
      // 获取数据
      rankingStore.onState(rankingName, this.getRankingDataHandler)
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 取消监听
    if (this.data.rankingName) {
      rankingStore.offState(this.data.rankingName, this.getRankingDataHandler)
    }
  },
  /**
   * 设置榜单详情信息
   * @param {Object} res onState 传来的榜单详情信息
   */
  getRankingDataHandler(res) {
    if (res) {
      this.setData({
        songsInfo: res
      })
    }
  },

  /**
   * 事件监听 - 监听歌曲点击事件获取歌单和index
   */
  handleSongItemClick(event) {
    const index = event.currentTarget.dataset.index
    console.log(this.data.songsInfo.tracks, index)
    playerStore.setState('playListSongs', this.data.songsInfo.tracks)
    playerStore.setState('playListIndex', index)
  }
})