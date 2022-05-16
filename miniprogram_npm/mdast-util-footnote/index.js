module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1652680529879, function(require, module, exports) {
exports.fromMarkdown = require('./from-markdown')
exports.toMarkdown = require('./to-markdown')

}, function(modId) {var map = {"./from-markdown":1652680529880,"./to-markdown":1652680529881}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1652680529880, function(require, module, exports) {
var normalizeIdentifier = require('micromark/dist/util/normalize-identifier')

exports.canContainEols = ['footnote']

exports.enter = {
  footnoteDefinition: enterFootnoteDefinition,
  footnoteDefinitionLabelString: enterFootnoteDefinitionLabelString,
  footnoteCall: enterFootnoteCall,
  footnoteCallString: enterFootnoteCallString,
  inlineNote: enterNote
}
exports.exit = {
  footnoteDefinition: exitFootnoteDefinition,
  footnoteDefinitionLabelString: exitFootnoteDefinitionLabelString,
  footnoteCall: exitFootnoteCall,
  footnoteCallString: exitFootnoteCallString,
  inlineNote: exitNote
}

function enterFootnoteDefinition(token) {
  this.enter(
    {type: 'footnoteDefinition', identifier: '', label: '', children: []},
    token
  )
}

function enterFootnoteDefinitionLabelString() {
  this.buffer()
}

function exitFootnoteDefinitionLabelString(token) {
  var label = this.resume()
  this.stack[this.stack.length - 1].label = label
  this.stack[this.stack.length - 1].identifier = normalizeIdentifier(
    this.sliceSerialize(token)
  ).toLowerCase()
}

function exitFootnoteDefinition(token) {
  this.exit(token)
}

function enterFootnoteCall(token) {
  this.enter({type: 'footnoteReference', identifier: '', label: ''}, token)
}

function enterFootnoteCallString() {
  this.buffer()
}

function exitFootnoteCallString(token) {
  var label = this.resume()
  this.stack[this.stack.length - 1].label = label
  this.stack[this.stack.length - 1].identifier = normalizeIdentifier(
    this.sliceSerialize(token)
  ).toLowerCase()
}

function exitFootnoteCall(token) {
  this.exit(token)
}

function enterNote(token) {
  this.enter({type: 'footnote', children: []}, token)
}

function exitNote(token) {
  this.exit(token)
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1652680529881, function(require, module, exports) {
exports.unsafe = [
  // This is on by default already.
  {character: '[', inConstruct: ['phrasing', 'label', 'reference']}
]
exports.handlers = {
  footnote: footnote,
  footnoteDefinition: footnoteDefinition,
  footnoteReference: footnoteReference
}

var association = require('mdast-util-to-markdown/lib/util/association')
var phrasing = require('mdast-util-to-markdown/lib/util/container-phrasing')
var flow = require('mdast-util-to-markdown/lib/util/container-flow')
var indentLines = require('mdast-util-to-markdown/lib/util/indent-lines')
var safe = require('mdast-util-to-markdown/lib/util/safe')

footnoteReference.peek = footnoteReferencePeek
footnote.peek = footnotePeek

function footnoteReference(node, _, context) {
  var exit = context.enter('footnoteReference')
  var subexit = context.enter('reference')
  var reference = safe(context, association(node), {before: '^', after: ']'})
  subexit()
  exit()
  return '[^' + reference + ']'
}

function footnoteReferencePeek() {
  return '['
}

function footnote(node, _, context) {
  var exit = context.enter('footnote')
  var subexit = context.enter('label')
  var value = '^[' + phrasing(node, context, {before: '[', after: ']'}) + ']'
  subexit()
  exit()
  return value
}

function footnotePeek() {
  return '^'
}

function footnoteDefinition(node, _, context) {
  var exit = context.enter('footnoteDefinition')
  var subexit = context.enter('label')
  var label =
    '[^' + safe(context, association(node), {before: '^', after: ']'}) + ']:'
  var value
  subexit()

  value = indentLines(flow(node, context), map)
  exit()

  return value

  function map(line, index, blank) {
    if (index) {
      return (blank ? '' : '    ') + line
    }

    return (blank ? label : label + ' ') + line
  }
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1652680529879);
})()
//miniprogram-npm-outsideDeps=["micromark/dist/util/normalize-identifier","mdast-util-to-markdown/lib/util/association","mdast-util-to-markdown/lib/util/container-phrasing","mdast-util-to-markdown/lib/util/container-flow","mdast-util-to-markdown/lib/util/indent-lines","mdast-util-to-markdown/lib/util/safe"]
//# sourceMappingURL=index.js.map