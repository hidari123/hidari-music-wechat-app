// pages/music-player/index.js

const playModeNames = ["order", "repeat", "random"]

import {
  audioContext,
  playerStore
} from '../../store/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面跳转传入的 id
    id: 0,
    // 当前歌曲
    currentSong: {},
    // 当前页
    currentPage: 0,
    // 内容区高度
    contentHeight: 0,
    // 是否显示歌词
    isMusicLyric: true,
    // 歌曲时长
    durationTime: 0,
    // 当前播放时间
    currentTime: 0,
    // 歌词数组
    lyricInfos: [],
    // 需要显示的歌词
    currentLyricText: '',
    // 需要显示歌词的 index
    currentLyricIndex: '',
    // 滑块值
    sliderValue: 0,
    // 是否正在移动滑块
    isSliderChanging: false,
    // 播放歌曲时歌词向上滚动距离
    lyricScrollTop: 0,
    // 歌词是否在滚动
    isLyricScroll: false,
    // 播放模式下标
    playModeIndex: 0,
    // 播放模式名称
    playModeName: "order",
    // 是否正在播放
    isPlaying: false,
    // 播放状态名称
    playingName: "pause"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取传入的 id
    const id = options.id
    this.setData({
      id
    })
    // 根据 id 获取数据（store）
    this.setupPlayerStoreListener()

    // 动态计算内容区高度
    this.getContentHeight()
  },

  /**
   * 动态计算内容区高度
   */
  getContentHeight() {
    const {
      statusBarHeight,
      navBarHeight,
      screenHeight,
      deviceRatio
    } = getApp().globalData
    const contentHeight = screenHeight - statusBarHeight - navBarHeight
    this.setData({
      contentHeight,
      isMusicLyric: deviceRatio >= 2
    })
  },

  /**
   * 数据监听 - 从store中取值 
   */
  setupPlayerStoreListener() {
    // "currentSong", "durationTime", "lyricInfos"
    playerStore.onStates(["currentSong", "durationTime", "lyricInfos"], ({
      currentSong,
      durationTime,
      lyricInfos
    }) => {
      // 有值改变时重新赋值
      if (currentSong) this.setData({
        currentSong
      })
      if (durationTime) this.setData({
        durationTime
      })
      if (lyricInfos) this.setData({
        lyricInfos
      })
    })

    // "currentTime", "currentLyricIndex", "currentLyricText"
    playerStore.onStates(["currentTime", "currentLyricIndex", "currentLyricText"], ({
      currentTime,
      currentLyricIndex,
      currentLyricText
    }) => {
      // 时间变化
      // 如果滑块不在移动，监听随时间变化的事件
      if (currentTime && !this.data.isSliderChanging) {
        // 滑块移动值
        const sliderValue = currentTime / this.data.durationTime * 100
        this.setData({
          currentTime,
          sliderValue
        })
      }
      // 歌词变化
      if (currentLyricText) {
        this.setData({
          currentLyricText
        })
      }
      // 歌词下标变化
      if (currentLyricIndex) {
        this.setData({
          currentLyricIndex,
          // 设置歌词向上滚动距离 也可以抽取出来常量 放到js和css文件中
          lyricScrollTop: currentLyricIndex * 35
        })
      }
    })

    // 监听播放模式相关数据 'playModeIndex', 'isPlaying'
    playerStore.onStates(['playModeIndex', 'isPlaying'], ({
      playModeIndex,
      isPlaying
    }) => {
      // 如果修改播放模式
      if (playModeIndex !== undefined) {
        this.setData({
          playModeIndex,
          playModeName: playModeNames[playModeIndex]
        })
      }
      // 如果修改播放状态
      if (isPlaying !== undefined) {
        this.setData({
          isPlaying,
          playingName: isPlaying ? 'pause' : 'resume'
        })
      }
    })
  },


  /**
   * 事件处理 - 切换 swiper
   */
  handleSwiperChange(event) {
    const currentPage = event.detail.current
    this.setData({
      currentPage
    })
  },


  /**
   * 事件处理 - slider点击获取变化的百分比
   */
  handleSliderChange(event) {
    const value = event.detail.value
    // 拿到需要播放的 currentTime
    const currentTime = this.data.durationTime * value / 100
    // 设置 context 播放 currentTime 位置的值
    // 先暂停音乐
    // audioContext.pause()
    // 记录最新的 sliderValue
    this.setData({
      sliderValue: value,
      currentTime,
      isSliderChanging: false
    })
    // 把当前播放时间传给 store 记录
    playerStore.setState('currentTime', currentTime)
    // 如果在播放，跳转，未在播放，依旧暂停
    if (this.data.isPlaying) {
      // 转到想要播放的时间 转化成秒
      audioContext.seek(currentTime / 1000)
    }
  },

  /**
   * 事件处理 - 滑动滑块 swiper
   */
  handleSliderChanging(event) {
    // 确定滑块移动位置
    const value = event.detail.value
    // 更改当前播放时间
    const currentTime = this.data.durationTime * value / 100
    this.setData({
      isSliderChanging: true,
      currentTime
    })
  },

  /**
   * 事件处理 - 点击左边返回
   */
  handleNavbarBackClick() {
    // 返回 还会继续播放歌曲
    wx.navigateBack()
  },

  /**
   * 事件监听 - 播放模式变化
   */
  handleModeBtnClick() {
    // 计算最新的 playModeIndex
    let playIndex = this.data.playModeIndex + 1
    if (playIndex === 3) playIndex = 0
    console.log(playIndex)
    playerStore.setState('playModeIndex', playIndex)
  },

  /**
   * 事件监听 - 播放状态变化 => 播放、暂停
   */
  handlePlayBtnClick() {
    playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying)
  },

  /**
   * 事件监听 - 切换上一首
   */
  handlePrevBtnClick() {
    playerStore.dispatch('changeNewMusicAction', false)
  },

  /**
   * 事件监听 - 播放下一首
   */
  handleNextBtnClick() {
    playerStore.dispatch('changeNewMusicAction')
  }
  // /**
  //  * 监听滚动事件
  //  */
  // handleLyricScroll(event) {
  //   console.log(event);
  //   const index = event.detail.scrollTop / 35
  //   this.setData({
  //     currentLyricIndex: index + 2,
  //     // currentLyricText: lyricInfos[currentLyricIndex],
  //     // currentTime:
  //   })
  //   console.log(this.data.currentLyricIndex);
  //   this.setData({
  //     isLyricScroll: true
  //   })
  // }
})