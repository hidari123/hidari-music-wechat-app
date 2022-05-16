module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1652680529947, function(require, module, exports) {
module.exports = require('./lib/syntax')

}, function(modId) {var map = {"./lib/syntax":1652680529948}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1652680529948, function(require, module, exports) {
module.exports = create

var matters = require('./matters')

function create(options) {
  var settings = matters(options)
  var length = settings.length
  var index = -1
  var flow = {}
  var matter
  var code

  while (++index < length) {
    matter = settings[index]
    code = fence(matter, 'open').charCodeAt(0)
    if (code in flow) {
      flow[code].push(parse(matter))
    } else {
      flow[code] = [parse(matter)]
    }
  }

  return {flow: flow}
}

function parse(matter) {
  var name = matter.type
  var anywhere = matter.anywhere
  var valueType = name + 'Value'
  var fenceType = name + 'Fence'
  var sequenceType = fenceType + 'Sequence'
  var fenceConstruct = {tokenize: tokenizeFence, partial: true}
  var buffer

  return {tokenize: tokenizeFrontmatter, concrete: true}

  function tokenizeFrontmatter(effects, ok, nok) {
    var self = this

    return start

    function start(code) {
      var position = self.now()

      if (position.column !== 1 || (!anywhere && position.line !== 1)) {
        return nok(code)
      }

      effects.enter(name)
      buffer = fence(matter, 'open')
      return effects.attempt(fenceConstruct, afterOpeningFence, nok)(code)
    }

    function afterOpeningFence(code) {
      buffer = fence(matter, 'close')
      return lineEnd(code)
    }

    function lineStart(code) {
      if (code === -5 || code === -4 || code === -3 || code === null) {
        return lineEnd(code)
      }

      effects.enter(valueType)
      return lineData(code)
    }

    function lineData(code) {
      if (code === -5 || code === -4 || code === -3 || code === null) {
        effects.exit(valueType)
        return lineEnd(code)
      }

      effects.consume(code)
      return lineData
    }

    function lineEnd(code) {
      // Require a closing fence.
      if (code === null) {
        return nok(code)
      }

      // Can only be an eol.
      effects.enter('lineEnding')
      effects.consume(code)
      effects.exit('lineEnding')
      return effects.attempt(fenceConstruct, after, lineStart)
    }

    function after(code) {
      effects.exit(name)
      return ok(code)
    }
  }

  function tokenizeFence(effects, ok, nok) {
    var bufferIndex = 0

    return start

    function start(code) {
      if (code === buffer.charCodeAt(bufferIndex)) {
        effects.enter(fenceType)
        effects.enter(sequenceType)
        return insideSequence(code)
      }

      return nok(code)
    }

    function insideSequence(code) {
      if (bufferIndex === buffer.length) {
        effects.exit(sequenceType)

        if (code === -2 || code === -1 || code === 32) {
          effects.enter('whitespace')
          return insideWhitespace(code)
        }

        return fenceEnd(code)
      }

      if (code === buffer.charCodeAt(bufferIndex)) {
        effects.consume(code)
        bufferIndex++
        return insideSequence
      }

      return nok(code)
    }

    function insideWhitespace(code) {
      if (code === -2 || code === -1 || code === 32) {
        effects.consume(code)
        return insideWhitespace
      }

      effects.exit('whitespace')
      return fenceEnd(code)
    }

    function fenceEnd(code) {
      if (code === -5 || code === -4 || code === -3 || code === null) {
        effects.exit(fenceType)
        return ok(code)
      }

      return nok(code)
    }
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

}, function(modId) { var map = {"./matters":1652680529949}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1652680529949, function(require, module, exports) {
module.exports = matters

var fault = require('fault')

var own = {}.hasOwnProperty

var markers = {yaml: '-', toml: '+'}

function matters(options) {
  var settings = options || 'yaml'
  var results = []
  var index = -1
  var length

  // One preset or matter.
  if (typeof settings === 'string' || !('length' in settings)) {
    settings = [settings]
  }

  length = settings.length

  while (++index < length) {
    results[index] = matter(settings[index])
  }

  return results
}

function matter(option) {
  var result = option

  if (typeof result === 'string') {
    if (!own.call(markers, result)) {
      throw fault('Missing matter definition for `%s`', result)
    }

    result = {type: result, marker: markers[result]}
  } else if (typeof result !== 'object') {
    throw fault('Expected matter to be an object, not `%j`', result)
  }

  if (!own.call(result, 'type')) {
    throw fault('Missing `type` in matter `%j`', result)
  }

  if (!own.call(result, 'fence') && !own.call(result, 'marker')) {
    throw fault('Missing `marker` or `fence` in matter `%j`', result)
  }

  return result
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1652680529947);
})()
//miniprogram-npm-outsideDeps=["fault"]
//# sourceMappingURL=index.js.map