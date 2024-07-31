/* global $$ $ $create important */// dom.js
/* global API msg */// msg.js
/* global CodeMirror */
/* global SectionsEditor */
/* global SourceEditor */
/* global validateRegexp */// util.js
/* global clipString closeCurrentTab deepEqual mapObj sessionStore */// toolbox.js
/* global cmFactory */
/* global editor EditorHeader */// base.js
/* global linterMan */
/* global prefs */
/* global t */// localization.js
'use strict';

//#region init

t.body();

editor.styleReady.then(async () => {
  EditorHeader();
  EditorMethods();
  await (editor.isUsercss ? SourceEditor : SectionsEditor)();

  editor.dirty.onChange(editor.updateDirty);
  prefs.subscribe('editor.linter', () => linterMan.run());

  // enabling after init to prevent flash of validation failure on an empty name
  $('#name').required = !editor.isUsercss;
  $('#save-button').onclick = editor.save;
  $('#cancel-button').onclick = editor.cancel;

  const elSec = $('#sections-list');
  const elToc = $('#toc');
  const moDetails = new MutationObserver(([{target: sec}]) => {
    if (!sec.open) return;
    if (sec === elSec) editor.updateToc();
    const el = sec.lastElementChild;
    const s = el.style;
    const x2 = sec.getBoundingClientRect().left + el.getBoundingClientRect().width;
    if (x2 > innerWidth - 30) s.right = '0';
    else if (s.right) s.removeProperty('right');
  });
  // editor.toc.expanded pref isn't saved in compact-layout so prefs.subscribe won't work
  if (elSec.open) editor.updateToc();
  // and we also toggle `open` directly in other places e.g. in detectLayout()
  for (const el of $$('#details-wrapper > details')) {
    moDetails.observe(el, {attributes: true, attributeFilter: ['open']});
  }
  elToc.onclick = e =>
    editor.jumpToEditor([].indexOf.call(elToc.children, e.target));
  $('#lint-help').onclick = () =>
    require(['/edit/linter-dialogs'], () => linterMan.showLintHelp());

  require([
    '/edit/autocomplete',
    '/edit/drafts',
    '/edit/global-search',
  ]);
});

editor.styleReady.then(async () => {
  // Set up mini-header on scroll
  const {isUsercss} = editor;
  const el = $create({
    style: important(`
      top: 0;
      height: 1px;
      position: absolute;
      visibility: hidden;
    `),
  });
  const scroller = isUsercss ? $('.CodeMirror-scroll') : document.body;
  const xoRoot = isUsercss ? scroller : undefined;
  const xo = new IntersectionObserver(onScrolled, {root: xoRoot});
  scroller.appendChild(el);
  onCompactToggled(editor.mqCompact);
  editor.mqCompact.on('change', onCompactToggled);

  /** @param {MediaQueryList} mq */
  function onCompactToggled(mq) {
    for (const el of $$('details[data-pref]')) {
      el.open = mq.matches ? false :
        el.classList.contains('ignore-pref') ? el.open :
          prefs.get(el.dataset.pref);
    }
    if (mq.matches) {
      xo.observe(el);
    } else {
      xo.disconnect();
    }
  }
  /** @param {IntersectionObserverEntry[]} entries */
  function onScrolled(entries) {
    const h = $('#header');
    const sticky = !entries.pop().intersectionRatio;
    if (!isUsercss) scroller.style.paddingTop = sticky ? h.offsetHeight + 'px' : '';
    h.classList.toggle('sticky', sticky);
  }
});

//#endregion
//#region events

msg.onExtension(request => {
  const {style} = request;
  switch (request.method) {
    case 'styleUpdated':
      if (editor.style.id === style.id) {
        handleExternalUpdate(request);
      }
      break;
    case 'styleDeleted':
      if (editor.style.id === style.id) {
        closeCurrentTab();
      }
      break;
  }
});

async function handleExternalUpdate({style, reason}) {
  if (reason === 'editPreview' ||
      reason === 'editPreviewEnd') {
    return;
  }
  if (reason === 'editSave' && editor.saving) {
    editor.saving = false;
    return;
  }
  if (reason === 'toggle') {
    if (editor.dirty.isDirty()) {
      editor.toggleStyle(style.enabled);
      // updateLivePreview is called by toggleStyle
    } else {
      Object.assign(editor.style, style);
      editor.updateLivePreview();
    }
    editor.updateMeta();
    return;
  }
  style = await API.styles.get(style.id);
  if (reason === 'config') {
    for (const key in editor.style) if (!(key in style)) delete editor.style[key];
    delete style.sourceCode;
    delete style.sections;
    delete style.name;
    delete style.enabled;
    Object.assign(editor.style, style);
    editor.updateLivePreview();
  } else {
    await editor.replaceStyle(style);
  }
  window.dispatchEvent(new Event('styleSettings'));
}

window.on('beforeunload', e => {
  let pos;
  if (editor.isWindowed &&
      document.visibilityState === 'visible' &&
      prefs.get('openEditInWindow') &&
      screenX !== -32000 && // Chrome uses this value for minimized windows
      ( // only if not maximized
        screenX > 0 || outerWidth < screen.availWidth ||
        screenY > 0 || outerHeight < screen.availHeight ||
        screenX <= -10 || outerWidth >= screen.availWidth + 10 ||
        screenY <= -10 || outerHeight >= screen.availHeight + 10
      )
  ) {
    pos = {
      left: screenX,
      top: screenY,
      width: outerWidth,
      height: outerHeight,
    };
    prefs.set('windowPosition', pos);
  }
  sessionStore.windowPos = JSON.stringify(pos || {});
  API.data.set('editorScrollInfo' + editor.style.id, editor.makeScrollInfo());
  const activeElement = document.activeElement;
  if (activeElement) {
    // blurring triggers 'change' or 'input' event if needed
    activeElement.blur();
    // refocus if unloading was canceled
    setTimeout(() => activeElement.focus());
  }
  if (editor.dirty.isDirty()) {
    // neither confirm() nor custom messages work in modern browsers but just in case
    e.returnValue = t('styleChangesNotSaved');
  }
});

//#endregion
//#region editor methods

function EditorMethods() {
  const toc = [];
  const {dirty, regexps} = editor;
  const elTest = $('#testRE');
  let {style} = editor;
  let wasDirty = false;

  elTest.hidden = !style.sections.some(({regexps: r}) => r && r.length);
  elTest.onclick = () => require([
    '/edit/regexp-tester.css',
    '/edit/regexp-tester', /* global regexpTester */
  ], () => regexpTester.toggle(true));

  Object.defineProperties(editor, {
    style: {
      get: () => style,
      set: val => (style = val),
    },
  });

  /** @namespace Editor */
  Object.assign(editor, {

    applyScrollInfo(cm, si = (editor.scrollInfo.cms || [])[0]) {
      if (si && si.sel) {
        const bmOpts = {sublimeBookmark: true, clearWhenEmpty: false}; // copied from sublime.js
        const bms = cm.state.sublimeBookmarks = [];
        for (const b of si.bookmarks) bms.push(cm.markText(b.from, b.to, bmOpts));
        cm.setSelections(...si.sel, {scroll: false});
        Object.assign(cm.display.scroller, si.scroll); // for source editor
        Object.assign(cm.doc, si.scroll); // for sectioned editor
      }
    },

    makeScrollInfo() {
      return {
        scrollY: window.scrollY,
        cms: editor.getEditors().map(cm => /** @namespace EditorScrollInfo */({
          bookmarks: (cm.state.sublimeBookmarks || []).map(b => b.find()),
          focus: cm.hasFocus(),
          height: cm.display.wrapper.style.height.replace('100vh', ''),
          parentHeight: cm.display.wrapper.parentElement.offsetHeight,
          scroll:  mapObj(cm.doc, null, ['scrollLeft', 'scrollTop']),
          sel: [cm.doc.sel.ranges, cm.doc.sel.primIndex],
        })),
      };
    },

    async save() {
      if (dirty.isDirty()) {
        editor.saving = true;
        await editor.saveImpl();
      }
    },

    toggleRegexp(el, type) {
      if (type === 'regexp') {
        el.on('input', validateRegexp);
        if (regexps.add(el).size === 1) elTest.hidden = false;
      } else {
        el.setCustomValidity('');
        el.off('input', validateRegexp);
        if (regexps.delete(el) && !regexps.size) elTest.hidden = true;
      }
    },

    toggleStyle(enabled = !style.enabled) {
      $('#enabled').checked = enabled;
      editor.updateEnabledness(enabled);
    },

    updateDirty() {
      const isDirty = dirty.isDirty();
      if (wasDirty !== isDirty) {
        wasDirty = isDirty;
        document.body.classList.toggle('dirty', isDirty);
        $('#save-button').disabled = !isDirty;
      }
      editor.updateTitle();
    },

    updateEnabledness(enabled) {
      dirty.modify('enabled', style.enabled, enabled);
      style.enabled = enabled;
      editor.updateLivePreview();
    },

    updateName(isUserInput) {
      if (!editor) return;
      if (isUserInput) {
        const {value} = $('#name');
        dirty.modify('name', style[editor.nameTarget] || style.name, value);
        style[editor.nameTarget] = value;
      }
      editor.updateTitle();
    },

    updateToc(added) {
      const {sections} = editor;
      if (!toc.el) {
        toc.el = $('#toc');
        toc.elDetails = toc.el.closest('details');
        toc.title = $('#toc-title').dataset;
      }
      let num = 0; for (const sec of sections) num += !sec.removed;
      if ((+toc.title.num || 1) !== num) {
        if (num > 1) toc.title.num = num;
        else delete toc.title.num;
      }
      if (!toc.elDetails.open) return;
      if (!added) added = sections;
      const first = sections.indexOf(added[0]);
      const elFirst = toc.el.children[first];
      if (first >= 0 && (!added.focus || !elFirst)) {
        for (let el = elFirst, i = first; i < sections.length; i++) {
          const entry = sections[i].tocEntry;
          if (!deepEqual(entry, toc[i])) {
            if (!el) el = toc.el.appendChild($create('li', {tabIndex: 0}));
            el.tabIndex = entry.removed ? -1 : 0;
            toc[i] = Object.assign({}, entry);
            const s = el.textContent = clipString(entry.label) || (
              entry.target == null
                ? t('appliesToEverything')
                : clipString(entry.target) + (entry.numTargets > 1 ? ', ...' : ''));
            if (s.length > 30) el.title = s;
          }
          el = el.nextElementSibling;
        }
      }
      while (toc.length > sections.length) {
        toc.el.lastElementChild.remove();
        toc.length--;
      }
      if (added.focus) {
        const cls = 'current';
        const old = $('.' + cls, toc.el);
        const el = elFirst || toc.el.children[first];
        if (old && old !== el) old.classList.remove(cls);
        el.classList.add(cls);
      }
    },

    useSavedStyle(newStyle) {
      if (style.id !== newStyle.id) {
        history.replaceState({}, '', `?id=${newStyle.id}`);
      }
      sessionStore.justEditedStyleId = newStyle.id;
      Object.assign(style, newStyle);
      editor.updateClass();
      editor.updateMeta();
    },
  });
}

//#endregion
//#region colorpickerHelper

(async function colorpickerHelper() {
  prefs.subscribe('editor.colorpicker.hotkey', (id, hotkey) => {
    CodeMirror.commands.colorpicker = invokeColorpicker;
    const extraKeys = CodeMirror.defaults.extraKeys;
    for (const key in extraKeys) {
      if (extraKeys[key] === 'colorpicker') {
        delete extraKeys[key];
        break;
      }
    }
    if (hotkey) {
      extraKeys[hotkey] = 'colorpicker';
    }
  });

  prefs.subscribe('editor.colorpicker', (id, enabled) => {
    const defaults = CodeMirror.defaults;
    const keyName = prefs.get('editor.colorpicker.hotkey');
    defaults.colorpicker = enabled;
    if (enabled) {
      if (keyName) {
        CodeMirror.commands.colorpicker = invokeColorpicker;
        defaults.extraKeys = defaults.extraKeys || {};
        defaults.extraKeys[keyName] = 'colorpicker';
      }
      defaults.colorpicker = {
        tooltip: t('colorpickerTooltip'),
        popup: {
          tooltipForSwitcher: t('colorpickerSwitchFormatTooltip'),
          paletteLine: t('numberedLine'),
          paletteHint: t('colorpickerPaletteHint'),
          hexUppercase: prefs.get('editor.colorpicker.hexUppercase'),
          embedderCallback: state => {
            ['hexUppercase', 'color']
              .filter(name => state[name] !== prefs.get('editor.colorpicker.' + name))
              .forEach(name => prefs.set('editor.colorpicker.' + name, state[name]));
          },
          get maxHeight() {
            return prefs.get('editor.colorpicker.maxHeight');
          },
          set maxHeight(h) {
            prefs.set('editor.colorpicker.maxHeight', h);
          },
        },
      };
    } else {
      if (defaults.extraKeys) {
        delete defaults.extraKeys[keyName];
      }
    }
    cmFactory.globalSetOption('colorpicker', defaults.colorpicker);
  }, true);

  function invokeColorpicker(cm) {
    cm.state.colorpicker.openPopup(prefs.get('editor.colorpicker.color'));
  }
})();

//#endregion
