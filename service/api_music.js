/**
 * music 相关 api 封装
 */

import hidariRequest from './index'

/**
 * 获取轮播图数据
 */
export const getBanners = () => {
  return hidariRequest.get('/banner', {
    type: 2
  })
}

/**
 * 获取推荐歌曲数据
 * @param {Number} idx 推荐歌曲类型 [0, 1, 2, 3]
 */
export const getRankingData = (idx) => {
  return hidariRequest.get('/top/list', {
    idx
  })
}