import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { createContext, runInContext } from 'node:vm';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

function makeElement(tag) {
  const classes = new Set();
  let className = '';
  const el = {
    tag,
    id: '',
    innerHTML: '',
    parent: null,
    isConnected: false,
    children: [],
    style: {},
  };

  function syncClassName() {
    className = [...classes].join(' ');
  }

  Object.defineProperty(el, 'className', {
    get() {
      return className;
    },
    set(value) {
      className = String(value);
      classes.clear();
      className.split(/\s+/).filter(Boolean).forEach((name) => classes.add(name));
    },
  });

  el.classList = {
    add(name) {
      classes.add(name);
      syncClassName();
    },
    remove(name) {
      classes.delete(name);
      syncClassName();
    },
    contains(name) {
      return classes.has(name);
    },
  };
  el.appendChild = (child) => {
    child.parent = el;
    child.isConnected = true;
    el.children.push(child);
    return child;
  };
  el.remove = () => {
    el.isConnected = false;
  };
  el.addEventListener = () => {};
  el.focus = () => {};
  return el;
}

function loadSwitcher({ stored = null, bodyClass = 'home-template theme-cyberpunk' } = {}) {
  const store = {};
  if (stored != null) store['cyberpunk-theme'] = stored;
  const timers = [];
  let nextTimer = 1;
  const body = makeElement('body');
  body.isConnected = true;
  body.className = bodyClass;
  const documentElement = makeElement('html');
  documentElement.style.setProperty = () => {};
  const document = {
    readyState: 'loading',
    body,
    documentElement,
    addEventListener() {},
    removeEventListener() {},
    createElement: () => makeElement('div'),
    getElementById() {
      return null;
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    dispatchEvent() {},
  };
  const sandbox = {
    console,
    Math,
    Date,
    Object,
    Promise,
    document,
    localStorage: {
      getItem(key) {
        return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
      },
      setItem(key, value) {
        store[key] = String(value);
      },
    },
    requestAnimationFrame() {
      return 0;
    },
    setTimeout(fn, delay) {
      const id = nextTimer++;
      timers.push({ id, fn, delay });
      return id;
    },
    clearTimeout(id) {
      const index = timers.findIndex((timer) => timer.id === id);
      if (index >= 0) timers.splice(index, 1);
    },
    CustomEvent: class CustomEvent {
      constructor(type, init = {}) {
        this.type = type;
        this.detail = init.detail;
      }
    },
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  const context = createContext(sandbox);
  runInContext(readFileSync(join(root, 'assets/js/theme-switcher.js'), 'utf8'), context);
  return { context, document, store, timers };
}

test('empty storage adopts the theme class applied for the configured default', () => {
  const { context } = loadSwitcher({
    stored: null,
    bodyClass: 'home-template theme-matrix animations-enabled',
  });
  assert.equal(context.themeSwitcher.getCurrentTheme(), 'matrix');
});

test('stock cyberpunk body class stays the initial theme when storage is empty', () => {
  const { context } = loadSwitcher({ stored: null });
  assert.equal(context.themeSwitcher.getCurrentTheme(), 'cyberpunk');
});

test('a non-empty stored value is kept even when it is not a known theme', () => {
  const { context } = loadSwitcher({
    stored: 'legacy',
    bodyClass: 'home-template theme-neon',
  });
  assert.equal(context.themeSwitcher.getCurrentTheme(), 'legacy');
});

test('a stored theme still wins over the body class', () => {
  const { context } = loadSwitcher({
    stored: 'neon',
    bodyClass: 'home-template theme-matrix',
  });
  assert.equal(context.themeSwitcher.getCurrentTheme(), 'neon');
});

test('setTheme keeps the transition class and unrelated tokens', () => {
  const { context, document, timers } = loadSwitcher({
    bodyClass: 'home-template tag-theme-news theme-cyberpunk theme-loaded',
  });
  const switcher = context.themeSwitcher;

  switcher.setTheme('vaporwave');
  switcher.setTheme('synthwave');

  assert.equal(switcher.getCurrentTheme(), 'synthwave');
  assert.equal(document.body.classList.contains('theme-synthwave'), true);
  assert.equal(document.body.classList.contains('theme-vaporwave'), false);
  assert.equal(document.body.classList.contains('theme-cyberpunk'), false);
  assert.equal(document.body.classList.contains('theme-transition'), true);
  assert.equal(document.body.classList.contains('theme-loaded'), true);
  assert.equal(document.body.classList.contains('tag-theme-news'), true);
  assert.equal(document.body.classList.contains('home-template'), true);
  const transitionTimers = timers.filter((timer) => timer.delay === 300);
  assert.equal(transitionTimers.length, 1);

  transitionTimers[0].fn();
  assert.equal(document.body.classList.contains('theme-transition'), false);
  assert.equal(document.body.classList.contains('theme-loaded'), true);
  assert.equal(document.body.classList.contains('theme-synthwave'), true);
});

test('an unknown theme name does not rewrite the body class', () => {
  const { context, document } = loadSwitcher({
    bodyClass: 'home-template theme-matrix theme-loaded',
  });
  context.themeSwitcher.setTheme('not-a-theme');
  assert.equal(document.body.classList.contains('theme-matrix'), true);
  assert.equal(document.body.classList.contains('theme-loaded'), true);
  assert.equal(document.body.classList.contains('theme-transition'), false);
  assert.equal(context.themeSwitcher.getCurrentTheme(), 'matrix');
});
