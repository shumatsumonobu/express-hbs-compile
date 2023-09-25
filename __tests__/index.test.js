const path = require('path');
const hbs = require('../dist/build.common.js');
// const hbs = require('express-hbs-compile');
const removeSpace = require('./support/removeSpace.js');

test('Any partialsDir, layoutsDir, defaultLayout should be readable', async () => {
  const render = hbs({
    viewsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/partials'),
    layoutsDir: path.join(__dirname, 'views/layout'),
    defaultLayout: path.join(__dirname, 'views/layout/default.hbs'),
  });
  const html = await render('index.hbs', {name: 'foo'});
  expect(removeSpace(html)).toBe('<html><head><title>index</title></head><body><partial>1</partial><subpartial>1</subpartial><subpartial>2</subpartial>Hello,foo</body></html>');
});

test('If the partialsDir option is omitted, the default partial template should be loaded', async () => {
  const render = hbs({
    viewsDir: path.join(__dirname, 'views'),
    layoutsDir: path.join(__dirname, 'views/layout'),
    defaultLayout: path.join(__dirname, 'views/layout/default.hbs'),
  });
  const html = await render('index.hbs', {name: 'foo'});
  expect(removeSpace(html)).toBe('<html><head><title>index</title></head><body><partial>1</partial><subpartial>1</subpartial><subpartial>2</subpartial>Hello,foo</body></html>');
});

test('If the layoutsDir option is omitted, the default layout template should be loaded', async () => {
  const render = hbs({
    viewsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/partials'),
    defaultLayout: path.join(__dirname, 'views/layout/default.hbs'),
  });
  const html = await render('index.hbs', {name: 'foo'});
  expect(removeSpace(html)).toBe('<html><head><title>index</title></head><body><partial>1</partial><subpartial>1</subpartial><subpartial>2</subpartial>Hello,foo</body></html>');
});

test('If the defaultLayout option is omitted, the default layout template should be loaded', async () => {
  const render = hbs({
    viewsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/partials'),
    layoutsDir: path.join(__dirname, 'views/layout'),
  });
  const html = await render('index.hbs', {name: 'foo'});
  expect(removeSpace(html)).toBe('<html><head><title>index</title></head><body><partial>1</partial><subpartial>1</subpartial><subpartial>2</subpartial>Hello,foo</body></html>');
});

test('eq custom helpers should be available', async () => {
  const render = hbs({
    viewsDir: path.join(__dirname, 'views'),
  });
  const html = await render('eq-helper.hbs', {gender: 1});
  expect(removeSpace(html)).toBe('<html><head><title>index</title></head><body>Male</body></html>');
});