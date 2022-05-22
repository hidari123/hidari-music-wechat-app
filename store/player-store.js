/**
 * 播放相关仓库
 */
import {
  getSongDetail,
  getSongLyric
} from '../service/api_player'

import {
  getParseLyric
} from '../utils/parse-lyric'

import {
  HidariEventStore
} from '../hidari-event-store/index'

// const audioContext = wx.createInnerAudioContext()
// 切换背景播放模式 切出后台也可以播放
const audioContext = wx.getBackgroundAudioManager()
const playerStore = new HidariEventStore({
  state: {
    // 是否是第一次播放
    isFirstPlay: true,
    // 是否是停止状态
    isStopping: false,
    // 歌曲 id
    id: 0,
    // 当前播放的歌曲
    currentSong: {},
    // 歌曲时长
    durationTime: 0,
    // 歌词数组
    lyricInfos: [],
    // 当前播放的事件
    currentTime: 0,
    // 当前播放的歌词index
    currentLyricIndex: 0,
    // 当前播放的歌词
    currentLyricText: '',
    // 播放模式 => 0 循环播放， 1 单曲播放， 2 随机播放
    playModeIndex: 0,
    // 是否在播放
    isPlaying: false,
    // 当前播放的歌单
    playListSongs: [],
    // 当前播放的歌曲在歌单中的位置
    playListIndex: 0
  },
  actions: {
    /**
     * 根据歌曲id播放音乐
     * @param {*} ctx 上下文
     * @param {*} id 歌曲id 
     * @param {*} isRefresh 是否需要刷新 默认不需要
     */
    playMusicWithSongIdAction(ctx, {
      id,
      isRefresh = false
    }) {
      // 如果播放的是上次的歌
      // 如果不需要刷新，继续播放
      if (ctx.id == id && !isRefresh) {
        // 每次点进来就直接开始播放
        this.dispatch('changeMusicPlayStatusAction')
        return
      }
      ctx.id = id
      // 修改播放状态
      ctx.isPlaying = true

      // 0、清空之前的数据
      ctx.currentSong = {}
      ctx.durationTime = 0
      ctx.lyricInfos = []
      ctx.currentTime = 0
      ctx.currentLyricIndex = 0
      ctx.currentLyricText = ""
      /**
       * 请求歌曲信息
       */
      getSongDetail(id).then(res => {
        ctx.currentSong = res.songs[0]
        ctx.durationTime = res.songs[0].dt
        audioContext.title = res.songs[0].name
      })
      /**
       * 请求歌词信息
       */
      getSongLyric(id).then(res => {
        const lyricInfos = getParseLyric(res.lrc.lyric)
        ctx.lyricInfos = lyricInfos
      })
      // 创建播放器 播放对应歌曲
      // 停止上一个音乐
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      // 自动开启播放
      // 切换后台播放 wx.getBackgroundAudioManager() 需要有 title 
      audioContext.title = id
      audioContext.autoplay = true

      // 监听 audioContext 一些事件
      // 用的是同一个 audioContext 不用每次都开始监听
      // 第一次播放添加监听
      if (ctx.isFirstPlay) {
        this.dispatch('setupAudioContextListenerAction')
        ctx.isFirstPlay = false
      }
    },

    /**
     * 监听播放器时间变化
     * @param {*} ctx 上下文
     */
    setupAudioContextListenerAction(ctx) {
      // 可以开始播放
      audioContext.onCanplay(() => {
        // 想要跳转播放需要 play() 方法 这个方法也可以自动播放
        audioContext.play()
      })
      // 监听事件改变
      audioContext.onTimeUpdate(() => {
        // 当前播放时间
        const currentTime = audioContext.currentTime * 1000
        // 根据当前时间修改 currentTime
        ctx.currentTime = currentTime

        // 根据当前时间查找对应歌词
        // 每次都是从 0 开始匹配 保证无论前进还是后退都能匹配上
        if (!ctx.lyricInfos.length) return
        let i = 0
        for (; i < ctx.lyricInfos.length; i++) {
          // 拿到每句歌词
          const lyricInfo = ctx.lyricInfos[i]
          if (currentTime < lyricInfo.time) {
            // 找到了之后不需要再找 break 跳出循环
            break
          }
        }

        // 设置当前歌词和索引
        // 找到正确的需要显示的歌词的 index
        const currentLyricIndex = i - 1
        // 如果当前 index 和 歌词的 index 不相同 设置 currentLyricText
        if (ctx.currentLyricIndex !== currentLyricIndex) {
          // 找到对应歌词
          const currentLyricText = ctx.lyricInfos[currentLyricIndex].text
          ctx.currentLyricText = currentLyricText
          ctx.currentLyricIndex = currentLyricIndex
        }
      })

      // 监听播放完成，自动播放下一首歌曲。
      audioContext.onEnded(() => {
        this.dispatch("changeNewMusicAction")
      })

      // 监听音乐 暂停 / 播放
      // 播放
      audioContext.onPlay(() => {
        ctx.isPlaying = true
      })
      // 暂停
      audioContext.onPause(() => {
        ctx.isPlaying = false
      })
      // 停止
      audioContext.onStop(() => {
        ctx.isPlaying = false
        // 设置为停止状态
        ctx.isStopping = true
      })
    },

    /**
     * 切换歌曲播放状态
     * @param {*} ctx 上下文
     * @param {*} isPlaying 是否正在播放 如果不传默认为 true
     */
    changeMusicPlayStatusAction(ctx, isPlaying = true) {
      ctx.isPlaying = isPlaying
      if (ctx.isStopping && ctx.isPlaying) {
        audioContext.src = `https://music.163.com/song/media/outer/url?id=${ctx.id}.mp3`
        // 自动开启播放
        // 切换后台播放 wx.getBackgroundAudioManager() 需要有 title 
        audioContext.title = ctx.currentSong.name
        // 再次开始时从关闭位置开始播放
        audioContext.startTime = ctx.currentTime / 1000
        ctx.isStopping = false
      }
      // 暂停再开始时从当前位置开始播放
      ctx.isPlaying ? audioContext.seek(ctx.currentTime / 1000) : audioContext.pause()
    },

    /**
     * 切换上一首 / 下一首歌曲
     */
    changeNewMusicAction(ctx, isNext = true) {
      // 获取当前索引
      let currentIndex = ctx.playListIndex
      // 根据不同模式，获取下一首歌索引
      switch (ctx.playModeIndex) {
        case 0:
          // 顺序播放
          currentIndex = isNext ? currentIndex + 1 : currentIndex - 1
          // 如果是最后一首，播放第一首
          if (currentIndex === ctx.playListSongs.length) currentIndex = 0
          // 如果是第一首，播放最后一首
          if (currentIndex === -1) currentIndex = ctx.playListSongs.length - 1
          break
        case 1:
          // 单曲循环 直接退出 还是播放这首歌
          // index = index
          break
        case 2:
          // 随机播放
          // Math.random() 后面有() 是一个函数
          const index = Math.floor(Math.random() * ctx.playListSongs.length)
          // 如果是同一首歌 继续切换下一首
          if (index === currentIndex) {
            this.dispatch('changeNewMusicAction', isNext)
            return
          }
          currentIndex = index
          // 记录新的索引
          ctx.playListIndex = currentIndex
          break
      }

      // 获取歌曲
      let currentSong = ctx.playListSongs[currentIndex]
      // 如果没有值 播放同一曲
      if (!currentSong) {
        currentSong = ctx.currentSong
      } else {
        // 记录新的索引
        ctx.playListIndex = currentIndex
      }

      // 播放新的歌曲
      this.dispatch('playMusicWithSongIdAction', {
        id: currentSong.id,
        isRefresh: true
      })
    }
  }
})
export {
  audioContext,
  playerStore
}