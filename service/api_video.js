/**
 * video 相关 api 封装
 */

import hidariRequest from './index'

/**
 * 请求视频数据api
 * @param {Number} offset 偏移量
 * @param {Number} limit 请求数据量
 */
export const getTopMV = (offset, limit = 10) => {
  return hidariRequest.get('/top/mv', {
    offset,
    limit
  })
}

/**
 * 请求MV的播放地址
 * @param {number} id MV的id 
 */
export const getMVURL = (id) => {
  return hidariRequest.get("/mv/url", {
    id
  })
}

/**
 * 请求MV的详情
 * @param {number} mvid MV的id
 */
export const getMVDetail = (mvid) => {
  return hidariRequest.get("/mv/detail", {
    mvid
  })
}

/**
 * 查询所有相关的视频
 * @param {number} id MV的id
 */
export const getRelatedVideo = (id) => {
  return hidariRequest.get("/related/allVideo", {
    id
  })
}