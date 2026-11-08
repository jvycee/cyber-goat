import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { createContext, runInContext } from 'node:vm';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

function makeElement(tag) {
  const classes = new Set();
  const listeners = [];
  const el = {
    tag,
    id: '',
    listeners,
    style: {},
    classList: {
      add(name) { classes.add(name); },
      remove(name) { classes.delete(name); },
      toggle(name) {
        if (classes.has(name)) {
          classes.delete(name);
          return false;
        }
        classes.add(name);
        return true;
      },
      contains(name) { return classes.has(name); },
    },
  };
  el.addEventListener = (type, fn) => listeners.push({ type, fn });
  el.contains = () => false;
  return el;
}

test('collapsed table of contents hides the title and links and keeps the toggle', () => {
  const css = readFileSync(join(root, 'assets/css/cyberpunk-effects.css'), 'utf8');
  assert.match(
    css,
    /\.toc-container\.collapsed \.toc-title,\s*\.toc-container\.collapsed \.toc-nav \{\s*display: none;\s*\}/
  );
  assert.doesNotMatch(css, /\.toc-container\.collapsed \.toc-toggle \{\s*display: none;\s*\}/);
});

test('the contents button toggles the collapsed class on and off', () => {
  const byId = {
    tableOfContents: makeElement('aside'),
    tocNav: makeElement('nav'),
    tocToggle: makeElement('button'),
  };
  const document = {
    readyState: 'loading',
    body: makeElement('body'),
    documentElement: { style: { setProperty() {} } },
    addEventListener() {},
    removeEventListener() {},
    createElement: () => makeElement('div'),
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
    innerWidth: 1024,
    pageYOffset: 0,
    IntersectionObserver: class { observe() {} unobserve() {} },
    CustomEvent: class CustomEvent {},
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  const context = createContext(sandbox);
  runInContext(readFileSync(join(root, 'assets/js/main.js'), 'utf8'), context);

  const clicks = byId.tocToggle.listeners.filter((listener) => listener.type === 'click');
  assert.equal(clicks.length, 1);
  clicks[0].fn();
  assert.equal(byId.tableOfContents.classList.contains('collapsed'), true);
  clicks[0].fn();
  assert.equal(byId.tableOfContents.classList.contains('collapsed'), false);
});
