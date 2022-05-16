module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1652680529827, function(require, module, exports) {




var path      =  require('path')
  , fs        =  require('fs')
  , minimist  =  require('minimist')
  , file      =  require('./lib/file')
  , transform =  require('./lib/transform')
  , files;

function cleanPath(path) {
  var homeExpanded = (path.indexOf('~') === 0) ? process.env.HOME + path.substr(1) : path;

  // Escape all spaces
  return homeExpanded.replace(/\s/g, '\\ ');
}

function transformAndSave(files, mode, maxHeaderLevel, title, notitle, entryPrefix, processAll, stdOut, updateOnly) {
  if (processAll) {
    console.log('--all flag is enabled. Including headers before the TOC location.')
  }

  if (updateOnly) {
    console.log('--update-only flag is enabled. Only updating files that already have a TOC.')
  }
  
  console.log('\n==================\n');

  var transformed = files
    .map(function (x) {
      var content = fs.readFileSync(x.path, 'utf8')
        , result = transform(content, mode, maxHeaderLevel, title, notitle, entryPrefix, processAll, updateOnly);
      result.path = x.path;
      return result;
    });
  var changed = transformed.filter(function (x) { return x.transformed; })
    , unchanged = transformed.filter(function (x) { return !x.transformed; })
    , toc = transformed.filter(function (x) { return x.toc; })

  if (stdOut) {
    toc.forEach(function (x) {
      console.log(x.toc)
    })
  }

  unchanged.forEach(function (x) {
    console.log('"%s" is up to date', x.path);
  });

  changed.forEach(function (x) { 
    if (stdOut) {
      console.log('==================\n\n"%s" should be updated', x.path)
    } else {
      console.log('"%s" will be updated', x.path);
      fs.writeFileSync(x.path, x.data, 'utf8');
    }
  });
}

function printUsageAndExit(isErr) {

  var outputFunc = isErr ? console.error : console.info;

  outputFunc('Usage: doctoc [mode] [--entryprefix prefix] [--notitle | --title title] [--maxlevel level] [--all] [--update-only] <path> (where path is some path to a directory (e.g., .) or a file (e.g., README.md))');
  outputFunc('\nAvailable modes are:');
  for (var key in modes) {
    outputFunc('  --%s\t%s', key, modes[key]);
  }
  outputFunc('Defaults to \'' + mode + '\'.');

  process.exit(isErr ? 2 : 0);
}

var modes = {
    bitbucket : 'bitbucket.org'
  , nodejs    : 'nodejs.org'
  , github    : 'github.com'
  , gitlab    : 'gitlab.com'
  , ghost     : 'ghost.org'
}

var mode = modes['github'];

var argv = minimist(process.argv.slice(2)
    , { boolean: [ 'h', 'help', 'T', 'notitle', 's', 'stdout', 'all' , 'u', 'update-only'].concat(Object.keys(modes))
    , string: [ 'title', 't', 'maxlevel', 'm', 'entryprefix' ]
    , unknown: function(a) { return (a[0] == '-' ? (console.error('Unknown option(s): ' + a), printUsageAndExit(true)) : true); }
    });

if (argv.h || argv.help) {
  printUsageAndExit();
}

for (var key in modes) {
  if (argv[key]) {
    mode = modes[key];
  }
}

var title = argv.t || argv.title;
var notitle = argv.T || argv.notitle;
var entryPrefix = argv.entryprefix || '-';
var processAll = argv.all;
var stdOut = argv.s || argv.stdout
var updateOnly = argv.u || argv['update-only']

var maxHeaderLevel = argv.m || argv.maxlevel;
if (maxHeaderLevel && isNaN(maxHeaderLevel) || maxHeaderLevel < 0) { console.error('Max. heading level specified is not a positive number: ' + maxHeaderLevel), printUsageAndExit(true); }

for (var i = 0; i < argv._.length; i++) {
  var target = cleanPath(argv._[i])
    , stat = fs.statSync(target)

  if (stat.isDirectory()) {
    console.log ('\nDocToccing "%s" and its sub directories for %s.', target, mode);
    files = file.findMarkdownFiles(target);
  } else {
    console.log ('\nDocToccing single file "%s" for %s.', target, mode);
    files = [{ path: target }];
  }

  transformAndSave(files, mode, maxHeaderLevel, title, notitle, entryPrefix, processAll, stdOut, updateOnly);

  console.log('\nEverything is OK.');
}

module.exports.transform = transform;

}, function(modId) {var map = {"./lib/file":1652680529828,"./lib/transform":1652680529829}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1652680529828, function(require, module, exports) {
var path  =  require('path')
 ,  fs  =  require('fs')
 ,  _   =  require('underscore');

var markdownExts = ['.md', '.markdown'];
var ignoredDirs  = ['.', '..', '.git', 'node_modules'];

function separateFilesAndDirs(fileInfos) {
  return {
    directories :  _(fileInfos).filter(function (x) {
      return x.isDirectory() && !_(ignoredDirs).include(x.name);
    }),
    markdownFiles :  _(fileInfos).filter(function (x) { 
      return x.isFile() && _(markdownExts).include(path.extname(x.name)); 
    })
  };
}

function findRec(currentPath) {
  function getStat (entry) {
    var target = path.join(currentPath, entry),
      stat = fs.statSync(target);

    return  _(stat).extend({ 
      name: entry,
      path: target
    });
  }
  
  function process (fileInfos) {
    var res = separateFilesAndDirs(fileInfos);
    var tgts = _(res.directories).pluck('path');

    if (res.markdownFiles.length > 0) 
      console.log('\nFound %s in "%s"', _(res.markdownFiles).pluck('name').join(', '), currentPath);
    else 
      console.log('\nFound nothing in "%s"', currentPath);

    return { 
      markdownFiles :  res.markdownFiles,
      subdirs     :  tgts
    };
  }

  var stats                  =  _(fs.readdirSync(currentPath)).map(getStat)
    , res                    =  process(stats)
    , markdownsInSubdirs     =  _(res.subdirs).map(findRec)
    , allMarkdownsHereAndSub =  res.markdownFiles.concat(markdownsInSubdirs);

  return _(allMarkdownsHereAndSub).flatten();
}

// Finds all markdown files in given directory and its sub-directories
// @param {String  } dir - the absolute directory to search in 
exports.findMarkdownFiles = function(dir) {
  return findRec(dir);
};

/* Example:
console.log('\033[2J'); // clear console

var res = findRec(path.join(__dirname, '..', 'samples'));
console.log('Result: ', res);
*/

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1652680529829, function(require, module, exports) {


var _             = require('underscore')
  , anchor        = require('anchor-markdown-header')
  , updateSection = require('update-section')
  , getHtmlHeaders = require('./get-html-headers')
  , md            = require('@textlint/markdown-to-ast');

var start = '<!-- START doctoc generated TOC please keep comment here to allow auto update -->\n' +
            '<!-- DON\'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->'
  , end   = '<!-- END doctoc generated TOC please keep comment here to allow auto update -->'
  , skipTag = '<!-- DOCTOC SKIP -->';


function matchesStart(line) {
  return (/<!-- START doctoc /).test(line);
}

function matchesEnd(line) {
  return (/<!-- END doctoc /).test(line);
}

function notNull(x) { return  x !== null; }

function addAnchor(mode, header) {
  header.anchor = anchor(header.name, mode, header.instance);
  return header;
}

function isString(y) {
  return typeof y === 'string';
}


function getMarkdownHeaders (lines, maxHeaderLevel) {
  function extractText (header) {
    return header.children
      .map(function (x) {
        if (x.type === md.Syntax.Link) {
          return extractText(x);
        }
        else if (x.type === md.Syntax.Image) {
          // Images (at least on GitHub, untested elsewhere) are given a hyphen
          // in the slug. We can achieve this behavior by adding an '*' to the
          // TOC entry. Think of it as a "magic char" that represents the iamge.
          return '*';
        }
        else {
          return x.raw;
        }
      })
      .join('')
  }

  return md.parse(lines.join('\n')).children
    .filter(function (x) {
      return x.type === md.Syntax.Header;
    })
    .map(function (x) {
      return !maxHeaderLevel || x.depth <= maxHeaderLevel
        ? { rank :  x.depth
          , name :  extractText(x)
          , line :  x.loc.start.line
          }
        : null;
    })
    .filter(notNull)
}

function countHeaders (headers) {
  var instances = {};

  for (var i = 0; i < headers.length; i++) {
    var header = headers[i];
    var name = header.name;

    if (Object.prototype.hasOwnProperty.call(instances, name)) {
      // `instances.hasOwnProperty(name)` fails when there’s an instance named "hasOwnProperty".
      instances[name]++;
    } else {
      instances[name] = 0;
    }

    header.instance = instances[name];
  }

  return headers;
}

function getLinesToToc (lines, currentToc, info, processAll) {
  if (processAll || !currentToc) return lines;

  var tocableStart = 0;

  // when updating an existing toc, we only take the headers into account
  // that are below the existing toc
  if (info.hasEnd) tocableStart = info.endIdx + 1;

  return lines.slice(tocableStart);
}

// Use document context as well as command line args to infer the title
function determineTitle(title, notitle, lines, info) {
  var defaultTitle = '**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*';

  if (notitle) return '';
  if (title) return title;
  return info.hasStart ? lines[info.startIdx + 2] : defaultTitle;
}

exports = module.exports = function transform(content, mode, maxHeaderLevel, title, notitle, entryPrefix, processAll, updateOnly) {
  if (content.indexOf(skipTag) !== -1) return { transformed: false };

  mode = mode || 'github.com';
  entryPrefix = entryPrefix || '-';

  // only limit *HTML* headings by default
  var maxHeaderLevelHtml = maxHeaderLevel || 4;

  var lines = content.split('\n')
    , info = updateSection.parse(lines, matchesStart, matchesEnd)

  if (!info.hasStart && updateOnly) {
    return { transformed: false };
  }

  var inferredTitle = determineTitle(title, notitle, lines, info);

  var titleSeparator = inferredTitle ? '\n\n' : '\n';

  var currentToc = info.hasStart && lines.slice(info.startIdx, info.endIdx + 1).join('\n')
    , linesToToc = getLinesToToc(lines, currentToc, info, processAll);

  var headers = getMarkdownHeaders(linesToToc, maxHeaderLevel)
    .concat(getHtmlHeaders(linesToToc, maxHeaderLevelHtml))

  headers.sort(function (a, b) {
    return a.line - b.line;
  });

  var allHeaders    =  countHeaders(headers)
    , lowestRank    =  _(allHeaders).chain().pluck('rank').min().value()
    , linkedHeaders =  _(allHeaders).map(addAnchor.bind(null, mode));

  if (linkedHeaders.length === 0) return { transformed: false };

  // 4 spaces required for proper indention on Bitbucket and GitLab
  var indentation = (mode === 'bitbucket.org' || mode === 'gitlab.com') ? '    ' : '  ';

  var toc =
      inferredTitle
    + titleSeparator
    + linkedHeaders
        .map(function (x) {
          var indent = _(_.range(x.rank - lowestRank))
            .reduce(function (acc, x) { return acc + indentation; }, '');

          return indent + entryPrefix + ' ' + x.anchor;
        })
        .join('\n')
    + '\n';

  var wrappedToc =  start + '\n' + toc + '\n' + end;

  if (currentToc === toc) return { transformed: false };

  var data = updateSection(lines.join('\n'), wrappedToc, matchesStart, matchesEnd, true);
  return { transformed : true, data : data, toc: toc, wrappedToc: wrappedToc };
};

exports.start = start;
exports.end = end;

}, function(modId) { var map = {"./get-html-headers":1652680529830}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1652680529830, function(require, module, exports) {


var htmlparser = require('htmlparser2')
  , md         = require('@textlint/markdown-to-ast');

function addLinenos(lines, headers) {
  var current = 0, line;

  return headers.map(function (x) {
    for (var lineno = current; lineno < lines.length; lineno++) {
      line = lines[lineno];
      if (new RegExp(x.text[0]).test(line)) {
        current = lineno;
        x.line = lineno;
        x.name = x.text.join('');
        return x
      }
    }

    // in case we didn't find a matching line, which is odd,
    // we'll have to assume it's right on the next line
    x.line = ++current;
    x.name = x.text.join('');
    return x
  })
}

function rankify(headers, max) {
  return headers
    .map(function (x) {
      x.rank = parseInt(x.tag.slice(1), 10);
      return x;
    })
    .filter(function (x) {
      return x.rank <= max;
    })
}

var go = module.exports = function (lines, maxHeaderLevel) {
  var source = md.parse(lines.join('\n'))
    .children
    .filter(function(node) {
      return node.type === md.Syntax.HtmlBlock || node.type === md.Syntax.Html;
    })
    .map(function (node) {
      return node.raw;
    })
    .join('\n');

  //var headers = [], grabbing = null, text = [];
  var headers = [], grabbing = [], text = [];

  var parser = new htmlparser.Parser({
    onopentag: function (name, attr) {
      // Short circuit if we're already inside a pre
      if (grabbing[grabbing.length - 1] === 'pre') return;

      if (name === 'pre' || (/h\d/).test(name)) {
        grabbing.push(name);
      }
    },
    ontext: function (text_) {
      // Explicitly skip pre tags, and implicitly skip all others
      if (grabbing.length === 0 ||
          grabbing[grabbing.length - 1] === 'pre') return;

      text.push(text_);
    },
    onclosetag: function (name) {
      if (grabbing.length === 0) return;
      if (grabbing[grabbing.length - 1] === name) {
        var tag = grabbing.pop();
        headers.push({ text: text, tag: tag });
        text = [];
      }
    }
  },
  { decodeEntities: true })

  parser.write(source);
  parser.end();

  headers = addLinenos(lines, headers)
  // consider anything past h4 to small to warrant a link, may be made configurable in the future
  headers = rankify(headers, maxHeaderLevel);
  return headers;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1652680529827);
})()
//miniprogram-npm-outsideDeps=["path","fs","minimist","underscore","anchor-markdown-header","update-section","@textlint/markdown-to-ast","htmlparser2"]
//# sourceMappingURL=index.js.map