const path = require('path');
const hbs = require('../dist/build.common.js');
// const hbs = require('express-hbs-compile');

test('Any partialsDir, layoutsDir, defaultLayout should be readable', async () => {
  const render = hbs({
    viewsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/partials'),
    layoutsDir: path.join(__dirname, 'views/layout'),
    defaultLayout: path.join(__dirname, 'views/layout/default.hbs'),
  });
  const html = await render('basic.hbs', {name: 'foo'});
  expect(html).toBe('<p>This is a partial view</p><p>Hello, foo</p>');
});

test('If the partialsDir option is omitted, the default partial template should be loaded', async () => {
  const render = hbs({
    viewsDir: path.join(__dirname, 'views'),
    layoutsDir: path.join(__dirname, 'views/layout'),
    defaultLayout: path.join(__dirname, 'views/layout/default.hbs'),
  });
  const html = await render('basic.hbs', {name: 'foo'});
  expect(html).toBe('<p>This is a partial view</p><p>Hello, foo</p>');
});

test('If the layoutsDir option is omitted, the default layout template should be loaded', async () => {
  const render = hbs({
    viewsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/partials'),
    defaultLayout: path.join(__dirname, 'views/layout/default.hbs'),
  });
  const html = await render('basic.hbs', {name: 'foo'});
  expect(html).toBe('<p>This is a partial view</p><p>Hello, foo</p>');
});

test('If the defaultLayout option is omitted, the default layout template should be loaded', async () => {
  const render = hbs({
    viewsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/partials'),
    layoutsDir: path.join(__dirname, 'views/layout'),
  });
  const html = await render('basic.hbs', {name: 'foo'});
  expect(html).toBe('<p>This is a partial view</p><p>Hello, foo</p>');
});

test('eq custom helpers should be available', async () => {
  const render = hbs({
    viewsDir: path.join(__dirname, 'views'),
  });
  const html = await render('eq-helper.hbs', {gender: 1});
  expect(html).toBe('<p>Male</p>');
});

test('Custom helpers must work', async () => {
  const render = hbs({
    viewsDir: path.join(__dirname, 'views'),
    helpers: {
      sayhello: name => `Hello, ${name}`,
    }
  });
  const html = await render('custom-helper.hbs');
  expect(html).toBe('<p>Hello, Emma</p>');
});