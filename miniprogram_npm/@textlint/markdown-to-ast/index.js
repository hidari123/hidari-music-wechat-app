module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1652680529814, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.Syntax = void 0;
const markdown_syntax_map_1 = require("./mapping/markdown-syntax-map");
const ast_node_types_1 = require("@textlint/ast-node-types");
Object.defineProperty(exports, "Syntax", { enumerable: true, get: function () { return ast_node_types_1.ASTNodeTypes; } });
const traverse_1 = __importDefault(require("traverse"));
const debug_1 = __importDefault(require("debug"));
const parse_markdown_1 = require("./parse-markdown");
const debug = (0, debug_1.default)("@textlint/markdown-to-ast");
/**
 * parse markdown text and return ast mapped location info.
 * @param {string} text
 * @returns {TxtNode}
 */
function parse(text) {
    // remark-parse's AST does not consider BOM
    // AST's position does not +1 by BOM
    // So, just trim BOM and parse it for `raw` property
    // textlint's SourceCode also take same approach - trim BOM and check the position
    // This means that the loading side need to consider BOM position - for example fs.readFile and text slice script.
    // https://github.com/micromark/micromark/blob/0f19c1ac25964872a160d8b536878b125ddfe393/lib/preprocess.mjs#L29-L31
    const hasBOM = text.charCodeAt(0) === 0xfeff;
    const textWithoutBOM = hasBOM ? text.slice(1) : text;
    const ast = (0, parse_markdown_1.parseMarkdown)(textWithoutBOM);
    (0, traverse_1.default)(ast).forEach(function (node) {
        // eslint-disable-next-line no-invalid-this
        if (this.notLeaf) {
            if (node.type) {
                const replacedType = markdown_syntax_map_1.SyntaxMap[node.type];
                if (!replacedType) {
                    debug(`replacedType : ${replacedType} , node.type: ${node.type}`);
                }
                else {
                    node.type = replacedType;
                }
            }
            // map `range`, `loc` and `raw` to node
            if (node.position) {
                const position = node.position;
                const positionCompensated = {
                    start: { line: position.start.line, column: Math.max(position.start.column - 1, 0) },
                    end: { line: position.end.line, column: Math.max(position.end.column - 1, 0) }
                };
                const range = [position.start.offset, position.end.offset];
                node.loc = positionCompensated;
                node.range = range;
                node.raw = textWithoutBOM.slice(range[0], range[1]);
                // Compatible for https://github.com/syntax-tree/unist, but it is hidden
                Object.defineProperty(node, "position", {
                    enumerable: false,
                    configurable: false,
                    writable: false,
                    value: position
                });
            }
        }
    });
    return ast;
}
exports.parse = parse;
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {"./mapping/markdown-syntax-map":1652680529815,"./parse-markdown":1652680529816}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1652680529815, function(require, module, exports) {
// LICENSE : MIT

Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxMap = void 0;
const ast_node_types_1 = require("@textlint/ast-node-types");
exports.SyntaxMap = {
    root: ast_node_types_1.ASTNodeTypes.Document,
    paragraph: ast_node_types_1.ASTNodeTypes.Paragraph,
    blockquote: ast_node_types_1.ASTNodeTypes.BlockQuote,
    listItem: ast_node_types_1.ASTNodeTypes.ListItem,
    list: ast_node_types_1.ASTNodeTypes.List,
    Bullet: "Bullet",
    heading: ast_node_types_1.ASTNodeTypes.Header,
    code: ast_node_types_1.ASTNodeTypes.CodeBlock,
    HtmlBlock: ast_node_types_1.ASTNodeTypes.HtmlBlock,
    thematicBreak: ast_node_types_1.ASTNodeTypes.HorizontalRule,
    // inline block
    text: ast_node_types_1.ASTNodeTypes.Str,
    break: ast_node_types_1.ASTNodeTypes.Break,
    emphasis: ast_node_types_1.ASTNodeTypes.Emphasis,
    strong: ast_node_types_1.ASTNodeTypes.Strong,
    html: ast_node_types_1.ASTNodeTypes.Html,
    link: ast_node_types_1.ASTNodeTypes.Link,
    image: ast_node_types_1.ASTNodeTypes.Image,
    inlineCode: ast_node_types_1.ASTNodeTypes.Code,
    delete: ast_node_types_1.ASTNodeTypes.Delete,
    // remark(markdown) extension
    // Following type is not in @textlint/ast-node-types
    yaml: "Yaml",
    table: "Table",
    tableRow: "TableRow",
    tableCell: "TableCell",
    linkReference: "LinkReference",
    imageReference: "ImageReference",
    footnoteReference: "FootnoteReference",
    definition: "Definition",
    /**
     * @deprecated
     */
    ReferenceDef: ast_node_types_1.ASTNodeTypes.ReferenceDef
};
//# sourceMappingURL=markdown-syntax-map.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1652680529816, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMarkdown = void 0;
const unified_1 = __importDefault(require("unified"));
// @ts-ignore
const from_markdown_1 = __importDefault(require("mdast-util-gfm-autolink-literal/from-markdown"));
// FIXME: Disable auto link literal transforms that break AST node
// https://github.com/remarkjs/remark-gfm/issues/16
// Need to override before import gfm plugin
from_markdown_1.default.transforms = [];
// Load plugins
const remark_gfm_1 = __importDefault(require("remark-gfm"));
const remark_parse_1 = __importDefault(require("remark-parse"));
const remark_frontmatter_1 = __importDefault(require("remark-frontmatter"));
const remark_footnotes_1 = __importDefault(require("remark-footnotes"));
const remark = (0, unified_1.default)().use(remark_parse_1.default).use(remark_frontmatter_1.default, ["yaml"]).use(remark_gfm_1.default).use(remark_footnotes_1.default, {
    inlineNotes: true
});
const parseMarkdown = (text) => {
    return remark.parse(text);
};
exports.parseMarkdown = parseMarkdown;
//# sourceMappingURL=parse-markdown.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1652680529814);
})()
//miniprogram-npm-outsideDeps=["@textlint/ast-node-types","traverse","debug","unified","mdast-util-gfm-autolink-literal/from-markdown","remark-gfm","remark-parse","remark-frontmatter","remark-footnotes"]
//# sourceMappingURL=index.js.map