/**
 * 查询显示区域矩形高度
 */

const queryRect = (selector) => {
  // 获取结果 用 promise 返回 resolve()
  return new Promise((resolve) => {
    // 获取组件的高度
    const query = wx.createSelectorQuery()
    // 获取选择的 .swiper-image 组件矩形显示区域
    query.select(selector).boundingClientRect()
    // 滚动距离查询
    // query.selectViewport().scrollOffset()
    // 执行请求
    // 相当于 => 
    // query.exec((res) => {
    //   resolve(res)
    // })
    query.exec(resolve)
  })
}

export default queryRect