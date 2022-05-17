/**
 * 事件总线 eventBus
 */
class HidariEventBus {
  constructor() {
    // 挂载到原型上
    this.eventBus = {}
  }

  /**
   * 监听当前实例上的自定义事件。事件可以由 emit 触发。回调函数会接收所有传入事件触发函数的额外参数。
   * @param {String} eventName 事件名称
   * @param {Function} eventCallback 事件回调函数
   * @param {*} thisArg 传参
   */
  on(eventName, eventCallback, thisArg) {
    // 需要传入 string 类型的 eventName
    if (typeof eventName !== 'string') {
      throw new TypeError("the event name must be string type")
    }
    // 需要传入 function 类型的 eventCallback 回调函数
    if (typeof eventCallback !== "function") {
      throw new TypeError("the event callback must be function type")
    }
    let handlers = this.eventBus[eventName]
    // 如果没有事件，事件集合设为空数组
    if (!handlers) {
      handlers = []
      this.eventBus[eventName] = handlers
    }
    handlers.push({
      eventCallback,
      thisArg
    })
    // 返回当前this对象，以便链式调用
    return this
  }

  /**
   * 监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。
   * @param {String} eventName 事件名称
   * @param {Function} eventCallback 事件回调函数
   * @param {*} thisArg 传参
   */
  once(eventName, eventCallback, thisArg) {
    // 需要传入 string 类型的 eventName
    if (typeof eventName !== "string") {
      throw new TypeError("the event name must be string type")
    }
    // 需要传入 function 类型的 eventCallback 回调函数
    if (typeof eventCallback !== "function") {
      throw new TypeError("the event callback must be function type")
    }

    const tempCallback = (...payload) => {
      this.off(eventName, tempCallback)
      eventCallback.apply(thisArg, payload)
    }
    // 返回当前实例上的自定义事件
    return this.on(eventName, tempCallback, thisArg)
  }

  /**
   * 触发当前实例上的事件。附加参数都会传给监听器回调。
   * @param {String} eventName 事件名称
   * @param  {...Array} payload 参数数组
   */
  emit(eventName, ...payload) {
    // 需要传入 string 类型的 eventName
    if (typeof eventName !== "string") {
      throw new TypeError("the event name must be string type")
    }

    // 如果没有事件，默认为空数组
    const handlers = this.eventBus[eventName] || []
    handlers.forEach(handler => {
      // 循环为每个 handler 的回调函数绑定 handler.thisArg，传入 payload 数组参数
      handler.eventCallback.apply(handler.thisArg, payload)
    })
    // 返回当前this对象，以便链式调用
    return this
  }

  /**
   * 移除自定义事件监听器。
    如果没有提供参数，则移除所有的事件监听器；
    如果只提供了事件，则移除该事件所有的监听器；
    如果同时提供了事件与回调，则只移除这个回调的监听器。
   * @param {String} eventName 事件名称
   * @param {Function} eventCallback 事件回调函数
   */
  off(eventName, eventCallback) {
    // 需要传入 string 类型的 eventName
    if (typeof eventName !== "string") {
      throw new TypeError("the event name must be string type")
    }
    // 需要传入 function 类型的 eventCallback 回调函数
    if (typeof eventCallback !== "function") {
      throw new TypeError("the event callback must be function type")
    }

    const handlers = this.eventBus[eventName]
    // 如果有事件并且有回调函数
    if (handlers && eventCallback) {
      // 把事件集合转换为数组
      const newHandlers = [...handlers]
      // 找到对应回调函数并且移除
      for (let i = 0; i < newHandlers.length; i++) {
        const handler = newHandlers[i]
        if (handler.eventCallback === eventCallback) {
          const index = handlers.indexOf(handler)
          handlers.splice(index, 1)
        }
      }
    }

    // 如果所有事件都被移除
    if (handlers.length === 0) {
      // 移除此事件
      delete this.eventBus[eventName]
    }
  }
}
// 导出
module.exports = HidariEventBus