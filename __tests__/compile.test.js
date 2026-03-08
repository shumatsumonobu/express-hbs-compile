const path = require('path');
const compile = require('../dist/build.common.js');

const VIEWS_DIR = path.join(__dirname, 'views');
const PARTIALS_DIR = path.join(VIEWS_DIR, 'partials');
const LAYOUTS_DIR = path.join(VIEWS_DIR, 'layout');
const DEFAULT_LAYOUT = path.join(LAYOUTS_DIR, 'default.hbs');

describe('Initialization', () => {
  // viewsDir is the only required option.
  test('should throw TypeError when viewsDir is not provided', () => {
    expect(() => compile({})).toThrow(TypeError);
    expect(() => compile({})).toThrow('The viewsDir option is required');
  });

  // Directories and files referenced in options must exist on the filesystem.
  test('should throw TypeError when viewsDir does not exist', () => {
    expect(() => compile({viewsDir: '/nonexistent/path'})).toThrow(TypeError);
    expect(() => compile({viewsDir: '/nonexistent/path'})).toThrow('View directory not found');
  });

  test('should throw TypeError when partialsDir does not exist', () => {
    expect(() => compile({
      viewsDir: VIEWS_DIR,
      partialsDir: '/nonexistent/partials',
    })).toThrow(TypeError);
    expect(() => compile({
      viewsDir: VIEWS_DIR,
      partialsDir: '/nonexistent/partials',
    })).toThrow('Partial directory not found');
  });

  test('should throw TypeError when layoutsDir does not exist', () => {
    expect(() => compile({
      viewsDir: VIEWS_DIR,
      layoutsDir: '/nonexistent/layout',
    })).toThrow(TypeError);
    expect(() => compile({
      viewsDir: VIEWS_DIR,
      layoutsDir: '/nonexistent/layout',
    })).toThrow('Layout directory not found');
  });

  test('should throw TypeError when defaultLayout does not exist', () => {
    expect(() => compile({
      viewsDir: VIEWS_DIR,
      defaultLayout: '/nonexistent/default.hbs',
    })).toThrow(TypeError);
    expect(() => compile({
      viewsDir: VIEWS_DIR,
      defaultLayout: '/nonexistent/default.hbs',
    })).toThrow('Default layout file not found');
  });

  // When optional paths are omitted, defaults should be derived from viewsDir.
  test('should initialize successfully with only viewsDir specified', () => {
    expect(() => compile({viewsDir: VIEWS_DIR})).not.toThrow();
  });

  test('should initialize successfully with all options explicitly specified', () => {
    expect(() => compile({
      viewsDir: VIEWS_DIR,
      partialsDir: PARTIALS_DIR,
      layoutsDir: LAYOUTS_DIR,
      defaultLayout: DEFAULT_LAYOUT,
    })).not.toThrow();
  });
});

describe('Rendering', () => {
  let render;

  beforeEach(() => {
    render = compile({viewsDir: VIEWS_DIR});
  });

  // Basic template compilation with data variables.
  test('should compile a template with data', async () => {
    const html = await render('data-and-partial.hbs', {name: 'World'});
    expect(html).toBe('<p>This is a partial view</p><p>Hello, World</p>');
  });

  // Template compilation without any data.
  test('should compile a template without data', async () => {
    const html = await render('no-data.hbs');
    expect(html).toBe('<p>Static content</p>');
  });

  // Relative paths are resolved from viewsDir.
  test('should resolve a relative template path from viewsDir', async () => {
    const html = await render('data-and-partial.hbs', {name: 'Test'});
    expect(html).toContain('Hello, Test');
  });

  // Absolute paths are used as-is.
  test('should accept an absolute template path', async () => {
    const absolutePath = path.join(VIEWS_DIR, 'data-and-partial.hbs');
    const html = await render(absolutePath, {name: 'Absolute'});
    expect(html).toContain('Hello, Absolute');
  });

  // Partial templates should be included in the output.
  test('should render partial templates', async () => {
    const html = await render('data-and-partial.hbs', {name: 'Test'});
    expect(html).toContain('This is a partial view');
  });

  // The built-in eq helper from handlebars-extd should be available.
  test('should support built-in eq helper from handlebars-extd', async () => {
    const html = await render('builtin-helper.hbs', {gender: 1});
    expect(html).toBe('<p>Male</p>');
  });

  // Custom helpers registered via the helpers option should work in templates.
  test('should support custom helpers registered via options', async () => {
    const renderWithHelper = compile({
      viewsDir: VIEWS_DIR,
      helpers: {
        sayhello: name => `Hello, ${name}`,
      },
    });
    const html = await renderWithHelper('custom-helper.hbs');
    expect(html).toBe('<p>Hello, Emma</p>');
  });
});

describe('Render error handling', () => {
  let render;

  beforeEach(() => {
    render = compile({viewsDir: VIEWS_DIR});
  });

  // Non-existent template files should cause a rejection.
  test('should reject with TypeError when template file does not exist', async () => {
    await expect(render('nonexistent.hbs')).rejects.toThrow(TypeError);
    await expect(render('nonexistent.hbs')).rejects.toThrow('Template not found');
  });

  // Reserved keys (settings, cache, layout) must not appear in data.
  test('should reject with TypeError when data contains "settings" key', async () => {
    await expect(render('data-and-partial.hbs', {settings: {}})).rejects.toThrow(TypeError);
    await expect(render('data-and-partial.hbs', {settings: {}})).rejects.toThrow('reserved words');
  });

  test('should reject with TypeError when data contains "cache" key', async () => {
    await expect(render('data-and-partial.hbs', {cache: true})).rejects.toThrow(TypeError);
    await expect(render('data-and-partial.hbs', {cache: true})).rejects.toThrow('reserved words');
  });

  test('should reject with TypeError when data contains "layout" key', async () => {
    await expect(render('data-and-partial.hbs', {layout: 'custom'})).rejects.toThrow(TypeError);
    await expect(render('data-and-partial.hbs', {layout: 'custom'})).rejects.toThrow('reserved words');
  });
});
