/**
 * 字符串转化为 nodes 高亮显示
 */

const string2Nodes = (keyword, value) => {
  const nodes = []
  /**
   * startsWith() 方法用于检测字符串是否以指定的前缀开始。
   * 返回值：如果字符串以指定的前缀开始，则返回 true；否则返回 false。
   * ps: endWith() 以什么结尾 返回布尔值
   */
  // 全部转化为大写匹配
  if (keyword.toUpperCase().startsWith(value.toUpperCase())) {
    // 截取需要高亮显示的关键字
    const key1 = keyword.slice(0, value.length)
    const node1 = {
      name: 'span',
      attrs: {
        style: "color: #26ce8a; font-size:14px;"
      },
      children: [{
        type: "text",
        text: key1
      }]
    }
    nodes.push(node1)
    // 截取关键字以外的字符
    const key2 = keyword.slice(value.length)
    const node2 = {
      name: 'span',
      attrs: {
        style: "color: #000; font-size:14px;"
      },
      children: [{
        type: "text",
        text: key2
      }]
    }
    nodes.push(node2)
  } else {
    // 没有匹配到
    const node = {
      name: 'span',
      attrs: {
        style: "color: #000; font-size:14px;"
      },
      children: [{
        type: "text",
        text: keyword
      }]
    }
    nodes.push(node)
  }
  return nodes
}

export default string2Nodes