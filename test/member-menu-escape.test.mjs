import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { createContext, runInContext } from 'node:vm';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

function makeElement() {
  const classes = new Set();
  return {
    style: {},
    classList: {
      add(name) { classes.add(name); },
      remove(name) { classes.delete(name); },
      contains(name) { return classes.has(name); },
      toggle(name) {
        if (classes.has(name)) {
          classes.delete(name);
          return false;
        }
        classes.add(name);
        return true;
      },
    },
    addEventListener() {},
    contains() { return false; },
    focus() {},
  };
}

function loadTheme() {
  const byId = {
    mobileMenuToggle: makeElement(),
    mobileNavigation: makeElement(),
    searchToggle: makeElement(),
    searchOverlay: makeElement(),
    searchClose: makeElement(),
    searchInput: makeElement(),
    searchResults: makeElement(),
    memberToggle: makeElement(),
    memberDropdown: makeElement(),
  };
  const body = makeElement();
  body.style.overflow = '';
  const document = {
    readyState: 'loading',
    body,
    documentElement: { style: { setProperty() {} } },
    addEventListener() {},
    removeEventListener() {},
    createElement: () => makeElement(),
    getElementById: (id) => byId[id] || null,
    querySelector() { return null; },
    querySelectorAll() { return []; },
    dispatchEvent() {},
  };
  const sandbox = {
    console,
    Math,
    Date,
    document,
    localStorage: { getItem() { return null; }, setItem() {} },
    requestAnimationFrame() { return 0; },
    setTimeout() { return 0; },
    clearTimeout() {},
    addEventListener() {},
    removeEventListener() {},
    innerWidth: 400,
    pageYOffset: 0,
    location: { origin: 'https://example.test' },
    IntersectionObserver: class { observe() {} unobserve() {} },
    CustomEvent: class CustomEvent {},
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  const context = createContext(sandbox);
  runInContext(readFileSync(join(root, 'assets/js/main.js'), 'utf8'), context);
  return { context, document, byId };
}

test('Escape closes the member menu and the other overlays', () => {
  const { context, document, byId } = loadTheme();
  const theme = new context.CyberpunkTheme();
  byId.mobileNavigation.classList.add('active');
  byId.mobileMenuToggle.classList.add('active');
  byId.searchOverlay.classList.add('active');
  byId.memberDropdown.classList.add('active');
  document.body.style.overflow = 'hidden';

  theme.handleKeyboard({ key: 'Escape' });

  assert.equal(byId.memberDropdown.classList.contains('active'), false);
  assert.equal(byId.searchOverlay.classList.contains('active'), false);
  assert.equal(byId.mobileNavigation.classList.contains('active'), false);
  assert.equal(document.body.style.overflow, '');
});

test('a non-Escape key leaves the member menu open', () => {
  const { context, byId } = loadTheme();
  const theme = new context.CyberpunkTheme();
  byId.memberDropdown.classList.add('active');

  theme.handleKeyboard({ key: 'k' });

  assert.equal(byId.memberDropdown.classList.contains('active'), true);
});

test('Escape with no member menu still closes search', () => {
  const { context, document, byId } = loadTheme();
  const theme = new context.CyberpunkTheme();
  delete byId.memberDropdown;
  byId.searchOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  theme.handleKeyboard({ key: 'Escape' });

  assert.equal(byId.searchOverlay.classList.contains('active'), false);
  assert.equal(document.body.style.overflow, '');
});
