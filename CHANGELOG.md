# Changelog

All notable changes to this project will be documented in this file.

## [1.0.2] - 2026-03-08

### Fixed

- **Promise rejection bug** — Fixed a typo that could cause unhandled promise errors in edge cases.

### Changed

- **Reduced dependencies** — Removed `deep-fusion` dependency; options merging now uses native object spread.
- **Updated all dependencies** to their latest versions (rollup v4, TypeScript 5.9, jest 30, etc.).
- **Improved TypeScript declarations** — Richer JSDoc with `@example` and `@default` annotations for better IDE support.

[1.0.2]: https://github.com/shumatsumonobu/express-hbs-compile/compare/v1.0.1...v1.0.2

## [1.0.1] - 2024-02-22

### Added

- **Custom Handlebars helpers** — Register your own helpers via the `helpers` option and use them directly in templates.

```js
const render = compile({
  viewsDir: path.join(__dirname, 'views'),
  helpers: {
    shout: str => str.toUpperCase() + '!',
  },
});

const html = await render('index.hbs', {greeting: 'hello'});
// Template: <p>{{shout greeting}}</p>
// Output:   <p>HELLO!</p>
```

## [1.0.0] - 2023-09-25

### Added

- Initial release with core template compilation API.
- Layout, partial, and data variable support.
- Built-in helpers from [handlebars-extd](https://shumatsumonobu.github.io/handlebars-extd/) (`eq`, `ne`, `gt`, `gte`, `lt`, `lte`, etc.).

[1.0.1]: https://github.com/shumatsumonobu/express-hbs-compile/compare/v1.0.0...v1.0.1
