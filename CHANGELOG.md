# Changelog
All notable changes to this project will be documented in this file.

## [1.0.1] - 2024/2/22
### Changed
- Helpers can now be registered from the compile options.  
    views/index.hbs:
    ```html
    <p>{{sayhello 'Emma'}}</p>
    ```

    JS:
    ```js
    const hbs = require('express-hbs-compile');
    
    const render = hbs({
      viewsDir: path.join(__dirname, 'views'),
      helpers: {
        sayhello: name => `Hello, ${name}`,
      }
    });

    // "Hello, Emma" is returned.
    const html = await render('index.hbs');
    ```
    

## [1.0.0] - 2023/9/25
### Added
- First release.

[1.0.1]: https://github.com/takuya-motoshima/express-hbs-compile/compare/v1.0.0...v1.0.1