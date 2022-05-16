module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1652680529878, function(require, module, exports) {


module.exports = findAndReplace

var visit = require('unist-util-visit-parents')
var convert = require('unist-util-is/convert')
var escape = require('escape-string-regexp')

var splice = [].splice

function findAndReplace(tree, find, replace, options) {
  var settings
  var schema

  if (typeof find === 'string' || (find && typeof find.exec === 'function')) {
    schema = [[find, replace]]
  } else {
    schema = find
    options = replace
  }

  settings = options || {}

  search(tree, settings, handlerFactory(toPairs(schema)))

  return tree

  function handlerFactory(pairs) {
    var pair = pairs[0]

    return handler

    function handler(node, parent) {
      var find = pair[0]
      var replace = pair[1]
      var nodes = []
      var start = 0
      var index = parent.children.indexOf(node)
      var position
      var match
      var subhandler
      var value

      find.lastIndex = 0

      match = find.exec(node.value)

      while (match) {
        position = match.index
        value = replace.apply(
          null,
          [].concat(match, {index: match.index, input: match.input})
        )

        if (value !== false) {
          if (start !== position) {
            nodes.push({type: 'text', value: node.value.slice(start, position)})
          }

          if (typeof value === 'string' && value.length > 0) {
            value = {type: 'text', value: value}
          }

          if (value) {
            nodes = [].concat(nodes, value)
          }

          start = position + match[0].length
        }

        if (!find.global) {
          break
        }

        match = find.exec(node.value)
      }

      if (position === undefined) {
        nodes = [node]
        index--
      } else {
        if (start < node.value.length) {
          nodes.push({type: 'text', value: node.value.slice(start)})
        }

        nodes.unshift(index, 1)
        splice.apply(parent.children, nodes)
      }

      if (pairs.length > 1) {
        subhandler = handlerFactory(pairs.slice(1))
        position = -1

        while (++position < nodes.length) {
          node = nodes[position]

          if (node.type === 'text') {
            subhandler(node, parent)
          } else {
            search(node, settings, subhandler)
          }
        }
      }

      return index + nodes.length + 1
    }
  }
}

function search(tree, settings, handler) {
  var ignored = convert(settings.ignore || [])
  var result = []

  visit(tree, 'text', visitor)

  return result

  function visitor(node, parents) {
    var index = -1
    var parent
    var grandparent

    while (++index < parents.length) {
      parent = parents[index]

      if (
        ignored(
          parent,
          grandparent ? grandparent.children.indexOf(parent) : undefined,
          grandparent
        )
      ) {
        return
      }

      grandparent = parent
    }

    return handler(node, grandparent)
  }
}

function toPairs(schema) {
  var result = []
  var key
  var index

  if (typeof schema !== 'object') {
    throw new Error('Expected array or object as schema')
  }

  if ('length' in schema) {
    index = -1

    while (++index < schema.length) {
      result.push([
        toExpression(schema[index][0]),
        toFunction(schema[index][1])
      ])
    }
  } else {
    for (key in schema) {
      result.push([toExpression(key), toFunction(schema[key])])
    }
  }

  return result
}

function toExpression(find) {
  return typeof find === 'string' ? new RegExp(escape(find), 'g') : find
}

function toFunction(replace) {
  return typeof replace === 'function' ? replace : returner

  function returner() {
    return replace
  }
}

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1652680529878);
})()
//miniprogram-npm-outsideDeps=["unist-util-visit-parents","unist-util-is/convert","escape-string-regexp"]
//# sourceMappingURL=index.js.map