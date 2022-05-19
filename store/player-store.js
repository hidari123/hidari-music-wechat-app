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

const audioContext = wx.createInnerAudioContext()
const playerStore = new HidariEventStore({
  state: {
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
    isPlaying: false
  },
  actions: {
    /**
     * 根据歌曲id播放音乐
     * @param {*} ctx 上下文
     * @param {*} id 歌曲id
     */
    playMusicWithSongIdAction(ctx, {
      id
    }) {
      ctx.id = id
      // 修改播放状态
      ctx.isPlaying = true
      /**
       * 请求歌曲信息
       */
      getSongDetail(id).then(res => {
        ctx.currentSong = res.songs[0]
        ctx.durationTime = res.songs[0].dt
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
      audioContext.autoplay = true

      // 监听 audioContext 一些事件
      this.dispatch('setupAudioContextListenerAction')
    },

    /**
     * 事件监听 - audioContext
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
    },

    /**
     * 切换歌曲播放状态
     * @param {*} ctx 上下文
     * @param {*} isPlaying 是否正在播放 如果不传默认为 true
     */
    changeMusicPlayStatusAction(ctx, isPlaying = true) {
      ctx.isPlaying = isPlaying;
      ctx.isPlaying ? audioContext.play() : audioContext.pause()
    }
  }
})
export {
  audioContext,
  playerStore
}