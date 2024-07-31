/* global API */// msg.js
/* global download */// common.js
/* global RX_META UCD deepCopy mapObj */// toolbox.js
/* global styleMan */
'use strict';

const usercssMan = {

  GLOBAL_META: Object.entries({
    author: null,
    description: null,
    homepageURL: 'url',
    updateURL: 'updateUrl',
    name: null,
  }),

  /** `src` is a style or vars */
  async assignVars(style, src) {
    const meta = style[UCD];
    const meta2 = src[UCD];
    const {vars} = meta;
    const oldVars = meta2 ? meta2.vars : src;
    if (vars && oldVars) {
      // The type of var might be changed during the update. Set value to null if the value is invalid.
      for (const [key, v] of Object.entries(vars)) {
        const old = oldVars[key] && oldVars[key].value;
        if (old != null) v.value = old;
      }
      meta.vars = await API.worker.nullifyInvalidVars(vars);
    }
  },

  async build({
    styleId,
    sourceCode,
    vars,
    checkDup,
    metaOnly,
    assignVars,
    initialUrl,
  }) {
    // downloading here while install-usercss page is loading to avoid the wait
    if (initialUrl) sourceCode = await download(initialUrl);
    const style = await usercssMan.buildMeta({sourceCode});
    const dup = (checkDup || assignVars) &&
      usercssMan.find(styleId ? {id: styleId} : style);
    let log;
    if (!metaOnly) {
      if (vars || assignVars) {
        await usercssMan.assignVars(style, vars || dup);
      }
      await usercssMan.buildCode(style);
      log = style.log; // extracting the non-enumerable prop, otherwise it won't survive messaging
    }
    return {style, dup, log};
  },

  async buildCode(style) {
    const {sourceCode: code, [UCD]: {vars, preprocessor}} = style;
    const {sections, errors, log} = await API.worker.compileUsercss(preprocessor, code, vars);
    const recoverable = errors.every(e => e.recoverable);
    if (!sections.length || !recoverable) {
      throw !recoverable ? errors : 'Style does not contain any actual CSS to apply.';
    }
    style.sections = sections;
    // adding a non-enumerable prop so it won't be written to storage
    if (log) Object.defineProperty(style, 'log', {value: log});
    return style;
  },

  async buildMeta(style) {
    if (style[UCD]) {
      return style;
    }
    // remember normalized sourceCode
    const code = style.sourceCode = style.sourceCode.replace(/\r\n?/g, '\n');
    style = Object.assign({
      enabled: true,
      sections: [],
    }, style);
    const match = code.match(RX_META);
    if (!match) {
      return Promise.reject(new Error('Could not find metadata.'));
    }
    try {
      const {metadata} = await API.worker.parseUsercssMeta(match[0]);
      style[UCD] = metadata;
      // https://github.com/openstyles/stylus/issues/560#issuecomment-440561196
      for (const [key, globalKey] of usercssMan.GLOBAL_META) {
        const val = metadata[key];
        if (val !== undefined) {
          style[globalKey || key] = val;
        }
      }
      return style;
    } catch (err) {
      if (err.code) {
        const args = err.code === 'missingMandatory' || err.code === 'missingChar'
          ? err.args.map(e => e.length === 1 ? JSON.stringify(e) : e).join(', ')
          : err.args;
        const msg = chrome.i18n.getMessage(`meta_${(err.code)}`, args);
        if (msg) err.message = msg;
        err.index += match.index;
      }
      return Promise.reject(err);
    }
  },

  async configVars(id, vars) {
    const style = deepCopy(styleMan.get(id));
    style[UCD].vars = vars;
    await usercssMan.buildCode(style);
    return (await styleMan.install(style, 'config'))[UCD].vars;
  },

  async editSave(style) {
    style = await usercssMan.parse(style);
    return {
      log: style.log, // extracting the non-enumerable prop, otherwise it won't survive messaging
      style: await styleMan.editSave(style),
    };
  },

  /**
   * @param {Object} data - style object or usercssData
   * @return {StyleObj|void}
   */
  find(data) {
    if (data.id) return styleMan.get(data.id);
    const filter = mapObj(data[UCD] || data, null, ['name', 'namespace']);
    return styleMan.find(filter, UCD);
  },

  getVersion(data) {
    const s = usercssMan.find(data);
    return s && s[UCD].version;
  },

  async install(style, opts) {
    return styleMan.install(await usercssMan.parse(style, opts));
  },

  async parse(style, {dup, vars} = {}) {
    style = await usercssMan.buildMeta(style);
    // preserve style.vars during update
    if (dup || (dup = usercssMan.find(style))) {
      style.id = dup.id;
    }
    if (vars || (vars = dup)) {
      await usercssMan.assignVars(style, vars);
    }
    return usercssMan.buildCode(style);
  },
};
