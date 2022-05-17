/**
 * 榜单仓库
 */
import {
  HidariEventStore
} from '../hidari-event-store/index'
import {
  getRankingData
} from '../service/api_music'

// 榜单 map 键值对映射
const rankingMap = {
  0: "newRankings",
  1: "hotRankings",
  2: "originRankings",
  3: "upRankings"
}
const rankingStore = new HidariEventStore({
  state: {
    newRankings: {}, // 0 新歌
    hotRankings: {}, // 1 热门
    originRankings: {}, // 2 原创
    upRankings: {}, // 3 飙升
  },
  actions: {
    /**
     * 获取推荐歌曲
     * @param {*} ctx 执行上下文
     */
    async getRankingDataAction(ctx) {
      for (let i = 0; i < 4; i++) {
        const res = await getRankingData(i)
        const rankingName = rankingMap[i]
        ctx[rankingName] = res.playlist
        // switch (i) {
        //   case 0:
        //     ctx.newRankings = res.playlist
        //     break
        //   case 1:
        //     ctx.hotRankings = res.playlist
        //     break
        //   case 2:
        //     ctx.originRankings = res.playlist
        //     break
        //   case 3:
        //     ctx.upRankings = res.playlist
        //     break
        // }
      }
    }
  }
})

export {
  rankingStore,
  rankingMap
}