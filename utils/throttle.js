 /**
  * 节流：每隔一段时间请求一次
  * @param {*} fn 需要节流处理的函数
  * @param {*} interval 延时时间
  * @param {*} options leading 代表首次是否执行, trailing 代表结束后是否再执行一次
  */
 const throttle = (fn, interval = 1000, options = {
   leading: true,
   trailing: false
 }) => {
   // 1. 记录上次开始时间
   const {
     leading,
     trailing,
     resultCallback
   } = options
   // 初始化上次开始时间
   let lastTime = 0
   // 初始化延时器
   let timer = null

   // 2.事件触发时, 真正执行的函数
   const _throttle = function (...args) {
     // 方便处理回调，返回promise
     return new Promise((resolve, reject) => {
       // 2.1.获取当前事件触发时的时间
       const nowTime = new Date().getTime()
       // 如果第一次执行并且在开始时不先执行一次 把上次执行的时间设为当前事件触发时的时间
       if (!lastTime && !leading) lastTime = nowTime

       // 2.2.使用当前触发的时间和之前的时间间隔以及上一次开始的时间, 计算出还剩余多长事件需要去触发函数
       const remainTime = interval - (nowTime - lastTime)
       // 如果时间到了 需要触发函数
       if (remainTime <= 0) {
         // 如果有上一个延时器 清除
         if (timer) {
           clearTimeout(timer)
           timer = null
         }

         // 2.3.真正触发函数
         const result = fn.apply(this, args)
         // 如果有回调函数 执行回调函数
         if (resultCallback) resultCallback(result)
         resolve(result)
         // 2.4.保留上次触发的时间
         lastTime = nowTime
         return
       }

       // 如果结束后需要执行一次 并且没有延时器
       if (trailing && !timer) {
         timer = setTimeout(() => {
           timer = null
           // 如果需要刚开始执行一次 => lastTime = 0, 否则为当前时间
           lastTime = !leading ? 0 : new Date().getTime()
           const result = fn.apply(this, args)
           if (resultCallback) resultCallback(result)
           resolve(result)
         }, remainTime)
       }
     })
   }

   // 取消节流函数 重置数据
   _throttle.cancel = function () {
     if (timer) clearTimeout(timer)
     timer = null
     lastTime = 0
   }

   // 返回函数
   return _throttle
 }

 export default throttle