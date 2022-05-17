// 判断是否为object
function isObject(obj) {
  var type = typeof obj;
  return type === 'object' && !!obj; // !!obj => true || false
}

module.exports = {
  isObject
}