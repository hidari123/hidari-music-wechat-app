import {
  HidariEventStore
} from '../hidari-event-store/index'
import {
  getRankingData
} from '../service/api_music'
const rankingStore = new HidariEventStore({
  state: {
    hotRanking: {}
  },
  actions: {
    /**
     * 获取推荐歌曲
     * @param {*} ctx 执行上下文
     */
    async getRankingDataAction(ctx) {
      const res = await getRankingData(1)
      ctx.hotRanking = res.playlist
    }
  }
})

export {
  rankingStore
}