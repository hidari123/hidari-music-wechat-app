module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1652680529959, function(require, module, exports) {
module.exports = require('./syntax')

}, function(modId) {var map = {"./syntax":1652680529960}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1652680529960, function(require, module, exports) {
var combine = require('micromark/dist/util/combine-extensions')
var autolink = require('micromark-extension-gfm-autolink-literal')
var strikethrough = require('micromark-extension-gfm-strikethrough')
var table = require('micromark-extension-gfm-table')
var tasklist = require('micromark-extension-gfm-task-list-item')

module.exports = create

function create(options) {
  return combine([autolink, strikethrough(options), table, tasklist])
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1652680529959);
})()
//miniprogram-npm-outsideDeps=["micromark/dist/util/combine-extensions","micromark-extension-gfm-autolink-literal","micromark-extension-gfm-strikethrough","micromark-extension-gfm-table","micromark-extension-gfm-task-list-item"]
//# sourceMappingURL=index.js.map