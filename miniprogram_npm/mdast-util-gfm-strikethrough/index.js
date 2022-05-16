module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1652680529890, function(require, module, exports) {
exports.fromMarkdown = require('./from-markdown')
exports.toMarkdown = require('./to-markdown')

}, function(modId) {var map = {"./from-markdown":1652680529891,"./to-markdown":1652680529892}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1652680529891, function(require, module, exports) {
exports.canContainEols = ['delete']
exports.enter = {strikethrough: enterStrikethrough}
exports.exit = {strikethrough: exitStrikethrough}

function enterStrikethrough(token) {
  this.enter({type: 'delete', children: []}, token)
}

function exitStrikethrough(token) {
  this.exit(token)
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1652680529892, function(require, module, exports) {
var phrasing = require('mdast-util-to-markdown/lib/util/container-phrasing')

exports.unsafe = [{character: '~', inConstruct: 'phrasing'}]
exports.handlers = {delete: handleDelete}

handleDelete.peek = peekDelete

function handleDelete(node, _, context) {
  var exit = context.enter('emphasis')
  var value = phrasing(node, context, {before: '~', after: '~'})
  exit()
  return '~~' + value + '~~'
}

function peekDelete() {
  return '~'
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1652680529890);
})()
//miniprogram-npm-outsideDeps=["mdast-util-to-markdown/lib/util/container-phrasing"]
//# sourceMappingURL=index.js.map