/**
 * 播放页相关请求
 */

import hidariRequest from './index'

/**
 * 获取歌曲详情
 * @param {Number} ids 歌曲 id
 */
export const getSongDetail = (ids) => {
  return hidariRequest.get('/song/detail', {
    ids
  })
}

/**
 * 请求歌词
 * @param {Number} id 歌曲 id
 */
export const getSongLyric = (id) => {
  return hidariRequest.get('/lyric', {
    id
  })
}