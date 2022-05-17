const EventBus = require("./event-bus")
const {
  isObject
} = require('./utils')
/**
 * 仓库
 */
class HidariEventStore {
  constructor(options) {
    // 传入的 option 要是一个对象
    if (!isObject(options.state)) {
      throw new TypeError("the state must be object type")
    }
    // action 网络请求
    // 如果有 actions 并且是一个对象
    if (options.actions && isObject(options.actions)) {
      // Object.values() 方法返回一个给定对象 (options.actions) 自身的所有可枚举属性值的数组
      const values = Object.values(options.actions)
      for (const value of values) {
        // 每个 action 必须是一个方法
        if (typeof value !== "function") {
          throw new TypeError("the value of actions must be a function")
        }
      }
      // 挂载到原型上
      this.actions = options.actions
    }
    // 方法挂载到原型上
    this.state = options.state
    this._observe(options.state)
    this.event = new EventBus()
    this.eventV2 = new EventBus()
  }

  /**
   * 对数据进行双向绑定，通过Object.defineProperty来做数据劫持
   * @param {*} state 要绑定的Observer对象
   */
  _observe(state) {
    const _this = this
    // Object.keys 返回一个所有元素为字符串的数组,其元素来自于从给定的object上面可直接枚举的属性。
    Object.keys(state).forEach(key => {
      let _value = state[key]
      /**
       * Object.defineProperty() 方法会直接在一个对象上定义一个新属性,或者修改一个对象的现有属性,并返回此对象。
       * 第一个参数为要定义或修改的对象-object
       * 第二个参数为对象的属性名-string
       * 第三个参数为配置项
       */
      Object.defineProperty(state, key, {
        // 挂载 get 和 set 方法
        get: function () {
          return _value
        },
        set: function (newValue) {
          if (_value === newValue) return
          _value = newValue
          // 触发当前实例上的事件，分别传入值和键值对
          _this.event.emit(key, _value)
          _this.eventV2.emit(key, {
            [key]: _value
          })
        }
      })
    })
  }

  /**
   * 数据监听
   * @param {String} statekey 需要监听是否变化的state名称
   * @param {Function} stateCallback 回调函数
   */
  onState(stateKey, stateCallback) {
    const keys = Object.keys(this.state)
    // 事件名必须存在
    if (keys.indexOf(stateKey) === -1) {
      throw new Error("the state does not contain your key")
    }
    // 监听事件
    this.event.on(stateKey, stateCallback)

    // 回调需要是一个函数
    if (typeof stateCallback !== "function") {
      throw new TypeError("the event callback must be function type")
    }
    const value = this.state[stateKey]
    stateCallback.apply(this.state, [value])
  }

  // ["name", "age"] callback1
  // ["name", "height"] callback2

  /**
   * 监听 state 状态
   * @param {String} statekeys 需要监听是否变化的state名称集合
   * @param {Function} stateCallback 回调函数
   */
  onStates(statekeys, stateCallback) {
    // state 中所有名称的元素为字符串的数组
    const keys = Object.keys(this.state)
    // 设空对象 value
    const value = {}
    for (const theKey of statekeys) {
      // 需要存在 state 名称
      if (keys.indexOf(theKey) === -1) {
        throw new Error("the state does not contain your key")
      }
      // 监听当前实例上的自定义事件，传入当前回调函数
      this.eventV2.on(theKey, stateCallback)
      value[theKey] = this.state[theKey]
    }
    // 把state中的每一项组成的数组作为参数绑定给回调函数
    stateCallback.apply(this.state, [value])
  }

  /**
   * 移除多个state监听器
   * @param {String} stateKeys 需要移除的 state 集合
   * @param {Funtion} stateCallback 回调函数
   */
  offStates(stateKeys, stateCallback) {
    const keys = Object.keys(this.state)
    // 移除每一个 state 监听
    stateKeys.forEach(theKey => {
      if (keys.indexOf(theKey) === -1) {
        throw new Error("the state does not contain your key")
      }
      this.eventV2.off(theKey, stateCallback)
    })
  }

  /**
   * 移除state监听器
   * @param {String} stateKeys 需要移除的 state
   * @param {Funtion} stateCallback 回调函数
   */
  offState(stateKey, stateCallback) {
    const keys = Object.keys(this.state)
    // 移除 state 监听
    if (keys.indexOf(stateKey) === -1) {
      throw new Error("the state does not contain your key")
    }
    this.event.off(stateKey, stateCallback)
  }

  /**
   * 修改 state 中的值
   * @param {String} stateKey 需要被修改的 state 名
   * @param {Function} stateValue 想要修改成的值
   */
  setState(stateKey, stateValue) {
    this.state[stateKey] = stateValue
  }

  /**
   * 异步发送网络请求
   * @param {String} actionName action名称
   * @param  {...Array} args 参数数组
   */
  dispatch(actionName, ...args) {
    // 名称需要是 string 类型
    if (typeof actionName !== "string") {
      throw new TypeError("the action name must be string type")
    }
    // 需要存在 action名称
    if (Object.keys(this.actions).indexOf(actionName) === -1) {
      throw new Error("this action name does not exist, please check it")
    }
    const actionFn = this.actions[actionName]
    // 把仓库的 state 和传入的参数绑定到事件上
    actionFn.apply(this, [this.state, ...args])
  }
}
// 导出
module.exports = HidariEventStore