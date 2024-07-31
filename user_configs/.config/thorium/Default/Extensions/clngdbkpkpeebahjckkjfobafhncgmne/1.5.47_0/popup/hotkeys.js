/* global $ $$ $create */// dom.js
/* global API */// msg.js
/* global debounce */// toolbox.js
/* global t */// localization.js
'use strict';

const hotkeys = (() => {
  const entries = document.getElementsByClassName('entry');
  const container = $('#hotkey-info');
  const {title} = container;
  let togglablesShown = true;
  let togglables = getTogglables();
  let enabled;

  window.on('resize', adjustInfoPosition);
  initHotkeyInfo();

  return {
    setState(newState = !enabled) {
      if (!newState !== !enabled) {
        window[newState ? 'on' : 'off']('keydown', onKeyDown, true);
        enabled = newState;
      }
    },
  };

  function onKeyDown(event) {
    if (event.ctrlKey || event.altKey || event.metaKey || !enabled ||
        /^(text|search)$/.test((document.activeElement || {}).type)) {
      return;
    }
    let entry;
    let {key, code, shiftKey} = event;
    if (key === 'Escape' && !shiftKey && container.dataset.active) {
      event.preventDefault();
      hideInfo();
      return;
    }
    if (key >= '0' && key <= '9') {
      entry = entries[(Number(key) || 10) - 1];
    } else if (code >= 'Digit0' && code <= 'Digit9') {
      entry = entries[(Number(code.slice(-1)) || 10) - 1];
    } else if (key === '`' || key === '*' || code === 'Backquote' || code === 'NumpadMultiply') {
      invertTogglables();
    } else if (key === '-' || code === 'NumpadSubtract') {
      toggleState(entries, 'enabled', false);
    } else if (key === '+' || code === 'NumpadAdd') {
      toggleState(entries, 'disabled', true);
    } else if (key.length === 1) {
      shiftKey = false; // typing ':' etc. needs Shift so we hide it here to avoid opening editor
      key = key.toLocaleLowerCase();
      entry = [...entries].find(e => e.innerText.toLocaleLowerCase().startsWith(key));
    }
    if (!entry) {
      return;
    }
    $(shiftKey ? '.style-edit-link' : 'input', entry).click();
  }

  function getTogglables() {
    const enabledOrAll = $('.entry.enabled') ? $$('.entry.enabled') : [...entries];
    return enabledOrAll.map(entry => entry.id);
  }

  function countEnabledTogglables() {
    let num = 0;
    for (const id of togglables) {
      num += $(`#${id}`).classList.contains('enabled');
    }
    return num;
  }

  function invertTogglables() {
    togglables = togglables.length ? togglables : getTogglables();
    togglablesShown = countEnabledTogglables() > togglables.length / 2;
    toggleState(togglables, null, !togglablesShown);
    togglablesShown = !togglablesShown;
  }

  function toggleState(list, match, enable) {
    const results = [];
    let task = Promise.resolve();
    for (let entry of list) {
      entry = typeof entry === 'string' ? $('#' + entry) : entry;
      if (!match && $('input', entry).checked !== enable || entry.classList.contains(match)) {
        results.push(entry.id);
        task = task
          .then(() => API.styles.toggle(entry.styleId, enable))
          .then(() => {
            entry.classList.toggle('enabled', enable);
            entry.classList.toggle('disabled', !enable);
            $('input', entry).checked = enable;
          });
      }
    }
    if (results.length) task.then(API.refreshAllTabs);
    return results;
  }

  function hideInfo() {
    delete container.dataset.active;
    document.body.style.height = '';
    container.title = title;
    window.on('resize', adjustInfoPosition);
  }

  function initHotkeyInfo() {
    container.onclick = ({target}) => {
      if (target.localName === 'button') {
        hideInfo();
      } else if (!container.dataset.active) {
        open();
      }
    };

    function open() {
      window.off('resize', adjustInfoPosition);
      debounce.unregister(adjustInfoPosition);
      container.title = '';
      container.style = '';
      container.dataset.active = true;
      if (!container.firstElementChild) {
        buildElement();
      }
      const height = 3 +
        container.firstElementChild.scrollHeight +
        container.lastElementChild.scrollHeight;
      if (height > document.body.clientHeight) {
        document.body.style.height = height + 'px';
      }
    }

    function buildElement() {
      const keysToElements = line =>
        line
          .split(/(<.*?>)/)
          .map(s => (!s.startsWith('<') ? s :
            $create('mark', s.slice(1, -1))));
      const linesToElements = text =>
        text
          .trim()
          .split('\n')
          .map((line, i, array) =>
            $create(i < array.length - 1 ? {
              tag: 'p',
              appendChild: keysToElements(line),
            } : {
              tag: 'a',
              target: '_blank',
              href: 'https://github.com/openstyles/stylus/wiki/Popup',
              textContent: line,
            }));
      [
        linesToElements(t('popupHotkeysInfo')),
        $create('button', t('confirmOK')),
      ].forEach(child => {
        container.appendChild($create('div', child));
      });
    }
  }

  function adjustInfoPosition(debounced) {
    if (debounced !== true) {
      debounce(adjustInfoPosition, 100, true);
      return;
    }
  }
})();

hotkeys.setState(true);
