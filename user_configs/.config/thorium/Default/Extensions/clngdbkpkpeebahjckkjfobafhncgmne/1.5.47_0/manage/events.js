/* global API */// msg.js
/* global installed newUI */// manage.js
/* global checkUpdate handleUpdateInstalled */// updater-ui.js
/* global createStyleElement createTargetsElement getFaviconSrc styleToDummyEntry updateTotal */// render.js
/* global debounce getOwnTab sessionStore UCD */// toolbox.js
/* global filterAndAppend showFiltersStats */// filters.js
/* global sorter */
/* global t */// localization.js
/* global
  $
  $$
  $entry
  animateElement
  getEventKeyName
  messageBoxProxy
  scrollElementIntoView
*/// dom.js
'use strict';

const Events = {

  queue: Object.assign([], {
    THROTTLE: 100, // ms
    styles: new Map(),
    time: 0,
  }),

  addEntryTitle(link) {
    const style = link.closest('.entry').styleMeta;
    const {installDate: dIns, updateDate: dUpd, [UCD]: ucd} = style;
    link.title = [
      dUpd || dIns ? `${t.formatRelativeDate(dUpd || dIns)}` : '',
      `${t('dateInstalled')}: ${t.formatDate(dIns, true) || '—'}`,
      `${t('dateUpdated')}: ${t.formatDate(dUpd, true) || '—'}`,
      ucd ? `UserCSS, v.${ucd.version}` : '',
    ].filter(Boolean).join('\n');
  },

  check(event, entry) {
    checkUpdate(entry, {single: true});
  },

  async config(event, {styleMeta}) {
    await require(['/js/dlg/config-dialog']); /* global configDialog */
    configDialog(styleMeta);
  },

  async delete(event, entry) {
    const id = entry.styleId;
    animateElement(entry);
    const {button} = await messageBoxProxy.show({
      title: t('deleteStyleConfirm'),
      contents: entry.styleMeta.customName || entry.styleMeta.name,
      className: 'danger center',
      buttons: [t('confirmDelete'), t('confirmCancel')],
    });
    if (button === 0) {
      API.styles.delete(id);
    }
    const deleteButton = $('#message-box-buttons > button');
    if (deleteButton) deleteButton.removeAttribute('data-focused-via-click');
  },

  async edit(event, entry) {
    if (event.altKey) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const key = getEventKeyName(event);
    const url = $('[href]', entry).href;
    const ownTab = await getOwnTab();
    if (key === 'MouseL') {
      sessionStore['manageStylesHistory' + ownTab.id] = url;
      location.href = url;
    } else if (chrome.windows && key === 'Shift-MouseL') {
      API.openEditor({id: entry.styleId});
    } else {
      API.openURL({
        url,
        index: ownTab.index + 1,
        active: key === 'Shift-MouseM' || key === 'Shift-Ctrl-MouseL',
      });
    }
  },

  expandTargets(event, entry) {
    if (event.type === 'contextmenu') {
      event.preventDefault();
      const ex = '.expanded';
      $$(`.has-more${$(ex, entry) ? ex : `:not(${ex})`} .expander`)
        .forEach(el => el.click());
      return;
    }
    if (!entry._allTargetsRendered) {
      createTargetsElement({entry, expanded: true});
      getFaviconSrc(entry);
    }
    this.closest('.applies-to').classList.toggle('expanded');
  },

  async external(event) {
    // Not handling Shift-click - the built-in 'open in a new window' command
    if (getEventKeyName(event) !== 'Shift-MouseL') {
      event.preventDefault(); // Prevent FF from double-handling the event
      const {index} = await getOwnTab();
      API.openURL({
        url: event.target.closest('a').href,
        index: index + 1,
        active: !event.ctrlKey || event.shiftKey,
      });
    }
  },

  entryClicked(event) {
    const target = event.target;
    const entry = target.closest('.entry');
    const routes = Events['ENTRY_ROUTES' + (event.type === 'contextmenu' ? '_CTX' : '')];
    for (const selector in routes) {
      for (let el = target; el && el !== entry; el = el.parentElement) {
        if (el.matches(selector)) {
          return routes[selector].call(el, event, entry);
        }
      }
    }
  },

  lazyAddEntryTitle({type, target}) {
    const cell = target.closest('h2.style-name, [data-type=age]');
    if (cell) {
      const link = $('.style-name-link', cell) || cell;
      if (type === 'mouseover' && !link.title) {
        debounce(Events.addEntryTitle, 50, link);
      } else {
        debounce.unregister(Events.addEntryTitle);
      }
    }
  },

  name(event, entry) {
    if (newUI.enabled && !event.target.closest('.homepage')) {
      Events.edit(event, entry);
    }
  },

  toggle(event, entry) {
    API.styles.toggle(entry.styleId, this.matches('.enable') || this.checked);
  },

  update(event, entry) {
    const json = entry.updatedCode;
    json.id = entry.styleId;
    (json[UCD] ? API.usercss.install : API.styles.install)(json);
  },
};

Events.ENTRY_ROUTES = {
  'input, .enable, .disable': Events.toggle,
  '.style-name': Events.name,
  '.homepage': Events.external,
  '.check-update': Events.check,
  '.update': Events.update,
  '.delete': Events.delete,
  '.applies-to .expander': Events.expandTargets,
  '.configure-usercss': Events.config,
};
Events.ENTRY_ROUTES_CTX = {
  '.applies-to .expander': Events.expandTargets,
};

/* exported handleBulkChange */
function handleBulkChange(q = Events.queue) {
  for (const msg of q) {
    const {id} = msg.style;
    let fullStyle;
    if (msg.method === 'styleDeleted') {
      handleDelete(id);
    } else if (msg.reason === 'import' && (fullStyle = q.styles.get(id))) {
      handleUpdate(fullStyle, msg);
      q.styles.delete(id);
    } else {
      handleUpdateForId(id, msg);
    }
  }
  sorter.updateStripes({onlyWhenColumnsChanged: true});
  q.time = performance.now();
  q.length = 0;
}

function handleDelete(id) {
  const node = $entry(id);
  if (node) {
    node.remove();
    if (node.matches('.can-update')) {
      const btnApply = $('#apply-all-updates');
      btnApply.dataset.value = Number(btnApply.dataset.value) - 1;
    }
    showFiltersStats();
    updateTotal(-1);
  }
}

function handleUpdate(style, {reason, method} = {}) {
  if (reason === 'editPreview' || reason === 'editPreviewEnd') return;
  let entry;
  let oldEntry = $entry(style);
  if (oldEntry && method === 'styleUpdated') {
    handleToggledOrCodeOnly();
  }
  entry = entry || createStyleElement(styleToDummyEntry(style));
  if (oldEntry) {
    if (oldEntry.styleNameLC === entry.styleNameLC) {
      installed.replaceChild(entry, oldEntry);
    } else {
      oldEntry.remove();
    }
  } else {
    updateTotal(1);
  }
  if ((reason === 'update' || reason === 'install') && entry.matches('.updatable')) {
    handleUpdateInstalled(entry, reason);
  }
  filterAndAppend({entry}).then(sorter.update);
  if (!entry.matches('.hidden') && reason !== 'import' && reason !== 'sync') {
    animateElement(entry);
    requestAnimationFrame(() => scrollElementIntoView(entry));
  }
  getFaviconSrc(entry);

  function handleToggledOrCodeOnly() {
    removeStyleCode(style);
    const diff = objectDiff(oldEntry.styleMeta, style)
      .filter(({key, path}) => path || !/^_|(Date|Digest|Md5)$/.test(key));
    if (diff.length === 0) {
      // only code was modified
      entry = oldEntry;
      oldEntry = null;
    }
    if (diff.length === 1 && diff[0].key === 'enabled') {
      oldEntry.classList.toggle('enabled', style.enabled);
      oldEntry.classList.toggle('disabled', !style.enabled);
      $$('input', oldEntry).forEach(el => (el.checked = style.enabled));
      oldEntry.styleMeta = style;
      entry = oldEntry;
      oldEntry = null;
    }
  }
}

async function handleUpdateForId(id, opts) {
  handleUpdate(await API.styles.get(id), opts);
}

/* exported handleVisibilityChange */
function handleVisibilityChange(e) {
  const id = Number(sessionStore.justEditedStyleId);
  if (e.type === 'pageshow' && e.persisted && id) {
    // TODO: update all elements in-place, not just the last edited style
    handleUpdateForId(id, {method: 'styleUpdated'});
    delete sessionStore.justEditedStyleId;
  } else if (e.type === 'pagehide') {
    history.replaceState({scrollY: window.scrollY}, document.title);
  }
}

function objectDiff(first, second, path = '') {
  const diff = [];
  for (const key in first) {
    const a = first[key];
    const b = second[key];
    if (a === b) {
      continue;
    }
    if (b === undefined) {
      diff.push({path, key, values: [a], type: 'removed'});
      continue;
    }
    if (a && typeof a.filter === 'function' && b && typeof b.filter === 'function') {
      if (
        a.length !== b.length ||
        a.some((el, i) => {
          const result = !el || typeof el !== 'object'
            ? el !== b[i]
            : objectDiff(el, b[i], path + key + '[' + i + '].').length;
          return result;
        })
      ) {
        diff.push({path, key, values: [a, b], type: 'changed'});
      }
    } else if (a && b && typeof a === 'object' && typeof b === 'object') {
      diff.push(...objectDiff(a, b, path + key + '.'));
    } else {
      diff.push({path, key, values: [a, b], type: 'changed'});
    }
  }
  for (const key in second) {
    if (!(key in first)) {
      diff.push({path, key, values: [second[key]], type: 'added'});
    }
  }
  return diff;
}

/** Clearing the code to free up some memory */
function removeStyleCode(style) {
  let sum = (style.sourceCode || '').length || 0;
  style.sections.forEach(s => { sum += (s.code || '').length; s.code = null; });
  style.sourceCode = null;
  Object.defineProperty(style, '_codeSize', {value: sum, writable: true}); // non-enumerable!
}
