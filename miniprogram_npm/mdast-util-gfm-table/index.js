module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1652680529893, function(require, module, exports) {
exports.fromMarkdown = require('./from-markdown')
exports.toMarkdown = require('./to-markdown')

}, function(modId) {var map = {"./from-markdown":1652680529894,"./to-markdown":1652680529895}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1652680529894, function(require, module, exports) {
exports.enter = {
  table: enterTable,
  tableData: enterCell,
  tableHeader: enterCell,
  tableRow: enterRow
}
exports.exit = {
  codeText: exitCodeText,
  table: exitTable,
  tableData: exit,
  tableHeader: exit,
  tableRow: exit
}

function enterTable(token) {
  this.enter({type: 'table', align: token._align, children: []}, token)
  this.setData('inTable', true)
}

function exitTable(token) {
  this.exit(token)
  this.setData('inTable')
}

function enterRow(token) {
  this.enter({type: 'tableRow', children: []}, token)
}

function exit(token) {
  this.exit(token)
}

function enterCell(token) {
  this.enter({type: 'tableCell', children: []}, token)
}

// Overwrite the default code text data handler to unescape escaped pipes when
// they are in tables.
function exitCodeText(token) {
  var value = this.resume()

  if (this.getData('inTable')) {
    value = value.replace(/\\([\\|])/g, replace)
  }

  this.stack[this.stack.length - 1].value = value
  this.exit(token)
}

function replace($0, $1) {
  // Pipes work, backslashes don’t (but can’t escape pipes).
  return $1 === '|' ? $1 : $0
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1652680529895, function(require, module, exports) {
var phrasing = require('mdast-util-to-markdown/lib/util/container-phrasing')
var defaultInlineCode = require('mdast-util-to-markdown/lib/handle/inline-code')
var markdownTable = require('markdown-table')

module.exports = toMarkdown

function toMarkdown(options) {
  var settings = options || {}
  var padding = settings.tableCellPadding
  var alignDelimiters = settings.tablePipeAlign
  var stringLength = settings.stringLength
  var around = padding ? ' ' : '|'

  return {
    unsafe: [
      {character: '\r', inConstruct: 'tableCell'},
      {character: '\n', inConstruct: 'tableCell'},
      // A pipe, when followed by a tab or space (padding), or a dash or colon
      // (unpadded delimiter row), could result in a table.
      {atBreak: true, character: '|', after: '[\t :-]'},
      // A pipe in a cell must be encoded.
      {character: '|', inConstruct: 'tableCell'},
      // A colon must be followed by a dash, in which case it could start a
      // delimiter row.
      {atBreak: true, character: ':', after: '-'},
      // A delimiter row can also start with a dash, when followed by more
      // dashes, a colon, or a pipe.
      // This is a stricter version than the built in check for lists, thematic
      // breaks, and setex heading underlines though:
      // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
      {atBreak: true, character: '-', after: '[:|-]'}
    ],
    handlers: {
      table: handleTable,
      tableRow: handleTableRow,
      tableCell: handleTableCell,
      inlineCode: inlineCodeWithTable
    }
  }

  function handleTable(node, _, context) {
    return serializeData(handleTableAsData(node, context), node.align)
  }

  // This function isn’t really used normally, because we handle rows at the
  // table level.
  // But, if someone passes in a table row, this ensures we make somewhat sense.
  function handleTableRow(node, _, context) {
    var row = handleTableRowAsData(node, context)
    // `markdown-table` will always add an align row
    var value = serializeData([row])
    return value.slice(0, value.indexOf('\n'))
  }

  function handleTableCell(node, _, context) {
    var exit = context.enter('tableCell')
    var value = phrasing(node, context, {before: around, after: around})
    exit()
    return value
  }

  function serializeData(matrix, align) {
    return markdownTable(matrix, {
      align: align,
      alignDelimiters: alignDelimiters,
      padding: padding,
      stringLength: stringLength
    })
  }

  function handleTableAsData(node, context) {
    var children = node.children
    var index = -1
    var length = children.length
    var result = []
    var subexit = context.enter('table')

    while (++index < length) {
      result[index] = handleTableRowAsData(children[index], context)
    }

    subexit()

    return result
  }

  function handleTableRowAsData(node, context) {
    var children = node.children
    var index = -1
    var length = children.length
    var result = []
    var subexit = context.enter('tableRow')

    while (++index < length) {
      result[index] = handleTableCell(children[index], node, context)
    }

    subexit()

    return result
  }

  function inlineCodeWithTable(node, parent, context) {
    var value = defaultInlineCode(node, parent, context)

    if (context.stack.indexOf('tableCell') !== -1) {
      value = value.replace(/\|/g, '\\$&')
    }

    return value
  }
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1652680529893);
})()
//miniprogram-npm-outsideDeps=["mdast-util-to-markdown/lib/util/container-phrasing","mdast-util-to-markdown/lib/handle/inline-code","markdown-table"]
//# sourceMappingURL=index.js.map