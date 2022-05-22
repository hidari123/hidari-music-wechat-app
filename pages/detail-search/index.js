const {
  getSearchHot,
  getSearchSuggest,
  getSearchResult
} = require("../../service/api_search")
// 引入防抖
import debounce from '../../utils/debounce'
// 导入高亮显示搜索关键字方法
import stringToNodes from '../../utils/string2Nodes'
import {
  playerStore
} from '../../store/player-store'
// 返回经过防抖处理的函数
const debounceGetSearchSuggest = debounce(getSearchSuggest)
// pages/detail-search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 热门搜索关键字
    hotKeyWords: [],
    // 搜索建议
    suggestSongs: [],
    // 转化为节点
    suggestSongsNodes: [],
    // 搜索输入值
    searchValue: '',
    // 搜索结果
    resultSongs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取页面数据
    this.getSearcData()
  },

  /**
   * 网络请求
   */
  getSearcData() {
    getSearchHot().then(res => {
      this.setData({
        hotKeyWords: res.result.hots
      })
    })
  },

  /**
   * 事件处理 - 监听搜索框输入内容
   */
  async handleSearchChange(event) {
    // 获取输入的关键字
    const searchValue = event.detail.trim()
    // 保存关键字, 清空搜索结果
    this.setData({
      searchValue,
      resultSongs: []
    })
    // 判断关键字为字符串
    if (!this.data.searchValue.length) {
      // 清空搜索建议, 清空 node 节点
      this.setData({
        suggestSongs: [],
        suggestSongsNodes: []
      })
      // 如果长度为空 取消发送请求
      debounceGetSearchSuggest.cancel()
      return
    }
    // 根据关键字搜索
    const res = await debounceGetSearchSuggest(this.data.searchValue)
    // 如果没有长度 不渲染页面
    // if (!this.data.searchValue.length) {
    //   return
    // }
    // 获取建议的关键字歌曲
    this.setData({
      suggestSongs: res.result.allMatch
    })
    if (!this.data.suggestSongs) return
    // 转成 node 节点
    const suggestKeywords = this.data.suggestSongs.map(item => item.keyword)
    const suggestSongsNodes = []
    for (const keyword of suggestKeywords) {
      const nodes = stringToNodes(keyword, this.data.searchValue)
      suggestSongsNodes.push(nodes)
    }
    this.setData({
      suggestSongsNodes
    })
  },

  /**
   * 事件处理 - 根据关键字搜索
   */
  handleSearchAction() {
    const searchValue = this.data.searchValue
    getSearchResult(searchValue).then(res => {
      this.setData({
        resultSongs: res.result.songs
      })
    })
  },

  /**
   * 拿到点击的关键字
   */
  handleKeywordClick(event) {
    // 获取点击的关键字
    const keyword = event.currentTarget.dataset.keyword
    // 将关键字设置到 searchValue 中
    this.setData({
      searchValue: keyword
    })

    // 发送网络请求
    this.handleSearchAction()
  },

  /**
   * 事件监听 - 监听歌曲点击事件获取歌单和index
   */
  handleSongItemClick(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState('playListSongs', this.data.resultSongs)
    playerStore.setState('playListIndex', index)
  }
})