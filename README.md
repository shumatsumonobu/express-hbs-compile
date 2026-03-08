# express-hbs-compile

Compile Handlebars templates into HTML strings, powered by [express-hbs](https://github.com/barc/express-hbs).

## Installation

```sh
npm install express-hbs-compile
```

## Quick Start

Import the package and call `compile()` with the path to your template directory.
This returns an async `render` function that compiles a Handlebars template into an HTML string.

```js
import path from 'path';
import compile from 'express-hbs-compile';

// 1. Create a render function by specifying where your templates live.
const render = compile({
  viewsDir: path.join(import.meta.dirname, 'views'),
});

// 2. Render a template with data — returns a Promise<string>.
const html = await render('index.hbs', {title: 'Home'});
console.log(html); // => compiled HTML string
```

> **Note:** `import.meta.dirname` requires Node 20.11+. For older versions, use `__dirname` (CommonJS) or `dirname(fileURLToPath(import.meta.url))` (ESM).
>
> CommonJS is also supported: `const compile = require('express-hbs-compile');`

## API

### `compile(options)`

Creates a render function bound to the given options.
All paths except `viewsDir` have sensible defaults and are optional.

```js
const render = compile({
  viewsDir: path.join(import.meta.dirname, 'views'),
  partialsDir: path.join(import.meta.dirname, 'views/partials'),
  layoutsDir: path.join(import.meta.dirname, 'views/layout'),
  defaultLayout: path.join(import.meta.dirname, 'views/layout/default.hbs'),
  extname: '.hbs',
  helpers: {
    shout: str => str.toUpperCase() + '!',
  },
});
```

#### Options

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `viewsDir` | `string` | Yes | | Absolute path to the template directory. |
| `partialsDir` | `string \| string[]` | No | `<viewsDir>/partials` | Absolute path(s) to partial template directories. |
| `layoutsDir` | `string` | No | `<viewsDir>/layout` | Absolute path to the layout template directory. |
| `defaultLayout` | `string` | No | `<layoutsDir>/default.hbs` | Absolute path to the default layout file. |
| `extname` | `string` | No | `.hbs` | File extension for templates. |
| `contentHelperName` | `string` | No | `contentFor` | Name of the content block helper. |
| `blockHelperName` | `string` | No | `block` | Name of the block rendering helper. |
| `helpers` | `{[name: string]: Function}` | No | | Custom Handlebars helpers to register. |

#### Returns

`(template: string, data?: object) => Promise<string>` — an async render function.

#### Throws

- `TypeError` — if `viewsDir` is not provided.
- `TypeError` — if any specified directory or file does not exist.

### `render(template, data?)`

The function returned by `compile()`. Compiles a template and returns the resulting HTML string.

```js
// Relative path (resolved from viewsDir)
const html = await render('user/profile.hbs', {username: 'John'});

// Absolute path also works
const welcome = await render(path.join(import.meta.dirname, 'views/email/welcome.hbs'), {
  recipientName: 'John',
});
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `template` | `string` | Yes | File name or absolute path to the template. Relative names are resolved from `viewsDir`. |
| `data` | `object` | No | Data passed to the template. `settings`, `cache`, and `layout` are reserved keys. |

#### Returns

`Promise<string>` — the compiled HTML string.

#### Throws

- `TypeError` — if the template file does not exist.
- `TypeError` — if `data` contains a reserved key (`settings`, `cache`, or `layout`).

## Built-in Helpers

The internal Handlebars instance is extended with [handlebars-extd](https://shumatsumonobu.github.io/handlebars-extd/), which provides additional helpers like `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, and more.

```hbs
{{#if (eq role 'admin')}}
  <span>Admin</span>
{{/if}}
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Author

**shumatsumonobu**

- [github/shumatsumonobu](https://github.com/shumatsumonobu)
- [x/shumatsumonobu](https://x.com/shumatsumonobu)
- [facebook/takuya.motoshima.7](https://www.facebook.com/takuya.motoshima.7)

## License

[MIT](LICENSE)
