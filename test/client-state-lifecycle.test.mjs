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
    textContent: '',
    width: 0,
    height: 0,
    parent: null,
    isConnected: false,
    dataset: {},
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
    toggle(name) {
      if (classes.has(name)) {
        classes.delete(name);
        syncClassName();
        return false;
      }
      classes.add(name);
      syncClassName();
      return true;
    },
  };

  Object.defineProperty(el.style, 'cssText', {
    set(value) {
      el.cssText = value;
    },
    get() {
      return el.cssText || '';
    },
  });

  el.getContext = () => ({
    fillStyle: '',
    font: '',
    shadowColor: '',
    shadowBlur: 0,
    beginPath() {},
    arc() {},
    fill() {},
    clearRect() {},
    fillRect() {},
    fillText() {},
  });
  el.addEventListener = () => {};
  el.removeEventListener = () => {};
  el.focus = () => {};
  el.setAttribute = () => {};
  el.contains = (node) => node === el;
  el.appendChild = (child) => {
    child.parent = el;
    child.isConnected = true;
    el.children.push(child);
    return child;
  };
  el.remove = () => {
    el.isConnected = false;
    if (el.parent) {
      el.parent.children = el.parent.children.filter((child) => child !== el);
    }
  };
  return el;
}

function createDom() {
  const body = makeElement('body');
  body.isConnected = true;
  body.style.overflow = '';
  const documentElement = makeElement('html');
  documentElement.style.setProperty = () => {};
  const byId = {};

  function register(id) {
    const el = makeElement('div');
    el.id = id;
    byId[id] = el;
    body.appendChild(el);
    return el;
  }

  ['mobileMenuToggle', 'mobileNavigation', 'searchToggle', 'searchOverlay', 'searchClose', 'searchInput', 'searchResults']
    .forEach(register);

  const document = {
    readyState: 'loading',
    body,
    documentElement,
    addEventListener() {},
    removeEventListener() {},
    createElement: (tag) => makeElement(tag),
    getElementById: (id) => byId[id] || null,
    querySelector() {
      return null;
    },
    querySelectorAll(selector) {
      if (selector === '.theme-effect') {
        return body.children.filter((el) => el.isConnected && el.classList.contains('theme-effect'));
      }
      return [];
    },
    dispatchEvent() {},
  };

  return { document, byId };
}

function loadTheme() {
  const intervals = new Map();
  let nextId = 1;
  const { document, byId } = createDom();
  const sandbox = {
    console,
    Math,
    Date,
    Promise,
    encodeURIComponent,
    document,
    localStorage: {
      getItem() {
        return null;
      },
      setItem() {},
    },
    innerWidth: 200,
    innerHeight: 100,
    pageYOffset: 0,
    location: { origin: 'https://example.test' },
    ghostPublicApiKey: 'dummy-content-key',
    requestAnimationFrame() {
      return 0;
    },
    cancelAnimationFrame() {},
    setTimeout() {
      return 0;
    },
    clearTimeout() {},
    addEventListener() {},
    removeEventListener() {},
    setInterval(fn, delay) {
      const id = nextId++;
      intervals.set(id, { fn, delay });
      return id;
    },
    clearInterval(id) {
      intervals.delete(id);
    },
    CustomEvent: class CustomEvent {
      constructor(type, init = {}) {
        this.type = type;
        this.detail = init.detail;
      }
    },
    IntersectionObserver: class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
    fetch() {
      return Promise.reject(new Error('unexpected fetch'));
    },
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  const context = createContext(sandbox);
  runInContext(readFileSync(join(root, 'assets/js/neon-effects.js'), 'utf8'), context);
  runInContext(readFileSync(join(root, 'assets/js/main.js'), 'utf8'), context);
  return { context, document, byId, intervals };
}

function jsonResponse(posts) {
  return {
    json: async () => ({ posts }),
  };
}

function post(title, slug) {
  return {
    title,
    slug,
    excerpt: `${title} excerpt`,
    published_at: '2024-01-02T00:00:00.000Z',
  };
}

test('matrix enter and leave keeps a single timer', () => {
  const { context, intervals } = loadTheme();
  const effects = context.neonEffects;

  assert.equal(intervals.size, 0);
  effects.updateThemeEffects('matrix');
  assert.equal(intervals.size, 1);
  const [firstId, firstTimer] = [...intervals.entries()][0];
  assert.equal(firstTimer.delay, 35);
  assert.equal(effects.matrixRainTimer, firstId);

  effects.updateThemeEffects('cyberpunk');
  assert.equal(intervals.size, 0);
  assert.equal(effects.matrixRainTimer, null);

  effects.updateThemeEffects('matrix');
  effects.updateThemeEffects('matrix');
  assert.equal(intervals.size, 1);
  assert.notEqual([...intervals.keys()][0], firstId);

  effects.destroy();
  assert.equal(intervals.size, 0);
  assert.equal(effects.matrixRainTimer, null);
});

test('themes without a matrix canvas do not start a rain timer', () => {
  const { context, intervals } = loadTheme();
  context.neonEffects.updateThemeEffects('vaporwave');
  context.neonEffects.updateThemeEffects('synthwave');
  assert.equal(intervals.size, 0);
});

test('scroll stays locked until every overlay closes', () => {
  const { context, document } = loadTheme();
  const theme = new context.CyberpunkTheme();

  assert.equal(document.body.style.overflow, '');
  theme.openMobileMenu();
  assert.equal(document.body.style.overflow, 'hidden');
  theme.openSearch();
  assert.equal(document.body.style.overflow, 'hidden');

  theme.closeMobileMenu();
  assert.equal(document.getElementById('mobileNavigation').classList.contains('active'), false);
  assert.equal(document.getElementById('searchOverlay').classList.contains('active'), true);
  assert.equal(document.body.style.overflow, 'hidden');

  theme.closeSearch();
  assert.equal(document.body.style.overflow, '');
});

test('closing the only open overlay unlocks scroll', () => {
  const { context, document } = loadTheme();
  const theme = new context.CyberpunkTheme();

  theme.openSearch();
  theme.closeSearch();
  assert.equal(document.body.style.overflow, '');

  theme.openMobileMenu();
  theme.closeMobileMenu();
  assert.equal(document.body.style.overflow, '');
});

test('an older search response does not replace a newer result', async () => {
  const { context, byId } = loadTheme();
  const theme = new context.CyberpunkTheme();
  const pending = [];
  context.fetch = (url) => new Promise((resolve, reject) => {
    pending.push({ url, resolve, reject });
  });

  const first = theme.performSearch('alpha');
  const second = theme.performSearch('beta');
  assert.equal(pending.length, 2);
  assert.match(pending[0].url, /\/ghost\/api\/v3\/content\/posts\//);
  assert.match(pending[0].url, /q=alpha/);
  assert.match(pending[1].url, /q=beta/);

  pending[1].resolve(jsonResponse([post('Newer', 'newer')]));
  pending[0].resolve(jsonResponse([post('Older', 'older')]));
  await first;
  await second;

  assert.match(byId.searchResults.innerHTML, /Newer/);
  assert.doesNotMatch(byId.searchResults.innerHTML, /Older/);
});

test('clearing the query ignores an in-flight response', async () => {
  const { context, byId } = loadTheme();
  const theme = new context.CyberpunkTheme();
  const pending = [];
  context.fetch = (url) => new Promise((resolve) => {
    pending.push({ url, resolve });
  });

  const inflight = theme.performSearch('alpha');
  const cleared = theme.performSearch('   ');
  pending[0].resolve(jsonResponse([post('Older', 'older')]));
  await inflight;
  await cleared;

  assert.match(byId.searchResults.innerHTML, /search-placeholder/);
  assert.doesNotMatch(byId.searchResults.innerHTML, /Older/);
});

test('a failed older search does not overwrite newer results', async () => {
  const { context, byId } = loadTheme();
  const theme = new context.CyberpunkTheme();
  const pending = [];
  context.fetch = (url) => new Promise((resolve, reject) => {
    pending.push({ url, resolve, reject });
  });

  const first = theme.performSearch('alpha');
  const second = theme.performSearch('beta');
  pending[1].resolve(jsonResponse([post('Newer', 'newer')]));
  pending[0].reject(new Error('stale failure'));
  await first;
  await second;

  assert.match(byId.searchResults.innerHTML, /Newer/);
  assert.doesNotMatch(byId.searchResults.innerHTML, /temporarily unavailable/);
});

test('one completed search still renders its posts', async () => {
  const { context, byId } = loadTheme();
  const theme = new context.CyberpunkTheme();
  const pending = [];
  context.fetch = (url) => new Promise((resolve) => {
    pending.push({ url, resolve });
  });

  const only = theme.performSearch('solo');
  assert.match(pending[0].url, /key=dummy-content-key/);
  pending[0].resolve(jsonResponse([post('Solo Hit', 'solo-hit')]));
  await only;

  assert.match(byId.searchResults.innerHTML, /Solo Hit/);
  assert.match(byId.searchResults.innerHTML, /solo-hit/);
});
