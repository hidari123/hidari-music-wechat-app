/**
 * 搜索相关请求
 */

import hidariRequest from './index'

/**
 * 热门搜索
 */
export const getSearchHot = () => {
  return hidariRequest.get('/search/hot')
}

/**
 * 搜索关键词建议
 * @param {String} keywords 关键词
 */
export const getSearchSuggest = (keywords) => {
  return hidariRequest.get('/search/suggest', {
    keywords,
    type: 'mobile'
  })
}

/**
 * 根据关键词搜索
 * @param {String} keywords 关键词
 */
export const getSearchResult = (keywords) => {
  return hidariRequest.get('/search', {
    keywords
  })
}