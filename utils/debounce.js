/**
 * 防抖：只会在最后调用一次
 * 每次调用函数时会先清除原先的定时器，调用函数时会一直清除定时器并设定下一个定时器，直到最后一次定时器清除后执行延迟操作
 * @param {*} fn 需要防抖的函数
 * @param {*} delay 延迟时间
 * @param {*} immediate 是否立即执行一次
 * @param {*} resultCallback 回调函数
 */

export default function debounce(fn, delay = 500, immediate = false, resultCallback) {
  // 1.定义一个定时器, 保存上一次的定时器
  let timer = null
  let isInvoke = false // 是否已经执行一次

  // 2.真正执行的函数
  const _debounce = function (...args) {
    return new Promise((resolve, reject) => {
      // 取消上一次的定时器
      if (timer) clearTimeout(timer)

      // 判断是否需要立即执行
      if (immediate && !isInvoke) {
        const result = fn.apply(this, args)
        if (resultCallback) resultCallback(result)
        resolve(result)
        isInvoke = true
      } else {
        // 延迟执行
        timer = setTimeout(() => {
          // 外部传入的真正要执行的函数
          const result = fn.apply(this, args)
          if (resultCallback) resultCallback(result)
          resolve(result)
          isInvoke = false
          timer = null
        }, delay)
      }
    })
  }

  // 封装取消功能
  _debounce.cancel = function () {
    console.log(timer)
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  return _debounce
}