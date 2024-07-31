"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // shared/js/ui/pages/mixins/set-browser-class.js
  var require_set_browser_class = __commonJS({
    "shared/js/ui/pages/mixins/set-browser-class.js"(exports2, module2) {
      "use strict";
      module2.exports = {
        setBrowserClassOnBodyTag: function() {
          window.chrome.runtime.sendMessage({ messageType: "getBrowser" }, (browserName2) => {
            if (["edg", "edge", "brave"].includes(browserName2)) {
              browserName2 = "chrome";
            }
            const browserClass = "is-browser--" + browserName2;
            window.$("html").addClass(browserClass);
            window.$("body").addClass(browserClass);
          });
        }
      };
    }
  });

  // shared/js/ui/pages/mixins/parse-query-string.js
  var require_parse_query_string = __commonJS({
    "shared/js/ui/pages/mixins/parse-query-string.js"(exports2, module2) {
      "use strict";
      module2.exports = {
        parseQueryString: (qs) => {
          if (typeof qs !== "string") {
            throw new Error("tried to parse a non-string query string");
          }
          const parsed = {};
          if (qs[0] === "?") {
            qs = qs.substr(1);
          }
          const parts = qs.split("&");
          parts.forEach((part) => {
            const [key, val] = part.split("=");
            if (key && val) {
              parsed[key] = val;
            }
          });
          return parsed;
        }
      };
    }
  });

  // shared/js/ui/pages/mixins/index.js
  var require_mixins = __commonJS({
    "shared/js/ui/pages/mixins/index.js"(exports2, module2) {
      "use strict";
      module2.exports = {
        setBrowserClassOnBodyTag: require_set_browser_class(),
        parseQueryString: require_parse_query_string()
      };
    }
  });

  // shared/js/ui/views/privacy-options.js
  var require_privacy_options = __commonJS({
    "shared/js/ui/views/privacy-options.js"(exports2, module2) {
      "use strict";
      var Parent2 = window.DDG.base.View;
      function PrivacyOptions(ops) {
        this.model = ops.model;
        this.pageView = ops.pageView;
        this.template = ops.template;
        Parent2.call(this, ops);
        this.model.getState().then(() => {
          this.rerender();
        });
      }
      PrivacyOptions.prototype = window.$.extend(
        {},
        Parent2.prototype,
        {
          _clickSetting: function(e) {
            const key = window.$(e.target).data("key") || window.$(e.target).parent().data("key");
            console.log(`privacyOptions view click for setting "${key}"`);
            this.model.toggle(key);
            this.rerender();
          },
          setup: function() {
            this._cacheElems(".js-options", ["blocktrackers", "https-everywhere-enabled", "embedded-tweets-enabled", "gpc-enabled", "youtube-previews-enabled", "firebutton-clear-history-enabled", "firebutton-tabclear-enabled"]);
            this.bindEvents([
              [this.$blocktrackers, "click", this._clickSetting],
              [this.$httpseverywhereenabled, "click", this._clickSetting],
              [this.$embeddedtweetsenabled, "click", this._clickSetting],
              [this.$gpcenabled, "click", this._clickSetting],
              [this.$youtubepreviewsenabled, "click", this._clickSetting],
              [this.$firebuttonclearhistoryenabled, "click", this._clickSetting],
              [this.$firebuttontabclearenabled, "click", this._clickSetting]
            ]);
          },
          rerender: function() {
            this.unbindEvents();
            this._rerender();
            this.setup();
          }
        }
      );
      module2.exports = PrivacyOptions;
    }
  });

  // shared/js/ui/models/privacy-options.js
  var require_privacy_options2 = __commonJS({
    "shared/js/ui/models/privacy-options.js"(exports2, module2) {
      "use strict";
      var Parent2 = window.DDG.base.Model;
      function PrivacyOptions(attrs) {
        attrs.httpsEverywhereEnabled = true;
        attrs.embeddedTweetsEnabled = false;
        attrs.GPC = false;
        attrs.youtubeClickToLoadEnabled = false;
        attrs.youtubePreviewsEnabled = false;
        attrs.fireButtonClearHistoryEnabled = true;
        attrs.fireButtonTabClearEnabled = true;
        Parent2.call(this, attrs);
      }
      PrivacyOptions.prototype = window.$.extend(
        {},
        Parent2.prototype,
        {
          modelName: "privacyOptions",
          toggle: function(k) {
            if (Object.hasOwnProperty.call(this, k)) {
              this[k] = !this[k];
              console.log(`PrivacyOptions model toggle ${k} is now ${this[k]}`);
              this.sendMessage("updateSetting", { name: k, value: this[k] });
            }
          },
          async getState() {
            const [settings13, youtubeClickToLoadEnabled] = await Promise.all([
              this.sendMessage("getSetting", "all"),
              this.sendMessage("isClickToLoadYoutubeEnabled")
            ]);
            this.httpsEverywhereEnabled = settings13.httpsEverywhereEnabled;
            this.embeddedTweetsEnabled = settings13.embeddedTweetsEnabled;
            this.GPC = settings13.GPC;
            this.youtubeClickToLoadEnabled = youtubeClickToLoadEnabled;
            this.youtubePreviewsEnabled = settings13.youtubePreviewsEnabled;
            this.fireButtonEnabled = true;
            this.fireButtonClearHistoryEnabled = settings13.fireButtonClearHistoryEnabled;
            this.fireButtonTabClearEnabled = settings13.fireButtonTabClearEnabled;
          }
        }
      );
      module2.exports = PrivacyOptions;
    }
  });

  // node_modules/hyperscript-attribute-to-property/index.js
  var require_hyperscript_attribute_to_property = __commonJS({
    "node_modules/hyperscript-attribute-to-property/index.js"(exports2, module2) {
      module2.exports = attributeToProperty;
      var transform = {
        "class": "className",
        "for": "htmlFor",
        "http-equiv": "httpEquiv"
      };
      function attributeToProperty(h) {
        return function(tagName, attrs, children) {
          for (var attr in attrs) {
            if (attr in transform) {
              attrs[transform[attr]] = attrs[attr];
              delete attrs[attr];
            }
          }
          return h(tagName, attrs, children);
        };
      }
    }
  });

  // node_modules/hyperx/index.js
  var require_hyperx = __commonJS({
    "node_modules/hyperx/index.js"(exports2, module2) {
      var attrToProp = require_hyperscript_attribute_to_property();
      var VAR = 0;
      var TEXT = 1;
      var OPEN = 2;
      var CLOSE = 3;
      var ATTR = 4;
      var ATTR_KEY = 5;
      var ATTR_KEY_W = 6;
      var ATTR_VALUE_W = 7;
      var ATTR_VALUE = 8;
      var ATTR_VALUE_SQ = 9;
      var ATTR_VALUE_DQ = 10;
      var ATTR_EQ = 11;
      var ATTR_BREAK = 12;
      var COMMENT = 13;
      module2.exports = function(h, opts) {
        if (!opts) opts = {};
        var concat = opts.concat || function(a, b) {
          return String(a) + String(b);
        };
        if (opts.attrToProp !== false) {
          h = attrToProp(h);
        }
        return function(strings) {
          var state = TEXT, reg = "";
          var arglen = arguments.length;
          var parts = [];
          for (var i = 0; i < strings.length; i++) {
            if (i < arglen - 1) {
              var arg = arguments[i + 1];
              var p = parse3(strings[i]);
              var xstate = state;
              if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE;
              if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE;
              if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE;
              if (xstate === ATTR) xstate = ATTR_KEY;
              if (xstate === OPEN) {
                if (reg === "/") {
                  p.push([OPEN, "/", arg]);
                  reg = "";
                } else {
                  p.push([OPEN, arg]);
                }
              } else if (xstate === COMMENT && opts.comments) {
                reg += String(arg);
              } else if (xstate !== COMMENT) {
                p.push([VAR, xstate, arg]);
              }
              parts.push.apply(parts, p);
            } else parts.push.apply(parts, parse3(strings[i]));
          }
          var tree = [null, {}, []];
          var stack = [[tree, -1]];
          for (var i = 0; i < parts.length; i++) {
            var cur = stack[stack.length - 1][0];
            var p = parts[i], s = p[0];
            if (s === OPEN && /^\//.test(p[1])) {
              var ix = stack[stack.length - 1][1];
              if (stack.length > 1) {
                stack.pop();
                stack[stack.length - 1][0][2][ix] = h(
                  cur[0],
                  cur[1],
                  cur[2].length ? cur[2] : void 0
                );
              }
            } else if (s === OPEN) {
              var c = [p[1], {}, []];
              cur[2].push(c);
              stack.push([c, cur[2].length - 1]);
            } else if (s === ATTR_KEY || s === VAR && p[1] === ATTR_KEY) {
              var key = "";
              var copyKey;
              for (; i < parts.length; i++) {
                if (parts[i][0] === ATTR_KEY) {
                  key = concat(key, parts[i][1]);
                } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
                  if (typeof parts[i][2] === "object" && !key) {
                    for (copyKey in parts[i][2]) {
                      if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                        cur[1][copyKey] = parts[i][2][copyKey];
                      }
                    }
                  } else {
                    key = concat(key, parts[i][2]);
                  }
                } else break;
              }
              if (parts[i][0] === ATTR_EQ) i++;
              var j = i;
              for (; i < parts.length; i++) {
                if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
                  if (!cur[1][key]) cur[1][key] = strfn(parts[i][1]);
                  else parts[i][1] === "" || (cur[1][key] = concat(cur[1][key], parts[i][1]));
                } else if (parts[i][0] === VAR && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
                  if (!cur[1][key]) cur[1][key] = strfn(parts[i][2]);
                  else parts[i][2] === "" || (cur[1][key] = concat(cur[1][key], parts[i][2]));
                } else {
                  if (key.length && !cur[1][key] && i === j && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
                    cur[1][key] = key.toLowerCase();
                  }
                  if (parts[i][0] === CLOSE) {
                    i--;
                  }
                  break;
                }
              }
            } else if (s === ATTR_KEY) {
              cur[1][p[1]] = true;
            } else if (s === VAR && p[1] === ATTR_KEY) {
              cur[1][p[2]] = true;
            } else if (s === CLOSE) {
              if (selfClosing(cur[0]) && stack.length) {
                var ix = stack[stack.length - 1][1];
                stack.pop();
                stack[stack.length - 1][0][2][ix] = h(
                  cur[0],
                  cur[1],
                  cur[2].length ? cur[2] : void 0
                );
              }
            } else if (s === VAR && p[1] === TEXT) {
              if (p[2] === void 0 || p[2] === null) p[2] = "";
              else if (!p[2]) p[2] = concat("", p[2]);
              if (Array.isArray(p[2][0])) {
                cur[2].push.apply(cur[2], p[2]);
              } else {
                cur[2].push(p[2]);
              }
            } else if (s === TEXT) {
              cur[2].push(p[1]);
            } else if (s === ATTR_EQ || s === ATTR_BREAK) {
            } else {
              throw new Error("unhandled: " + s);
            }
          }
          if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
            tree[2].shift();
          }
          if (tree[2].length > 2 || tree[2].length === 2 && /\S/.test(tree[2][1])) {
            if (opts.createFragment) return opts.createFragment(tree[2]);
            throw new Error(
              "multiple root elements must be wrapped in an enclosing tag"
            );
          }
          if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === "string" && Array.isArray(tree[2][0][2])) {
            tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2]);
          }
          return tree[2][0];
          function parse3(str) {
            var res = [];
            if (state === ATTR_VALUE_W) state = ATTR;
            for (var i2 = 0; i2 < str.length; i2++) {
              var c2 = str.charAt(i2);
              if (state === TEXT && c2 === "<") {
                if (reg.length) res.push([TEXT, reg]);
                reg = "";
                state = OPEN;
              } else if (c2 === ">" && !quot(state) && state !== COMMENT) {
                if (state === OPEN && reg.length) {
                  res.push([OPEN, reg]);
                } else if (state === ATTR_KEY) {
                  res.push([ATTR_KEY, reg]);
                } else if (state === ATTR_VALUE && reg.length) {
                  res.push([ATTR_VALUE, reg]);
                }
                res.push([CLOSE]);
                reg = "";
                state = TEXT;
              } else if (state === COMMENT && /-$/.test(reg) && c2 === "-") {
                if (opts.comments) {
                  res.push([ATTR_VALUE, reg.substr(0, reg.length - 1)]);
                }
                reg = "";
                state = TEXT;
              } else if (state === OPEN && /^!--$/.test(reg)) {
                if (opts.comments) {
                  res.push([OPEN, reg], [ATTR_KEY, "comment"], [ATTR_EQ]);
                }
                reg = c2;
                state = COMMENT;
              } else if (state === TEXT || state === COMMENT) {
                reg += c2;
              } else if (state === OPEN && c2 === "/" && reg.length) {
              } else if (state === OPEN && /\s/.test(c2)) {
                if (reg.length) {
                  res.push([OPEN, reg]);
                }
                reg = "";
                state = ATTR;
              } else if (state === OPEN) {
                reg += c2;
              } else if (state === ATTR && /[^\s"'=/]/.test(c2)) {
                state = ATTR_KEY;
                reg = c2;
              } else if (state === ATTR && /\s/.test(c2)) {
                if (reg.length) res.push([ATTR_KEY, reg]);
                res.push([ATTR_BREAK]);
              } else if (state === ATTR_KEY && /\s/.test(c2)) {
                res.push([ATTR_KEY, reg]);
                reg = "";
                state = ATTR_KEY_W;
              } else if (state === ATTR_KEY && c2 === "=") {
                res.push([ATTR_KEY, reg], [ATTR_EQ]);
                reg = "";
                state = ATTR_VALUE_W;
              } else if (state === ATTR_KEY) {
                reg += c2;
              } else if ((state === ATTR_KEY_W || state === ATTR) && c2 === "=") {
                res.push([ATTR_EQ]);
                state = ATTR_VALUE_W;
              } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c2)) {
                res.push([ATTR_BREAK]);
                if (/[\w-]/.test(c2)) {
                  reg += c2;
                  state = ATTR_KEY;
                } else state = ATTR;
              } else if (state === ATTR_VALUE_W && c2 === '"') {
                state = ATTR_VALUE_DQ;
              } else if (state === ATTR_VALUE_W && c2 === "'") {
                state = ATTR_VALUE_SQ;
              } else if (state === ATTR_VALUE_DQ && c2 === '"') {
                res.push([ATTR_VALUE, reg], [ATTR_BREAK]);
                reg = "";
                state = ATTR;
              } else if (state === ATTR_VALUE_SQ && c2 === "'") {
                res.push([ATTR_VALUE, reg], [ATTR_BREAK]);
                reg = "";
                state = ATTR;
              } else if (state === ATTR_VALUE_W && !/\s/.test(c2)) {
                state = ATTR_VALUE;
                i2--;
              } else if (state === ATTR_VALUE && /\s/.test(c2)) {
                res.push([ATTR_VALUE, reg], [ATTR_BREAK]);
                reg = "";
                state = ATTR;
              } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ) {
                reg += c2;
              }
            }
            if (state === TEXT && reg.length) {
              res.push([TEXT, reg]);
              reg = "";
            } else if (state === ATTR_VALUE && reg.length) {
              res.push([ATTR_VALUE, reg]);
              reg = "";
            } else if (state === ATTR_VALUE_DQ && reg.length) {
              res.push([ATTR_VALUE, reg]);
              reg = "";
            } else if (state === ATTR_VALUE_SQ && reg.length) {
              res.push([ATTR_VALUE, reg]);
              reg = "";
            } else if (state === ATTR_KEY) {
              res.push([ATTR_KEY, reg]);
              reg = "";
            }
            return res;
          }
        };
        function strfn(x) {
          if (typeof x === "function") return x;
          else if (typeof x === "string") return x;
          else if (x && typeof x === "object") return x;
          else if (x === null || x === void 0) return x;
          else return concat("", x);
        }
      };
      function quot(state) {
        return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ;
      }
      var closeRE = RegExp("^(" + [
        "area",
        "base",
        "basefont",
        "bgsound",
        "br",
        "col",
        "command",
        "embed",
        "frame",
        "hr",
        "img",
        "input",
        "isindex",
        "keygen",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
        "!--",
        // SVG TAGS
        "animate",
        "animateTransform",
        "circle",
        "cursor",
        "desc",
        "ellipse",
        "feBlend",
        "feColorMatrix",
        "feComposite",
        "feConvolveMatrix",
        "feDiffuseLighting",
        "feDisplacementMap",
        "feDistantLight",
        "feFlood",
        "feFuncA",
        "feFuncB",
        "feFuncG",
        "feFuncR",
        "feGaussianBlur",
        "feImage",
        "feMergeNode",
        "feMorphology",
        "feOffset",
        "fePointLight",
        "feSpecularLighting",
        "feSpotLight",
        "feTile",
        "feTurbulence",
        "font-face-format",
        "font-face-name",
        "font-face-uri",
        "glyph",
        "glyphRef",
        "hkern",
        "image",
        "line",
        "missing-glyph",
        "mpath",
        "path",
        "polygon",
        "polyline",
        "rect",
        "set",
        "stop",
        "tref",
        "use",
        "view",
        "vkern"
      ].join("|") + ")(?:[.#][a-zA-Z0-9\x7F-\uFFFF_:-]+)*$");
      function selfClosing(tag) {
        return closeRE.test(tag);
      }
    }
  });

  // node_modules/nanohtml/lib/append-child.js
  var require_append_child = __commonJS({
    "node_modules/nanohtml/lib/append-child.js"(exports2, module2) {
      "use strict";
      var trailingNewlineRegex = /\n[\s]+$/;
      var leadingNewlineRegex = /^\n[\s]+/;
      var trailingSpaceRegex = /[\s]+$/;
      var leadingSpaceRegex = /^[\s]+/;
      var multiSpaceRegex = /[\n\s]+/g;
      var TEXT_TAGS = [
        "a",
        "abbr",
        "b",
        "bdi",
        "bdo",
        "br",
        "cite",
        "data",
        "dfn",
        "em",
        "i",
        "kbd",
        "mark",
        "q",
        "rp",
        "rt",
        "rtc",
        "ruby",
        "s",
        "amp",
        "small",
        "span",
        "strong",
        "sub",
        "sup",
        "time",
        "u",
        "var",
        "wbr"
      ];
      var VERBATIM_TAGS = [
        "code",
        "pre",
        "textarea"
      ];
      module2.exports = function appendChild(el, childs) {
        if (!Array.isArray(childs)) return;
        var nodeName = el.nodeName.toLowerCase();
        var hadText = false;
        var value, leader;
        for (var i = 0, len = childs.length; i < len; i++) {
          var node = childs[i];
          if (Array.isArray(node)) {
            appendChild(el, node);
            continue;
          }
          if (typeof node === "number" || typeof node === "boolean" || typeof node === "function" || node instanceof Date || node instanceof RegExp) {
            node = node.toString();
          }
          var lastChild = el.childNodes[el.childNodes.length - 1];
          if (typeof node === "string") {
            hadText = true;
            if (lastChild && lastChild.nodeName === "#text") {
              lastChild.nodeValue += node;
            } else {
              node = el.ownerDocument.createTextNode(node);
              el.appendChild(node);
              lastChild = node;
            }
            if (i === len - 1) {
              hadText = false;
              if (TEXT_TAGS.indexOf(nodeName) === -1 && VERBATIM_TAGS.indexOf(nodeName) === -1) {
                value = lastChild.nodeValue.replace(leadingNewlineRegex, "").replace(trailingSpaceRegex, "").replace(trailingNewlineRegex, "").replace(multiSpaceRegex, " ");
                if (value === "") {
                  el.removeChild(lastChild);
                } else {
                  lastChild.nodeValue = value;
                }
              } else if (VERBATIM_TAGS.indexOf(nodeName) === -1) {
                leader = i === 0 ? "" : " ";
                value = lastChild.nodeValue.replace(leadingNewlineRegex, leader).replace(leadingSpaceRegex, " ").replace(trailingSpaceRegex, "").replace(trailingNewlineRegex, "").replace(multiSpaceRegex, " ");
                lastChild.nodeValue = value;
              }
            }
          } else if (node && node.nodeType) {
            if (hadText) {
              hadText = false;
              if (TEXT_TAGS.indexOf(nodeName) === -1 && VERBATIM_TAGS.indexOf(nodeName) === -1) {
                value = lastChild.nodeValue.replace(leadingNewlineRegex, "").replace(trailingNewlineRegex, " ").replace(multiSpaceRegex, " ");
                if (value === "") {
                  el.removeChild(lastChild);
                } else {
                  lastChild.nodeValue = value;
                }
              } else if (VERBATIM_TAGS.indexOf(nodeName) === -1) {
                value = lastChild.nodeValue.replace(leadingSpaceRegex, " ").replace(leadingNewlineRegex, "").replace(trailingNewlineRegex, " ").replace(multiSpaceRegex, " ");
                lastChild.nodeValue = value;
              }
            }
            var _nodeName = node.nodeName;
            if (_nodeName) nodeName = _nodeName.toLowerCase();
            el.appendChild(node);
          }
        }
      };
    }
  });

  // node_modules/nanohtml/lib/svg-tags.js
  var require_svg_tags = __commonJS({
    "node_modules/nanohtml/lib/svg-tags.js"(exports2, module2) {
      "use strict";
      module2.exports = [
        "svg",
        "altGlyph",
        "altGlyphDef",
        "altGlyphItem",
        "animate",
        "animateColor",
        "animateMotion",
        "animateTransform",
        "circle",
        "clipPath",
        "color-profile",
        "cursor",
        "defs",
        "desc",
        "ellipse",
        "feBlend",
        "feColorMatrix",
        "feComponentTransfer",
        "feComposite",
        "feConvolveMatrix",
        "feDiffuseLighting",
        "feDisplacementMap",
        "feDistantLight",
        "feFlood",
        "feFuncA",
        "feFuncB",
        "feFuncG",
        "feFuncR",
        "feGaussianBlur",
        "feImage",
        "feMerge",
        "feMergeNode",
        "feMorphology",
        "feOffset",
        "fePointLight",
        "feSpecularLighting",
        "feSpotLight",
        "feTile",
        "feTurbulence",
        "filter",
        "font",
        "font-face",
        "font-face-format",
        "font-face-name",
        "font-face-src",
        "font-face-uri",
        "foreignObject",
        "g",
        "glyph",
        "glyphRef",
        "hkern",
        "image",
        "line",
        "linearGradient",
        "marker",
        "mask",
        "metadata",
        "missing-glyph",
        "mpath",
        "path",
        "pattern",
        "polygon",
        "polyline",
        "radialGradient",
        "rect",
        "set",
        "stop",
        "switch",
        "symbol",
        "text",
        "textPath",
        "title",
        "tref",
        "tspan",
        "use",
        "view",
        "vkern"
      ];
    }
  });

  // node_modules/nanohtml/lib/bool-props.js
  var require_bool_props = __commonJS({
    "node_modules/nanohtml/lib/bool-props.js"(exports2, module2) {
      "use strict";
      module2.exports = [
        "async",
        "autofocus",
        "autoplay",
        "checked",
        "controls",
        "default",
        "defaultchecked",
        "defer",
        "disabled",
        "formnovalidate",
        "hidden",
        "ismap",
        "loop",
        "multiple",
        "muted",
        "novalidate",
        "open",
        "playsinline",
        "readonly",
        "required",
        "reversed",
        "selected"
      ];
    }
  });

  // node_modules/nanohtml/lib/direct-props.js
  var require_direct_props = __commonJS({
    "node_modules/nanohtml/lib/direct-props.js"(exports2, module2) {
      "use strict";
      module2.exports = [
        "indeterminate"
      ];
    }
  });

  // node_modules/nanohtml/lib/dom.js
  var require_dom = __commonJS({
    "node_modules/nanohtml/lib/dom.js"(exports2, module2) {
      "use strict";
      var hyperx = require_hyperx();
      var appendChild = require_append_child();
      var SVG_TAGS = require_svg_tags();
      var BOOL_PROPS = require_bool_props();
      var DIRECT_PROPS = require_direct_props();
      var SVGNS = "http://www.w3.org/2000/svg";
      var XLINKNS = "http://www.w3.org/1999/xlink";
      var COMMENT_TAG = "!--";
      module2.exports = function(document2) {
        function nanoHtmlCreateElement(tag, props, children) {
          var el;
          if (SVG_TAGS.indexOf(tag) !== -1) {
            props.namespace = SVGNS;
          }
          var ns = false;
          if (props.namespace) {
            ns = props.namespace;
            delete props.namespace;
          }
          var isCustomElement = false;
          if (props.is) {
            isCustomElement = props.is;
            delete props.is;
          }
          if (ns) {
            if (isCustomElement) {
              el = document2.createElementNS(ns, tag, { is: isCustomElement });
            } else {
              el = document2.createElementNS(ns, tag);
            }
          } else if (tag === COMMENT_TAG) {
            return document2.createComment(props.comment);
          } else if (isCustomElement) {
            el = document2.createElement(tag, { is: isCustomElement });
          } else {
            el = document2.createElement(tag);
          }
          for (var p in props) {
            if (props.hasOwnProperty(p)) {
              var key = p.toLowerCase();
              var val = props[p];
              if (key === "classname") {
                key = "class";
                p = "class";
              }
              if (p === "htmlFor") {
                p = "for";
              }
              if (BOOL_PROPS.indexOf(key) !== -1) {
                if (String(val) === "true") val = key;
                else if (String(val) === "false") continue;
              }
              if (key.slice(0, 2) === "on" || DIRECT_PROPS.indexOf(key) !== -1) {
                el[p] = val;
              } else {
                if (ns) {
                  if (p === "xlink:href") {
                    el.setAttributeNS(XLINKNS, p, val);
                  } else if (/^xmlns($|:)/i.test(p)) {
                  } else {
                    el.setAttributeNS(null, p, val);
                  }
                } else {
                  el.setAttribute(p, val);
                }
              }
            }
          }
          appendChild(el, children);
          return el;
        }
        function createFragment(nodes) {
          var fragment = document2.createDocumentFragment();
          for (var i = 0; i < nodes.length; i++) {
            if (nodes[i] == null) continue;
            if (Array.isArray(nodes[i])) {
              fragment.appendChild(createFragment(nodes[i]));
            } else {
              if (typeof nodes[i] === "string") nodes[i] = document2.createTextNode(nodes[i]);
              fragment.appendChild(nodes[i]);
            }
          }
          return fragment;
        }
        var exports3 = hyperx(nanoHtmlCreateElement, {
          comments: true,
          createFragment
        });
        exports3.default = exports3;
        exports3.createComment = nanoHtmlCreateElement;
        return exports3;
      };
    }
  });

  // node_modules/nanohtml/lib/browser.js
  var require_browser = __commonJS({
    "node_modules/nanohtml/lib/browser.js"(exports2, module2) {
      module2.exports = require_dom()(document);
    }
  });

  // node_modules/nanohtml/lib/raw-browser.js
  var require_raw_browser = __commonJS({
    "node_modules/nanohtml/lib/raw-browser.js"(exports2, module2) {
      "use strict";
      function nanohtmlRawBrowser(tag) {
        var el = document.createElement("div");
        el.innerHTML = tag;
        return toArray(el.childNodes);
      }
      function toArray(arr) {
        return Array.isArray(arr) ? arr : [].slice.call(arr);
      }
      module2.exports = nanohtmlRawBrowser;
    }
  });

  // shared/js/ui/templates/shared/toggle-button.js
  var require_toggle_button = __commonJS({
    "shared/js/ui/templates/shared/toggle-button.js"(exports2, module2) {
      "use strict";
      var bel2 = require_browser();
      module2.exports = function(isActiveBoolean, klass, dataKey) {
        klass = klass || "";
        dataKey = dataKey || "";
        return bel2`
<button class="toggle-button toggle-button--is-active-${isActiveBoolean} ${klass}"
    data-key="${dataKey}"
    type="button"
    aria-pressed="${isActiveBoolean ? "true" : "false"}"
    >
    <div class="toggle-button__bg">
    </div>
    <div class="toggle-button__knob"></div>
</button>`;
      };
    }
  });

  // shared/js/ui/templates/privacy-options.js
  var require_privacy_options3 = __commonJS({
    "shared/js/ui/templates/privacy-options.js"(exports2, module2) {
      "use strict";
      var bel2 = require_browser();
      var raw = require_raw_browser();
      var toggleButton = require_toggle_button();
      var t2 = window.DDG.base.i18n.t;
      module2.exports = function() {
        return bel2`<section class="options-content__privacy divider-bottom">
    <h2 class="menu-title">${t2("shared:options.title")}</h2>
    <ul class="default-list">
        <li>
            ${t2("options:showEmbeddedTweets.title")}
            ${toggleButton(
          this.model.embeddedTweetsEnabled,
          "js-options-embedded-tweets-enabled",
          "embeddedTweetsEnabled"
        )}
        </li>
        <li class="options-content__gpc-enabled">
            <h2 class="menu-title">${t2("options:globalPrivacyControlAbbr.title")}</h2>
            <p class="menu-paragraph">
                ${t2("options:globalPrivacyControlDesc.title")}
            </p>
            <ul>
                <li>
                    ${t2("options:notSellYourPersonalData.title")}
                </li>
                <li>
                    ${t2("options:limitSharingOfPersonalData.title")}
                </li>
            </ul>
            ${t2("options:globalPrivacyControlAbbr.title")}
            ${toggleButton(
          this.model.GPC,
          "js-options-gpc-enabled",
          "GPC"
        )}
            <p class="gpc-disclaimer">
                ${raw(t2("options:globalPrivacyControlDisclaimer.title"))}
            </p>
            <p class="options-info">
                <a href="https://duckduckgo.com/global-privacy-control-learn-more">${t2("shared:learnMore.title")}</a>
            </p>
        </li>
    </ul>
    <ul class="default-list${this.model.youtubeClickToLoadEnabled ? "" : " is-hidden"}">
        <li>
            <h2 class="menu-title">
                ${t2("options:enableYoutubePreviews.title")}
                ${toggleButton(this.model.youtubePreviewsEnabled, "js-options-youtube-previews-enabled", "youtubePreviewsEnabled")}
            </h2>
            <p class="menu-paragraph">
                ${raw(t2("options:enableYoutubePreviewsDesc.title"))}
                <a href="https://help.duckduckgo.com/duckduckgo-help-pages/privacy/embedded-content-protection/">${t2("shared:learnMore.title")}</a>
            </p>
        </li>
    </ul>
    <ul class="default-list${this.model.fireButtonEnabled ? "" : " is-hidden"}">
        <li>
            <h2 class="menu-title fire-title">
                ${t2("options:fireButtonHeading.title")}
            </h2>
            <p class="menu-paragraph">
                ${t2("options:fireButtonDesc.title")}
            </p>
            <p class="options-info">
                <a href="https://help.duckduckgo.com/duckduckgo-help-pages/privacy/web-tracking-protections/#the-fire-button">${t2("shared:learnMore.title")}</a>
            </p>
        </li>
        <li class="fire-button-toggle">
            ${t2("options:fireButtonClearHistoryTitle.title")}
            ${toggleButton(
          this.model.fireButtonClearHistoryEnabled,
          "js-options-firebutton-clear-history-enabled",
          "fireButtonClearHistoryEnabled"
        )}
        </li>
        <li>
            <p class="menu-paragraph">${t2("options:fireButtonClearHistoryDesc.title")}</p>
        </li>
        <li class="fire-button-toggle">
            ${t2("options:fireButtonTabClosureTitle.title")}
            ${toggleButton(
          this.model.fireButtonTabClearEnabled,
          "js-options-firebutton-tabclear-enabled",
          "fireButtonTabClearEnabled"
        )}
        </li>
    </ul>
</section>`;
      };
    }
  });

  // shared/js/ui/templates/allowlist-items.js
  var require_allowlist_items = __commonJS({
    "shared/js/ui/templates/allowlist-items.js"(exports2, module2) {
      "use strict";
      var bel2 = require_browser();
      var t2 = window.DDG.base.i18n.t;
      module2.exports = function(list) {
        if (list.length > 0) {
          let i = 0;
          return bel2`${list.map((dom) => bel2`
<li class="js-allowlist-list-item">
    <a class="link-secondary" href="https://${dom}">${dom}</a>
    <button class="remove pull-right js-allowlist-remove" data-item="${i++}">×</button>
</li>`)}`;
        }
        return bel2`<li>${t2("options:noUnprotectedSitesAdded.title")}</li>`;
      };
    }
  });

  // shared/js/ui/views/allowlist.js
  var require_allowlist = __commonJS({
    "shared/js/ui/views/allowlist.js"(exports2, module2) {
      "use strict";
      var Parent2 = window.DDG.base.View;
      var isHiddenClass = "is-hidden";
      var isDisabledClass = "is-disabled";
      var isInvalidInputClass = "is-invalid-input";
      var allowlistItemsTemplate = require_allowlist_items();
      function Allowlist(ops) {
        this.model = ops.model;
        this.pageView = ops.pageView;
        this.template = ops.template;
        Parent2.call(this, ops);
        this.setup();
      }
      Allowlist.prototype = window.$.extend(
        {},
        Parent2.prototype,
        {
          _removeItem: function(e) {
            const itemIndex = window.$(e.target).data("item");
            this.model.removeDomain(itemIndex);
            this._renderList();
          },
          _addItem: function(e) {
            if (!this.$add.hasClass(isDisabledClass)) {
              const url = this.$url.val();
              let isValidInput = false;
              if (url) {
                isValidInput = this.model.addDomain(url);
              }
              if (isValidInput) {
                this.rerender();
              } else {
                this._showErrorMessage();
              }
            }
          },
          _showErrorMessage: function() {
            this.$add.addClass(isHiddenClass);
            this.$error.removeClass(isHiddenClass);
            this.$url.addClass(isInvalidInputClass);
          },
          _hideErrorMessage: function() {
            this.$add.removeClass(isHiddenClass);
            this.$error.addClass(isHiddenClass);
            this.$url.removeClass(isInvalidInputClass);
          },
          _manageInputChange: function(e) {
            const isButtonDisabled = this.$add.hasClass(isDisabledClass);
            this._hideErrorMessage();
            if (this.$url.val() && isButtonDisabled) {
              this.$add.removeClass(isDisabledClass);
            } else if (!this.$url.val()) {
              this.$add.addClass(isDisabledClass);
            }
            if (!isButtonDisabled && e.key === "Enter") {
              this._addItem();
            }
          },
          _showAddToAllowlistInput: function(e) {
            this.$url.removeClass(isHiddenClass);
            this.$url.focus();
            this.$add.removeClass(isHiddenClass);
            this.$showadd.addClass(isHiddenClass);
            e.preventDefault();
          },
          setup: function() {
            this._cacheElems(".js-allowlist", [
              "remove",
              "add",
              "error",
              "show-add",
              "container",
              "list-item",
              "url"
            ]);
            this.bindEvents([
              [this.$remove, "click", this._removeItem],
              [this.$add, "click", this._addItem],
              [this.$showadd, "click", this._showAddToAllowlistInput],
              [this.$url, "keyup", this._manageInputChange],
              // listen to changes to the allowlist model
              [this.store.subscribe, "change:allowlist", this.rerender]
            ]);
          },
          rerender: function() {
            this.unbindEvents();
            this._rerender();
            this.setup();
          },
          _renderList: function() {
            this.unbindEvents();
            this.$container.html(allowlistItemsTemplate(this.model.list));
            this.setup();
          }
        }
      );
      module2.exports = Allowlist;
    }
  });

  // node_modules/tldts/dist/cjs/index.js
  var require_cjs = __commonJS({
    "node_modules/tldts/dist/cjs/index.js"(exports2) {
      "use strict";
      function shareSameDomainSuffix(hostname, vhost) {
        if (hostname.endsWith(vhost)) {
          return hostname.length === vhost.length || hostname[hostname.length - vhost.length - 1] === ".";
        }
        return false;
      }
      function extractDomainWithSuffix(hostname, publicSuffix) {
        const publicSuffixIndex = hostname.length - publicSuffix.length - 2;
        const lastDotBeforeSuffixIndex = hostname.lastIndexOf(".", publicSuffixIndex);
        if (lastDotBeforeSuffixIndex === -1) {
          return hostname;
        }
        return hostname.slice(lastDotBeforeSuffixIndex + 1);
      }
      function getDomain$1(suffix, hostname, options) {
        if (options.validHosts !== null) {
          const validHosts = options.validHosts;
          for (const vhost of validHosts) {
            if (
              /*@__INLINE__*/
              shareSameDomainSuffix(hostname, vhost)
            ) {
              return vhost;
            }
          }
        }
        let numberOfLeadingDots = 0;
        if (hostname.startsWith(".")) {
          while (numberOfLeadingDots < hostname.length && hostname[numberOfLeadingDots] === ".") {
            numberOfLeadingDots += 1;
          }
        }
        if (suffix.length === hostname.length - numberOfLeadingDots) {
          return null;
        }
        return (
          /*@__INLINE__*/
          extractDomainWithSuffix(hostname, suffix)
        );
      }
      function getDomainWithoutSuffix$1(domain, suffix) {
        return domain.slice(0, -suffix.length - 1);
      }
      function extractHostname(url, urlIsValidHostname) {
        let start = 0;
        let end = url.length;
        let hasUpper = false;
        if (!urlIsValidHostname) {
          if (url.startsWith("data:")) {
            return null;
          }
          while (start < url.length && url.charCodeAt(start) <= 32) {
            start += 1;
          }
          while (end > start + 1 && url.charCodeAt(end - 1) <= 32) {
            end -= 1;
          }
          if (url.charCodeAt(start) === 47 && url.charCodeAt(start + 1) === 47) {
            start += 2;
          } else {
            const indexOfProtocol = url.indexOf(":/", start);
            if (indexOfProtocol !== -1) {
              const protocolSize = indexOfProtocol - start;
              const c0 = url.charCodeAt(start);
              const c1 = url.charCodeAt(start + 1);
              const c2 = url.charCodeAt(start + 2);
              const c3 = url.charCodeAt(start + 3);
              const c4 = url.charCodeAt(start + 4);
              if (protocolSize === 5 && c0 === 104 && c1 === 116 && c2 === 116 && c3 === 112 && c4 === 115) ;
              else if (protocolSize === 4 && c0 === 104 && c1 === 116 && c2 === 116 && c3 === 112) ;
              else if (protocolSize === 3 && c0 === 119 && c1 === 115 && c2 === 115) ;
              else if (protocolSize === 2 && c0 === 119 && c1 === 115) ;
              else {
                for (let i = start; i < indexOfProtocol; i += 1) {
                  const lowerCaseCode = url.charCodeAt(i) | 32;
                  if (!(lowerCaseCode >= 97 && lowerCaseCode <= 122 || // [a, z]
                  lowerCaseCode >= 48 && lowerCaseCode <= 57 || // [0, 9]
                  lowerCaseCode === 46 || // '.'
                  lowerCaseCode === 45 || // '-'
                  lowerCaseCode === 43)) {
                    return null;
                  }
                }
              }
              start = indexOfProtocol + 2;
              while (url.charCodeAt(start) === 47) {
                start += 1;
              }
            }
          }
          let indexOfIdentifier = -1;
          let indexOfClosingBracket = -1;
          let indexOfPort = -1;
          for (let i = start; i < end; i += 1) {
            const code = url.charCodeAt(i);
            if (code === 35 || // '#'
            code === 47 || // '/'
            code === 63) {
              end = i;
              break;
            } else if (code === 64) {
              indexOfIdentifier = i;
            } else if (code === 93) {
              indexOfClosingBracket = i;
            } else if (code === 58) {
              indexOfPort = i;
            } else if (code >= 65 && code <= 90) {
              hasUpper = true;
            }
          }
          if (indexOfIdentifier !== -1 && indexOfIdentifier > start && indexOfIdentifier < end) {
            start = indexOfIdentifier + 1;
          }
          if (url.charCodeAt(start) === 91) {
            if (indexOfClosingBracket !== -1) {
              return url.slice(start + 1, indexOfClosingBracket).toLowerCase();
            }
            return null;
          } else if (indexOfPort !== -1 && indexOfPort > start && indexOfPort < end) {
            end = indexOfPort;
          }
        }
        while (end > start + 1 && url.charCodeAt(end - 1) === 46) {
          end -= 1;
        }
        const hostname = start !== 0 || end !== url.length ? url.slice(start, end) : url;
        if (hasUpper) {
          return hostname.toLowerCase();
        }
        return hostname;
      }
      function isProbablyIpv4(hostname) {
        if (hostname.length < 7) {
          return false;
        }
        if (hostname.length > 15) {
          return false;
        }
        let numberOfDots = 0;
        for (let i = 0; i < hostname.length; i += 1) {
          const code = hostname.charCodeAt(i);
          if (code === 46) {
            numberOfDots += 1;
          } else if (code < 48 || code > 57) {
            return false;
          }
        }
        return numberOfDots === 3 && hostname.charCodeAt(0) !== 46 && hostname.charCodeAt(hostname.length - 1) !== 46;
      }
      function isProbablyIpv6(hostname) {
        if (hostname.length < 3) {
          return false;
        }
        let start = hostname.startsWith("[") ? 1 : 0;
        let end = hostname.length;
        if (hostname[end - 1] === "]") {
          end -= 1;
        }
        if (end - start > 39) {
          return false;
        }
        let hasColon = false;
        for (; start < end; start += 1) {
          const code = hostname.charCodeAt(start);
          if (code === 58) {
            hasColon = true;
          } else if (!(code >= 48 && code <= 57 || // 0-9
          code >= 97 && code <= 102 || // a-f
          code >= 65 && code <= 90)) {
            return false;
          }
        }
        return hasColon;
      }
      function isIp(hostname) {
        return isProbablyIpv6(hostname) || isProbablyIpv4(hostname);
      }
      function isValidAscii(code) {
        return code >= 97 && code <= 122 || code >= 48 && code <= 57 || code > 127;
      }
      function isValidHostname(hostname) {
        if (hostname.length > 255) {
          return false;
        }
        if (hostname.length === 0) {
          return false;
        }
        if (
          /*@__INLINE__*/
          !isValidAscii(hostname.charCodeAt(0)) && hostname.charCodeAt(0) !== 46 && // '.' (dot)
          hostname.charCodeAt(0) !== 95
        ) {
          return false;
        }
        let lastDotIndex = -1;
        let lastCharCode = -1;
        const len = hostname.length;
        for (let i = 0; i < len; i += 1) {
          const code = hostname.charCodeAt(i);
          if (code === 46) {
            if (
              // Check that previous label is < 63 bytes long (64 = 63 + '.')
              i - lastDotIndex > 64 || // Check that previous character was not already a '.'
              lastCharCode === 46 || // Check that the previous label does not end with a '-' (dash)
              lastCharCode === 45 || // Check that the previous label does not end with a '_' (underscore)
              lastCharCode === 95
            ) {
              return false;
            }
            lastDotIndex = i;
          } else if (!/*@__INLINE__*/
          (isValidAscii(code) || code === 45 || code === 95)) {
            return false;
          }
          lastCharCode = code;
        }
        return (
          // Check that last label is shorter than 63 chars
          len - lastDotIndex - 1 <= 63 && // Check that the last character is an allowed trailing label character.
          // Since we already checked that the char is a valid hostname character,
          // we only need to check that it's different from '-'.
          lastCharCode !== 45
        );
      }
      function setDefaultsImpl({ allowIcannDomains = true, allowPrivateDomains = false, detectIp = true, extractHostname: extractHostname2 = true, mixedInputs = true, validHosts = null, validateHostname = true }) {
        return {
          allowIcannDomains,
          allowPrivateDomains,
          detectIp,
          extractHostname: extractHostname2,
          mixedInputs,
          validHosts,
          validateHostname
        };
      }
      var DEFAULT_OPTIONS = (
        /*@__INLINE__*/
        setDefaultsImpl({})
      );
      function setDefaults(options) {
        if (options === void 0) {
          return DEFAULT_OPTIONS;
        }
        return (
          /*@__INLINE__*/
          setDefaultsImpl(options)
        );
      }
      function getSubdomain$1(hostname, domain) {
        if (domain.length === hostname.length) {
          return "";
        }
        return hostname.slice(0, -domain.length - 1);
      }
      function getEmptyResult() {
        return {
          domain: null,
          domainWithoutSuffix: null,
          hostname: null,
          isIcann: null,
          isIp: null,
          isPrivate: null,
          publicSuffix: null,
          subdomain: null
        };
      }
      function resetResult(result) {
        result.domain = null;
        result.domainWithoutSuffix = null;
        result.hostname = null;
        result.isIcann = null;
        result.isIp = null;
        result.isPrivate = null;
        result.publicSuffix = null;
        result.subdomain = null;
      }
      function parseImpl(url, step, suffixLookup2, partialOptions, result) {
        const options = (
          /*@__INLINE__*/
          setDefaults(partialOptions)
        );
        if (typeof url !== "string") {
          return result;
        }
        if (!options.extractHostname) {
          result.hostname = url;
        } else if (options.mixedInputs) {
          result.hostname = extractHostname(url, isValidHostname(url));
        } else {
          result.hostname = extractHostname(url, false);
        }
        if (step === 0 || result.hostname === null) {
          return result;
        }
        if (options.detectIp) {
          result.isIp = isIp(result.hostname);
          if (result.isIp) {
            return result;
          }
        }
        if (options.validateHostname && options.extractHostname && !isValidHostname(result.hostname)) {
          result.hostname = null;
          return result;
        }
        suffixLookup2(result.hostname, options, result);
        if (step === 2 || result.publicSuffix === null) {
          return result;
        }
        result.domain = getDomain$1(result.publicSuffix, result.hostname, options);
        if (step === 3 || result.domain === null) {
          return result;
        }
        result.subdomain = getSubdomain$1(result.hostname, result.domain);
        if (step === 4) {
          return result;
        }
        result.domainWithoutSuffix = getDomainWithoutSuffix$1(result.domain, result.publicSuffix);
        return result;
      }
      function fastPathLookup(hostname, options, out) {
        if (!options.allowPrivateDomains && hostname.length > 3) {
          const last = hostname.length - 1;
          const c3 = hostname.charCodeAt(last);
          const c2 = hostname.charCodeAt(last - 1);
          const c1 = hostname.charCodeAt(last - 2);
          const c0 = hostname.charCodeAt(last - 3);
          if (c3 === 109 && c2 === 111 && c1 === 99 && c0 === 46) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = "com";
            return true;
          } else if (c3 === 103 && c2 === 114 && c1 === 111 && c0 === 46) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = "org";
            return true;
          } else if (c3 === 117 && c2 === 100 && c1 === 101 && c0 === 46) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = "edu";
            return true;
          } else if (c3 === 118 && c2 === 111 && c1 === 103 && c0 === 46) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = "gov";
            return true;
          } else if (c3 === 116 && c2 === 101 && c1 === 110 && c0 === 46) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = "net";
            return true;
          } else if (c3 === 101 && c2 === 100 && c1 === 46) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = "de";
            return true;
          }
        }
        return false;
      }
      var exceptions = /* @__PURE__ */ function() {
        const _0 = [1, {}], _1 = [0, { "city": _0 }];
        const exceptions2 = [0, { "ck": [0, { "www": _0 }], "jp": [0, { "kawasaki": _1, "kitakyushu": _1, "kobe": _1, "nagoya": _1, "sapporo": _1, "sendai": _1, "yokohama": _1 }] }];
        return exceptions2;
      }();
      var rules = /* @__PURE__ */ function() {
        const _2 = [1, {}], _3 = [2, {}], _4 = [1, { "gov": _2, "com": _2, "org": _2, "net": _2, "edu": _2 }], _5 = [0, { "*": _3 }], _6 = [0, { "relay": _3 }], _7 = [2, { "staging": _3 }], _8 = [2, { "id": _3 }], _9 = [1, { "blogspot": _3 }], _10 = [1, { "gov": _2 }], _11 = [0, { "notebook": _3, "studio": _3 }], _12 = [0, { "labeling": _3, "notebook": _3, "studio": _3 }], _13 = [0, { "notebook": _3 }], _14 = [0, { "labeling": _3, "notebook": _3, "notebook-fips": _3, "studio": _3 }], _15 = [0, { "notebook": _3, "notebook-fips": _3, "studio": _3, "studio-fips": _3 }], _16 = [0, { "*": _2 }], _17 = [0, { "cloud": _3 }], _18 = [1, { "co": _3 }], _19 = [0, { "objects": _3 }], _20 = [2, { "nodes": _3 }], _21 = [0, { "my": _5 }], _22 = [0, { "s3": _3, "s3-accesspoint": _3, "s3-website": _3 }], _23 = [0, { "s3": _3, "s3-accesspoint": _3 }], _24 = [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _23, "s3": _3, "s3-accesspoint": _3, "s3-object-lambda": _3, "s3-website": _3 }], _25 = [0, { "direct": _3 }], _26 = [0, { "webview-assets": _3 }], _27 = [0, { "vfs": _3, "webview-assets": _3 }], _28 = [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _22, "s3": _3, "s3-accesspoint": _3, "s3-object-lambda": _3, "s3-website": _3, "aws-cloud9": _26, "cloud9": _27 }], _29 = [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _23, "s3": _3, "s3-accesspoint": _3, "s3-object-lambda": _3, "s3-website": _3, "aws-cloud9": _26, "cloud9": _27 }], _30 = [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _22, "s3": _3, "s3-accesspoint": _3, "s3-object-lambda": _3, "s3-website": _3, "analytics-gateway": _3, "aws-cloud9": _26, "cloud9": _27 }], _31 = [0, { "s3": _3, "s3-accesspoint": _3, "s3-accesspoint-fips": _3, "s3-fips": _3, "s3-website": _3 }], _32 = [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _31, "s3": _3, "s3-accesspoint": _3, "s3-accesspoint-fips": _3, "s3-fips": _3, "s3-object-lambda": _3, "s3-website": _3, "aws-cloud9": _26, "cloud9": _27 }], _33 = [0, { "s3": _3, "s3-accesspoint": _3, "s3-accesspoint-fips": _3, "s3-fips": _3 }], _34 = [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _33, "s3": _3, "s3-accesspoint": _3, "s3-accesspoint-fips": _3, "s3-fips": _3, "s3-object-lambda": _3, "s3-website": _3 }], _35 = [0, { "auth": _3 }], _36 = [0, { "auth": _3, "auth-fips": _3 }], _37 = [0, { "apps": _3 }], _38 = [0, { "paas": _3 }], _39 = [2, { "eu": _3 }], _40 = [0, { "app": _3 }], _41 = [0, { "site": _3 }], _42 = [0, { "pages": _3 }], _43 = [1, { "com": _2, "edu": _2, "net": _2, "org": _2 }], _44 = [0, { "j": _3 }], _45 = [0, { "jelastic": _3 }], _46 = [0, { "user": _3 }], _47 = [1, { "ybo": _3 }], _48 = [0, { "shop": _3 }], _49 = [0, { "cust": _3, "reservd": _3 }], _50 = [0, { "cust": _3 }], _51 = [1, { "gov": _2, "edu": _2, "mil": _2, "com": _2, "org": _2, "net": _2 }], _52 = [0, { "s3": _3 }], _53 = [1, { "edu": _2, "biz": _2, "net": _2, "org": _2, "gov": _2, "info": _2, "com": _2 }], _54 = [1, { "gov": _2, "blogspot": _3 }], _55 = [1, { "framer": _3 }], _56 = [0, { "forgot": _3 }], _57 = [0, { "cdn": _3 }], _58 = [1, { "gs": _2 }], _59 = [0, { "nes": _2 }], _60 = [1, { "k12": _2, "cc": _2, "lib": _2 }], _61 = [1, { "cc": _2, "lib": _2 }];
        const rules2 = [0, { "ac": [1, { "com": _2, "edu": _2, "gov": _2, "net": _2, "mil": _2, "org": _2, "drr": _3, "feedback": _3, "forms": _3 }], "ad": [1, { "nom": _2 }], "ae": [1, { "co": _2, "net": _2, "org": _2, "sch": _2, "ac": _2, "gov": _2, "mil": _2, "blogspot": _3 }], "aero": [1, { "accident-investigation": _2, "accident-prevention": _2, "aerobatic": _2, "aeroclub": _2, "aerodrome": _2, "agents": _2, "aircraft": _2, "airline": _2, "airport": _2, "air-surveillance": _2, "airtraffic": _2, "air-traffic-control": _2, "ambulance": _2, "amusement": _2, "association": _2, "author": _2, "ballooning": _2, "broker": _2, "caa": _2, "cargo": _2, "catering": _2, "certification": _2, "championship": _2, "charter": _2, "civilaviation": _2, "club": _2, "conference": _2, "consultant": _2, "consulting": _2, "control": _2, "council": _2, "crew": _2, "design": _2, "dgca": _2, "educator": _2, "emergency": _2, "engine": _2, "engineer": _2, "entertainment": _2, "equipment": _2, "exchange": _2, "express": _2, "federation": _2, "flight": _2, "fuel": _2, "gliding": _2, "government": _2, "groundhandling": _2, "group": _2, "hanggliding": _2, "homebuilt": _2, "insurance": _2, "journal": _2, "journalist": _2, "leasing": _2, "logistics": _2, "magazine": _2, "maintenance": _2, "media": _2, "microlight": _2, "modelling": _2, "navigation": _2, "parachuting": _2, "paragliding": _2, "passenger-association": _2, "pilot": _2, "press": _2, "production": _2, "recreation": _2, "repbody": _2, "res": _2, "research": _2, "rotorcraft": _2, "safety": _2, "scientist": _2, "services": _2, "show": _2, "skydiving": _2, "software": _2, "student": _2, "trader": _2, "trading": _2, "trainer": _2, "union": _2, "workinggroup": _2, "works": _2 }], "af": _4, "ag": [1, { "com": _2, "org": _2, "net": _2, "co": _2, "nom": _2 }], "ai": [1, { "off": _2, "com": _2, "net": _2, "org": _2, "uwu": _3, "framer": _3 }], "al": [1, { "com": _2, "edu": _2, "gov": _2, "mil": _2, "net": _2, "org": _2, "blogspot": _3 }], "am": [1, { "co": _2, "com": _2, "commune": _2, "net": _2, "org": _2, "radio": _3, "blogspot": _3 }], "ao": [1, { "ed": _2, "gv": _2, "og": _2, "co": _2, "pb": _2, "it": _2 }], "aq": _2, "ar": [1, { "bet": _2, "com": _9, "coop": _2, "edu": _2, "gob": _2, "gov": _2, "int": _2, "mil": _2, "musica": _2, "mutual": _2, "net": _2, "org": _2, "senasa": _2, "tur": _2 }], "arpa": [1, { "e164": _2, "in-addr": _2, "ip6": _2, "iris": _2, "uri": _2, "urn": _2 }], "as": _10, "asia": [1, { "cloudns": _3, "daemon": _3, "dix": _3 }], "at": [1, { "ac": [1, { "sth": _2 }], "co": _9, "gv": _2, "or": _2, "funkfeuer": [0, { "wien": _3 }], "futurecms": [0, { "*": _3, "ex": _5, "in": _5 }], "futurehosting": _3, "futuremailing": _3, "ortsinfo": [0, { "ex": _5, "kunden": _5 }], "biz": _3, "info": _3, "123webseite": _3, "priv": _3, "myspreadshop": _3, "12hp": _3, "2ix": _3, "4lima": _3, "lima-city": _3 }], "au": [1, { "com": [1, { "blogspot": _3, "cloudlets": [0, { "mel": _3 }], "myspreadshop": _3 }], "net": _2, "org": _2, "edu": [1, { "act": _2, "catholic": _2, "nsw": [1, { "schools": _2 }], "nt": _2, "qld": _2, "sa": _2, "tas": _2, "vic": _2, "wa": _2 }], "gov": [1, { "qld": _2, "sa": _2, "tas": _2, "vic": _2, "wa": _2 }], "asn": _2, "id": _2, "info": _2, "conf": _2, "oz": _2, "act": _2, "nsw": _2, "nt": _2, "qld": _2, "sa": _2, "tas": _2, "vic": _2, "wa": _2 }], "aw": [1, { "com": _2 }], "ax": _2, "az": [1, { "com": _2, "net": _2, "int": _2, "gov": _2, "org": _2, "edu": _2, "info": _2, "pp": _2, "mil": _2, "name": _2, "pro": _2, "biz": _2 }], "ba": [1, { "com": _2, "edu": _2, "gov": _2, "mil": _2, "net": _2, "org": _2, "rs": _3, "blogspot": _3 }], "bb": [1, { "biz": _2, "co": _2, "com": _2, "edu": _2, "gov": _2, "info": _2, "net": _2, "org": _2, "store": _2, "tv": _2 }], "bd": _16, "be": [1, { "ac": _2, "cloudns": _3, "webhosting": _3, "blogspot": _3, "interhostsolutions": _17, "kuleuven": [0, { "ezproxy": _3 }], "123website": _3, "myspreadshop": _3, "transurl": _5 }], "bf": _10, "bg": [1, { "0": _2, "1": _2, "2": _2, "3": _2, "4": _2, "5": _2, "6": _2, "7": _2, "8": _2, "9": _2, "a": _2, "b": _2, "c": _2, "d": _2, "e": _2, "f": _2, "g": _2, "h": _2, "i": _2, "j": _2, "k": _2, "l": _2, "m": _2, "n": _2, "o": _2, "p": _2, "q": _2, "r": _2, "s": _2, "t": _2, "u": _2, "v": _2, "w": _2, "x": _2, "y": _2, "z": _2, "blogspot": _3, "barsy": _3 }], "bh": _4, "bi": [1, { "co": _2, "com": _2, "edu": _2, "or": _2, "org": _2 }], "biz": [1, { "activetrail": _3, "cloudns": _3, "jozi": _3, "dyndns": _3, "for-better": _3, "for-more": _3, "for-some": _3, "for-the": _3, "selfip": _3, "webhop": _3, "orx": _3, "mmafan": _3, "myftp": _3, "no-ip": _3, "dscloud": _3 }], "bj": [1, { "africa": _2, "agro": _2, "architectes": _2, "assur": _2, "avocats": _2, "co": _2, "com": _2, "eco": _2, "econo": _2, "edu": _2, "info": _2, "loisirs": _2, "money": _2, "net": _2, "org": _2, "ote": _2, "resto": _2, "restaurant": _2, "tourism": _2, "univ": _2, "blogspot": _3 }], "bm": _4, "bn": [1, { "com": _2, "edu": _2, "gov": _2, "net": _2, "org": _2, "co": _3 }], "bo": [1, { "com": _2, "edu": _2, "gob": _2, "int": _2, "org": _2, "net": _2, "mil": _2, "tv": _2, "web": _2, "academia": _2, "agro": _2, "arte": _2, "blog": _2, "bolivia": _2, "ciencia": _2, "cooperativa": _2, "democracia": _2, "deporte": _2, "ecologia": _2, "economia": _2, "empresa": _2, "indigena": _2, "industria": _2, "info": _2, "medicina": _2, "movimiento": _2, "musica": _2, "natural": _2, "nombre": _2, "noticias": _2, "patria": _2, "politica": _2, "profesional": _2, "plurinacional": _2, "pueblo": _2, "revista": _2, "salud": _2, "tecnologia": _2, "tksat": _2, "transporte": _2, "wiki": _2 }], "br": [1, { "9guacu": _2, "abc": _2, "adm": _2, "adv": _2, "agr": _2, "aju": _2, "am": _2, "anani": _2, "aparecida": _2, "app": _2, "arq": _2, "art": _2, "ato": _2, "b": _2, "barueri": _2, "belem": _2, "bhz": _2, "bib": _2, "bio": _2, "blog": _2, "bmd": _2, "boavista": _2, "bsb": _2, "campinagrande": _2, "campinas": _2, "caxias": _2, "cim": _2, "cng": _2, "cnt": _2, "com": [1, { "blogspot": _3, "simplesite": _3 }], "contagem": _2, "coop": _2, "coz": _2, "cri": _2, "cuiaba": _2, "curitiba": _2, "def": _2, "des": _2, "det": _2, "dev": _2, "ecn": _2, "eco": _2, "edu": _2, "emp": _2, "enf": _2, "eng": _2, "esp": _2, "etc": _2, "eti": _2, "far": _2, "feira": _2, "flog": _2, "floripa": _2, "fm": _2, "fnd": _2, "fortal": _2, "fot": _2, "foz": _2, "fst": _2, "g12": _2, "geo": _2, "ggf": _2, "goiania": _2, "gov": [1, { "ac": _2, "al": _2, "am": _2, "ap": _2, "ba": _2, "ce": _2, "df": _2, "es": _2, "go": _2, "ma": _2, "mg": _2, "ms": _2, "mt": _2, "pa": _2, "pb": _2, "pe": _2, "pi": _2, "pr": _2, "rj": _2, "rn": _2, "ro": _2, "rr": _2, "rs": _2, "sc": _2, "se": _2, "sp": _2, "to": _2 }], "gru": _2, "imb": _2, "ind": _2, "inf": _2, "jab": _2, "jampa": _2, "jdf": _2, "joinville": _2, "jor": _2, "jus": _2, "leg": [1, { "ac": _3, "al": _3, "am": _3, "ap": _3, "ba": _3, "ce": _3, "df": _3, "es": _3, "go": _3, "ma": _3, "mg": _3, "ms": _3, "mt": _3, "pa": _3, "pb": _3, "pe": _3, "pi": _3, "pr": _3, "rj": _3, "rn": _3, "ro": _3, "rr": _3, "rs": _3, "sc": _3, "se": _3, "sp": _3, "to": _3 }], "lel": _2, "log": _2, "londrina": _2, "macapa": _2, "maceio": _2, "manaus": _2, "maringa": _2, "mat": _2, "med": _2, "mil": _2, "morena": _2, "mp": _2, "mus": _2, "natal": _2, "net": _2, "niteroi": _2, "nom": _16, "not": _2, "ntr": _2, "odo": _2, "ong": _2, "org": _2, "osasco": _2, "palmas": _2, "poa": _2, "ppg": _2, "pro": _2, "psc": _2, "psi": _2, "pvh": _2, "qsl": _2, "radio": _2, "rec": _2, "recife": _2, "rep": _2, "ribeirao": _2, "rio": _2, "riobranco": _2, "riopreto": _2, "salvador": _2, "sampa": _2, "santamaria": _2, "santoandre": _2, "saobernardo": _2, "saogonca": _2, "seg": _2, "sjc": _2, "slg": _2, "slz": _2, "sorocaba": _2, "srv": _2, "taxi": _2, "tc": _2, "tec": _2, "teo": _2, "the": _2, "tmp": _2, "trd": _2, "tur": _2, "tv": _2, "udi": _2, "vet": _2, "vix": _2, "vlog": _2, "wiki": _2, "zlg": _2 }], "bs": [1, { "com": _2, "net": _2, "org": _2, "edu": _2, "gov": _2, "we": _3 }], "bt": _4, "bv": _2, "bw": [1, { "co": _2, "org": _2 }], "by": [1, { "gov": _2, "mil": _2, "com": _9, "of": _2, "mycloud": _3, "mediatech": _3 }], "bz": [1, { "com": _2, "net": _2, "org": _2, "edu": _2, "gov": _2, "za": _3, "mydns": _3, "gsj": _3 }], "ca": [1, { "ab": _2, "bc": _2, "mb": _2, "nb": _2, "nf": _2, "nl": _2, "ns": _2, "nt": _2, "nu": _2, "on": _2, "pe": _2, "qc": _2, "sk": _2, "yk": _2, "gc": _2, "barsy": _3, "awdev": _5, "co": _3, "blogspot": _3, "no-ip": _3, "myspreadshop": _3, "box": _3 }], "cat": _2, "cc": [1, { "cleverapps": _3, "cloudns": _3, "ftpaccess": _3, "game-server": _3, "myphotos": _3, "scrapping": _3, "twmail": _3, "csx": _3, "fantasyleague": _3, "spawn": [0, { "instances": _3 }] }], "cd": _10, "cf": _9, "cg": _2, "ch": [1, { "square7": _3, "cloudscale": [0, { "cust": _3, "lpg": _19, "rma": _19 }], "cloudns": _3, "blogspot": _3, "flow": [0, { "ae": [0, { "alp1": _3 }], "appengine": _3 }], "linkyard-cloud": _3, "dnsking": _3, "gotdns": _3, "123website": _3, "myspreadshop": _3, "firenet": [0, { "*": _3, "svc": _5 }], "12hp": _3, "2ix": _3, "4lima": _3, "lima-city": _3 }], "ci": [1, { "org": _2, "or": _2, "com": _2, "co": _2, "edu": _2, "ed": _2, "ac": _2, "net": _2, "go": _2, "asso": _2, "xn--aroport-bya": _2, "a\xE9roport": _2, "int": _2, "presse": _2, "md": _2, "gouv": _2, "fin": _3 }], "ck": _16, "cl": [1, { "co": _2, "gob": _2, "gov": _2, "mil": _2, "cloudns": _3, "blogspot": _3 }], "cm": [1, { "co": _2, "com": _2, "gov": _2, "net": _2 }], "cn": [1, { "ac": _2, "com": [1, { "amazonaws": [0, { "cn-north-1": [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _22, "s3": _3, "s3-accesspoint": _3, "s3-deprecated": _3, "s3-object-lambda": _3, "s3-website": _3 }], "cn-northwest-1": _24, "compute": _5, "airflow": [0, { "cn-north-1": _5, "cn-northwest-1": _5 }], "eb": [0, { "cn-north-1": _3, "cn-northwest-1": _3 }], "elb": _5 }], "sagemaker": [0, { "cn-north-1": _11, "cn-northwest-1": _11 }] }], "edu": _2, "gov": _2, "net": _2, "org": _2, "mil": _2, "xn--55qx5d": _2, "\u516C\u53F8": _2, "xn--io0a7i": _2, "\u7F51\u7EDC": _2, "xn--od0alg": _2, "\u7DB2\u7D61": _2, "ah": _2, "bj": _2, "cq": _2, "fj": _2, "gd": _2, "gs": _2, "gz": _2, "gx": _2, "ha": _2, "hb": _2, "he": _2, "hi": _2, "hl": _2, "hn": _2, "jl": _2, "js": _2, "jx": _2, "ln": _2, "nm": _2, "nx": _2, "qh": _2, "sc": _2, "sd": _2, "sh": [1, { "as": _3 }], "sn": _2, "sx": _2, "tj": _2, "xj": _2, "xz": _2, "yn": _2, "zj": _2, "hk": _2, "mo": _2, "tw": _2, "canva-apps": _3, "canvasite": _21, "instantcloud": _3, "myqnapcloud": _3, "quickconnect": _25 }], "co": [1, { "arts": _2, "com": _9, "edu": _2, "firm": _2, "gov": _2, "info": _2, "int": _2, "mil": _2, "net": _2, "nom": _2, "org": _2, "rec": _2, "web": _2, "carrd": _3, "crd": _3, "otap": _5, "leadpages": _3, "lpages": _3, "mypi": _3, "n4t": _3, "xmit": _5, "firewalledreplit": _8, "repl": _8, "supabase": _3 }], "com": [1, { "a2hosted": _3, "cpserver": _3, "devcdnaccesso": _5, "adobeaemcloud": [2, { "dev": _5 }], "airkitapps": _3, "airkitapps-au": _3, "aivencloud": _3, "kasserver": _3, "amazonaws": [0, { "af-south-1": _28, "ap-east-1": _29, "ap-northeast-1": _30, "ap-northeast-2": _30, "ap-northeast-3": _28, "ap-south-1": _30, "ap-south-2": _24, "ap-southeast-1": _30, "ap-southeast-2": _30, "ap-southeast-3": _24, "ap-southeast-4": _24, "ca-central-1": _32, "ca-west-1": [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _31, "s3": _3, "s3-accesspoint": _3, "s3-accesspoint-fips": _3, "s3-fips": _3, "s3-website": _3 }], "eu-central-1": _30, "eu-central-2": _24, "eu-north-1": _29, "eu-south-1": _28, "eu-south-2": _24, "eu-west-1": [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _22, "s3": _3, "s3-accesspoint": _3, "s3-deprecated": _3, "s3-object-lambda": _3, "s3-website": _3, "analytics-gateway": _3, "aws-cloud9": _26, "cloud9": _27 }], "eu-west-2": _29, "eu-west-3": _28, "il-central-1": [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _23, "s3": _3, "s3-accesspoint": _3, "s3-object-lambda": _3, "s3-website": _3, "aws-cloud9": _26, "cloud9": [0, { "vfs": _3 }] }], "me-central-1": _24, "me-south-1": _29, "sa-east-1": _28, "us-east-1": [2, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _31, "s3": _3, "s3-accesspoint": _3, "s3-accesspoint-fips": _3, "s3-deprecated": _3, "s3-fips": _3, "s3-object-lambda": _3, "s3-website": _3, "analytics-gateway": _3, "aws-cloud9": _26, "cloud9": _27 }], "us-east-2": [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _33, "s3": _3, "s3-accesspoint": _3, "s3-accesspoint-fips": _3, "s3-deprecated": _3, "s3-fips": _3, "s3-object-lambda": _3, "s3-website": _3, "analytics-gateway": _3, "aws-cloud9": _26, "cloud9": _27 }], "us-gov-east-1": _34, "us-gov-west-1": _34, "us-west-1": _32, "us-west-2": [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _31, "s3": _3, "s3-accesspoint": _3, "s3-accesspoint-fips": _3, "s3-deprecated": _3, "s3-fips": _3, "s3-object-lambda": _3, "s3-website": _3, "analytics-gateway": _3, "aws-cloud9": _26, "cloud9": _27 }], "compute": _5, "compute-1": _5, "airflow": [0, { "af-south-1": _5, "ap-east-1": _5, "ap-northeast-1": _5, "ap-northeast-2": _5, "ap-south-1": _5, "ap-southeast-1": _5, "ap-southeast-2": _5, "ca-central-1": _5, "eu-central-1": _5, "eu-north-1": _5, "eu-south-1": _5, "eu-west-1": _5, "eu-west-2": _5, "eu-west-3": _5, "me-south-1": _5, "sa-east-1": _5, "us-east-1": _5, "us-east-2": _5, "us-west-1": _5, "us-west-2": _5 }], "s3": _3, "s3-1": _3, "s3-ap-east-1": _3, "s3-ap-northeast-1": _3, "s3-ap-northeast-2": _3, "s3-ap-northeast-3": _3, "s3-ap-south-1": _3, "s3-ap-southeast-1": _3, "s3-ap-southeast-2": _3, "s3-ca-central-1": _3, "s3-eu-central-1": _3, "s3-eu-north-1": _3, "s3-eu-west-1": _3, "s3-eu-west-2": _3, "s3-eu-west-3": _3, "s3-external-1": _3, "s3-fips-us-gov-east-1": _3, "s3-fips-us-gov-west-1": _3, "s3-global": [0, { "accesspoint": [0, { "mrap": _3 }] }], "s3-me-south-1": _3, "s3-sa-east-1": _3, "s3-us-east-2": _3, "s3-us-gov-east-1": _3, "s3-us-gov-west-1": _3, "s3-us-west-1": _3, "s3-us-west-2": _3, "s3-website-ap-northeast-1": _3, "s3-website-ap-southeast-1": _3, "s3-website-ap-southeast-2": _3, "s3-website-eu-west-1": _3, "s3-website-sa-east-1": _3, "s3-website-us-east-1": _3, "s3-website-us-gov-west-1": _3, "s3-website-us-west-1": _3, "s3-website-us-west-2": _3, "elb": _5 }], "amazoncognito": [0, { "af-south-1": _35, "ap-northeast-1": _35, "ap-northeast-2": _35, "ap-northeast-3": _35, "ap-south-1": _35, "ap-south-2": _35, "ap-southeast-1": _35, "ap-southeast-2": _35, "ap-southeast-3": _35, "ap-southeast-4": _35, "ca-central-1": _35, "eu-central-1": _35, "eu-central-2": _35, "eu-north-1": _35, "eu-south-1": _35, "eu-south-2": _35, "eu-west-1": _35, "eu-west-2": _35, "eu-west-3": _35, "il-central-1": _35, "me-central-1": _35, "me-south-1": _35, "sa-east-1": _35, "us-east-1": _36, "us-east-2": _36, "us-gov-west-1": [0, { "auth-fips": _3 }], "us-west-1": _36, "us-west-2": _36 }], "amplifyapp": _5, "awsapprunner": _5, "awsapps": _3, "elasticbeanstalk": [2, { "af-south-1": _3, "ap-east-1": _3, "ap-northeast-1": _3, "ap-northeast-2": _3, "ap-northeast-3": _3, "ap-south-1": _3, "ap-southeast-1": _3, "ap-southeast-2": _3, "ap-southeast-3": _3, "ca-central-1": _3, "eu-central-1": _3, "eu-north-1": _3, "eu-south-1": _3, "eu-west-1": _3, "eu-west-2": _3, "eu-west-3": _3, "il-central-1": _3, "me-south-1": _3, "sa-east-1": _3, "us-east-1": _3, "us-east-2": _3, "us-gov-east-1": _3, "us-gov-west-1": _3, "us-west-1": _3, "us-west-2": _3 }], "awsglobalaccelerator": _3, "siiites": _3, "appspacehosted": _3, "appspaceusercontent": _3, "on-aptible": _3, "myasustor": _3, "balena-devices": _3, "betainabox": _3, "boutir": _3, "bplaced": _3, "cafjs": _3, "canva-apps": _3, "br": _3, "cn": _3, "de": _3, "eu": _3, "jpn": _3, "mex": _3, "ru": _3, "sa": _3, "uk": _3, "us": _3, "za": _3, "ar": _3, "hu": _3, "kr": _3, "no": _3, "qc": _3, "uy": _3, "africa": _3, "gr": _3, "co": _3, "clever-cloud": [0, { "services": _5 }], "jdevcloud": _3, "wpdevcloud": _3, "cloudcontrolapp": _3, "cloudcontrolled": _3, "cf-ipfs": _3, "cloudflare-ipfs": _3, "trycloudflare": _3, "cdn77-storage": _3, "dnsabr": _3, "cprapid": _5, "customer-oci": [0, { "*": _3, "oci": _5, "ocp": _5, "ocs": _5 }], "cyclic-app": _3, "dattolocal": _3, "dattorelay": _3, "dattoweb": _3, "mydatto": _3, "builtwithdark": _3, "datadetect": [0, { "demo": _3, "instance": _3 }], "ddns5": _3, "discordsays": _3, "discordsez": _3, "drayddns": _3, "dreamhosters": _3, "mydrobo": _3, "blogdns": _3, "cechire": _3, "dnsalias": _3, "dnsdojo": _3, "doesntexist": _3, "dontexist": _3, "doomdns": _3, "dyn-o-saur": _3, "dynalias": _3, "dyndns-at-home": _3, "dyndns-at-work": _3, "dyndns-blog": _3, "dyndns-free": _3, "dyndns-home": _3, "dyndns-ip": _3, "dyndns-mail": _3, "dyndns-office": _3, "dyndns-pics": _3, "dyndns-remote": _3, "dyndns-server": _3, "dyndns-web": _3, "dyndns-wiki": _3, "dyndns-work": _3, "est-a-la-maison": _3, "est-a-la-masion": _3, "est-le-patron": _3, "est-mon-blogueur": _3, "from-ak": _3, "from-al": _3, "from-ar": _3, "from-ca": _3, "from-ct": _3, "from-dc": _3, "from-de": _3, "from-fl": _3, "from-ga": _3, "from-hi": _3, "from-ia": _3, "from-id": _3, "from-il": _3, "from-in": _3, "from-ks": _3, "from-ky": _3, "from-ma": _3, "from-md": _3, "from-mi": _3, "from-mn": _3, "from-mo": _3, "from-ms": _3, "from-mt": _3, "from-nc": _3, "from-nd": _3, "from-ne": _3, "from-nh": _3, "from-nj": _3, "from-nm": _3, "from-nv": _3, "from-oh": _3, "from-ok": _3, "from-or": _3, "from-pa": _3, "from-pr": _3, "from-ri": _3, "from-sc": _3, "from-sd": _3, "from-tn": _3, "from-tx": _3, "from-ut": _3, "from-va": _3, "from-vt": _3, "from-wa": _3, "from-wi": _3, "from-wv": _3, "from-wy": _3, "getmyip": _3, "gotdns": _3, "hobby-site": _3, "homelinux": _3, "homeunix": _3, "iamallama": _3, "is-a-anarchist": _3, "is-a-blogger": _3, "is-a-bookkeeper": _3, "is-a-bulls-fan": _3, "is-a-caterer": _3, "is-a-chef": _3, "is-a-conservative": _3, "is-a-cpa": _3, "is-a-cubicle-slave": _3, "is-a-democrat": _3, "is-a-designer": _3, "is-a-doctor": _3, "is-a-financialadvisor": _3, "is-a-geek": _3, "is-a-green": _3, "is-a-guru": _3, "is-a-hard-worker": _3, "is-a-hunter": _3, "is-a-landscaper": _3, "is-a-lawyer": _3, "is-a-liberal": _3, "is-a-libertarian": _3, "is-a-llama": _3, "is-a-musician": _3, "is-a-nascarfan": _3, "is-a-nurse": _3, "is-a-painter": _3, "is-a-personaltrainer": _3, "is-a-photographer": _3, "is-a-player": _3, "is-a-republican": _3, "is-a-rockstar": _3, "is-a-socialist": _3, "is-a-student": _3, "is-a-teacher": _3, "is-a-techie": _3, "is-a-therapist": _3, "is-an-accountant": _3, "is-an-actor": _3, "is-an-actress": _3, "is-an-anarchist": _3, "is-an-artist": _3, "is-an-engineer": _3, "is-an-entertainer": _3, "is-certified": _3, "is-gone": _3, "is-into-anime": _3, "is-into-cars": _3, "is-into-cartoons": _3, "is-into-games": _3, "is-leet": _3, "is-not-certified": _3, "is-slick": _3, "is-uberleet": _3, "is-with-theband": _3, "isa-geek": _3, "isa-hockeynut": _3, "issmarterthanyou": _3, "likes-pie": _3, "likescandy": _3, "neat-url": _3, "saves-the-whales": _3, "selfip": _3, "sells-for-less": _3, "sells-for-u": _3, "servebbs": _3, "simple-url": _3, "space-to-rent": _3, "teaches-yoga": _3, "writesthisblog": _3, "digitaloceanspaces": _5, "ddnsfree": _3, "ddnsgeek": _3, "giize": _3, "gleeze": _3, "kozow": _3, "loseyourip": _3, "ooguy": _3, "theworkpc": _3, "mytuleap": _3, "tuleap-partners": _3, "encoreapi": _3, "evennode": [0, { "eu-1": _3, "eu-2": _3, "eu-3": _3, "eu-4": _3, "us-1": _3, "us-2": _3, "us-3": _3, "us-4": _3 }], "onfabrica": _3, "fastly-edge": _3, "fastly-terrarium": _3, "fastvps-server": _3, "mydobiss": _3, "firebaseapp": _3, "fldrv": _3, "forgeblocks": _3, "framercanvas": _3, "freebox-os": _3, "freeboxos": _3, "freemyip": _3, "aliases121": _3, "gentapps": _3, "gentlentapis": _3, "githubusercontent": _3, "0emm": _5, "appspot": [2, { "r": _5 }], "blogspot": _3, "codespot": _3, "googleapis": _3, "googlecode": _3, "pagespeedmobilizer": _3, "publishproxy": _3, "withgoogle": _3, "withyoutube": _3, "grayjayleagues": _3, "awsmppl": _3, "herokuapp": _3, "herokussl": _3, "impertrix": _3, "impertrixcdn": _3, "smushcdn": _3, "wphostedmail": _3, "wpmucdn": _3, "pixolino": _3, "amscompute": _3, "dopaas": _3, "hosted-by-previder": _38, "hosteur": [0, { "rag-cloud": _3, "rag-cloud-ch": _3 }], "ik-server": [0, { "jcloud": _3, "jcloud-ver-jpc": _3 }], "jelastic": [0, { "demo": _3 }], "kilatiron": _3, "massivegrid": _38, "wafaicloud": [0, { "jed": _3, "lon": _3, "ryd": _3 }], "webadorsite": _3, "joyent": [0, { "cns": _5 }], "ktistory": _3, "lpusercontent": _3, "linode": [0, { "members": _3, "nodebalancer": _5 }], "linodeobjects": _5, "linodeusercontent": [0, { "ip": _3 }], "barsycenter": _3, "barsyonline": _3, "mazeplay": _3, "miniserver": _3, "atmeta": _3, "fbsbx": _37, "meteorapp": _39, "hostedpi": _3, "mythic-beasts": [0, { "caracal": _3, "customer": _3, "fentiger": _3, "lynx": _3, "ocelot": _3, "oncilla": _3, "onza": _3, "sphinx": _3, "vs": _3, "x": _3, "yali": _3 }], "nospamproxy": _17, "4u": _3, "nfshost": _3, "001www": _3, "ddnslive": _3, "myiphost": _3, "3utilities": _3, "blogsyte": _3, "ciscofreak": _3, "damnserver": _3, "ddnsking": _3, "ditchyourip": _3, "dnsiskinky": _3, "dynns": _3, "geekgalaxy": _3, "health-carereform": _3, "homesecuritymac": _3, "homesecuritypc": _3, "myactivedirectory": _3, "mysecuritycamera": _3, "myvnc": _3, "net-freaks": _3, "onthewifi": _3, "point2this": _3, "quicksytes": _3, "securitytactics": _3, "servebeer": _3, "servecounterstrike": _3, "serveexchange": _3, "serveftp": _3, "servegame": _3, "servehalflife": _3, "servehttp": _3, "servehumour": _3, "serveirc": _3, "servemp3": _3, "servep2p": _3, "servepics": _3, "servequake": _3, "servesarcasm": _3, "stufftoread": _3, "unusualperson": _3, "workisboring": _3, "observableusercontent": [0, { "static": _3 }], "simplesite": _3, "orsites": _3, "operaunite": _3, "authgear-staging": _3, "authgearapps": _3, "skygearapp": _3, "outsystemscloud": _3, "ownprovider": _3, "pgfog": _3, "pagefrontapp": _3, "pagexl": _3, "paywhirl": _5, "gotpantheon": _3, "upsunapp": _3, "platter-app": _3, "pleskns": _3, "postman-echo": _3, "prgmr": [0, { "xen": _3 }], "pythonanywhere": _39, "qualifioapp": _3, "ladesk": _3, "qbuser": _3, "qa2": _3, "alpha-myqnapcloud": _3, "dev-myqnapcloud": _3, "mycloudnas": _3, "mynascloud": _3, "myqnapcloud": _3, "quipelements": _5, "rackmaze": _3, "rhcloud": _3, "onrender": _3, "render": _40, "180r": _3, "dojin": _3, "sakuratan": _3, "sakuraweb": _3, "x0": _3, "code": [0, { "builder": _5, "dev-builder": _5, "stg-builder": _5 }], "salesforce": [0, { "platform": [0, { "code-builder-stg": [0, { "test": [0, { "001": _5 }] }] }] }], "logoip": _3, "scrysec": _3, "firewall-gateway": _3, "myshopblocks": _3, "myshopify": _3, "shopitsite": _3, "1kapp": _3, "appchizi": _3, "applinzi": _3, "sinaapp": _3, "vipsinaapp": _3, "bounty-full": [2, { "alpha": _3, "beta": _3 }], "streamlitapp": _3, "try-snowplow": _3, "w-corp-staticblitz": _3, "w-credentialless-staticblitz": _3, "w-staticblitz": _3, "stackhero-network": _3, "strapiapp": [2, { "media": _3 }], "playstation-cloud": _3, "myspreadshop": _3, "stdlib": [0, { "api": _3 }], "streak-link": _3, "streaklinks": _3, "streakusercontent": _3, "temp-dns": _3, "dsmynas": _3, "familyds": _3, "mytabit": _3, "tb-hosting": _41, "reservd": _3, "thingdustdata": _3, "bloxcms": _3, "townnews-staging": _3, "typeform": [0, { "pro": _3 }], "hk": _3, "it": _3, "vultrobjects": _5, "wafflecell": _3, "hotelwithflight": _3, "reserve-online": _3, "remotewd": _3, "wiardweb": _42, "wixsite": _3, "wixstudio": _3, "messwithdns": _3, "woltlab-demo": _3, "wpenginepowered": [2, { "js": _3 }], "xnbay": [2, { "u2": _3, "u2-local": _3 }], "yolasite": _3 }], "coop": _2, "cr": [1, { "ac": _2, "co": _2, "ed": _2, "fi": _2, "go": _2, "or": _2, "sa": _2 }], "cu": [1, { "com": _2, "edu": _2, "org": _2, "net": _2, "gov": _2, "inf": _2 }], "cv": [1, { "com": _2, "edu": _2, "int": _2, "nome": _2, "org": _2, "blogspot": _3 }], "cw": _43, "cx": [1, { "gov": _2, "cloudns": _3, "ath": _3, "info": _3, "assessments": _3, "calculators": _3, "funnels": _3, "paynow": _3, "quizzes": _3, "researched": _3, "tests": _3 }], "cy": [1, { "ac": _2, "biz": _2, "com": [1, { "blogspot": _3, "scaleforce": _44 }], "ekloges": _2, "gov": _2, "ltd": _2, "mil": _2, "net": _2, "org": _2, "press": _2, "pro": _2, "tm": _2 }], "cz": [1, { "co": _3, "contentproxy9": [0, { "rsc": _3 }], "realm": _3, "e4": _3, "blogspot": _3, "metacentrum": [0, { "cloud": _5, "custom": _3 }], "muni": [0, { "cloud": [0, { "flt": _3, "usr": _3 }] }] }], "de": [1, { "bplaced": _3, "square7": _3, "com": _3, "cosidns": [0, { "dyn": _3 }], "dnsupdater": _3, "dynamisches-dns": _3, "internet-dns": _3, "l-o-g-i-n": _3, "dnshome": _3, "fuettertdasnetz": _3, "isteingeek": _3, "istmein": _3, "lebtimnetz": _3, "leitungsen": _3, "traeumtgerade": _3, "ddnss": [2, { "dyn": _3, "dyndns": _3 }], "dyn-ip24": _3, "dyndns1": _3, "home-webserver": [2, { "dyn": _3 }], "myhome-server": _3, "frusky": _5, "goip": _3, "blogspot": _3, "xn--gnstigbestellen-zvb": _3, "g\xFCnstigbestellen": _3, "xn--gnstigliefern-wob": _3, "g\xFCnstigliefern": _3, "hs-heilbronn": [0, { "it": _42 }], "dyn-berlin": _3, "in-berlin": _3, "in-brb": _3, "in-butter": _3, "in-dsl": _3, "in-vpn": _3, "iservschule": _3, "mein-iserv": _3, "schulplattform": _3, "schulserver": _3, "test-iserv": _3, "keymachine": _3, "git-repos": _3, "lcube-server": _3, "svn-repos": _3, "barsy": _3, "123webseite": _3, "logoip": _3, "firewall-gateway": _3, "my-gateway": _3, "my-router": _3, "spdns": _3, "speedpartner": [0, { "customer": _3 }], "myspreadshop": _3, "taifun-dns": _3, "12hp": _3, "2ix": _3, "4lima": _3, "lima-city": _3, "dd-dns": _3, "dray-dns": _3, "draydns": _3, "dyn-vpn": _3, "dynvpn": _3, "mein-vigor": _3, "my-vigor": _3, "my-wan": _3, "syno-ds": _3, "synology-diskstation": _3, "synology-ds": _3, "uberspace": _5, "virtual-user": _3, "virtualuser": _3, "community-pro": _3, "diskussionsbereich": _3 }], "dj": _2, "dk": [1, { "biz": _3, "co": _3, "firm": _3, "reg": _3, "store": _3, "blogspot": _3, "123hjemmeside": _3, "myspreadshop": _3 }], "dm": _4, "do": [1, { "art": _2, "com": _2, "edu": _2, "gob": _2, "gov": _2, "mil": _2, "net": _2, "org": _2, "sld": _2, "web": _2 }], "dz": [1, { "art": _2, "asso": _2, "com": _2, "edu": _2, "gov": _2, "org": _2, "net": _2, "pol": _2, "soc": _2, "tm": _2 }], "ec": [1, { "com": _2, "info": _2, "net": _2, "fin": _2, "k12": _2, "med": _2, "pro": _2, "org": _2, "edu": _2, "gov": _2, "gob": _2, "mil": _2, "base": _3, "official": _3 }], "edu": [1, { "rit": [0, { "git-pages": _3 }] }], "ee": [1, { "edu": _2, "gov": _2, "riik": _2, "lib": _2, "med": _2, "com": _9, "pri": _2, "aip": _2, "org": _2, "fie": _2 }], "eg": [1, { "com": _9, "edu": _2, "eun": _2, "gov": _2, "mil": _2, "name": _2, "net": _2, "org": _2, "sci": _2 }], "er": _16, "es": [1, { "com": _9, "nom": _2, "org": _2, "gob": _2, "edu": _2, "123miweb": _3, "myspreadshop": _3 }], "et": [1, { "com": _2, "gov": _2, "org": _2, "edu": _2, "biz": _2, "name": _2, "info": _2, "net": _2 }], "eu": [1, { "airkitapps": _3, "mycd": _3, "cloudns": _3, "dogado": _45, "barsy": _3, "wellbeingzone": _3, "spdns": _3, "transurl": _5, "diskstation": _3 }], "fi": [1, { "aland": _2, "dy": _3, "blogspot": _3, "xn--hkkinen-5wa": _3, "h\xE4kkinen": _3, "iki": _3, "cloudplatform": [0, { "fi": _3 }], "datacenter": [0, { "demo": _3, "paas": _3 }], "kapsi": _3, "123kotisivu": _3, "myspreadshop": _3 }], "fj": [1, { "ac": _2, "biz": _2, "com": _2, "gov": _2, "info": _2, "mil": _2, "name": _2, "net": _2, "org": _2, "pro": _2 }], "fk": _16, "fm": [1, { "com": _2, "edu": _2, "net": _2, "org": _2, "radio": _3, "user": _5 }], "fo": _2, "fr": [1, { "asso": _2, "com": _2, "gouv": _2, "nom": _2, "prd": _2, "tm": _2, "avoues": _2, "cci": _2, "greta": _2, "huissier-justice": _2, "en-root": _3, "fbx-os": _3, "fbxos": _3, "freebox-os": _3, "freeboxos": _3, "blogspot": _3, "goupile": _3, "123siteweb": _3, "on-web": _3, "chirurgiens-dentistes-en-france": _3, "dedibox": _3, "aeroport": _3, "avocat": _3, "chambagri": _3, "chirurgiens-dentistes": _3, "experts-comptables": _3, "medecin": _3, "notaires": _3, "pharmacien": _3, "port": _3, "veterinaire": _3, "myspreadshop": _3, "ynh": _3 }], "ga": _2, "gb": _2, "gd": [1, { "edu": _2, "gov": _2 }], "ge": [1, { "com": _2, "edu": _2, "gov": _2, "org": _2, "mil": _2, "net": _2, "pvt": _2 }], "gf": _2, "gg": [1, { "co": _2, "net": _2, "org": _2, "kaas": _3, "cya": _3, "stackit": _3, "panel": [2, { "daemon": _3 }] }], "gh": [1, { "com": _2, "edu": _2, "gov": _2, "org": _2, "mil": _2 }], "gi": [1, { "com": _2, "ltd": _2, "gov": _2, "mod": _2, "edu": _2, "org": _2 }], "gl": [1, { "co": _2, "com": _2, "edu": _2, "net": _2, "org": _2, "biz": _3 }], "gm": _2, "gn": [1, { "ac": _2, "com": _2, "edu": _2, "gov": _2, "org": _2, "net": _2 }], "gov": _2, "gp": [1, { "com": _2, "net": _2, "mobi": _2, "edu": _2, "org": _2, "asso": _2 }], "gq": _2, "gr": [1, { "com": _2, "edu": _2, "net": _2, "org": _2, "gov": _2, "blogspot": _3, "barsy": _3, "simplesite": _3 }], "gs": _2, "gt": [1, { "com": _2, "edu": _2, "gob": _2, "ind": _2, "mil": _2, "net": _2, "org": _2 }], "gu": [1, { "com": _2, "edu": _2, "gov": _2, "guam": _2, "info": _2, "net": _2, "org": _2, "web": _2 }], "gw": _2, "gy": [1, { "co": _2, "com": _2, "edu": _2, "gov": _2, "net": _2, "org": _2 }], "hk": [1, { "com": _2, "edu": _2, "gov": _2, "idv": _2, "net": _2, "org": _2, "xn--55qx5d": _2, "\u516C\u53F8": _2, "xn--wcvs22d": _2, "\u6559\u80B2": _2, "xn--lcvr32d": _2, "\u654E\u80B2": _2, "xn--mxtq1m": _2, "\u653F\u5E9C": _2, "xn--gmqw5a": _2, "\u500B\u4EBA": _2, "xn--ciqpn": _2, "\u4E2A\u4EBA": _2, "xn--gmq050i": _2, "\u7B87\u4EBA": _2, "xn--zf0avx": _2, "\u7DB2\u7EDC": _2, "xn--io0a7i": _2, "\u7F51\u7EDC": _2, "xn--mk0axi": _2, "\u7EC4\u7E54": _2, "xn--od0alg": _2, "\u7DB2\u7D61": _2, "xn--od0aq3b": _2, "\u7F51\u7D61": _2, "xn--tn0ag": _2, "\u7EC4\u7EC7": _2, "xn--uc0atv": _2, "\u7D44\u7E54": _2, "xn--uc0ay4a": _2, "\u7D44\u7EC7": _2, "blogspot": _3, "secaas": _3, "inc": _3, "ltd": _3 }], "hm": _2, "hn": [1, { "com": _2, "edu": _2, "org": _2, "net": _2, "mil": _2, "gob": _2 }], "hr": [1, { "iz": _2, "from": _2, "name": _2, "com": _2, "brendly": _48, "blogspot": _3, "free": _3 }], "ht": [1, { "com": _2, "shop": _2, "firm": _2, "info": _2, "adult": _2, "net": _2, "pro": _2, "org": _2, "med": _2, "art": _2, "coop": _2, "pol": _2, "asso": _2, "edu": _2, "rel": _2, "gouv": _2, "perso": _2, "rt": _3 }], "hu": [1, { "2000": _2, "co": _2, "info": _2, "org": _2, "priv": _2, "sport": _2, "tm": _2, "agrar": _2, "bolt": _2, "casino": _2, "city": _2, "erotica": _2, "erotika": _2, "film": _2, "forum": _2, "games": _2, "hotel": _2, "ingatlan": _2, "jogasz": _2, "konyvelo": _2, "lakas": _2, "media": _2, "news": _2, "reklam": _2, "sex": _2, "shop": _2, "suli": _2, "szex": _2, "tozsde": _2, "utazas": _2, "video": _2, "blogspot": _3 }], "id": [1, { "ac": _2, "biz": _2, "co": _9, "desa": _2, "go": _2, "mil": _2, "my": [1, { "rss": _5 }], "net": _2, "or": _2, "ponpes": _2, "sch": _2, "web": _2, "flap": _3, "forte": _3 }], "ie": [1, { "gov": _2, "blogspot": _3, "myspreadshop": _3 }], "il": [1, { "ac": _2, "co": [1, { "ravpage": _3, "blogspot": _3, "mytabit": _3, "tabitorder": _3 }], "gov": _2, "idf": _2, "k12": _2, "muni": _2, "net": _2, "org": _2 }], "xn--4dbrk0ce": [1, { "xn--4dbgdty6c": _2, "xn--5dbhl8d": _2, "xn--8dbq2a": _2, "xn--hebda8b": _2 }], "\u05D9\u05E9\u05E8\u05D0\u05DC": [1, { "\u05D0\u05E7\u05D3\u05DE\u05D9\u05D4": _2, "\u05D9\u05E9\u05D5\u05D1": _2, "\u05E6\u05D4\u05DC": _2, "\u05DE\u05DE\u05E9\u05DC": _2 }], "im": [1, { "ac": _2, "co": [1, { "ltd": _2, "plc": _2 }], "com": _2, "net": _2, "org": _2, "tt": _2, "tv": _2, "ro": _3 }], "in": [1, { "5g": _2, "6g": _2, "ac": _2, "ai": _2, "am": _2, "bihar": _2, "biz": _2, "business": _2, "ca": _2, "cn": _2, "co": [1, { "cyclic": _3 }], "com": _2, "coop": _2, "cs": _2, "delhi": _2, "dr": _2, "edu": _2, "er": _2, "firm": _2, "gen": _2, "gov": _2, "gujarat": _2, "ind": _2, "info": _2, "int": _2, "internet": _2, "io": _2, "me": _2, "mil": _2, "net": _2, "nic": _2, "org": _2, "pg": _2, "post": _2, "pro": _2, "res": _2, "travel": _2, "tv": _2, "uk": _2, "up": _2, "us": _2, "web": _3, "cloudns": _3, "blogspot": _3, "barsy": _3, "supabase": _3 }], "info": [1, { "cloudns": _3, "dynamic-dns": _3, "barrel-of-knowledge": _3, "barrell-of-knowledge": _3, "dyndns": _3, "for-our": _3, "groks-the": _3, "groks-this": _3, "here-for-more": _3, "knowsitall": _3, "selfip": _3, "webhop": _3, "barsy": _3, "mayfirst": _3, "forumz": _3, "nsupdate": _3, "dvrcam": _3, "ilovecollege": _3, "no-ip": _3, "dnsupdate": _3, "v-info": _3 }], "int": [1, { "eu": _2 }], "io": [1, { "2038": _3, "com": _2, "on-acorn": _5, "apigee": _3, "b-data": _3, "backplaneapp": _3, "banzaicloud": [0, { "app": _3, "backyards": _5 }], "beagleboard": _3, "bitbucket": _3, "bluebite": _3, "boxfuse": _3, "brave": [0, { "s": _5 }], "browsersafetymark": _3, "bigv": [0, { "uk0": _3 }], "cleverapps": _3, "dappnode": [0, { "dyndns": _3 }], "darklang": _3, "dedyn": _3, "drud": _3, "definima": _3, "fh-muenster": _3, "shw": _3, "forgerock": [0, { "id": _3 }], "github": _3, "gitlab": _3, "lolipop": _3, "hasura-app": _3, "hostyhosting": _3, "hypernode": _3, "moonscale": _5, "beebyte": _38, "beebyteapp": [0, { "sekd1": _3 }], "jele": _3, "unispace": [0, { "cloud-fr1": _3 }], "webthings": _3, "loginline": _3, "barsy": _3, "azurecontainer": _5, "ngrok": [2, { "ap": _3, "au": _3, "eu": _3, "in": _3, "jp": _3, "sa": _3, "us": _3 }], "nodeart": [0, { "stage": _3 }], "nid": _3, "pantheonsite": _3, "dyn53": _3, "pstmn": [2, { "mock": _3 }], "protonet": _3, "qoto": _3, "qcx": [2, { "sys": _5 }], "vaporcloud": _3, "vbrplsbx": [0, { "g": _3 }], "on-k3s": _5, "on-rio": _5, "readthedocs": _3, "resindevice": _3, "resinstaging": [0, { "devices": _3 }], "hzc": _3, "sandcats": _3, "scrypted": [0, { "client": _3 }], "shiftcrypto": _3, "shiftedit": _3, "mo-siemens": _3, "musician": _3, "lair": _37, "stolos": _5, "spacekit": _3, "utwente": _3, "s5y": _5, "edugit": _3, "telebit": _3, "thingdust": [0, { "dev": _49, "disrec": _49, "prod": _50, "testing": _49 }], "tickets": _3, "upli": _3, "webflow": _3, "webflowtest": _3, "wedeploy": _3, "editorx": _3, "wixstudio": _3, "basicserver": _3, "virtualserver": _3 }], "iq": _51, "ir": [1, { "ac": _2, "co": _2, "gov": _2, "id": _2, "net": _2, "org": _2, "sch": _2, "xn--mgba3a4f16a": _2, "\u0627\u06CC\u0631\u0627\u0646": _2, "xn--mgba3a4fra": _2, "\u0627\u064A\u0631\u0627\u0646": _2 }], "is": [1, { "net": _2, "com": _2, "edu": _2, "gov": _2, "org": _2, "int": _2, "cupcake": _3, "blogspot": _3 }], "it": [1, { "gov": _2, "edu": _2, "abr": _2, "abruzzo": _2, "aosta-valley": _2, "aostavalley": _2, "bas": _2, "basilicata": _2, "cal": _2, "calabria": _2, "cam": _2, "campania": _2, "emilia-romagna": _2, "emiliaromagna": _2, "emr": _2, "friuli-v-giulia": _2, "friuli-ve-giulia": _2, "friuli-vegiulia": _2, "friuli-venezia-giulia": _2, "friuli-veneziagiulia": _2, "friuli-vgiulia": _2, "friuliv-giulia": _2, "friulive-giulia": _2, "friulivegiulia": _2, "friulivenezia-giulia": _2, "friuliveneziagiulia": _2, "friulivgiulia": _2, "fvg": _2, "laz": _2, "lazio": _2, "lig": _2, "liguria": _2, "lom": _2, "lombardia": _2, "lombardy": _2, "lucania": _2, "mar": _2, "marche": _2, "mol": _2, "molise": _2, "piedmont": _2, "piemonte": _2, "pmn": _2, "pug": _2, "puglia": _2, "sar": _2, "sardegna": _2, "sardinia": _2, "sic": _2, "sicilia": _2, "sicily": _2, "taa": _2, "tos": _2, "toscana": _2, "trentin-sud-tirol": _2, "xn--trentin-sd-tirol-rzb": _2, "trentin-s\xFCd-tirol": _2, "trentin-sudtirol": _2, "xn--trentin-sdtirol-7vb": _2, "trentin-s\xFCdtirol": _2, "trentin-sued-tirol": _2, "trentin-suedtirol": _2, "trentino-a-adige": _2, "trentino-aadige": _2, "trentino-alto-adige": _2, "trentino-altoadige": _2, "trentino-s-tirol": _2, "trentino-stirol": _2, "trentino-sud-tirol": _2, "xn--trentino-sd-tirol-c3b": _2, "trentino-s\xFCd-tirol": _2, "trentino-sudtirol": _2, "xn--trentino-sdtirol-szb": _2, "trentino-s\xFCdtirol": _2, "trentino-sued-tirol": _2, "trentino-suedtirol": _2, "trentino": _2, "trentinoa-adige": _2, "trentinoaadige": _2, "trentinoalto-adige": _2, "trentinoaltoadige": _2, "trentinos-tirol": _2, "trentinostirol": _2, "trentinosud-tirol": _2, "xn--trentinosd-tirol-rzb": _2, "trentinos\xFCd-tirol": _2, "trentinosudtirol": _2, "xn--trentinosdtirol-7vb": _2, "trentinos\xFCdtirol": _2, "trentinosued-tirol": _2, "trentinosuedtirol": _2, "trentinsud-tirol": _2, "xn--trentinsd-tirol-6vb": _2, "trentins\xFCd-tirol": _2, "trentinsudtirol": _2, "xn--trentinsdtirol-nsb": _2, "trentins\xFCdtirol": _2, "trentinsued-tirol": _2, "trentinsuedtirol": _2, "tuscany": _2, "umb": _2, "umbria": _2, "val-d-aosta": _2, "val-daosta": _2, "vald-aosta": _2, "valdaosta": _2, "valle-aosta": _2, "valle-d-aosta": _2, "valle-daosta": _2, "valleaosta": _2, "valled-aosta": _2, "valledaosta": _2, "vallee-aoste": _2, "xn--valle-aoste-ebb": _2, "vall\xE9e-aoste": _2, "vallee-d-aoste": _2, "xn--valle-d-aoste-ehb": _2, "vall\xE9e-d-aoste": _2, "valleeaoste": _2, "xn--valleaoste-e7a": _2, "vall\xE9eaoste": _2, "valleedaoste": _2, "xn--valledaoste-ebb": _2, "vall\xE9edaoste": _2, "vao": _2, "vda": _2, "ven": _2, "veneto": _2, "ag": _2, "agrigento": _2, "al": _2, "alessandria": _2, "alto-adige": _2, "altoadige": _2, "an": _2, "ancona": _2, "andria-barletta-trani": _2, "andria-trani-barletta": _2, "andriabarlettatrani": _2, "andriatranibarletta": _2, "ao": _2, "aosta": _2, "aoste": _2, "ap": _2, "aq": _2, "aquila": _2, "ar": _2, "arezzo": _2, "ascoli-piceno": _2, "ascolipiceno": _2, "asti": _2, "at": _2, "av": _2, "avellino": _2, "ba": _2, "balsan-sudtirol": _2, "xn--balsan-sdtirol-nsb": _2, "balsan-s\xFCdtirol": _2, "balsan-suedtirol": _2, "balsan": _2, "bari": _2, "barletta-trani-andria": _2, "barlettatraniandria": _2, "belluno": _2, "benevento": _2, "bergamo": _2, "bg": _2, "bi": _2, "biella": _2, "bl": _2, "bn": _2, "bo": _2, "bologna": _2, "bolzano-altoadige": _2, "bolzano": _2, "bozen-sudtirol": _2, "xn--bozen-sdtirol-2ob": _2, "bozen-s\xFCdtirol": _2, "bozen-suedtirol": _2, "bozen": _2, "br": _2, "brescia": _2, "brindisi": _2, "bs": _2, "bt": _2, "bulsan-sudtirol": _2, "xn--bulsan-sdtirol-nsb": _2, "bulsan-s\xFCdtirol": _2, "bulsan-suedtirol": _2, "bulsan": _2, "bz": _2, "ca": _2, "cagliari": _2, "caltanissetta": _2, "campidano-medio": _2, "campidanomedio": _2, "campobasso": _2, "carbonia-iglesias": _2, "carboniaiglesias": _2, "carrara-massa": _2, "carraramassa": _2, "caserta": _2, "catania": _2, "catanzaro": _2, "cb": _2, "ce": _2, "cesena-forli": _2, "xn--cesena-forl-mcb": _2, "cesena-forl\xEC": _2, "cesenaforli": _2, "xn--cesenaforl-i8a": _2, "cesenaforl\xEC": _2, "ch": _2, "chieti": _2, "ci": _2, "cl": _2, "cn": _2, "co": _2, "como": _2, "cosenza": _2, "cr": _2, "cremona": _2, "crotone": _2, "cs": _2, "ct": _2, "cuneo": _2, "cz": _2, "dell-ogliastra": _2, "dellogliastra": _2, "en": _2, "enna": _2, "fc": _2, "fe": _2, "fermo": _2, "ferrara": _2, "fg": _2, "fi": _2, "firenze": _2, "florence": _2, "fm": _2, "foggia": _2, "forli-cesena": _2, "xn--forl-cesena-fcb": _2, "forl\xEC-cesena": _2, "forlicesena": _2, "xn--forlcesena-c8a": _2, "forl\xECcesena": _2, "fr": _2, "frosinone": _2, "ge": _2, "genoa": _2, "genova": _2, "go": _2, "gorizia": _2, "gr": _2, "grosseto": _2, "iglesias-carbonia": _2, "iglesiascarbonia": _2, "im": _2, "imperia": _2, "is": _2, "isernia": _2, "kr": _2, "la-spezia": _2, "laquila": _2, "laspezia": _2, "latina": _2, "lc": _2, "le": _2, "lecce": _2, "lecco": _2, "li": _2, "livorno": _2, "lo": _2, "lodi": _2, "lt": _2, "lu": _2, "lucca": _2, "macerata": _2, "mantova": _2, "massa-carrara": _2, "massacarrara": _2, "matera": _2, "mb": _2, "mc": _2, "me": _2, "medio-campidano": _2, "mediocampidano": _2, "messina": _2, "mi": _2, "milan": _2, "milano": _2, "mn": _2, "mo": _2, "modena": _2, "monza-brianza": _2, "monza-e-della-brianza": _2, "monza": _2, "monzabrianza": _2, "monzaebrianza": _2, "monzaedellabrianza": _2, "ms": _2, "mt": _2, "na": _2, "naples": _2, "napoli": _2, "no": _2, "novara": _2, "nu": _2, "nuoro": _2, "og": _2, "ogliastra": _2, "olbia-tempio": _2, "olbiatempio": _2, "or": _2, "oristano": _2, "ot": _2, "pa": _2, "padova": _2, "padua": _2, "palermo": _2, "parma": _2, "pavia": _2, "pc": _2, "pd": _2, "pe": _2, "perugia": _2, "pesaro-urbino": _2, "pesarourbino": _2, "pescara": _2, "pg": _2, "pi": _2, "piacenza": _2, "pisa": _2, "pistoia": _2, "pn": _2, "po": _2, "pordenone": _2, "potenza": _2, "pr": _2, "prato": _2, "pt": _2, "pu": _2, "pv": _2, "pz": _2, "ra": _2, "ragusa": _2, "ravenna": _2, "rc": _2, "re": _2, "reggio-calabria": _2, "reggio-emilia": _2, "reggiocalabria": _2, "reggioemilia": _2, "rg": _2, "ri": _2, "rieti": _2, "rimini": _2, "rm": _2, "rn": _2, "ro": _2, "roma": _2, "rome": _2, "rovigo": _2, "sa": _2, "salerno": _2, "sassari": _2, "savona": _2, "si": _2, "siena": _2, "siracusa": _2, "so": _2, "sondrio": _2, "sp": _2, "sr": _2, "ss": _2, "suedtirol": _2, "xn--sdtirol-n2a": _2, "s\xFCdtirol": _2, "sv": _2, "ta": _2, "taranto": _2, "te": _2, "tempio-olbia": _2, "tempioolbia": _2, "teramo": _2, "terni": _2, "tn": _2, "to": _2, "torino": _2, "tp": _2, "tr": _2, "trani-andria-barletta": _2, "trani-barletta-andria": _2, "traniandriabarletta": _2, "tranibarlettaandria": _2, "trapani": _2, "trento": _2, "treviso": _2, "trieste": _2, "ts": _2, "turin": _2, "tv": _2, "ud": _2, "udine": _2, "urbino-pesaro": _2, "urbinopesaro": _2, "va": _2, "varese": _2, "vb": _2, "vc": _2, "ve": _2, "venezia": _2, "venice": _2, "verbania": _2, "vercelli": _2, "verona": _2, "vi": _2, "vibo-valentia": _2, "vibovalentia": _2, "vicenza": _2, "viterbo": _2, "vr": _2, "vs": _2, "vt": _2, "vv": _2, "12chars": _3, "blogspot": _3, "ibxos": _3, "iliadboxos": _3, "neen": [0, { "jc": _3 }], "tim": [0, { "open": [0, { "jelastic": _17 }] }], "16-b": _3, "32-b": _3, "64-b": _3, "123homepage": _3, "myspreadshop": _3, "syncloud": _3 }], "je": [1, { "co": _2, "net": _2, "org": _2, "of": _3 }], "jm": _16, "jo": [1, { "com": _2, "org": _2, "net": _2, "edu": _2, "sch": _2, "gov": _2, "mil": _2, "name": _2 }], "jobs": _2, "jp": [1, { "ac": _2, "ad": _2, "co": _2, "ed": _2, "go": _2, "gr": _2, "lg": _2, "ne": [1, { "aseinet": _46, "gehirn": _3, "ivory": _3, "mail-box": _3, "mints": _3, "mokuren": _3, "opal": _3, "sakura": _3, "sumomo": _3, "topaz": _3 }], "or": _2, "aichi": [1, { "aisai": _2, "ama": _2, "anjo": _2, "asuke": _2, "chiryu": _2, "chita": _2, "fuso": _2, "gamagori": _2, "handa": _2, "hazu": _2, "hekinan": _2, "higashiura": _2, "ichinomiya": _2, "inazawa": _2, "inuyama": _2, "isshiki": _2, "iwakura": _2, "kanie": _2, "kariya": _2, "kasugai": _2, "kira": _2, "kiyosu": _2, "komaki": _2, "konan": _2, "kota": _2, "mihama": _2, "miyoshi": _2, "nishio": _2, "nisshin": _2, "obu": _2, "oguchi": _2, "oharu": _2, "okazaki": _2, "owariasahi": _2, "seto": _2, "shikatsu": _2, "shinshiro": _2, "shitara": _2, "tahara": _2, "takahama": _2, "tobishima": _2, "toei": _2, "togo": _2, "tokai": _2, "tokoname": _2, "toyoake": _2, "toyohashi": _2, "toyokawa": _2, "toyone": _2, "toyota": _2, "tsushima": _2, "yatomi": _2 }], "akita": [1, { "akita": _2, "daisen": _2, "fujisato": _2, "gojome": _2, "hachirogata": _2, "happou": _2, "higashinaruse": _2, "honjo": _2, "honjyo": _2, "ikawa": _2, "kamikoani": _2, "kamioka": _2, "katagami": _2, "kazuno": _2, "kitaakita": _2, "kosaka": _2, "kyowa": _2, "misato": _2, "mitane": _2, "moriyoshi": _2, "nikaho": _2, "noshiro": _2, "odate": _2, "oga": _2, "ogata": _2, "semboku": _2, "yokote": _2, "yurihonjo": _2 }], "aomori": [1, { "aomori": _2, "gonohe": _2, "hachinohe": _2, "hashikami": _2, "hiranai": _2, "hirosaki": _2, "itayanagi": _2, "kuroishi": _2, "misawa": _2, "mutsu": _2, "nakadomari": _2, "noheji": _2, "oirase": _2, "owani": _2, "rokunohe": _2, "sannohe": _2, "shichinohe": _2, "shingo": _2, "takko": _2, "towada": _2, "tsugaru": _2, "tsuruta": _2 }], "chiba": [1, { "abiko": _2, "asahi": _2, "chonan": _2, "chosei": _2, "choshi": _2, "chuo": _2, "funabashi": _2, "futtsu": _2, "hanamigawa": _2, "ichihara": _2, "ichikawa": _2, "ichinomiya": _2, "inzai": _2, "isumi": _2, "kamagaya": _2, "kamogawa": _2, "kashiwa": _2, "katori": _2, "katsuura": _2, "kimitsu": _2, "kisarazu": _2, "kozaki": _2, "kujukuri": _2, "kyonan": _2, "matsudo": _2, "midori": _2, "mihama": _2, "minamiboso": _2, "mobara": _2, "mutsuzawa": _2, "nagara": _2, "nagareyama": _2, "narashino": _2, "narita": _2, "noda": _2, "oamishirasato": _2, "omigawa": _2, "onjuku": _2, "otaki": _2, "sakae": _2, "sakura": _2, "shimofusa": _2, "shirako": _2, "shiroi": _2, "shisui": _2, "sodegaura": _2, "sosa": _2, "tako": _2, "tateyama": _2, "togane": _2, "tohnosho": _2, "tomisato": _2, "urayasu": _2, "yachimata": _2, "yachiyo": _2, "yokaichiba": _2, "yokoshibahikari": _2, "yotsukaido": _2 }], "ehime": [1, { "ainan": _2, "honai": _2, "ikata": _2, "imabari": _2, "iyo": _2, "kamijima": _2, "kihoku": _2, "kumakogen": _2, "masaki": _2, "matsuno": _2, "matsuyama": _2, "namikata": _2, "niihama": _2, "ozu": _2, "saijo": _2, "seiyo": _2, "shikokuchuo": _2, "tobe": _2, "toon": _2, "uchiko": _2, "uwajima": _2, "yawatahama": _2 }], "fukui": [1, { "echizen": _2, "eiheiji": _2, "fukui": _2, "ikeda": _2, "katsuyama": _2, "mihama": _2, "minamiechizen": _2, "obama": _2, "ohi": _2, "ono": _2, "sabae": _2, "sakai": _2, "takahama": _2, "tsuruga": _2, "wakasa": _2 }], "fukuoka": [1, { "ashiya": _2, "buzen": _2, "chikugo": _2, "chikuho": _2, "chikujo": _2, "chikushino": _2, "chikuzen": _2, "chuo": _2, "dazaifu": _2, "fukuchi": _2, "hakata": _2, "higashi": _2, "hirokawa": _2, "hisayama": _2, "iizuka": _2, "inatsuki": _2, "kaho": _2, "kasuga": _2, "kasuya": _2, "kawara": _2, "keisen": _2, "koga": _2, "kurate": _2, "kurogi": _2, "kurume": _2, "minami": _2, "miyako": _2, "miyama": _2, "miyawaka": _2, "mizumaki": _2, "munakata": _2, "nakagawa": _2, "nakama": _2, "nishi": _2, "nogata": _2, "ogori": _2, "okagaki": _2, "okawa": _2, "oki": _2, "omuta": _2, "onga": _2, "onojo": _2, "oto": _2, "saigawa": _2, "sasaguri": _2, "shingu": _2, "shinyoshitomi": _2, "shonai": _2, "soeda": _2, "sue": _2, "tachiarai": _2, "tagawa": _2, "takata": _2, "toho": _2, "toyotsu": _2, "tsuiki": _2, "ukiha": _2, "umi": _2, "usui": _2, "yamada": _2, "yame": _2, "yanagawa": _2, "yukuhashi": _2 }], "fukushima": [1, { "aizubange": _2, "aizumisato": _2, "aizuwakamatsu": _2, "asakawa": _2, "bandai": _2, "date": _2, "fukushima": _2, "furudono": _2, "futaba": _2, "hanawa": _2, "higashi": _2, "hirata": _2, "hirono": _2, "iitate": _2, "inawashiro": _2, "ishikawa": _2, "iwaki": _2, "izumizaki": _2, "kagamiishi": _2, "kaneyama": _2, "kawamata": _2, "kitakata": _2, "kitashiobara": _2, "koori": _2, "koriyama": _2, "kunimi": _2, "miharu": _2, "mishima": _2, "namie": _2, "nango": _2, "nishiaizu": _2, "nishigo": _2, "okuma": _2, "omotego": _2, "ono": _2, "otama": _2, "samegawa": _2, "shimogo": _2, "shirakawa": _2, "showa": _2, "soma": _2, "sukagawa": _2, "taishin": _2, "tamakawa": _2, "tanagura": _2, "tenei": _2, "yabuki": _2, "yamato": _2, "yamatsuri": _2, "yanaizu": _2, "yugawa": _2 }], "gifu": [1, { "anpachi": _2, "ena": _2, "gifu": _2, "ginan": _2, "godo": _2, "gujo": _2, "hashima": _2, "hichiso": _2, "hida": _2, "higashishirakawa": _2, "ibigawa": _2, "ikeda": _2, "kakamigahara": _2, "kani": _2, "kasahara": _2, "kasamatsu": _2, "kawaue": _2, "kitagata": _2, "mino": _2, "minokamo": _2, "mitake": _2, "mizunami": _2, "motosu": _2, "nakatsugawa": _2, "ogaki": _2, "sakahogi": _2, "seki": _2, "sekigahara": _2, "shirakawa": _2, "tajimi": _2, "takayama": _2, "tarui": _2, "toki": _2, "tomika": _2, "wanouchi": _2, "yamagata": _2, "yaotsu": _2, "yoro": _2 }], "gunma": [1, { "annaka": _2, "chiyoda": _2, "fujioka": _2, "higashiagatsuma": _2, "isesaki": _2, "itakura": _2, "kanna": _2, "kanra": _2, "katashina": _2, "kawaba": _2, "kiryu": _2, "kusatsu": _2, "maebashi": _2, "meiwa": _2, "midori": _2, "minakami": _2, "naganohara": _2, "nakanojo": _2, "nanmoku": _2, "numata": _2, "oizumi": _2, "ora": _2, "ota": _2, "shibukawa": _2, "shimonita": _2, "shinto": _2, "showa": _2, "takasaki": _2, "takayama": _2, "tamamura": _2, "tatebayashi": _2, "tomioka": _2, "tsukiyono": _2, "tsumagoi": _2, "ueno": _2, "yoshioka": _2 }], "hiroshima": [1, { "asaminami": _2, "daiwa": _2, "etajima": _2, "fuchu": _2, "fukuyama": _2, "hatsukaichi": _2, "higashihiroshima": _2, "hongo": _2, "jinsekikogen": _2, "kaita": _2, "kui": _2, "kumano": _2, "kure": _2, "mihara": _2, "miyoshi": _2, "naka": _2, "onomichi": _2, "osakikamijima": _2, "otake": _2, "saka": _2, "sera": _2, "seranishi": _2, "shinichi": _2, "shobara": _2, "takehara": _2 }], "hokkaido": [1, { "abashiri": _2, "abira": _2, "aibetsu": _2, "akabira": _2, "akkeshi": _2, "asahikawa": _2, "ashibetsu": _2, "ashoro": _2, "assabu": _2, "atsuma": _2, "bibai": _2, "biei": _2, "bifuka": _2, "bihoro": _2, "biratori": _2, "chippubetsu": _2, "chitose": _2, "date": _2, "ebetsu": _2, "embetsu": _2, "eniwa": _2, "erimo": _2, "esan": _2, "esashi": _2, "fukagawa": _2, "fukushima": _2, "furano": _2, "furubira": _2, "haboro": _2, "hakodate": _2, "hamatonbetsu": _2, "hidaka": _2, "higashikagura": _2, "higashikawa": _2, "hiroo": _2, "hokuryu": _2, "hokuto": _2, "honbetsu": _2, "horokanai": _2, "horonobe": _2, "ikeda": _2, "imakane": _2, "ishikari": _2, "iwamizawa": _2, "iwanai": _2, "kamifurano": _2, "kamikawa": _2, "kamishihoro": _2, "kamisunagawa": _2, "kamoenai": _2, "kayabe": _2, "kembuchi": _2, "kikonai": _2, "kimobetsu": _2, "kitahiroshima": _2, "kitami": _2, "kiyosato": _2, "koshimizu": _2, "kunneppu": _2, "kuriyama": _2, "kuromatsunai": _2, "kushiro": _2, "kutchan": _2, "kyowa": _2, "mashike": _2, "matsumae": _2, "mikasa": _2, "minamifurano": _2, "mombetsu": _2, "moseushi": _2, "mukawa": _2, "muroran": _2, "naie": _2, "nakagawa": _2, "nakasatsunai": _2, "nakatombetsu": _2, "nanae": _2, "nanporo": _2, "nayoro": _2, "nemuro": _2, "niikappu": _2, "niki": _2, "nishiokoppe": _2, "noboribetsu": _2, "numata": _2, "obihiro": _2, "obira": _2, "oketo": _2, "okoppe": _2, "otaru": _2, "otobe": _2, "otofuke": _2, "otoineppu": _2, "oumu": _2, "ozora": _2, "pippu": _2, "rankoshi": _2, "rebun": _2, "rikubetsu": _2, "rishiri": _2, "rishirifuji": _2, "saroma": _2, "sarufutsu": _2, "shakotan": _2, "shari": _2, "shibecha": _2, "shibetsu": _2, "shikabe": _2, "shikaoi": _2, "shimamaki": _2, "shimizu": _2, "shimokawa": _2, "shinshinotsu": _2, "shintoku": _2, "shiranuka": _2, "shiraoi": _2, "shiriuchi": _2, "sobetsu": _2, "sunagawa": _2, "taiki": _2, "takasu": _2, "takikawa": _2, "takinoue": _2, "teshikaga": _2, "tobetsu": _2, "tohma": _2, "tomakomai": _2, "tomari": _2, "toya": _2, "toyako": _2, "toyotomi": _2, "toyoura": _2, "tsubetsu": _2, "tsukigata": _2, "urakawa": _2, "urausu": _2, "uryu": _2, "utashinai": _2, "wakkanai": _2, "wassamu": _2, "yakumo": _2, "yoichi": _2 }], "hyogo": [1, { "aioi": _2, "akashi": _2, "ako": _2, "amagasaki": _2, "aogaki": _2, "asago": _2, "ashiya": _2, "awaji": _2, "fukusaki": _2, "goshiki": _2, "harima": _2, "himeji": _2, "ichikawa": _2, "inagawa": _2, "itami": _2, "kakogawa": _2, "kamigori": _2, "kamikawa": _2, "kasai": _2, "kasuga": _2, "kawanishi": _2, "miki": _2, "minamiawaji": _2, "nishinomiya": _2, "nishiwaki": _2, "ono": _2, "sanda": _2, "sannan": _2, "sasayama": _2, "sayo": _2, "shingu": _2, "shinonsen": _2, "shiso": _2, "sumoto": _2, "taishi": _2, "taka": _2, "takarazuka": _2, "takasago": _2, "takino": _2, "tamba": _2, "tatsuno": _2, "toyooka": _2, "yabu": _2, "yashiro": _2, "yoka": _2, "yokawa": _2 }], "ibaraki": [1, { "ami": _2, "asahi": _2, "bando": _2, "chikusei": _2, "daigo": _2, "fujishiro": _2, "hitachi": _2, "hitachinaka": _2, "hitachiomiya": _2, "hitachiota": _2, "ibaraki": _2, "ina": _2, "inashiki": _2, "itako": _2, "iwama": _2, "joso": _2, "kamisu": _2, "kasama": _2, "kashima": _2, "kasumigaura": _2, "koga": _2, "miho": _2, "mito": _2, "moriya": _2, "naka": _2, "namegata": _2, "oarai": _2, "ogawa": _2, "omitama": _2, "ryugasaki": _2, "sakai": _2, "sakuragawa": _2, "shimodate": _2, "shimotsuma": _2, "shirosato": _2, "sowa": _2, "suifu": _2, "takahagi": _2, "tamatsukuri": _2, "tokai": _2, "tomobe": _2, "tone": _2, "toride": _2, "tsuchiura": _2, "tsukuba": _2, "uchihara": _2, "ushiku": _2, "yachiyo": _2, "yamagata": _2, "yawara": _2, "yuki": _2 }], "ishikawa": [1, { "anamizu": _2, "hakui": _2, "hakusan": _2, "kaga": _2, "kahoku": _2, "kanazawa": _2, "kawakita": _2, "komatsu": _2, "nakanoto": _2, "nanao": _2, "nomi": _2, "nonoichi": _2, "noto": _2, "shika": _2, "suzu": _2, "tsubata": _2, "tsurugi": _2, "uchinada": _2, "wajima": _2 }], "iwate": [1, { "fudai": _2, "fujisawa": _2, "hanamaki": _2, "hiraizumi": _2, "hirono": _2, "ichinohe": _2, "ichinoseki": _2, "iwaizumi": _2, "iwate": _2, "joboji": _2, "kamaishi": _2, "kanegasaki": _2, "karumai": _2, "kawai": _2, "kitakami": _2, "kuji": _2, "kunohe": _2, "kuzumaki": _2, "miyako": _2, "mizusawa": _2, "morioka": _2, "ninohe": _2, "noda": _2, "ofunato": _2, "oshu": _2, "otsuchi": _2, "rikuzentakata": _2, "shiwa": _2, "shizukuishi": _2, "sumita": _2, "tanohata": _2, "tono": _2, "yahaba": _2, "yamada": _2 }], "kagawa": [1, { "ayagawa": _2, "higashikagawa": _2, "kanonji": _2, "kotohira": _2, "manno": _2, "marugame": _2, "mitoyo": _2, "naoshima": _2, "sanuki": _2, "tadotsu": _2, "takamatsu": _2, "tonosho": _2, "uchinomi": _2, "utazu": _2, "zentsuji": _2 }], "kagoshima": [1, { "akune": _2, "amami": _2, "hioki": _2, "isa": _2, "isen": _2, "izumi": _2, "kagoshima": _2, "kanoya": _2, "kawanabe": _2, "kinko": _2, "kouyama": _2, "makurazaki": _2, "matsumoto": _2, "minamitane": _2, "nakatane": _2, "nishinoomote": _2, "satsumasendai": _2, "soo": _2, "tarumizu": _2, "yusui": _2 }], "kanagawa": [1, { "aikawa": _2, "atsugi": _2, "ayase": _2, "chigasaki": _2, "ebina": _2, "fujisawa": _2, "hadano": _2, "hakone": _2, "hiratsuka": _2, "isehara": _2, "kaisei": _2, "kamakura": _2, "kiyokawa": _2, "matsuda": _2, "minamiashigara": _2, "miura": _2, "nakai": _2, "ninomiya": _2, "odawara": _2, "oi": _2, "oiso": _2, "sagamihara": _2, "samukawa": _2, "tsukui": _2, "yamakita": _2, "yamato": _2, "yokosuka": _2, "yugawara": _2, "zama": _2, "zushi": _2 }], "kochi": [1, { "aki": _2, "geisei": _2, "hidaka": _2, "higashitsuno": _2, "ino": _2, "kagami": _2, "kami": _2, "kitagawa": _2, "kochi": _2, "mihara": _2, "motoyama": _2, "muroto": _2, "nahari": _2, "nakamura": _2, "nankoku": _2, "nishitosa": _2, "niyodogawa": _2, "ochi": _2, "okawa": _2, "otoyo": _2, "otsuki": _2, "sakawa": _2, "sukumo": _2, "susaki": _2, "tosa": _2, "tosashimizu": _2, "toyo": _2, "tsuno": _2, "umaji": _2, "yasuda": _2, "yusuhara": _2 }], "kumamoto": [1, { "amakusa": _2, "arao": _2, "aso": _2, "choyo": _2, "gyokuto": _2, "kamiamakusa": _2, "kikuchi": _2, "kumamoto": _2, "mashiki": _2, "mifune": _2, "minamata": _2, "minamioguni": _2, "nagasu": _2, "nishihara": _2, "oguni": _2, "ozu": _2, "sumoto": _2, "takamori": _2, "uki": _2, "uto": _2, "yamaga": _2, "yamato": _2, "yatsushiro": _2 }], "kyoto": [1, { "ayabe": _2, "fukuchiyama": _2, "higashiyama": _2, "ide": _2, "ine": _2, "joyo": _2, "kameoka": _2, "kamo": _2, "kita": _2, "kizu": _2, "kumiyama": _2, "kyotamba": _2, "kyotanabe": _2, "kyotango": _2, "maizuru": _2, "minami": _2, "minamiyamashiro": _2, "miyazu": _2, "muko": _2, "nagaokakyo": _2, "nakagyo": _2, "nantan": _2, "oyamazaki": _2, "sakyo": _2, "seika": _2, "tanabe": _2, "uji": _2, "ujitawara": _2, "wazuka": _2, "yamashina": _2, "yawata": _2 }], "mie": [1, { "asahi": _2, "inabe": _2, "ise": _2, "kameyama": _2, "kawagoe": _2, "kiho": _2, "kisosaki": _2, "kiwa": _2, "komono": _2, "kumano": _2, "kuwana": _2, "matsusaka": _2, "meiwa": _2, "mihama": _2, "minamiise": _2, "misugi": _2, "miyama": _2, "nabari": _2, "shima": _2, "suzuka": _2, "tado": _2, "taiki": _2, "taki": _2, "tamaki": _2, "toba": _2, "tsu": _2, "udono": _2, "ureshino": _2, "watarai": _2, "yokkaichi": _2 }], "miyagi": [1, { "furukawa": _2, "higashimatsushima": _2, "ishinomaki": _2, "iwanuma": _2, "kakuda": _2, "kami": _2, "kawasaki": _2, "marumori": _2, "matsushima": _2, "minamisanriku": _2, "misato": _2, "murata": _2, "natori": _2, "ogawara": _2, "ohira": _2, "onagawa": _2, "osaki": _2, "rifu": _2, "semine": _2, "shibata": _2, "shichikashuku": _2, "shikama": _2, "shiogama": _2, "shiroishi": _2, "tagajo": _2, "taiwa": _2, "tome": _2, "tomiya": _2, "wakuya": _2, "watari": _2, "yamamoto": _2, "zao": _2 }], "miyazaki": [1, { "aya": _2, "ebino": _2, "gokase": _2, "hyuga": _2, "kadogawa": _2, "kawaminami": _2, "kijo": _2, "kitagawa": _2, "kitakata": _2, "kitaura": _2, "kobayashi": _2, "kunitomi": _2, "kushima": _2, "mimata": _2, "miyakonojo": _2, "miyazaki": _2, "morotsuka": _2, "nichinan": _2, "nishimera": _2, "nobeoka": _2, "saito": _2, "shiiba": _2, "shintomi": _2, "takaharu": _2, "takanabe": _2, "takazaki": _2, "tsuno": _2 }], "nagano": [1, { "achi": _2, "agematsu": _2, "anan": _2, "aoki": _2, "asahi": _2, "azumino": _2, "chikuhoku": _2, "chikuma": _2, "chino": _2, "fujimi": _2, "hakuba": _2, "hara": _2, "hiraya": _2, "iida": _2, "iijima": _2, "iiyama": _2, "iizuna": _2, "ikeda": _2, "ikusaka": _2, "ina": _2, "karuizawa": _2, "kawakami": _2, "kiso": _2, "kisofukushima": _2, "kitaaiki": _2, "komagane": _2, "komoro": _2, "matsukawa": _2, "matsumoto": _2, "miasa": _2, "minamiaiki": _2, "minamimaki": _2, "minamiminowa": _2, "minowa": _2, "miyada": _2, "miyota": _2, "mochizuki": _2, "nagano": _2, "nagawa": _2, "nagiso": _2, "nakagawa": _2, "nakano": _2, "nozawaonsen": _2, "obuse": _2, "ogawa": _2, "okaya": _2, "omachi": _2, "omi": _2, "ookuwa": _2, "ooshika": _2, "otaki": _2, "otari": _2, "sakae": _2, "sakaki": _2, "saku": _2, "sakuho": _2, "shimosuwa": _2, "shinanomachi": _2, "shiojiri": _2, "suwa": _2, "suzaka": _2, "takagi": _2, "takamori": _2, "takayama": _2, "tateshina": _2, "tatsuno": _2, "togakushi": _2, "togura": _2, "tomi": _2, "ueda": _2, "wada": _2, "yamagata": _2, "yamanouchi": _2, "yasaka": _2, "yasuoka": _2 }], "nagasaki": [1, { "chijiwa": _2, "futsu": _2, "goto": _2, "hasami": _2, "hirado": _2, "iki": _2, "isahaya": _2, "kawatana": _2, "kuchinotsu": _2, "matsuura": _2, "nagasaki": _2, "obama": _2, "omura": _2, "oseto": _2, "saikai": _2, "sasebo": _2, "seihi": _2, "shimabara": _2, "shinkamigoto": _2, "togitsu": _2, "tsushima": _2, "unzen": _2 }], "nara": [1, { "ando": _2, "gose": _2, "heguri": _2, "higashiyoshino": _2, "ikaruga": _2, "ikoma": _2, "kamikitayama": _2, "kanmaki": _2, "kashiba": _2, "kashihara": _2, "katsuragi": _2, "kawai": _2, "kawakami": _2, "kawanishi": _2, "koryo": _2, "kurotaki": _2, "mitsue": _2, "miyake": _2, "nara": _2, "nosegawa": _2, "oji": _2, "ouda": _2, "oyodo": _2, "sakurai": _2, "sango": _2, "shimoichi": _2, "shimokitayama": _2, "shinjo": _2, "soni": _2, "takatori": _2, "tawaramoto": _2, "tenkawa": _2, "tenri": _2, "uda": _2, "yamatokoriyama": _2, "yamatotakada": _2, "yamazoe": _2, "yoshino": _2 }], "niigata": [1, { "aga": _2, "agano": _2, "gosen": _2, "itoigawa": _2, "izumozaki": _2, "joetsu": _2, "kamo": _2, "kariwa": _2, "kashiwazaki": _2, "minamiuonuma": _2, "mitsuke": _2, "muika": _2, "murakami": _2, "myoko": _2, "nagaoka": _2, "niigata": _2, "ojiya": _2, "omi": _2, "sado": _2, "sanjo": _2, "seiro": _2, "seirou": _2, "sekikawa": _2, "shibata": _2, "tagami": _2, "tainai": _2, "tochio": _2, "tokamachi": _2, "tsubame": _2, "tsunan": _2, "uonuma": _2, "yahiko": _2, "yoita": _2, "yuzawa": _2 }], "oita": [1, { "beppu": _2, "bungoono": _2, "bungotakada": _2, "hasama": _2, "hiji": _2, "himeshima": _2, "hita": _2, "kamitsue": _2, "kokonoe": _2, "kuju": _2, "kunisaki": _2, "kusu": _2, "oita": _2, "saiki": _2, "taketa": _2, "tsukumi": _2, "usa": _2, "usuki": _2, "yufu": _2 }], "okayama": [1, { "akaiwa": _2, "asakuchi": _2, "bizen": _2, "hayashima": _2, "ibara": _2, "kagamino": _2, "kasaoka": _2, "kibichuo": _2, "kumenan": _2, "kurashiki": _2, "maniwa": _2, "misaki": _2, "nagi": _2, "niimi": _2, "nishiawakura": _2, "okayama": _2, "satosho": _2, "setouchi": _2, "shinjo": _2, "shoo": _2, "soja": _2, "takahashi": _2, "tamano": _2, "tsuyama": _2, "wake": _2, "yakage": _2 }], "okinawa": [1, { "aguni": _2, "ginowan": _2, "ginoza": _2, "gushikami": _2, "haebaru": _2, "higashi": _2, "hirara": _2, "iheya": _2, "ishigaki": _2, "ishikawa": _2, "itoman": _2, "izena": _2, "kadena": _2, "kin": _2, "kitadaito": _2, "kitanakagusuku": _2, "kumejima": _2, "kunigami": _2, "minamidaito": _2, "motobu": _2, "nago": _2, "naha": _2, "nakagusuku": _2, "nakijin": _2, "nanjo": _2, "nishihara": _2, "ogimi": _2, "okinawa": _2, "onna": _2, "shimoji": _2, "taketomi": _2, "tarama": _2, "tokashiki": _2, "tomigusuku": _2, "tonaki": _2, "urasoe": _2, "uruma": _2, "yaese": _2, "yomitan": _2, "yonabaru": _2, "yonaguni": _2, "zamami": _2 }], "osaka": [1, { "abeno": _2, "chihayaakasaka": _2, "chuo": _2, "daito": _2, "fujiidera": _2, "habikino": _2, "hannan": _2, "higashiosaka": _2, "higashisumiyoshi": _2, "higashiyodogawa": _2, "hirakata": _2, "ibaraki": _2, "ikeda": _2, "izumi": _2, "izumiotsu": _2, "izumisano": _2, "kadoma": _2, "kaizuka": _2, "kanan": _2, "kashiwara": _2, "katano": _2, "kawachinagano": _2, "kishiwada": _2, "kita": _2, "kumatori": _2, "matsubara": _2, "minato": _2, "minoh": _2, "misaki": _2, "moriguchi": _2, "neyagawa": _2, "nishi": _2, "nose": _2, "osakasayama": _2, "sakai": _2, "sayama": _2, "sennan": _2, "settsu": _2, "shijonawate": _2, "shimamoto": _2, "suita": _2, "tadaoka": _2, "taishi": _2, "tajiri": _2, "takaishi": _2, "takatsuki": _2, "tondabayashi": _2, "toyonaka": _2, "toyono": _2, "yao": _2 }], "saga": [1, { "ariake": _2, "arita": _2, "fukudomi": _2, "genkai": _2, "hamatama": _2, "hizen": _2, "imari": _2, "kamimine": _2, "kanzaki": _2, "karatsu": _2, "kashima": _2, "kitagata": _2, "kitahata": _2, "kiyama": _2, "kouhoku": _2, "kyuragi": _2, "nishiarita": _2, "ogi": _2, "omachi": _2, "ouchi": _2, "saga": _2, "shiroishi": _2, "taku": _2, "tara": _2, "tosu": _2, "yoshinogari": _2 }], "saitama": [1, { "arakawa": _2, "asaka": _2, "chichibu": _2, "fujimi": _2, "fujimino": _2, "fukaya": _2, "hanno": _2, "hanyu": _2, "hasuda": _2, "hatogaya": _2, "hatoyama": _2, "hidaka": _2, "higashichichibu": _2, "higashimatsuyama": _2, "honjo": _2, "ina": _2, "iruma": _2, "iwatsuki": _2, "kamiizumi": _2, "kamikawa": _2, "kamisato": _2, "kasukabe": _2, "kawagoe": _2, "kawaguchi": _2, "kawajima": _2, "kazo": _2, "kitamoto": _2, "koshigaya": _2, "kounosu": _2, "kuki": _2, "kumagaya": _2, "matsubushi": _2, "minano": _2, "misato": _2, "miyashiro": _2, "miyoshi": _2, "moroyama": _2, "nagatoro": _2, "namegawa": _2, "niiza": _2, "ogano": _2, "ogawa": _2, "ogose": _2, "okegawa": _2, "omiya": _2, "otaki": _2, "ranzan": _2, "ryokami": _2, "saitama": _2, "sakado": _2, "satte": _2, "sayama": _2, "shiki": _2, "shiraoka": _2, "soka": _2, "sugito": _2, "toda": _2, "tokigawa": _2, "tokorozawa": _2, "tsurugashima": _2, "urawa": _2, "warabi": _2, "yashio": _2, "yokoze": _2, "yono": _2, "yorii": _2, "yoshida": _2, "yoshikawa": _2, "yoshimi": _2 }], "shiga": [1, { "aisho": _2, "gamo": _2, "higashiomi": _2, "hikone": _2, "koka": _2, "konan": _2, "kosei": _2, "koto": _2, "kusatsu": _2, "maibara": _2, "moriyama": _2, "nagahama": _2, "nishiazai": _2, "notogawa": _2, "omihachiman": _2, "otsu": _2, "ritto": _2, "ryuoh": _2, "takashima": _2, "takatsuki": _2, "torahime": _2, "toyosato": _2, "yasu": _2 }], "shimane": [1, { "akagi": _2, "ama": _2, "gotsu": _2, "hamada": _2, "higashiizumo": _2, "hikawa": _2, "hikimi": _2, "izumo": _2, "kakinoki": _2, "masuda": _2, "matsue": _2, "misato": _2, "nishinoshima": _2, "ohda": _2, "okinoshima": _2, "okuizumo": _2, "shimane": _2, "tamayu": _2, "tsuwano": _2, "unnan": _2, "yakumo": _2, "yasugi": _2, "yatsuka": _2 }], "shizuoka": [1, { "arai": _2, "atami": _2, "fuji": _2, "fujieda": _2, "fujikawa": _2, "fujinomiya": _2, "fukuroi": _2, "gotemba": _2, "haibara": _2, "hamamatsu": _2, "higashiizu": _2, "ito": _2, "iwata": _2, "izu": _2, "izunokuni": _2, "kakegawa": _2, "kannami": _2, "kawanehon": _2, "kawazu": _2, "kikugawa": _2, "kosai": _2, "makinohara": _2, "matsuzaki": _2, "minamiizu": _2, "mishima": _2, "morimachi": _2, "nishiizu": _2, "numazu": _2, "omaezaki": _2, "shimada": _2, "shimizu": _2, "shimoda": _2, "shizuoka": _2, "susono": _2, "yaizu": _2, "yoshida": _2 }], "tochigi": [1, { "ashikaga": _2, "bato": _2, "haga": _2, "ichikai": _2, "iwafune": _2, "kaminokawa": _2, "kanuma": _2, "karasuyama": _2, "kuroiso": _2, "mashiko": _2, "mibu": _2, "moka": _2, "motegi": _2, "nasu": _2, "nasushiobara": _2, "nikko": _2, "nishikata": _2, "nogi": _2, "ohira": _2, "ohtawara": _2, "oyama": _2, "sakura": _2, "sano": _2, "shimotsuke": _2, "shioya": _2, "takanezawa": _2, "tochigi": _2, "tsuga": _2, "ujiie": _2, "utsunomiya": _2, "yaita": _2 }], "tokushima": [1, { "aizumi": _2, "anan": _2, "ichiba": _2, "itano": _2, "kainan": _2, "komatsushima": _2, "matsushige": _2, "mima": _2, "minami": _2, "miyoshi": _2, "mugi": _2, "nakagawa": _2, "naruto": _2, "sanagochi": _2, "shishikui": _2, "tokushima": _2, "wajiki": _2 }], "tokyo": [1, { "adachi": _2, "akiruno": _2, "akishima": _2, "aogashima": _2, "arakawa": _2, "bunkyo": _2, "chiyoda": _2, "chofu": _2, "chuo": _2, "edogawa": _2, "fuchu": _2, "fussa": _2, "hachijo": _2, "hachioji": _2, "hamura": _2, "higashikurume": _2, "higashimurayama": _2, "higashiyamato": _2, "hino": _2, "hinode": _2, "hinohara": _2, "inagi": _2, "itabashi": _2, "katsushika": _2, "kita": _2, "kiyose": _2, "kodaira": _2, "koganei": _2, "kokubunji": _2, "komae": _2, "koto": _2, "kouzushima": _2, "kunitachi": _2, "machida": _2, "meguro": _2, "minato": _2, "mitaka": _2, "mizuho": _2, "musashimurayama": _2, "musashino": _2, "nakano": _2, "nerima": _2, "ogasawara": _2, "okutama": _2, "ome": _2, "oshima": _2, "ota": _2, "setagaya": _2, "shibuya": _2, "shinagawa": _2, "shinjuku": _2, "suginami": _2, "sumida": _2, "tachikawa": _2, "taito": _2, "tama": _2, "toshima": _2 }], "tottori": [1, { "chizu": _2, "hino": _2, "kawahara": _2, "koge": _2, "kotoura": _2, "misasa": _2, "nanbu": _2, "nichinan": _2, "sakaiminato": _2, "tottori": _2, "wakasa": _2, "yazu": _2, "yonago": _2 }], "toyama": [1, { "asahi": _2, "fuchu": _2, "fukumitsu": _2, "funahashi": _2, "himi": _2, "imizu": _2, "inami": _2, "johana": _2, "kamiichi": _2, "kurobe": _2, "nakaniikawa": _2, "namerikawa": _2, "nanto": _2, "nyuzen": _2, "oyabe": _2, "taira": _2, "takaoka": _2, "tateyama": _2, "toga": _2, "tonami": _2, "toyama": _2, "unazuki": _2, "uozu": _2, "yamada": _2 }], "wakayama": [1, { "arida": _2, "aridagawa": _2, "gobo": _2, "hashimoto": _2, "hidaka": _2, "hirogawa": _2, "inami": _2, "iwade": _2, "kainan": _2, "kamitonda": _2, "katsuragi": _2, "kimino": _2, "kinokawa": _2, "kitayama": _2, "koya": _2, "koza": _2, "kozagawa": _2, "kudoyama": _2, "kushimoto": _2, "mihama": _2, "misato": _2, "nachikatsuura": _2, "shingu": _2, "shirahama": _2, "taiji": _2, "tanabe": _2, "wakayama": _2, "yuasa": _2, "yura": _2 }], "yamagata": [1, { "asahi": _2, "funagata": _2, "higashine": _2, "iide": _2, "kahoku": _2, "kaminoyama": _2, "kaneyama": _2, "kawanishi": _2, "mamurogawa": _2, "mikawa": _2, "murayama": _2, "nagai": _2, "nakayama": _2, "nanyo": _2, "nishikawa": _2, "obanazawa": _2, "oe": _2, "oguni": _2, "ohkura": _2, "oishida": _2, "sagae": _2, "sakata": _2, "sakegawa": _2, "shinjo": _2, "shirataka": _2, "shonai": _2, "takahata": _2, "tendo": _2, "tozawa": _2, "tsuruoka": _2, "yamagata": _2, "yamanobe": _2, "yonezawa": _2, "yuza": _2 }], "yamaguchi": [1, { "abu": _2, "hagi": _2, "hikari": _2, "hofu": _2, "iwakuni": _2, "kudamatsu": _2, "mitou": _2, "nagato": _2, "oshima": _2, "shimonoseki": _2, "shunan": _2, "tabuse": _2, "tokuyama": _2, "toyota": _2, "ube": _2, "yuu": _2 }], "yamanashi": [1, { "chuo": _2, "doshi": _2, "fuefuki": _2, "fujikawa": _2, "fujikawaguchiko": _2, "fujiyoshida": _2, "hayakawa": _2, "hokuto": _2, "ichikawamisato": _2, "kai": _2, "kofu": _2, "koshu": _2, "kosuge": _2, "minami-alps": _2, "minobu": _2, "nakamichi": _2, "nanbu": _2, "narusawa": _2, "nirasaki": _2, "nishikatsura": _2, "oshino": _2, "otsuki": _2, "showa": _2, "tabayama": _2, "tsuru": _2, "uenohara": _2, "yamanakako": _2, "yamanashi": _2 }], "xn--4pvxs": _2, "\u6803\u6728": _2, "xn--vgu402c": _2, "\u611B\u77E5": _2, "xn--c3s14m": _2, "\u611B\u5A9B": _2, "xn--f6qx53a": _2, "\u5175\u5EAB": _2, "xn--8pvr4u": _2, "\u718A\u672C": _2, "xn--uist22h": _2, "\u8328\u57CE": _2, "xn--djrs72d6uy": _2, "\u5317\u6D77\u9053": _2, "xn--mkru45i": _2, "\u5343\u8449": _2, "xn--0trq7p7nn": _2, "\u548C\u6B4C\u5C71": _2, "xn--8ltr62k": _2, "\u9577\u5D0E": _2, "xn--2m4a15e": _2, "\u9577\u91CE": _2, "xn--efvn9s": _2, "\u65B0\u6F5F": _2, "xn--32vp30h": _2, "\u9752\u68EE": _2, "xn--4it797k": _2, "\u9759\u5CA1": _2, "xn--1lqs71d": _2, "\u6771\u4EAC": _2, "xn--5rtp49c": _2, "\u77F3\u5DDD": _2, "xn--5js045d": _2, "\u57FC\u7389": _2, "xn--ehqz56n": _2, "\u4E09\u91CD": _2, "xn--1lqs03n": _2, "\u4EAC\u90FD": _2, "xn--qqqt11m": _2, "\u4F50\u8CC0": _2, "xn--kbrq7o": _2, "\u5927\u5206": _2, "xn--pssu33l": _2, "\u5927\u962A": _2, "xn--ntsq17g": _2, "\u5948\u826F": _2, "xn--uisz3g": _2, "\u5BAE\u57CE": _2, "xn--6btw5a": _2, "\u5BAE\u5D0E": _2, "xn--1ctwo": _2, "\u5BCC\u5C71": _2, "xn--6orx2r": _2, "\u5C71\u53E3": _2, "xn--rht61e": _2, "\u5C71\u5F62": _2, "xn--rht27z": _2, "\u5C71\u68A8": _2, "xn--djty4k": _2, "\u5CA9\u624B": _2, "xn--nit225k": _2, "\u5C90\u961C": _2, "xn--rht3d": _2, "\u5CA1\u5C71": _2, "xn--klty5x": _2, "\u5CF6\u6839": _2, "xn--kltx9a": _2, "\u5E83\u5CF6": _2, "xn--kltp7d": _2, "\u5FB3\u5CF6": _2, "xn--uuwu58a": _2, "\u6C96\u7E04": _2, "xn--zbx025d": _2, "\u6ECB\u8CC0": _2, "xn--ntso0iqx3a": _2, "\u795E\u5948\u5DDD": _2, "xn--elqq16h": _2, "\u798F\u4E95": _2, "xn--4it168d": _2, "\u798F\u5CA1": _2, "xn--klt787d": _2, "\u798F\u5CF6": _2, "xn--rny31h": _2, "\u79CB\u7530": _2, "xn--7t0a264c": _2, "\u7FA4\u99AC": _2, "xn--5rtq34k": _2, "\u9999\u5DDD": _2, "xn--k7yn95e": _2, "\u9AD8\u77E5": _2, "xn--tor131o": _2, "\u9CE5\u53D6": _2, "xn--d5qv7z876c": _2, "\u9E7F\u5150\u5CF6": _2, "kawasaki": _16, "kitakyushu": _16, "kobe": _16, "nagoya": _16, "sapporo": _16, "sendai": _16, "yokohama": _16, "buyshop": _3, "fashionstore": _3, "handcrafted": _3, "kawaiishop": _3, "supersale": _3, "theshop": _3, "0am": _3, "0g0": _3, "0j0": _3, "0t0": _3, "mydns": _3, "pgw": _3, "wjg": _3, "usercontent": _3, "angry": _3, "babyblue": _3, "babymilk": _3, "backdrop": _3, "bambina": _3, "bitter": _3, "blush": _3, "boo": _3, "boy": _3, "boyfriend": _3, "but": _3, "candypop": _3, "capoo": _3, "catfood": _3, "cheap": _3, "chicappa": _3, "chillout": _3, "chips": _3, "chowder": _3, "chu": _3, "ciao": _3, "cocotte": _3, "coolblog": _3, "cranky": _3, "cutegirl": _3, "daa": _3, "deca": _3, "deci": _3, "digick": _3, "egoism": _3, "fakefur": _3, "fem": _3, "flier": _3, "floppy": _3, "fool": _3, "frenchkiss": _3, "girlfriend": _3, "girly": _3, "gloomy": _3, "gonna": _3, "greater": _3, "hacca": _3, "heavy": _3, "her": _3, "hiho": _3, "hippy": _3, "holy": _3, "hungry": _3, "icurus": _3, "itigo": _3, "jellybean": _3, "kikirara": _3, "kill": _3, "kilo": _3, "kuron": _3, "littlestar": _3, "lolipopmc": _3, "lolitapunk": _3, "lomo": _3, "lovepop": _3, "lovesick": _3, "main": _3, "mods": _3, "mond": _3, "mongolian": _3, "moo": _3, "namaste": _3, "nikita": _3, "nobushi": _3, "noor": _3, "oops": _3, "parallel": _3, "parasite": _3, "pecori": _3, "peewee": _3, "penne": _3, "pepper": _3, "perma": _3, "pigboat": _3, "pinoko": _3, "punyu": _3, "pupu": _3, "pussycat": _3, "pya": _3, "raindrop": _3, "readymade": _3, "sadist": _3, "schoolbus": _3, "secret": _3, "staba": _3, "stripper": _3, "sub": _3, "sunnyday": _3, "thick": _3, "tonkotsu": _3, "under": _3, "upper": _3, "velvet": _3, "verse": _3, "versus": _3, "vivian": _3, "watson": _3, "weblike": _3, "whitesnow": _3, "zombie": _3, "blogspot": _3, "2-d": _3, "bona": _3, "crap": _3, "daynight": _3, "eek": _3, "flop": _3, "halfmoon": _3, "jeez": _3, "matrix": _3, "mimoza": _3, "netgamers": _3, "nyanta": _3, "o0o0": _3, "rdy": _3, "rgr": _3, "rulez": _3, "sakurastorage": [0, { "isk01": _52, "isk02": _52 }], "saloon": _3, "sblo": _3, "skr": _3, "tank": _3, "uh-oh": _3, "undo": _3, "webaccel": [0, { "rs": _3, "user": _3 }], "websozai": _3, "xii": _3 }], "ke": [1, { "ac": _2, "co": _9, "go": _2, "info": _2, "me": _2, "mobi": _2, "ne": _2, "or": _2, "sc": _2 }], "kg": [1, { "org": _2, "net": _2, "com": _2, "edu": _2, "gov": _2, "mil": _2, "us": _3 }], "kh": _16, "ki": _53, "km": [1, { "org": _2, "nom": _2, "gov": _2, "prd": _2, "tm": _2, "edu": _2, "mil": _2, "ass": _2, "com": _2, "coop": _2, "asso": _2, "presse": _2, "medecin": _2, "notaires": _2, "pharmaciens": _2, "veterinaire": _2, "gouv": _2 }], "kn": [1, { "net": _2, "org": _2, "edu": _2, "gov": _2 }], "kp": [1, { "com": _2, "edu": _2, "gov": _2, "org": _2, "rep": _2, "tra": _2 }], "kr": [1, { "ac": _2, "co": _2, "es": _2, "go": _2, "hs": _2, "kg": _2, "mil": _2, "ms": _2, "ne": _2, "or": _2, "pe": _2, "re": _2, "sc": _2, "busan": _2, "chungbuk": _2, "chungnam": _2, "daegu": _2, "daejeon": _2, "gangwon": _2, "gwangju": _2, "gyeongbuk": _2, "gyeonggi": _2, "gyeongnam": _2, "incheon": _2, "jeju": _2, "jeonbuk": _2, "jeonnam": _2, "seoul": _2, "ulsan": _2, "blogspot": _3 }], "kw": [1, { "com": _2, "edu": _2, "emb": _2, "gov": _2, "ind": _2, "net": _2, "org": _2 }], "ky": _43, "kz": [1, { "org": _2, "edu": _2, "net": _2, "gov": _2, "mil": _2, "com": _2, "jcloud": _3, "kazteleport": [0, { "upaas": _3 }] }], "la": [1, { "int": _2, "net": _2, "info": _2, "edu": _2, "gov": _2, "per": _2, "com": _2, "org": _2, "bnr": _3, "c": _3 }], "lb": _4, "lc": [1, { "com": _2, "net": _2, "co": _2, "org": _2, "edu": _2, "gov": _2, "oy": _3 }], "li": [1, { "blogspot": _3, "caa": _3 }], "lk": [1, { "gov": _2, "sch": _2, "net": _2, "int": _2, "com": _2, "org": _2, "edu": _2, "ngo": _2, "soc": _2, "web": _2, "ltd": _2, "assn": _2, "grp": _2, "hotel": _2, "ac": _2 }], "lr": _4, "ls": [1, { "ac": _2, "biz": _2, "co": _2, "edu": _2, "gov": _2, "info": _2, "net": _2, "org": _2, "sc": _2 }], "lt": _54, "lu": [1, { "blogspot": _3, "123website": _3 }], "lv": [1, { "com": _2, "edu": _2, "gov": _2, "org": _2, "mil": _2, "id": _2, "net": _2, "asn": _2, "conf": _2 }], "ly": [1, { "com": _2, "net": _2, "gov": _2, "plc": _2, "edu": _2, "sch": _2, "med": _2, "org": _2, "id": _2 }], "ma": [1, { "co": _2, "net": _2, "gov": _2, "org": _2, "ac": _2, "press": _2 }], "mc": [1, { "tm": _2, "asso": _2 }], "md": [1, { "blogspot": _3, "ir": _3 }], "me": [1, { "co": _2, "net": _2, "org": _2, "edu": _2, "ac": _2, "gov": _2, "its": _2, "priv": _2, "c66": _3, "daplie": [2, { "localhost": _3 }], "edgestack": _3, "filegear": _3, "filegear-au": _3, "filegear-de": _3, "filegear-gb": _3, "filegear-ie": _3, "filegear-jp": _3, "filegear-sg": _3, "glitch": _3, "lohmus": _3, "barsy": _3, "mcpe": _3, "mcdir": _3, "soundcast": _3, "tcp4": _3, "brasilia": _3, "ddns": _3, "dnsfor": _3, "hopto": _3, "loginto": _3, "noip": _3, "webhop": _3, "vp4": _3, "diskstation": _3, "dscloud": _3, "i234": _3, "myds": _3, "synology": _3, "transip": _41, "wedeploy": _3, "yombo": _3, "nohost": _3 }], "mg": [1, { "org": _2, "nom": _2, "gov": _2, "prd": _2, "tm": _2, "edu": _2, "mil": _2, "com": _2, "co": _2 }], "mh": _2, "mil": _2, "mk": [1, { "com": _2, "org": _2, "net": _2, "edu": _2, "gov": _2, "inf": _2, "name": _2, "blogspot": _3 }], "ml": [1, { "com": _2, "edu": _2, "gouv": _2, "gov": _2, "net": _2, "org": _2, "presse": _2 }], "mm": _16, "mn": [1, { "gov": _2, "edu": _2, "org": _2, "nyc": _3 }], "mo": _4, "mobi": [1, { "barsy": _3, "dscloud": _3 }], "mp": [1, { "ju": _3 }], "mq": _2, "mr": _54, "ms": [1, { "com": _2, "edu": _2, "gov": _2, "net": _2, "org": _2, "lab": _3, "minisite": _3 }], "mt": [1, { "com": _9, "edu": _2, "net": _2, "org": _2 }], "mu": [1, { "com": _2, "net": _2, "org": _2, "gov": _2, "ac": _2, "co": _2, "or": _2 }], "museum": _2, "mv": [1, { "aero": _2, "biz": _2, "com": _2, "coop": _2, "edu": _2, "gov": _2, "info": _2, "int": _2, "mil": _2, "museum": _2, "name": _2, "net": _2, "org": _2, "pro": _2 }], "mw": [1, { "ac": _2, "biz": _2, "co": _2, "com": _2, "coop": _2, "edu": _2, "gov": _2, "int": _2, "museum": _2, "net": _2, "org": _2 }], "mx": [1, { "com": _2, "org": _2, "gob": _2, "edu": _2, "net": _2, "blogspot": _3 }], "my": [1, { "biz": _2, "com": _2, "edu": _2, "gov": _2, "mil": _2, "name": _2, "net": _2, "org": _2, "blogspot": _3 }], "mz": [1, { "ac": _2, "adv": _2, "co": _2, "edu": _2, "gov": _2, "mil": _2, "net": _2, "org": _2 }], "na": [1, { "info": _2, "pro": _2, "name": _2, "school": _2, "or": _2, "dr": _2, "us": _2, "mx": _2, "ca": _2, "in": _2, "cc": _2, "tv": _2, "ws": _2, "mobi": _2, "co": _2, "com": _2, "org": _2 }], "name": [1, { "her": _56, "his": _56 }], "nc": [1, { "asso": _2, "nom": _2 }], "ne": _2, "net": [1, { "adobeaemcloud": _3, "adobeio-static": _3, "adobeioruntime": _3, "akadns": _3, "akamai": _3, "akamai-staging": _3, "akamaiedge": _3, "akamaiedge-staging": _3, "akamaihd": _3, "akamaihd-staging": _3, "akamaiorigin": _3, "akamaiorigin-staging": _3, "akamaized": _3, "akamaized-staging": _3, "edgekey": _3, "edgekey-staging": _3, "edgesuite": _3, "edgesuite-staging": _3, "alwaysdata": _3, "myamaze": _3, "cloudfront": _3, "t3l3p0rt": _3, "appudo": _3, "atlassian-dev": [0, { "prod": _57 }], "myfritz": _3, "onavstack": _3, "shopselect": _3, "blackbaudcdn": _3, "boomla": _3, "bplaced": _3, "square7": _3, "gb": _3, "hu": _3, "jp": _3, "se": _3, "uk": _3, "in": _3, "clickrising": _3, "cloudaccess": _3, "cloudflareanycast": _57, "cloudflarecn": _57, "cloudflareglobal": _57, "cloudflare": [2, { "cdn": _3 }], "cdn77": [0, { "r": _3 }], "cdn77-ssl": _3, "dns-cloud": _3, "dns-dynamic": _3, "feste-ip": _3, "knx-server": _3, "static-access": _3, "cryptonomic": _5, "dattolocal": _3, "mydatto": _3, "debian": _3, "bitbridge": _3, "at-band-camp": _3, "blogdns": _3, "broke-it": _3, "buyshouses": _3, "dnsalias": _3, "dnsdojo": _3, "does-it": _3, "dontexist": _3, "dynalias": _3, "dynathome": _3, "endofinternet": _3, "from-az": _3, "from-co": _3, "from-la": _3, "from-ny": _3, "gets-it": _3, "ham-radio-op": _3, "homeftp": _3, "homeip": _3, "homelinux": _3, "homeunix": _3, "in-the-band": _3, "is-a-chef": _3, "is-a-geek": _3, "isa-geek": _3, "kicks-ass": _3, "office-on-the": _3, "podzone": _3, "scrapper-site": _3, "selfip": _3, "sells-it": _3, "servebbs": _3, "serveftp": _3, "thruhere": _3, "webhop": _3, "definima": _3, "casacam": _3, "dynu": _3, "dynv6": _3, "twmail": _3, "ru": _3, "channelsdvr": [2, { "u": _3 }], "fastly": [0, { "freetls": _3, "map": _3, "prod": [0, { "a": _3, "global": _3 }], "ssl": [0, { "a": _3, "b": _3, "global": _3 }] }], "fastlylb": [2, { "map": _3 }], "edgeapp": _3, "flynnhosting": _3, "keyword-on": _3, "live-on": _3, "server-on": _3, "cdn-edges": _3, "localcert": _3, "localhostcert": _3, "heteml": _3, "cloudfunctions": _3, "moonscale": _3, "in-dsl": _3, "in-vpn": _3, "ipifony": _3, "iobb": _3, "cloudjiffy": [2, { "fra1-de": _3, "west1-us": _3 }], "elastx": [0, { "jls-sto1": _3, "jls-sto2": _3, "jls-sto3": _3 }], "faststacks": _3, "massivegrid": [0, { "paas": [0, { "fr-1": _3, "lon-1": _3, "lon-2": _3, "ny-1": _3, "ny-2": _3, "sg-1": _3 }] }], "saveincloud": [0, { "jelastic": _3, "nordeste-idc": _3 }], "scaleforce": _44, "tsukaeru": _45, "kinghost": _3, "uni5": _3, "krellian": _3, "barsy": _3, "memset": _3, "azure-api": _3, "azure-mobile": _3, "azureedge": _3, "azurefd": _3, "azurestaticapps": [2, { "1": _3, "2": _3, "3": _3, "4": _3, "5": _3, "6": _3, "7": _3, "centralus": _3, "eastasia": _3, "eastus2": _3, "westeurope": _3, "westus2": _3 }], "azurewebsites": _3, "cloudapp": _3, "trafficmanager": _3, "windows": [0, { "core": [0, { "blob": _3 }], "servicebus": _3 }], "dnsup": _3, "hicam": _3, "now-dns": _3, "ownip": _3, "vpndns": _3, "bounceme": _3, "ddns": _3, "eating-organic": _3, "mydissent": _3, "myeffect": _3, "mymediapc": _3, "mypsx": _3, "mysecuritycamera": _3, "nhlfan": _3, "no-ip": _3, "pgafan": _3, "privatizehealthinsurance": _3, "redirectme": _3, "serveblog": _3, "serveminecraft": _3, "sytes": _3, "cloudycluster": _3, "ovh": [0, { "hosting": _5, "webpaas": _5 }], "myradweb": _3, "rackmaze": _3, "squares": _3, "schokokeks": _3, "firewall-gateway": _3, "seidat": _3, "senseering": _3, "siteleaf": _3, "vps-host": [2, { "jelastic": [0, { "atl": _3, "njs": _3, "ric": _3 }] }], "myspreadshop": _3, "srcf": [0, { "soc": _3, "user": _3 }], "supabase": _3, "dsmynas": _3, "familyds": _3, "tailscale": [0, { "beta": _3 }], "ts": [2, { "c": _5 }], "torproject": [2, { "pages": _3 }], "reserve-online": _3, "community-pro": _3, "meinforum": _3, "yandexcloud": [2, { "storage": _3, "website": _3 }], "za": _3 }], "nf": [1, { "com": _2, "net": _2, "per": _2, "rec": _2, "web": _2, "arts": _2, "firm": _2, "info": _2, "other": _2, "store": _2 }], "ng": [1, { "com": _9, "edu": _2, "gov": _2, "i": _2, "mil": _2, "mobi": _2, "name": _2, "net": _2, "org": _2, "sch": _2, "col": _3, "firm": _3, "gen": _3, "ltd": _3, "ngo": _3 }], "ni": [1, { "ac": _2, "biz": _2, "co": _2, "com": _2, "edu": _2, "gob": _2, "in": _2, "info": _2, "int": _2, "mil": _2, "net": _2, "nom": _2, "org": _2, "web": _2 }], "nl": [1, { "co": _3, "hosting-cluster": _3, "blogspot": _3, "gov": _3, "khplay": _3, "123website": _3, "myspreadshop": _3, "transurl": _5, "cistron": _3, "demon": _3 }], "no": [1, { "fhs": _2, "vgs": _2, "fylkesbibl": _2, "folkebibl": _2, "museum": _2, "idrett": _2, "priv": _2, "mil": _2, "stat": _2, "dep": _2, "kommune": _2, "herad": _2, "aa": _58, "ah": _58, "bu": _58, "fm": _58, "hl": _58, "hm": _58, "jan-mayen": _58, "mr": _58, "nl": _58, "nt": _58, "of": _58, "ol": _58, "oslo": _58, "rl": _58, "sf": _58, "st": _58, "svalbard": _58, "tm": _58, "tr": _58, "va": _58, "vf": _58, "akrehamn": _2, "xn--krehamn-dxa": _2, "\xE5krehamn": _2, "algard": _2, "xn--lgrd-poac": _2, "\xE5lg\xE5rd": _2, "arna": _2, "brumunddal": _2, "bryne": _2, "bronnoysund": _2, "xn--brnnysund-m8ac": _2, "br\xF8nn\xF8ysund": _2, "drobak": _2, "xn--drbak-wua": _2, "dr\xF8bak": _2, "egersund": _2, "fetsund": _2, "floro": _2, "xn--flor-jra": _2, "flor\xF8": _2, "fredrikstad": _2, "hokksund": _2, "honefoss": _2, "xn--hnefoss-q1a": _2, "h\xF8nefoss": _2, "jessheim": _2, "jorpeland": _2, "xn--jrpeland-54a": _2, "j\xF8rpeland": _2, "kirkenes": _2, "kopervik": _2, "krokstadelva": _2, "langevag": _2, "xn--langevg-jxa": _2, "langev\xE5g": _2, "leirvik": _2, "mjondalen": _2, "xn--mjndalen-64a": _2, "mj\xF8ndalen": _2, "mo-i-rana": _2, "mosjoen": _2, "xn--mosjen-eya": _2, "mosj\xF8en": _2, "nesoddtangen": _2, "orkanger": _2, "osoyro": _2, "xn--osyro-wua": _2, "os\xF8yro": _2, "raholt": _2, "xn--rholt-mra": _2, "r\xE5holt": _2, "sandnessjoen": _2, "xn--sandnessjen-ogb": _2, "sandnessj\xF8en": _2, "skedsmokorset": _2, "slattum": _2, "spjelkavik": _2, "stathelle": _2, "stavern": _2, "stjordalshalsen": _2, "xn--stjrdalshalsen-sqb": _2, "stj\xF8rdalshalsen": _2, "tananger": _2, "tranby": _2, "vossevangen": _2, "afjord": _2, "xn--fjord-lra": _2, "\xE5fjord": _2, "agdenes": _2, "al": _2, "xn--l-1fa": _2, "\xE5l": _2, "alesund": _2, "xn--lesund-hua": _2, "\xE5lesund": _2, "alstahaug": _2, "alta": _2, "xn--lt-liac": _2, "\xE1lt\xE1": _2, "alaheadju": _2, "xn--laheadju-7ya": _2, "\xE1laheadju": _2, "alvdal": _2, "amli": _2, "xn--mli-tla": _2, "\xE5mli": _2, "amot": _2, "xn--mot-tla": _2, "\xE5mot": _2, "andebu": _2, "andoy": _2, "xn--andy-ira": _2, "and\xF8y": _2, "andasuolo": _2, "ardal": _2, "xn--rdal-poa": _2, "\xE5rdal": _2, "aremark": _2, "arendal": _2, "xn--s-1fa": _2, "\xE5s": _2, "aseral": _2, "xn--seral-lra": _2, "\xE5seral": _2, "asker": _2, "askim": _2, "askvoll": _2, "askoy": _2, "xn--asky-ira": _2, "ask\xF8y": _2, "asnes": _2, "xn--snes-poa": _2, "\xE5snes": _2, "audnedaln": _2, "aukra": _2, "aure": _2, "aurland": _2, "aurskog-holand": _2, "xn--aurskog-hland-jnb": _2, "aurskog-h\xF8land": _2, "austevoll": _2, "austrheim": _2, "averoy": _2, "xn--avery-yua": _2, "aver\xF8y": _2, "balestrand": _2, "ballangen": _2, "balat": _2, "xn--blt-elab": _2, "b\xE1l\xE1t": _2, "balsfjord": _2, "bahccavuotna": _2, "xn--bhccavuotna-k7a": _2, "b\xE1hccavuotna": _2, "bamble": _2, "bardu": _2, "beardu": _2, "beiarn": _2, "bajddar": _2, "xn--bjddar-pta": _2, "b\xE1jddar": _2, "baidar": _2, "xn--bidr-5nac": _2, "b\xE1id\xE1r": _2, "berg": _2, "bergen": _2, "berlevag": _2, "xn--berlevg-jxa": _2, "berlev\xE5g": _2, "bearalvahki": _2, "xn--bearalvhki-y4a": _2, "bearalv\xE1hki": _2, "bindal": _2, "birkenes": _2, "bjarkoy": _2, "xn--bjarky-fya": _2, "bjark\xF8y": _2, "bjerkreim": _2, "bjugn": _2, "bodo": _2, "xn--bod-2na": _2, "bod\xF8": _2, "badaddja": _2, "xn--bdddj-mrabd": _2, "b\xE5d\xE5ddj\xE5": _2, "budejju": _2, "bokn": _2, "bremanger": _2, "bronnoy": _2, "xn--brnny-wuac": _2, "br\xF8nn\xF8y": _2, "bygland": _2, "bykle": _2, "barum": _2, "xn--brum-voa": _2, "b\xE6rum": _2, "telemark": [0, { "bo": _2, "xn--b-5ga": _2, "b\xF8": _2 }], "nordland": [0, { "bo": _2, "xn--b-5ga": _2, "b\xF8": _2, "heroy": _2, "xn--hery-ira": _2, "her\xF8y": _2 }], "bievat": _2, "xn--bievt-0qa": _2, "biev\xE1t": _2, "bomlo": _2, "xn--bmlo-gra": _2, "b\xF8mlo": _2, "batsfjord": _2, "xn--btsfjord-9za": _2, "b\xE5tsfjord": _2, "bahcavuotna": _2, "xn--bhcavuotna-s4a": _2, "b\xE1hcavuotna": _2, "dovre": _2, "drammen": _2, "drangedal": _2, "dyroy": _2, "xn--dyry-ira": _2, "dyr\xF8y": _2, "donna": _2, "xn--dnna-gra": _2, "d\xF8nna": _2, "eid": _2, "eidfjord": _2, "eidsberg": _2, "eidskog": _2, "eidsvoll": _2, "eigersund": _2, "elverum": _2, "enebakk": _2, "engerdal": _2, "etne": _2, "etnedal": _2, "evenes": _2, "evenassi": _2, "xn--eveni-0qa01ga": _2, "even\xE1\u0161\u0161i": _2, "evje-og-hornnes": _2, "farsund": _2, "fauske": _2, "fuossko": _2, "fuoisku": _2, "fedje": _2, "fet": _2, "finnoy": _2, "xn--finny-yua": _2, "finn\xF8y": _2, "fitjar": _2, "fjaler": _2, "fjell": _2, "flakstad": _2, "flatanger": _2, "flekkefjord": _2, "flesberg": _2, "flora": _2, "fla": _2, "xn--fl-zia": _2, "fl\xE5": _2, "folldal": _2, "forsand": _2, "fosnes": _2, "frei": _2, "frogn": _2, "froland": _2, "frosta": _2, "frana": _2, "xn--frna-woa": _2, "fr\xE6na": _2, "froya": _2, "xn--frya-hra": _2, "fr\xF8ya": _2, "fusa": _2, "fyresdal": _2, "forde": _2, "xn--frde-gra": _2, "f\xF8rde": _2, "gamvik": _2, "gangaviika": _2, "xn--ggaviika-8ya47h": _2, "g\xE1\u014Bgaviika": _2, "gaular": _2, "gausdal": _2, "gildeskal": _2, "xn--gildeskl-g0a": _2, "gildesk\xE5l": _2, "giske": _2, "gjemnes": _2, "gjerdrum": _2, "gjerstad": _2, "gjesdal": _2, "gjovik": _2, "xn--gjvik-wua": _2, "gj\xF8vik": _2, "gloppen": _2, "gol": _2, "gran": _2, "grane": _2, "granvin": _2, "gratangen": _2, "grimstad": _2, "grong": _2, "kraanghke": _2, "xn--kranghke-b0a": _2, "kr\xE5anghke": _2, "grue": _2, "gulen": _2, "hadsel": _2, "halden": _2, "halsa": _2, "hamar": _2, "hamaroy": _2, "habmer": _2, "xn--hbmer-xqa": _2, "h\xE1bmer": _2, "hapmir": _2, "xn--hpmir-xqa": _2, "h\xE1pmir": _2, "hammerfest": _2, "hammarfeasta": _2, "xn--hmmrfeasta-s4ac": _2, "h\xE1mm\xE1rfeasta": _2, "haram": _2, "hareid": _2, "harstad": _2, "hasvik": _2, "aknoluokta": _2, "xn--koluokta-7ya57h": _2, "\xE1k\u014Boluokta": _2, "hattfjelldal": _2, "aarborte": _2, "haugesund": _2, "hemne": _2, "hemnes": _2, "hemsedal": _2, "more-og-romsdal": [0, { "heroy": _2, "sande": _2 }], "xn--mre-og-romsdal-qqb": [0, { "xn--hery-ira": _2, "sande": _2 }], "m\xF8re-og-romsdal": [0, { "her\xF8y": _2, "sande": _2 }], "hitra": _2, "hjartdal": _2, "hjelmeland": _2, "hobol": _2, "xn--hobl-ira": _2, "hob\xF8l": _2, "hof": _2, "hol": _2, "hole": _2, "holmestrand": _2, "holtalen": _2, "xn--holtlen-hxa": _2, "holt\xE5len": _2, "hornindal": _2, "horten": _2, "hurdal": _2, "hurum": _2, "hvaler": _2, "hyllestad": _2, "hagebostad": _2, "xn--hgebostad-g3a": _2, "h\xE6gebostad": _2, "hoyanger": _2, "xn--hyanger-q1a": _2, "h\xF8yanger": _2, "hoylandet": _2, "xn--hylandet-54a": _2, "h\xF8ylandet": _2, "ha": _2, "xn--h-2fa": _2, "h\xE5": _2, "ibestad": _2, "inderoy": _2, "xn--indery-fya": _2, "inder\xF8y": _2, "iveland": _2, "jevnaker": _2, "jondal": _2, "jolster": _2, "xn--jlster-bya": _2, "j\xF8lster": _2, "karasjok": _2, "karasjohka": _2, "xn--krjohka-hwab49j": _2, "k\xE1r\xE1\u0161johka": _2, "karlsoy": _2, "galsa": _2, "xn--gls-elac": _2, "g\xE1ls\xE1": _2, "karmoy": _2, "xn--karmy-yua": _2, "karm\xF8y": _2, "kautokeino": _2, "guovdageaidnu": _2, "klepp": _2, "klabu": _2, "xn--klbu-woa": _2, "kl\xE6bu": _2, "kongsberg": _2, "kongsvinger": _2, "kragero": _2, "xn--krager-gya": _2, "krager\xF8": _2, "kristiansand": _2, "kristiansund": _2, "krodsherad": _2, "xn--krdsherad-m8a": _2, "kr\xF8dsherad": _2, "kvalsund": _2, "rahkkeravju": _2, "xn--rhkkervju-01af": _2, "r\xE1hkker\xE1vju": _2, "kvam": _2, "kvinesdal": _2, "kvinnherad": _2, "kviteseid": _2, "kvitsoy": _2, "xn--kvitsy-fya": _2, "kvits\xF8y": _2, "kvafjord": _2, "xn--kvfjord-nxa": _2, "kv\xE6fjord": _2, "giehtavuoatna": _2, "kvanangen": _2, "xn--kvnangen-k0a": _2, "kv\xE6nangen": _2, "navuotna": _2, "xn--nvuotna-hwa": _2, "n\xE1vuotna": _2, "kafjord": _2, "xn--kfjord-iua": _2, "k\xE5fjord": _2, "gaivuotna": _2, "xn--givuotna-8ya": _2, "g\xE1ivuotna": _2, "larvik": _2, "lavangen": _2, "lavagis": _2, "loabat": _2, "xn--loabt-0qa": _2, "loab\xE1t": _2, "lebesby": _2, "davvesiida": _2, "leikanger": _2, "leirfjord": _2, "leka": _2, "leksvik": _2, "lenvik": _2, "leangaviika": _2, "xn--leagaviika-52b": _2, "lea\u014Bgaviika": _2, "lesja": _2, "levanger": _2, "lier": _2, "lierne": _2, "lillehammer": _2, "lillesand": _2, "lindesnes": _2, "lindas": _2, "xn--linds-pra": _2, "lind\xE5s": _2, "lom": _2, "loppa": _2, "lahppi": _2, "xn--lhppi-xqa": _2, "l\xE1hppi": _2, "lund": _2, "lunner": _2, "luroy": _2, "xn--lury-ira": _2, "lur\xF8y": _2, "luster": _2, "lyngdal": _2, "lyngen": _2, "ivgu": _2, "lardal": _2, "lerdal": _2, "xn--lrdal-sra": _2, "l\xE6rdal": _2, "lodingen": _2, "xn--ldingen-q1a": _2, "l\xF8dingen": _2, "lorenskog": _2, "xn--lrenskog-54a": _2, "l\xF8renskog": _2, "loten": _2, "xn--lten-gra": _2, "l\xF8ten": _2, "malvik": _2, "masoy": _2, "xn--msy-ula0h": _2, "m\xE5s\xF8y": _2, "muosat": _2, "xn--muost-0qa": _2, "muos\xE1t": _2, "mandal": _2, "marker": _2, "marnardal": _2, "masfjorden": _2, "meland": _2, "meldal": _2, "melhus": _2, "meloy": _2, "xn--mely-ira": _2, "mel\xF8y": _2, "meraker": _2, "xn--merker-kua": _2, "mer\xE5ker": _2, "moareke": _2, "xn--moreke-jua": _2, "mo\xE5reke": _2, "midsund": _2, "midtre-gauldal": _2, "modalen": _2, "modum": _2, "molde": _2, "moskenes": _2, "moss": _2, "mosvik": _2, "malselv": _2, "xn--mlselv-iua": _2, "m\xE5lselv": _2, "malatvuopmi": _2, "xn--mlatvuopmi-s4a": _2, "m\xE1latvuopmi": _2, "namdalseid": _2, "aejrie": _2, "namsos": _2, "namsskogan": _2, "naamesjevuemie": _2, "xn--nmesjevuemie-tcba": _2, "n\xE5\xE5mesjevuemie": _2, "laakesvuemie": _2, "nannestad": _2, "narvik": _2, "narviika": _2, "naustdal": _2, "nedre-eiker": _2, "akershus": _59, "buskerud": _59, "nesna": _2, "nesodden": _2, "nesseby": _2, "unjarga": _2, "xn--unjrga-rta": _2, "unj\xE1rga": _2, "nesset": _2, "nissedal": _2, "nittedal": _2, "nord-aurdal": _2, "nord-fron": _2, "nord-odal": _2, "norddal": _2, "nordkapp": _2, "davvenjarga": _2, "xn--davvenjrga-y4a": _2, "davvenj\xE1rga": _2, "nordre-land": _2, "nordreisa": _2, "raisa": _2, "xn--risa-5na": _2, "r\xE1isa": _2, "nore-og-uvdal": _2, "notodden": _2, "naroy": _2, "xn--nry-yla5g": _2, "n\xE6r\xF8y": _2, "notteroy": _2, "xn--nttery-byae": _2, "n\xF8tter\xF8y": _2, "odda": _2, "oksnes": _2, "xn--ksnes-uua": _2, "\xF8ksnes": _2, "oppdal": _2, "oppegard": _2, "xn--oppegrd-ixa": _2, "oppeg\xE5rd": _2, "orkdal": _2, "orland": _2, "xn--rland-uua": _2, "\xF8rland": _2, "orskog": _2, "xn--rskog-uua": _2, "\xF8rskog": _2, "orsta": _2, "xn--rsta-fra": _2, "\xF8rsta": _2, "hedmark": [0, { "os": _2, "valer": _2, "xn--vler-qoa": _2, "v\xE5ler": _2 }], "hordaland": [0, { "os": _2 }], "osen": _2, "osteroy": _2, "xn--ostery-fya": _2, "oster\xF8y": _2, "ostre-toten": _2, "xn--stre-toten-zcb": _2, "\xF8stre-toten": _2, "overhalla": _2, "ovre-eiker": _2, "xn--vre-eiker-k8a": _2, "\xF8vre-eiker": _2, "oyer": _2, "xn--yer-zna": _2, "\xF8yer": _2, "oygarden": _2, "xn--ygarden-p1a": _2, "\xF8ygarden": _2, "oystre-slidre": _2, "xn--ystre-slidre-ujb": _2, "\xF8ystre-slidre": _2, "porsanger": _2, "porsangu": _2, "xn--porsgu-sta26f": _2, "pors\xE1\u014Bgu": _2, "porsgrunn": _2, "radoy": _2, "xn--rady-ira": _2, "rad\xF8y": _2, "rakkestad": _2, "rana": _2, "ruovat": _2, "randaberg": _2, "rauma": _2, "rendalen": _2, "rennebu": _2, "rennesoy": _2, "xn--rennesy-v1a": _2, "rennes\xF8y": _2, "rindal": _2, "ringebu": _2, "ringerike": _2, "ringsaker": _2, "rissa": _2, "risor": _2, "xn--risr-ira": _2, "ris\xF8r": _2, "roan": _2, "rollag": _2, "rygge": _2, "ralingen": _2, "xn--rlingen-mxa": _2, "r\xE6lingen": _2, "rodoy": _2, "xn--rdy-0nab": _2, "r\xF8d\xF8y": _2, "romskog": _2, "xn--rmskog-bya": _2, "r\xF8mskog": _2, "roros": _2, "xn--rros-gra": _2, "r\xF8ros": _2, "rost": _2, "xn--rst-0na": _2, "r\xF8st": _2, "royken": _2, "xn--ryken-vua": _2, "r\xF8yken": _2, "royrvik": _2, "xn--ryrvik-bya": _2, "r\xF8yrvik": _2, "rade": _2, "xn--rde-ula": _2, "r\xE5de": _2, "salangen": _2, "siellak": _2, "saltdal": _2, "salat": _2, "xn--slt-elab": _2, "s\xE1l\xE1t": _2, "xn--slat-5na": _2, "s\xE1lat": _2, "samnanger": _2, "vestfold": [0, { "sande": _2 }], "sandefjord": _2, "sandnes": _2, "sandoy": _2, "xn--sandy-yua": _2, "sand\xF8y": _2, "sarpsborg": _2, "sauda": _2, "sauherad": _2, "sel": _2, "selbu": _2, "selje": _2, "seljord": _2, "sigdal": _2, "siljan": _2, "sirdal": _2, "skaun": _2, "skedsmo": _2, "ski": _2, "skien": _2, "skiptvet": _2, "skjervoy": _2, "xn--skjervy-v1a": _2, "skjerv\xF8y": _2, "skierva": _2, "xn--skierv-uta": _2, "skierv\xE1": _2, "skjak": _2, "xn--skjk-soa": _2, "skj\xE5k": _2, "skodje": _2, "skanland": _2, "xn--sknland-fxa": _2, "sk\xE5nland": _2, "skanit": _2, "xn--sknit-yqa": _2, "sk\xE1nit": _2, "smola": _2, "xn--smla-hra": _2, "sm\xF8la": _2, "snillfjord": _2, "snasa": _2, "xn--snsa-roa": _2, "sn\xE5sa": _2, "snoasa": _2, "snaase": _2, "xn--snase-nra": _2, "sn\xE5ase": _2, "sogndal": _2, "sokndal": _2, "sola": _2, "solund": _2, "songdalen": _2, "sortland": _2, "spydeberg": _2, "stange": _2, "stavanger": _2, "steigen": _2, "steinkjer": _2, "stjordal": _2, "xn--stjrdal-s1a": _2, "stj\xF8rdal": _2, "stokke": _2, "stor-elvdal": _2, "stord": _2, "stordal": _2, "storfjord": _2, "omasvuotna": _2, "strand": _2, "stranda": _2, "stryn": _2, "sula": _2, "suldal": _2, "sund": _2, "sunndal": _2, "surnadal": _2, "sveio": _2, "svelvik": _2, "sykkylven": _2, "sogne": _2, "xn--sgne-gra": _2, "s\xF8gne": _2, "somna": _2, "xn--smna-gra": _2, "s\xF8mna": _2, "sondre-land": _2, "xn--sndre-land-0cb": _2, "s\xF8ndre-land": _2, "sor-aurdal": _2, "xn--sr-aurdal-l8a": _2, "s\xF8r-aurdal": _2, "sor-fron": _2, "xn--sr-fron-q1a": _2, "s\xF8r-fron": _2, "sor-odal": _2, "xn--sr-odal-q1a": _2, "s\xF8r-odal": _2, "sor-varanger": _2, "xn--sr-varanger-ggb": _2, "s\xF8r-varanger": _2, "matta-varjjat": _2, "xn--mtta-vrjjat-k7af": _2, "m\xE1tta-v\xE1rjjat": _2, "sorfold": _2, "xn--srfold-bya": _2, "s\xF8rfold": _2, "sorreisa": _2, "xn--srreisa-q1a": _2, "s\xF8rreisa": _2, "sorum": _2, "xn--srum-gra": _2, "s\xF8rum": _2, "tana": _2, "deatnu": _2, "time": _2, "tingvoll": _2, "tinn": _2, "tjeldsund": _2, "dielddanuorri": _2, "tjome": _2, "xn--tjme-hra": _2, "tj\xF8me": _2, "tokke": _2, "tolga": _2, "torsken": _2, "tranoy": _2, "xn--trany-yua": _2, "tran\xF8y": _2, "tromso": _2, "xn--troms-zua": _2, "troms\xF8": _2, "tromsa": _2, "romsa": _2, "trondheim": _2, "troandin": _2, "trysil": _2, "trana": _2, "xn--trna-woa": _2, "tr\xE6na": _2, "trogstad": _2, "xn--trgstad-r1a": _2, "tr\xF8gstad": _2, "tvedestrand": _2, "tydal": _2, "tynset": _2, "tysfjord": _2, "divtasvuodna": _2, "divttasvuotna": _2, "tysnes": _2, "tysvar": _2, "xn--tysvr-vra": _2, "tysv\xE6r": _2, "tonsberg": _2, "xn--tnsberg-q1a": _2, "t\xF8nsberg": _2, "ullensaker": _2, "ullensvang": _2, "ulvik": _2, "utsira": _2, "vadso": _2, "xn--vads-jra": _2, "vads\xF8": _2, "cahcesuolo": _2, "xn--hcesuolo-7ya35b": _2, "\u010D\xE1hcesuolo": _2, "vaksdal": _2, "valle": _2, "vang": _2, "vanylven": _2, "vardo": _2, "xn--vard-jra": _2, "vard\xF8": _2, "varggat": _2, "xn--vrggt-xqad": _2, "v\xE1rgg\xE1t": _2, "vefsn": _2, "vaapste": _2, "vega": _2, "vegarshei": _2, "xn--vegrshei-c0a": _2, "veg\xE5rshei": _2, "vennesla": _2, "verdal": _2, "verran": _2, "vestby": _2, "vestnes": _2, "vestre-slidre": _2, "vestre-toten": _2, "vestvagoy": _2, "xn--vestvgy-ixa6o": _2, "vestv\xE5g\xF8y": _2, "vevelstad": _2, "vik": _2, "vikna": _2, "vindafjord": _2, "volda": _2, "voss": _2, "varoy": _2, "xn--vry-yla5g": _2, "v\xE6r\xF8y": _2, "vagan": _2, "xn--vgan-qoa": _2, "v\xE5gan": _2, "voagat": _2, "vagsoy": _2, "xn--vgsy-qoa0j": _2, "v\xE5gs\xF8y": _2, "vaga": _2, "xn--vg-yiab": _2, "v\xE5g\xE5": _2, "ostfold": [0, { "valer": _2 }], "xn--stfold-9xa": [0, { "xn--vler-qoa": _2 }], "\xF8stfold": [0, { "v\xE5ler": _2 }], "co": _3, "blogspot": _3, "123hjemmeside": _3, "myspreadshop": _3 }], "np": _16, "nr": _53, "nu": [1, { "merseine": _3, "mine": _3, "shacknet": _3, "enterprisecloud": _3 }], "nz": [1, { "ac": _2, "co": _9, "cri": _2, "geek": _2, "gen": _2, "govt": _2, "health": _2, "iwi": _2, "kiwi": _2, "maori": _2, "mil": _2, "xn--mori-qsa": _2, "m\u0101ori": _2, "net": _2, "org": _2, "parliament": _2, "school": _2, "cloudns": _3 }], "om": [1, { "co": _2, "com": _2, "edu": _2, "gov": _2, "med": _2, "museum": _2, "net": _2, "org": _2, "pro": _2 }], "onion": _2, "org": [1, { "altervista": _3, "amune": [0, { "tele": _3 }], "pimienta": _3, "poivron": _3, "potager": _3, "sweetpepper": _3, "ae": _3, "us": _3, "certmgr": _3, "cdn77": [0, { "c": _3, "rsc": _3 }], "cdn77-secure": [0, { "origin": [0, { "ssl": _3 }] }], "cloudns": _3, "duckdns": _3, "tunk": _3, "blogdns": _3, "blogsite": _3, "boldlygoingnowhere": _3, "dnsalias": _3, "dnsdojo": _3, "doesntexist": _3, "dontexist": _3, "doomdns": _3, "dvrdns": _3, "dynalias": _3, "dyndns": [2, { "go": _3, "home": _3 }], "endofinternet": _3, "endoftheinternet": _3, "from-me": _3, "game-host": _3, "gotdns": _3, "hobby-site": _3, "homedns": _3, "homeftp": _3, "homelinux": _3, "homeunix": _3, "is-a-bruinsfan": _3, "is-a-candidate": _3, "is-a-celticsfan": _3, "is-a-chef": _3, "is-a-geek": _3, "is-a-knight": _3, "is-a-linux-user": _3, "is-a-patsfan": _3, "is-a-soxfan": _3, "is-found": _3, "is-lost": _3, "is-saved": _3, "is-very-bad": _3, "is-very-evil": _3, "is-very-good": _3, "is-very-nice": _3, "is-very-sweet": _3, "isa-geek": _3, "kicks-ass": _3, "misconfused": _3, "podzone": _3, "readmyblog": _3, "selfip": _3, "sellsyourhome": _3, "servebbs": _3, "serveftp": _3, "servegame": _3, "stuff-4-sale": _3, "webhop": _3, "ddnss": _3, "accesscam": _3, "camdvr": _3, "freeddns": _3, "mywire": _3, "webredirect": _3, "twmail": _3, "eu": [2, { "al": _3, "asso": _3, "at": _3, "au": _3, "be": _3, "bg": _3, "ca": _3, "cd": _3, "ch": _3, "cn": _3, "cy": _3, "cz": _3, "de": _3, "dk": _3, "edu": _3, "ee": _3, "es": _3, "fi": _3, "fr": _3, "gr": _3, "hr": _3, "hu": _3, "ie": _3, "il": _3, "in": _3, "int": _3, "is": _3, "it": _3, "jp": _3, "kr": _3, "lt": _3, "lu": _3, "lv": _3, "mc": _3, "me": _3, "mk": _3, "mt": _3, "my": _3, "net": _3, "ng": _3, "nl": _3, "no": _3, "nz": _3, "paris": _3, "pl": _3, "pt": _3, "q-a": _3, "ro": _3, "ru": _3, "se": _3, "si": _3, "sk": _3, "tr": _3, "uk": _3, "us": _3 }], "fedorainfracloud": _3, "fedorapeople": _3, "fedoraproject": [0, { "cloud": _3, "os": _40, "stg": [0, { "os": _40 }] }], "freedesktop": _3, "hepforge": _3, "in-dsl": _3, "in-vpn": _3, "js": _3, "barsy": _3, "mayfirst": _3, "mozilla-iot": _3, "bmoattachments": _3, "dynserv": _3, "now-dns": _3, "cable-modem": _3, "collegefan": _3, "couchpotatofries": _3, "hopto": _3, "mlbfan": _3, "myftp": _3, "mysecuritycamera": _3, "nflfan": _3, "no-ip": _3, "read-books": _3, "ufcfan": _3, "zapto": _3, "is-local": _3, "httpbin": _3, "pubtls": _3, "jpn": _3, "my-firewall": _3, "myfirewall": _3, "spdns": _3, "small-web": _3, "dsmynas": _3, "familyds": _3, "teckids": _52, "tuxfamily": _3, "diskstation": _3, "hk": _3, "toolforge": _3, "wmcloud": _3, "wmflabs": _3, "za": _3 }], "pa": [1, { "ac": _2, "gob": _2, "com": _2, "org": _2, "sld": _2, "edu": _2, "net": _2, "ing": _2, "abo": _2, "med": _2, "nom": _2 }], "pe": [1, { "edu": _2, "gob": _2, "nom": _2, "mil": _2, "org": _2, "com": _2, "net": _2, "blogspot": _3 }], "pf": [1, { "com": _2, "org": _2, "edu": _2 }], "pg": _16, "ph": [1, { "com": _2, "net": _2, "org": _2, "gov": _2, "edu": _2, "ngo": _2, "mil": _2, "i": _2, "cloudns": _3 }], "pk": [1, { "com": _2, "net": _2, "edu": _2, "org": _2, "fam": _2, "biz": _2, "web": _2, "gov": _2, "gob": _2, "gok": _2, "gon": _2, "gop": _2, "gos": _2, "info": _2 }], "pl": [1, { "com": _2, "net": _2, "org": _2, "aid": _2, "agro": _2, "atm": _2, "auto": _2, "biz": _2, "edu": _2, "gmina": _2, "gsm": _2, "info": _2, "mail": _2, "miasta": _2, "media": _2, "mil": _2, "nieruchomosci": _2, "nom": _2, "pc": _2, "powiat": _2, "priv": _2, "realestate": _2, "rel": _2, "sex": _2, "shop": _2, "sklep": _2, "sos": _2, "szkola": _2, "targi": _2, "tm": _2, "tourism": _2, "travel": _2, "turystyka": _2, "gov": [1, { "ap": _2, "griw": _2, "ic": _2, "is": _2, "kmpsp": _2, "konsulat": _2, "kppsp": _2, "kwp": _2, "kwpsp": _2, "mup": _2, "mw": _2, "oia": _2, "oirm": _2, "oke": _2, "oow": _2, "oschr": _2, "oum": _2, "pa": _2, "pinb": _2, "piw": _2, "po": _2, "pr": _2, "psp": _2, "psse": _2, "pup": _2, "rzgw": _2, "sa": _2, "sdn": _2, "sko": _2, "so": _2, "sr": _2, "starostwo": _2, "ug": _2, "ugim": _2, "um": _2, "umig": _2, "upow": _2, "uppo": _2, "us": _2, "uw": _2, "uzs": _2, "wif": _2, "wiih": _2, "winb": _2, "wios": _2, "witd": _2, "wiw": _2, "wkz": _2, "wsa": _2, "wskr": _2, "wsse": _2, "wuoz": _2, "wzmiuw": _2, "zp": _2, "zpisdn": _2 }], "augustow": _2, "babia-gora": _2, "bedzin": _2, "beskidy": _2, "bialowieza": _2, "bialystok": _2, "bielawa": _2, "bieszczady": _2, "boleslawiec": _2, "bydgoszcz": _2, "bytom": _2, "cieszyn": _2, "czeladz": _2, "czest": _2, "dlugoleka": _2, "elblag": _2, "elk": _2, "glogow": _2, "gniezno": _2, "gorlice": _2, "grajewo": _2, "ilawa": _2, "jaworzno": _2, "jelenia-gora": _2, "jgora": _2, "kalisz": _2, "kazimierz-dolny": _2, "karpacz": _2, "kartuzy": _2, "kaszuby": _2, "katowice": _2, "kepno": _2, "ketrzyn": _2, "klodzko": _2, "kobierzyce": _2, "kolobrzeg": _2, "konin": _2, "konskowola": _2, "kutno": _2, "lapy": _2, "lebork": _2, "legnica": _2, "lezajsk": _2, "limanowa": _2, "lomza": _2, "lowicz": _2, "lubin": _2, "lukow": _2, "malbork": _2, "malopolska": _2, "mazowsze": _2, "mazury": _2, "mielec": _2, "mielno": _2, "mragowo": _2, "naklo": _2, "nowaruda": _2, "nysa": _2, "olawa": _2, "olecko": _2, "olkusz": _2, "olsztyn": _2, "opoczno": _2, "opole": _2, "ostroda": _2, "ostroleka": _2, "ostrowiec": _2, "ostrowwlkp": _2, "pila": _2, "pisz": _2, "podhale": _2, "podlasie": _2, "polkowice": _2, "pomorze": _2, "pomorskie": _2, "prochowice": _2, "pruszkow": _2, "przeworsk": _2, "pulawy": _2, "radom": _2, "rawa-maz": _2, "rybnik": _2, "rzeszow": _2, "sanok": _2, "sejny": _2, "slask": _2, "slupsk": _2, "sosnowiec": _2, "stalowa-wola": _2, "skoczow": _2, "starachowice": _2, "stargard": _2, "suwalki": _2, "swidnica": _2, "swiebodzin": _2, "swinoujscie": _2, "szczecin": _2, "szczytno": _2, "tarnobrzeg": _2, "tgory": _2, "turek": _2, "tychy": _2, "ustka": _2, "walbrzych": _2, "warmia": _2, "warszawa": _2, "waw": _2, "wegrow": _2, "wielun": _2, "wlocl": _2, "wloclawek": _2, "wodzislaw": _2, "wolomin": _2, "wroclaw": _2, "zachpomor": _2, "zagan": _2, "zarow": _2, "zgora": _2, "zgorzelec": _2, "beep": _3, "ecommerce-shop": _3, "bielsko": _3, "shoparena": _3, "homesklep": _3, "sdscloud": _3, "unicloud": _3, "krasnik": _3, "leczna": _3, "lubartow": _3, "lublin": _3, "poniatowa": _3, "swidnik": _3, "co": _3, "torun": _3, "simplesite": _3, "art": _3, "gliwice": _3, "krakow": _3, "poznan": _3, "wroc": _3, "zakopane": _3, "myspreadshop": _3, "gda": _3, "gdansk": _3, "gdynia": _3, "med": _3, "sopot": _3 }], "pm": [1, { "own": _3, "name": _3 }], "pn": [1, { "gov": _2, "co": _2, "org": _2, "edu": _2, "net": _2 }], "post": _2, "pr": [1, { "com": _2, "net": _2, "org": _2, "gov": _2, "edu": _2, "isla": _2, "pro": _2, "biz": _2, "info": _2, "name": _2, "est": _2, "prof": _2, "ac": _2 }], "pro": [1, { "aaa": _2, "aca": _2, "acct": _2, "avocat": _2, "bar": _2, "cpa": _2, "eng": _2, "jur": _2, "law": _2, "med": _2, "recht": _2, "12chars": _3, "cloudns": _3, "dnstrace": [0, { "bci": _3 }], "barsy": _3, "ngrok": _3 }], "ps": [1, { "edu": _2, "gov": _2, "sec": _2, "plo": _2, "com": _2, "org": _2, "net": _2 }], "pt": [1, { "net": _2, "gov": _2, "org": _2, "edu": _2, "int": _2, "publ": _2, "com": _2, "nome": _2, "blogspot": _3, "123paginaweb": _3 }], "pw": [1, { "co": _2, "ne": _2, "or": _2, "ed": _2, "go": _2, "belau": _2, "cloudns": _3, "x443": _3 }], "py": [1, { "com": _2, "coop": _2, "edu": _2, "gov": _2, "mil": _2, "net": _2, "org": _2 }], "qa": [1, { "com": _2, "edu": _2, "gov": _2, "mil": _2, "name": _2, "net": _2, "org": _2, "sch": _2, "blogspot": _3 }], "re": [1, { "asso": _2, "com": _2, "nom": _2, "blogspot": _3, "can": _3 }], "ro": [1, { "arts": _2, "com": _2, "firm": _2, "info": _2, "nom": _2, "nt": _2, "org": _2, "rec": _2, "store": _2, "tm": _2, "www": _2, "co": _3, "shop": _3, "blogspot": _3, "barsy": _3 }], "rs": [1, { "ac": _2, "co": _2, "edu": _2, "gov": _2, "in": _2, "org": _2, "brendly": _48, "blogspot": _3, "ua": _3, "barsy": _3, "ox": _3 }], "ru": [1, { "ac": _3, "edu": _3, "gov": _3, "int": _3, "mil": _3, "test": _3, "eurodir": _3, "adygeya": _3, "bashkiria": _3, "bir": _3, "cbg": _3, "com": _3, "dagestan": _3, "grozny": _3, "kalmykia": _3, "kustanai": _3, "marine": _3, "mordovia": _3, "msk": _3, "mytis": _3, "nalchik": _3, "nov": _3, "pyatigorsk": _3, "spb": _3, "vladikavkaz": _3, "vladimir": _3, "blogspot": _3, "na4u": _3, "mircloud": _3, "regruhosting": _45, "myjino": [2, { "hosting": _5, "landing": _5, "spectrum": _5, "vps": _5 }], "cldmail": [0, { "hb": _3 }], "mcdir": [2, { "vps": _3 }], "mcpre": _3, "net": _3, "org": _3, "pp": _3, "lk3": _3, "ras": _3 }], "rw": [1, { "ac": _2, "co": _2, "coop": _2, "gov": _2, "mil": _2, "net": _2, "org": _2 }], "sa": [1, { "com": _2, "net": _2, "org": _2, "gov": _2, "med": _2, "pub": _2, "edu": _2, "sch": _2 }], "sb": _4, "sc": _4, "sd": [1, { "com": _2, "net": _2, "org": _2, "edu": _2, "med": _2, "tv": _2, "gov": _2, "info": _2 }], "se": [1, { "a": _2, "ac": _2, "b": _2, "bd": _2, "brand": _2, "c": _2, "d": _2, "e": _2, "f": _2, "fh": _2, "fhsk": _2, "fhv": _2, "g": _2, "h": _2, "i": _2, "k": _2, "komforb": _2, "kommunalforbund": _2, "komvux": _2, "l": _2, "lanbib": _2, "m": _2, "n": _2, "naturbruksgymn": _2, "o": _2, "org": _2, "p": _2, "parti": _2, "pp": _2, "press": _2, "r": _2, "s": _2, "t": _2, "tm": _2, "u": _2, "w": _2, "x": _2, "y": _2, "z": _2, "com": _3, "blogspot": _3, "conf": _3, "iopsys": _3, "123minsida": _3, "itcouldbewor": _3, "myspreadshop": _3, "paba": [0, { "su": _3 }] }], "sg": [1, { "com": _2, "net": _2, "org": _2, "gov": _2, "edu": _2, "per": _2, "blogspot": _3, "enscaled": _3 }], "sh": [1, { "com": _2, "net": _2, "gov": _2, "org": _2, "mil": _2, "bip": _3, "hashbang": _3, "platform": [0, { "ent": _3, "eu": _3, "us": _3 }], "now": _3, "wedeploy": _3 }], "si": [1, { "f5": _3, "gitapp": _3, "gitpage": _3, "blogspot": _3 }], "sj": _2, "sk": _9, "sl": _4, "sm": _2, "sn": [1, { "art": _2, "com": _2, "edu": _2, "gouv": _2, "org": _2, "perso": _2, "univ": _2, "blogspot": _3 }], "so": [1, { "com": _2, "edu": _2, "gov": _2, "me": _2, "net": _2, "org": _2, "sch": _3, "surveys": _3 }], "sr": _2, "ss": [1, { "biz": _2, "com": _2, "edu": _2, "gov": _2, "me": _2, "net": _2, "org": _2, "sch": _2 }], "st": [1, { "co": _2, "com": _2, "consulado": _2, "edu": _2, "embaixada": _2, "mil": _2, "net": _2, "org": _2, "principe": _2, "saotome": _2, "store": _2, "helioho": _3, "kirara": _3, "noho": _3 }], "su": [1, { "abkhazia": _3, "adygeya": _3, "aktyubinsk": _3, "arkhangelsk": _3, "armenia": _3, "ashgabad": _3, "azerbaijan": _3, "balashov": _3, "bashkiria": _3, "bryansk": _3, "bukhara": _3, "chimkent": _3, "dagestan": _3, "east-kazakhstan": _3, "exnet": _3, "georgia": _3, "grozny": _3, "ivanovo": _3, "jambyl": _3, "kalmykia": _3, "kaluga": _3, "karacol": _3, "karaganda": _3, "karelia": _3, "khakassia": _3, "krasnodar": _3, "kurgan": _3, "kustanai": _3, "lenug": _3, "mangyshlak": _3, "mordovia": _3, "msk": _3, "murmansk": _3, "nalchik": _3, "navoi": _3, "north-kazakhstan": _3, "nov": _3, "obninsk": _3, "penza": _3, "pokrovsk": _3, "sochi": _3, "spb": _3, "tashkent": _3, "termez": _3, "togliatti": _3, "troitsk": _3, "tselinograd": _3, "tula": _3, "tuva": _3, "vladikavkaz": _3, "vladimir": _3, "vologda": _3 }], "sv": [1, { "com": _2, "edu": _2, "gob": _2, "org": _2, "red": _2 }], "sx": _10, "sy": _51, "sz": [1, { "co": _2, "ac": _2, "org": _2 }], "tc": _2, "td": _9, "tel": _2, "tf": [1, { "sch": _3 }], "tg": _2, "th": [1, { "ac": _2, "co": _2, "go": _2, "in": _2, "mi": _2, "net": _2, "or": _2, "online": _3, "shop": _3 }], "tj": [1, { "ac": _2, "biz": _2, "co": _2, "com": _2, "edu": _2, "go": _2, "gov": _2, "int": _2, "mil": _2, "name": _2, "net": _2, "nic": _2, "org": _2, "test": _2, "web": _2 }], "tk": _2, "tl": _10, "tm": [1, { "com": _2, "co": _2, "org": _2, "net": _2, "nom": _2, "gov": _2, "mil": _2, "edu": _2 }], "tn": [1, { "com": _2, "ens": _2, "fin": _2, "gov": _2, "ind": _2, "info": _2, "intl": _2, "mincom": _2, "nat": _2, "net": _2, "org": _2, "perso": _2, "tourism": _2, "orangecloud": _3 }], "to": [1, { "611": _3, "com": _2, "gov": _2, "net": _2, "org": _2, "edu": _2, "mil": _2, "oya": _3, "x0": _3, "quickconnect": _25, "vpnplus": _3 }], "tr": [1, { "av": _2, "bbs": _2, "bel": _2, "biz": _2, "com": _9, "dr": _2, "edu": _2, "gen": _2, "gov": _2, "info": _2, "mil": _2, "k12": _2, "kep": _2, "name": _2, "net": _2, "org": _2, "pol": _2, "tel": _2, "tsk": _2, "tv": _2, "web": _2, "nc": _10 }], "tt": [1, { "co": _2, "com": _2, "org": _2, "net": _2, "biz": _2, "info": _2, "pro": _2, "int": _2, "coop": _2, "jobs": _2, "mobi": _2, "travel": _2, "museum": _2, "aero": _2, "name": _2, "gov": _2, "edu": _2 }], "tv": [1, { "better-than": _3, "dyndns": _3, "on-the-web": _3, "worse-than": _3, "from": _3, "sakura": _3 }], "tw": [1, { "edu": _2, "gov": _2, "mil": _2, "com": [1, { "mymailer": _3 }], "net": _2, "org": _2, "idv": _2, "game": _2, "ebiz": _2, "club": _2, "xn--zf0ao64a": _2, "\u7DB2\u8DEF": _2, "xn--uc0atv": _2, "\u7D44\u7E54": _2, "xn--czrw28b": _2, "\u5546\u696D": _2, "url": _3, "mydns": _3, "blogspot": _3 }], "tz": [1, { "ac": _2, "co": _2, "go": _2, "hotel": _2, "info": _2, "me": _2, "mil": _2, "mobi": _2, "ne": _2, "or": _2, "sc": _2, "tv": _2 }], "ua": [1, { "com": _2, "edu": _2, "gov": _2, "in": _2, "net": _2, "org": _2, "cherkassy": _2, "cherkasy": _2, "chernigov": _2, "chernihiv": _2, "chernivtsi": _2, "chernovtsy": _2, "ck": _2, "cn": _2, "cr": _2, "crimea": _2, "cv": _2, "dn": _2, "dnepropetrovsk": _2, "dnipropetrovsk": _2, "donetsk": _2, "dp": _2, "if": _2, "ivano-frankivsk": _2, "kh": _2, "kharkiv": _2, "kharkov": _2, "kherson": _2, "khmelnitskiy": _2, "khmelnytskyi": _2, "kiev": _2, "kirovograd": _2, "km": _2, "kr": _2, "kropyvnytskyi": _2, "krym": _2, "ks": _2, "kv": _2, "kyiv": _2, "lg": _2, "lt": _2, "lugansk": _2, "luhansk": _2, "lutsk": _2, "lv": _2, "lviv": _2, "mk": _2, "mykolaiv": _2, "nikolaev": _2, "od": _2, "odesa": _2, "odessa": _2, "pl": _2, "poltava": _2, "rivne": _2, "rovno": _2, "rv": _2, "sb": _2, "sebastopol": _2, "sevastopol": _2, "sm": _2, "sumy": _2, "te": _2, "ternopil": _2, "uz": _2, "uzhgorod": _2, "uzhhorod": _2, "vinnica": _2, "vinnytsia": _2, "vn": _2, "volyn": _2, "yalta": _2, "zakarpattia": _2, "zaporizhzhe": _2, "zaporizhzhia": _2, "zhitomir": _2, "zhytomyr": _2, "zp": _2, "zt": _2, "cc": _3, "inf": _3, "ltd": _3, "cx": _3, "ie": _3, "biz": _3, "co": _3, "pp": _3, "v": _3 }], "ug": [1, { "co": _2, "or": _2, "ac": _2, "sc": _2, "go": _2, "ne": _2, "com": _2, "org": _2, "blogspot": _3 }], "uk": [1, { "ac": _2, "co": [1, { "bytemark": [0, { "dh": _3, "vm": _3 }], "blogspot": _3, "layershift": _44, "barsy": _3, "barsyonline": _3, "retrosnub": _50, "nh-serv": _3, "no-ip": _3, "wellbeingzone": _3, "adimo": _3, "myspreadshop": _3 }], "gov": [1, { "campaign": _3, "service": _3, "api": _3 }], "ltd": _2, "me": _2, "net": _2, "nhs": _2, "org": [1, { "glug": _3, "lug": _3, "lugs": _3, "affinitylottery": _3, "raffleentry": _3, "weeklylottery": _3 }], "plc": _2, "police": _2, "sch": _16, "conn": _3, "copro": _3, "hosp": _3, "independent-commission": _3, "independent-inquest": _3, "independent-inquiry": _3, "independent-panel": _3, "independent-review": _3, "public-inquiry": _3, "royal-commission": _3, "pymnt": _3, "barsy": _3, "nimsite": _3 }], "us": [1, { "dni": _2, "fed": _2, "isa": _2, "kids": _2, "nsn": _2, "ak": _60, "al": _60, "ar": _60, "as": _60, "az": _60, "ca": _60, "co": _60, "ct": _60, "dc": _60, "de": [1, { "cc": _2, "lib": _3 }], "fl": _60, "ga": _60, "gu": _60, "hi": _61, "ia": _60, "id": _60, "il": _60, "in": _60, "ks": _60, "ky": _60, "la": _60, "ma": [1, { "k12": [1, { "pvt": _2, "chtr": _2, "paroch": _2 }], "cc": _2, "lib": _2 }], "md": _60, "me": _60, "mi": [1, { "k12": _2, "cc": _2, "lib": _2, "ann-arbor": _2, "cog": _2, "dst": _2, "eaton": _2, "gen": _2, "mus": _2, "tec": _2, "washtenaw": _2 }], "mn": _60, "mo": _60, "ms": _60, "mt": _60, "nc": _60, "nd": _61, "ne": _60, "nh": _60, "nj": _60, "nm": _60, "nv": _60, "ny": _60, "oh": _60, "ok": _60, "or": _60, "pa": _60, "pr": _60, "ri": _61, "sc": _60, "sd": _61, "tn": _60, "tx": _60, "ut": _60, "vi": _60, "vt": _60, "va": _60, "wa": _60, "wi": _60, "wv": [1, { "cc": _2 }], "wy": _60, "graphox": _3, "cloudns": _3, "drud": _3, "is-by": _3, "land-4-sale": _3, "stuff-4-sale": _3, "heliohost": _3, "enscaled": [0, { "phx": _3 }], "mircloud": _3, "ngo": _3, "freeddns": _3, "golffan": _3, "noip": _3, "pointto": _3, "srv": [2, { "gh": _3, "gl": _3 }], "platterp": _3, "servername": _3 }], "uy": [1, { "com": _9, "edu": _2, "gub": _2, "mil": _2, "net": _2, "org": _2 }], "uz": [1, { "co": _2, "com": _2, "net": _2, "org": _2 }], "va": _2, "vc": [1, { "com": _2, "net": _2, "org": _2, "gov": _2, "mil": _2, "edu": _2, "gv": [2, { "d": _3 }], "0e": _3, "mydns": _3 }], "ve": [1, { "arts": _2, "bib": _2, "co": _2, "com": _2, "e12": _2, "edu": _2, "firm": _2, "gob": _2, "gov": _2, "info": _2, "int": _2, "mil": _2, "net": _2, "nom": _2, "org": _2, "rar": _2, "rec": _2, "store": _2, "tec": _2, "web": _2 }], "vg": _2, "vi": [1, { "co": _2, "com": _2, "k12": _2, "net": _2, "org": _2 }], "vn": [1, { "ac": _2, "ai": _2, "biz": _2, "com": _2, "edu": _2, "gov": _2, "health": _2, "id": _2, "info": _2, "int": _2, "io": _2, "name": _2, "net": _2, "org": _2, "pro": _2, "angiang": _2, "bacgiang": _2, "backan": _2, "baclieu": _2, "bacninh": _2, "baria-vungtau": _2, "bentre": _2, "binhdinh": _2, "binhduong": _2, "binhphuoc": _2, "binhthuan": _2, "camau": _2, "cantho": _2, "caobang": _2, "daklak": _2, "daknong": _2, "danang": _2, "dienbien": _2, "dongnai": _2, "dongthap": _2, "gialai": _2, "hagiang": _2, "haiduong": _2, "haiphong": _2, "hanam": _2, "hanoi": _2, "hatinh": _2, "haugiang": _2, "hoabinh": _2, "hungyen": _2, "khanhhoa": _2, "kiengiang": _2, "kontum": _2, "laichau": _2, "lamdong": _2, "langson": _2, "laocai": _2, "longan": _2, "namdinh": _2, "nghean": _2, "ninhbinh": _2, "ninhthuan": _2, "phutho": _2, "phuyen": _2, "quangbinh": _2, "quangnam": _2, "quangngai": _2, "quangninh": _2, "quangtri": _2, "soctrang": _2, "sonla": _2, "tayninh": _2, "thaibinh": _2, "thainguyen": _2, "thanhhoa": _2, "thanhphohochiminh": _2, "thuathienhue": _2, "tiengiang": _2, "travinh": _2, "tuyenquang": _2, "vinhlong": _2, "vinhphuc": _2, "yenbai": _2, "blogspot": _3 }], "vu": [1, { "com": _2, "edu": _2, "net": _2, "org": _2, "cn": _3 }], "wf": [1, { "biz": _3, "sch": _3 }], "ws": [1, { "com": _2, "net": _2, "org": _2, "gov": _2, "edu": _2, "advisor": _5, "cloud66": _3, "dyndns": _3, "mypets": _3 }], "yt": [1, { "org": _3 }], "xn--mgbaam7a8h": _2, "\u0627\u0645\u0627\u0631\u0627\u062A": _2, "xn--y9a3aq": _2, "\u0570\u0561\u0575": _2, "xn--54b7fta0cc": _2, "\u09AC\u09BE\u0982\u09B2\u09BE": _2, "xn--90ae": _2, "\u0431\u0433": _2, "xn--mgbcpq6gpa1a": _2, "\u0627\u0644\u0628\u062D\u0631\u064A\u0646": _2, "xn--90ais": _2, "\u0431\u0435\u043B": _2, "xn--fiqs8s": _2, "\u4E2D\u56FD": _2, "xn--fiqz9s": _2, "\u4E2D\u570B": _2, "xn--lgbbat1ad8j": _2, "\u0627\u0644\u062C\u0632\u0627\u0626\u0631": _2, "xn--wgbh1c": _2, "\u0645\u0635\u0631": _2, "xn--e1a4c": _2, "\u0435\u044E": _2, "xn--qxa6a": _2, "\u03B5\u03C5": _2, "xn--mgbah1a3hjkrd": _2, "\u0645\u0648\u0631\u064A\u062A\u0627\u0646\u064A\u0627": _2, "xn--node": _2, "\u10D2\u10D4": _2, "xn--qxam": _2, "\u03B5\u03BB": _2, "xn--j6w193g": [1, { "xn--55qx5d": _2, "xn--wcvs22d": _2, "xn--mxtq1m": _2, "xn--gmqw5a": _2, "xn--od0alg": _2, "xn--uc0atv": _2 }], "\u9999\u6E2F": [1, { "\u516C\u53F8": _2, "\u6559\u80B2": _2, "\u653F\u5E9C": _2, "\u500B\u4EBA": _2, "\u7DB2\u7D61": _2, "\u7D44\u7E54": _2 }], "xn--2scrj9c": _2, "\u0CAD\u0CBE\u0CB0\u0CA4": _2, "xn--3hcrj9c": _2, "\u0B2D\u0B3E\u0B30\u0B24": _2, "xn--45br5cyl": _2, "\u09AD\u09BE\u09F0\u09A4": _2, "xn--h2breg3eve": _2, "\u092D\u093E\u0930\u0924\u092E\u094D": _2, "xn--h2brj9c8c": _2, "\u092D\u093E\u0930\u094B\u0924": _2, "xn--mgbgu82a": _2, "\u0680\u0627\u0631\u062A": _2, "xn--rvc1e0am3e": _2, "\u0D2D\u0D3E\u0D30\u0D24\u0D02": _2, "xn--h2brj9c": _2, "\u092D\u093E\u0930\u0924": _2, "xn--mgbbh1a": _2, "\u0628\u0627\u0631\u062A": _2, "xn--mgbbh1a71e": _2, "\u0628\u06BE\u0627\u0631\u062A": _2, "xn--fpcrj9c3d": _2, "\u0C2D\u0C3E\u0C30\u0C24\u0C4D": _2, "xn--gecrj9c": _2, "\u0AAD\u0ABE\u0AB0\u0AA4": _2, "xn--s9brj9c": _2, "\u0A2D\u0A3E\u0A30\u0A24": _2, "xn--45brj9c": _2, "\u09AD\u09BE\u09B0\u09A4": _2, "xn--xkc2dl3a5ee0h": _2, "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE": _2, "xn--mgba3a4f16a": _2, "\u0627\u06CC\u0631\u0627\u0646": _2, "xn--mgba3a4fra": _2, "\u0627\u064A\u0631\u0627\u0646": _2, "xn--mgbtx2b": _2, "\u0639\u0631\u0627\u0642": _2, "xn--mgbayh7gpa": _2, "\u0627\u0644\u0627\u0631\u062F\u0646": _2, "xn--3e0b707e": _2, "\uD55C\uAD6D": _2, "xn--80ao21a": _2, "\u049B\u0430\u0437": _2, "xn--q7ce6a": _2, "\u0EA5\u0EB2\u0EA7": _2, "xn--fzc2c9e2c": _2, "\u0DBD\u0D82\u0D9A\u0DCF": _2, "xn--xkc2al3hye2a": _2, "\u0B87\u0BB2\u0B99\u0BCD\u0B95\u0BC8": _2, "xn--mgbc0a9azcg": _2, "\u0627\u0644\u0645\u063A\u0631\u0628": _2, "xn--d1alf": _2, "\u043C\u043A\u0434": _2, "xn--l1acc": _2, "\u043C\u043E\u043D": _2, "xn--mix891f": _2, "\u6FB3\u9580": _2, "xn--mix082f": _2, "\u6FB3\u95E8": _2, "xn--mgbx4cd0ab": _2, "\u0645\u0644\u064A\u0633\u064A\u0627": _2, "xn--mgb9awbf": _2, "\u0639\u0645\u0627\u0646": _2, "xn--mgbai9azgqp6j": _2, "\u067E\u0627\u06A9\u0633\u062A\u0627\u0646": _2, "xn--mgbai9a5eva00b": _2, "\u067E\u0627\u0643\u0633\u062A\u0627\u0646": _2, "xn--ygbi2ammx": _2, "\u0641\u0644\u0633\u0637\u064A\u0646": _2, "xn--90a3ac": [1, { "xn--o1ac": _2, "xn--c1avg": _2, "xn--90azh": _2, "xn--d1at": _2, "xn--o1ach": _2, "xn--80au": _2 }], "\u0441\u0440\u0431": [1, { "\u043F\u0440": _2, "\u043E\u0440\u0433": _2, "\u043E\u0431\u0440": _2, "\u043E\u0434": _2, "\u0443\u043F\u0440": _2, "\u0430\u043A": _2 }], "xn--p1ai": _2, "\u0440\u0444": _2, "xn--wgbl6a": _2, "\u0642\u0637\u0631": _2, "xn--mgberp4a5d4ar": _2, "\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629": _2, "xn--mgberp4a5d4a87g": _2, "\u0627\u0644\u0633\u0639\u0648\u062F\u06CC\u0629": _2, "xn--mgbqly7c0a67fbc": _2, "\u0627\u0644\u0633\u0639\u0648\u062F\u06CC\u06C3": _2, "xn--mgbqly7cvafr": _2, "\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0647": _2, "xn--mgbpl2fh": _2, "\u0633\u0648\u062F\u0627\u0646": _2, "xn--yfro4i67o": _2, "\u65B0\u52A0\u5761": _2, "xn--clchc0ea0b2g2a9gcd": _2, "\u0B9A\u0BBF\u0B99\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0BC2\u0BB0\u0BCD": _2, "xn--ogbpf8fl": _2, "\u0633\u0648\u0631\u064A\u0629": _2, "xn--mgbtf8fl": _2, "\u0633\u0648\u0631\u064A\u0627": _2, "xn--o3cw4h": [1, { "xn--12c1fe0br": _2, "xn--12co0c3b4eva": _2, "xn--h3cuzk1di": _2, "xn--o3cyx2a": _2, "xn--m3ch0j3a": _2, "xn--12cfi8ixb8l": _2 }], "\u0E44\u0E17\u0E22": [1, { "\u0E28\u0E36\u0E01\u0E29\u0E32": _2, "\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08": _2, "\u0E23\u0E31\u0E10\u0E1A\u0E32\u0E25": _2, "\u0E17\u0E2B\u0E32\u0E23": _2, "\u0E40\u0E19\u0E47\u0E15": _2, "\u0E2D\u0E07\u0E04\u0E4C\u0E01\u0E23": _2 }], "xn--pgbs0dh": _2, "\u062A\u0648\u0646\u0633": _2, "xn--kpry57d": _2, "\u53F0\u7063": _2, "xn--kprw13d": _2, "\u53F0\u6E7E": _2, "xn--nnx388a": _2, "\u81FA\u7063": _2, "xn--j1amh": _2, "\u0443\u043A\u0440": _2, "xn--mgb2ddes": _2, "\u0627\u0644\u064A\u0645\u0646": _2, "xxx": _2, "ye": _51, "za": [0, { "ac": _2, "agric": _2, "alt": _2, "co": _9, "edu": _2, "gov": _2, "grondar": _2, "law": _2, "mil": _2, "net": _2, "ngo": _2, "nic": _2, "nis": _2, "nom": _2, "org": _2, "school": _2, "tm": _2, "web": _2 }], "zm": [1, { "ac": _2, "biz": _2, "co": _2, "com": _2, "edu": _2, "gov": _2, "info": _2, "mil": _2, "net": _2, "org": _2, "sch": _2 }], "zw": [1, { "ac": _2, "co": _2, "gov": _2, "mil": _2, "org": _2 }], "aaa": _2, "aarp": _2, "abb": _2, "abbott": _2, "abbvie": _2, "abc": _2, "able": _2, "abogado": _2, "abudhabi": _2, "academy": [1, { "official": _3 }], "accenture": _2, "accountant": _2, "accountants": _2, "aco": _2, "actor": _2, "ads": _2, "adult": _2, "aeg": _2, "aetna": _2, "afl": _2, "africa": _2, "agakhan": _2, "agency": _2, "aig": _2, "airbus": _2, "airforce": _2, "airtel": _2, "akdn": _2, "alibaba": _2, "alipay": _2, "allfinanz": _2, "allstate": _2, "ally": _2, "alsace": _2, "alstom": _2, "amazon": _2, "americanexpress": _2, "americanfamily": _2, "amex": _2, "amfam": _2, "amica": _2, "amsterdam": _2, "analytics": _2, "android": _2, "anquan": _2, "anz": _2, "aol": _2, "apartments": _2, "app": [1, { "adaptable": _3, "beget": _5, "clerk": _3, "clerkstage": _3, "wnext": _3, "csb": [2, { "preview": _3 }], "cyclic": _3, "platform0": _3, "deta": _3, "ondigitalocean": _3, "easypanel": _3, "encr": _3, "evervault": _6, "expo": _7, "edgecompute": _3, "fireweb": _3, "onflashdrive": _3, "flutterflow": _3, "framer": _3, "hosted": _5, "run": _5, "web": _3, "hasura": _3, "loginline": _3, "messerli": _3, "netlify": _3, "ngrok": _3, "ngrok-free": _3, "developer": _5, "noop": _3, "northflank": _5, "upsun": _5, "replit": _8, "snowflake": [0, { "*": _3, "privatelink": _5 }], "streamlit": _3, "storipress": _3, "telebit": _3, "typedream": _3, "vercel": _3, "bookonline": _3, "zeabur": _3 }], "apple": _2, "aquarelle": _2, "arab": _2, "aramco": _2, "archi": _2, "army": _2, "art": _2, "arte": _2, "asda": _2, "associates": _2, "athleta": _2, "attorney": _2, "auction": _2, "audi": _2, "audible": _2, "audio": _2, "auspost": _2, "author": _2, "auto": _2, "autos": _2, "aws": [1, { "sagemaker": [0, { "ap-northeast-1": _12, "ap-northeast-2": _12, "ap-south-1": _12, "ap-southeast-1": _12, "ap-southeast-2": _12, "ca-central-1": _14, "eu-central-1": _12, "eu-west-1": _12, "eu-west-2": _12, "us-east-1": _14, "us-east-2": _14, "us-west-2": _14, "af-south-1": _11, "ap-east-1": _11, "ap-northeast-3": _11, "ap-south-2": _13, "ap-southeast-3": _11, "ap-southeast-4": _13, "ca-west-1": [0, { "notebook": _3, "notebook-fips": _3 }], "eu-central-2": _13, "eu-north-1": _11, "eu-south-1": _11, "eu-south-2": _11, "eu-west-3": _11, "il-central-1": _11, "me-central-1": _11, "me-south-1": _11, "sa-east-1": _11, "us-gov-east-1": _15, "us-gov-west-1": _15, "us-west-1": [0, { "notebook": _3, "notebook-fips": _3, "studio": _3 }] }], "repost": [0, { "private": _5 }] }], "axa": _2, "azure": _2, "baby": _2, "baidu": _2, "banamex": _2, "band": _2, "bank": _2, "bar": _2, "barcelona": _2, "barclaycard": _2, "barclays": _2, "barefoot": _2, "bargains": _2, "baseball": _2, "basketball": [1, { "aus": _3, "nz": _3 }], "bauhaus": _2, "bayern": _2, "bbc": _2, "bbt": _2, "bbva": _2, "bcg": _2, "bcn": _2, "beats": _2, "beauty": _2, "beer": _2, "bentley": _2, "berlin": _2, "best": _2, "bestbuy": _2, "bet": _2, "bharti": _2, "bible": _2, "bid": _2, "bike": _2, "bing": _2, "bingo": _2, "bio": _2, "black": _2, "blackfriday": _2, "blockbuster": _2, "blog": _2, "bloomberg": _2, "blue": _2, "bms": _2, "bmw": _2, "bnpparibas": _2, "boats": _2, "boehringer": _2, "bofa": _2, "bom": _2, "bond": _2, "boo": _2, "book": _2, "booking": _2, "bosch": _2, "bostik": _2, "boston": _2, "bot": _2, "boutique": _2, "box": _2, "bradesco": _2, "bridgestone": _2, "broadway": _2, "broker": _2, "brother": _2, "brussels": _2, "build": _2, "builders": [1, { "cloudsite": _3 }], "business": _18, "buy": _2, "buzz": _2, "bzh": _2, "cab": _2, "cafe": _2, "cal": _2, "call": _2, "calvinklein": _2, "cam": _2, "camera": _2, "camp": [1, { "emf": [0, { "at": _3 }] }], "canon": _2, "capetown": _2, "capital": _2, "capitalone": _2, "car": _2, "caravan": _2, "cards": _2, "care": _2, "career": _2, "careers": _2, "cars": _2, "casa": [1, { "nabu": [0, { "ui": _3 }] }], "case": _2, "cash": _2, "casino": _2, "catering": _2, "catholic": _2, "cba": _2, "cbn": _2, "cbre": _2, "center": _2, "ceo": _2, "cern": _2, "cfa": _2, "cfd": _2, "chanel": _2, "channel": _2, "charity": _2, "chase": _2, "chat": _2, "cheap": _2, "chintai": _2, "christmas": _2, "chrome": _2, "church": _2, "cipriani": _2, "circle": _2, "cisco": _2, "citadel": _2, "citi": _2, "citic": _2, "city": _2, "claims": _2, "cleaning": _2, "click": _2, "clinic": _2, "clinique": _2, "clothing": _2, "cloud": [1, { "banzai": _5, "cyclic": _3, "elementor": _3, "encoway": [0, { "eu": _3 }], "statics": _5, "ravendb": _3, "axarnet": [0, { "es-1": _3 }], "diadem": _3, "jelastic": [0, { "vip": _3 }], "jele": _3, "jenv-aruba": [0, { "aruba": [0, { "eur": [0, { "it1": _3 }] }], "it1": _3 }], "keliweb": [2, { "cs": _3 }], "oxa": [2, { "tn": _3, "uk": _3 }], "primetel": [2, { "uk": _3 }], "reclaim": [0, { "ca": _3, "uk": _3, "us": _3 }], "trendhosting": [0, { "ch": _3, "de": _3 }], "jotelulu": _3, "kuleuven": _3, "linkyard": _3, "magentosite": _5, "observablehq": _3, "perspecta": _3, "vapor": _3, "on-rancher": _5, "scw": [0, { "baremetal": [0, { "fr-par-1": _3, "fr-par-2": _3, "nl-ams-1": _3 }], "fr-par": [0, { "cockpit": _3, "fnc": [2, { "functions": _3 }], "k8s": _20, "s3": _3, "s3-website": _3, "whm": _3 }], "instances": [0, { "priv": _3, "pub": _3 }], "k8s": _3, "nl-ams": [0, { "cockpit": _3, "k8s": _20, "s3": _3, "s3-website": _3, "whm": _3 }], "pl-waw": [0, { "cockpit": _3, "k8s": _20, "s3": _3, "s3-website": _3 }], "scalebook": _3, "smartlabeling": _3 }], "onstackit": [0, { "runs": _3 }], "sensiosite": _5, "trafficplex": _3, "unison-services": _3, "urown": _3, "voorloper": _3, "zap": _3 }], "club": [1, { "cloudns": _3, "jele": _3, "barsy": _3 }], "clubmed": _2, "coach": _2, "codes": [1, { "owo": _5 }], "coffee": _2, "college": _2, "cologne": _2, "commbank": _2, "community": [1, { "nog": _3, "ravendb": _3, "myforum": _3 }], "company": _2, "compare": _2, "computer": _2, "comsec": _2, "condos": _2, "construction": _2, "consulting": _2, "contact": _2, "contractors": _2, "cooking": _2, "cool": [1, { "elementor": _3, "de": _3 }], "corsica": _2, "country": _2, "coupon": _2, "coupons": _2, "courses": _2, "cpa": _2, "credit": _2, "creditcard": _2, "creditunion": _2, "cricket": _2, "crown": _2, "crs": _2, "cruise": _2, "cruises": _2, "cuisinella": _2, "cymru": _2, "cyou": _2, "dabur": _2, "dad": _2, "dance": _2, "data": _2, "date": _2, "dating": _2, "datsun": _2, "day": _2, "dclk": _2, "dds": _2, "deal": _2, "dealer": _2, "deals": _2, "degree": _2, "delivery": _2, "dell": _2, "deloitte": _2, "delta": _2, "democrat": _2, "dental": _2, "dentist": _2, "desi": _2, "design": [1, { "graphic": _3, "bss": _3 }], "dev": [1, { "12chars": _3, "panel": _3, "autocode": _3, "lcl": _5, "lclstage": _5, "stg": _5, "stgstage": _5, "pages": _3, "r2": _3, "workers": _3, "curv": _3, "deno": _3, "deno-staging": _3, "deta": _3, "evervault": _6, "fly": _3, "githubpreview": _3, "gateway": _5, "is-a": _3, "iserv": _3, "runcontainers": _3, "localcert": [0, { "user": _5 }], "loginline": _3, "barsy": _3, "mediatech": _3, "modx": _3, "ngrok": _3, "ngrok-free": _3, "is-cool": _3, "is-not-a": _3, "localplayer": _3, "xmit": _3, "platter-app": _3, "replit": [2, { "archer": _3, "bones": _3, "canary": _3, "global": _3, "hacker": _3, "id": _3, "janeway": _3, "kim": _3, "kira": _3, "kirk": _3, "odo": _3, "paris": _3, "picard": _3, "pike": _3, "prerelease": _3, "reed": _3, "riker": _3, "sisko": _3, "spock": _3, "staging": _3, "sulu": _3, "tarpit": _3, "teams": _3, "tucker": _3, "wesley": _3, "worf": _3 }], "shiftcrypto": _3, "vercel": _3, "webhare": _5 }], "dhl": _2, "diamonds": _2, "diet": _2, "digital": [1, { "cloudapps": [2, { "london": _3 }] }], "direct": _2, "directory": _2, "discount": _2, "discover": _2, "dish": _2, "diy": _2, "dnp": _2, "docs": _2, "doctor": _2, "dog": _2, "domains": _2, "dot": _2, "download": _2, "drive": _2, "dtv": _2, "dubai": _2, "dunlop": _2, "dupont": _2, "durban": _2, "dvag": _2, "dvr": _2, "earth": [1, { "dapps": [0, { "*": _3, "bzz": _5 }] }], "eat": _2, "eco": _2, "edeka": _2, "education": _18, "email": [1, { "crisp": [0, { "on": _3 }] }], "emerck": _2, "energy": _2, "engineer": _2, "engineering": _2, "enterprises": _2, "epson": _2, "equipment": _2, "ericsson": _2, "erni": _2, "esq": _2, "estate": [1, { "compute": _5 }], "eurovision": _2, "eus": [1, { "party": _46 }], "events": [1, { "koobin": _3, "co": _3 }], "exchange": _2, "expert": _2, "exposed": _2, "express": _2, "extraspace": _2, "fage": _2, "fail": _2, "fairwinds": _2, "faith": _47, "family": _2, "fan": _2, "fans": _2, "farm": [1, { "storj": _3 }], "farmers": _2, "fashion": _2, "fast": _2, "fedex": _2, "feedback": _2, "ferrari": _2, "ferrero": _2, "fidelity": _2, "fido": _2, "film": _2, "final": _2, "finance": _2, "financial": _18, "fire": _2, "firestone": _2, "firmdale": _2, "fish": _2, "fishing": _2, "fit": _2, "fitness": _2, "flickr": _2, "flights": _2, "flir": _2, "florist": _2, "flowers": _2, "fly": _2, "foo": _2, "food": _2, "football": _2, "ford": _2, "forex": _2, "forsale": _2, "forum": _2, "foundation": _2, "fox": _2, "free": _2, "fresenius": _2, "frl": _2, "frogans": _2, "frontier": _2, "ftr": _2, "fujitsu": _2, "fun": _2, "fund": _2, "furniture": _2, "futbol": _2, "fyi": _2, "gal": _2, "gallery": _2, "gallo": _2, "gallup": _2, "game": _2, "games": [1, { "pley": _3, "sheezy": _3 }], "gap": _2, "garden": _2, "gay": [1, { "pages": _3 }], "gbiz": _2, "gdn": [1, { "cnpy": _3 }], "gea": _2, "gent": _2, "genting": _2, "george": _2, "ggee": _2, "gift": _2, "gifts": _2, "gives": _2, "giving": _2, "glass": _2, "gle": _2, "global": _2, "globo": _2, "gmail": _2, "gmbh": _2, "gmo": _2, "gmx": _2, "godaddy": _2, "gold": _2, "goldpoint": _2, "golf": _2, "goo": _2, "goodyear": _2, "goog": [1, { "cloud": _3, "translate": _3, "usercontent": _5 }], "google": _2, "gop": _2, "got": _2, "grainger": _2, "graphics": _2, "gratis": _2, "green": _2, "gripe": _2, "grocery": _2, "group": [1, { "discourse": _3 }], "gucci": _2, "guge": _2, "guide": _2, "guitars": _2, "guru": _2, "hair": _2, "hamburg": _2, "hangout": _2, "haus": _2, "hbo": _2, "hdfc": _2, "hdfcbank": _2, "health": [1, { "hra": _3 }], "healthcare": _2, "help": _2, "helsinki": _2, "here": _2, "hermes": _2, "hiphop": _2, "hisamitsu": _2, "hitachi": _2, "hiv": _2, "hkt": _2, "hockey": _2, "holdings": _2, "holiday": _2, "homedepot": _2, "homegoods": _2, "homes": _2, "homesense": _2, "honda": _2, "horse": _2, "hospital": _2, "host": [1, { "cloudaccess": _3, "freesite": _3, "easypanel": _3, "fastvps": _3, "myfast": _3, "tempurl": _3, "wpmudev": _3, "jele": _3, "mircloud": _3, "pcloud": _3, "half": _3 }], "hosting": [1, { "opencraft": _3 }], "hot": _2, "hotels": _2, "hotmail": _2, "house": _2, "how": _2, "hsbc": _2, "hughes": _2, "hyatt": _2, "hyundai": _2, "ibm": _2, "icbc": _2, "ice": _2, "icu": _2, "ieee": _2, "ifm": _2, "ikano": _2, "imamat": _2, "imdb": _2, "immo": _2, "immobilien": _2, "inc": _2, "industries": _2, "infiniti": _2, "ing": _2, "ink": _2, "institute": _2, "insurance": _2, "insure": _2, "international": _2, "intuit": _2, "investments": _2, "ipiranga": _2, "irish": _2, "ismaili": _2, "ist": _2, "istanbul": _2, "itau": _2, "itv": _2, "jaguar": _2, "java": _2, "jcb": _2, "jeep": _2, "jetzt": _2, "jewelry": _2, "jio": _2, "jll": _2, "jmp": _2, "jnj": _2, "joburg": _2, "jot": _2, "joy": _2, "jpmorgan": _2, "jprs": _2, "juegos": _2, "juniper": _2, "kaufen": _2, "kddi": _2, "kerryhotels": _2, "kerrylogistics": _2, "kerryproperties": _2, "kfh": _2, "kia": _2, "kids": _2, "kim": _2, "kindle": _2, "kitchen": _2, "kiwi": _2, "koeln": _2, "komatsu": _2, "kosher": _2, "kpmg": _2, "kpn": _2, "krd": [1, { "co": _3, "edu": _3 }], "kred": _2, "kuokgroup": _2, "kyoto": _2, "lacaixa": _2, "lamborghini": _2, "lamer": _2, "lancaster": _2, "land": [1, { "static": [2, { "dev": _3, "sites": _3 }] }], "landrover": _2, "lanxess": _2, "lasalle": _2, "lat": _2, "latino": _2, "latrobe": _2, "law": _2, "lawyer": _2, "lds": _2, "lease": _2, "leclerc": _2, "lefrak": _2, "legal": _2, "lego": _2, "lexus": _2, "lgbt": _2, "lidl": _2, "life": _2, "lifeinsurance": _2, "lifestyle": _2, "lighting": _2, "like": _2, "lilly": _2, "limited": _2, "limo": _2, "lincoln": _2, "link": [1, { "myfritz": _3, "cyon": _3, "nftstorage": [0, { "ipfs": _3 }], "mypep": _3, "dweb": _5 }], "lipsy": _2, "live": [1, { "aem": _3, "hlx": _3, "ewp": _5 }], "living": _2, "llc": _2, "llp": _2, "loan": _2, "loans": _2, "locker": _2, "locus": _2, "lol": [1, { "omg": _3 }], "london": _2, "lotte": _2, "lotto": _2, "love": _2, "lpl": _2, "lplfinancial": _2, "ltd": _2, "ltda": _2, "lundbeck": _2, "luxe": _2, "luxury": _2, "madrid": _2, "maif": _2, "maison": _2, "makeup": _2, "man": _2, "management": [1, { "router": _3 }], "mango": _2, "map": _2, "market": _2, "marketing": _2, "markets": _2, "marriott": _2, "marshalls": _2, "mattel": _2, "mba": _2, "mckinsey": _2, "med": _2, "media": _55, "meet": _2, "melbourne": _2, "meme": _2, "memorial": _2, "men": _2, "menu": [1, { "barsy": _3, "barsyonline": _3 }], "merckmsd": _2, "miami": _2, "microsoft": _2, "mini": _2, "mint": _2, "mit": _2, "mitsubishi": _2, "mlb": _2, "mls": _2, "mma": _2, "mobile": _2, "moda": _2, "moe": _2, "moi": _2, "mom": [1, { "ind": _3 }], "monash": _2, "money": _2, "monster": _2, "mormon": _2, "mortgage": _2, "moscow": _2, "moto": _2, "motorcycles": _2, "mov": _2, "movie": _2, "msd": _2, "mtn": _2, "mtr": _2, "music": _2, "nab": _2, "nagoya": _2, "navy": _2, "nba": _2, "nec": _2, "netbank": _2, "netflix": _2, "network": [1, { "alces": _5, "co": _3, "arvo": _3, "azimuth": _3, "tlon": _3 }], "neustar": _2, "new": _2, "news": [1, { "noticeable": _3 }], "next": _2, "nextdirect": _2, "nexus": _2, "nfl": _2, "ngo": _2, "nhk": _2, "nico": _2, "nike": _2, "nikon": _2, "ninja": _2, "nissan": _2, "nissay": _2, "nokia": _2, "norton": _2, "now": _2, "nowruz": _2, "nowtv": _2, "nra": _2, "nrw": _2, "ntt": _2, "nyc": _2, "obi": _2, "observer": _2, "office": _2, "okinawa": _2, "olayan": _2, "olayangroup": _2, "ollo": _2, "omega": _2, "one": [1, { "onred": _7, "kin": _5, "service": _3, "homelink": _3 }], "ong": _2, "onl": _2, "online": [1, { "eero": _3, "eero-stage": _3, "barsy": _3 }], "ooo": _2, "open": _2, "oracle": _2, "orange": [1, { "tech": _3 }], "organic": _2, "origins": _2, "osaka": _2, "otsuka": _2, "ott": _2, "ovh": [1, { "nerdpol": _3 }], "page": [1, { "aem": _3, "hlx": _3, "hlx3": _3, "translated": _3, "codeberg": _3, "prvcy": _3, "pdns": _3, "plesk": _3, "rocky": _3, "magnet": _3 }], "panasonic": _2, "paris": _2, "pars": _2, "partners": _2, "parts": _2, "party": _47, "pay": _2, "pccw": _2, "pet": _2, "pfizer": _2, "pharmacy": _2, "phd": _2, "philips": _2, "phone": _2, "photo": _2, "photography": _2, "photos": _55, "physio": _2, "pics": _2, "pictet": _2, "pictures": [1, { "1337": _3 }], "pid": _2, "pin": _2, "ping": _2, "pink": _2, "pioneer": _2, "pizza": [1, { "ngrok": _3 }], "place": _18, "play": _2, "playstation": _2, "plumbing": _2, "plus": _2, "pnc": _2, "pohl": _2, "poker": _2, "politie": _2, "porn": _2, "pramerica": _2, "praxi": _2, "press": _2, "prime": _2, "prod": _2, "productions": _2, "prof": _2, "progressive": _2, "promo": _2, "properties": _2, "property": _2, "protection": _2, "pru": _2, "prudential": _2, "pub": [1, { "id": _5, "kin": _5, "barsy": _3 }], "pwc": _2, "qpon": _2, "quebec": _2, "quest": _2, "racing": _2, "radio": _2, "read": _2, "realestate": _2, "realtor": _2, "realty": _2, "recipes": _2, "red": _2, "redstone": _2, "redumbrella": _2, "rehab": _2, "reise": _2, "reisen": _2, "reit": _2, "reliance": _2, "ren": _2, "rent": _2, "rentals": _2, "repair": _2, "report": _2, "republican": _2, "rest": _2, "restaurant": _2, "review": _47, "reviews": _2, "rexroth": _2, "rich": _2, "richardli": _2, "ricoh": _2, "ril": _2, "rio": _2, "rip": [1, { "clan": _3 }], "rocks": [1, { "myddns": _3, "stackit": _3, "lima-city": _3, "webspace": _3 }], "rodeo": _2, "rogers": _2, "room": _2, "rsvp": _2, "rugby": _2, "ruhr": _2, "run": [1, { "hs": _3, "development": _3, "ravendb": _3, "servers": _3, "build": _5, "code": _5, "database": _5, "migration": _5, "onporter": _3, "repl": _3, "stackit": _3, "val": [0, { "express": _3, "web": _3 }], "wix": _3 }], "rwe": _2, "ryukyu": _2, "saarland": _2, "safe": _2, "safety": _2, "sakura": _2, "sale": _2, "salon": _2, "samsclub": _2, "samsung": _2, "sandvik": _2, "sandvikcoromant": _2, "sanofi": _2, "sap": _2, "sarl": _2, "sas": _2, "save": _2, "saxo": _2, "sbi": _2, "sbs": _2, "scb": _2, "schaeffler": _2, "schmidt": _2, "scholarships": _2, "school": _2, "schule": _2, "schwarz": _2, "science": _47, "scot": [1, { "edu": _3, "gov": [2, { "service": _3 }] }], "search": _2, "seat": _2, "secure": _2, "security": _2, "seek": _2, "select": _2, "sener": _2, "services": [1, { "loginline": _3 }], "seven": _2, "sew": _2, "sex": _2, "sexy": _2, "sfr": _2, "shangrila": _2, "sharp": _2, "shaw": _2, "shell": _2, "shia": _2, "shiksha": _2, "shoes": _2, "shop": [1, { "base": _3, "hoplix": _3, "barsy": _3, "barsyonline": _3 }], "shopping": _2, "shouji": _2, "show": _2, "silk": _2, "sina": _2, "singles": _2, "site": [1, { "canva": _21, "cloudera": _5, "convex": _3, "cyon": _3, "fnwk": _3, "folionetwork": _3, "fastvps": _3, "jele": _3, "jouwweb": _3, "lelux": _3, "loginline": _3, "barsy": _3, "mintere": _3, "notion": _3, "omniwe": _3, "opensocial": _3, "madethis": _3, "platformsh": _5, "tst": _5, "byen": _3, "srht": _3, "novecore": _3 }], "ski": _2, "skin": _2, "sky": _2, "skype": _2, "sling": _2, "smart": _2, "smile": _2, "sncf": _2, "soccer": _2, "social": _2, "softbank": _2, "software": _2, "sohu": _2, "solar": _2, "solutions": [1, { "diher": _5 }], "song": _2, "sony": _2, "soy": _2, "spa": _2, "space": [1, { "myfast": _3, "heiyu": _3, "uber": _3, "xs4all": _3 }], "sport": _2, "spot": _2, "srl": _2, "stada": _2, "staples": _2, "star": _2, "statebank": _2, "statefarm": _2, "stc": _2, "stcgroup": _2, "stockholm": _2, "storage": _2, "store": [1, { "barsy": _3, "sellfy": _3, "shopware": _3, "storebase": _3 }], "stream": _2, "studio": _2, "study": _2, "style": _2, "sucks": _2, "supplies": _2, "supply": _2, "support": [1, { "barsy": _3 }], "surf": _2, "surgery": _2, "suzuki": _2, "swatch": _2, "swiss": _2, "sydney": _2, "systems": [1, { "knightpoint": _3 }], "tab": _2, "taipei": _2, "talk": _2, "taobao": _2, "target": _2, "tatamotors": _2, "tatar": _2, "tattoo": _2, "tax": _2, "taxi": _2, "tci": _2, "tdk": _2, "team": [1, { "discourse": _3, "jelastic": _3 }], "tech": [1, { "cleverapps": _3 }], "technology": _18, "temasek": _2, "tennis": _2, "teva": _2, "thd": _2, "theater": _2, "theatre": _2, "tiaa": _2, "tickets": _2, "tienda": _2, "tips": _2, "tires": _2, "tirol": _2, "tjmaxx": _2, "tjx": _2, "tkmaxx": _2, "tmall": _2, "today": [1, { "prequalifyme": _3 }], "tokyo": _2, "tools": _2, "top": [1, { "now-dns": _3, "ntdll": _3, "wadl": _5 }], "toray": _2, "toshiba": _2, "total": _2, "tours": _2, "town": _2, "toyota": _2, "toys": _2, "trade": _47, "trading": _2, "training": _2, "travel": _2, "travelers": _2, "travelersinsurance": _2, "trust": _2, "trv": _2, "tube": _2, "tui": _2, "tunes": _2, "tushu": _2, "tvs": _2, "ubank": _2, "ubs": _2, "unicom": _2, "university": _2, "uno": _2, "uol": _2, "ups": _2, "vacations": _2, "vana": _2, "vanguard": _2, "vegas": _2, "ventures": _2, "verisign": _2, "versicherung": _2, "vet": _2, "viajes": _2, "video": _2, "vig": _2, "viking": _2, "villas": _2, "vin": _2, "vip": _2, "virgin": _2, "visa": _2, "vision": _2, "viva": _2, "vivo": _2, "vlaanderen": _2, "vodka": [1, { "aaa": _3 }], "volvo": _2, "vote": _2, "voting": _2, "voto": _2, "voyage": _2, "wales": _2, "walmart": _2, "walter": _2, "wang": _2, "wanggou": _2, "watch": _2, "watches": _2, "weather": _2, "weatherchannel": _2, "webcam": _2, "weber": _2, "website": _55, "wed": _2, "wedding": _2, "weibo": _2, "weir": _2, "whoswho": _2, "wien": _2, "wiki": _55, "williamhill": _2, "win": _2, "windows": _2, "wine": _2, "winners": _2, "wme": _2, "wolterskluwer": _2, "woodside": _2, "work": [1, { "corpnet": _3 }], "works": _2, "world": _2, "wow": _2, "wtc": _2, "wtf": _2, "xbox": _2, "xerox": _2, "xihuan": _2, "xin": _2, "xn--11b4c3d": _2, "\u0915\u0949\u092E": _2, "xn--1ck2e1b": _2, "\u30BB\u30FC\u30EB": _2, "xn--1qqw23a": _2, "\u4F5B\u5C71": _2, "xn--30rr7y": _2, "\u6148\u5584": _2, "xn--3bst00m": _2, "\u96C6\u56E2": _2, "xn--3ds443g": _2, "\u5728\u7EBF": _2, "xn--3pxu8k": _2, "\u70B9\u770B": _2, "xn--42c2d9a": _2, "\u0E04\u0E2D\u0E21": _2, "xn--45q11c": _2, "\u516B\u5366": _2, "xn--4gbrim": _2, "\u0645\u0648\u0642\u0639": _2, "xn--55qw42g": _2, "\u516C\u76CA": _2, "xn--55qx5d": _2, "\u516C\u53F8": _2, "xn--5su34j936bgsg": _2, "\u9999\u683C\u91CC\u62C9": _2, "xn--5tzm5g": _2, "\u7F51\u7AD9": _2, "xn--6frz82g": _2, "\u79FB\u52A8": _2, "xn--6qq986b3xl": _2, "\u6211\u7231\u4F60": _2, "xn--80adxhks": _2, "\u043C\u043E\u0441\u043A\u0432\u0430": _2, "xn--80aqecdr1a": _2, "\u043A\u0430\u0442\u043E\u043B\u0438\u043A": _2, "xn--80asehdb": _2, "\u043E\u043D\u043B\u0430\u0439\u043D": _2, "xn--80aswg": _2, "\u0441\u0430\u0439\u0442": _2, "xn--8y0a063a": _2, "\u8054\u901A": _2, "xn--9dbq2a": _2, "\u05E7\u05D5\u05DD": _2, "xn--9et52u": _2, "\u65F6\u5C1A": _2, "xn--9krt00a": _2, "\u5FAE\u535A": _2, "xn--b4w605ferd": _2, "\u6DE1\u9A6C\u9521": _2, "xn--bck1b9a5dre4c": _2, "\u30D5\u30A1\u30C3\u30B7\u30E7\u30F3": _2, "xn--c1avg": _2, "\u043E\u0440\u0433": _2, "xn--c2br7g": _2, "\u0928\u0947\u091F": _2, "xn--cck2b3b": _2, "\u30B9\u30C8\u30A2": _2, "xn--cckwcxetd": _2, "\u30A2\u30DE\u30BE\u30F3": _2, "xn--cg4bki": _2, "\uC0BC\uC131": _2, "xn--czr694b": _2, "\u5546\u6807": _2, "xn--czrs0t": _2, "\u5546\u5E97": _2, "xn--czru2d": _2, "\u5546\u57CE": _2, "xn--d1acj3b": _2, "\u0434\u0435\u0442\u0438": _2, "xn--eckvdtc9d": _2, "\u30DD\u30A4\u30F3\u30C8": _2, "xn--efvy88h": _2, "\u65B0\u95FB": _2, "xn--fct429k": _2, "\u5BB6\u96FB": _2, "xn--fhbei": _2, "\u0643\u0648\u0645": _2, "xn--fiq228c5hs": _2, "\u4E2D\u6587\u7F51": _2, "xn--fiq64b": _2, "\u4E2D\u4FE1": _2, "xn--fjq720a": _2, "\u5A31\u4E50": _2, "xn--flw351e": _2, "\u8C37\u6B4C": _2, "xn--fzys8d69uvgm": _2, "\u96FB\u8A0A\u76C8\u79D1": _2, "xn--g2xx48c": _2, "\u8D2D\u7269": _2, "xn--gckr3f0f": _2, "\u30AF\u30E9\u30A6\u30C9": _2, "xn--gk3at1e": _2, "\u901A\u8CA9": _2, "xn--hxt814e": _2, "\u7F51\u5E97": _2, "xn--i1b6b1a6a2e": _2, "\u0938\u0902\u0917\u0920\u0928": _2, "xn--imr513n": _2, "\u9910\u5385": _2, "xn--io0a7i": _2, "\u7F51\u7EDC": _2, "xn--j1aef": _2, "\u043A\u043E\u043C": _2, "xn--jlq480n2rg": _2, "\u4E9A\u9A6C\u900A": _2, "xn--jvr189m": _2, "\u98DF\u54C1": _2, "xn--kcrx77d1x4a": _2, "\u98DE\u5229\u6D66": _2, "xn--kput3i": _2, "\u624B\u673A": _2, "xn--mgba3a3ejt": _2, "\u0627\u0631\u0627\u0645\u0643\u0648": _2, "xn--mgba7c0bbn0a": _2, "\u0627\u0644\u0639\u0644\u064A\u0627\u0646": _2, "xn--mgbab2bd": _2, "\u0628\u0627\u0632\u0627\u0631": _2, "xn--mgbca7dzdo": _2, "\u0627\u0628\u0648\u0638\u0628\u064A": _2, "xn--mgbi4ecexp": _2, "\u0643\u0627\u062B\u0648\u0644\u064A\u0643": _2, "xn--mgbt3dhd": _2, "\u0647\u0645\u0631\u0627\u0647": _2, "xn--mk1bu44c": _2, "\uB2F7\uCEF4": _2, "xn--mxtq1m": _2, "\u653F\u5E9C": _2, "xn--ngbc5azd": _2, "\u0634\u0628\u0643\u0629": _2, "xn--ngbe9e0a": _2, "\u0628\u064A\u062A\u0643": _2, "xn--ngbrx": _2, "\u0639\u0631\u0628": _2, "xn--nqv7f": _2, "\u673A\u6784": _2, "xn--nqv7fs00ema": _2, "\u7EC4\u7EC7\u673A\u6784": _2, "xn--nyqy26a": _2, "\u5065\u5EB7": _2, "xn--otu796d": _2, "\u62DB\u8058": _2, "xn--p1acf": [1, { "xn--90amc": _3, "xn--j1aef": _3, "xn--j1ael8b": _3, "xn--h1ahn": _3, "xn--j1adp": _3, "xn--c1avg": _3, "xn--80aaa0cvac": _3, "xn--h1aliz": _3, "xn--90a1af": _3, "xn--41a": _3 }], "\u0440\u0443\u0441": [1, { "\u0431\u0438\u0437": _3, "\u043A\u043E\u043C": _3, "\u043A\u0440\u044B\u043C": _3, "\u043C\u0438\u0440": _3, "\u043C\u0441\u043A": _3, "\u043E\u0440\u0433": _3, "\u0441\u0430\u043C\u0430\u0440\u0430": _3, "\u0441\u043E\u0447\u0438": _3, "\u0441\u043F\u0431": _3, "\u044F": _3 }], "xn--pssy2u": _2, "\u5927\u62FF": _2, "xn--q9jyb4c": _2, "\u307F\u3093\u306A": _2, "xn--qcka1pmc": _2, "\u30B0\u30FC\u30B0\u30EB": _2, "xn--rhqv96g": _2, "\u4E16\u754C": _2, "xn--rovu88b": _2, "\u66F8\u7C4D": _2, "xn--ses554g": _2, "\u7F51\u5740": _2, "xn--t60b56a": _2, "\uB2F7\uB137": _2, "xn--tckwe": _2, "\u30B3\u30E0": _2, "xn--tiq49xqyj": _2, "\u5929\u4E3B\u6559": _2, "xn--unup4y": _2, "\u6E38\u620F": _2, "xn--vermgensberater-ctb": _2, "verm\xF6gensberater": _2, "xn--vermgensberatung-pwb": _2, "verm\xF6gensberatung": _2, "xn--vhquv": _2, "\u4F01\u4E1A": _2, "xn--vuq861b": _2, "\u4FE1\u606F": _2, "xn--w4r85el8fhu5dnra": _2, "\u5609\u91CC\u5927\u9152\u5E97": _2, "xn--w4rs40l": _2, "\u5609\u91CC": _2, "xn--xhq521b": _2, "\u5E7F\u4E1C": _2, "xn--zfr164b": _2, "\u653F\u52A1": _2, "xyz": [1, { "blogsite": _3, "localzone": _3, "crafting": _3, "zapto": _3, "telebit": _5 }], "yachts": _2, "yahoo": _2, "yamaxun": _2, "yandex": _2, "yodobashi": _2, "yoga": _2, "yokohama": _2, "you": _2, "youtube": _2, "yun": _2, "zappos": _2, "zara": _2, "zero": _2, "zip": _2, "zone": [1, { "cloud66": _3, "hs": _3, "triton": _5, "stackit": _3, "lima": _3 }], "zuerich": _2 }];
        return rules2;
      }();
      function lookupInTrie(parts, trie, index, allowedMask) {
        let result = null;
        let node = trie;
        while (node !== void 0) {
          if ((node[0] & allowedMask) !== 0) {
            result = {
              index: index + 1,
              isIcann: node[0] === 1,
              isPrivate: node[0] === 2
            };
          }
          if (index === -1) {
            break;
          }
          const succ = node[1];
          node = Object.prototype.hasOwnProperty.call(succ, parts[index]) ? succ[parts[index]] : succ["*"];
          index -= 1;
        }
        return result;
      }
      function suffixLookup(hostname, options, out) {
        var _a;
        if (fastPathLookup(hostname, options, out)) {
          return;
        }
        const hostnameParts = hostname.split(".");
        const allowedMask = (options.allowPrivateDomains ? 2 : 0) | (options.allowIcannDomains ? 1 : 0);
        const exceptionMatch = lookupInTrie(hostnameParts, exceptions, hostnameParts.length - 1, allowedMask);
        if (exceptionMatch !== null) {
          out.isIcann = exceptionMatch.isIcann;
          out.isPrivate = exceptionMatch.isPrivate;
          out.publicSuffix = hostnameParts.slice(exceptionMatch.index + 1).join(".");
          return;
        }
        const rulesMatch = lookupInTrie(hostnameParts, rules, hostnameParts.length - 1, allowedMask);
        if (rulesMatch !== null) {
          out.isIcann = rulesMatch.isIcann;
          out.isPrivate = rulesMatch.isPrivate;
          out.publicSuffix = hostnameParts.slice(rulesMatch.index).join(".");
          return;
        }
        out.isIcann = false;
        out.isPrivate = false;
        out.publicSuffix = (_a = hostnameParts[hostnameParts.length - 1]) !== null && _a !== void 0 ? _a : null;
      }
      var RESULT = getEmptyResult();
      function parse3(url, options = {}) {
        return parseImpl(url, 5, suffixLookup, options, getEmptyResult());
      }
      function getHostname(url, options = {}) {
        resetResult(RESULT);
        return parseImpl(url, 0, suffixLookup, options, RESULT).hostname;
      }
      function getPublicSuffix(url, options = {}) {
        resetResult(RESULT);
        return parseImpl(url, 2, suffixLookup, options, RESULT).publicSuffix;
      }
      function getDomain3(url, options = {}) {
        resetResult(RESULT);
        return parseImpl(url, 3, suffixLookup, options, RESULT).domain;
      }
      function getSubdomain(url, options = {}) {
        resetResult(RESULT);
        return parseImpl(url, 4, suffixLookup, options, RESULT).subdomain;
      }
      function getDomainWithoutSuffix(url, options = {}) {
        resetResult(RESULT);
        return parseImpl(url, 5, suffixLookup, options, RESULT).domainWithoutSuffix;
      }
      exports2.getDomain = getDomain3;
      exports2.getDomainWithoutSuffix = getDomainWithoutSuffix;
      exports2.getHostname = getHostname;
      exports2.getPublicSuffix = getPublicSuffix;
      exports2.getSubdomain = getSubdomain;
      exports2.parse = parse3;
    }
  });

  // shared/js/ui/models/allowlist.js
  var require_allowlist2 = __commonJS({
    "shared/js/ui/models/allowlist.js"(exports2, module2) {
      "use strict";
      var Parent2 = window.DDG.base.Model;
      var tldts = require_cjs();
      function Allowlist(attrs) {
        attrs.list = {};
        Parent2.call(this, attrs);
        this.setAllowlistFromSettings();
      }
      Allowlist.prototype = window.$.extend(
        {},
        Parent2.prototype,
        {
          modelName: "allowlist",
          removeDomain(itemIndex) {
            const domain = this.list[itemIndex];
            console.log(`allowlist: remove ${domain}`);
            this.sendMessage("setList", {
              list: "allowlisted",
              domain,
              value: false
            });
            this.sendMessage("allowlistOptIn", {
              list: "allowlistOptIn",
              domain,
              value: false
            });
            this.list.splice(itemIndex, 1);
          },
          addDomain: function(url) {
            url = url ? url.replace(/^www\./, "") : "";
            const parsedDomain = tldts.parse(url);
            const localDomain = url.match(/^localhost(:[0-9]+)?$/i) ? "localhost" : null;
            const subDomain = parsedDomain.subdomain;
            const domain = localDomain || (parsedDomain.isIp ? parsedDomain.hostname : parsedDomain.domain);
            if (domain) {
              const domainToAllowlist = subDomain ? subDomain + "." + domain : domain;
              console.log(`allowlist: add ${domainToAllowlist}`);
              this.sendMessage("setList", {
                list: "allowlisted",
                domain: domainToAllowlist,
                value: true
              });
              this.setAllowlistFromSettings();
            }
            return domain;
          },
          setAllowlistFromSettings: function() {
            const self2 = this;
            this.sendMessage("getSetting", { name: "allowlisted" }).then((allowlist) => {
              allowlist = allowlist || {};
              const wlist = Object.keys(allowlist);
              wlist.sort();
              self2.set("list", wlist);
            });
          }
        }
      );
      module2.exports = Allowlist;
    }
  });

  // shared/js/ui/templates/allowlist.js
  var require_allowlist3 = __commonJS({
    "shared/js/ui/templates/allowlist.js"(exports2, module2) {
      "use strict";
      var bel2 = require_browser();
      var allowlistItems = require_allowlist_items();
      var t2 = window.DDG.base.i18n.t;
      module2.exports = function() {
        return bel2`<section class="options-content__allowlist">
    <h2 class="menu-title">${t2("options:unprotectedSites.title")}</h2>
    <p class="menu-paragraph">${t2("options:unprotectedSitesDesc.title")}</p>
    <ul class="default-list js-allowlist-container">
        ${allowlistItems(this.model.list)}
    </ul>
    ${addToAllowlist()}
</section>`;
        function addToAllowlist() {
          return bel2`<div>
    <p class="allowlist-show-add js-allowlist-show-add">
        <a href="javascript:void(0)" role="button">${t2("options:addUnprotectedSite.title")}</a>
    </p>
    <input class="is-hidden allowlist-url float-left js-allowlist-url" type="text" placeholder="${t2("options:enterURL.title")}">
    <div class="is-hidden allowlist-add is-disabled float-right js-allowlist-add">${t2("shared:add.title")}</div>

    <div class="is-hidden modal-box js-allowlist-error float-right">
        <div class="modal-box__popout">
            <div class="modal-box__popout__body">
            </div>
        </div>
        <div class="modal-box__body">
            <span class="icon icon__error">
            </span>
            <span class="modal__body__text">
                ${t2("options:invalidURL.title")}
            </span>
        </div>
    </div>
</div>`;
        }
      };
    }
  });

  // shared/js/ui/views/user-data.js
  var require_user_data = __commonJS({
    "shared/js/ui/views/user-data.js"(exports2, module2) {
      "use strict";
      var Parent2 = window.DDG.base.View;
      function UserData(ops) {
        this.model = ops.model;
        this.pageView = ops.pageView;
        this.template = ops.template;
        Parent2.call(this, ops);
        this.setup();
      }
      UserData.prototype = window.$.extend(
        {},
        Parent2.prototype,
        {
          _logout: function(e) {
            e.preventDefault();
            this.model.logout();
          },
          setup: function() {
            this._cacheElems(".js-userdata", ["logout"]);
            this.bindEvents([
              [this.$logout, "click", this._logout],
              // listen for changes to the userData model
              [this.store.subscribe, "change:userData", this.rerender]
            ]);
          },
          rerender: function() {
            this.unbindEvents();
            this._rerender();
            this.setup();
          }
        }
      );
      module2.exports = UserData;
    }
  });

  // shared/js/ui/models/user-data.js
  var require_user_data2 = __commonJS({
    "shared/js/ui/models/user-data.js"(exports2, module2) {
      "use strict";
      var Parent2 = window.DDG.base.Model;
      function UserData(attrs) {
        Parent2.call(this, attrs);
        this.setUserDataFromSettings();
      }
      UserData.prototype = window.$.extend(
        {},
        Parent2.prototype,
        {
          modelName: "userData",
          logout() {
            this.sendMessage("logout").then(() => this.set("userName", null));
          },
          setUserDataFromSettings: function() {
            this.sendMessage("getSetting", { name: "userData" }).then((data) => this.set("userName", data?.userName));
          }
        }
      );
      module2.exports = UserData;
    }
  });

  // node_modules/webextension-polyfill/dist/browser-polyfill.js
  var require_browser_polyfill = __commonJS({
    "node_modules/webextension-polyfill/dist/browser-polyfill.js"(exports2, module2) {
      (function(global2, factory) {
        if (typeof define === "function" && define.amd) {
          define("webextension-polyfill", ["module"], factory);
        } else if (typeof exports2 !== "undefined") {
          factory(module2);
        } else {
          var mod = {
            exports: {}
          };
          factory(mod);
          global2.browser = mod.exports;
        }
      })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : exports2, function(module3) {
        "use strict";
        if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) {
          throw new Error("This script should only be loaded in a browser extension.");
        }
        if (!(globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)) {
          const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
          const wrapAPIs = (extensionAPIs) => {
            const apiMetadata = {
              "alarms": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "clearAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "bookmarks": {
                "create": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getChildren": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getRecent": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getSubTree": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTree": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "move": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeTree": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "browserAction": {
                "disable": {
                  "minArgs": 0,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "enable": {
                  "minArgs": 0,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "getBadgeBackgroundColor": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getBadgeText": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getPopup": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTitle": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "openPopup": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "setBadgeBackgroundColor": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setBadgeText": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setIcon": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "setPopup": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setTitle": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "browsingData": {
                "remove": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "removeCache": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeCookies": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeDownloads": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeFormData": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeHistory": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeLocalStorage": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removePasswords": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removePluginData": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "settings": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "commands": {
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "contextMenus": {
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "cookies": {
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAllCookieStores": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "devtools": {
                "inspectedWindow": {
                  "eval": {
                    "minArgs": 1,
                    "maxArgs": 2,
                    "singleCallbackArg": false
                  }
                },
                "panels": {
                  "create": {
                    "minArgs": 3,
                    "maxArgs": 3,
                    "singleCallbackArg": true
                  },
                  "elements": {
                    "createSidebarPane": {
                      "minArgs": 1,
                      "maxArgs": 1
                    }
                  }
                }
              },
              "downloads": {
                "cancel": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "download": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "erase": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getFileIcon": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "open": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "pause": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeFile": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "resume": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "show": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "extension": {
                "isAllowedFileSchemeAccess": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "isAllowedIncognitoAccess": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "history": {
                "addUrl": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "deleteAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "deleteRange": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "deleteUrl": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getVisits": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "i18n": {
                "detectLanguage": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAcceptLanguages": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "identity": {
                "launchWebAuthFlow": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "idle": {
                "queryState": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "management": {
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getSelf": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "setEnabled": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "uninstallSelf": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "notifications": {
                "clear": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "create": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getPermissionLevel": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "pageAction": {
                "getPopup": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTitle": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "hide": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setIcon": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "setPopup": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setTitle": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "show": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "permissions": {
                "contains": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "request": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "runtime": {
                "getBackgroundPage": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getPlatformInfo": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "openOptionsPage": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "requestUpdateCheck": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "sendMessage": {
                  "minArgs": 1,
                  "maxArgs": 3
                },
                "sendNativeMessage": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "setUninstallURL": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "sessions": {
                "getDevices": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getRecentlyClosed": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "restore": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "storage": {
                "local": {
                  "clear": {
                    "minArgs": 0,
                    "maxArgs": 0
                  },
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "remove": {
                    "minArgs": 1,
                    "maxArgs": 1
                  },
                  "set": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                },
                "managed": {
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  }
                },
                "sync": {
                  "clear": {
                    "minArgs": 0,
                    "maxArgs": 0
                  },
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "remove": {
                    "minArgs": 1,
                    "maxArgs": 1
                  },
                  "set": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                }
              },
              "tabs": {
                "captureVisibleTab": {
                  "minArgs": 0,
                  "maxArgs": 2
                },
                "create": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "detectLanguage": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "discard": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "duplicate": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "executeScript": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getCurrent": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getZoom": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getZoomSettings": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "goBack": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "goForward": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "highlight": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "insertCSS": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "move": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "query": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "reload": {
                  "minArgs": 0,
                  "maxArgs": 2
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeCSS": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "sendMessage": {
                  "minArgs": 2,
                  "maxArgs": 3
                },
                "setZoom": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "setZoomSettings": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "update": {
                  "minArgs": 1,
                  "maxArgs": 2
                }
              },
              "topSites": {
                "get": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "webNavigation": {
                "getAllFrames": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getFrame": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "webRequest": {
                "handlerBehaviorChanged": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "windows": {
                "create": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getCurrent": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getLastFocused": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              }
            };
            if (Object.keys(apiMetadata).length === 0) {
              throw new Error("api-metadata.json has not been included in browser-polyfill");
            }
            class DefaultWeakMap extends WeakMap {
              constructor(createItem, items = void 0) {
                super(items);
                this.createItem = createItem;
              }
              get(key) {
                if (!this.has(key)) {
                  this.set(key, this.createItem(key));
                }
                return super.get(key);
              }
            }
            const isThenable = (value) => {
              return value && typeof value === "object" && typeof value.then === "function";
            };
            const makeCallback = (promise, metadata) => {
              return (...callbackArgs) => {
                if (extensionAPIs.runtime.lastError) {
                  promise.reject(new Error(extensionAPIs.runtime.lastError.message));
                } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
                  promise.resolve(callbackArgs[0]);
                } else {
                  promise.resolve(callbackArgs);
                }
              };
            };
            const pluralizeArguments = (numArgs) => numArgs == 1 ? "argument" : "arguments";
            const wrapAsyncFunction = (name, metadata) => {
              return function asyncFunctionWrapper(target, ...args) {
                if (args.length < metadata.minArgs) {
                  throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
                }
                if (args.length > metadata.maxArgs) {
                  throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
                }
                return new Promise((resolve, reject) => {
                  if (metadata.fallbackToNoCallback) {
                    try {
                      target[name](...args, makeCallback({
                        resolve,
                        reject
                      }, metadata));
                    } catch (cbError) {
                      console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError);
                      target[name](...args);
                      metadata.fallbackToNoCallback = false;
                      metadata.noCallback = true;
                      resolve();
                    }
                  } else if (metadata.noCallback) {
                    target[name](...args);
                    resolve();
                  } else {
                    target[name](...args, makeCallback({
                      resolve,
                      reject
                    }, metadata));
                  }
                });
              };
            };
            const wrapMethod = (target, method2, wrapper) => {
              return new Proxy(method2, {
                apply(targetMethod, thisObj, args) {
                  return wrapper.call(thisObj, target, ...args);
                }
              });
            };
            let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
            const wrapObject = (target, wrappers = {}, metadata = {}) => {
              let cache = /* @__PURE__ */ Object.create(null);
              let handlers = {
                has(proxyTarget2, prop) {
                  return prop in target || prop in cache;
                },
                get(proxyTarget2, prop, receiver) {
                  if (prop in cache) {
                    return cache[prop];
                  }
                  if (!(prop in target)) {
                    return void 0;
                  }
                  let value = target[prop];
                  if (typeof value === "function") {
                    if (typeof wrappers[prop] === "function") {
                      value = wrapMethod(target, target[prop], wrappers[prop]);
                    } else if (hasOwnProperty(metadata, prop)) {
                      let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                      value = wrapMethod(target, target[prop], wrapper);
                    } else {
                      value = value.bind(target);
                    }
                  } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
                    value = wrapObject(value, wrappers[prop], metadata[prop]);
                  } else if (hasOwnProperty(metadata, "*")) {
                    value = wrapObject(value, wrappers[prop], metadata["*"]);
                  } else {
                    Object.defineProperty(cache, prop, {
                      configurable: true,
                      enumerable: true,
                      get() {
                        return target[prop];
                      },
                      set(value2) {
                        target[prop] = value2;
                      }
                    });
                    return value;
                  }
                  cache[prop] = value;
                  return value;
                },
                set(proxyTarget2, prop, value, receiver) {
                  if (prop in cache) {
                    cache[prop] = value;
                  } else {
                    target[prop] = value;
                  }
                  return true;
                },
                defineProperty(proxyTarget2, prop, desc) {
                  return Reflect.defineProperty(cache, prop, desc);
                },
                deleteProperty(proxyTarget2, prop) {
                  return Reflect.deleteProperty(cache, prop);
                }
              };
              let proxyTarget = Object.create(target);
              return new Proxy(proxyTarget, handlers);
            };
            const wrapEvent = (wrapperMap) => ({
              addListener(target, listener, ...args) {
                target.addListener(wrapperMap.get(listener), ...args);
              },
              hasListener(target, listener) {
                return target.hasListener(wrapperMap.get(listener));
              },
              removeListener(target, listener) {
                target.removeListener(wrapperMap.get(listener));
              }
            });
            const onRequestFinishedWrappers = new DefaultWeakMap((listener) => {
              if (typeof listener !== "function") {
                return listener;
              }
              return function onRequestFinished(req) {
                const wrappedReq = wrapObject(req, {}, {
                  getContent: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                });
                listener(wrappedReq);
              };
            });
            const onMessageWrappers = new DefaultWeakMap((listener) => {
              if (typeof listener !== "function") {
                return listener;
              }
              return function onMessage(message, sender, sendResponse) {
                let didCallSendResponse = false;
                let wrappedSendResponse;
                let sendResponsePromise = new Promise((resolve) => {
                  wrappedSendResponse = function(response) {
                    didCallSendResponse = true;
                    resolve(response);
                  };
                });
                let result;
                try {
                  result = listener(message, sender, wrappedSendResponse);
                } catch (err) {
                  result = Promise.reject(err);
                }
                const isResultThenable = result !== true && isThenable(result);
                if (result !== true && !isResultThenable && !didCallSendResponse) {
                  return false;
                }
                const sendPromisedResult = (promise) => {
                  promise.then((msg) => {
                    sendResponse(msg);
                  }, (error) => {
                    let message2;
                    if (error && (error instanceof Error || typeof error.message === "string")) {
                      message2 = error.message;
                    } else {
                      message2 = "An unexpected error occurred";
                    }
                    sendResponse({
                      __mozWebExtensionPolyfillReject__: true,
                      message: message2
                    });
                  }).catch((err) => {
                    console.error("Failed to send onMessage rejected reply", err);
                  });
                };
                if (isResultThenable) {
                  sendPromisedResult(result);
                } else {
                  sendPromisedResult(sendResponsePromise);
                }
                return true;
              };
            });
            const wrappedSendMessageCallback = ({
              reject,
              resolve
            }, reply) => {
              if (extensionAPIs.runtime.lastError) {
                if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
                  resolve();
                } else {
                  reject(new Error(extensionAPIs.runtime.lastError.message));
                }
              } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
                reject(new Error(reply.message));
              } else {
                resolve(reply);
              }
            };
            const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
              if (args.length < metadata.minArgs) {
                throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
              }
              if (args.length > metadata.maxArgs) {
                throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
              }
              return new Promise((resolve, reject) => {
                const wrappedCb = wrappedSendMessageCallback.bind(null, {
                  resolve,
                  reject
                });
                args.push(wrappedCb);
                apiNamespaceObj.sendMessage(...args);
              });
            };
            const staticWrappers = {
              devtools: {
                network: {
                  onRequestFinished: wrapEvent(onRequestFinishedWrappers)
                }
              },
              runtime: {
                onMessage: wrapEvent(onMessageWrappers),
                onMessageExternal: wrapEvent(onMessageWrappers),
                sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                  minArgs: 1,
                  maxArgs: 3
                })
              },
              tabs: {
                sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                  minArgs: 2,
                  maxArgs: 3
                })
              }
            };
            const settingMetadata = {
              clear: {
                minArgs: 1,
                maxArgs: 1
              },
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              set: {
                minArgs: 1,
                maxArgs: 1
              }
            };
            apiMetadata.privacy = {
              network: {
                "*": settingMetadata
              },
              services: {
                "*": settingMetadata
              },
              websites: {
                "*": settingMetadata
              }
            };
            return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
          };
          module3.exports = wrapAPIs(chrome);
        } else {
          module3.exports = globalThis.browser;
        }
      });
    }
  });

  // shared/js/background/wrapper.js
  var wrapper_exports = {};
  __export(wrapper_exports, {
    changeTabURL: () => changeTabURL,
    createAlarm: () => createAlarm,
    executeScript: () => executeScript,
    getDDGTabUrls: () => getDDGTabUrls,
    getExtensionId: () => getExtensionId,
    getExtensionURL: () => getExtensionURL,
    getExtensionVersion: () => getExtensionVersion,
    getFromManagedStorage: () => getFromManagedStorage,
    getFromSessionStorage: () => getFromSessionStorage,
    getFromStorage: () => getFromStorage,
    getManifestVersion: () => getManifestVersion,
    insertCSS: () => insertCSS,
    mergeSavedSettings: () => mergeSavedSettings,
    normalizeTabData: () => normalizeTabData,
    notifyPopup: () => notifyPopup,
    openExtensionPage: () => openExtensionPage,
    removeFromSessionStorage: () => removeFromSessionStorage,
    sessionStorageFallback: () => sessionStorageFallback,
    setActionIcon: () => setActionIcon,
    setToSessionStorage: () => setToSessionStorage,
    setUninstallURL: () => setUninstallURL,
    syncToStorage: () => syncToStorage
  });
  function getExtensionURL(path) {
    return import_webextension_polyfill.default.runtime.getURL(path);
  }
  function getExtensionVersion() {
    const manifest = import_webextension_polyfill.default.runtime.getManifest();
    return manifest.version;
  }
  function openExtensionPage(path) {
    import_webextension_polyfill.default.tabs.create({ url: getExtensionURL(path) });
  }
  async function setActionIcon(iconPath, tabId) {
    if (typeof import_webextension_polyfill.default.action === "undefined") {
      return import_webextension_polyfill.default.browserAction.setIcon({ path: iconPath, tabId });
    }
    return import_webextension_polyfill.default.action.setIcon({ path: iconPath, tabId });
  }
  function getManifestVersion() {
    const manifest = import_webextension_polyfill.default.runtime.getManifest();
    return manifest.manifest_version;
  }
  function syncToStorage(data) {
    return import_webextension_polyfill.default.storage.local.set(data);
  }
  async function getFromStorage(key, cb) {
    const result = await import_webextension_polyfill.default.storage.local.get(key);
    return result[key];
  }
  async function getFromManagedStorage(keys, cb) {
    try {
      return await import_webextension_polyfill.default.storage.managed.get(keys);
    } catch (e) {
      console.log("get managed failed", e);
    }
    return {};
  }
  function getExtensionId() {
    return import_webextension_polyfill.default.runtime.id;
  }
  async function notifyPopup(message) {
    try {
      await import_webextension_polyfill.default.runtime.sendMessage(message);
    } catch {
    }
  }
  function normalizeTabData(tabData) {
    const tabId = "tabId" in tabData ? tabData.tabId : tabData.id;
    const url = tabData.url;
    const status = "status" in tabData ? tabData.status : null;
    const requestId = "requestId" in tabData ? tabData.requestId : void 0;
    return {
      tabId,
      url,
      requestId,
      status
    };
  }
  function mergeSavedSettings(settings13, results) {
    return Object.assign(settings13, results);
  }
  async function getDDGTabUrls() {
    const tabs = await import_webextension_polyfill.default.tabs.query({ url: "https://*.duckduckgo.com/*" }) || [];
    return tabs.map((tab) => tab.url);
  }
  function setUninstallURL(url) {
    import_webextension_polyfill.default.runtime.setUninstallURL(url);
  }
  function changeTabURL(tabId, url) {
    return import_webextension_polyfill.default.tabs.update(tabId, { url });
  }
  function convertScriptingAPIOptionsForTabsAPI(options) {
    if (typeof options !== "object") {
      throw new Error(
        "Missing/invalid options Object."
      );
    }
    if (typeof options.file !== "undefined" || typeof options.frameId !== "undefined" || typeof options.runAt !== "undefined" || typeof options.allFrames !== "undefined" || typeof options.code !== "undefined") {
      throw new Error(
        "Please provide options compatible with the (MV3) scripting API, instead of the (MV2) tabs API."
      );
    }
    if (typeof options.world !== "undefined") {
      throw new Error(
        "World targetting not supported by MV2."
      );
    }
    const { allFrames, frameIds, tabId } = options.target;
    delete options.target;
    if (Array.isArray(frameIds) && frameIds.length > 0) {
      if (frameIds.length > 1) {
        throw new Error(
          "Targetting multiple frames by ID not supported by MV2."
        );
      }
      options.frameId = frameIds[0];
    }
    if (typeof options.files !== "undefined") {
      if (Array.isArray(options.files) && options.files.length > 0) {
        if (options.files.length > 1) {
          throw new Error(
            "Inserting multiple stylesheets/scripts in one go not supported by MV2."
          );
        }
        options.file = options.files[0];
      }
      delete options.files;
    }
    if (typeof allFrames !== "undefined") {
      options.allFrames = allFrames;
    }
    if (typeof options.injectImmediately !== "undefined") {
      if (options.injectImmediately) {
        options.runAt = "document_start";
      }
      delete options.injectImmediately;
    }
    let stringifiedArgs = "";
    if (typeof options.args !== "undefined") {
      if (Array.isArray(options.args)) {
        stringifiedArgs = "..." + JSON.stringify(options.args);
      }
      delete options.args;
    }
    if (typeof options.func !== "undefined") {
      if (typeof options.func === "function") {
        options.code = "(" + options.func.toString() + ")(" + stringifiedArgs + ")";
      }
      delete options.func;
    }
    return [tabId, options];
  }
  async function executeScript(options) {
    if (typeof import_webextension_polyfill.default.scripting === "undefined") {
      return await import_webextension_polyfill.default.tabs.executeScript(
        ...convertScriptingAPIOptionsForTabsAPI(options)
      );
    }
    return await import_webextension_polyfill.default.scripting.executeScript(options);
  }
  async function insertCSS(options) {
    if (typeof import_webextension_polyfill.default.scripting === "undefined") {
      return await import_webextension_polyfill.default.tabs.insertCSS(
        ...convertScriptingAPIOptionsForTabsAPI(options)
      );
    }
    return await import_webextension_polyfill.default.scripting.insertCSS(options);
  }
  async function setToSessionStorage(key, data) {
    if (typeof key !== "string") {
      throw new Error("Invalid storage key, string expected.");
    }
    if (sessionStorageSupported) {
      return await import_webextension_polyfill.default.storage.session.set({ [key]: data });
    }
    sessionStorageFallback.set(key, data);
  }
  async function getFromSessionStorage(key) {
    if (typeof key !== "string") {
      throw new Error("Invalid storage key, string expected.");
    }
    if (sessionStorageSupported) {
      const result = await import_webextension_polyfill.default.storage.session.get([key]);
      return result[key];
    }
    return sessionStorageFallback.get(key);
  }
  async function removeFromSessionStorage(key) {
    if (typeof key !== "string") {
      throw new Error("Invalid storage key, string expected.");
    }
    if (sessionStorageSupported) {
      return await import_webextension_polyfill.default.storage.session.remove(key);
    }
    return sessionStorageFallback.delete(key);
  }
  async function createAlarm(name, alarmInfo) {
    const existingAlarm = await import_webextension_polyfill.default.alarms.get(name);
    if (!existingAlarm) {
      return await import_webextension_polyfill.default.alarms.create(name, alarmInfo);
    }
  }
  var import_webextension_polyfill, sessionStorageSupported, sessionStorageFallback;
  var init_wrapper = __esm({
    "shared/js/background/wrapper.js"() {
      "use strict";
      import_webextension_polyfill = __toESM(require_browser_polyfill());
      sessionStorageSupported = typeof import_webextension_polyfill.default.storage.session !== "undefined";
      sessionStorageFallback = sessionStorageSupported ? null : /* @__PURE__ */ new Map();
    }
  });

  // shared/js/background/load.js
  var require_load = __commonJS({
    "shared/js/background/load.js"(exports2, module2) {
      "use strict";
      var browserWrapper5 = (init_wrapper(), __toCommonJS(wrapper_exports));
      function JSONfromLocalFile(path) {
        return loadExtensionFile({ url: path, returnType: "json" });
      }
      function JSONfromExternalFile(urlString) {
        return loadExtensionFile({ url: urlString, returnType: "json", source: "external" });
      }
      function url(urlString) {
        return loadExtensionFile({ url: urlString, source: "external" });
      }
      async function loadExtensionFile(params) {
        const headers = new Headers();
        let urlString = params.url;
        if (params.source === "external") {
          if (await browserWrapper5.getFromSessionStorage("dev")) {
            if (urlString.indexOf("?") > -1) {
              urlString += "&";
            } else {
              urlString += "?";
            }
            urlString += "test=1";
          }
          if (params.etag) {
            headers.append("If-None-Match", params.etag);
          }
        } else {
          urlString = browserWrapper5.getExtensionURL(urlString);
        }
        let rej;
        const timeoutPromise = new Promise((resolve, reject) => {
          rej = reject;
        });
        const fetchTimeout = setTimeout(rej, params.timeout || 3e4);
        const fetchResult = fetch(urlString, {
          method: "GET",
          headers
        }).then(async (response) => {
          clearTimeout(fetchTimeout);
          const status = response.status;
          const etag = response.headers.get("etag");
          const date = response.headers.get("Date");
          let data;
          if (status === 200) {
            if (params.returnType === "json") {
              data = await response.json();
            } else if (params.returnType === "arraybuffer") {
              data = await response.arrayBuffer();
            } else {
              data = await response.text();
            }
            return {
              status,
              date,
              etag,
              data
            };
          } else if (status === 304) {
            console.log(`${urlString} returned 304, resource not changed`);
            return {
              status,
              date,
              etag
            };
          } else {
            throw new Error(`${urlString} returned ${response.status}`);
          }
        });
        return Promise.race([timeoutPromise, fetchResult]);
      }
      module2.exports = {
        loadExtensionFile,
        JSONfromLocalFile,
        JSONfromExternalFile,
        url
      };
    }
  });

  // shared/data/defaultSettings.js
  var require_defaultSettings = __commonJS({
    "shared/data/defaultSettings.js"(exports2, module2) {
      "use strict";
      module2.exports = {
        httpsEverywhereEnabled: true,
        embeddedTweetsEnabled: false,
        GPC: true,
        youtubePreviewsEnabled: false,
        atb: null,
        set_atb: null,
        "config-etag": null,
        "httpsUpgradeBloomFilter-etag": null,
        "httpsDontUpgradeBloomFilters-etag": null,
        "httpsUpgradeList-etag": null,
        "httpsDontUpgradeList-etag": null,
        hasSeenPostInstall: false,
        extiSent: false,
        "tds-etag": null,
        lastTdsUpdate: 0,
        fireButtonClearHistoryEnabled: true,
        fireButtonTabClearEnabled: true
      };
    }
  });

  // shared/js/background/settings.js
  var require_settings = __commonJS({
    "shared/js/background/settings.js"(exports2, module2) {
      "use strict";
      var defaultSettings = require_defaultSettings();
      var browserWrapper5 = (init_wrapper(), __toCommonJS(wrapper_exports));
      var onSettingUpdate = new EventTarget();
      if (typeof CustomEvent === "undefined") globalThis.CustomEvent = Event;
      var MANAGED_SETTINGS = ["hasSeenPostInstall"];
      var settings13 = {};
      var isReady = false;
      var _ready = init().then(() => {
        isReady = true;
        console.log("Settings are loaded");
      });
      async function init() {
        buildSettingsFromDefaults();
        await buildSettingsFromManagedStorage();
        await buildSettingsFromLocalStorage();
      }
      function ready2() {
        return _ready;
      }
      function checkForLegacyKeys() {
        const legacyKeys = {
          // Keys to migrate
          whitelisted: "allowlisted",
          whitelistOptIn: "allowlistOptIn",
          // Keys to remove
          advanced_options: null,
          clickToLoadClicks: null,
          cookieExcludeList: null,
          dev: null,
          ducky: null,
          extensionIsEnabled: null,
          failedUpgrades: null,
          last_search: null,
          lastsearch_enabled: null,
          meanings: null,
          safesearch: null,
          socialBlockingIsEnabled: null,
          totalUpgrades: null,
          trackerBlockingEnabled: null,
          use_post: null,
          version: null,
          zeroclick_google_right: null,
          "surrogates-etag": null,
          "brokenSiteList-etag": null,
          "surrogateList-etag": null,
          "trackersWhitelist-etag": null,
          "trackersWhitelistTemporary-etag": null
        };
        let syncNeeded = false;
        for (const legacyKey in legacyKeys) {
          const key = legacyKeys[legacyKey];
          if (!(legacyKey in settings13)) {
            continue;
          }
          syncNeeded = true;
          const legacyValue = settings13[legacyKey];
          if (key && legacyValue) {
            settings13[key] = legacyValue;
          }
          delete settings13[legacyKey];
        }
        if (syncNeeded) {
          syncSettingTolocalStorage();
        }
      }
      async function buildSettingsFromLocalStorage() {
        const results = await browserWrapper5.getFromStorage(["settings"]);
        if (!results) return;
        settings13 = browserWrapper5.mergeSavedSettings(settings13, results);
        checkForLegacyKeys();
      }
      async function buildSettingsFromManagedStorage() {
        const results = await browserWrapper5.getFromManagedStorage(MANAGED_SETTINGS);
        settings13 = browserWrapper5.mergeSavedSettings(settings13, results);
      }
      function buildSettingsFromDefaults() {
        settings13 = Object.assign({}, defaultSettings);
      }
      function syncSettingTolocalStorage() {
        return browserWrapper5.syncToStorage({ settings: settings13 });
      }
      function getSetting2(name) {
        if (!isReady) {
          console.warn(`Settings: getSetting() Settings not loaded: ${name}`);
          return;
        }
        if (name === "all") name = null;
        if (name) {
          return settings13[name];
        } else {
          return settings13;
        }
      }
      function updateSetting2(name, value) {
        if (!isReady) {
          console.warn(`Settings: updateSetting() Setting not loaded: ${name}`);
          return;
        }
        settings13[name] = value;
        syncSettingTolocalStorage().then(() => {
          onSettingUpdate.dispatchEvent(new CustomEvent(name, { detail: value }));
        });
      }
      function incrementNumericSetting(name, increment = 1) {
        if (!isReady) {
          console.warn(
            "Settings: incrementNumericSetting() Setting not loaded:",
            name
          );
          return;
        }
        let value = settings13[name];
        if (typeof value !== "number" || isNaN(value)) {
          value = 0;
        }
        updateSetting2(name, value + increment);
      }
      function removeSetting(name) {
        if (!isReady) {
          console.warn(`Settings: removeSetting() Setting not loaded: ${name}`);
          return;
        }
        if (settings13[name]) {
          delete settings13[name];
          syncSettingTolocalStorage();
        }
      }
      function logSettings() {
        browserWrapper5.getFromStorage(["settings"]).then((s) => {
          console.log(s.settings);
        });
      }
      module2.exports = {
        getSetting: getSetting2,
        updateSetting: updateSetting2,
        incrementNumericSetting,
        removeSetting,
        logSettings,
        ready: ready2,
        onSettingUpdate
      };
    }
  });

  // shared/js/background/storage/tds.js
  var tds_exports = {};
  __export(tds_exports, {
    default: () => tds_default
  });
  var settings, listNames, tds_default;
  var init_tds = __esm({
    "shared/js/background/storage/tds.js"() {
      "use strict";
      settings = require_settings();
      listNames = ["tds", "surrogates", "config"];
      tds_default = {
        _config: { features: {} },
        _tds: { entities: {}, trackers: {}, domains: {}, cnames: {} },
        _surrogates: "",
        get config() {
          return globalThis.components?.tds.config.data || this._config;
        },
        get tds() {
          return globalThis.components?.tds.tds.data || this._tds;
        },
        get surrogates() {
          return globalThis.components?.tds.surrogates.data || this._surrogates;
        },
        // these setters are to allow legacy tests to override the values here. In a running extension
        // these will have no effect
        set config(fallbackValue) {
          this._config = fallbackValue;
        },
        set tds(fallbackValue) {
          this._tds = fallbackValue;
        },
        set surrogates(fallbackValue) {
          this._surrogates = fallbackValue;
        },
        /** @type {TDSStorage?} */
        get tdsStorage() {
          return globalThis.components?.tds;
        },
        /**
         * @param {import('../components/resource-loader').ResourceName} configName
         * @param {import('../components/resource-loader').OnUpdatedCallback} cb
         */
        async onUpdate(configName, cb) {
          await settings.ready();
          if (listNames.includes(configName) && this.tdsStorage && this.tdsStorage[configName]) {
            this.tdsStorage[configName].onUpdate(cb);
          }
        },
        /**
         * @param {import('../components/resource-loader').ResourceName} [configName]
         * @returns {Promise}
         */
        async ready(configName) {
          await settings.ready();
          const tdsStorage2 = this.tdsStorage;
          if (!tdsStorage2) {
            return Promise.resolve();
          }
          if (configName && listNames.includes(configName)) {
            return tdsStorage2[configName].ready;
          }
          return Promise.all(listNames.map((n) => tdsStorage2[n].ready));
        },
        getSerializableList(name) {
          if (name === "tds") {
            const tds = globalThis.components.tds.tds;
            const listCopy = JSON.parse(JSON.stringify(tds.data));
            Object.values(listCopy.trackers).forEach((tracker) => {
              tracker.rules?.forEach((rule, i) => {
                const ruleRegexStr = tds.data.trackers[tracker.domain].rules[i].rule.toString();
                rule.rule = ruleRegexStr.slice(1, ruleRegexStr.length - 3);
              });
            });
            return listCopy;
          } else if (["surrogates", "config"].includes(name)) {
            return globalThis.components.tds[name].data;
          }
        },
        async getLists() {
          await this.ready();
          return [{
            name: "tds",
            data: this.tds
          }, {
            name: "config",
            data: this.config
          }, {
            name: "surrogates",
            data: this.surrogates
          }];
        }
      };
    }
  });

  // shared/js/shared-utils/parse-user-agent-string.js
  var require_parse_user_agent_string = __commonJS({
    "shared/js/shared-utils/parse-user-agent-string.js"(exports2, module2) {
      "use strict";
      module2.exports = (uaString) => {
        if (!globalThis.navigator) return {};
        if (!uaString) uaString = globalThis.navigator.userAgent;
        let browser8;
        let version;
        try {
          let parsedUaParts = uaString.match(/(Firefox|Chrome|Edg)\/([0-9]+)/);
          const isEdge = /(Edge?)\/([0-9]+)/;
          const isOpera = /(OPR)\/([0-9]+)/;
          if (uaString.match(isEdge)) {
            parsedUaParts = uaString.match(isEdge);
          } else if (uaString.match(isOpera)) {
            parsedUaParts = uaString.match(isOpera);
            parsedUaParts[1] = "Opera";
          }
          browser8 = parsedUaParts[1];
          version = parsedUaParts[2];
          if (globalThis.navigator.brave) {
            browser8 = "Brave";
          }
        } catch (e) {
          browser8 = version = "";
        }
        let os = "o";
        if (globalThis.navigator.userAgent.indexOf("Windows") !== -1) os = "w";
        if (globalThis.navigator.userAgent.indexOf("Mac") !== -1) os = "m";
        if (globalThis.navigator.userAgent.indexOf("Linux") !== -1) os = "l";
        return {
          os,
          browser: browser8,
          version
        };
      };
    }
  });

  // shared/js/shared-utils/sha1.js
  var require_sha1 = __commonJS({
    "shared/js/shared-utils/sha1.js"(exports, module) {
      "use strict";
      (function() {
        "use strict";
        var root = typeof window === "object" ? window : {};
        var NODE_JS = !root.JS_SHA1_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
        if (NODE_JS) {
          root = global;
        }
        var COMMON_JS = !root.JS_SHA1_NO_COMMON_JS && typeof module === "object" && module.exports;
        var AMD = typeof define === "function" && define.amd;
        var HEX_CHARS = "0123456789abcdef".split("");
        var EXTRA = [-2147483648, 8388608, 32768, 128];
        var SHIFT = [24, 16, 8, 0];
        var OUTPUT_TYPES = ["hex", "array", "digest", "arrayBuffer"];
        var blocks = [];
        var createOutputMethod = function(outputType) {
          return function(message) {
            return new Sha1(true).update(message)[outputType]();
          };
        };
        var createMethod = function() {
          var method2 = createOutputMethod("hex");
          if (NODE_JS) {
            method2 = nodeWrap(method2);
          }
          method2.create = function() {
            return new Sha1();
          };
          method2.update = function(message) {
            return method2.create().update(message);
          };
          for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
            var type = OUTPUT_TYPES[i];
            method2[type] = createOutputMethod(type);
          }
          return method2;
        };
        var nodeWrap = function(method) {
          var crypto = eval("require('crypto')");
          var Buffer = eval("require('buffer').Buffer");
          var nodeMethod = function(message) {
            if (typeof message === "string") {
              return crypto.createHash("sha1").update(message, "utf8").digest("hex");
            } else if (message.constructor === ArrayBuffer) {
              message = new Uint8Array(message);
            } else if (message.length === void 0) {
              return method(message);
            }
            return crypto.createHash("sha1").update(new Buffer(message)).digest("hex");
          };
          return nodeMethod;
        };
        function Sha1(sharedMemory) {
          if (sharedMemory) {
            blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
            this.blocks = blocks;
          } else {
            this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          }
          this.h0 = 1732584193;
          this.h1 = 4023233417;
          this.h2 = 2562383102;
          this.h3 = 271733878;
          this.h4 = 3285377520;
          this.block = this.start = this.bytes = this.hBytes = 0;
          this.finalized = this.hashed = false;
          this.first = true;
        }
        Sha1.prototype.update = function(message) {
          if (this.finalized) {
            return;
          }
          var notString = typeof message !== "string";
          if (notString && message.constructor === root.ArrayBuffer) {
            message = new Uint8Array(message);
          }
          var code, index = 0, i, length = message.length || 0, blocks2 = this.blocks;
          while (index < length) {
            if (this.hashed) {
              this.hashed = false;
              blocks2[0] = this.block;
              blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
            }
            if (notString) {
              for (i = this.start; index < length && i < 64; ++index) {
                blocks2[i >> 2] |= message[index] << SHIFT[i++ & 3];
              }
            } else {
              for (i = this.start; index < length && i < 64; ++index) {
                code = message.charCodeAt(index);
                if (code < 128) {
                  blocks2[i >> 2] |= code << SHIFT[i++ & 3];
                } else if (code < 2048) {
                  blocks2[i >> 2] |= (192 | code >> 6) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
                } else if (code < 55296 || code >= 57344) {
                  blocks2[i >> 2] |= (224 | code >> 12) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
                } else {
                  code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
                  blocks2[i >> 2] |= (240 | code >> 18) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code >> 12 & 63) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
                }
              }
            }
            this.lastByteIndex = i;
            this.bytes += i - this.start;
            if (i >= 64) {
              this.block = blocks2[16];
              this.start = i - 64;
              this.hash();
              this.hashed = true;
            } else {
              this.start = i;
            }
          }
          if (this.bytes > 4294967295) {
            this.hBytes += this.bytes / 4294967296 << 0;
            this.bytes = this.bytes % 4294967296;
          }
          return this;
        };
        Sha1.prototype.finalize = function() {
          if (this.finalized) {
            return;
          }
          this.finalized = true;
          var blocks2 = this.blocks, i = this.lastByteIndex;
          blocks2[16] = this.block;
          blocks2[i >> 2] |= EXTRA[i & 3];
          this.block = blocks2[16];
          if (i >= 56) {
            if (!this.hashed) {
              this.hash();
            }
            blocks2[0] = this.block;
            blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
          }
          blocks2[14] = this.hBytes << 3 | this.bytes >>> 29;
          blocks2[15] = this.bytes << 3;
          this.hash();
        };
        Sha1.prototype.hash = function() {
          var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4;
          var f, j, t2, blocks2 = this.blocks;
          for (j = 16; j < 80; ++j) {
            t2 = blocks2[j - 3] ^ blocks2[j - 8] ^ blocks2[j - 14] ^ blocks2[j - 16];
            blocks2[j] = t2 << 1 | t2 >>> 31;
          }
          for (j = 0; j < 20; j += 5) {
            f = b & c | ~b & d;
            t2 = a << 5 | a >>> 27;
            e = t2 + f + e + 1518500249 + blocks2[j] << 0;
            b = b << 30 | b >>> 2;
            f = a & b | ~a & c;
            t2 = e << 5 | e >>> 27;
            d = t2 + f + d + 1518500249 + blocks2[j + 1] << 0;
            a = a << 30 | a >>> 2;
            f = e & a | ~e & b;
            t2 = d << 5 | d >>> 27;
            c = t2 + f + c + 1518500249 + blocks2[j + 2] << 0;
            e = e << 30 | e >>> 2;
            f = d & e | ~d & a;
            t2 = c << 5 | c >>> 27;
            b = t2 + f + b + 1518500249 + blocks2[j + 3] << 0;
            d = d << 30 | d >>> 2;
            f = c & d | ~c & e;
            t2 = b << 5 | b >>> 27;
            a = t2 + f + a + 1518500249 + blocks2[j + 4] << 0;
            c = c << 30 | c >>> 2;
          }
          for (; j < 40; j += 5) {
            f = b ^ c ^ d;
            t2 = a << 5 | a >>> 27;
            e = t2 + f + e + 1859775393 + blocks2[j] << 0;
            b = b << 30 | b >>> 2;
            f = a ^ b ^ c;
            t2 = e << 5 | e >>> 27;
            d = t2 + f + d + 1859775393 + blocks2[j + 1] << 0;
            a = a << 30 | a >>> 2;
            f = e ^ a ^ b;
            t2 = d << 5 | d >>> 27;
            c = t2 + f + c + 1859775393 + blocks2[j + 2] << 0;
            e = e << 30 | e >>> 2;
            f = d ^ e ^ a;
            t2 = c << 5 | c >>> 27;
            b = t2 + f + b + 1859775393 + blocks2[j + 3] << 0;
            d = d << 30 | d >>> 2;
            f = c ^ d ^ e;
            t2 = b << 5 | b >>> 27;
            a = t2 + f + a + 1859775393 + blocks2[j + 4] << 0;
            c = c << 30 | c >>> 2;
          }
          for (; j < 60; j += 5) {
            f = b & c | b & d | c & d;
            t2 = a << 5 | a >>> 27;
            e = t2 + f + e - 1894007588 + blocks2[j] << 0;
            b = b << 30 | b >>> 2;
            f = a & b | a & c | b & c;
            t2 = e << 5 | e >>> 27;
            d = t2 + f + d - 1894007588 + blocks2[j + 1] << 0;
            a = a << 30 | a >>> 2;
            f = e & a | e & b | a & b;
            t2 = d << 5 | d >>> 27;
            c = t2 + f + c - 1894007588 + blocks2[j + 2] << 0;
            e = e << 30 | e >>> 2;
            f = d & e | d & a | e & a;
            t2 = c << 5 | c >>> 27;
            b = t2 + f + b - 1894007588 + blocks2[j + 3] << 0;
            d = d << 30 | d >>> 2;
            f = c & d | c & e | d & e;
            t2 = b << 5 | b >>> 27;
            a = t2 + f + a - 1894007588 + blocks2[j + 4] << 0;
            c = c << 30 | c >>> 2;
          }
          for (; j < 80; j += 5) {
            f = b ^ c ^ d;
            t2 = a << 5 | a >>> 27;
            e = t2 + f + e - 899497514 + blocks2[j] << 0;
            b = b << 30 | b >>> 2;
            f = a ^ b ^ c;
            t2 = e << 5 | e >>> 27;
            d = t2 + f + d - 899497514 + blocks2[j + 1] << 0;
            a = a << 30 | a >>> 2;
            f = e ^ a ^ b;
            t2 = d << 5 | d >>> 27;
            c = t2 + f + c - 899497514 + blocks2[j + 2] << 0;
            e = e << 30 | e >>> 2;
            f = d ^ e ^ a;
            t2 = c << 5 | c >>> 27;
            b = t2 + f + b - 899497514 + blocks2[j + 3] << 0;
            d = d << 30 | d >>> 2;
            f = c ^ d ^ e;
            t2 = b << 5 | b >>> 27;
            a = t2 + f + a - 899497514 + blocks2[j + 4] << 0;
            c = c << 30 | c >>> 2;
          }
          this.h0 = this.h0 + a << 0;
          this.h1 = this.h1 + b << 0;
          this.h2 = this.h2 + c << 0;
          this.h3 = this.h3 + d << 0;
          this.h4 = this.h4 + e << 0;
        };
        Sha1.prototype.hex = function() {
          this.finalize();
          var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4;
          return HEX_CHARS[h0 >> 28 & 15] + HEX_CHARS[h0 >> 24 & 15] + HEX_CHARS[h0 >> 20 & 15] + HEX_CHARS[h0 >> 16 & 15] + HEX_CHARS[h0 >> 12 & 15] + HEX_CHARS[h0 >> 8 & 15] + HEX_CHARS[h0 >> 4 & 15] + HEX_CHARS[h0 & 15] + HEX_CHARS[h1 >> 28 & 15] + HEX_CHARS[h1 >> 24 & 15] + HEX_CHARS[h1 >> 20 & 15] + HEX_CHARS[h1 >> 16 & 15] + HEX_CHARS[h1 >> 12 & 15] + HEX_CHARS[h1 >> 8 & 15] + HEX_CHARS[h1 >> 4 & 15] + HEX_CHARS[h1 & 15] + HEX_CHARS[h2 >> 28 & 15] + HEX_CHARS[h2 >> 24 & 15] + HEX_CHARS[h2 >> 20 & 15] + HEX_CHARS[h2 >> 16 & 15] + HEX_CHARS[h2 >> 12 & 15] + HEX_CHARS[h2 >> 8 & 15] + HEX_CHARS[h2 >> 4 & 15] + HEX_CHARS[h2 & 15] + HEX_CHARS[h3 >> 28 & 15] + HEX_CHARS[h3 >> 24 & 15] + HEX_CHARS[h3 >> 20 & 15] + HEX_CHARS[h3 >> 16 & 15] + HEX_CHARS[h3 >> 12 & 15] + HEX_CHARS[h3 >> 8 & 15] + HEX_CHARS[h3 >> 4 & 15] + HEX_CHARS[h3 & 15] + HEX_CHARS[h4 >> 28 & 15] + HEX_CHARS[h4 >> 24 & 15] + HEX_CHARS[h4 >> 20 & 15] + HEX_CHARS[h4 >> 16 & 15] + HEX_CHARS[h4 >> 12 & 15] + HEX_CHARS[h4 >> 8 & 15] + HEX_CHARS[h4 >> 4 & 15] + HEX_CHARS[h4 & 15];
        };
        Sha1.prototype.toString = Sha1.prototype.hex;
        Sha1.prototype.digest = function() {
          this.finalize();
          var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4;
          return [
            h0 >> 24 & 255,
            h0 >> 16 & 255,
            h0 >> 8 & 255,
            h0 & 255,
            h1 >> 24 & 255,
            h1 >> 16 & 255,
            h1 >> 8 & 255,
            h1 & 255,
            h2 >> 24 & 255,
            h2 >> 16 & 255,
            h2 >> 8 & 255,
            h2 & 255,
            h3 >> 24 & 255,
            h3 >> 16 & 255,
            h3 >> 8 & 255,
            h3 & 255,
            h4 >> 24 & 255,
            h4 >> 16 & 255,
            h4 >> 8 & 255,
            h4 & 255
          ];
        };
        Sha1.prototype.array = Sha1.prototype.digest;
        Sha1.prototype.arrayBuffer = function() {
          this.finalize();
          var buffer = new ArrayBuffer(20);
          var dataView = new DataView(buffer);
          dataView.setUint32(0, this.h0);
          dataView.setUint32(4, this.h1);
          dataView.setUint32(8, this.h2);
          dataView.setUint32(12, this.h3);
          dataView.setUint32(16, this.h4);
          return buffer;
        };
        var exports = createMethod();
        if (COMMON_JS) {
          module.exports = exports;
        } else {
          root.sha1 = exports;
          if (AMD) {
            define(function() {
              return exports;
            });
          }
        }
      })();
    }
  });

  // shared/js/background/utils.js
  var utils_exports = {};
  __export(utils_exports, {
    brokenListIndex: () => brokenListIndex,
    daysInstalled: () => daysInstalled,
    extractHostFromURL: () => extractHostFromURL,
    extractLimitedDomainFromURL: () => extractLimitedDomainFromURL,
    extractTopSubdomainFromHost: () => extractTopSubdomainFromHost,
    findParent: () => findParent,
    findParentDisplayName: () => findParentDisplayName,
    getAsyncBlockingSupport: () => getAsyncBlockingSupport,
    getBaseDomain: () => getBaseDomain,
    getBrokenScriptLists: () => getBrokenScriptLists,
    getBrowserName: () => getBrowserName,
    getCurrentTab: () => getCurrentTab,
    getCurrentURL: () => getCurrentURL,
    getEnabledFeatures: () => getEnabledFeatures,
    getEnabledFeaturesAboutBlank: () => getEnabledFeaturesAboutBlank,
    getFeatureSettings: () => getFeatureSettings,
    getInstallTimestamp: () => getInstallTimestamp,
    getOsName: () => getOsName,
    getSessionKey: () => getSessionKey,
    getURLWithoutQueryString: () => getURLWithoutQueryString,
    getUpgradeToSecureSupport: () => getUpgradeToSecureSupport,
    isBroken: () => isBroken,
    isCookieExcluded: () => isCookieExcluded,
    isFeatureEnabled: () => isFeatureEnabled,
    isInstalledWithinDays: () => isInstalledWithinDays,
    isRedirect: () => isRedirect,
    isSafeListed: () => isSafeListed,
    isSameTopLevelDomain: () => isSameTopLevelDomain,
    parseVersionString: () => parseVersionString,
    reloadCurrentTab: () => reloadCurrentTab,
    removeBroken: () => removeBroken,
    resetSessionKey: () => resetSessionKey,
    satisfiesMinVersion: () => satisfiesMinVersion,
    sendAllTabsMessage: () => sendAllTabsMessage,
    sendTabMessage: () => sendTabMessage
  });
  function getRandomFloat() {
    return crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
  }
  async function getSessionKey() {
    let sessionKey = await getFromSessionStorage("sessionKey");
    if (!sessionKey) {
      sessionKey = await resetSessionKey();
    }
    return sessionKey;
  }
  async function resetSessionKey() {
    const sessionKey = (0, import_sha1.default)(getRandomFloat().toString());
    await setToSessionStorage("sessionKey", sessionKey);
    return sessionKey;
  }
  async function sendTabMessage(id, message, details) {
    try {
      await import_webextension_polyfill2.default.tabs.sendMessage(id, message, details);
    } catch {
    }
  }
  async function sendAllTabsMessage(message, details) {
    try {
      for (const { id: tabId } of await import_webextension_polyfill2.default.tabs.query({})) {
        sendTabMessage(tabId, message, details);
      }
    } catch {
    }
  }
  function getBaseDomain(urlString) {
    const parsedUrl = (0, import_tldts.parse)(urlString, { allowPrivateDomains: true });
    if (parsedUrl.hostname === "localhost" || parsedUrl.hostname?.endsWith(".localhost") || parsedUrl.isIp) {
      return parsedUrl.hostname;
    }
    return parsedUrl.domain;
  }
  function extractHostFromURL(url, shouldKeepWWW) {
    if (!url) return "";
    if (url.startsWith("about:") && url[6] !== "/") {
      url = "about://" + url.substr(6);
    }
    const urlObj = (0, import_tldts.parse)(url);
    let hostname = urlObj.hostname || "";
    if (!shouldKeepWWW) {
      hostname = hostname.replace(/^www\./, "");
    }
    return hostname;
  }
  function extractLimitedDomainFromURL(url, { keepSubdomains } = {}) {
    if (!url) return void 0;
    try {
      const parsedURL = new URL(url);
      const tld = (0, import_tldts.parse)(url);
      if (!parsedURL || !tld) return "";
      let finalURL = tld.domain || tld.hostname;
      if (keepSubdomains) {
        finalURL = tld.hostname;
      } else if (tld.subdomain && tld.subdomain.toLowerCase() === "www") {
        finalURL = "www." + tld.domain;
      }
      const port = parsedURL.port ? `:${parsedURL.port}` : "";
      return `${parsedURL.protocol}//${finalURL}${port}/`;
    } catch (e) {
      return void 0;
    }
  }
  function extractTopSubdomainFromHost(host) {
    if (typeof host !== "string") return false;
    const rgx = /\./g;
    if (host.match(rgx) && host.match(rgx).length > 1) {
      return host.split(".")[0];
    }
    return false;
  }
  function findParent(url) {
    const parts = extractHostFromURL(url).split(".");
    while (parts.length > 1) {
      const joinURL = parts.join(".");
      if (tds_default.tds.trackers[joinURL]?.owner?.ownedBy) {
        return tds_default.tds.trackers[joinURL].owner.ownedBy;
      } else if (tds_default.tds.domains[joinURL]) {
        return tds_default.tds.domains[joinURL];
      }
      parts.shift();
    }
  }
  function findParentDisplayName(url) {
    const parent2 = findParent(url);
    const entity = tds_default.tds.entities[parent2];
    if (entity && entity.displayName) {
      return entity.displayName;
    }
    return "unknown";
  }
  function getCurrentURL(callback) {
    import_webextension_polyfill2.default.tabs.query({ active: true, lastFocusedWindow: true }).then((tabData) => {
      if (tabData.length) {
        callback(tabData[0].url);
      }
    });
  }
  async function getCurrentTab(callback) {
    const tabData = await import_webextension_polyfill2.default.tabs.query({ active: true, lastFocusedWindow: true });
    if (tabData.length) {
      return tabData[0];
    }
  }
  function getBrowserName() {
    if (!browserInfo || !browserInfo.browser) return;
    let browserName2 = browserInfo.browser.toLowerCase();
    if (browserName2 === "firefox") browserName2 = "moz";
    return browserName2;
  }
  function getOsName() {
    if (!browserInfo || !browserInfo.os) return;
    return browserInfo.os;
  }
  function getUpgradeToSecureSupport() {
    let canUpgrade = false;
    if (getBrowserName() !== "moz") return canUpgrade;
    if (browserInfo && browserInfo.version >= 59) {
      canUpgrade = true;
    }
    return canUpgrade;
  }
  function getAsyncBlockingSupport() {
    const browserName2 = getBrowserName();
    if (browserName2 === "moz" && browserInfo && browserInfo.version >= 52) {
      return true;
    } else if (["edg", "edge", "brave", "chrome"].includes(browserName2)) {
      return false;
    }
    console.warn(`Unrecognized browser "${browserName2}" - async response disallowed`);
    return false;
  }
  function isRedirect(statusCode) {
    return statusCode >= 300 && statusCode <= 399;
  }
  function isBroken(url) {
    if (!tds_default?.config.unprotectedTemporary) return;
    return brokenListIndex(url, tds_default?.config.unprotectedTemporary) !== -1;
  }
  function removeBroken(domain, config = tds_default.config) {
    const index = brokenListIndex(domain, config.unprotectedTemporary);
    if (index !== -1) {
      console.log("remove", config.unprotectedTemporary.splice(index, 1));
    }
  }
  function getEnabledFeaturesAboutBlank(url) {
    if (!tds_default.config.features) return [];
    const enabledFeatures = [];
    for (const feature in tds_default.config.features) {
      const featureSettings = getFeatureSettings(feature);
      if (featureSettings.aboutBlankEnabled !== "disabled" && brokenListIndex(url, featureSettings.aboutBlankSites || []) === -1) {
        enabledFeatures.push(feature);
      }
    }
    return enabledFeatures;
  }
  function getEnabledFeatures(url) {
    if (!tds_default.config.features) return [];
    const enabledFeatures = [];
    for (const feature in tds_default.config.features) {
      if (isFeatureEnabled(feature) && brokenListIndex(url, tds_default.config.features[feature].exceptions || []) === -1) {
        enabledFeatures.push(feature);
      }
    }
    return enabledFeatures;
  }
  function brokenListIndex(url, list) {
    const parsedDomain = (0, import_tldts.parse)(url);
    const hostname = parsedDomain.hostname || url;
    return list.findIndex((brokenSiteDomain) => {
      if (brokenSiteDomain.domain) {
        return hostname === brokenSiteDomain.domain || hostname.endsWith(`.${brokenSiteDomain.domain}`);
      }
      return false;
    });
  }
  function getBrokenScriptLists() {
    const brokenScripts = {};
    for (const key in tds_default.config.features) {
      const featureSettings = getFeatureSettings(key);
      brokenScripts[key] = featureSettings.scripts?.map((obj) => obj.domain) || [];
    }
    return brokenScripts;
  }
  function isSafeListed(url) {
    const hostname = extractHostFromURL(url);
    const safeList = import_settings.default.getSetting("allowlisted");
    const subdomains = hostname.split(".");
    while (subdomains.length > 1) {
      if (safeList && safeList[subdomains.join(".")]) {
        return true;
      }
      subdomains.shift();
    }
    if (isBroken(hostname)) {
      return true;
    }
    return false;
  }
  function isCookieExcluded(url) {
    const domain = new URL(url).host;
    return isDomainCookieExcluded(domain);
  }
  function isDomainCookieExcluded(domain) {
    const cookieSettings = getFeatureSettings("cookie");
    if (!cookieSettings || !cookieSettings.excludedCookieDomains) {
      return false;
    }
    if (cookieSettings.excludedCookieDomains.find((elem) => elem.domain === domain)) {
      return true;
    }
    const comps = domain.split(".");
    if (comps.length > 2) {
      comps.shift();
      return isDomainCookieExcluded(comps.join("."));
    }
    return false;
  }
  function isSameTopLevelDomain(url1, url2) {
    const first = getBaseDomain(url1);
    const second = getBaseDomain(url2);
    if (!first || !second) {
      return false;
    }
    return first === second;
  }
  function parseVersionString(versionString) {
    return versionString.split(".").map(Number);
  }
  function satisfiesMinVersion(minVersionString, extensionVersionString) {
    const minVersions = parseVersionString(minVersionString);
    const currentVersions = parseVersionString(extensionVersionString);
    const maxLength = Math.max(minVersions.length, currentVersions.length);
    for (let i = 0; i < maxLength; i++) {
      const minNumberPart = minVersions[i] || 0;
      const currentVersionPart = currentVersions[i] || 0;
      if (currentVersionPart > minNumberPart) {
        return true;
      }
      if (currentVersionPart < minNumberPart) {
        return false;
      }
    }
    return true;
  }
  function isFeatureEnabled(featureName) {
    const feature = tds_default.config.features[featureName];
    if (!feature) {
      return false;
    }
    if ("minSupportedVersion" in feature) {
      const extensionVersionString = getExtensionVersion();
      if (!satisfiesMinVersion(feature.minSupportedVersion, extensionVersionString)) {
        return false;
      }
    }
    return feature.state === "enabled";
  }
  function getFeatureSettings(featureName) {
    const feature = tds_default.config.features[featureName];
    if (typeof feature !== "object" || feature === null || !feature.settings) {
      return {};
    }
    return feature.settings;
  }
  function getURLWithoutQueryString(urlString) {
    return urlString?.split("?")[0];
  }
  async function reloadCurrentTab() {
    const tab = await getCurrentTab();
    if (tab && tab.id) {
      import_webextension_polyfill2.default.tabs.reload(tab.id);
    }
  }
  function getInstallTimestamp(atb) {
    const match = atb.match(/^v?(\d+)-(\d)(.+)?$/i);
    if (!match) return null;
    const startDate = 1456272e6;
    const weeksSince = (parseInt(match[1], 10) - 1) * 7 * dayMultiplier;
    const daysSince = (parseInt(match[2], 10) - 1) * dayMultiplier;
    const installTimestamp = new Date(startDate + weeksSince + daysSince).getTime();
    return isNaN(installTimestamp) ? null : installTimestamp;
  }
  function isInstalledWithinDays(numberOfDays, fromDate = Date.now(), atb = import_settings.default.getSetting("atb")) {
    return daysInstalled(fromDate, atb) <= numberOfDays;
  }
  function daysInstalled(fromDate = Date.now(), atb = import_settings.default.getSetting("atb")) {
    if (!atb) return NaN;
    const installTimestamp = getInstallTimestamp(atb);
    if (!installTimestamp) return NaN;
    return (fromDate - installTimestamp) / dayMultiplier;
  }
  var import_webextension_polyfill2, import_settings, import_tldts, import_parse_user_agent_string, import_sha1, browserInfo, dayMultiplier;
  var init_utils = __esm({
    "shared/js/background/utils.js"() {
      "use strict";
      import_webextension_polyfill2 = __toESM(require_browser_polyfill());
      init_wrapper();
      init_tds();
      import_settings = __toESM(require_settings());
      import_tldts = __toESM(require_cjs());
      import_parse_user_agent_string = __toESM(require_parse_user_agent_string());
      import_sha1 = __toESM(require_sha1());
      browserInfo = (0, import_parse_user_agent_string.default)();
      dayMultiplier = 24 * 60 * 60 * 1e3;
    }
  });

  // shared/js/background/pixels.js
  var pixels_exports = {};
  __export(pixels_exports, {
    getURL: () => getURL,
    sendPixelRequest: () => sendPixelRequest
  });
  function getURL(pixelName) {
    if (!pixelName) throw new Error("pixelName is required");
    const url = "https://improving.duckduckgo.com/t/";
    return url + pixelName;
  }
  function sendPixelRequest(pixelName, params = {}) {
    if (false) {
      return;
    }
    const browserName2 = getBrowserName() || "unknown";
    const randomNum = Math.ceil(Math.random() * 1e7);
    const searchParams = new URLSearchParams(Object.entries(params));
    const url = getURL(`${pixelName}_extension_${browserName2}`) + `?${randomNum}&${searchParams.toString()}`;
    return import_load.default.url(url);
  }
  var import_load;
  var init_pixels = __esm({
    "shared/js/background/pixels.js"() {
      "use strict";
      import_load = __toESM(require_load());
      init_utils();
    }
  });

  // shared/js/background/i18n.js
  function getUserLocale() {
    if (!import_webextension_polyfill3.default?.i18n) {
      return "en";
    }
    const lang = import_webextension_polyfill3.default.i18n.getUILanguage().slice(0, 2);
    if (["nn", "no"].includes(lang)) {
      return "nb";
    }
    return lang;
  }
  function getFullUserLocale() {
    if (!import_webextension_polyfill3.default?.i18n) {
      return "en-US";
    }
    return import_webextension_polyfill3.default.i18n.getUILanguage();
  }
  var import_webextension_polyfill3;
  var init_i18n = __esm({
    "shared/js/background/i18n.js"() {
      "use strict";
      import_webextension_polyfill3 = __toESM(require_browser_polyfill());
    }
  });

  // shared/js/background/classes/privacy-dashboard-data.js
  function dashboardDataFromTab(tab, userData, fireButtonData) {
    const protectionsEnabled = !tab.site.allowlisted && !tab.site.isBroken && tab.site.enabledFeatures.includes("contentBlocking");
    let parentEntity;
    if (tab.site.parentEntity) {
      parentEntity = {
        displayName: tab.site.parentEntity,
        prevalence: tab.site.parentPrevalence ?? 0
      };
    }
    const protections = {
      allowlisted: Boolean(tab.site.allowlisted),
      denylisted: Boolean(tab.site.denylisted),
      unprotectedTemporary: Boolean(tab.site.isBroken),
      enabledFeatures: tab.site.enabledFeatures
    };
    const requests = convertToRequests(tab, protectionsEnabled);
    let emailProtectionUserData;
    if (userData && "nextAlias" in userData) {
      emailProtectionUserData = userData;
    }
    return {
      tab: {
        id: tab.id,
        url: tab.url || "",
        protections,
        upgradedHttps: tab.upgradedHttps,
        parentEntity,
        specialDomainName: tab.site.specialDomainName || void 0,
        /**
         * Explicitly setting this to 'en' for now. When ready we can send 2-character codes such
         * as 'pl' or 'de' etc. Please see https://duckduckgo.github.io/privacy-dashboard/interfaces/Generated_Schema_Definitions.LocaleSettings.html
         */
        localeSettings: { locale: getUserLocale() }
      },
      requestData: {
        requests
      },
      emailProtectionUserData,
      fireButton: fireButtonData
    };
  }
  function convertToRequests(tab, protectionsEnabled) {
    const detectedRequests = [];
    for (const tracker of Object.values(tab.trackers || {})) {
      for (const detectedRequest of Object.values(tracker.urls || {})) {
        if (!protectionsEnabled && detectedRequest.action !== "none") {
          const nextState = { allowed: { reason: "protectionDisabled" } };
          const request = {
            ...detectedRequest,
            state: nextState
          };
          detectedRequests.push(request);
          continue;
        }
        detectedRequests.push(detectedRequest);
      }
    }
    return detectedRequests;
  }
  function convertState(action, isSameEntity2) {
    if (action === "none") {
      return { allowed: { reason: "otherThirdPartyRequest" } };
    }
    if (action === "ignore" || action === "ignore-user") {
      if (isSameEntity2) {
        return { allowed: { reason: "ownedByFirstParty" } };
      }
      return { allowed: { reason: "ruleException" } };
    }
    if (action === "ad-attribution") {
      return { allowed: { reason: "adClickAttribution" } };
    }
    if (action === "block") {
      return { blocked: {} };
    }
    if (action === "redirect") {
      return { blocked: {} };
    }
    const _output = action;
    return null;
  }
  var init_privacy_dashboard_data = __esm({
    "shared/js/background/classes/privacy-dashboard-data.js"() {
      "use strict";
      init_i18n();
    }
  });

  // shared/js/background/broken-site-report.js
  function fire(querystring) {
    let url = constructUrl(querystring, false);
    if (url.length > maxPixelLength) {
      url = constructUrl(querystring, true);
    }
    load2.url(url);
  }
  function constructUrl(querystring, truncate) {
    const randomNum = Math.ceil(Math.random() * 1e7);
    const pixelName = "epbf";
    const browserInfo2 = parseUserAgentString2();
    const browser8 = browserInfo2?.browser;
    const extensionVersion = browserWrapper.getExtensionVersion();
    const atb = settings3.getSetting("atb");
    const searchParams = new URLSearchParams(querystring);
    if (extensionVersion) {
      searchParams.append("extensionVersion", extensionVersion);
    }
    if (atb) {
      searchParams.append("atb", atb);
    }
    if (searchParams.get("category") === "null") {
      searchParams.delete("category");
    }
    if (truncate) {
      searchParams.append("truncated", "1");
    }
    let url = getURL2(pixelName);
    if (browser8) {
      url += `_${browser8.toLowerCase()}`;
    }
    url += `?${randomNum}&`;
    let extraParams = "";
    [...Object.values(requestCategoryMapping)].forEach((key) => {
      if (truncate && truncatableFields.includes(key)) return;
      if (searchParams.has(key)) {
        extraParams += `&${key}=${decodeURIComponent(searchParams.get(key) || "")}`;
        searchParams.delete(key);
      }
    });
    url += `${searchParams.toString()}${extraParams}`;
    return url;
  }
  async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
  }
  async function computeLastSentDay(urlString) {
    const url = new URL(urlString);
    const dayOutput = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const hash = await digestMessage(url.hostname);
    const hostnameHashPrefix = hash.slice(0, 6);
    const reportTimes = settings3.getSetting("brokenSiteReportTimes") || {};
    const lastSentDay = reportTimes[hostnameHashPrefix];
    reportTimes[hostnameHashPrefix] = dayOutput;
    settings3.updateSetting("brokenSiteReportTimes", reportTimes);
    return lastSentDay;
  }
  async function breakageReportForTab({
    tab,
    tds,
    remoteConfigEtag,
    remoteConfigVersion,
    category,
    description,
    pageParams
  }) {
    if (!tab.url) {
      return;
    }
    const siteUrl = getURLWithoutQueryString2(tab.url).split("#")[0];
    const requestCategories = {};
    for (const requiredRequestCategory of Object.values(requestCategoryMapping)) {
      requestCategories[requiredRequestCategory] = [];
    }
    for (const tracker of Object.values(tab.trackers)) {
      for (const [key, entry] of Object.entries(tracker.urls)) {
        const [fullDomain] = key.split(":");
        const requestCategory = requestCategoryMapping[entry.action];
        if (requestCategory) {
          requestCategories[requestCategory].push(fullDomain);
        }
      }
    }
    if (pageParams.docReferrer && pageParams.docReferrer !== "") {
      try {
        const referrerUrl = new URL(pageParams.docReferrer);
        if (referrerUrl.hostname === "duckduckgo.com") {
          tab.openerContext = "serp";
        } else {
          tab.openerContext = "navigation";
        }
      } catch {
        console.error("Unable to construct referrer URL from:" + pageParams.docReferrer);
      }
    } else if (!pageParams.opener) {
      tab.openerContext = "external";
    }
    const urlParametersRemoved = tab.urlParametersRemoved ? "true" : "false";
    const ctlYouTube = tab.ctlYouTube ? "true" : "false";
    const ctlFacebookPlaceholderShown = tab.ctlFacebookPlaceholderShown ? "true" : "false";
    const ctlFacebookLogin = tab.ctlFacebookLogin ? "true" : "false";
    const performanceWarning = tab.performanceWarning ? "true" : "false";
    const ampUrl = tab.ampUrl ? getURLWithoutQueryString2(tab.ampUrl).split("#")[0] : void 0;
    const upgradedHttps = tab.upgradedHttps;
    const debugFlags = tab.debugFlags.join(",");
    const errorDescriptions = JSON.stringify(tab.errorDescriptions);
    const httpErrorCodes = tab.httpErrorCodes.join(",");
    const lastSentDay = await computeLastSentDay(tab.url);
    const userRefreshCount = tab.userRefreshCount;
    const openerContext = tab.openerContext ? tab.openerContext : void 0;
    const jsPerformance = pageParams.jsPerformance ? pageParams.jsPerformance : void 0;
    const locale = tab.locale;
    const brokenSiteParams = new URLSearchParams({
      siteUrl,
      tds,
      remoteConfigEtag,
      remoteConfigVersion,
      upgradedHttps: upgradedHttps.toString(),
      urlParametersRemoved,
      ctlYouTube,
      ctlFacebookPlaceholderShown,
      ctlFacebookLogin,
      performanceWarning,
      protectionsState: tab.site.isFeatureEnabled("contentBlocking"),
      userRefreshCount,
      jsPerformance,
      locale
    });
    for (const [key, value] of Object.entries(requestCategories)) {
      brokenSiteParams.append(key, value.join(","));
    }
    if (lastSentDay) brokenSiteParams.set("lastSentDay", lastSentDay);
    if (ampUrl) brokenSiteParams.set("ampUrl", ampUrl);
    if (category) brokenSiteParams.set("category", category);
    if (debugFlags) brokenSiteParams.set("debugFlags", debugFlags);
    if (description) brokenSiteParams.set("description", description);
    if (errorDescriptions) brokenSiteParams.set("errorDescriptions", errorDescriptions);
    if (httpErrorCodes) brokenSiteParams.set("httpErrorCodes", httpErrorCodes);
    if (openerContext) brokenSiteParams.set("openerContext", openerContext);
    return fire(brokenSiteParams.toString());
  }
  var load2, browserWrapper, settings3, parseUserAgentString2, getURLWithoutQueryString2, getURL2, maxPixelLength, truncatableFields, requestCategoryMapping;
  var init_broken_site_report = __esm({
    "shared/js/background/broken-site-report.js"() {
      "use strict";
      load2 = require_load();
      browserWrapper = (init_wrapper(), __toCommonJS(wrapper_exports));
      settings3 = require_settings();
      parseUserAgentString2 = require_parse_user_agent_string();
      ({ getURLWithoutQueryString: getURLWithoutQueryString2 } = (init_utils(), __toCommonJS(utils_exports)));
      ({ getURL: getURL2 } = (init_pixels(), __toCommonJS(pixels_exports)));
      maxPixelLength = 7e3;
      truncatableFields = ["ignoreRequests", "noActionRequests", "adAttributionRequests", "ignoredByUserRequests"];
      requestCategoryMapping = {
        ignore: "ignoreRequests",
        block: "blockedTrackers",
        redirect: "surrogates",
        none: "noActionRequests",
        "ad-attribution": "adAttributionRequests",
        "ignore-user": "ignoredByUserRequests"
      };
    }
  });

  // shared/js/background/click-to-load.js
  function getDefaultEnabledClickToLoadRuleActionsForTab(tab) {
    if (!tab?.site?.isFeatureEnabled("clickToLoad")) {
      return [];
    }
    const clickToLoadSettings = tds_default?.config?.features?.clickToLoad?.settings;
    if (!clickToLoadSettings) {
      console.warn("Click to Load configuration not ready yet, skipped.");
      return [];
    }
    const enabledRuleActions = [];
    const { parentEntity } = tab.site;
    for (const [entity, { ruleActions, state }] of Object.entries(clickToLoadSettings)) {
      if (!ruleActions || ruleActions.length === 0 || state !== "enabled") {
        continue;
      }
      if (parentEntity !== entity) {
        enabledRuleActions.push(...ruleActions);
      }
    }
    return enabledRuleActions;
  }
  var init_click_to_load = __esm({
    "shared/js/background/click-to-load.js"() {
      "use strict";
      init_tds();
      init_utils();
    }
  });

  // shared/js/background/dnr-session-rule-id.js
  var dnr_session_rule_id_exports = {};
  __export(dnr_session_rule_id_exports, {
    flushSessionRules: () => flushSessionRules,
    getNextSessionRuleId: () => getNextSessionRuleId,
    setSessionRuleOffsetFromStorage: () => setSessionRuleOffsetFromStorage
  });
  async function setSessionRuleOffsetFromStorage() {
    const offset = await getFromSessionStorage(SESSION_RULE_STORAGE_KEY);
    if (offset) {
      sessionRuleOffset = offset;
    }
    ready = true;
  }
  function getNextSessionRuleId() {
    if (!ready) {
      console.warn("Tried to get session rule id before reading offset from storage");
      return null;
    }
    const nextRuleId = SESSION_RULE_ID_START + sessionRuleOffset;
    sessionRuleOffset += 1;
    setToSessionStorage(SESSION_RULE_STORAGE_KEY, sessionRuleOffset);
    return nextRuleId;
  }
  function isValidSessionId(id) {
    return id >= SESSION_RULE_ID_START;
  }
  function flushSessionRules() {
    return chrome.declarativeNetRequest.getSessionRules().then((rules) => {
      const ruleIds = rules.map(({ id }) => id).filter(isValidSessionId);
      if (ruleIds.length) {
        return chrome.declarativeNetRequest.updateSessionRules({ removeRuleIds: ruleIds });
      }
    });
  }
  var SESSION_RULE_ID_START, SESSION_RULE_STORAGE_KEY, sessionRuleOffset, ready;
  var init_dnr_session_rule_id = __esm({
    "shared/js/background/dnr-session-rule-id.js"() {
      "use strict";
      init_wrapper();
      SESSION_RULE_ID_START = 1e5;
      SESSION_RULE_STORAGE_KEY = "sessionRuleOffset";
      sessionRuleOffset = 0;
      ready = false;
    }
  });

  // shared/js/background/dnr-click-to-load.js
  var dnr_click_to_load_exports = {};
  __export(dnr_click_to_load_exports, {
    clearClickToLoadDnrRulesForTab: () => clearClickToLoadDnrRulesForTab,
    ensureClickToLoadRuleActionDisabled: () => ensureClickToLoadRuleActionDisabled,
    restoreDefaultClickToLoadRuleActions: () => restoreDefaultClickToLoadRuleActions
  });
  async function generateDnrAllowingRules(tab, ruleAction) {
    const existingRuleIds = tab.dnrRuleIdsByDisabledClickToLoadRuleAction[ruleAction];
    if (existingRuleIds && existingRuleIds.length > 0) {
      return [];
    }
    await import_settings2.default.ready();
    const allowingDnrRulesByClickToLoadRuleAction = import_settings2.default.getSetting("allowingDnrRulesByClickToLoadRuleAction");
    if (!allowingDnrRulesByClickToLoadRuleAction) {
      console.warn("Failed to load Click to Load allowing rules.");
      return [];
    }
    let allowingRules = allowingDnrRulesByClickToLoadRuleAction[ruleAction];
    if (!allowingRules) {
      console.warn(`No Click to Load allowing rules for action ${ruleAction}.`);
      return [];
    }
    const ruleIds = [];
    allowingRules = JSON.parse(JSON.stringify(allowingRules));
    for (const rule of allowingRules) {
      const ruleId = getNextSessionRuleId();
      if (typeof ruleId !== "number") {
        continue;
      }
      rule.id = ruleId;
      ruleIds.push(ruleId);
      rule.condition.tabIds = [tab.id];
    }
    if (ruleIds.length > 0) {
      tab.dnrRuleIdsByDisabledClickToLoadRuleAction[ruleAction] = ruleIds;
    }
    return allowingRules;
  }
  async function restoreDefaultClickToLoadRuleActions(tab) {
    const addRules = [];
    const removeRuleIds = [];
    await import_settings2.default.ready();
    const allowingDnrRulesByClickToLoadRuleAction = import_settings2.default.getSetting("allowingDnrRulesByClickToLoadRuleAction");
    if (!allowingDnrRulesByClickToLoadRuleAction) {
      console.warn("Click to Load DNR rules are not known yet, skipping.");
      return;
    }
    const disabledRuleActions = new Set(Object.keys(allowingDnrRulesByClickToLoadRuleAction));
    await tds_default.ready("config");
    for (const ruleAction of getDefaultEnabledClickToLoadRuleActionsForTab(tab)) {
      disabledRuleActions.delete(ruleAction);
    }
    if (!tab) {
      return;
    }
    for (const disabledRuleAction of Object.keys(tab.dnrRuleIdsByDisabledClickToLoadRuleAction)) {
      if (disabledRuleActions.has(disabledRuleAction)) {
        disabledRuleActions.delete(disabledRuleAction);
      } else {
        for (const ruleId of tab.dnrRuleIdsByDisabledClickToLoadRuleAction[disabledRuleAction]) {
          removeRuleIds.push(ruleId);
        }
        delete tab.dnrRuleIdsByDisabledClickToLoadRuleAction[disabledRuleAction];
      }
    }
    for (const disabledRuleAction of disabledRuleActions) {
      addRules.push(...await generateDnrAllowingRules(tab, disabledRuleAction));
    }
    if (addRules.length > 0 || removeRuleIds.length > 0) {
      return await chrome.declarativeNetRequest.updateSessionRules(
        { addRules, removeRuleIds }
      );
    }
  }
  async function ensureClickToLoadRuleActionDisabled(ruleAction, tab) {
    const addRules = await generateDnrAllowingRules(tab, ruleAction);
    if (addRules.length > 0) {
      return await chrome.declarativeNetRequest.updateSessionRules({ addRules });
    }
  }
  async function clearClickToLoadDnrRulesForTab(tab) {
    const removeRuleIds = Array.prototype.concat(
      ...Object.values(tab.dnrRuleIdsByDisabledClickToLoadRuleAction)
    );
    if (removeRuleIds.length > 0) {
      return await chrome.declarativeNetRequest.updateSessionRules(
        { removeRuleIds }
      );
    }
  }
  var import_settings2;
  var init_dnr_click_to_load = __esm({
    "shared/js/background/dnr-click-to-load.js"() {
      "use strict";
      init_click_to_load();
      init_dnr_session_rule_id();
      import_settings2 = __toESM(require_settings());
      init_tds();
    }
  });

  // shared/js/background/classes/top-blocked.js
  var require_top_blocked = __commonJS({
    "shared/js/background/classes/top-blocked.js"(exports2, module2) {
      "use strict";
      function TopBlocked() {
        this.data = [];
      }
      TopBlocked.prototype = {
        add: function(element) {
          this.data.push(element);
        },
        getTop: function(n, sortFunc) {
          this.sort(sortFunc);
          n = n || 10;
          return this.data.slice(0, n);
        },
        sort: function(sortFunc) {
          this.data.sort(sortFunc);
        },
        clear: function() {
          this.data = [];
        },
        setData: function(data) {
          this.data = data;
        }
      };
      module2.exports = TopBlocked;
    }
  });

  // shared/js/background/classes/company.js
  var require_company = __commonJS({
    "shared/js/background/classes/company.js"(exports2, module2) {
      "use strict";
      var Company = class {
        constructor(c) {
          this.name = c.name;
          this.count = 0;
          this.pagesSeenOn = 0;
          this.displayName = c.displayName || c.name;
        }
        incrementCount() {
          this.count += 1;
        }
        incrementPagesSeenOn() {
          this.pagesSeenOn += 1;
        }
        get(property) {
          return this[property];
        }
        set(property, val) {
          this[property] = val;
        }
      };
      module2.exports = Company;
    }
  });

  // shared/js/background/companies.js
  var require_companies = __commonJS({
    "shared/js/background/companies.js"(exports2, module2) {
      "use strict";
      var TopBlocked = require_top_blocked();
      var Company = require_company();
      var browserWrapper5 = (init_wrapper(), __toCommonJS(wrapper_exports));
      var Companies3 = (() => {
        let companyContainer = {};
        const topBlocked = new TopBlocked();
        const storageName = "companyData";
        let totalPages = 0;
        let totalPagesWithTrackers = 0;
        let lastStatsResetDate = null;
        function sortByCount(a, b) {
          return companyContainer[b].count - companyContainer[a].count;
        }
        function sortByPages(a, b) {
          return companyContainer[b].pagesSeenOn - companyContainer[a].pagesSeenOn;
        }
        return {
          get: (name) => {
            return companyContainer[name];
          },
          getTotalPages: () => {
            return totalPages;
          },
          add: (c) => {
            if (!companyContainer[c.name]) {
              companyContainer[c.name] = new Company(c);
              topBlocked.add(c.name);
            }
            companyContainer[c.name].incrementCount();
            return companyContainer[c.name];
          },
          // This is used by tab.js to count only unique tracking networks on a tab
          countCompanyOnPage: (c) => {
            if (!companyContainer[c.name]) {
              companyContainer[c.name] = new Company(c);
              topBlocked.add(c.name);
            }
            if (c.name !== "unknown") companyContainer[c.name].incrementPagesSeenOn();
          },
          all: () => {
            return Object.keys(companyContainer);
          },
          getTopBlocked: (n) => {
            const topBlockedData = [];
            topBlocked.getTop(n, sortByCount).forEach((name) => {
              const c = Companies3.get(name);
              topBlockedData.push({ name: c.name, count: c.count, displayName: c.displayName });
            });
            return topBlockedData;
          },
          getTopBlockedByPages: (n) => {
            const topBlockedData = [];
            topBlocked.getTop(n, sortByPages).forEach((name) => {
              const c = Companies3.get(name);
              topBlockedData.push({
                name: c.name,
                displayName: c.displayName,
                percent: Math.min(100, Math.round(c.pagesSeenOn / totalPages * 100))
              });
            });
            return {
              topBlocked: topBlockedData,
              totalPages,
              pctPagesWithTrackers: Math.min(100, Math.round(totalPagesWithTrackers / totalPages * 100)),
              lastStatsResetDate
            };
          },
          setTotalPagesFromStorage: (n) => {
            if (n) totalPages = n;
          },
          setTotalPagesWithTrackersFromStorage: (n) => {
            if (n) totalPagesWithTrackers = n;
          },
          resetData: () => {
            companyContainer = {};
            topBlocked.clear();
            totalPages = 0;
            totalPagesWithTrackers = 0;
            lastStatsResetDate = Date.now();
            Companies3.syncToStorage();
            const resetDate = Companies3.getLastResetDate();
            browserWrapper5.notifyPopup({ didResetTrackersData: resetDate });
          },
          getLastResetDate: () => lastStatsResetDate,
          incrementTotalPages: () => {
            totalPages += 1;
            Companies3.syncToStorage();
          },
          incrementTotalPagesWithTrackers: () => {
            totalPagesWithTrackers += 1;
            Companies3.syncToStorage();
          },
          syncToStorage: () => {
            const toSync = {};
            toSync[storageName] = companyContainer;
            browserWrapper5.syncToStorage(toSync);
            browserWrapper5.syncToStorage({ totalPages });
            browserWrapper5.syncToStorage({ totalPagesWithTrackers });
            browserWrapper5.syncToStorage({ lastStatsResetDate });
          },
          sanitizeData: (storageData) => {
            if (storageData && Object.hasOwnProperty.call(storageData, "twitter")) {
              delete storageData.twitter;
            }
            return storageData;
          },
          buildFromStorage: () => {
            browserWrapper5.getFromStorage(storageName).then((storageData) => {
              storageData = Companies3.sanitizeData(storageData);
              for (const company in storageData) {
                const newCompany = Companies3.add(storageData[company]);
                newCompany.set("count", storageData[company].count || 0);
                newCompany.set("pagesSeenOn", storageData[company].pagesSeenOn || 0);
              }
            });
            browserWrapper5.getFromStorage("totalPages").then((n) => {
              if (n) totalPages = n;
            });
            browserWrapper5.getFromStorage("totalPagesWithTrackers").then((n) => {
              if (n) totalPagesWithTrackers = n;
            });
            browserWrapper5.getFromStorage("lastStatsResetDate").then((d) => {
              if (d) {
                lastStatsResetDate = d;
              } else {
                Companies3.resetData();
              }
            });
          }
        };
      })();
      module2.exports = Companies3;
    }
  });

  // shared/data/tosdr.json
  var require_tosdr = __commonJS({
    "shared/data/tosdr.json"(exports2, module2) {
      module2.exports = {
        "zoosk.com": {
          score: 0,
          all: {
            bad: [],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "youtube.com": {
          score: 0,
          all: {
            bad: [
              "broader than necessary",
              "reduction of legal period for cause of action",
              "user needs to check tosback.org",
              "device fingerprinting"
            ],
            good: [
              "help you deal with take-down notices"
            ]
          },
          match: {
            bad: [
              "broader than necessary",
              "reduction of legal period for cause of action",
              "user needs to check tosback.org",
              "device fingerprinting"
            ],
            good: [
              "help you deal with take-down notices"
            ]
          },
          class: "D"
        },
        "yahoo.com": {
          score: 0,
          all: {
            bad: [
              "pseudonym not allowed (not because of user-to-user trust)",
              "user needs to check tosback.org",
              "device fingerprinting"
            ],
            good: [
              "limited for purpose of same service",
              "limited for purpose of same service"
            ]
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "xing.com": {
          score: 0,
          all: {
            bad: [
              "pseudonym not allowed (not because of user-to-user trust)"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "xfire.com": {
          score: 0,
          all: {
            bad: [],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "worldofwarcraft.com": {
          score: 0,
          all: {
            bad: [],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "wordpress.com": {
          score: 0,
          all: {
            bad: [
              "user needs to check tosback.org",
              "device fingerprinting"
            ],
            good: [
              "limited for purpose of same service"
            ]
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "wordfeud.com": {
          score: 0,
          all: {
            bad: [],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "wikipedia.org": {
          score: 0,
          all: {
            bad: [],
            good: [
              "only temporary session cookies",
              "user feedback is invited",
              "suspension will be fair and proportionate",
              "you publish under a free license, not a bilateral one"
            ]
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "whatsapp.com": {
          score: 0,
          all: {
            bad: [
              "user needs to check tosback.org"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "videobb.com": {
          score: 0,
          all: {
            bad: [],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "vbulletin.com": {
          score: 0,
          all: {
            bad: [],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "twitter.com": {
          score: 0,
          all: {
            bad: [
              "little involvement",
              "very broad",
              "your content stays licensed",
              "sets third-party cookies and/or ads"
            ],
            good: [
              "archives provided",
              "tracking data deleted after 10 days and opt-out",
              "you can get your data back"
            ]
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "twitpic.com": {
          score: 85,
          all: {
            bad: [
              "responsible and indemnify",
              "reduction of legal period for cause of action",
              "they can license to third parties"
            ],
            good: []
          },
          match: {
            bad: [
              "they can license to third parties"
            ],
            good: []
          },
          class: false
        },
        "tumblr.com": {
          score: 0,
          all: {
            bad: [
              "keep a license even after you close your account",
              "sets third-party cookies and/or ads"
            ],
            good: [
              "they state that you own your data",
              "third parties are bound by confidentiality obligations",
              "archives provided"
            ]
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "steampowered.com": {
          score: -65,
          all: {
            bad: [
              "defend, indemnify, hold harmless; survives termination",
              "personal data is given to third parties",
              "they can delete your account without prior notice and without a reason",
              "class action waiver"
            ],
            good: [
              "personal data is not sold",
              "pseudonyms allowed",
              "you can request access and deletion of personal data",
              "user is notified a month or more in advance",
              "you can leave at any time"
            ]
          },
          match: {
            bad: [
              "personal data is given to third parties"
            ],
            good: [
              "personal data is not sold",
              "you can request access and deletion of personal data"
            ]
          },
          class: false
        },
        "store.steampowered.com": {
          score: -65,
          all: {
            bad: [
              "defend, indemnify, hold harmless; survives termination",
              "personal data is given to third parties",
              "they can delete your account without prior notice and without a reason",
              "class action waiver"
            ],
            good: [
              "personal data is not sold",
              "pseudonyms allowed",
              "you can request access and deletion of personal data",
              "user is notified a month or more in advance",
              "you can leave at any time"
            ]
          },
          match: {
            bad: [
              "personal data is given to third parties"
            ],
            good: [
              "personal data is not sold",
              "you can request access and deletion of personal data"
            ]
          },
          class: false
        },
        "spotify.com": {
          score: 10,
          all: {
            bad: [
              "you grant perpetual license to anything you publish-bad-80",
              "spotify may transfer and process your data to somewhere outside of your country-bad-50",
              "personal data is given to third parties",
              "they can delete your account without prior notice and without a reason",
              "no promise to inform/notify",
              "no quality guarantee",
              "third parties may be involved in operating the service",
              "no quality guarantee"
            ],
            good: [
              "info given about risk of publishing your info online",
              "you can leave at any time",
              "they educate you about the risks",
              "info given about what personal data they collect",
              "info given about intended use of your information"
            ]
          },
          match: {
            bad: [
              "personal data is given to third parties"
            ],
            good: []
          },
          class: false
        },
        "soundcloud.com": {
          score: 20,
          all: {
            bad: [
              "responsible and indemnify",
              "may sell your data in merger",
              "third-party cookies, but with opt-out instructions"
            ],
            good: [
              "user is notified a month or more in advance",
              "easy to read",
              "you have control over licensing options",
              "your personal data is used for limited purposes",
              "pseudonyms allowed",
              "you can leave at any time"
            ]
          },
          match: {
            bad: [
              "may sell your data in merger"
            ],
            good: []
          },
          class: "B"
        },
        "sonic.net": {
          score: 0,
          all: {
            bad: [],
            good: [
              "logs are deleted after two weeks"
            ]
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "skype.com": {
          score: 0,
          all: {
            bad: [
              "user needs to check tosback.org",
              "you may not express negative opinions about them"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "seenthis.net": {
          score: 0,
          all: {
            bad: [],
            good: [
              "you can get your data back",
              "you can leave at any time",
              "you have control over licensing options"
            ]
          },
          match: {
            bad: [],
            good: [
              "you can get your data back",
              "you can leave at any time",
              "you have control over licensing options"
            ]
          },
          class: "A"
        },
        "runescape.com": {
          score: 0,
          all: {
            bad: [],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "rapidshare.com": {
          score: -50,
          all: {
            bad: [],
            good: [
              "no third-party access without a warrant",
              "they do not index or open files",
              "your personal data is used for limited purposes",
              "99.x% availability",
              "user is notified a month or more in advance"
            ]
          },
          match: {
            bad: [],
            good: [
              "no third-party access without a warrant"
            ]
          },
          class: false
        },
        "quora.com": {
          score: 0,
          all: {
            bad: [
              "device fingerprinting"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "phpbb.com": {
          score: 0,
          all: {
            bad: [],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "packagetrackr.com": {
          score: 0,
          all: {
            bad: [
              "user needs to check tosback.org"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "owncube.com": {
          score: -25,
          all: {
            bad: [
              "user needs to check tosback.org"
            ],
            good: [
              "personal data is not sold"
            ]
          },
          match: {
            bad: [],
            good: [
              "personal data is not sold"
            ]
          },
          class: false
        },
        "olx.com": {
          score: 0,
          all: {
            bad: [],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "netflix.com": {
          score: -20,
          all: {
            bad: [
              "class action waiver",
              "sets third-party cookies and/or ads",
              "they can delete your account without prior notice and without a reason",
              "no liability for unauthorized access",
              "user needs to check tosback.org",
              "targeted third-party advertising",
              "no promise to inform/notify"
            ],
            good: [
              "easy to read",
              "you can request access and deletion of personal data"
            ]
          },
          match: {
            bad: [
              "targeted third-party advertising"
            ],
            good: [
              "you can request access and deletion of personal data"
            ]
          },
          class: false
        },
        "nabble.com": {
          score: 0,
          all: {
            bad: [
              "user needs to check tosback.org"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "mint.com": {
          score: 20,
          all: {
            bad: [
              "may sell your data in merger",
              "user needs to rely on tosback.org"
            ],
            good: []
          },
          match: {
            bad: [
              "may sell your data in merger"
            ],
            good: []
          },
          class: false
        },
        "microsoft.com": {
          score: 60,
          all: {
            bad: [
              "class action waiver",
              "tracks you on other websites",
              "no promise to inform/notify",
              "user needs to check tosback.org",
              "your data may be stored anywhere in the world"
            ],
            good: [
              "personalized ads are opt-out"
            ]
          },
          match: {
            bad: [
              "tracks you on other websites"
            ],
            good: []
          },
          class: false
        },
        "lastpass.com": {
          score: -50,
          all: {
            bad: [
              "they can delete your account without prior notice and without a reason",
              "no quality guarantee",
              "no quality guarantee",
              "they become the owner of ideas you give them",
              "user needs to check tosback.org",
              "promotional communications are not opt-out",
              "responsible and indemnify"
            ],
            good: [
              "legal documents published under reusable license",
              "pseudonyms allowed",
              "info given about security practices",
              "only necessary logs are kept",
              "only temporary session cookies",
              "no third-party access without a warrant"
            ]
          },
          match: {
            bad: [],
            good: [
              "no third-party access without a warrant"
            ]
          },
          class: "B"
        },
        "kolabnow.com": {
          score: -75,
          all: {
            bad: [],
            good: [
              "no third-party access without a warrant",
              "4 weeks to review changes and possibility to negotiate-good-60",
              "no tracking cookies and web analytics opt-out-good-20",
              "suspension will be fair and proportionate",
              "only necessary logs are kept",
              "no third-party access without a warrant",
              "free software; you can run your own instance",
              "personal data is not sold"
            ]
          },
          match: {
            bad: [],
            good: [
              "no third-party access without a warrant",
              "personal data is not sold"
            ]
          },
          class: "A"
        },
        "kolab.org": {
          score: -75,
          all: {
            bad: [],
            good: [
              "no third-party access without a warrant",
              "4 weeks to review changes and possibility to negotiate-good-60",
              "no tracking cookies and web analytics opt-out-good-20",
              "suspension will be fair and proportionate",
              "only necessary logs are kept",
              "no third-party access without a warrant",
              "free software; you can run your own instance",
              "personal data is not sold"
            ]
          },
          match: {
            bad: [],
            good: [
              "no third-party access without a warrant",
              "personal data is not sold"
            ]
          },
          class: "A"
        },
        "kippt.com": {
          score: 0,
          all: {
            bad: [
              "user needs to rely on tosback.org"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "jagex.com": {
          score: 0,
          all: {
            bad: [],
            good: [
              "user is notified a week or more in advance"
            ]
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "instagram.com": {
          score: 0,
          all: {
            bad: [
              "class action waiver",
              "very broad"
            ],
            good: [
              "user is notified a week or more in advance"
            ]
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "informe.com": {
          score: 0,
          all: {
            bad: [
              "user needs to check tosback.org"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "imgur.com": {
          score: 0,
          all: {
            bad: [
              "device fingerprinting"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "ifttt.com": {
          score: 0,
          all: {
            bad: [
              "user needs to check tosback.org"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "identi.ca": {
          score: 0,
          all: {
            bad: [],
            good: [
              "you publish under a free license, not a bilateral one"
            ]
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "hypster.com": {
          score: 0,
          all: {
            bad: [],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "habbo.com": {
          score: 0,
          all: {
            bad: [],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "gravatar.com": {
          score: 0,
          all: {
            bad: [
              "broader than necessary"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "grammarly.com": {
          score: 20,
          all: {
            bad: [
              "no promise to inform/notify",
              "your use is throttled",
              "no pricing info given before you sign up",
              "may sell your data in merger"
            ],
            good: []
          },
          match: {
            bad: [
              "may sell your data in merger"
            ],
            good: []
          },
          class: false
        },
        "google.com": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.in": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.jp": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.de": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.uk": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.br": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.fr": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ru": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.it": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.hk": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.es": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ca": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.mx": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.tr": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.au": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.tw": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.pl": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.id": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.ar": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.ua": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.pk": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.th": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.sa": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.eg": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.nl": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.ve": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.za": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.gr": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.ph": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.se": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.sg": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.be": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.az": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.ao": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.co": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.kr": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.at": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.vn": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.cn": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.ng": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.cz": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ch": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.no": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ro": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.pe": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.pt": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.cl": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ae": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ie": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.dk": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.dz": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.hu": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.fi": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.il": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.sk": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.kz": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.kw": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.nz": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.lk": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.bg": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.by": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.do": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.ly": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.rs": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.mm": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.hr": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.ec": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.tn": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.my": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.lt": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.tm": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.iq": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.si": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.af": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.gt": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.lv": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.pr": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.gh": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.bd": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.cu": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.jo": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.lb": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.sv": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ee": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.bh": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ba": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.uy": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.ma": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.cm": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.tt": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.kh": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.py": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.np": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.cy": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.ni": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.et": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.cd": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.hn": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ge": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.am": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.lu": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.qa": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.mz": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.bw": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.mg": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.sn": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.pg": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.cg": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.bn": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.tj": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ht": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.zm": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.ke": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.al": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.bf": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.mu": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.cr": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.la": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.mn": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.bo": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.org": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.jm": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.tz": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.na": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ml": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.mt": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.is": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.bj": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.ug": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.rw": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.om": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ci": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.bs": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.td": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ps": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.gi": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.pa": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.sl": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.uz": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.md": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.bi": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.sr": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.cat": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.so": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.bt": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.je": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.gy": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.me": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.zw": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.gp": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.tg": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.ls": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.as": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.bz": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.cf": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.mv": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ad": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.li": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.cv": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.mk": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.vc": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.ag": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.gl": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ne": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.mw": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ws": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.kg": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.gm": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.to": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.sb": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.tn": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ga": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.tl": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.im": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.fj": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.dj": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ac": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.iq": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.vg": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.dm": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.sc": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.pt": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.cn": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.st": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ng": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.ai": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ki": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.vu": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.sm": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.jp": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.om": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.vi": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.gg": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.fm": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.hk": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.ck": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.tk": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.in": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.co.je": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.ve": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.tw": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.us": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ua": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.de.com": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.ms": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.com.by": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.nr": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.br.com": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.sh": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.hk.com": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "google.kr": {
          score: 220,
          all: {
            bad: [
              "they may stop providing the service at any time",
              "they can use your content for all their existing and future services",
              "third-party access without a warrant",
              "your content stays licensed",
              "tracks you on other websites",
              "logs are kept forever",
              "device fingerprinting"
            ],
            good: [
              "user is notified a week or more in advance",
              "archives provided",
              "they provide a way to export your data",
              "limited for purpose across broad platform"
            ]
          },
          match: {
            bad: [
              "they can use your content for all their existing and future services",
              "tracks you on other websites",
              "logs are kept forever"
            ],
            good: []
          },
          class: "C"
        },
        "github.com": {
          score: 0,
          all: {
            bad: [
              "they can delete your account without prior notice and without a reason",
              "user needs to check tosback.org",
              "pseudonym not allowed (not because of user-to-user trust)",
              "defend, indemnify, hold harmless"
            ],
            good: [
              "info given about security practices",
              "you publish under a free license, not a bilateral one",
              "will notify before merger",
              "your personal data is used for limited purposes"
            ]
          },
          match: {
            bad: [
              "they can delete your account without prior notice and without a reason",
              "user needs to check tosback.org",
              "pseudonym not allowed (not because of user-to-user trust)",
              "defend, indemnify, hold harmless"
            ],
            good: [
              "info given about security practices",
              "you publish under a free license, not a bilateral one",
              "will notify before merger",
              "your personal data is used for limited purposes"
            ]
          },
          class: "B"
        },
        "freeforums.org": {
          score: 0,
          all: {
            bad: [
              "user needs to check tosback.org"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "foxnews.com": {
          score: 0,
          all: {
            bad: [
              "device fingerprinting"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "flickr.com": {
          score: 0,
          all: {
            bad: [],
            good: [
              "you can choose with whom you share content",
              "limited for purpose of same service",
              "you can choose the copyright license"
            ]
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "flattr.com": {
          score: 0,
          all: {
            bad: [
              "sets third-party cookies and/or ads"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "facebook.com": {
          score: 100,
          all: {
            bad: [
              "pseudonym not allowed (not because of user-to-user trust)",
              "tracks you on other websites",
              "many third parties are involved in operating the service",
              "very broad",
              "your data is used for many purposes"
            ],
            good: [
              "they state that you own your data",
              "user feedback is invited"
            ]
          },
          match: {
            bad: [
              "tracks you on other websites",
              "your data is used for many purposes"
            ],
            good: []
          },
          class: false
        },
        "evernote.com": {
          score: 0,
          all: {
            bad: [],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "envato.com": {
          score: 0,
          all: {
            bad: [],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "ebuddy.com": {
          score: 0,
          all: {
            bad: [],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "duckduckgo.com": {
          score: -100,
          all: {
            bad: [],
            good: [
              "no tracking"
            ]
          },
          match: {
            bad: [],
            good: [
              "no tracking"
            ]
          },
          class: "A"
        },
        "duck.com": {
          score: -100,
          all: {
            bad: [],
            good: [
              "no tracking"
            ]
          },
          match: {
            bad: [],
            good: [
              "no tracking"
            ]
          },
          class: "A"
        },
        "donttrack.us": {
          score: -100,
          all: {
            bad: [],
            good: [
              "no tracking"
            ]
          },
          match: {
            bad: [],
            good: [
              "no tracking"
            ]
          },
          class: "A"
        },
        "privacyheroes.io": {
          score: -100,
          all: {
            bad: [],
            good: [
              "no tracking"
            ]
          },
          match: {
            bad: [],
            good: [
              "no tracking"
            ]
          },
          class: "A"
        },
        "spreadprivacy.com": {
          score: -100,
          all: {
            bad: [],
            good: [
              "no tracking"
            ]
          },
          match: {
            bad: [],
            good: [
              "no tracking"
            ]
          },
          class: "A"
        },
        "duckduckhack.com": {
          score: -100,
          all: {
            bad: [],
            good: [
              "no tracking"
            ]
          },
          match: {
            bad: [],
            good: [
              "no tracking"
            ]
          },
          class: "A"
        },
        "privatebrowsingmyths.com": {
          score: -100,
          all: {
            bad: [],
            good: [
              "no tracking"
            ]
          },
          match: {
            bad: [],
            good: [
              "no tracking"
            ]
          },
          class: "A"
        },
        "duck.co": {
          score: -100,
          all: {
            bad: [],
            good: [
              "no tracking"
            ]
          },
          match: {
            bad: [],
            good: [
              "no tracking"
            ]
          },
          class: "A"
        },
        "cispaletter.org": {
          score: -100,
          all: {
            bad: [],
            good: [
              "no tracking"
            ]
          },
          match: {
            bad: [],
            good: [
              "no tracking"
            ]
          },
          class: "A"
        },
        "dropbox.com": {
          score: 0,
          all: {
            bad: [],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "disqus.com": {
          score: 0,
          all: {
            bad: [
              "user needs to check tosback.org"
            ],
            good: [
              "they will help you react to others infringing on your copyright"
            ]
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "dictionary.com": {
          score: 0,
          all: {
            bad: [
              "device fingerprinting"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "delicious.com": {
          score: 20,
          all: {
            bad: [
              "broad license including right to distribute through any media",
              "sets third-party cookies and/or ads",
              "may sell your data in merger",
              "only for your individual and non-commercial use"
            ],
            good: [
              "third parties are bound by confidentiality obligations"
            ]
          },
          match: {
            bad: [
              "may sell your data in merger"
            ],
            good: []
          },
          class: "D"
        },
        "delicious.com.au": {
          score: 20,
          all: {
            bad: [
              "broad license including right to distribute through any media",
              "sets third-party cookies and/or ads",
              "may sell your data in merger",
              "only for your individual and non-commercial use"
            ],
            good: [
              "third parties are bound by confidentiality obligations"
            ]
          },
          match: {
            bad: [
              "may sell your data in merger"
            ],
            good: []
          },
          class: "D"
        },
        "coursera.org": {
          score: 0,
          all: {
            bad: [
              "user needs to rely on tosback.org"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "couchsurfing.org": {
          score: 20,
          all: {
            bad: [
              "your content stays licensed",
              "they can delete your account without prior notice and without a reason",
              "they become the owner of ideas you give them",
              "keep a license even after you close your account",
              "broader than necessary",
              "user needs to check tosback.org",
              "may sell your data in merger",
              "third-party cookies, but with opt-out instructions"
            ],
            good: []
          },
          match: {
            bad: [
              "may sell your data in merger"
            ],
            good: []
          },
          class: false
        },
        "cnn.com": {
          score: 0,
          all: {
            bad: [
              "device fingerprinting"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "cnet.com": {
          score: 0,
          all: {
            bad: [
              "device fingerprinting"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "cloudant.com": {
          score: 20,
          all: {
            bad: [
              "defend, indemnify, hold harmless",
              "user needs to check tosback.org",
              "no liability for unauthorized access",
              "may sell your data in merger",
              "sets third-party cookies and/or ads"
            ],
            good: [
              "limited for purpose of same service",
              "they provide a way to export your data",
              "refund policy",
              "you publish under a free license, not a bilateral one",
              "they give 30 days notice before closing your account",
              "will warn about maintenance"
            ]
          },
          match: {
            bad: [
              "may sell your data in merger"
            ],
            good: []
          },
          class: "B"
        },
        null: {
          score: 0,
          all: {
            bad: [
              "device fingerprinting"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "bitly.com": {
          score: 0,
          all: {
            bad: [],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "bearshare.com": {
          score: 0,
          all: {
            bad: [],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "bbc.com": {
          score: 0,
          all: {
            bad: [
              "device fingerprinting"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "icloud.com": {
          score: 0,
          all: {
            bad: [],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "apple.com": {
          score: 0,
          all: {
            bad: [
              "user needs to check tosback.org"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "app.net": {
          score: 0,
          all: {
            bad: [
              "user needs to rely on tosback.org",
              "you may not scrape",
              "defend, indemnify, hold harmless"
            ],
            good: [
              "user feedback is invited",
              "archives provided",
              "you can delete your content",
              "easy to read",
              "pseudonyms allowed"
            ]
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "amazon.com": {
          score: 110,
          all: {
            bad: [
              "may sell your data in merger",
              "targeted third-party advertising",
              "tracks you on other websites",
              "user needs to check tosback.org"
            ],
            good: []
          },
          match: {
            bad: [
              "may sell your data in merger",
              "targeted third-party advertising",
              "tracks you on other websites"
            ],
            good: []
          },
          class: false
        },
        "allrecipes.com": {
          score: 0,
          all: {
            bad: [
              "user needs to check tosback.org"
            ],
            good: []
          },
          match: {
            bad: [],
            good: []
          },
          class: false
        },
        "500px.com": {
          score: 0,
          all: {
            bad: [
              "class action waiver",
              "responsible and indemnify",
              "they can delete your account without prior notice and without a reason",
              "broader than necessary"
            ],
            good: [
              "easy to read",
              "pseudonyms allowed"
            ]
          },
          match: {
            bad: [
              "class action waiver",
              "responsible and indemnify",
              "they can delete your account without prior notice and without a reason",
              "broader than necessary"
            ],
            good: [
              "easy to read",
              "pseudonyms allowed"
            ]
          },
          class: "D"
        },
        "500px.me": {
          score: 0,
          all: {
            bad: [
              "class action waiver",
              "responsible and indemnify",
              "they can delete your account without prior notice and without a reason",
              "broader than necessary"
            ],
            good: [
              "easy to read",
              "pseudonyms allowed"
            ]
          },
          match: {
            bad: [
              "class action waiver",
              "responsible and indemnify",
              "they can delete your account without prior notice and without a reason",
              "broader than necessary"
            ],
            good: [
              "easy to read",
              "pseudonyms allowed"
            ]
          },
          class: "D"
        },
        "500px.org": {
          score: 0,
          all: {
            bad: [
              "class action waiver",
              "responsible and indemnify",
              "they can delete your account without prior notice and without a reason",
              "broader than necessary"
            ],
            good: [
              "easy to read",
              "pseudonyms allowed"
            ]
          },
          match: {
            bad: [
              "class action waiver",
              "responsible and indemnify",
              "they can delete your account without prior notice and without a reason",
              "broader than necessary"
            ],
            good: [
              "easy to read",
              "pseudonyms allowed"
            ]
          },
          class: "D"
        },
        "500px.net": {
          score: 0,
          all: {
            bad: [
              "class action waiver",
              "responsible and indemnify",
              "they can delete your account without prior notice and without a reason",
              "broader than necessary"
            ],
            good: [
              "easy to read",
              "pseudonyms allowed"
            ]
          },
          match: {
            bad: [
              "class action waiver",
              "responsible and indemnify",
              "they can delete your account without prior notice and without a reason",
              "broader than necessary"
            ],
            good: [
              "easy to read",
              "pseudonyms allowed"
            ]
          },
          class: "D"
        }
      };
    }
  });

  // shared/data/constants.js
  var require_constants = __commonJS({
    "shared/data/constants.js"(exports2, module2) {
      "use strict";
      var parseUserAgentString4 = require_parse_user_agent_string();
      var browserInfo2 = parseUserAgentString4();
      var trackerBlockingEndpointBase = "https://staticcdn.duckduckgo.com/trackerblocking";
      function isMV3() {
        if (typeof chrome !== "undefined") {
          return chrome?.runtime.getManifest().manifest_version === 3;
        }
        return false;
      }
      function getConfigFileName() {
        let browserName2 = browserInfo2?.browser?.toLowerCase() || "";
        if (!["chrome", "firefox", "brave", "edg"].includes(browserName2)) {
          browserName2 = "";
        } else {
          browserName2 = "-" + browserName2 + (isMV3() ? "mv3" : "");
        }
        return `${trackerBlockingEndpointBase}/config/v4/extension${browserName2}-config.json`;
      }
      function getTDSEndpoint(version) {
        const thisPlatform = `extension${isMV3() ? "-mv3" : ""}`;
        return `${trackerBlockingEndpointBase}/${version}/${thisPlatform}-tds.json`;
      }
      module2.exports = {
        displayCategories: ["Analytics", "Advertising", "Social Network", "Content Delivery", "Embedded Content"],
        feedbackUrl: "https://duckduckgo.com/feedback.js?type=extension-feedback",
        tosdrMessages: {
          A: "Good",
          B: "Mixed",
          C: "Poor",
          D: "Poor",
          E: "Poor",
          good: "Good",
          bad: "Poor",
          unknown: "Unknown",
          mixed: "Mixed"
        },
        httpsService: "https://duckduckgo.com/smarter_encryption.js",
        duckDuckGoSerpHostname: "duckduckgo.com",
        httpsMessages: {
          secure: "Encrypted Connection",
          upgraded: "Forced Encryption",
          none: "Unencrypted Connection"
        },
        /**
         * Major tracking networks data:
         * percent of the top 1 million sites a tracking network has been seen on.
         * see: https://webtransparency.cs.princeton.edu/webcensus/
         */
        majorTrackingNetworks: {
          google: 84,
          facebook: 36,
          twitter: 16,
          amazon: 14,
          appnexus: 10,
          oracle: 10,
          mediamath: 9,
          oath: 9,
          maxcdn: 7,
          automattic: 7
        },
        /*
         * Mapping entity names to CSS class name for popup icons
         */
        entityIconMapping: {
          "Google LLC": "google",
          "Facebook, Inc.": "facebook",
          "Twitter, Inc.": "twitter",
          "Amazon Technologies, Inc.": "amazon",
          "AppNexus, Inc.": "appnexus",
          "MediaMath, Inc.": "mediamath",
          "StackPath, LLC": "maxcdn",
          "Automattic, Inc.": "automattic",
          "Adobe Inc.": "adobe",
          "Quantcast Corporation": "quantcast",
          "The Nielsen Company": "nielsen"
        },
        httpsDBName: "https",
        httpsLists: [
          {
            type: "upgrade bloom filter",
            name: "httpsUpgradeBloomFilter",
            url: "https://staticcdn.duckduckgo.com/https/https-bloom.json"
          },
          {
            type: "don't upgrade bloom filter",
            name: "httpsDontUpgradeBloomFilters",
            url: "https://staticcdn.duckduckgo.com/https/negative-https-bloom.json"
          },
          {
            type: "upgrade safelist",
            name: "httpsUpgradeList",
            url: "https://staticcdn.duckduckgo.com/https/negative-https-allowlist.json"
          },
          {
            type: "don't upgrade safelist",
            name: "httpsDontUpgradeList",
            url: "https://staticcdn.duckduckgo.com/https/https-allowlist.json"
          }
        ],
        tdsLists: [
          {
            name: "surrogates",
            url: "/data/surrogates.txt",
            format: "text",
            source: "local"
          },
          {
            name: "tds",
            url: getTDSEndpoint("v6/current"),
            format: "json",
            source: "external",
            channels: {
              live: getTDSEndpoint("v6/current"),
              next: getTDSEndpoint("v6/next"),
              beta: getTDSEndpoint("beta")
            }
          },
          {
            name: "config",
            url: getConfigFileName(),
            format: "json",
            source: "external"
          }
        ],
        httpsErrorCodes: {
          "net::ERR_CONNECTION_REFUSED": 1,
          "net::ERR_ABORTED": 2,
          "net::ERR_SSL_PROTOCOL_ERROR": 3,
          "net::ERR_SSL_VERSION_OR_CIPHER_MISMATCH": 4,
          "net::ERR_NAME_NOT_RESOLVED": 5,
          NS_ERROR_CONNECTION_REFUSED: 6,
          NS_ERROR_UNKNOWN_HOST: 7,
          "An additional policy constraint failed when validating this certificate.": 8,
          "Unable to communicate securely with peer: requested domain name does not match the server\u2019s certificate.": 9,
          "Cannot communicate securely with peer: no common encryption algorithm(s).": 10,
          "SSL received a record that exceeded the maximum permissible length.": 11,
          "The certificate is not trusted because it is self-signed.": 12,
          downgrade_redirect_loop: 13
        },
        iconPaths: (
          /** @type {const} */
          {
            regular: "/img/icon_browser_action.png",
            withSpecialState: "/img/icon_browser_action_special.png"
          }
        ),
        platform: {
          name: "extension"
        },
        trackerStats: (
          /** @type {const} */
          {
            allowedOrigin: "https://duckduckgo.com",
            allowedPathname: "ntp-tracker-stats.html",
            redirectTarget: "html/tracker-stats.html",
            clientPortName: "newtab-tracker-stats",
            /** @type {ReadonlyArray<string>} */
            excludedCompanies: ["ExoClick"],
            events: {
              incoming: {
                newTabPage_heartbeat: "newTabPage_heartbeat"
              },
              outgoing: {
                newTabPage_data: "newTabPage_data",
                newTabPage_disconnect: "newTabPage_disconnect"
              }
            }
          }
        )
      };
    }
  });

  // shared/js/background/privacy-practices.js
  var require_privacy_practices = __commonJS({
    "shared/js/background/privacy-practices.js"(exports2, module2) {
      "use strict";
      var tldts = require_cjs();
      var tosdr = require_tosdr();
      var constants3 = require_constants();
      var utils4 = (init_utils(), __toCommonJS(utils_exports));
      var tosdrRegexList = [];
      var tosdrScores = {};
      var PrivacyPractices = class {
        constructor() {
          Object.keys(tosdr).forEach((site) => {
            tosdrRegexList.push(new RegExp(`(^)${tldts.getDomain(site)}`));
            const tosdrClass = tosdr[site].class;
            const tosdrScore = tosdr[site].score;
            if (tosdrClass || tosdrScore) {
              let score = 5;
              if (tosdrClass === "A") {
                score = 0;
              } else if (tosdrClass === "B") {
                score = 1;
              } else if (tosdrClass === "D" || tosdrScore > 150) {
                score = 10;
              } else if (tosdrClass === "C" || tosdrScore > 100) {
                score = 7;
              }
              tosdrScores[site] = score;
              const parentEntity = utils4.findParent(site);
              if (parentEntity && (!tosdrScores[parentEntity] || tosdrScores[parentEntity] < score)) {
                tosdrScores[parentEntity] = score;
              }
            }
          });
        }
        getTosdr(url) {
          const domain = tldts.getDomain(url);
          let tosdrData;
          tosdrRegexList.some((tosdrSite) => {
            const match = tosdrSite.exec(domain);
            if (!match) return false;
            tosdrData = tosdr[match[0]];
            return tosdrData;
          });
          if (!tosdrData) return {};
          const matchGood = tosdrData.match && tosdrData.match.good || [];
          const matchBad = tosdrData.match && tosdrData.match.bad || [];
          let message = constants3.tosdrMessages.unknown;
          if (tosdrData.class) {
            message = constants3.tosdrMessages[tosdrData.class];
          } else if (matchGood.length && matchBad.length) {
            message = constants3.tosdrMessages.mixed;
          } else {
            if (tosdrData.score < 0) {
              message = constants3.tosdrMessages.good;
            } else if (tosdrData.score === 0 && (matchGood.length || matchBad.length)) {
              message = constants3.tosdrMessages.mixed;
            } else if (tosdrData.score > 0) {
              message = constants3.tosdrMessages.bad;
            }
          }
          return {
            score: tosdrData.score,
            class: tosdrData.class,
            reasons: {
              good: matchGood,
              bad: matchBad
            },
            message
          };
        }
        getTosdrScore(hostname, parent2) {
          const domain = tldts.getDomain(hostname);
          let parentMatch = "";
          if (parent2 && parent2.domains) {
            Object.keys(tosdrScores).some((tosdrName) => {
              const match = parent2.domains.find((d) => d === tosdrName);
              if (match) {
                parentMatch = match;
                return true;
              }
              return false;
            });
          }
          const score = [
            tosdrScores[parentMatch],
            tosdrScores[domain],
            tosdrScores[hostname]
          ].find((s) => typeof s === "number");
          return score;
        }
      };
      module2.exports = new PrivacyPractices();
    }
  });

  // packages/privacy-grade/src/classes/grade.js
  var require_grade = __commonJS({
    "packages/privacy-grade/src/classes/grade.js"(exports2, module2) {
      "use strict";
      var UNKNOWN_PRIVACY_SCORE = 2;
      var TRACKER_RANGE_MAP = {
        zero: 0,
        max: 10,
        steps: [
          [0.1, 1],
          [1, 2],
          [5, 3],
          [10, 4],
          [15, 5],
          [20, 6],
          [30, 7],
          [45, 8],
          [66, 9]
        ]
      };
      var GRADE_RANGE_MAP = {
        zero: "A",
        max: "D-",
        steps: [
          [2, "A"],
          [4, "B+"],
          [10, "B"],
          [14, "C+"],
          [20, "C"],
          [30, "D"]
        ]
      };
      var Grade2 = class {
        constructor(attrs) {
          this.https = false;
          this.httpsAutoUpgrade = false;
          this.privacyScore = UNKNOWN_PRIVACY_SCORE;
          this.entitiesBlocked = {};
          this.entitiesNotBlocked = {};
          this.scores = null;
          attrs = attrs || {};
          if (attrs.https) {
            this.setHttps(attrs.https, attrs.httpsAutoUpgrade);
          }
          if (typeof attrs.privacyScore !== "undefined") {
            this.setPrivacyScore(attrs.privacyScore);
          }
          if (attrs.parentEntity) {
            this.setParentEntity(attrs.parentEntity, attrs.prevalence);
          }
          if (attrs.trackersBlocked) {
            Object.keys(attrs.trackersBlocked).forEach((entityName) => {
              this.addEntityBlocked(entityName, attrs.trackersBlocked[entityName].prevalence);
            });
          }
          if (attrs.trackersNotBlocked) {
            Object.keys(attrs.trackersNotBlocked).forEach((entityName) => {
              this.addEntityNotBlocked(entityName, attrs.trackersNotBlocked[entityName].prevalence);
            });
          }
        }
        setHttps(https, httpsAutoUpgrade) {
          this.scores = null;
          this.https = https;
          this.httpsAutoUpgrade = httpsAutoUpgrade;
        }
        setPrivacyScore(score) {
          this.scores = null;
          this.privacyScore = typeof score === "number" ? score : UNKNOWN_PRIVACY_SCORE;
        }
        addEntityBlocked(name, prevalence) {
          if (!name) return;
          this.scores = null;
          this.entitiesBlocked[name] = prevalence;
        }
        addEntityNotBlocked(name, prevalence) {
          if (!name) return;
          this.scores = null;
          this.entitiesNotBlocked[name] = prevalence;
        }
        setParentEntity(name, prevalence) {
          this.scores = null;
          this.addEntityNotBlocked(name, prevalence);
        }
        calculate() {
          let siteHttpsScore, enhancedHttpsScore;
          if (this.httpsAutoUpgrade) {
            siteHttpsScore = 0;
            enhancedHttpsScore = 0;
          } else if (this.https) {
            siteHttpsScore = 3;
            enhancedHttpsScore = 0;
          } else {
            siteHttpsScore = 10;
            enhancedHttpsScore = 10;
          }
          const privacyScore = Math.min(this.privacyScore, 10);
          let siteTrackerScore = 0;
          let enhancedTrackerScore = 0;
          for (const entity in this.entitiesBlocked) {
            siteTrackerScore += this._normalizeTrackerScore(this.entitiesBlocked[entity]);
          }
          for (const entity in this.entitiesNotBlocked) {
            siteTrackerScore += this._normalizeTrackerScore(this.entitiesNotBlocked[entity]);
            enhancedTrackerScore += this._normalizeTrackerScore(this.entitiesNotBlocked[entity]);
          }
          const siteTotalScore = siteHttpsScore + siteTrackerScore + privacyScore;
          const enhancedTotalScore = enhancedHttpsScore + enhancedTrackerScore + privacyScore;
          this.scores = {
            site: {
              grade: this._scoreToGrade(siteTotalScore),
              score: siteTotalScore,
              trackerScore: siteTrackerScore,
              httpsScore: siteHttpsScore,
              privacyScore
            },
            enhanced: {
              grade: this._scoreToGrade(enhancedTotalScore),
              score: enhancedTotalScore,
              trackerScore: enhancedTrackerScore,
              httpsScore: enhancedHttpsScore,
              privacyScore
            }
          };
        }
        get() {
          if (!this.scores) this.calculate();
          return this.scores;
        }
        _getValueFromRangeMap(value, rangeMapData) {
          const steps = rangeMapData.steps;
          if (!value || value <= 0) {
            return rangeMapData.zero;
          }
          if (value >= steps[steps.length - 1][0]) {
            return rangeMapData.max;
          }
          for (let i = 0; i < steps.length; i++) {
            if (value < steps[i][0]) {
              return steps[i][1];
            }
          }
        }
        _normalizeTrackerScore(pct) {
          return this._getValueFromRangeMap(pct, TRACKER_RANGE_MAP);
        }
        _scoreToGrade(score) {
          return this._getValueFromRangeMap(score, GRADE_RANGE_MAP);
        }
      };
      module2.exports = Grade2;
    }
  });

  // packages/privacy-grade/src/classes/trackers.js
  var require_trackers = __commonJS({
    "packages/privacy-grade/src/classes/trackers.js"(exports2, module2) {
      "use strict";
      var Trackers = class _Trackers {
        static standardRuleActions = /* @__PURE__ */ new Set(["block", "ignore"]);
        /**
         * @param {{
         *    tldts: import('tldts'),
         *    tldjs: import('tldts'),
         *    utils: *,
         * }} ops
         */
        constructor(ops) {
          this.tldts = ops.tldts || ops.tldjs;
          this.utils = ops.utils;
        }
        /**
         * @param {{data: *, name: string}[]} lists
         */
        setLists(lists) {
          lists.forEach((list) => {
            if (list.name === "tds") {
              this.entityList = this.processEntityList(list.data.entities);
              this.trackerList = this.processTrackerList(list.data.trackers);
              this.domains = list.data.domains;
              this.cnames = list.data.cnames;
            } else if (list.name === "surrogates") {
              this.surrogateList = this.processSurrogateList(list.data);
            }
          });
        }
        /**
         * @param {Record<string, TrackerObj>} data
         * @returns {*}
         */
        processTrackerList(data) {
          for (const name in data) {
            if (data[name].rules) {
              for (const i in data[name].rules) {
                data[name].rules[i].rule = new RegExp(data[name].rules[i].rule, "ig");
              }
            }
          }
          return data;
        }
        /**
         * @param {Record<string, EntityData>} data
         * @returns {Record<string, string>}
         */
        processEntityList(data) {
          const processed = {};
          for (const entity in data) {
            data[entity].domains.forEach((domain) => {
              processed[domain] = entity;
            });
          }
          return processed;
        }
        /**
         * @param {string} text
         * @returns {Record<string, string>}
         */
        processSurrogateList(text) {
          const b64dataheader = "data:application/javascript;base64,";
          const surrogateList = {};
          const splitSurrogateList = text.trim().split("\n\n");
          splitSurrogateList.forEach((sur) => {
            const lines = sur.split("\n").filter((line) => {
              return !/^#.*/.test(line);
            });
            const firstLine = lines.shift();
            if (!firstLine) {
              return;
            }
            const pattern = firstLine.split(" ")[0].split("/")[1];
            const b64surrogate = btoa(lines.join("\n").toString());
            surrogateList[pattern] = b64dataheader + b64surrogate;
          });
          return surrogateList;
        }
        /**
         * @param {string} url
         * @returns {{fromCname: string | undefined, finalURL: string}}
         */
        resolveCname(url) {
          const parsed = this.tldts.parse(url, { allowPrivateDomains: true });
          let finalURL = url;
          let fromCname;
          if (parsed && this.cnames && parsed.domain) {
            let domain = parsed.domain;
            if (parsed.subdomain) {
              domain = parsed.subdomain + "." + domain;
            }
            const finalDomain = this.cnames[domain] || domain;
            finalURL = finalURL.replace(domain, finalDomain);
            if (finalDomain !== domain) {
              fromCname = domain;
            }
          }
          return {
            fromCname,
            finalURL
          };
        }
        /**
         * Copied from extension (FIX)
         * @param {string} urlString
         **/
        getBaseDomain(urlString) {
          const parsedUrl = this.tldts.parse(urlString, { allowPrivateDomains: true });
          return parsedUrl.domain || parsedUrl.hostname;
        }
        /**
         * single object with all of our request and site data split and
         * processed into the correct format for the tracker set/get functions.
         * This avoids repeat calls to split and util functions.
         * @param {string} urlToCheck
         * @param {string} siteUrl
         * @param {RequestExpression} request
         * @returns {RequestData | null}
         */
        getRequestData(urlToCheck, siteUrl, request) {
          const siteDomain = this.getBaseDomain(siteUrl);
          const urlToCheckDomain = this.getBaseDomain(urlToCheck);
          if (!siteDomain || !urlToCheckDomain) {
            return null;
          }
          return {
            siteUrl,
            request,
            sameBaseDomain: siteDomain === urlToCheckDomain,
            siteDomain,
            siteUrlSplit: this.utils.extractHostFromURL(siteUrl).split("."),
            urlToCheck,
            urlToCheckDomain,
            urlToCheckSplit: this.utils.extractHostFromURL(urlToCheck).split(".")
          };
        }
        /**
         * @param {string} url
         * @returns {boolean}
         */
        isSpecialURL(url) {
          let urlObj;
          try {
            urlObj = new URL(url);
          } catch {
            return true;
          }
          const specialProtocols = [
            // Browser specific internal protocols
            "chrome-extension:",
            "chrome-devtools:",
            "chrome-search:",
            "chrome:",
            "edge:",
            "opera:",
            "about:",
            "moz-extension:",
            // Special web protocols
            "file:",
            "javascript:",
            "data:",
            "blob:",
            "view-source:",
            "vbscript:",
            // Safelisted protocol handler schemes (https://html.spec.whatwg.org/#safelisted-scheme)
            "bitcoin:",
            "ftp:",
            "ftps:",
            "geo:",
            "im:",
            "irc:",
            "ircs:",
            "magnet:",
            "mailto:",
            "matrix:",
            "mms:",
            "news:",
            "nntp:",
            "openpgp4fpr:",
            "sftp:",
            "sip:",
            "sms:",
            "smsto:",
            "ssh:",
            "tel:",
            "urn:",
            "webcal:",
            "wtai:",
            "xmpp:"
          ];
          if (urlObj) {
            if (specialProtocols.includes(urlObj.protocol) || // https://html.spec.whatwg.org/#web+-scheme-prefix
            urlObj.protocol.startsWith("web+") || urlObj.hostname === "localhost") {
              return true;
            }
          }
          return false;
        }
        /**
         * @param {string} urlToCheck
         * @param {string} siteUrl
         * @param {RequestExpression} request
         * @param {Set<string>} [supportedCustomRuleActions]
         *   Optional set containing supported "custom" (aka non-standard) rule
         *   actions.
         *   Note: Standard block/ignore rule actions are always supported, and do
         *         not need to be included here. Custom rule actions are only
         *         necessary for features like Click to Load that have their own
         *         special rule actions.
         *         @see {Trackers.prototype.standardRuleActions}.
         * @returns {TrackerData | null}
         */
        getTrackerData(urlToCheck, siteUrl, request, supportedCustomRuleActions) {
          if (!this.entityList || !this.trackerList) {
            throw new Error("tried to detect trackers before rules were loaded");
          }
          if (this.isSpecialURL(urlToCheck) || this.isSpecialURL(siteUrl)) {
            return null;
          }
          let fromCname;
          let requestData = this.getRequestData(urlToCheck, siteUrl, request);
          if (!requestData) {
            return null;
          }
          const sameBaseDomain = requestData.sameBaseDomain;
          let tracker = this.findTracker(requestData);
          if (!tracker) {
            const cnameResolution = this.resolveCname(urlToCheck);
            const cnameRequestData = this.getRequestData(cnameResolution.finalURL, siteUrl, request);
            if (cnameResolution.fromCname && cnameRequestData) {
              tracker = this.findTracker(cnameRequestData);
              if (tracker) {
                fromCname = cnameResolution.fromCname;
                requestData = cnameRequestData;
              }
            }
          }
          const fullTrackerDomain = requestData.urlToCheckSplit.join(".");
          const requestOwner = this.findTrackerOwner(requestData.urlToCheckDomain);
          const websiteOwner = this.findWebsiteOwner(requestData);
          const sameEntity = requestOwner && websiteOwner ? requestOwner === websiteOwner : requestData.siteDomain === requestData.urlToCheckDomain;
          if (!tracker) {
            const owner = {
              name: requestOwner || requestData.urlToCheckDomain || "unknown",
              displayName: requestOwner || requestData.urlToCheckDomain || "Unknown"
            };
            const trackerObj = {
              domain: fullTrackerDomain,
              owner,
              prevalence: 0,
              fingerprinting: 0,
              cookies: 0,
              categories: [],
              default: "none",
              rules: []
            };
            return {
              action: trackerObj.default,
              reason: "",
              sameEntity,
              sameBaseDomain,
              redirectUrl: "",
              matchedRule: null,
              matchedRuleException: false,
              tracker: trackerObj,
              fullTrackerDomain,
              fromCname
            };
          }
          const matchedRule = this.findRule(tracker, requestData, supportedCustomRuleActions);
          const redirectUrl = matchedRule && matchedRule.surrogate ? this.surrogateList[matchedRule.surrogate] : false;
          const matchedRuleException = matchedRule ? this.matchesRuleDefinition(matchedRule, "exceptions", requestData) : false;
          const { action, reason } = this.getAction({
            sameEntity,
            matchedRule,
            matchedRuleException,
            defaultAction: tracker.default,
            redirectUrl
          });
          return {
            action,
            reason,
            sameEntity,
            sameBaseDomain,
            redirectUrl,
            matchedRule,
            matchedRuleException,
            tracker,
            fullTrackerDomain,
            fromCname
          };
        }
        /**
         * Pull subdomains off of the request rule and look for a matching tracker object in our data
         * @param {{urlToCheckSplit: string[]}} urlToCheckObject
         * @returns {undefined | TrackerObj}
         */
        findTracker(urlToCheckObject) {
          if (!this.trackerList) {
            throw new Error("tried to detect trackers before rules were loaded");
          }
          const urlList = Array.from(urlToCheckObject.urlToCheckSplit);
          while (urlList.length > 1) {
            const trackerDomain = urlList.join(".");
            urlList.shift();
            const matchedTracker = this.trackerList[trackerDomain];
            if (matchedTracker) {
              return matchedTracker;
            }
          }
        }
        /**
         * @param {string} trackerDomain
         * @returns {string | undefined}
         */
        findTrackerOwner(trackerDomain) {
          return this.entityList[trackerDomain];
        }
        /**
         * Set parent and first party values on tracker
         * @param {{siteUrlSplit: string[]}} siteUrlSplitObject
         * @returns {string | undefined}
         */
        findWebsiteOwner(siteUrlSplitObject) {
          const siteUrlList = Array.from(siteUrlSplitObject.siteUrlSplit);
          while (siteUrlList.length > 1) {
            const siteToCheck = siteUrlList.join(".");
            siteUrlList.shift();
            if (this.entityList[siteToCheck]) {
              return this.entityList[siteToCheck];
            }
          }
        }
        /**
         * Returns false if the given rule has an unsupported rule action, true
         * otherwise.
         * @param {TrackerRule} ruleObj
         * @param {Set<string>} [supportedCustomRuleActions]
         * @returns {boolean}
         */
        ruleActionSupported({ action }, supportedCustomRuleActions) {
          return (
            // Rule action generally defaults to 'block' if omitted.
            !action || // Standard rule actions are always supported.
            _Trackers.standardRuleActions.has(action) || // Provided custom rule actions (if any) are also supported.
            !!supportedCustomRuleActions && supportedCustomRuleActions.has(action)
          );
        }
        /**
         * Iterate through a tracker rule list and return the first matching rule, if any.
         * @param {TrackerObj} tracker
         * @param {RequestData} requestData
         * @param {Set<string>} [supportedCustomRuleActions]
         * @returns {TrackerRule | null}
         */
        findRule(tracker, requestData, supportedCustomRuleActions) {
          let matchedRule = null;
          if (tracker.rules && tracker.rules.length) {
            tracker.rules.some((ruleObj) => {
              if (this.requestMatchesRule(requestData, ruleObj) && this.ruleActionSupported(ruleObj, supportedCustomRuleActions)) {
                matchedRule = ruleObj;
                return true;
              }
              return false;
            });
          }
          return matchedRule;
        }
        /**
         * @param {RequestData} requestData
         * @param {TrackerRule} ruleObj
         * @returns {boolean}
         */
        requestMatchesRule(requestData, ruleObj) {
          if (requestData.urlToCheck.match(ruleObj.rule)) {
            if (ruleObj.options) {
              return this.matchesRuleDefinition(ruleObj, "options", requestData);
            } else {
              return true;
            }
          } else {
            return false;
          }
        }
        /**
         * Check the matched rule options against the request data
         * @param {TrackerRule} rule
         * @param {'exceptions' | 'options'} type
         * @param {RequestData} requestData
         * @returns {boolean} true if all options matched
         */
        matchesRuleDefinition(rule, type, requestData) {
          const ruleDefinition = rule[type];
          if (!ruleDefinition) {
            return false;
          }
          const matchTypes = ruleDefinition.types && ruleDefinition.types.length ? ruleDefinition.types.includes(requestData.request.type) : true;
          const matchDomains = ruleDefinition.domains && ruleDefinition.domains.length ? ruleDefinition.domains.some((domain) => domain.match(requestData.siteDomain)) : true;
          return matchTypes && matchDomains;
        }
        /**
         * @param {{
         *     sameEntity: boolean,
         *     matchedRule: TrackerRule | null,
         *     matchedRuleException: boolean,
         *     defaultAction: ActionName | undefined,
         *     redirectUrl: string | boolean
         * }} tracker
         * @returns {{ action: ActionName, reason: string }}
         */
        getAction(tracker) {
          let action = "ignore";
          let reason = "unknown fallback";
          if (tracker.sameEntity) {
            action = "ignore";
            reason = "first party";
          } else if (tracker.matchedRuleException) {
            action = "ignore";
            reason = "matched rule - exception";
          } else if (!tracker.matchedRule && tracker.defaultAction === "ignore") {
            action = "ignore";
            reason = "default ignore";
          } else if (tracker.matchedRule && tracker.matchedRule.action === "ignore") {
            action = "ignore";
            reason = "matched rule - ignore";
          } else if (!tracker.matchedRule && tracker.defaultAction === "block") {
            action = "block";
            reason = "default block";
          } else if (tracker.matchedRule) {
            if (tracker.redirectUrl) {
              action = "redirect";
              reason = "matched rule - surrogate";
            } else {
              action = "block";
              reason = "matched rule - block";
            }
          }
          return { action, reason };
        }
      };
      module2.exports = Trackers;
    }
  });

  // packages/privacy-grade/index.js
  var require_privacy_grade = __commonJS({
    "packages/privacy-grade/index.js"(exports2, module2) {
      "use strict";
      module2.exports = {
        Grade: require_grade(),
        Trackers: require_trackers()
      };
    }
  });

  // shared/js/background/classes/tracker.js
  var tracker_exports = {};
  __export(tracker_exports, {
    Tracker: () => Tracker
  });
  var import_constants, Companies, Tracker;
  var init_tracker = __esm({
    "shared/js/background/classes/tracker.js"() {
      "use strict";
      import_constants = __toESM(require_constants());
      init_privacy_dashboard_data();
      init_tds();
      Companies = require_companies();
      Tracker = class _Tracker {
        /**
         * @param {TrackerData | null} t
         */
        constructor(t2) {
          this.urls = {};
          this.count = 0;
          if (!t2) {
            return;
          }
          if (!t2.tracker) {
            throw new Error("Tracker object required for Tracker constructor");
          }
          this.parentCompany = Companies.get(t2.tracker.owner.ownedBy || t2.tracker.owner.name);
          this.displayName = this.parentCompany?.displayName || t2.tracker.owner.displayName;
          this.prevalence = tds_default.tds.entities[t2.tracker.owner.name]?.prevalence;
        }
        /**
         * A parent company may try to track you through many different entities.
         * We store a list of all unique urls here.
         * @param {TrackerData} t
         * @param {string} tabUrl
         * @param {string} baseDomain
         * @param {string} url
         */
        addTrackerUrl(t2, tabUrl, baseDomain, url) {
          if (t2.sameBaseDomain) {
            return;
          }
          this.count += 1;
          const key = t2.fullTrackerDomain + ":" + t2.action;
          if (this.urls[key]) return;
          const state = convertState(t2.action, t2.sameEntity);
          if (!state) return;
          const category = t2.tracker?.categories?.find((trackerRadarCategory) => import_constants.default.displayCategories.includes(trackerRadarCategory));
          const detectedRequest = {
            action: t2.action,
            url,
            eTLDplus1: baseDomain,
            pageUrl: tabUrl,
            entityName: this.displayName,
            prevalence: this.prevalence,
            ownerName: this.parentCompany?.name,
            category,
            state
          };
          this.urls[key] = detectedRequest;
        }
        /**
         * @param {Tracker} data
         * @returns {Tracker}
         */
        static restore(data) {
          const tracker = new _Tracker(null);
          for (const [key, value] of Object.entries(data)) {
            tracker[key] = value;
          }
          return tracker;
        }
      };
    }
  });

  // packages/ddg2dnr/lib/rulePriorities.js
  var require_rulePriorities = __commonJS({
    "packages/ddg2dnr/lib/rulePriorities.js"(exports2) {
      "use strict";
      exports2.AD_ATTRIBUTION_POLICY_PRIORITY = 3e4;
      exports2.SERVICE_WORKER_INITIATED_ALLOWING_PRIORITY = 1e6;
      exports2.USER_ALLOWLISTED_PRIORITY = 1e6;
      exports2.ATB_PARAM_PRIORITY = 2e6;
      exports2.NEWTAB_TRACKER_STATS_REDIRECT_PRIORITY = 2e6;
    }
  });

  // packages/ddg2dnr/lib/utils.js
  var require_utils = __commonJS({
    "packages/ddg2dnr/lib/utils.js"(exports2) {
      "use strict";
      var cnameDomainAnchor = "[a-z]+://[^/?]*";
      var cnameDomainAnchorCompatibleRuleSuffix = /^(:[0-9]+)?[/?]/;
      var regularExpressionChars = /* @__PURE__ */ new Set(
        [".", "*", "+", "?", "{", "}", "[", "]", "{", "}"]
      );
      function storeInMapLookup(lookup, key, values) {
        let storedValues = lookup.get(key);
        if (!storedValues) {
          storedValues = [];
          lookup.set(key, storedValues);
        }
        for (const value of values) {
          storedValues.push(value);
        }
      }
      function storeInObjectLookup(lookup, key, values) {
        let storedValues = lookup[key];
        if (!storedValues) {
          storedValues = [];
          lookup[key] = storedValues;
        }
        for (const value of values) {
          storedValues.push(value);
        }
      }
      function storeInLookup(lookup, key, values) {
        if (lookup instanceof Map) {
          storeInMapLookup(lookup, key, values);
        } else {
          storeInObjectLookup(lookup, key, values);
        }
      }
      function generateDNRRule5({
        id,
        priority,
        actionType,
        redirect,
        requestHeaders,
        responseHeaders,
        urlFilter,
        regexFilter,
        resourceTypes: resourceTypes2,
        excludedResourceTypes,
        requestDomains,
        excludedRequestDomains,
        initiatorDomains,
        excludedInitiatorDomains,
        matchCase = false,
        tabIds,
        excludedTabIds,
        requestMethods,
        excludedRequestMethods
      }) {
        const dnrRule = {
          priority,
          action: {
            type: actionType
          },
          condition: {}
        };
        if (typeof id === "number") {
          dnrRule.id = id;
        }
        if (requestDomains && requestDomains.length > 0) {
          dnrRule.condition.requestDomains = requestDomains;
        }
        if (actionType === "redirect" && redirect) {
          dnrRule.action.redirect = redirect;
        }
        if (actionType === "modifyHeaders") {
          if (requestHeaders && requestHeaders.length > 0) {
            dnrRule.action.requestHeaders = requestHeaders;
          }
          if (responseHeaders && responseHeaders.length > 0) {
            dnrRule.action.responseHeaders = responseHeaders;
          }
        }
        if (urlFilter) {
          dnrRule.condition.urlFilter = urlFilter;
          if (urlFilter[0] === "|" && urlFilter[1] === "|") {
            delete dnrRule.condition.requestDomains;
          }
          if (!matchCase) {
            dnrRule.condition.isUrlFilterCaseSensitive = false;
          }
        } else if (regexFilter) {
          dnrRule.condition.regexFilter = regexFilter;
          if (!matchCase) {
            dnrRule.condition.isUrlFilterCaseSensitive = false;
          }
        }
        if (resourceTypes2 && resourceTypes2.length > 0) {
          dnrRule.condition.resourceTypes = resourceTypes2;
        }
        if (excludedResourceTypes && excludedResourceTypes.length > 0) {
          dnrRule.condition.excludedResourceTypes = excludedResourceTypes;
        }
        if (initiatorDomains && initiatorDomains.length > 0) {
          dnrRule.condition.initiatorDomains = initiatorDomains;
        }
        if (excludedRequestDomains && excludedRequestDomains.length > 0) {
          dnrRule.condition.excludedRequestDomains = excludedRequestDomains;
        }
        if (excludedInitiatorDomains && excludedInitiatorDomains.length > 0 && actionType !== "allow") {
          if (excludedInitiatorDomains.length === 1 && requestDomains && requestDomains.length === 1) {
            dnrRule.condition.domainType = "thirdParty";
          } else {
            dnrRule.condition.excludedInitiatorDomains = excludedInitiatorDomains;
          }
        }
        if (tabIds && tabIds.length > 0) {
          dnrRule.condition.tabIds = tabIds;
        }
        if (excludedTabIds && excludedTabIds.length > 0) {
          dnrRule.condition.excludedTabIds = excludedTabIds;
        }
        if (requestMethods && requestMethods.length > 0) {
          dnrRule.condition.requestMethods = requestMethods;
        }
        if (excludedRequestMethods && excludedRequestMethods.length > 0) {
          dnrRule.condition.excludedRequestMethods = excludedRequestMethods;
        }
        return dnrRule;
      }
      function alphaChar(charCode) {
        return charCode >= 97 && charCode <= 122 || charCode >= 65 && charCode <= 90;
      }
      function parseRegexTrackerRule(domain, trackerRule) {
        let requiresRegexFilter = false;
        let urlFilter = "";
        let afterDomainRuleIndex = -1;
        let lastAlphaIndex = -1;
        let escaped = false;
        let previousCharWasPeriod = false;
        for (let i = 0; i < trackerRule.length; i++) {
          const char = trackerRule[i];
          const charCode = char.charCodeAt(0);
          if (domain && urlFilter.length === domain.length && afterDomainRuleIndex === -1) {
            afterDomainRuleIndex = i;
          }
          if (escaped) {
            if (char === "*") {
              requiresRegexFilter = true;
              continue;
            }
            if (alphaChar(charCode)) {
              lastAlphaIndex = i;
            }
            escaped = false;
            urlFilter += char;
            continue;
          }
          if (char === "\\") {
            escaped = true;
            continue;
          }
          if (char === ".") {
            previousCharWasPeriod = true;
            continue;
          }
          if (char === "*" && previousCharWasPeriod) {
            urlFilter += "*";
            previousCharWasPeriod = false;
            continue;
          }
          if (regularExpressionChars.has(char) || previousCharWasPeriod) {
            requiresRegexFilter = true;
            continue;
          }
          if (alphaChar(charCode)) {
            lastAlphaIndex = i;
          }
          urlFilter += char;
        }
        if (previousCharWasPeriod) {
          requiresRegexFilter = true;
        }
        return {
          requiresRegexFilter,
          urlFilter,
          afterDomainRuleIndex,
          lastAlphaIndex
        };
      }
      function processRegexTrackerRule(domain, trackerRule, matchCnames) {
        if (!trackerRule) {
          return {};
        }
        let {
          requiresRegexFilter,
          urlFilter,
          afterDomainRuleIndex,
          lastAlphaIndex
        } = parseRegexTrackerRule(domain, trackerRule);
        let regexFilter = trackerRule;
        let matchCase = false;
        let usedRegexForWorkaround = false;
        if (domain && urlFilter.startsWith(domain)) {
          if (urlFilter.length === domain.length) {
            return {};
          }
          matchCase = lastAlphaIndex < afterDomainRuleIndex;
          if (urlFilter[domain.length] === "*") {
            regexFilter = regexFilter.substr(afterDomainRuleIndex + 2);
            urlFilter = urlFilter.substr(domain.length + 1);
          } else {
            if (matchCnames && afterDomainRuleIndex > -1 && cnameDomainAnchorCompatibleRuleSuffix.test(urlFilter.substr(domain.length))) {
              usedRegexForWorkaround = true;
              regexFilter = cnameDomainAnchor + trackerRule.substr(afterDomainRuleIndex);
            }
            urlFilter = "||" + urlFilter;
          }
        } else {
          matchCase = lastAlphaIndex === -1;
        }
        if (requiresRegexFilter) {
          return { regexFilter, matchCase };
        }
        if (usedRegexForWorkaround) {
          return { regexFilter, matchCase, fallbackUrlFilter: urlFilter };
        }
        return { urlFilter, matchCase };
      }
      function processPlaintextTrackerRule(domain, trackerRule) {
        let urlFilter = trackerRule;
        if (domain && urlFilter.startsWith(domain)) {
          urlFilter = "||" + urlFilter;
        }
        const matchCase = false;
        return { urlFilter, matchCase };
      }
      function getTrackerEntryDomain(trackerEntries, domain, skipSubdomains = 0) {
        let i = domain[0] === "." ? 0 : -1;
        do {
          domain = domain.substr(i + 1);
          i = domain.indexOf(".");
          if (skipSubdomains > 0) {
            skipSubdomains -= 1;
            continue;
          }
          const trackerEntry = trackerEntries[domain];
          if (trackerEntry) {
            return domain;
          }
        } while (i > -1);
        return null;
      }
      function generateRequestDomainsByTrackerDomain(tds) {
        const requestDomainsByTrackerDomain = /* @__PURE__ */ new Map();
        for (const trackerDomain of Object.keys(tds.trackers)) {
          storeInLookup(
            requestDomainsByTrackerDomain,
            trackerDomain,
            [trackerDomain]
          );
        }
        for (const [domain, cname] of Object.entries(tds.cnames)) {
          const trackerEntryDomain = getTrackerEntryDomain(tds.trackers, cname);
          if (trackerEntryDomain) {
            if (getTrackerEntryDomain(tds.trackers, domain, 1)) {
              continue;
            }
            storeInLookup(
              requestDomainsByTrackerDomain,
              trackerEntryDomain,
              [domain]
            );
          }
        }
        return requestDomainsByTrackerDomain;
      }
      var resourceTypes = /* @__PURE__ */ new Set([
        "main_frame",
        "sub_frame",
        "stylesheet",
        "script",
        "image",
        "font",
        "object",
        "xmlhttprequest",
        "ping",
        "csp_report",
        "media",
        "websocket",
        "webtransport",
        "webbundle",
        "other"
      ]);
      exports2.resourceTypes = resourceTypes;
      exports2.storeInLookup = storeInLookup;
      exports2.generateDNRRule = generateDNRRule5;
      exports2.processRegexTrackerRule = processRegexTrackerRule;
      exports2.processPlaintextTrackerRule = processPlaintextTrackerRule;
      exports2.getTrackerEntryDomain = getTrackerEntryDomain;
      exports2.generateRequestDomainsByTrackerDomain = generateRequestDomainsByTrackerDomain;
    }
  });

  // shared/js/background/classes/ad-click-attribution-policy.js
  var ad_click_attribution_policy_exports = {};
  __export(ad_click_attribution_policy_exports, {
    AdClick: () => AdClick,
    AdClickAttributionPolicy: () => AdClickAttributionPolicy,
    sendPageloadsWithAdAttributionPixelAndResetCount: () => sendPageloadsWithAdAttributionPixelAndResetCount
  });
  async function sendPageloadsWithAdAttributionPixelAndResetCount() {
    await import_settings3.default.ready();
    const count = import_settings3.default.getSetting("m_pageloads_with_ad_attribution.count");
    if (typeof count === "number" && count > 0) {
      await sendPixelRequest("m_pageloads_with_ad_attribution", {
        count
      });
    }
    import_settings3.default.updateSetting("m_pageloads_with_ad_attribution.count", 0);
  }
  var import_rulePriorities, import_utils3, import_settings3, getFeatureSettings2, getBaseDomain2, browserWrapper2, getNextSessionRuleId2, appVersion, manifestVersion, AdClickAttributionPolicy, AdClick;
  var init_ad_click_attribution_policy = __esm({
    "shared/js/background/classes/ad-click-attribution-policy.js"() {
      "use strict";
      import_rulePriorities = __toESM(require_rulePriorities());
      import_utils3 = __toESM(require_utils());
      import_settings3 = __toESM(require_settings());
      init_pixels();
      ({ getFeatureSettings: getFeatureSettings2, getBaseDomain: getBaseDomain2 } = (init_utils(), __toCommonJS(utils_exports)));
      browserWrapper2 = (init_wrapper(), __toCommonJS(wrapper_exports));
      ({ getNextSessionRuleId: getNextSessionRuleId2 } = (init_dnr_session_rule_id(), __toCommonJS(dnr_session_rule_id_exports)));
      appVersion = browserWrapper2.getExtensionVersion();
      manifestVersion = browserWrapper2.getManifestVersion();
      AdClickAttributionPolicy = class {
        constructor() {
          const policy = getFeatureSettings2("adClickAttribution");
          this.linkFormats = policy.linkFormats || [];
          this.allowlist = policy.allowlist || [];
          this.navigationExpiration = policy.navigationExpiration || 0;
          this.totalExpiration = policy.totalExpiration || 0;
          this.domainDetectionEnabled = policy.domainDetection === "enabled";
          this.heuristicDetectionEnabled = policy.heuristicDetection === "enabled";
        }
        /**
         * @param {URL} resourceURL
         * @returns {AdClickAttributionLinkFormat | undefined}
         */
        getMatchingLinkFormat(resourceURL) {
          const hostnameAndPath = resourceURL.hostname + resourceURL.pathname;
          for (const linkFormat of this.linkFormats) {
            if (hostnameAndPath === linkFormat.url) {
              if (linkFormat.adDomainParameterName) {
                const parameterDomain = resourceURL.searchParams.get(linkFormat.adDomainParameterName);
                if (parameterDomain !== null) {
                  return linkFormat;
                }
              }
            }
          }
        }
        /**
         * Constructs an AdClick object to be stored on the tab if the load is a valid ad click link format.
         * @param {string} resourcePath
         * @param {Tab} tab
         * @returns {AdClick | undefined}
         */
        createAdClick(resourcePath, tab) {
          let resourceURL;
          try {
            resourceURL = new URL(resourcePath);
          } catch {
            return;
          }
          const linkFormat = this.getMatchingLinkFormat(resourceURL);
          if (!linkFormat) return;
          const adClick = new AdClick(
            this.navigationExpiration,
            this.totalExpiration,
            this.allowlist,
            this.heuristicDetectionEnabled,
            this.domainDetectionEnabled
          );
          if (manifestVersion === 3) {
            adClick.createDNR(tab.id);
          }
          if (linkFormat.adDomainParameterName) {
            const parameterDomain = resourceURL.searchParams.get(linkFormat.adDomainParameterName);
            if (parameterDomain && this.domainDetectionEnabled) {
              const parsedParameterDomain = getBaseDomain2(parameterDomain);
              if (parsedParameterDomain) {
                adClick.setAdBaseDomain(parsedParameterDomain);
                adClick.parameterAdBaseDomain = parsedParameterDomain;
              }
            }
          }
          if (this.heuristicDetectionEnabled && !adClick.parameterAdBaseDomain) {
            adClick.adClickRedirect = true;
          }
          return adClick;
        }
        /**
         * @param {string} resourcePath
         * @returns {boolean}
         */
        resourcePermitted(resourcePath) {
          let resourceURL;
          try {
            resourceURL = new URL(resourcePath);
          } catch {
            return true;
          }
          for (const allowlistItem of this.allowlist) {
            if (resourceURL.hostname === allowlistItem.host || resourceURL.hostname.endsWith("." + allowlistItem.host)) {
              return true;
            }
          }
          return false;
        }
      };
      AdClick = class _AdClick {
        /**
         * @param {number} navigationExpiration in seconds
         * @param {number} totalExpiration in seconds
         * @param {any} allowlist
         * @param {boolean} heuristicDetectionEnabled
         * @param {boolean} domainDetectionEnabled
         */
        constructor(navigationExpiration, totalExpiration, allowlist, heuristicDetectionEnabled, domainDetectionEnabled) {
          this.adBaseDomain = null;
          this.parameterAdBaseDomain = null;
          this.adClickRedirect = false;
          this.navigationExpiration = navigationExpiration;
          this.totalExpiration = totalExpiration;
          this.expires = Date.now() + this.totalExpiration * 1e3;
          this.clickExpires = Date.now() + this.navigationExpiration * 1e3;
          this.allowlist = allowlist;
          this.adClickDNR = null;
          this.heuristicDetectionEnabled = heuristicDetectionEnabled;
          this.domainDetectionEnabled = domainDetectionEnabled;
          this.adClickDetectedPixelSent = false;
          this.adClickActivePixelSent = false;
        }
        clone() {
          const adClick = new _AdClick(
            this.navigationExpiration,
            this.totalExpiration,
            this.allowlist,
            this.heuristicDetectionEnabled,
            this.domainDetectionEnabled
          );
          adClick.adBaseDomain = this.adBaseDomain;
          adClick.parameterAdBaseDomain = this.parameterAdBaseDomain;
          adClick.adClickRedirect = this.adClickRedirect;
          adClick.expires = this.expires;
          adClick.clickExpires = Date.now() + this.navigationExpiration * 1e3;
          adClick.adClickDNR = this.adClickDNR;
          adClick.adClickDetectedPixelSent = this.adClickDetectedPixelSent;
          adClick.adClickActivePixelSent = this.adClickActivePixelSent;
          return adClick;
        }
        /**
         * Propagate an adclick to a new tab, used when a user navigates to a new tab.
         * @param {number} tabId
         * @returns {AdClick} adClick
         */
        propagate(tabId) {
          const adClick = this.clone();
          if (this.adClickDNR) {
            this.createDNR(tabId);
          }
          return adClick;
        }
        static restore(adClick) {
          const restoredAdClick = new _AdClick(
            adClick.navigationExpiration,
            adClick.totalExpiration,
            adClick.allowlist,
            adClick.heuristicDetectionEnabled,
            adClick.domainDetectionEnabled
          );
          restoredAdClick.adBaseDomain = adClick.adBaseDomain;
          restoredAdClick.parameterAdBaseDomain = adClick.parameterAdBaseDomain;
          restoredAdClick.adClickRedirect = adClick.adClickRedirect;
          restoredAdClick.expires = adClick.expires;
          restoredAdClick.clickExpires = adClick.clickExpires;
          restoredAdClick.adClickDNR = adClick.adClickDNR;
          restoredAdClick.adClickDetectedPixelSent = adClick.adClickDetectedPixelSent;
          restoredAdClick.adClickActivePixelSent = adClick.adClickActivePixelSent;
          return restoredAdClick;
        }
        /**
         * @param {string} domain
         **/
        setAdBaseDomain(domain) {
          this.adBaseDomain = domain;
          this.adClickRedirect = false;
          if (this.adClickDNR) {
            this.updateDNRInitiator(domain);
          }
        }
        /**
         * Send this AdClick's 'm_ad_click_detected' pixel request, if it hasn't
         * been sent already.
         * @param {string?} heuristicAdBaseDomain
         */
        sendAdClickDetectedPixel(heuristicAdBaseDomain) {
          if (this.adClickDetectedPixelSent) {
            return;
          }
          if (!this.heuristicDetectionEnabled && heuristicAdBaseDomain) {
            heuristicAdBaseDomain = null;
          }
          let domainDetection = "none";
          if (this.parameterAdBaseDomain && heuristicAdBaseDomain) {
            if (this.parameterAdBaseDomain === heuristicAdBaseDomain) {
              domainDetection = "matched";
            } else {
              domainDetection = "mismatch";
            }
          } else if (this.parameterAdBaseDomain) {
            domainDetection = "serp_only";
          } else if (heuristicAdBaseDomain) {
            domainDetection = "heuristic_only";
          }
          sendPixelRequest("m_ad_click_detected", {
            appVersion,
            domainDetection,
            heuristicDetectionEnabled: this.heuristicDetectionEnabled ? "1" : "0",
            domainDetectionEnabled: this.domainDetectionEnabled ? "1" : 0
          });
          this.adClickDetectedPixelSent = true;
        }
        /**
         * @param {Tab} tab
         * @returns {boolean} true if a new tab should have the ad attribution policy applied
         */
        shouldPropagateAdClickForNewTab(tab) {
          if (tab.site.baseDomain === this.adBaseDomain) {
            return this.hasNotExpired();
          }
          return false;
        }
        /**
         * @param {Tab} tab
         * @returns {boolean} true if a new navigation should have the ad attribution policy applied
         */
        shouldPropagateAdClickForNavigation(tab) {
          if (tab.site.baseDomain !== this.adBaseDomain) {
            return this.clickExpires > Date.now();
          }
          return this.hasNotExpired();
        }
        hasNotExpired() {
          if (this.expires > Date.now()) {
            return true;
          } else {
            this.removeDNR();
            return false;
          }
        }
        /**
         * Check if this AdClick is active for the tab and currently allowing
         * requests. Returns true if it hasn't expired and the ad domain matches the
         * tab domain.
         * @param {Tab} tab
         * @returns {boolean}
         */
        allowAdAttribution(tab) {
          return tab.site.baseDomain === this.adBaseDomain && this.hasNotExpired();
        }
        /**
         * Called when a request has been allowed by the AdClickAttributionPolicy
         * (only happens when this AdClick is active for the tab). Takes care of
         * some housekeeping for the ad_attribution pixels.
         * @param {Tab} tab
         */
        requestWasAllowed(tab) {
          if (!tab.firstAdAttributionAllowed) {
            import_settings3.default.incrementNumericSetting("m_pageloads_with_ad_attribution.count");
            tab.firstAdAttributionAllowed = true;
          }
          if (!this.adClickActivePixelSent) {
            sendPixelRequest("m_ad_click_active", { appVersion });
            this.adClickActivePixelSent = true;
          }
        }
        getAdClickDNR(tabId) {
          const adClickDNR = {
            rule: (0, import_utils3.generateDNRRule)({
              id: null,
              priority: import_rulePriorities.AD_ATTRIBUTION_POLICY_PRIORITY,
              actionType: "allow",
              requestDomains: this.allowlist.map((entry) => entry.host)
            })
          };
          adClickDNR.rule.condition.tabIds = [tabId];
          return adClickDNR;
        }
        updateDNRInitiator(domain) {
          if (this.adClickDNR && domain) {
            this.adClickDNR.rule.condition.initiatorDomains = [domain];
            this.updateDNR();
          }
        }
        createDNR(tabId) {
          this.adClickDNR = this.getAdClickDNR(tabId);
          this.adClickDNR.rule.id = getNextSessionRuleId2();
          chrome.declarativeNetRequest.updateSessionRules({ addRules: [this.adClickDNR.rule] });
        }
        updateDNR() {
          if (this.adClickDNR) {
            chrome.declarativeNetRequest.updateSessionRules({
              removeRuleIds: [this.adClickDNR.rule.id],
              addRules: [this.adClickDNR.rule]
            });
          }
        }
        removeDNR() {
          if (this.adClickDNR) {
            chrome.declarativeNetRequest.updateSessionRules({ removeRuleIds: [this.adClickDNR.rule.id] });
          }
        }
      };
    }
  });

  // shared/js/background/classes/tab-state.js
  var tab_state_exports = {};
  __export(tab_state_exports, {
    TabState: () => TabState
  });
  var TabState, StorageInstance, Storage;
  var init_tab_state = __esm({
    "shared/js/background/classes/tab-state.js"() {
      "use strict";
      init_wrapper();
      init_i18n();
      init_tracker();
      init_ad_click_attribution_policy();
      TabState = class _TabState {
        /**
         * @param {import('./tab').TabData} tabData
         */
        constructor(tabData, restoring = false) {
          this.tabId = tabData.tabId;
          this.url = tabData.url;
          this.upgradedHttps = false;
          this.hasHttpsError = false;
          this.mainFrameUpgraded = false;
          this.urlParametersRemoved = false;
          this.urlParametersRemovedUrl = null;
          this.ampUrl = null;
          this.cleanAmpUrl = null;
          this.requestId = tabData.requestId;
          this.status = tabData.status;
          this.statusCode = null;
          this.adClick = null;
          this.firstAdAttributionAllowed = false;
          this.trackers = {};
          this.referrer = null;
          this.disabledClickToLoadRuleActions = [];
          this.dnrRuleIdsByDisabledClickToLoadRuleAction = {};
          this.ctlYouTube = false;
          this.ctlFacebookPlaceholderShown = false;
          this.ctlFacebookLogin = false;
          this.allowlisted = false;
          this.allowlistOptIn = false;
          this.denylisted = false;
          this.debugFlags = [];
          this.errorDescriptions = [];
          this.httpErrorCodes = [];
          this.performanceWarning = false;
          this.userRefreshCount = 0;
          this.openerContext = null;
          this.jsPerformance = [];
          this.locale = getFullUserLocale();
          if (!restoring) {
            Storage.backup(this);
          }
        }
        static async done() {
          await Storage.done();
        }
        /**
         * @template {InstanceType<typeof TabState>} T
         * @template {keyof T} K
         * @param {K} key
         * @param {T[K]} value
         */
        setValue(key, value) {
          this[key] = value;
          Storage.backup(this);
        }
        /**
         * Restores a tab state from storage.
         * @param {number} tabId
         * @returns {Promise<TabState | null>}
         */
        static async restore(tabId) {
          const data = await Storage.get(tabId);
          if (!data) {
            return null;
          }
          let parsedData;
          try {
            parsedData = JSON.parse(data);
          } catch (e) {
            console.error("Error parsing tab state", e);
            return null;
          }
          const state = new _TabState(parsedData, true);
          for (const [key, value] of Object.entries(parsedData)) {
            if (key === "trackers") {
              const trackers3 = {};
              for (const trackerKey of Object.keys(value)) {
                const tracker = parsedData[key][trackerKey];
                trackers3[trackerKey] = Tracker.restore(tracker);
              }
              state[key] = trackers3;
            } else if (key === "adClick" && value) {
              state[key] = AdClick.restore(value);
            } else {
              state[key] = value;
            }
          }
          await Storage.backup(state);
          return state;
        }
        /**
         * Used for removing the stored tab state.
         * @param {number} tabId
         */
        static async delete(tabId) {
          await Storage.delete(tabId);
        }
      };
      StorageInstance = class _StorageInstance {
        taskQueue = [];
        processing = false;
        /**
         * Awaits until the storage queue is empty.
         * @returns {Promise<void>}
         */
        async done() {
          const queue = this.taskQueue;
          await Promise.all(queue);
        }
        /**
         * Adds a task to the storage queue, prevents tasks from being executed in parallel.
         * Returns the result of the task.
         * Please handle the error handling of the task method yourself.
         * @template T
         * @param {() => Promise<T>} task
         * @returns {Promise<T>}
         */
        async _addTask(task) {
          let done = (_) => {
          };
          this.taskQueue.push(async () => {
            const value = await Promise.resolve(task());
            done(value);
          });
          this.processQueue();
          return new Promise((resolve) => {
            done = resolve;
          });
        }
        /**
         * Processes the storage queue in order.
         */
        async processQueue() {
          if (!this.processing) {
            while (this.taskQueue.length > 0) {
              this.processing = true;
              const task = this.taskQueue.shift();
              await task();
            }
            this.processing = false;
          }
        }
        /**
         * Returns a string key for the storage lookup of a tab.
         * @param {number} tabId
         * @returns {string}
         */
        static _getStorageKey(tabId) {
          return `tabState-${tabId}`;
        }
        /**
         * Deletes a tab-state from session storage.
         * @param {number} tabId
         */
        async delete(tabId) {
          await this._addTask(async () => {
            try {
              await removeFromSessionStorage(_StorageInstance._getStorageKey(tabId));
            } catch (e) {
              console.error("Removal of tab state failed", e);
            }
          });
        }
        /**
         * Gets a serialized tab-state from session storage.
         * @param {number} tabId
         * @returns {Promise<string | undefined>}
         */
        async get(tabId) {
          return this._addTask(async () => {
            try {
              return getFromSessionStorage(_StorageInstance._getStorageKey(tabId));
            } catch (e) {
              console.error("Retrieval of tab state failed", e);
              return void 0;
            }
          });
        }
        /**
         * @param {TabState} tabState
         * @returns {Promise<void>}
         */
        async backup(tabState) {
          await this._addTask(async () => {
            try {
              await setToSessionStorage(_StorageInstance._getStorageKey(tabState.tabId), JSON.stringify(tabState));
            } catch (e) {
              console.error("Storage of tab state failed", e);
            }
          });
        }
      };
      Storage = new StorageInstance();
    }
  });

  // shared/js/background/classes/site.js
  var site_exports = {};
  __export(site_exports, {
    default: () => Site
  });
  var import_tldts2, settings6, utils, tdsStorage, privacyPractices, Grade, browserWrapper3, TabState2, Site;
  var init_site = __esm({
    "shared/js/background/classes/site.js"() {
      "use strict";
      import_tldts2 = __toESM(require_cjs());
      settings6 = require_settings();
      utils = (init_utils(), __toCommonJS(utils_exports));
      tdsStorage = (init_tds(), __toCommonJS(tds_exports)).default;
      privacyPractices = require_privacy_practices();
      Grade = require_privacy_grade().Grade;
      browserWrapper3 = (init_wrapper(), __toCommonJS(wrapper_exports));
      ({ TabState: TabState2 } = (init_tab_state(), __toCommonJS(tab_state_exports)));
      Site = class {
        constructor(url, tabState) {
          if (!tabState) {
            tabState = new TabState2({ tabId: 1, url, status: "complete" });
          }
          this.url = url || "";
          this._tabState = tabState;
          this.trackerUrls = [];
          this.grade = new Grade();
          this.setListStatusFromGlobal();
          this.didIncrementCompaniesData = false;
          this.tosdr = privacyPractices.getTosdr(this.domain);
          if (this.parentEntity && this.parentPrevalence) {
            this.grade.setParentEntity(this.parentEntity, this.parentPrevalence);
          }
          if ("parent" in globalThis) {
            this.grade.setPrivacyScore(privacyPractices.getTosdrScore(this.domain, parent));
          }
          if (this.url.match(/^https:\/\//)) {
            this.grade.setHttps(true, true);
          }
          this.specialDomainName = this.getSpecialDomain();
        }
        get allowlisted() {
          return this._tabState.allowlisted;
        }
        set allowlisted(value) {
          this._tabState.setValue("allowlisted", value);
        }
        get allowlistOptIn() {
          return this._tabState.allowlistOptIn;
        }
        set allowlistOptIn(value) {
          this._tabState.setValue("allowlistOptIn", value);
        }
        get denylisted() {
          return this._tabState.denylisted;
        }
        set denylisted(value) {
          this._tabState.setValue("denylisted", value);
        }
        /**
         * Broken site reporting relies on the www. prefix being present as a.com matches *.a.com
         * This would make the list apply to a much larger audience than is required.
         * The other allowlisting code is different and probably should be changed to match.
         */
        get isBroken() {
          return utils.isBroken(this.domainWWW);
        }
        get enabledFeatures() {
          if (this.specialDomainName && this.specialDomainName !== "new tab") {
            return [];
          }
          return utils.getEnabledFeatures(this.domainWWW);
        }
        get domain() {
          const domain = utils.extractHostFromURL(this.url) || "";
          return domain.toLowerCase();
        }
        get domainWWW() {
          const domainWWW = utils.extractHostFromURL(this.url, true) || "";
          return domainWWW.toLowerCase();
        }
        get protocol() {
          return this.url.substr(0, this.url.indexOf(":"));
        }
        get baseDomain() {
          return utils.getBaseDomain(this.url);
        }
        get parentEntity() {
          return utils.findParent(this.domain) || "";
        }
        get parentPrevalence() {
          const parent2 = tdsStorage.tds.entities[this.parentEntity];
          return parent2 ? parent2.prevalence : 0;
        }
        /*
         * When site objects are created we check the stored lists
         * and set the new site list statuses
         */
        setListStatusFromGlobal() {
          const globalLists = ["allowlisted", "allowlistOptIn", "denylisted"];
          globalLists.forEach((name) => {
            const list = settings6.getSetting(name) || {};
            this.setListValue(name, list[this.domain] || false);
          });
        }
        /**
         * @param {allowlistName} listName
         * @param {boolean} value
         */
        setListValue(listName, value) {
          if (value === true || value === false) {
            this[listName] = value;
          }
        }
        isContentBlockingEnabled() {
          return this.isFeatureEnabled("contentBlocking");
        }
        isProtectionEnabled() {
          if (this.denylisted) {
            return true;
          }
          return !(this.allowlisted || this.isBroken);
        }
        /**
         * Checks different toggles we have in the application:
         * - User toggle off
         * - Remotely disable it
         *      - tempAllowlist
         *      - "status" check
         *      - "exceptions" check
         * - User toggle on
         */
        isFeatureEnabled(featureName) {
          const allowlistOnlyFeatures = ["autofill", "adClickAttribution"];
          if (allowlistOnlyFeatures.includes(featureName)) {
            return this.enabledFeatures.includes(featureName);
          }
          if (this.denylisted) {
            return true;
          }
          return this.isProtectionEnabled() && this.enabledFeatures.includes(featureName);
        }
        /**
         * @param {import("../../../../node_modules/@duckduckgo/privacy-grade/src/classes/trackers").TrackerData} t
         */
        addTracker(t2) {
          if (t2.action === "ignore" && !t2.sameEntity) {
            return;
          }
          if (t2.tracker && this.trackerUrls.indexOf(t2.tracker.domain) === -1) {
            this.trackerUrls.push(t2.tracker.domain);
            const entityPrevalence = tdsStorage.tds.entities[t2.tracker.owner.name]?.prevalence;
            if (t2.action) {
              if (["block", "redirect", "ignore-user"].includes(t2.action)) {
                this.grade.addEntityBlocked(t2.tracker.owner.name, entityPrevalence);
              } else if (t2.action === "ignore") {
                this.grade.addEntityNotBlocked(t2.tracker.owner.name, entityPrevalence);
              }
            }
          }
        }
        /*
         * specialDomain
         *
         * determine if domain is a special page
         *
         * returns: a useable special page description string.
         *          or null if not a special page.
         */
        getSpecialDomain() {
          const extensionId = browserWrapper3.getExtensionId();
          const localhostName = "localhost";
          const { protocol, url, domain } = this;
          const { publicSuffix } = (0, import_tldts2.parse)(this.url);
          if (url === "") {
            return "new tab";
          }
          if (domain === localhostName || domain.match(/^127\.0\.0\.1/) || publicSuffix === localhostName) {
            return localhostName;
          }
          if (domain.match(/^0\.0\.0\.0/)) {
            return domain;
          }
          if (protocol === "about" || protocol === "chrome" || protocol === "chrome-search" || protocol === "vivaldi") {
            if (domain === "newtab" || domain === "local-ntp") {
              return "new tab";
            }
            return domain;
          }
          if (protocol === "file") {
            return "local file";
          }
          if (protocol === "chrome-extension" || protocol === "moz-extension") {
            if (domain === extensionId) {
              const matches = url.match(/^(?:chrome|moz)-extension:\/\/[^/]+\/html\/([a-z-]+).html/);
              if (matches && matches[1]) {
                return matches[1];
              }
            }
            return "extension page";
          }
          if (url.startsWith("https://duckduckgo.com/chrome_newtab")) {
            return "new tab";
          }
          return null;
        }
      };
    }
  });

  // packages/ddg2dnr/lib/smarterEncryption.js
  var require_smarterEncryption = __commonJS({
    "packages/ddg2dnr/lib/smarterEncryption.js"(exports2) {
      "use strict";
      var { storeInLookup } = require_utils();
      var SMARTER_ENCRYPTION_PRIORITY = 5e3;
      function generateRegexFilter(subdomainCount, matchWwwSubdomain) {
        return "^http://" + (matchWwwSubdomain ? "(www\\.)?" : "") + Array(subdomainCount).fill("[^.]+").join("\\.") + "(:|/|$)";
      }
      function generateRule(id, subdomainCount, domains, matchWwwSubdomain) {
        return {
          id,
          priority: SMARTER_ENCRYPTION_PRIORITY,
          action: {
            type: "upgradeScheme"
          },
          condition: {
            resourceTypes: [
              "main_frame",
              "sub_frame",
              "stylesheet",
              "script",
              "image",
              "font",
              "object",
              "xmlhttprequest",
              "ping",
              "csp_report",
              "media",
              "websocket",
              "webtransport",
              "webbundle",
              "other"
            ],
            requestDomains: domains,
            regexFilter: generateRegexFilter(subdomainCount, matchWwwSubdomain)
          }
        };
      }
      function generateSmarterEncryptionRuleset(domains, startingRuleId = 1) {
        const domainsBySubdomainCount = /* @__PURE__ */ new Map();
        const domainsWithOptionalWwwBySubdomainCount = /* @__PURE__ */ new Map();
        const domainsToMatchWithWwwPrefix = /* @__PURE__ */ new Set();
        const nonWwwDomains = [];
        for (const domain of domains) {
          if (domain.startsWith("www.")) {
            domainsToMatchWithWwwPrefix.add(domain.substr(4));
          } else {
            nonWwwDomains.push(domain);
          }
        }
        for (const domain of nonWwwDomains) {
          if (domainsToMatchWithWwwPrefix.has(domain)) {
            domainsToMatchWithWwwPrefix.delete(domain);
            storeInLookup(
              domainsWithOptionalWwwBySubdomainCount,
              domain.split(".").length,
              [domain]
            );
          } else {
            storeInLookup(
              domainsBySubdomainCount,
              domain.split(".").length,
              [domain]
            );
          }
        }
        for (const domain of domainsToMatchWithWwwPrefix) {
          storeInLookup(
            domainsBySubdomainCount,
            domain.split(".").length + 1,
            ["www." + domain]
          );
        }
        let id = startingRuleId;
        const rules = [];
        for (const [subdomainCount, domainGroup] of domainsBySubdomainCount) {
          if (domainGroup.length < 1) {
            continue;
          }
          rules.push(generateRule(id++, subdomainCount, domainGroup, false));
        }
        for (const [subdomainCount, domainGroup] of domainsWithOptionalWwwBySubdomainCount) {
          if (domainGroup.length < 1) {
            continue;
          }
          rules.push(generateRule(id++, subdomainCount, domainGroup, true));
        }
        return rules;
      }
      function createSmarterEncryptionTemporaryRule2(domains, type = "allow", id) {
        if (["allow", "upgrade"].indexOf(type) === -1) {
          throw new Error(`createSmarterEncryptionTemporaryRule type ${type} is not valid`);
        }
        const actionType = type === "allow" ? "allow" : "upgradeScheme";
        const detailsType = type === "allow" ? "httpsAllowlist" : "sessionUpgrades";
        return {
          rule: {
            id,
            priority: SMARTER_ENCRYPTION_PRIORITY,
            action: {
              type: actionType
            },
            condition: {
              requestDomains: domains,
              resourceTypes: [
                "main_frame",
                "sub_frame",
                "stylesheet",
                "script",
                "image",
                "font",
                "object",
                "xmlhttprequest",
                "ping",
                "csp_report",
                "media",
                "websocket",
                "webtransport",
                "webbundle",
                "other"
              ]
            }
          },
          matchDetails: {
            type: detailsType,
            possibleTrackerDomains: domains
          }
        };
      }
      exports2.SMARTER_ENCRYPTION_PRIORITY = SMARTER_ENCRYPTION_PRIORITY;
      exports2.generateSmarterEncryptionRuleset = generateSmarterEncryptionRuleset;
      exports2.createSmarterEncryptionTemporaryRule = createSmarterEncryptionTemporaryRule2;
    }
  });

  // shared/js/background/dnr-utils.js
  async function findExistingRule(isSessionRule = false, desiredRuleId) {
    const rules = await chrome.declarativeNetRequest[isSessionRule ? "getSessionRules" : "getDynamicRules"]();
    return rules.find((r) => r.id === desiredRuleId);
  }
  var import_settings4, USER_ALLOWLIST_RULE_ID, SERVICE_WORKER_INITIATED_ALLOWING_RULE_ID, HTTPS_SESSION_ALLOWLIST_RULE_ID, HTTPS_SESSION_UPGRADE_RULE_ID, GPC_HEADER_RULE_ID, SETTING_PREFIX, ruleIdRangeByConfigName, findExistingDynamicRule, findExistingSessionRule;
  var init_dnr_utils = __esm({
    "shared/js/background/dnr-utils.js"() {
      "use strict";
      import_settings4 = __toESM(require_settings());
      USER_ALLOWLIST_RULE_ID = 20001;
      SERVICE_WORKER_INITIATED_ALLOWING_RULE_ID = 20002;
      HTTPS_SESSION_ALLOWLIST_RULE_ID = 20004;
      HTTPS_SESSION_UPGRADE_RULE_ID = 20005;
      GPC_HEADER_RULE_ID = 20007;
      SETTING_PREFIX = "declarative_net_request-";
      ruleIdRangeByConfigName = {
        tds: [1, 1e4],
        config: [10001, 2e4],
        _RESERVED: [20001, 21e3],
        combined: [21001, 31e3]
      };
      findExistingDynamicRule = findExistingRule.bind(null, false);
      findExistingSessionRule = findExistingRule.bind(null, true);
    }
  });

  // shared/js/background/dnr-smarter-encryption.js
  var dnr_smarter_encryption_exports = {};
  __export(dnr_smarter_encryption_exports, {
    addSmarterEncryptionSessionException: () => addSmarterEncryptionSessionException,
    addSmarterEncryptionSessionRule: () => addSmarterEncryptionSessionRule
  });
  async function updateSmarterEncryptionSessionRule(ruleId, addDomain, type) {
    const existingRule = await findExistingSessionRule(ruleId);
    const ruleDomains = existingRule?.condition.requestDomains || [];
    if (ruleDomains.includes(addDomain)) {
      return;
    }
    ruleDomains.push(addDomain);
    const { rule } = (0, import_smarterEncryption.createSmarterEncryptionTemporaryRule)(ruleDomains, type, ruleId);
    await chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds: [ruleId],
      addRules: [rule]
    });
  }
  async function addSmarterEncryptionSessionException(domain) {
    return updateSmarterEncryptionSessionRule(HTTPS_SESSION_ALLOWLIST_RULE_ID, domain, "allow");
  }
  async function addSmarterEncryptionSessionRule(domain) {
    return updateSmarterEncryptionSessionRule(HTTPS_SESSION_UPGRADE_RULE_ID, domain, "upgrade");
  }
  var import_smarterEncryption;
  var init_dnr_smarter_encryption = __esm({
    "shared/js/background/dnr-smarter-encryption.js"() {
      "use strict";
      import_smarterEncryption = __toESM(require_smarterEncryption());
      init_dnr_utils();
    }
  });

  // shared/js/background/classes/https-redirects.js
  var require_https_redirects = __commonJS({
    "shared/js/background/classes/https-redirects.js"(exports2, module2) {
      "use strict";
      var utils4 = (init_utils(), __toCommonJS(utils_exports));
      var browserWrapper5 = (init_wrapper(), __toCommonJS(wrapper_exports));
      var { addSmarterEncryptionSessionException: addSmarterEncryptionSessionException2 } = (init_dnr_smarter_encryption(), __toCommonJS(dnr_smarter_encryption_exports));
      var MAINFRAME_RESET_MS = 3e3;
      var REQUEST_REDIRECT_LIMIT = 7;
      var manifestVersion2 = browserWrapper5.getManifestVersion();
      var HttpsRedirects = class {
        constructor() {
          this.failedUpgradeHosts = {};
          this.redirectCounts = {};
          this.mainFrameRedirect = null;
          this.clearMainFrameTimeout = null;
        }
        registerRedirect(request) {
          if (request.type === "main_frame") {
            if (this.mainFrameRedirect && request.url === this.mainFrameRedirect.url) {
              this.mainFrameRedirect.count += 1;
              return;
            }
            this.mainFrameRedirect = {
              url: request.url,
              time: Date.now(),
              count: 0
            };
            clearTimeout(this.clearMainFrameTimeout);
            this.clearMainFrameTimeout = setTimeout(this.resetMainFrameRedirect, MAINFRAME_RESET_MS);
          } else {
            this.redirectCounts[request.requestId] = this.redirectCounts[request.requestId] || 0;
            this.redirectCounts[request.requestId] += 1;
          }
        }
        canRedirect(request) {
          let canRedirect = true;
          const hostname = utils4.extractHostFromURL(request.url, true);
          if (this.failedUpgradeHosts[hostname]) {
            console.log(`HTTPS: not upgrading ${request.url}, hostname previously failed: ${hostname}`);
            return false;
          }
          if (request.type === "main_frame") {
            if (this.mainFrameRedirect && this.mainFrameRedirect.url === request.url) {
              const timeSinceFirstHit = Date.now() - this.mainFrameRedirect.time;
              if (timeSinceFirstHit < MAINFRAME_RESET_MS && this.mainFrameRedirect.count >= REQUEST_REDIRECT_LIMIT) {
                canRedirect = false;
              }
            }
          } else if (this.redirectCounts[request.requestId]) {
            canRedirect = this.redirectCounts[request.requestId] < REQUEST_REDIRECT_LIMIT;
          }
          if (!canRedirect) {
            this.failedUpgradeHosts[hostname] = true;
            console.log(`HTTPS: not upgrading, redirect loop protection kicked in for url: ${request.url}`);
            if (manifestVersion2 === 3) {
              addSmarterEncryptionSessionException2(hostname);
            }
          }
          return canRedirect;
        }
        /**
         * We regenerate tab objects every time a new main_frame request is made.
         *
         * persistMainFrameRedirect() is used whenever a tab object is regenerated,
         * so we can maintain redirect loop protection across multiple main_frame requests
         */
        persistMainFrameRedirect(redirectData) {
          if (!redirectData) {
            return;
          }
          this.mainFrameRedirect = Object.assign({}, redirectData);
          this.clearMainFrameTimeout = setTimeout(this.resetMainFrameRedirect, MAINFRAME_RESET_MS);
        }
        getMainFrameRedirect() {
          return this.mainFrameRedirect;
        }
        resetMainFrameRedirect() {
          clearTimeout(this.clearMainFrameTimeout);
          this.mainFrameRedirect = null;
        }
      };
      module2.exports = HttpsRedirects;
    }
  });

  // shared/js/background/classes/tab.js
  var require_tab = __commonJS({
    "shared/js/background/classes/tab.js"(exports2, module2) {
      "use strict";
      var Site2 = (init_site(), __toCommonJS(site_exports)).default;
      var { Tracker: Tracker2 } = (init_tracker(), __toCommonJS(tracker_exports));
      var HttpsRedirects = require_https_redirects();
      var Companies3 = require_companies();
      var webResourceKeyRegex = /.*\?key=(.*)/;
      var { AdClickAttributionPolicy: AdClickAttributionPolicy2 } = (init_ad_click_attribution_policy(), __toCommonJS(ad_click_attribution_policy_exports));
      var { TabState: TabState3 } = (init_tab_state(), __toCommonJS(tab_state_exports));
      var Tab = class _Tab {
        /**
         * @param {TabData|TabState} tabData
         */
        constructor(tabData) {
          if (tabData instanceof TabState3) {
            this._tabState = tabData;
          } else {
            this._tabState = new TabState3(tabData);
          }
          this.site = new Site2(this.url, this._tabState);
          this.httpsRedirects = new HttpsRedirects();
          this.webResourceAccess = [];
          this.surrogates = {};
        }
        /**
         * @param {number} tabId
         */
        static async restore(tabId) {
          const state = await TabState3.restore(tabId);
          if (!state) {
            return null;
          }
          return new _Tab(state);
        }
        set referrer(value) {
          this._tabState.setValue("referrer", value);
        }
        get referrer() {
          return this._tabState.referrer;
        }
        set adClick(value) {
          this._tabState.setValue("adClick", value);
        }
        get adClick() {
          return this._tabState.adClick;
        }
        set firstAdAttributionAllowed(value) {
          this._tabState.setValue("firstAdAttributionAllowed", value);
        }
        get firstAdAttributionAllowed() {
          return this._tabState.firstAdAttributionAllowed;
        }
        set disabledClickToLoadRuleActions(value) {
          this._tabState.setValue("disabledClickToLoadRuleActions", value);
        }
        get disabledClickToLoadRuleActions() {
          return this._tabState.disabledClickToLoadRuleActions;
        }
        set dnrRuleIdsByDisabledClickToLoadRuleAction(value) {
          this._tabState.setValue("dnrRuleIdsByDisabledClickToLoadRuleAction", value);
        }
        get dnrRuleIdsByDisabledClickToLoadRuleAction() {
          return this._tabState.dnrRuleIdsByDisabledClickToLoadRuleAction;
        }
        set trackers(value) {
          this._tabState.setValue("trackers", value);
        }
        get trackers() {
          return this._tabState.trackers;
        }
        get url() {
          return this._tabState.url;
        }
        set url(url) {
          this._tabState.setValue("url", url);
        }
        get id() {
          return this._tabState.tabId;
        }
        set id(tabId) {
          this._tabState.setValue("tabId", tabId);
        }
        get upgradedHttps() {
          return this._tabState.upgradedHttps;
        }
        set upgradedHttps(value) {
          this._tabState.setValue("upgradedHttps", value);
        }
        get hasHttpsError() {
          return this._tabState.hasHttpsError;
        }
        set hasHttpsError(value) {
          this._tabState.setValue("hasHttpsError", value);
        }
        get mainFrameUpgraded() {
          return this._tabState.mainFrameUpgraded;
        }
        set mainFrameUpgraded(value) {
          this._tabState.setValue("mainFrameUpgraded", value);
        }
        get urlParametersRemoved() {
          return this._tabState.urlParametersRemoved;
        }
        set urlParametersRemoved(value) {
          this._tabState.setValue("urlParametersRemoved", value);
        }
        get urlParametersRemovedUrl() {
          return this._tabState.urlParametersRemovedUrl;
        }
        set urlParametersRemovedUrl(value) {
          this._tabState.setValue("urlParametersRemovedUrl", value);
        }
        get ampUrl() {
          return this._tabState.ampUrl;
        }
        set ampUrl(url) {
          this._tabState.setValue("ampUrl", url);
        }
        get cleanAmpUrl() {
          return this._tabState.cleanAmpUrl;
        }
        get requestId() {
          return this._tabState.requestId;
        }
        set cleanAmpUrl(url) {
          this._tabState.setValue("cleanAmpUrl", url);
        }
        get status() {
          return this._tabState.status;
        }
        set status(value) {
          this._tabState.setValue("status", value);
        }
        get statusCode() {
          return this._tabState.statusCode;
        }
        set statusCode(value) {
          this._tabState.setValue("statusCode", value);
        }
        get ctlYouTube() {
          return this._tabState.ctlYouTube;
        }
        set ctlYouTube(value) {
          this._tabState.setValue("ctlYouTube", value);
        }
        get ctlFacebookPlaceholderShown() {
          return this._tabState.ctlFacebookPlaceholderShown;
        }
        set ctlFacebookPlaceholderShown(value) {
          this._tabState.setValue("ctlFacebookPlaceholderShown", value);
        }
        get ctlFacebookLogin() {
          return this._tabState.ctlFacebookLogin;
        }
        set ctlFacebookLogin(value) {
          this._tabState.setValue("ctlFacebookLogin", value);
        }
        get debugFlags() {
          return this._tabState.debugFlags;
        }
        set debugFlags(value) {
          this._tabState.setValue("debugFlags", value);
        }
        get errorDescriptions() {
          return this._tabState.errorDescriptions;
        }
        set errorDescriptions(value) {
          this._tabState.setValue("errorDescriptions", value);
        }
        get httpErrorCodes() {
          return this._tabState.httpErrorCodes;
        }
        set httpErrorCodes(value) {
          this._tabState.setValue("httpErrorCodes", value);
        }
        get performanceWarning() {
          return this._tabState.performanceWarning;
        }
        set performanceWarning(value) {
          this._tabState.setValue("performanceWarning", value);
        }
        get userRefreshCount() {
          return this._tabState.userRefreshCount;
        }
        set userRefreshCount(value) {
          this._tabState.setValue("userRefreshCount", value);
        }
        get openerContext() {
          return this._tabState.openerContext;
        }
        set openerContext(value) {
          this._tabState.setValue("openerContext", value);
        }
        get jsPerformance() {
          return this._tabState.jsPerformance;
        }
        set jsPerformance(value) {
          this._tabState.setValue("jsPerformance", value);
        }
        get locale() {
          return this._tabState.locale;
        }
        set locale(value) {
          this._tabState.setValue("locale", value);
        }
        /**
         * If given a valid adClick redirect, set the adClick to the tab.
         * @param {string} requestURL
         */
        setAdClickIfValidRedirect(requestURL) {
          const policy = this.getAdClickAttributionPolicy();
          const adClick = policy.createAdClick(requestURL, this);
          if (adClick) {
            this.adClick = adClick;
          }
        }
        /**
         * @returns {AdClickAttributionPolicy}
         */
        getAdClickAttributionPolicy() {
          this._adClickAttributionPolicy = this._adClickAttributionPolicy || new AdClickAttributionPolicy2();
          return this._adClickAttributionPolicy;
        }
        /**
         * Returns true if a resource should be permitted when the tab is in the adClick state.
         * @param {string} resourcePath
         * @returns {boolean}
         */
        allowAdAttribution(resourcePath) {
          if (!this.site.isFeatureEnabled("adClickAttribution") || !this.adClick || !this.adClick.allowAdAttribution(this)) return false;
          const policy = this.getAdClickAttributionPolicy();
          const permitted = policy.resourcePermitted(resourcePath);
          if (permitted) {
            this.adClick.requestWasAllowed(this);
          }
          return permitted;
        }
        updateSite(url) {
          if (this.site.url === url) return;
          this.url = url;
          this.site = new Site2(url, this._tabState);
          this.userRefreshCount = 0;
        }
        // Store all trackers for a given tab even if we don't block them.
        /**
         * @param t
         * @param {string} baseDomain
         * @param {string} url
         * @returns {Tracker}
         */
        addToTrackers(t2, baseDomain, url) {
          const trackers3 = this.trackers;
          const tracker = this.trackers[t2.tracker.owner.name];
          if (tracker) {
            tracker.addTrackerUrl(t2, this.url || "", baseDomain, url);
          } else if (t2.tracker) {
            const newTracker = new Tracker2(t2);
            newTracker.addTrackerUrl(t2, this.url || "", baseDomain, url);
            this.trackers[t2.tracker.owner.name] = newTracker;
            if (t2.tracker.owner.name !== "unknown") Companies3.countCompanyOnPage(t2.tracker.owner);
          }
          this.trackers = trackers3;
          return this.trackers[t2.tracker.owner.name];
        }
        /**
         * Adds an entry to the tab webResourceAccess list.
         * @param {string} resourceName URL to the web accessible resource
         * @returns {string} generated access key
         **/
        addWebResourceAccess(resourceName) {
          const key = Math.floor(Math.random() * 1e10).toString(16);
          this.webResourceAccess.push({ key, resourceName, time: Date.now(), wasAccessed: false });
          return key;
        }
        /**
         * Access to web accessible resources needs to have the correct key passed in the URL
         * and the requests needs to happen within 1 second since the generation of the key
         * in addWebResourceAccess
         * @param {string} resourceURL web accessible resource URL
         * @returns {boolean} is access to the resource allowed
         **/
        hasWebResourceAccess(resourceURL) {
          if (!this.webResourceAccess.length) {
            return false;
          }
          const keyMatches = webResourceKeyRegex.exec(resourceURL);
          if (!keyMatches) {
            return false;
          }
          const key = keyMatches[1];
          const hasAccess = this.webResourceAccess.some((resource) => {
            if (resource.key === key && !resource.wasAccessed) {
              resource.wasAccessed = true;
              if (Date.now() - resource.time < 1e3) {
                return true;
              }
            }
            return false;
          });
          return hasAccess;
        }
        /**
         * This method sets ampUrl. In cases where ampUrl is already set with an AMP url and the new url is
         * contained in the current ampUrl, we don't want to set ampUrl to the new url. This is because in some cases
         * simple amp urls (e.g. google.com/amp) will contain another amp url as the extacted url.
         *
         * @param {string} url - the url to set ampUrl to
         */
        setAmpUrl(url) {
          if (this.ampUrl) {
            const ampUrl = new URL(this.ampUrl);
            const newUrl = new URL(url);
            if (ampUrl.hostname.includes("google") && ampUrl.pathname.includes(newUrl.hostname)) {
              return;
            }
          }
          this.ampUrl = url;
        }
        /**
         * Post a message to the devtools panel for this tab
         * @param {Object} devtools
         * @param {string} action
         * @param {Object} message
         */
        postDevtoolsMessage(devtools3, action, message) {
          devtools3.postMessage(this.id, action, message);
        }
      };
      module2.exports = Tab;
    }
  });

  // shared/js/background/classes/sw-tab.js
  var require_sw_tab = __commonJS({
    "shared/js/background/classes/sw-tab.js"(exports2, module2) {
      "use strict";
      var Tab = require_tab();
      var ServiceWorkerTab = class extends Tab {
        /**
         * @param {string} swUrl
         * @param {Record<number, Tab>} tabContainer
         */
        constructor(swUrl, tabContainer) {
          super({
            tabId: -1,
            url: swUrl,
            status: null
          });
          this.origin = new URL(swUrl).origin;
          this.tabContainer = tabContainer;
        }
        /**
         * Find the list of tabs which share the same origin as this service worker.
         * @returns {Tab[]}
         */
        _findMatchingTabs() {
          return Object.keys(this.tabContainer).filter((tabId) => {
            const tab = this.tabContainer[tabId];
            try {
              return Number(tabId) > -1 && new URL(tab.url).origin === this.origin;
            } catch (e) {
              return false;
            }
          }).map((k) => this.tabContainer[k]);
        }
        /**
         * @param t
         * @param {string} baseDomain
         * @param {string} url
         * @returns {import('./tracker').Tracker}
         */
        addToTrackers(tracker, baseDomain, url) {
          const results = this._findMatchingTabs().map((tab) => tab.addToTrackers(tracker, baseDomain, url));
          return results[0];
        }
        /**
         * Post a message to the devtools panel for all matching
         * @param {Object} devtools
         * @param {string} action
         * @param {Object} message
         */
        postDevtoolsMessage(devtools3, action, message) {
          this._findMatchingTabs().forEach((tab) => tab.postDevtoolsMessage(devtools3, action, message));
        }
      };
      module2.exports = ServiceWorkerTab;
    }
  });

  // shared/js/background/trackers.js
  var require_trackers2 = __commonJS({
    "shared/js/background/trackers.js"(exports2, module2) {
      "use strict";
      var utils4 = (init_utils(), __toCommonJS(utils_exports));
      var tldts = require_cjs();
      var Trackers = require_privacy_grade().Trackers;
      var TrackersInstance = new Trackers({ tldjs: tldts, utils: utils4 });
      module2.exports = TrackersInstance;
    }
  });

  // packages/ddg2dnr/lib/gpc.js
  var require_gpc = __commonJS({
    "packages/ddg2dnr/lib/gpc.js"(exports2) {
      "use strict";
      var {
        resourceTypes,
        generateDNRRule: generateDNRRule5
      } = require_utils();
      var GPC_HEADER_PRIORITY = 4e4;
      function generateGPCheaderRule2(ruleId, allowedDomains) {
        return generateDNRRule5({
          id: ruleId,
          priority: GPC_HEADER_PRIORITY,
          actionType: "modifyHeaders",
          requestHeaders: [
            { header: "Sec-GPC", operation: "set", value: "1" }
          ],
          resourceTypes: [...resourceTypes],
          excludedInitiatorDomains: allowedDomains,
          excludedRequestDomains: allowedDomains
        });
      }
      exports2.GPC_HEADER_PRIORITY = GPC_HEADER_PRIORITY;
      exports2.generateGPCheaderRule = generateGPCheaderRule2;
    }
  });

  // shared/js/background/dnr-gpc.js
  async function ensureGPCHeaderRule(config = null) {
    const removeRuleIds = [GPC_HEADER_RULE_ID];
    const addRules = [];
    if (!config) {
      await tds_default.ready("config");
      config = tds_default.config;
    }
    const gpcEnabled = import_settings5.default.getSetting("GPC") && config?.features?.gpc?.state === "enabled";
    if (gpcEnabled) {
      addRules.push(
        (0, import_gpc.generateGPCheaderRule)(
          GPC_HEADER_RULE_ID,
          config.features.gpc.exceptions?.map((e) => e.domain)
        )
      );
    }
    await chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds,
      addRules
    });
  }
  var import_settings5, import_gpc;
  var init_dnr_gpc = __esm({
    "shared/js/background/dnr-gpc.js"() {
      "use strict";
      import_settings5 = __toESM(require_settings());
      init_tds();
      init_dnr_utils();
      import_gpc = __toESM(require_gpc());
      import_settings5.default.onSettingUpdate.addEventListener(
        "GPC",
        () => {
          ensureGPCHeaderRule();
        }
      );
    }
  });

  // shared/js/background/dnr-service-worker-initiated.js
  async function ensureServiceWorkerInitiatedRequestExceptions(config) {
    const removeRuleIds = [SERVICE_WORKER_INITIATED_ALLOWING_RULE_ID];
    const addRules = [];
    if (config.features.serviceworkerInitiatedRequests?.state !== "enabled") {
      addRules.push((0, import_utils4.generateDNRRule)({
        id: SERVICE_WORKER_INITIATED_ALLOWING_RULE_ID,
        priority: import_rulePriorities2.SERVICE_WORKER_INITIATED_ALLOWING_PRIORITY,
        actionType: "allow",
        tabIds: [-1]
      }));
    } else if (config.features.serviceworkerInitiatedRequests?.exceptions?.length > 0 || config.unprotectedTemporary?.length > 0) {
      const exceptionDomains = (config.features.serviceworkerInitiatedRequests?.exceptions || []).concat(config.unprotectedTemporary || []).map((entry) => entry.domain);
      addRules.push((0, import_utils4.generateDNRRule)({
        id: SERVICE_WORKER_INITIATED_ALLOWING_RULE_ID,
        priority: import_rulePriorities2.SERVICE_WORKER_INITIATED_ALLOWING_PRIORITY,
        actionType: "allow",
        tabIds: [-1],
        initiatorDomains: exceptionDomains
      }));
    }
    await chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds,
      addRules
    });
  }
  var import_rulePriorities2, import_utils4;
  var init_dnr_service_worker_initiated = __esm({
    "shared/js/background/dnr-service-worker-initiated.js"() {
      "use strict";
      init_dnr_utils();
      import_rulePriorities2 = __toESM(require_rulePriorities());
      import_utils4 = __toESM(require_utils());
    }
  });

  // packages/ddg2dnr/lib/ampProtection.js
  var require_ampProtection = __commonJS({
    "packages/ddg2dnr/lib/ampProtection.js"(exports2) {
      "use strict";
      var {
        generateDNRRule: generateDNRRule5
      } = require_utils();
      var AMP_PROTECTION_PRIORITY = 4e4;
      async function generateAmpProtectionRules({ features: { ampLinks } }, isRegexSupported) {
        const results = [];
        if (!ampLinks || ampLinks.state !== "enabled" || !ampLinks.settings || !ampLinks.settings.linkFormats || ampLinks.settings.linkFormats.length === 0) {
          return results;
        }
        const { settings: { linkFormats: ampLinkRegexps } } = ampLinks;
        const excludedDomains = (ampLinks?.exceptions || []).map(({ domain }) => domain);
        for (const ampLinkRegex of ampLinkRegexps) {
          const regexFilter = ampLinkRegex.replaceAll("\\S", ".");
          const { isSupported } = await isRegexSupported({
            regex: regexFilter,
            isCaseSensitive: false,
            requireCapturing: true
          });
          if (!isSupported) {
            continue;
          }
          const rule = generateDNRRule5({
            priority: AMP_PROTECTION_PRIORITY,
            actionType: "redirect",
            regexFilter,
            redirect: { regexSubstitution: "https://\\1" },
            resourceTypes: ["main_frame"],
            excludedInitiatorDomains: excludedDomains,
            excludedRequestDomains: excludedDomains
          });
          const matchDetails = {
            type: "ampProtection"
          };
          results.push({ rule, matchDetails });
        }
        return results;
      }
      exports2.AMP_PROTECTION_PRIORITY = AMP_PROTECTION_PRIORITY;
      exports2.generateAmpProtectionRules = generateAmpProtectionRules;
    }
  });

  // packages/ddg2dnr/lib/trackerAllowlist.js
  var require_trackerAllowlist = __commonJS({
    "packages/ddg2dnr/lib/trackerAllowlist.js"(exports2) {
      "use strict";
      var {
        processPlaintextTrackerRule,
        storeInLookup,
        generateDNRRule: generateDNRRule5,
        getTrackerEntryDomain
      } = require_utils();
      var BASELINE_PRIORITY = 2e4;
      var PRIORITY_INCREMENT = 1;
      var CEILING_PRIORITY = 20100;
      var MAXIMUM_RULES_PER_TRACKER_ENTRY = (CEILING_PRIORITY - BASELINE_PRIORITY) / PRIORITY_INCREMENT;
      function* generateTrackerAllowlistRules({ features: { trackerAllowlist } }) {
        if (!trackerAllowlist || trackerAllowlist.state !== "enabled" || !trackerAllowlist.settings || !trackerAllowlist.settings.allowlistedTrackers || trackerAllowlist.settings.allowlistedTrackers.length === 0) {
          return;
        }
        const { allowlistedTrackers } = trackerAllowlist.settings;
        const excludedRequestDomainsByTrackerEntry = /* @__PURE__ */ new Map();
        for (const trackerDomain of Object.keys(allowlistedTrackers)) {
          let currentTrackerDomain = trackerDomain;
          while (currentTrackerDomain) {
            currentTrackerDomain = getTrackerEntryDomain(
              allowlistedTrackers,
              currentTrackerDomain,
              1
            );
            if (currentTrackerDomain) {
              storeInLookup(
                excludedRequestDomainsByTrackerEntry,
                currentTrackerDomain,
                [trackerDomain]
              );
            }
          }
        }
        for (const [trackerDomain, trackerEntry] of Object.entries(allowlistedTrackers)) {
          const { rules: trackerEntryRules } = trackerEntry;
          if (!trackerEntryRules || trackerEntryRules.length === 0) {
            continue;
          }
          if (trackerEntryRules.length > MAXIMUM_RULES_PER_TRACKER_ENTRY) {
            throw new Error(
              "Too many allowlist rules for tracker domain: " + trackerDomain
            );
          }
          const requestDomains = [trackerDomain];
          const excludedRequestDomains = excludedRequestDomainsByTrackerEntry.get(trackerDomain);
          let priority = BASELINE_PRIORITY;
          for (let i = trackerEntryRules.length - 1; i >= 0; i--) {
            let {
              rule: trackerRule,
              domains: initiatorDomains,
              reason: allowlistReason
            } = trackerEntryRules[i];
            if (initiatorDomains.length === 0 || initiatorDomains[0] === "<all>") {
              initiatorDomains = null;
            }
            const {
              urlFilter,
              matchCase
            } = processPlaintextTrackerRule(trackerDomain, trackerRule);
            const rule = generateDNRRule5({
              priority,
              actionType: "allow",
              urlFilter,
              matchCase,
              requestDomains,
              excludedRequestDomains,
              initiatorDomains
            });
            const matchDetails = {
              type: "trackerAllowlist",
              domain: trackerDomain,
              reason: allowlistReason
            };
            yield { rule, matchDetails };
            priority += PRIORITY_INCREMENT;
          }
        }
      }
      exports2.BASELINE_PRIORITY = BASELINE_PRIORITY;
      exports2.PRIORITY_INCREMENT = PRIORITY_INCREMENT;
      exports2.CEILING_PRIORITY = CEILING_PRIORITY;
      exports2.MAXIMUM_RULES_PER_TRACKER_ENTRY = MAXIMUM_RULES_PER_TRACKER_ENTRY;
      exports2.generateTrackerAllowlistRules = generateTrackerAllowlistRules;
    }
  });

  // packages/ddg2dnr/lib/temporaryAllowlist.js
  var require_temporaryAllowlist = __commonJS({
    "packages/ddg2dnr/lib/temporaryAllowlist.js"(exports2) {
      "use strict";
      var CONTENT_BLOCKING_ALLOWLIST_PRIORITY = 3e4;
      var UNPROTECTED_TEMPORARY_ALLOWLIST_PRIORITY = 1e6;
      var {
        generateDNRRule: generateDNRRule5
      } = require_utils();
      function* generateTemporaryAllowlistRules({ features: { contentBlocking }, unprotectedTemporary }, denylistedDomains) {
        const denylistedDomainsSet = new Set(denylistedDomains);
        const configs = [{
          type: "unprotectedTemporary",
          priority: UNPROTECTED_TEMPORARY_ALLOWLIST_PRIORITY,
          entries: unprotectedTemporary || []
        }];
        if (contentBlocking?.state !== "enabled") {
          yield {
            rule: generateDNRRule5({
              priority: CONTENT_BLOCKING_ALLOWLIST_PRIORITY,
              actionType: "allowAllRequests",
              resourceTypes: ["main_frame"]
            }),
            matchDetails: {
              type: "contentBlocking",
              reason: "contentBlocking disabled for all domains."
            }
          };
        } else {
          configs.push({
            type: "contentBlocking",
            priority: CONTENT_BLOCKING_ALLOWLIST_PRIORITY,
            entries: contentBlocking?.exceptions || []
          });
        }
        for (const { type, priority, entries } of configs) {
          for (const { domain, reason } of entries) {
            if (denylistedDomainsSet.has(domain)) continue;
            const matchDetails = { type, domain, reason };
            const rule = generateDNRRule5({
              priority,
              actionType: "allowAllRequests",
              requestDomains: [domain],
              resourceTypes: ["main_frame"]
            });
            yield { rule, matchDetails };
          }
        }
      }
      exports2.CONTENT_BLOCKING_ALLOWLIST_PRIORITY = CONTENT_BLOCKING_ALLOWLIST_PRIORITY;
      exports2.UNPROTECTED_TEMPORARY_ALLOWLIST_PRIORITY = UNPROTECTED_TEMPORARY_ALLOWLIST_PRIORITY;
      exports2.generateTemporaryAllowlistRules = generateTemporaryAllowlistRules;
    }
  });

  // packages/ddg2dnr/lib/trackingParams.js
  var require_trackingParams = __commonJS({
    "packages/ddg2dnr/lib/trackingParams.js"(exports2) {
      "use strict";
      var {
        generateDNRRule: generateDNRRule5
      } = require_utils();
      var TRACKING_PARAM_PRIORITY = 4e4;
      function generateTrackingParameterRules(config) {
        if (config.features?.trackingParameters?.state !== "enabled") {
          return [];
        }
        const allowedDomains = config.features.trackingParameters.exceptions?.map((e) => e.domain);
        const trackingParams = config.features.trackingParameters.settings?.parameters?.filter((param) => !param.match(/[*+?{}[\]]/, "g"));
        if (!trackingParams) {
          return [];
        }
        const rule = generateDNRRule5({
          priority: TRACKING_PARAM_PRIORITY,
          actionType: "redirect",
          redirect: {
            transform: {
              queryTransform: {
                removeParams: trackingParams
              }
            }
          },
          resourceTypes: ["main_frame"],
          excludedRequestDomains: allowedDomains
        });
        return [{ matchDetails: { type: "trackingParams" }, rule }];
      }
      exports2.TRACKING_PARAM_PRIORITY = TRACKING_PARAM_PRIORITY;
      exports2.generateTrackingParameterRules = generateTrackingParameterRules;
    }
  });

  // packages/ddg2dnr/lib/extensionConfiguration.js
  var require_extensionConfiguration = __commonJS({
    "packages/ddg2dnr/lib/extensionConfiguration.js"(exports2) {
      "use strict";
      var { generateAmpProtectionRules } = require_ampProtection();
      var { generateTrackerAllowlistRules } = require_trackerAllowlist();
      var { generateTemporaryAllowlistRules } = require_temporaryAllowlist();
      var { generateTrackingParameterRules } = require_trackingParams();
      var { createSmarterEncryptionTemporaryRule: createSmarterEncryptionTemporaryRule2 } = require_smarterEncryption();
      async function generateExtensionConfigurationRuleset2(extensionConfig, denylistedDomains, isRegexSupported, startingRuleId = 1) {
        if (typeof isRegexSupported !== "function") {
          throw new Error("Missing isRegexSupported function.");
        }
        let ruleId = startingRuleId;
        const ruleset = [];
        const matchDetailsByRuleId = {};
        const appendRuleResult = (result) => {
          if (result) {
            const { matchDetails, rule } = result;
            rule.id = ruleId++;
            ruleset.push(rule);
            matchDetailsByRuleId[rule.id] = matchDetails;
          }
        };
        for (const result of await generateAmpProtectionRules(extensionConfig, isRegexSupported)) {
          appendRuleResult(result);
        }
        for (const result of generateTrackerAllowlistRules(extensionConfig)) {
          appendRuleResult(result);
        }
        for (const result of generateTemporaryAllowlistRules(extensionConfig, denylistedDomains)) {
          appendRuleResult(result);
        }
        for (const result of generateTrackingParameterRules(extensionConfig)) {
          appendRuleResult(result);
        }
        if (extensionConfig.features?.https?.exceptions?.length > 0) {
          appendRuleResult(createSmarterEncryptionTemporaryRule2(extensionConfig.features.https.exceptions.map((entry) => entry.domain)));
        }
        return { ruleset, matchDetailsByRuleId };
      }
      exports2.generateExtensionConfigurationRuleset = generateExtensionConfigurationRuleset2;
    }
  });

  // packages/ddg2dnr/lib/tds.js
  var require_tds = __commonJS({
    "packages/ddg2dnr/lib/tds.js"(exports2) {
      "use strict";
      var {
        generateDNRRule: generateDNRRule5,
        getTrackerEntryDomain,
        storeInLookup,
        processRegexTrackerRule,
        resourceTypes,
        generateRequestDomainsByTrackerDomain
      } = require_utils();
      var clickToLoadActionPrefix = "block-ctl-";
      var BASELINE_PRIORITY = 1e4;
      var CEILING_PRIORITY = 19999;
      var SUBDOMAIN_PRIORITY_INCREMENT = 100;
      var TRACKER_RULE_PRIORITY_INCREMENT = 1;
      var MAXIMUM_SUBDOMAIN_PRIORITY = CEILING_PRIORITY - CEILING_PRIORITY % SUBDOMAIN_PRIORITY_INCREMENT;
      var MAXIMUM_TRACKER_RULE_PRIORITY_INCREMENT = SUBDOMAIN_PRIORITY_INCREMENT - TRACKER_RULE_PRIORITY_INCREMENT;
      var MAXIMUM_REGEX_RULES = 900;
      var trackerDomainSymbol = Symbol("trackerDomain");
      var clickToLoadActionSymbol = Symbol("clickToLoadActionSymbol");
      function normalizeTypesCondition(types) {
        if (!types || types.length === 0) {
          return [];
        }
        const normalizedTypes = /* @__PURE__ */ new Set();
        for (const type of types) {
          switch (type) {
            case "main_frame":
              continue;
            case "imageset":
              normalizedTypes.add("image");
              break;
            default:
              if (resourceTypes.has(type)) {
                normalizedTypes.add(type);
              } else {
                normalizedTypes.add("other");
              }
          }
        }
        return Array.from(normalizedTypes);
      }
      function normalizeAction(action, defaultAction) {
        if (action === "ignore") {
          return "allow";
        }
        if (!action && defaultAction) {
          return defaultAction;
        }
        return action;
      }
      function normalizeTrackerRule(trackerRule) {
        if (trackerRule instanceof RegExp) {
          return trackerRule.source;
        }
        return trackerRule;
      }
      function calculateTrackerEntryPriorities(tds) {
        const priorityByTrackerEntryDomain = /* @__PURE__ */ new Map();
        for (let domain of Object.keys(tds.trackers)) {
          if (priorityByTrackerEntryDomain.has(domain)) {
            continue;
          }
          let basePriority = BASELINE_PRIORITY;
          const trackerEntryDomains = [domain];
          while (true) {
            const i = domain.indexOf(".");
            if (i === -1) {
              break;
            }
            domain = domain.substr(i + 1);
            if (tds.trackers[domain]) {
              if (priorityByTrackerEntryDomain.has(domain)) {
                basePriority = priorityByTrackerEntryDomain.get(domain) + SUBDOMAIN_PRIORITY_INCREMENT;
                break;
              }
              trackerEntryDomains.push(domain);
            }
          }
          for (let i = trackerEntryDomains.length - 1; i >= 0; i--) {
            priorityByTrackerEntryDomain.set(
              trackerEntryDomains[i],
              basePriority
            );
            basePriority += SUBDOMAIN_PRIORITY_INCREMENT;
          }
        }
        return priorityByTrackerEntryDomain;
      }
      function removeRedundantDNRRules(dnrRules) {
        if (!dnrRules || dnrRules.length === 0) {
          return [];
        }
        const {
          priority: defaultPriority,
          action: { type: defaultAction }
        } = dnrRules[0];
        let rulesToRemoveStartIndex = 1;
        let rulesToRemoveCount = 0;
        if (defaultPriority === BASELINE_PRIORITY && defaultAction === "allow") {
          rulesToRemoveStartIndex = 0;
          rulesToRemoveCount = 1;
        }
        for (let i = 1; i < dnrRules.length; i++) {
          if (dnrRules[i].action.type === defaultAction) {
            rulesToRemoveCount++;
          } else {
            break;
          }
        }
        if (rulesToRemoveCount > 0) {
          dnrRules.splice(rulesToRemoveStartIndex, rulesToRemoveCount);
        }
        return dnrRules;
      }
      async function generateDNRRulesForTrackerEntry(trackerDomain, trackerEntry, requestDomains, excludedInitiatorDomains, priority, isRegexSupported, surrogatePathPrefix, supportedSurrogateScripts) {
        const dnrRules = [];
        if (priority > MAXIMUM_SUBDOMAIN_PRIORITY) {
          throw new Error("Too many tracker entries for domain: " + trackerDomain);
        }
        const defaultAction = normalizeAction(trackerEntry.default);
        if (defaultAction !== "block" && defaultAction !== "allow") {
          return dnrRules;
        }
        const trackerEntryRules = trackerEntry.rules || [];
        dnrRules.push(
          generateDNRRule5({
            priority,
            actionType: defaultAction,
            requestDomains,
            excludedInitiatorDomains
          })
        );
        const matchCnames = requestDomains.length > 1;
        if (trackerEntryRules.length * TRACKER_RULE_PRIORITY_INCREMENT > MAXIMUM_TRACKER_RULE_PRIORITY_INCREMENT) {
          throw new Error("Too many rules for tracker domain:" + trackerDomain);
        }
        for (let i = trackerEntryRules.length - 1; i >= 0; i--) {
          let {
            action: ruleAction,
            rule: trackerRule,
            exceptions: ruleExceptions,
            options: ruleOptions,
            surrogate
          } = trackerEntryRules[i];
          ruleAction = normalizeAction(ruleAction, "block");
          let clickToLoadAction = null;
          if (ruleAction.startsWith(clickToLoadActionPrefix)) {
            clickToLoadAction = ruleAction;
            ruleAction = "block";
          }
          if (ruleAction !== "block" && ruleAction !== "allow") {
            continue;
          }
          trackerRule = normalizeTrackerRule(trackerRule);
          let {
            fallbackUrlFilter,
            urlFilter,
            regexFilter,
            matchCase
          } = processRegexTrackerRule(trackerDomain, trackerRule, matchCnames);
          if (regexFilter) {
            const { isSupported } = await isRegexSupported({
              regex: regexFilter,
              isCaseSensitive: matchCase
            });
            if (!isSupported) {
              if (fallbackUrlFilter) {
                regexFilter = void 0;
                urlFilter = fallbackUrlFilter;
              } else {
                continue;
              }
            }
          }
          let redirectAction = null;
          let ruleResourceTypes = null;
          if (surrogate) {
            ruleResourceTypes = ["script"];
            if (!supportedSurrogateScripts.has(surrogate)) {
              ruleAction = "block";
            } else {
              ruleAction = "redirect";
              redirectAction = {
                extensionPath: surrogatePathPrefix + surrogate
              };
            }
          }
          priority += TRACKER_RULE_PRIORITY_INCREMENT;
          let initiatorDomains = null;
          if (ruleOptions && (ruleAction === "block" || ruleAction === "redirect")) {
            ruleResourceTypes = normalizeTypesCondition(ruleOptions.types);
            initiatorDomains = ruleOptions.domains;
          }
          {
            const newRule = generateDNRRule5({
              priority,
              actionType: ruleAction,
              redirect: redirectAction,
              urlFilter,
              regexFilter,
              matchCase,
              requestDomains,
              excludedInitiatorDomains,
              initiatorDomains,
              resourceTypes: ruleResourceTypes
            });
            if (clickToLoadAction) {
              newRule[clickToLoadActionSymbol] = clickToLoadAction;
            }
            dnrRules.push(newRule);
          }
          if (ruleExceptions && (ruleAction === "block" || ruleAction === "redirect")) {
            dnrRules.push(generateDNRRule5({
              priority,
              actionType: "allow",
              urlFilter,
              regexFilter,
              matchCase,
              resourceTypes: normalizeTypesCondition(ruleExceptions.types),
              requestDomains,
              initiatorDomains: ruleExceptions.domains
            }));
          }
        }
        return removeRedundantDNRRules(dnrRules);
      }
      function finalizeDNRRulesAndLookup(startingRuleId, dnrRules) {
        const ruleIdByByStringifiedDNRRule = /* @__PURE__ */ new Map();
        const requestDomainsByRuleId = /* @__PURE__ */ new Map();
        const trackerDomainsByRuleId = /* @__PURE__ */ new Map();
        const matchDetailsByRuleId = {};
        const allowingRulesByClickToLoadAction = {};
        const ruleset = [];
        let nextRuleId = startingRuleId;
        for (const rule of dnrRules) {
          const trackerDomain = rule[trackerDomainSymbol];
          delete rule[trackerDomainSymbol];
          const clickToLoadAction = rule[clickToLoadActionSymbol];
          delete rule[clickToLoadActionSymbol];
          if (clickToLoadAction) {
            const inverseAllowingRule = JSON.parse(JSON.stringify(rule));
            inverseAllowingRule.action.type = "allow";
            delete inverseAllowingRule.action.redirect;
            delete inverseAllowingRule.condition.domainType;
            delete inverseAllowingRule.condition.excludedInitiatorDomains;
            storeInLookup(
              allowingRulesByClickToLoadAction,
              clickToLoadAction,
              [inverseAllowingRule]
            );
          }
          if (!rule.condition.requestDomains || rule.priority !== BASELINE_PRIORITY || rule.action === "redirect" || clickToLoadAction) {
            const ruleId = nextRuleId++;
            rule.id = ruleId;
            ruleset.push(rule);
            let matchType = "trackerBlocking";
            if (clickToLoadAction) {
              matchType = "clickToLoad";
            } else if (rule.action.type === "redirect") {
              matchType = "surrogateScript";
            }
            matchDetailsByRuleId[ruleId] = {
              type: matchType,
              possibleTrackerDomains: [trackerDomain]
            };
            continue;
          }
          let { requestDomains } = rule.condition;
          delete rule.condition.requestDomains;
          const key = JSON.stringify(rule);
          if (ruleIdByByStringifiedDNRRule.has(key)) {
            const ruleId = ruleIdByByStringifiedDNRRule.get(key);
            storeInLookup(trackerDomainsByRuleId, ruleId, [trackerDomain]);
            storeInLookup(requestDomainsByRuleId, ruleId, requestDomains);
          } else {
            const ruleId = nextRuleId++;
            rule.id = ruleId;
            requestDomains = requestDomains.slice();
            rule.condition.requestDomains = requestDomains;
            ruleset.push(rule);
            ruleIdByByStringifiedDNRRule.set(key, ruleId);
            storeInLookup(trackerDomainsByRuleId, ruleId, [trackerDomain]);
            requestDomainsByRuleId.set(ruleId, requestDomains);
          }
        }
        for (let i = startingRuleId; i < startingRuleId + ruleset.length; i++) {
          if (!trackerDomainsByRuleId.has(i)) {
            continue;
          }
          matchDetailsByRuleId[i] = {
            type: "trackerBlocking",
            possibleTrackerDomains: trackerDomainsByRuleId.get(i)
          };
        }
        return { ruleset, matchDetailsByRuleId, allowingRulesByClickToLoadAction };
      }
      async function generateTdsRuleset2(tds, supportedSurrogateScripts, surrogatePathPrefix, isRegexSupported, startingRuleId = 1) {
        if (typeof tds !== "object" || typeof tds.cnames !== "object" || typeof tds.domains !== "object" || typeof tds.entities !== "object" || typeof tds.trackers !== "object") {
          throw new Error("Invalid block list.");
        }
        if (typeof isRegexSupported !== "function") {
          throw new Error("Missing isRegexSupported function.");
        }
        const requestDomainsByTrackerDomain = generateRequestDomainsByTrackerDomain(tds);
        const priorityByTrackerDomain = calculateTrackerEntryPriorities(tds);
        let regexRuleCount = 0;
        const dnrRules = [];
        for (const [trackerDomain, trackerEntry] of Object.entries(tds.trackers)) {
          const requestDomains = requestDomainsByTrackerDomain.get(trackerDomain);
          if (typeof tds.entities[trackerEntry.owner.name] === "undefined") {
            continue;
          }
          const excludedInitiatorDomains = tds.entities[trackerEntry.owner.name].domains;
          const priority = priorityByTrackerDomain.get(trackerDomain);
          const trackerRules = await generateDNRRulesForTrackerEntry(
            trackerDomain,
            trackerEntry,
            requestDomains,
            excludedInitiatorDomains,
            priority,
            isRegexSupported,
            surrogatePathPrefix,
            supportedSurrogateScripts
          );
          for (const rule of trackerRules) {
            if (rule.condition.regexFilter && ++regexRuleCount > MAXIMUM_REGEX_RULES) {
              throw new Error(
                "Maximum number of regular expression rules exceeded!"
              );
            }
            rule[trackerDomainSymbol] = trackerDomain;
            dnrRules.push(rule);
          }
        }
        return finalizeDNRRulesAndLookup(startingRuleId, dnrRules);
      }
      exports2.BASELINE_PRIORITY = BASELINE_PRIORITY;
      exports2.CEILING_PRIORITY = CEILING_PRIORITY;
      exports2.SUBDOMAIN_PRIORITY_INCREMENT = SUBDOMAIN_PRIORITY_INCREMENT;
      exports2.TRACKER_RULE_PRIORITY_INCREMENT = TRACKER_RULE_PRIORITY_INCREMENT;
      exports2.MAXIMUM_SUBDOMAIN_PRIORITY = MAXIMUM_SUBDOMAIN_PRIORITY;
      exports2.MAXIMUM_TRACKER_RULE_PRIORITY_INCREMENT = MAXIMUM_TRACKER_RULE_PRIORITY_INCREMENT;
      exports2.MAXIMUM_REGEX_RULES = MAXIMUM_REGEX_RULES;
      exports2.getTrackerEntryDomain = getTrackerEntryDomain;
      exports2.generateDNRRule = generateDNRRule5;
      exports2.generateTdsRuleset = generateTdsRuleset2;
    }
  });

  // packages/ddg2dnr/lib/cookies.js
  var require_cookies = __commonJS({
    "packages/ddg2dnr/lib/cookies.js"(exports2) {
      "use strict";
      var { generateRequestDomainsByTrackerDomain, getTrackerEntryDomain, storeInLookup } = require_utils();
      var COOKIE_PRIORITY = 4e4;
      function generateCookieBlockingRuleset(tds, excludedCookieDomains, siteAllowlist, startingRuleId = 1) {
        const rules = [];
        const entityDomainMapping = /* @__PURE__ */ new Map();
        const trackerDomainExclusions = /* @__PURE__ */ new Map();
        const matchDetailsByRuleId = {};
        const singleDomainEntityDomains = [];
        const requestDomainsByTrackerDomain = generateRequestDomainsByTrackerDomain(tds);
        for (const domain of excludedCookieDomains) {
          const trackerEntryDomain = getTrackerEntryDomain(tds.trackers, domain);
          storeInLookup(trackerDomainExclusions, trackerEntryDomain, [domain]);
        }
        for (const [trackerDomain, trackerEntry] of Object.entries(tds.trackers)) {
          const mapEntry = entityDomainMapping.get(trackerEntry.owner.name) || { domains: /* @__PURE__ */ new Set(), trackerDomains: /* @__PURE__ */ new Set() };
          for (const domain of requestDomainsByTrackerDomain.get(trackerDomain) || []) {
            mapEntry.domains.add(domain);
            mapEntry.trackerDomains.add(domain);
          }
          tds.entities[trackerEntry.owner.name].domains.forEach((d) => mapEntry.domains.add(d));
          entityDomainMapping.set(trackerEntry.owner.name, mapEntry);
        }
        for (const [, { domains, trackerDomains }] of entityDomainMapping.entries()) {
          const excludedRequestDomains = [];
          for (const domain of trackerDomains) {
            if (trackerDomainExclusions.has(domain)) {
              excludedRequestDomains.push(...trackerDomainExclusions.get(domain) || []);
            }
          }
          if (domains.size === 1 && trackerDomains.size === 1 && excludedRequestDomains.length === 0) {
            singleDomainEntityDomains.push(...domains);
            continue;
          }
          rules.push({
            id: startingRuleId++,
            priority: COOKIE_PRIORITY,
            action: {
              type: "modifyHeaders",
              requestHeaders: [{ header: "cookie", operation: "remove" }],
              responseHeaders: [{ header: "set-cookie", operation: "remove" }]
            },
            condition: {
              requestDomains: Array.from(trackerDomains),
              excludedInitiatorDomains: [...domains, ...siteAllowlist],
              excludedRequestDomains
            }
          });
          matchDetailsByRuleId[startingRuleId] = {
            type: "cookieBlocking",
            possibleTrackerDomains: Array.from(trackerDomains)
          };
        }
        if (singleDomainEntityDomains.length > 0) {
          rules.push({
            id: ++startingRuleId,
            priority: COOKIE_PRIORITY,
            action: {
              type: "modifyHeaders",
              requestHeaders: [{ header: "cookie", operation: "remove" }],
              responseHeaders: [{ header: "set-cookie", operation: "remove" }]
            },
            condition: {
              requestDomains: singleDomainEntityDomains,
              excludedInitiatorDomains: siteAllowlist,
              domainType: "thirdParty"
            }
          });
          matchDetailsByRuleId[startingRuleId] = {
            type: "cookieBlocking",
            possibleTrackerDomains: singleDomainEntityDomains
          };
        }
        return {
          ruleset: rules,
          matchDetailsByRuleId
        };
      }
      exports2.generateCookieBlockingRuleset = generateCookieBlockingRuleset;
      exports2.COOKIE_PRIORITY = COOKIE_PRIORITY;
    }
  });

  // packages/ddg2dnr/lib/combined.js
  var require_combined = __commonJS({
    "packages/ddg2dnr/lib/combined.js"(exports2) {
      "use strict";
      var { generateCookieBlockingRuleset } = require_cookies();
      function generateCombinedConfigBlocklistRuleset2(tds, config, denylistedDomains, startingRuleId = 1) {
        if (config.features?.cookie?.state !== "enabled") {
          return { ruleset: [], matchDetailsByRuleId: {} };
        }
        const cookieAllowlist = (config.features.cookie?.exceptions.map((entry) => entry.domain) || []).concat(config.unprotectedTemporary.map((entry) => entry.domain)).filter((domain) => !denylistedDomains.includes(domain));
        const excludedCookieDomains = config.features.cookie?.settings.excludedCookieDomains.map((entry) => entry.domain);
        return generateCookieBlockingRuleset(tds, excludedCookieDomains, cookieAllowlist, startingRuleId);
      }
      exports2.generateCombinedConfigBlocklistRuleset = generateCombinedConfigBlocklistRuleset2;
    }
  });

  // shared/js/background/dnr-config-rulesets.js
  function generateEtagRule(id, etag) {
    return (0, import_utils6.generateDNRRule)({
      id,
      priority: 1,
      actionType: "allow",
      urlFilter: etag,
      requestDomains: ["etag.invalid"]
    });
  }
  async function configRulesNeedUpdate(configName, expectedState) {
    const settingName = SETTING_PREFIX + configName;
    await import_settings6.default.ready();
    const settingValue = import_settings6.default.getSetting(settingName);
    if (!settingValue) {
      return true;
    }
    if (!expectedState.etag) {
      return true;
    }
    for (const [key, value] of Object.entries(expectedState)) {
      if (settingValue[key] !== value) {
        return true;
      }
    }
    const [etagRuleId] = ruleIdRangeByConfigName[configName];
    const existingEtagRule = await findExistingDynamicRule(etagRuleId);
    if (!existingEtagRule) {
      return true;
    }
    return existingEtagRule.condition.urlFilter !== expectedState.etag;
  }
  function minimalConfig({ unprotectedTemporary, features }) {
    const result = { features: {}, unprotectedTemporary };
    for (const featureName of Object.keys(features)) {
      if (isFeatureEnabled(featureName)) {
        result.features[featureName] = features[featureName];
      }
    }
    return result;
  }
  async function updateConfigRules(configName, latestState, rules, matchDetailsByRuleId, allowingRulesByClickToLoadAction = {}) {
    const [ruleIdStart, ruleIdEnd] = ruleIdRangeByConfigName[configName];
    const etagRuleId = ruleIdStart;
    const maxNumberOfRules = ruleIdEnd - ruleIdStart;
    const { etag } = latestState;
    if (!rules) {
      console.error(
        "No declarativeNetRequest rules generated for configuration: ",
        configName,
        "(Etag: ",
        etag,
        ")"
      );
      return;
    }
    rules.push(generateEtagRule(etagRuleId, etag));
    if (rules.length > maxNumberOfRules) {
      console.error(
        "Too many declarativeNetRequest rules generated for configuration: ",
        configName,
        "(Etag: ",
        etag,
        ", Rules generated: ",
        rules.length,
        ")"
      );
      return;
    }
    const removeRuleIds = [];
    for (let i = ruleIdStart; i <= ruleIdEnd; i++) {
      removeRuleIds.push(i);
    }
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds,
      addRules: rules
    });
    const settingName = SETTING_PREFIX + configName;
    const settingValue = {
      matchDetailsByRuleId
    };
    for (const key of Object.keys(latestState)) {
      settingValue[key] = latestState[key];
    }
    await import_settings6.default.ready();
    if (Object.keys(allowingRulesByClickToLoadAction).length) {
      import_settings6.default.updateSetting("allowingDnrRulesByClickToLoadRuleAction", allowingRulesByClickToLoadAction);
    }
    import_settings6.default.updateSetting(settingName, settingValue);
  }
  async function updateExtensionConfigRules(etag = null, configValue = null) {
    const extensionVersion = getExtensionVersion();
    const denylistedDomains = await getDenylistedDomains();
    const latestState = {
      extensionVersion,
      denylistedDomains: denylistedDomains.join(),
      etag
    };
    if (!configValue) {
      await tds_default.ready("config");
      configValue = tds_default.config;
    }
    if (!etag) {
      const settingName = SETTING_PREFIX + "config";
      await import_settings6.default.ready();
      await tds_default.ready("config");
      const settingValue = import_settings6.default.getSetting(settingName);
      if (!settingValue?.etag) {
        return;
      }
      latestState.etag = settingValue.etag;
    }
    if (!await configRulesNeedUpdate("config", latestState)) {
      return;
    }
    const [ruleIdStart] = ruleIdRangeByConfigName.config;
    const {
      ruleset,
      matchDetailsByRuleId
    } = await (0, import_extensionConfiguration.generateExtensionConfigurationRuleset)(
      minimalConfig(configValue),
      denylistedDomains,
      chrome.declarativeNetRequest.isRegexSupported,
      ruleIdStart + 1
    );
    await updateConfigRules(
      "config",
      latestState,
      ruleset,
      matchDetailsByRuleId
    );
  }
  async function updateCombinedConfigBlocklistRules() {
    const extensionVersion = getExtensionVersion();
    const denylistedDomains = await getDenylistedDomains();
    const tdsEtag = import_settings6.default.getSetting("tds-etag");
    const combinedState = {
      etag: `${import_settings6.default.getSetting("config-etag")}-${tdsEtag}`,
      denylistedDomains: denylistedDomains.join(),
      extensionVersion
    };
    if (tdsEtag && await configRulesNeedUpdate("combined", combinedState)) {
      const {
        ruleset,
        matchDetailsByRuleId
      } = (0, import_combined.generateCombinedConfigBlocklistRuleset)(
        tds_default.tds,
        minimalConfig(tds_default.config),
        denylistedDomains,
        ruleIdRangeByConfigName.combined[0] + 1
      );
      await updateConfigRules("combined", combinedState, ruleset, matchDetailsByRuleId);
    }
  }
  async function onConfigUpdate(configName, etag, configValue) {
    const extensionVersion = getExtensionVersion();
    console.log("update", configName, etag, configValue);
    ruleUpdateLock = ruleUpdateLock.then(async () => {
      if (configName === "tds") {
        const [ruleIdStart] = ruleIdRangeByConfigName[configName];
        const latestState = { etag, extensionVersion };
        if (!await configRulesNeedUpdate(configName, latestState)) {
          return;
        }
        await tds_default.ready();
        const supportedSurrogates = new Set(Object.keys(import_trackers.default.surrogateList));
        const {
          ruleset,
          matchDetailsByRuleId,
          allowingRulesByClickToLoadAction
        } = await (0, import_tds7.generateTdsRuleset)(
          configValue,
          supportedSurrogates,
          "/web_accessible_resources/",
          chrome.declarativeNetRequest.isRegexSupported,
          ruleIdStart + 1
        );
        await updateConfigRules(configName, latestState, ruleset, matchDetailsByRuleId, allowingRulesByClickToLoadAction);
      } else if (configName === "config") {
        await updateExtensionConfigRules(etag, configValue);
        await ensureGPCHeaderRule(configValue);
        await ensureServiceWorkerInitiatedRequestExceptions(configValue);
      }
      await updateCombinedConfigBlocklistRules();
    });
    await ruleUpdateLock;
  }
  var import_settings6, import_trackers, import_extensionConfiguration, import_tds7, import_utils6, import_combined, ruleUpdateLock;
  var init_dnr_config_rulesets = __esm({
    "shared/js/background/dnr-config-rulesets.js"() {
      "use strict";
      init_wrapper();
      import_settings6 = __toESM(require_settings());
      init_tds();
      import_trackers = __toESM(require_trackers2());
      init_utils();
      init_dnr_gpc();
      init_dnr_service_worker_initiated();
      init_dnr_user_allowlist();
      init_dnr_utils();
      import_extensionConfiguration = __toESM(require_extensionConfiguration());
      import_tds7 = __toESM(require_tds());
      import_utils6 = __toESM(require_utils());
      import_combined = __toESM(require_combined());
      ruleUpdateLock = Promise.resolve();
      if (getManifestVersion() === 3) {
        tds_default.onUpdate("config", onConfigUpdate);
        tds_default.onUpdate("tds", onConfigUpdate);
      }
    }
  });

  // shared/js/background/dnr-user-allowlist.js
  var dnr_user_allowlist_exports = {};
  __export(dnr_user_allowlist_exports, {
    getDenylistedDomains: () => getDenylistedDomains,
    refreshUserAllowlistRules: () => refreshUserAllowlistRules,
    toggleUserAllowlistDomain: () => toggleUserAllowlistDomain,
    updateUserDenylist: () => updateUserDenylist
  });
  function normalizeUntrustedDomain(domain) {
    try {
      return new URL("https://" + domain).hostname;
    } catch (e) {
      return null;
    }
  }
  async function updateUserAllowlistRule(allowlistedDomains) {
    const addRules = [];
    const removeRuleIds = [USER_ALLOWLIST_RULE_ID];
    if (allowlistedDomains.length > 0) {
      addRules.push((0, import_utils7.generateDNRRule)({
        id: USER_ALLOWLIST_RULE_ID,
        priority: import_rulePriorities3.USER_ALLOWLISTED_PRIORITY,
        actionType: "allowAllRequests",
        resourceTypes: ["main_frame"],
        requestDomains: allowlistedDomains
      }));
    }
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds,
      addRules
    });
  }
  async function toggleUserAllowlistDomain(domain, enable) {
    const normalizedDomain = normalizeUntrustedDomain(domain);
    if (typeof normalizedDomain !== "string") {
      return;
    }
    const existingRule = await findExistingDynamicRule(USER_ALLOWLIST_RULE_ID);
    const allowlistedDomains = new Set(
      existingRule ? existingRule.condition.requestDomains : []
    );
    allowlistedDomains[enable ? "add" : "delete"](normalizedDomain);
    await updateUserAllowlistRule(Array.from(allowlistedDomains));
  }
  async function refreshUserAllowlistRules(allowlistedDomains) {
    const normalizedAllowlistedDomains = (
      /** @type {string[]} */
      allowlistedDomains.map(normalizeUntrustedDomain).filter((domain) => typeof domain === "string")
    );
    await updateUserAllowlistRule(normalizedAllowlistedDomains);
  }
  async function getDenylistedDomains() {
    await import_settings7.default.ready();
    const denylist = import_settings7.default.getSetting("denylisted") || {};
    const denylistedDomains = [];
    for (const [domain, enabled] of Object.entries(denylist)) {
      if (enabled) {
        const normalizedDomain = normalizeUntrustedDomain(domain);
        if (normalizedDomain) {
          denylistedDomains.push(normalizedDomain);
        }
      }
    }
    return denylistedDomains.sort();
  }
  async function updateUserDenylist() {
    await updateExtensionConfigRules();
    await updateCombinedConfigBlocklistRules();
  }
  var import_settings7, import_rulePriorities3, import_utils7;
  var init_dnr_user_allowlist = __esm({
    "shared/js/background/dnr-user-allowlist.js"() {
      "use strict";
      import_settings7 = __toESM(require_settings());
      import_rulePriorities3 = __toESM(require_rulePriorities());
      init_dnr_config_rulesets();
      init_dnr_utils();
      import_utils7 = __toESM(require_utils());
    }
  });

  // shared/js/background/tab-manager.js
  var require_tab_manager = __commonJS({
    "shared/js/background/tab-manager.js"(exports2, module2) {
      "use strict";
      var Companies3 = require_companies();
      var settings13 = require_settings();
      var Tab = require_tab();
      var ServiceWorkerTab = require_sw_tab();
      var { TabState: TabState3 } = (init_tab_state(), __toCommonJS(tab_state_exports));
      var browserWrapper5 = (init_wrapper(), __toCommonJS(wrapper_exports));
      var {
        toggleUserAllowlistDomain: toggleUserAllowlistDomain2,
        updateUserDenylist: updateUserDenylist2
      } = (init_dnr_user_allowlist(), __toCommonJS(dnr_user_allowlist_exports));
      var {
        clearClickToLoadDnrRulesForTab: clearClickToLoadDnrRulesForTab2
      } = (init_dnr_click_to_load(), __toCommonJS(dnr_click_to_load_exports));
      var persistentTabProperties = [
        "ampUrl",
        "cleanAmpUrl",
        "dnrRuleIdsByDisabledClickToLoadRuleAction",
        "userRefreshCount"
      ];
      var TabManager = class {
        constructor() {
          this.tabContainer = {};
          this.swContainer = {};
        }
        /* This overwrites the current tab data for a given
         * id and is only called in three cases:
         * 1. When a new tab is opened. See onUpdated listener below
         * 2. When we get a new main_frame request
         */
        create(tabData) {
          const normalizedData = browserWrapper5.normalizeTabData(tabData);
          const newTab = new Tab(normalizedData);
          const oldTab = this.tabContainer[newTab.id];
          if (oldTab) {
            for (const property of persistentTabProperties) {
              newTab[property] = oldTab[property];
            }
            if (oldTab.adClick?.shouldPropagateAdClickForNavigation(oldTab)) {
              newTab.adClick = oldTab.adClick.clone();
            }
          }
          this.tabContainer[newTab.id] = newTab;
          return newTab;
        }
        async restoreOrCreate(tabData) {
          const restored = await this.restore(tabData.id);
          if (!restored) {
            await this.create(tabData);
          }
        }
        async restore(tabId) {
          const restoredState = await Tab.restore(tabId);
          if (restoredState) {
            this.tabContainer[tabId] = restoredState;
          }
          return restoredState;
        }
        delete(id) {
          const tabToRemove = this.tabContainer[id];
          if (tabToRemove) {
            tabToRemove?.adClick?.removeDNR();
            if (browserWrapper5.getManifestVersion() === 3) {
              clearClickToLoadDnrRulesForTab2(tabToRemove);
            }
          }
          delete this.tabContainer[id];
          TabState3.delete(id);
        }
        has(id) {
          return id in this.tabContainer;
        }
        /**
         * Called using either a chrome tab object or by id
         * get({tabId: ###});
         * @returns {Tab}
         */
        get(tabData) {
          if (tabData.tabId === -1 && (tabData.initiator || tabData.documentUrl)) {
            const swUrl = tabData.initiator || tabData.documentUrl;
            const swOrigin = new URL(swUrl).origin;
            if (!this.swContainer[swOrigin]) {
              this.swContainer[swOrigin] = new ServiceWorkerTab(swUrl, this.tabContainer);
            }
            return this.swContainer[swOrigin];
          }
          return this.tabContainer[tabData.tabId];
        }
        async getOrRestoreTab(tabId) {
          if (!tabManager3.has(tabId)) {
            await tabManager3.restore(tabId);
          }
          return tabManager3.get({ tabId });
        }
        /**
         * This will allowlist any open tabs with the same domain
         *
         * @param {object} data
         * @param {allowlistName} data.list - name of the allowlist to update
         * @param {string} data.domain - domain to allowlist
         * @param {boolean} data.value - allowlist value, true or false
         * @return {Promise}
         */
        async setList(data) {
          this.setGlobalAllowlist(data.list, data.domain, data.value);
          const allTabs = [
            ...Object.keys(this.tabContainer).map((tabId) => this.tabContainer[tabId]),
            ...Object.keys(this.swContainer).map((origin) => this.swContainer[origin])
          ];
          allTabs.filter((tab) => tab.site && tab.site.domain === data.domain).forEach((tab) => {
            tab.site.setListValue(data.list, data.value);
          });
          if (browserWrapper5.getManifestVersion() === 3) {
            if (data.list === "allowlisted") {
              await toggleUserAllowlistDomain2(data.domain, data.value);
            } else if (data.list === "denylisted") {
              await updateUserDenylist2();
            }
          }
        }
        /**
         * Update the allowlists kept in settings
         *
         * @param {allowlistName} list
         * @param {string} domain
         * @param {boolean} value
         */
        setGlobalAllowlist(list, domain, value) {
          const globalallowlist = settings13.getSetting(list) || {};
          if (value) {
            globalallowlist[domain] = true;
          } else {
            delete globalallowlist[domain];
          }
          settings13.updateSetting(list, globalallowlist);
        }
        /* This handles the new tab case. You have clicked to
         * open a new tab and haven't typed in a url yet.
         * This will fire an onUpdated event and we can create
         * an intital tab instance here. We'll update this instance
         * later on when webrequests start coming in.
         */
        createOrUpdateTab(id, info) {
          if (!tabManager3.get({ tabId: id })) {
            info.id = id;
            return tabManager3.create(info);
          } else {
            const tab = tabManager3.get({ tabId: id });
            if (tab && info.status) {
              tab.status = info.status;
              if (tab.status === "complete") {
                const hasHttps = !!(tab.url && tab.url.match(/^https:\/\//));
                tab.site.grade.setHttps(hasHttps, hasHttps);
                console.info(tab.site.grade);
                if (tab.statusCode === 200 && !tab.site.didIncrementCompaniesData) {
                  if (tab.trackers && Object.keys(tab.trackers).length > 0) {
                    Companies3.incrementTotalPagesWithTrackers();
                  }
                  Companies3.incrementTotalPages();
                  tab.site.didIncrementCompaniesData = true;
                }
              }
            }
            return tab;
          }
        }
        updateTabUrl(request) {
          const tab = tabManager3.get({ tabId: request.tabId });
          if (tab) {
            tab.statusCode = request.statusCode;
            if (tab.statusCode === 200) {
              tab.updateSite(request.url);
            }
          }
        }
      };
      var tabManager3 = new TabManager();
      module2.exports = tabManager3;
    }
  });

  // shared/js/background/tracker-utils.js
  var tracker_utils_exports = {};
  __export(tracker_utils_exports, {
    hasTrackerListLoaded: () => hasTrackerListLoaded,
    isFirstPartyByEntity: () => isFirstPartyByEntity,
    isSameEntity: () => isSameEntity,
    isTracker: () => isTracker,
    truncateReferrer: () => truncateReferrer
  });
  function hasTrackerListLoaded() {
    return !!import_trackers2.default.trackerList;
  }
  function isSameEntity(url1, url2) {
    try {
      const domain1 = (0, import_tldts3.parse)(url1).domain;
      const domain2 = (0, import_tldts3.parse)(url2).domain;
      if (domain1 === domain2) return true;
      const entity1 = import_trackers2.default.findWebsiteOwner({ siteUrlSplit: extractHostFromURL(url1).split(".") });
      const entity2 = import_trackers2.default.findWebsiteOwner({ siteUrlSplit: extractHostFromURL(url2).split(".") });
      if (entity1 === void 0 && entity2 === void 0) return false;
      return entity1 === entity2;
    } catch (e) {
      return false;
    }
  }
  function isTracker(url) {
    const data = {
      urlToCheckSplit: extractHostFromURL(url).split(".")
    };
    const tracker = import_trackers2.default.findTracker(data);
    return !!tracker;
  }
  function truncateReferrer(referrer, target) {
    if (!referrer || referrer === "") {
      return void 0;
    }
    if (isSafeListed(referrer) || isSafeListed(target)) {
      return void 0;
    }
    const { fromCname, finalURL } = import_trackers2.default.resolveCname(target);
    if (isSameEntity(referrer, target) && (!fromCname || isSameEntity(referrer, finalURL))) {
      return void 0;
    }
    const exceptionList = tds_default.config.features.referrer.exceptions;
    if (brokenListIndex(referrer, exceptionList) !== -1 || brokenListIndex(target, exceptionList) !== -1) {
      return void 0;
    }
    return extractLimitedDomainFromURL(referrer, { keepSubdomains: true });
  }
  function isFirstPartyByEntity(trackerUrl, siteUrl) {
    const cnameResolution = import_trackers2.default.resolveCname(trackerUrl);
    trackerUrl = cnameResolution.finalURL;
    if (isSameTopLevelDomain(trackerUrl, siteUrl)) {
      return true;
    }
    const trackerDomain = (0, import_tldts3.parse)(trackerUrl).domain;
    if (!trackerDomain) return false;
    const trackerOwner = import_trackers2.default.findTrackerOwner(trackerDomain);
    const websiteOwner = import_trackers2.default.findWebsiteOwner({ siteUrlSplit: extractHostFromURL(siteUrl).split(".") });
    return trackerOwner && websiteOwner ? trackerOwner === websiteOwner : false;
  }
  var import_trackers2, import_tldts3;
  var init_tracker_utils = __esm({
    "shared/js/background/tracker-utils.js"() {
      "use strict";
      init_utils();
      import_trackers2 = __toESM(require_trackers2());
      import_tldts3 = __toESM(require_cjs());
      init_tds();
    }
  });

  // shared/js/background/devtools.js
  var devtools_exports = {};
  __export(devtools_exports, {
    isActive: () => isActive,
    postMessage: () => postMessage,
    registerDevtools: () => registerDevtools
  });
  function registerDevtools(newDevtools) {
    devtools = newDevtools;
  }
  function isActive(tabId) {
    if (devtools) {
      return devtools.isActive(tabId);
    }
    return false;
  }
  function postMessage(tabId, action, message) {
    if (devtools) {
      devtools.postMessage(tabId, action, message);
    }
  }
  var devtools;
  var init_devtools = __esm({
    "shared/js/background/devtools.js"() {
      "use strict";
      devtools = null;
    }
  });

  // shared/js/background/classes/legacy-tab-transfer.js
  var legacy_tab_transfer_exports = {};
  __export(legacy_tab_transfer_exports, {
    LegacyTabTransfer: () => LegacyTabTransfer
  });
  function isPrimitive(value) {
    return Object(value) !== value;
  }
  function isStructuredCloneable(value) {
    return isPrimitive(value) || Array.isArray(value);
  }
  function cloneClassObject(object) {
    if (isStructuredCloneable(object)) {
      return structuredClone(object);
    }
    const out = {};
    for (const key of Object.keys(object)) {
      const value = object[key];
      if (key.startsWith("_")) {
        continue;
      }
      if (isStructuredCloneable(value)) {
        out[key] = structuredClone(value);
      } else {
        out[key] = cloneClassObject(value);
      }
    }
    if (hasModifiedPrototype(object)) {
      const objectDescriptors = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(object));
      for (const [key, value] of Object.entries(objectDescriptors)) {
        if (typeof value.get === "function") {
          out[key] = cloneClassObject(object[key]);
        }
      }
    }
    return out;
  }
  function hasModifiedPrototype(object) {
    return Object.getPrototypeOf(object) !== Object.getPrototypeOf({});
  }
  var LegacyTabTransfer;
  var init_legacy_tab_transfer = __esm({
    "shared/js/background/classes/legacy-tab-transfer.js"() {
      "use strict";
      LegacyTabTransfer = class {
        /**
         * @param {import('./tab')} tab
         */
        constructor(tab) {
          const clonedTab = cloneClassObject(tab);
          const entries = Object.entries(clonedTab);
          for (const [key] of entries) {
            this[key] = clonedTab[key];
          }
        }
      };
    }
  });

  // shared/js/background/helpers/arguments-object.js
  function getArgumentsObject(tabId, sender, documentUrl, sessionKey) {
    const tab = tabManager.get({ tabId });
    if (!tab || !tab.url) {
      return null;
    }
    const tabClone = new LegacyTabTransfer2(tab);
    const site = tabClone.site;
    let cookie = {};
    if (sender.url === "about:blank") {
      const aboutBlankEnabled = utils2.getEnabledFeaturesAboutBlank(tab.url);
      site.enabledFeatures = site.enabledFeatures.filter((feature) => aboutBlankEnabled.includes(feature));
    }
    site.enabledFeatures = site.enabledFeatures.filter((feature) => {
      if (feature === "trackerAllowlist") return false;
      if (feature === "referrer" && !tab.referrer?.referrer) return false;
      return true;
    });
    const featureSettings = {};
    for (const feature of site.enabledFeatures) {
      const featureSetting = utils2.getFeatureSettings(feature);
      if (Object.keys(featureSetting).length) {
        featureSettings[feature] = featureSetting;
      }
    }
    if (tab.site.isFeatureEnabled("cookie")) {
      cookie = {
        isThirdPartyFrame: false,
        shouldBlock: false,
        isTracker: false,
        isFrame: false
      };
      if (sender.frameId !== 0) {
        cookie.isFrame = true;
      }
      if (trackerutils.hasTrackerListLoaded()) {
        if (documentUrl && trackerutils.isTracker(documentUrl)) {
          cookie.isTracker = true;
        }
        cookie.isThirdPartyFrame = !trackerutils.isFirstPartyByEntity(documentUrl, tab.url);
      }
      cookie.shouldBlock = !utils2.isCookieExcluded(documentUrl);
    }
    return {
      featureSettings,
      debug: isActive2(tabId),
      cookie,
      globalPrivacyControlValue: settings11.getSetting("GPC"),
      stringExemptionLists: utils2.getBrokenScriptLists(),
      sessionKey,
      site,
      platform: constants2.platform,
      locale: getUserLocale(),
      assets: {
        regularFontUrl: getExtensionURL("/public/font/ProximaNova-Reg-webfont.woff"),
        boldFontUrl: getExtensionURL("/public/font/ProximaNova-Bold-webfont.woff")
      }
    };
  }
  var utils2, tabManager, trackerutils, settings11, isActive2, constants2, LegacyTabTransfer2;
  var init_arguments_object = __esm({
    "shared/js/background/helpers/arguments-object.js"() {
      "use strict";
      init_i18n();
      init_wrapper();
      utils2 = (init_utils(), __toCommonJS(utils_exports));
      tabManager = require_tab_manager();
      trackerutils = (init_tracker_utils(), __toCommonJS(tracker_utils_exports));
      settings11 = require_settings();
      ({ isActive: isActive2 } = (init_devtools(), __toCommonJS(devtools_exports)));
      constants2 = require_constants();
      ({ LegacyTabTransfer: LegacyTabTransfer2 } = (init_legacy_tab_transfer(), __toCommonJS(legacy_tab_transfer_exports)));
    }
  });

  // shared/js/background/components/fire-button.js
  var import_webextension_polyfill4, import_tldts4, isFireButtonEnabled;
  var init_fire_button = __esm({
    "shared/js/background/components/fire-button.js"() {
      "use strict";
      import_webextension_polyfill4 = __toESM(require_browser_polyfill());
      init_message_handlers();
      init_utils();
      init_wrapper();
      import_tldts4 = __toESM(require_cjs());
      isFireButtonEnabled = true;
    }
  });

  // shared/js/background/message-handlers.js
  async function registeredContentScript(options, sender, req) {
    const sessionKey = await utils3.getSessionKey();
    const argumentsObject = getArgumentsObject(sender.tab.id, sender, options?.documentUrl || req.documentUrl, sessionKey);
    if (!argumentsObject) {
      return;
    }
    return argumentsObject;
  }
  function resetTrackersData() {
    return Companies2.resetData();
  }
  function getExtensionVersion2() {
    return browserWrapper4.getExtensionVersion();
  }
  function setList(options) {
    tabManager2.setList(options);
  }
  async function setLists(options) {
    for (const listItem of options.lists) {
      await tabManager2.setList(listItem);
    }
    try {
      notifyPopup({ closePopup: true });
      reloadCurrentTab();
    } catch (e) {
      console.error("Error trying to reload+refresh following `setLists` message", e);
    }
  }
  function allowlistOptIn(optInData) {
    tabManager2.setGlobalAllowlist("allowlistOptIn", optInData.domain, optInData.value);
  }
  function getBrowser() {
    return browserName;
  }
  function openOptions() {
    if (browserName === "moz") {
      import_webextension_polyfill5.default.tabs.create({ url: getExtensionURL("/html/options.html") });
    } else {
      import_webextension_polyfill5.default.runtime.openOptionsPage();
    }
  }
  async function submitBrokenSiteReport(breakageReport) {
    const { category, description } = breakageReport;
    const currentTab = await utils3.getCurrentTab();
    if (!currentTab?.id) {
      console.error("could not access the current tab...");
      return;
    }
    const tab = await getTab(currentTab.id);
    if (!tab) {
      console.error("cannot access current tab with ID " + currentTab.id);
      return;
    }
    const pageParams = await import_webextension_polyfill5.default.tabs.sendMessage(currentTab.id, { getBreakagePageParams: true }) || {};
    const tds = settings12.getSetting("tds-etag");
    const remoteConfigEtag = settings12.getSetting("config-etag");
    const remoteConfigVersion = tds_default.config.version;
    return breakageReportForTab({ tab, tds, remoteConfigEtag, remoteConfigVersion, category, description, pageParams });
  }
  async function getTab(tabId) {
    await settings12.ready();
    await tds_default.ready("config");
    return tabManager2.getOrRestoreTab(tabId);
  }
  async function getPrivacyDashboardData(options) {
    let { tabId } = options;
    if (tabId === null) {
      const currentTab = await utils3.getCurrentTab();
      if (!currentTab?.id) {
        throw new Error("could not get the current tab...");
      }
      tabId = currentTab?.id;
    }
    const tab = await getTab(tabId);
    if (!tab) throw new Error("unreachable - cannot access current tab with ID " + tabId);
    const userData = settings12.getSetting("userData");
    const fireButtonData = {
      enabled: isFireButtonEnabled
    };
    return dashboardDataFromTab(tab, userData, fireButtonData);
  }
  function getTopBlockedByPages(options) {
    return Companies2.getTopBlockedByPages(options);
  }
  async function getClickToLoadState() {
    const devMode = await browserWrapper4.getFromSessionStorage("dev") || false;
    await settings12.ready();
    const youtubePreviewsEnabled = await settings12.getSetting("youtubePreviewsEnabled") || false;
    return { devMode, youtubePreviewsEnabled };
  }
  async function getYouTubeVideoDetails(videoURL) {
    const endpointURL = new URL("https://www.youtube.com/oembed?format=json");
    const parsedVideoURL = new URL(videoURL);
    const playlistID = parsedVideoURL.searchParams.get("list");
    const videoId = parsedVideoURL.pathname.split("/").pop();
    if (playlistID) {
      parsedVideoURL.hostname = endpointURL.hostname;
      endpointURL.searchParams.set("url", parsedVideoURL.href);
    } else {
      endpointURL.searchParams.set("url", "https://youtu.be/" + videoId);
    }
    try {
      const youTubeVideoResponse = await fetch(
        endpointURL.href,
        {
          referrerPolicy: "no-referrer",
          credentials: "omit"
        }
      ).then((response) => response.json());
      const { title, thumbnail_url: previewImage } = youTubeVideoResponse;
      return { status: "success", videoURL, title, previewImage };
    } catch (e) {
      return { status: "failed", videoURL };
    }
  }
  function getCurrentTab2() {
    return utils3.getCurrentTab();
  }
  async function unblockClickToLoadContent(data, sender) {
    const tab = tabManager2.get({ tabId: sender.tab.id });
    if (!tab.disabledClickToLoadRuleActions.includes(data.action)) {
      tab.disabledClickToLoadRuleActions.push(data.action);
    }
    if (browserWrapper4.getManifestVersion() === 3) {
      await ensureClickToLoadRuleActionDisabled(data.action, tab);
    }
  }
  function updateYouTubeCTLAddedFlag(value, sender) {
    const tab = tabManager2.get({ tabId: sender.tab.id });
    tab.ctlYouTube = Boolean(value);
  }
  function updateFacebookCTLBreakageFlags({ ctlFacebookPlaceholderShown = false, ctlFacebookLogin = false }, sender) {
    const tabId = sender?.tab?.id;
    if (typeof tabId === "undefined") {
      return;
    }
    const tab = tabManager2.get({ tabId });
    if (ctlFacebookPlaceholderShown) {
      tab.ctlFacebookPlaceholderShown = true;
    }
    if (ctlFacebookLogin) {
      tab.ctlFacebookLogin = true;
    }
  }
  function setYoutubePreviewsEnabled(value, sender) {
    return updateSetting({ name: "youtubePreviewsEnabled", value });
  }
  async function updateSetting({ name, value }) {
    await settings12.ready();
    settings12.updateSetting(name, value);
    utils3.sendAllTabsMessage({ messageType: `ddg-settings-${name}`, value });
    return { messageType: `ddg-settings-${name}`, value };
  }
  async function getSetting({ name }) {
    await settings12.ready();
    return settings12.getSetting(name);
  }
  function getTopBlocked(options) {
    return Companies2.getTopBlocked(options);
  }
  function getListContents(list) {
    const loader = globalThis.components.tds[list];
    return {
      data: tds_default.getSerializableList(list),
      etag: loader.etag
    };
  }
  async function setListContents({ name, value }) {
    const loader = globalThis.components.tds[name];
    await loader.overrideDataValue(value);
    return loader.etag;
  }
  async function reloadList(listName) {
    await globalThis.components.tds[listName].checkForUpdates(true);
  }
  function debuggerMessage(message, sender) {
    devtools2.postMessage(sender.tab?.id, message.action, message.message);
  }
  function search({ term }) {
    const browserInfo2 = (0, import_parse_user_agent_string2.default)();
    if (browserInfo2?.os) {
      const url = new URL("https://duckduckgo.com");
      url.searchParams.set("q", term);
      url.searchParams.set("bext", browserInfo2.os + "cr");
      import_webextension_polyfill5.default.tabs.create({ url: url.toString() });
    }
  }
  function openShareFeedbackPage() {
    return browserWrapper4.openExtensionPage("/html/feedback.html");
  }
  async function isClickToLoadYoutubeEnabled() {
    await tds_default.ready("config");
    return isFeatureEnabled("clickToLoad") && tds_default?.config?.features?.clickToLoad?.settings?.Youtube?.state === "enabled";
  }
  function addDebugFlag(message, sender, req) {
    const tab = tabManager2.get({ tabId: sender.tab.id });
    const flags = new Set(tab.debugFlags);
    flags.add(message.flag);
    tab.debugFlags = [...flags];
  }
  function registerMessageHandler(name, func) {
    if (messageHandlers[name]) {
      throw new Error(`Attempt to re-register existing message handler ${name}`);
    }
    messageHandlers[name] = func;
  }
  var import_webextension_polyfill5, import_parse_user_agent_string2, utils3, settings12, tabManager2, Companies2, browserName, devtools2, browserWrapper4, messageHandlers;
  var init_message_handlers = __esm({
    "shared/js/background/message-handlers.js"() {
      "use strict";
      import_webextension_polyfill5 = __toESM(require_browser_polyfill());
      init_privacy_dashboard_data();
      init_broken_site_report();
      import_parse_user_agent_string2 = __toESM(require_parse_user_agent_string());
      init_wrapper();
      init_utils();
      init_dnr_click_to_load();
      init_tds();
      init_arguments_object();
      init_fire_button();
      utils3 = (init_utils(), __toCommonJS(utils_exports));
      settings12 = require_settings();
      tabManager2 = require_tab_manager();
      Companies2 = require_companies();
      browserName = utils3.getBrowserName();
      devtools2 = (init_devtools(), __toCommonJS(devtools_exports));
      browserWrapper4 = (init_wrapper(), __toCommonJS(wrapper_exports));
      messageHandlers = {
        registeredContentScript,
        resetTrackersData,
        getExtensionVersion: getExtensionVersion2,
        setList,
        setLists,
        allowlistOptIn,
        getBrowser,
        openOptions,
        submitBrokenSiteReport,
        getTab,
        getPrivacyDashboardData,
        getTopBlockedByPages,
        getClickToLoadState,
        getYouTubeVideoDetails,
        getCurrentTab: getCurrentTab2,
        unblockClickToLoadContent,
        updateYouTubeCTLAddedFlag,
        updateFacebookCTLBreakageFlags,
        setYoutubePreviewsEnabled,
        updateSetting,
        getSetting,
        getTopBlocked,
        getListContents,
        setListContents,
        reloadList,
        debuggerMessage,
        search,
        openShareFeedbackPage,
        isClickToLoadYoutubeEnabled,
        addDebugFlag
      };
    }
  });

  // shared/js/background/components/email-autofill.js
  var email_autofill_exports = {};
  __export(email_autofill_exports, {
    REFETCH_ALIAS_ALARM: () => REFETCH_ALIAS_ALARM,
    default: () => EmailAutofill,
    formatAddress: () => formatAddress,
    isValidToken: () => isValidToken,
    isValidUsername: () => isValidUsername
  });
  function currentDate() {
    return (/* @__PURE__ */ new Date()).toLocaleString("en-CA", {
      timeZone: "America/New_York",
      dateStyle: "short"
    });
  }
  function isExpectedSender(sender) {
    try {
      const domain = (0, import_tldts5.getDomain)(sender.url);
      const { pathname } = new URL(sender.url);
      return domain === "duckduckgo.com" && pathname.startsWith("/email");
    } catch {
      return false;
    }
  }
  function getEmailProtectionCapabilities(_, sender) {
    if (!isExpectedSender(sender)) return;
    return {
      addUserData: true,
      getUserData: true,
      removeUserData: true
    };
  }
  var import_webextension_polyfill6, import_tldts5, MENU_ITEM_ID, REFETCH_ALIAS_ALARM, REFETCH_ALIAS_ATTEMPT, EmailAutofill, formatAddress, isValidUsername, isValidToken;
  var init_email_autofill = __esm({
    "shared/js/background/components/email-autofill.js"() {
      "use strict";
      import_webextension_polyfill6 = __toESM(require_browser_polyfill());
      init_pixels();
      init_message_handlers();
      import_tldts5 = __toESM(require_cjs());
      init_tds();
      init_utils();
      init_wrapper();
      MENU_ITEM_ID = "ddg-autofill-context-menu-item";
      REFETCH_ALIAS_ALARM = "refetchAlias";
      REFETCH_ALIAS_ATTEMPT = "refetchAliasAttempt";
      EmailAutofill = class {
        /**
         * @param {{
         *  settings: import('../settings.js');
         * }} options
         */
        constructor({ settings: settings13 }) {
          this.settings = settings13;
          this.contextMenuAvailable = !!import_webextension_polyfill6.default.contextMenus;
          if (this.contextMenuAvailable) {
            import_webextension_polyfill6.default.contextMenus.create({
              id: MENU_ITEM_ID,
              title: "Generate Private Duck Address",
              contexts: ["editable"],
              documentUrlPatterns: ["https://*/*"],
              visible: false
            }, () => {
              const { lastError } = import_webextension_polyfill6.default.runtime;
              if (lastError && lastError.message && !lastError.message.startsWith("Cannot create item with duplicate id")) {
                throw lastError;
              }
            });
            import_webextension_polyfill6.default.contextMenus.onClicked.addListener((info, tab) => {
              const userData = this.settings.getSetting("userData");
              if (tab?.id && userData.nextAlias) {
                import_webextension_polyfill6.default.tabs.sendMessage(tab.id, {
                  type: "contextualAutofill",
                  alias: userData.nextAlias
                });
              }
            });
          }
          import_webextension_polyfill6.default.alarms.onAlarm.addListener((alarmEvent) => {
            if (alarmEvent.name === REFETCH_ALIAS_ALARM) {
              this.fetchAlias();
            }
          });
          registerMessageHandler("getAddresses", this.getAddresses.bind(this));
          registerMessageHandler("sendJSPixel", this.sendJSPixel.bind(this));
          registerMessageHandler("getAlias", this.getAlias.bind(this));
          registerMessageHandler("refreshAlias", this.refreshAlias.bind(this));
          registerMessageHandler("getEmailProtectionCapabilities", getEmailProtectionCapabilities);
          registerMessageHandler("getIncontextSignupDismissedAt", this.getIncontextSignupDismissedAt.bind(this));
          registerMessageHandler("setIncontextSignupPermanentlyDismissedAt", this.setIncontextSignupPermanentlyDismissedAt.bind(this));
          registerMessageHandler("getUserData", this.getUserData.bind(this));
          registerMessageHandler("addUserData", this.addUserData.bind(this));
          registerMessageHandler("removeUserData", this.removeUserData.bind(this));
          registerMessageHandler("logout", this.logout.bind(this));
          this.ready = this.init();
        }
        async init() {
          await this.settings.ready();
          const userData = this.settings.getSetting("userData");
          if (userData && userData.token) {
            if (!userData.nextAlias) await this.fetchAlias();
            this.showContextMenuAction();
          }
        }
        async fetchAlias() {
          await this.settings.ready();
          import_webextension_polyfill6.default.alarms.clear(REFETCH_ALIAS_ALARM);
          const userData = this.settings.getSetting("userData");
          if (!userData?.token) return;
          return fetch("https://quack.duckduckgo.com/api/email/addresses", {
            method: "post",
            headers: { Authorization: `Bearer ${userData.token}` }
          }).then(async (response) => {
            if (response.ok) {
              return response.json().then(async ({ address }) => {
                if (!/^[a-z0-9-]+$/.test(address)) throw new Error("Invalid address");
                this.settings.updateSetting("userData", Object.assign(userData, { nextAlias: `${address}` }));
                await removeFromSessionStorage(REFETCH_ALIAS_ATTEMPT);
                return { success: true };
              });
            } else {
              throw new Error("An error occurred while fetching the alias");
            }
          }).catch(async (e) => {
            console.log("Error fetching new alias", e);
            const attempts = await getFromSessionStorage(REFETCH_ALIAS_ATTEMPT) || 1;
            if (attempts < 5) {
              createAlarm(REFETCH_ALIAS_ALARM, { delayInMinutes: 2 });
              await setToSessionStorage(REFETCH_ALIAS_ATTEMPT, attempts + 1);
            }
            return { error: e };
          });
        }
        async getAlias() {
          await this.settings.ready();
          const userData = this.settings.getSetting("userData");
          return { alias: userData?.nextAlias };
        }
        /**
         * @returns {Promise<import('@duckduckgo/privacy-dashboard/schema/__generated__/schema.types').RefreshAliasResponse>}
         */
        async refreshAlias() {
          await this.fetchAlias();
          return this.getAddresses();
        }
        getAddresses() {
          const userData = this.settings.getSetting("userData");
          return {
            personalAddress: userData?.userName,
            privateAddress: userData?.nextAlias
          };
        }
        showContextMenuAction() {
          if (this.contextMenuAvailable) {
            import_webextension_polyfill6.default.contextMenus.update(MENU_ITEM_ID, { visible: true });
          }
        }
        hideContextMenuAction() {
          if (this.contextMenuAvailable) {
            import_webextension_polyfill6.default.contextMenus.update(MENU_ITEM_ID, { visible: false });
          }
        }
        /**
         *
         * @param {FirePixelOptions}  options
         */
        sendJSPixel(options) {
          const { pixelName } = options;
          switch (pixelName) {
            case "autofill_show":
              this.fireAutofillPixel("email_tooltip_show");
              break;
            case "autofill_private_address":
              this.fireAutofillPixel("email_filled_random", true);
              break;
            case "autofill_personal_address":
              this.fireAutofillPixel("email_filled_main", true);
              break;
            case "incontext_show":
              sendPixelRequest("incontext_show");
              break;
            case "incontext_primary_cta":
              sendPixelRequest("incontext_primary_cta");
              break;
            case "incontext_dismiss_persisted":
              sendPixelRequest("incontext_dismiss_persisted");
              break;
            case "incontext_close_x":
              sendPixelRequest("incontext_close_x");
              break;
            default:
              getFromSessionStorage("dev").then((isDev) => {
                if (isDev) console.error("Unknown pixel name", pixelName);
              });
          }
        }
        fireAutofillPixel(pixel, shouldUpdateLastUsed = false) {
          const userData = this.settings.getSetting("userData");
          if (!userData?.userName) return;
          const lastAddressUsedAt = this.settings.getSetting("lastAddressUsedAt") ?? "";
          sendPixelRequest(pixel, { duck_address_last_used: lastAddressUsedAt, cohort: userData.cohort });
          if (shouldUpdateLastUsed) {
            this.settings.updateSetting("lastAddressUsedAt", currentDate());
          }
        }
        getIncontextSignupDismissedAt() {
          const permanentlyDismissedAt = this.settings.getSetting("incontextSignupPermanentlyDismissedAt");
          const installedDays = tds_default.config.features.incontextSignup?.settings?.installedDays ?? 3;
          const isInstalledRecently = isInstalledWithinDays(installedDays);
          return { success: { permanentlyDismissedAt, isInstalledRecently } };
        }
        setIncontextSignupPermanentlyDismissedAt({ value }) {
          this.settings.updateSetting("incontextSignupPermanentlyDismissedAt", value);
        }
        // Get user data to be used by the email web app settings page. This includes
        // username, last alias, and a token for generating additional aliases.
        async getUserData(_, sender) {
          if (!isExpectedSender(sender)) return;
          await this.settings.ready();
          const userData = this.settings.getSetting("userData");
          if (userData) {
            return userData;
          } else {
            return { error: "Something seems wrong with the user data" };
          }
        }
        async addUserData(userData, sender) {
          const { userName, token } = userData;
          if (!isExpectedSender(sender)) return;
          const sendDdgUserReady = async () => {
            const tabs = await import_webextension_polyfill6.default.tabs.query({});
            tabs.forEach(
              (tab) => sendTabMessage(tab.id, { type: "ddgUserReady" })
            );
          };
          await this.settings.ready();
          const { existingToken } = this.settings.getSetting("userData") || {};
          if (existingToken === token) {
            sendDdgUserReady();
            return { success: true };
          }
          if (isValidUsername(userName) && isValidToken(token)) {
            this.settings.updateSetting("userData", userData);
            const response = await this.fetchAlias();
            if (response && "error" in response) {
              return { error: response.error.message };
            }
            sendDdgUserReady();
            this.showContextMenuAction();
            return { success: true };
          } else {
            return { error: "Something seems wrong with the user data" };
          }
        }
        async removeUserData(_, sender) {
          if (!isExpectedSender(sender)) return;
          await this.logout();
        }
        async logout() {
          this.settings.updateSetting("userData", {});
          this.settings.updateSetting("lastAddressUsedAt", "");
          const tabs = await import_webextension_polyfill6.default.tabs.query({});
          tabs.forEach((tab) => {
            sendTabMessage(tab.id, { type: "logout" });
          });
          this.hideContextMenuAction();
        }
      };
      formatAddress = (address) => address + "@duck.com";
      isValidUsername = (userName) => /^[a-z0-9_]+$/.test(userName);
      isValidToken = (token) => /^[a-z0-9]+$/.test(token);
    }
  });

  // shared/js/ui/templates/user-data.js
  var require_user_data3 = __commonJS({
    "shared/js/ui/templates/user-data.js"(exports2, module2) {
      "use strict";
      var bel2 = require_browser();
      var raw = require_raw_browser();
      var { formatAddress: formatAddress2 } = (init_email_autofill(), __toCommonJS(email_autofill_exports));
      var t2 = window.DDG.base.i18n.t;
      module2.exports = function() {
        return bel2`<section class="options-content__user-data divider-bottom">
        <h2 class="menu-title">${t2("options:emailProtection.title")}</h2>
        ${renderUserDataContent(this.model)}
    </section>`;
      };
      function renderUserDataContent(model) {
        return !model.userName ? bel2`<div>
                <p class="menu-paragraph">${t2("options:autofillDisabled.title")}</p>
                <p class="options-info">
                    <a href="https://duckduckgo.com/email/enable-autofill">${t2("shared:enable.title")}</a>
                </p>
            </div>` : bel2`<div>
                <p class="menu-paragraph">
                    ${raw(t2("options:autofillEnabled.title", { userName: formatAddress2(model.userName) }))}
                </p>
                <p class="options-info js-userdata-logout">
                    <a href="#">${t2("shared:disable.title")}</a>
                </p>
            </div>`;
      }
    }
  });

  // shared/js/ui/base/ui-wrapper.js
  var ui_wrapper_exports = {};
  __export(ui_wrapper_exports, {
    backgroundMessage: () => backgroundMessage,
    getExtensionURL: () => getExtensionURL2,
    openExtensionPage: () => openExtensionPage2,
    sendMessage: () => sendMessage
  });
  var import_webextension_polyfill7, sendMessage, backgroundMessage, getExtensionURL2, openExtensionPage2;
  var init_ui_wrapper = __esm({
    "shared/js/ui/base/ui-wrapper.js"() {
      "use strict";
      import_webextension_polyfill7 = __toESM(require_browser_polyfill());
      sendMessage = async (messageType, options) => {
        return await import_webextension_polyfill7.default.runtime.sendMessage({ messageType, options });
      };
      backgroundMessage = (thisModel) => {
        import_webextension_polyfill7.default.runtime.onMessage.addListener((req, sender) => {
          if (sender.id !== import_webextension_polyfill7.default.runtime.id) return;
          if (req.updateTabData) thisModel.send("updateTabData");
          if (req.didResetTrackersData) thisModel.send("didResetTrackersData", req.didResetTrackersData);
          if (req.closePopup) window.close();
        });
      };
      getExtensionURL2 = (path) => {
        return import_webextension_polyfill7.default.runtime.getURL(path);
      };
      openExtensionPage2 = (path) => {
        import_webextension_polyfill7.default.tabs.create({ url: getExtensionURL2(path) });
      };
    }
  });

  // shared/js/ui/models/background-message.js
  var require_background_message = __commonJS({
    "shared/js/ui/models/background-message.js"(exports2, module2) {
      "use strict";
      var Parent2 = window.DDG.base.Model;
      var browserUIWrapper2 = (init_ui_wrapper(), __toCommonJS(ui_wrapper_exports));
      function BackgroundMessage(attrs) {
        Parent2.call(this, attrs);
        const thisModel = this;
        browserUIWrapper2.backgroundMessage(thisModel);
      }
      BackgroundMessage.prototype = window.$.extend(
        {},
        Parent2.prototype,
        {
          modelName: "backgroundMessage"
        }
      );
      module2.exports = BackgroundMessage;
    }
  });

  // shared/js/ui/views/internal-options.js
  var internal_options_exports = {};
  __export(internal_options_exports, {
    default: () => InternalOptionsView
  });
  function template() {
    if (this.model.isInternalUser) {
      const buttonState = this._buttonState();
      const buttonDisabled = buttonState.endsWith("disabled");
      const buttonText = buttonDisabled ? buttonState.slice(0, buttonState.length - 9) : buttonState;
      return import_nanohtml.default`<section class="options-content__allowlist divider-bottom">
            <h2 class="menu-title">Internal settings</h2>
            <ul class="default-list">
                <li>
                    <p class="menu-paragraph">
                        Internal-only settings for debugging the extension.
                    </p>
                </li>
                <li>
                    <p class="options-info">Custom config URL</p>
                    <input class="allowlist-url js-options-config-url" type="text" placeholder="Privacy Configuration URL" value="${this.model.debuggingSettings?.configURLOverride}" />
                    <button class="custom-config-button float-right js-options-set-config-url" ${buttonDisabled ? "disabled" : ""}>${buttonText}</button>
                </li>
            </ul>
        </section>`;
    }
    return import_nanohtml.default`<section class="options-content__allowlist"></section>`;
  }
  function InternalOptionsView(ops) {
    this.model = ops.model = new Model();
    this.template = ops.template = template;
    this.pageView = ops.pageView;
    ViewParent.call(this, ops);
    this.reload();
  }
  var import_nanohtml, ModelParent, ViewParent, Model;
  var init_internal_options = __esm({
    "shared/js/ui/views/internal-options.js"() {
      "use strict";
      import_nanohtml = __toESM(require_browser());
      ModelParent = window.DDG.base.Model;
      ViewParent = window.DDG.base.View;
      Model = class extends ModelParent {
        constructor() {
          super({
            modelName: "internalOptions"
          });
          this.isInternalUser = false;
        }
        async getState() {
          this.isInternalUser = await this.sendMessage("isInternalUser");
          this.debuggingSettings = await this.sendMessage("getDebuggingSettings");
        }
      };
      InternalOptionsView.prototype = window.$.extend({}, ViewParent.prototype, {
        setup: function() {
          this._cacheElems(".js-options", ["config-url", "set-config-url"]);
          this.bindEvents([
            [this.$setconfigurl, "click", this._clickSetting],
            [this.$configurl, "input", this._onURLChange]
          ]);
          this._onURLChange();
        },
        _buttonState: function() {
          const currentValue = this.model.debuggingSettings?.configURLOverride;
          const inputValue = this.$configurl?.val() || currentValue;
          let inputIsValidUrl = false;
          try {
            inputIsValidUrl = !!new URL(inputValue);
          } catch (e) {
          }
          if (!currentValue) {
            return inputIsValidUrl ? "Set" : "Set disabled";
          }
          if (!this.$configurl?.val()) {
            return "Clear";
          }
          if (inputValue === currentValue) {
            return "Reload now";
          }
          return inputIsValidUrl ? "Update" : "Update disabled";
        },
        _clickSetting: async function() {
          const buttonState = this._buttonState();
          const inputValue = this.$configurl?.val();
          if (buttonState === "Set" || buttonState === "Update") {
            await this.model.sendMessage("enableDebugging", {
              configURLOverride: inputValue,
              debuggerConnection: true
            });
          } else if (buttonState === "Clear") {
            await this.model.sendMessage("disableDebugging");
          } else if (buttonState === "Reload now") {
            await this.model.sendMessage("forceReloadConfig");
          }
          this.reload();
        },
        _onURLChange: function() {
          const buttonState = this._buttonState();
          const buttonText = buttonState.split(" ")[0];
          const buttonDisabled = buttonState.endsWith("disabled");
          this.$setconfigurl.attr("disabled", buttonDisabled);
          this.$setconfigurl.text(buttonText);
        },
        reload: function() {
          this.model.getState().then(() => {
            this.unbindEvents();
            this._rerender();
            this.setup();
          });
        }
      });
    }
  });

  // shared/js/ui/pages/options.js
  var Parent = window.DDG.base.Page;
  var mixins = require_mixins();
  var PrivacyOptionsView = require_privacy_options();
  var PrivacyOptionsModel = require_privacy_options2();
  var privacyOptionsTemplate = require_privacy_options3();
  var AllowlistView = require_allowlist();
  var AllowlistModel = require_allowlist2();
  var allowlistTemplate = require_allowlist3();
  var UserDataView = require_user_data();
  var UserDataModel = require_user_data2();
  var userDataTemplate = require_user_data3();
  var BackgroundMessageModel = require_background_message();
  var browserUIWrapper = (init_ui_wrapper(), __toCommonJS(ui_wrapper_exports));
  var InternalOptionsView2 = (init_internal_options(), __toCommonJS(internal_options_exports)).default;
  var t = window.DDG.base.i18n.t;
  function Options(ops) {
    Parent.call(this, ops);
  }
  Options.prototype = window.$.extend(
    {},
    Parent.prototype,
    mixins.setBrowserClassOnBodyTag,
    {
      pageName: "options",
      ready: function() {
        const $parent = window.$("#options-content");
        Parent.prototype.ready.call(this);
        this.setBrowserClassOnBodyTag();
        window.$(".js-feedback-link").click(this._onFeedbackClick.bind(this));
        window.$(".js-report-site-link").click(this._onReportSiteClick.bind(this));
        const textContainers = document.querySelectorAll("[data-text]");
        textContainers.forEach((el) => {
          const textID = el.getAttribute("data-text");
          const text = t(textID);
          el.innerHTML = text;
        });
        this.views.options = new PrivacyOptionsView({
          pageView: this,
          model: new PrivacyOptionsModel({}),
          appendTo: $parent,
          template: privacyOptionsTemplate
        });
        this.views.userData = new UserDataView({
          pageView: this,
          model: new UserDataModel({}),
          appendTo: $parent,
          template: userDataTemplate
        });
        this.views.internal = new InternalOptionsView2({
          pageView: this,
          appendTo: $parent
        });
        this.views.allowlist = new AllowlistView({
          pageView: this,
          model: new AllowlistModel({}),
          appendTo: $parent,
          template: allowlistTemplate
        });
        this.message = new BackgroundMessageModel({});
      },
      _onFeedbackClick: function(e) {
        e.preventDefault();
        browserUIWrapper.openExtensionPage("/html/feedback.html");
      },
      _onReportSiteClick: function(e) {
        e.preventDefault();
        browserUIWrapper.openExtensionPage("/html/feedback.html?broken=1");
      }
    }
  );
  window.DDG = window.DDG || {};
  window.DDG.page = new Options();
})();
/*
 * [js-sha1]{@link https://github.com/emn178/js-sha1}
 *
 * @version 0.6.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
