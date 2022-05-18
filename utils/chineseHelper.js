/**
 * 中文汉字转成拼音，非中文汉字部分则保留原格式
 */
// 引入字符编码（JSON）
import PinYin from './chineseHelperStr.js'

// 定义方法
const loadPinYinInit = {}

// 获取所有编码
loadPinYinInit.GetPinyinStr = function () {
  return PinYin;
}


/**
 * 汉字转拼音
 * @param {String} cnStr 需要转成拼音的汉字字符串
 */
loadPinYinInit.ConvertPinyin = function (cnStr) {
  // 获取汉字长度
  let cnLength = cnStr.length
  // 初始化拼音字符串
  let pinyinStr = ""
  // 正则
  const reg = new RegExp('[a-zA-Z0-9]')
  // 循环
  for (let i = 0; i < cnLength; i++) {
    // 找出每一个汉字
    let val = cnStr.substr(i, 1)
    // 在数组中查找一个键值。如果找到了该值，匹配元素的键名会被返回。如果没找到，则返回 false。
    let name = loadPinYinInit.arraySearch(val, PinYin)
    // 如果匹配到是字母或数字直接拼接
    if (reg.test(val)) {
      pinyinStr += val
    } else if (name !== false) {
      // 如果是汉字，转化之后拼接
      pinyinStr += name
    }
  }
  // 去除空格
  pinyinStr = pinyinStr.replace(/ /g, ' ');
  // '--' => '-'
  while (pinyinStr.indexOf('--') > 0) {
    pinyinStr = pinyinStr.replace('--', '-');
  }
  return pinyinStr;
}

/**
 * 在对象中搜索  
 * @param {String} cn 单个汉字
 */
loadPinYinInit.arraySearch = function (cn) {
  let needName = ''
  for (let name in PinYin) {
    // 如果找到了对应编码
    if (PinYin[name].indexOf(cn) != -1) {
      needName = loadPinYinInit.ucfirst(name)
      break
    }
  }
  return needName
}

/**
 * 匹配字符
 * @param {String} str 需要高亮显示的字符串
 */
loadPinYinInit.ucfirst = function (str) {
  if (str.length > 0) {
    var first = str.substr(0, str.length).toUpperCase()
    var spare = str.substr(str.length)
    return first + spare
  }
}

export default loadPinYinInit