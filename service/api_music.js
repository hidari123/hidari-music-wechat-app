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

/**
 * 获取歌单（热门歌单、推荐歌单）
 * @param {String} cat 类型
 * @param {*} limit 获取数据条数
 * @param {*} offset 偏移量
 */
export const getSongMenu = (cat = "全部", limit = 6, offset = 0) => {
  return hidariRequest.get('/top/playlist', {
    cat,
    limit,
    offset
  })
}

/**
 * 获取歌曲信息
 * @param {Number} id 歌曲 id
 */
export const getSongData = (id) => {
  return hidariRequest.get('/playlist/detail/dynamic', {
    id
  })
}