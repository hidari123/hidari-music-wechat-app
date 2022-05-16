module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1652680529884, function(require, module, exports) {
exports.fromMarkdown = require('./from-markdown')
exports.toMarkdown = require('./to-markdown')

}, function(modId) {var map = {"./from-markdown":1652680529885,"./to-markdown":1652680529886}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1652680529885, function(require, module, exports) {
module.exports = createFromMarkdown

var matters = require('micromark-extension-frontmatter/lib/matters')

function createFromMarkdown(options) {
  var settings = matters(options)
  var length = settings.length
  var index = -1
  var enter = {}
  var exit = {}
  var matter

  while (++index < length) {
    matter = settings[index]
    enter[matter.type] = opener(matter)
    exit[matter.type] = close
    exit[matter.type + 'Value'] = value
  }

  return {enter: enter, exit: exit}
}

function opener(matter) {
  return open
  function open(token) {
    this.enter({type: matter.type, value: ''}, token)
    this.buffer()
  }
}

function close(token) {
  var data = this.resume()
  // Remove the initial and final eol.
  this.exit(token).value = data.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '')
}

function value(token) {
  this.config.enter.data.call(this, token)
  this.config.exit.data.call(this, token)
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1652680529886, function(require, module, exports) {
module.exports = createToMarkdown

var matters = require('micromark-extension-frontmatter/lib/matters')

function createToMarkdown(options) {
  var unsafe = []
  var handlers = {}
  var settings = matters(options)
  var length = settings.length
  var index = -1
  var matter

  while (++index < length) {
    matter = settings[index]
    handlers[matter.type] = handler(matter)
    unsafe.push({atBreak: true, character: fence(matter, 'open').charAt(0)})
  }

  return {unsafe: unsafe, handlers: handlers}
}

function handler(matter) {
  var open = fence(matter, 'open')
  var close = fence(matter, 'close')

  return handle

  function handle(node) {
    return open + (node.value ? '\n' + node.value : '') + '\n' + close
  }
}

function fence(matter, prop) {
  var marker

  if (matter.marker) {
    marker = pick(matter.marker, prop)
    return marker + marker + marker
  }

  return pick(matter.fence, prop)
}

function pick(schema, prop) {
  return typeof schema === 'string' ? schema : schema[prop]
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1652680529884);
})()
//miniprogram-npm-outsideDeps=["micromark-extension-frontmatter/lib/matters"]
//# sourceMappingURL=index.js.map