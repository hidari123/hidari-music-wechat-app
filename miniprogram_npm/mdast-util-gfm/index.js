module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1652680529899, function(require, module, exports) {
exports.fromMarkdown = require('./from-markdown')
exports.toMarkdown = require('./to-markdown')

}, function(modId) {var map = {"./from-markdown":1652680529900,"./to-markdown":1652680529901}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1652680529900, function(require, module, exports) {
var autolinkLiteral = require('mdast-util-gfm-autolink-literal/from-markdown')
var strikethrough = require('mdast-util-gfm-strikethrough/from-markdown')
var table = require('mdast-util-gfm-table/from-markdown')
var taskListItem = require('mdast-util-gfm-task-list-item/from-markdown')

var own = {}.hasOwnProperty

module.exports = configure([
  autolinkLiteral,
  strikethrough,
  table,
  taskListItem
])

function configure(extensions) {
  var config = {transforms: [], canContainEols: []}
  var length = extensions.length
  var index = -1

  while (++index < length) {
    extension(config, extensions[index])
  }

  return config
}

function extension(config, extension) {
  var key
  var left
  var right

  for (key in extension) {
    left = own.call(config, key) ? config[key] : (config[key] = {})
    right = extension[key]

    if (key === 'canContainEols' || key === 'transforms') {
      config[key] = [].concat(left, right)
    } else {
      Object.assign(left, right)
    }
  }
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1652680529901, function(require, module, exports) {
var autolinkLiteral = require('mdast-util-gfm-autolink-literal/to-markdown')
var strikethrough = require('mdast-util-gfm-strikethrough/to-markdown')
var table = require('mdast-util-gfm-table/to-markdown')
var taskListItem = require('mdast-util-gfm-task-list-item/to-markdown')
var configure = require('mdast-util-to-markdown/lib/configure')

module.exports = toMarkdown

function toMarkdown(options) {
  var config = configure(
    {handlers: {}, join: [], unsafe: [], options: {}},
    {
      extensions: [autolinkLiteral, strikethrough, table(options), taskListItem]
    }
  )

  return Object.assign(config.options, {
    handlers: config.handlers,
    join: config.join,
    unsafe: config.unsafe
  })
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1652680529899);
})()
//miniprogram-npm-outsideDeps=["mdast-util-gfm-autolink-literal/from-markdown","mdast-util-gfm-strikethrough/from-markdown","mdast-util-gfm-table/from-markdown","mdast-util-gfm-task-list-item/from-markdown","mdast-util-gfm-autolink-literal/to-markdown","mdast-util-gfm-strikethrough/to-markdown","mdast-util-gfm-table/to-markdown","mdast-util-gfm-task-list-item/to-markdown","mdast-util-to-markdown/lib/configure"]
//# sourceMappingURL=index.js.map