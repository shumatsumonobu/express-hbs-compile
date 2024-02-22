# express-hbs-compile
Get HTML string compiled by express-hbs.  
Click [here](CHANGELOG.md) to see the change log.

## Installation
```sh
npm install --save express-hbs-compile
```

## API
### `hbs()`
Create render function with options.

```js
const hbs = require('express-hbs-compile');

const render = hbs({
  viewsDir: path.join(__dirname, 'views'),
  partialsDir: path.join(__dirname, 'views/partials'),
  layoutsDir: path.join(__dirname, 'views/layout'),
  defaultLayout: path.join(__dirname, 'views/layout/default.hbs'),
  extname: '.hbs',
  contentHelperName: 'contentFor',
  blockHelperName: 'block',
  // helpers: {
  //   sayhello: name => `Hello, ${name}`,
  // }
});
```

#### Parameters
- {string} <code>viewsDir</code> The absolute directory path of the template. This option is required.
- {string|string[]} <code>partialsDir?</code> Directory absolute path of the partial template. One or more directories can be set. Default is &quot;path.join(options.viewsDir, &#039;partials&#039;)&quot;.
- {string} <code>layoutsDir?</code> Directory absolute path of the layout template. Default is &quot;path.join(options.viewsDir, &#039;layout&#039;)&quot;.
- {string} <code>defaultLayout?</code> Absolute path of the default layout file. Default is &quot;path.join(options.layoutsDir, &#039;default.hbs&#039;)&quot;.
- {string} <code>extname?</code> Extension for layout and partial templates. Default is `.hbs`&quot;.
- {string} <code>contentHelperName?</code> Override the &#039;contentFor&#039; helper name used in the template.
- {string} <code>blockHelperName?</code> Override the &#039;block&#039; helper name used in the template.
- {{[key: string]: Handlebars.HelperDelegate}} <code>helpers</code> A helper accessible from the template. The key is the helper name and the value is the object that will be the helper function.

#### Return value
{(filePath: string, data?: object) =&gt; Promise&lt;string&gt;} Returns the render function.

#### Exceptions
- {TypeError} Throws an exception if the viewsDir option is unset.
- {TypeError} Throws an exception if the directory specified by the viewsDir option is not found.
- {TypeError} Throws an exception if the directory specified by the partialsDir option is not found.
- {TypeError} Throws an exception if the directory specified by the layoutsDir option is not found.
- {TypeError} Throws an exception if the file specified by the defaultLayout option is not found.

### `render()`
Receive the result of compiling the template as a string.  
**The handlebars used internally are extended and can use custom helpers found [here](https://takuya-motoshima.github.io/handlebars-extd/).**

```js
const hbs = require('express-hbs-compile');

const render = hbs({
  viewsDir: path.join(__dirname, 'views'),
});

// Compile template.
const html = await render('index.hbs', {name: 'foo'});
```

#### Parameters
- {string} <code>template</code> File name or absolute path of the template. If only the file name is specified, the template is searched from the directory specified by the viewsDir option.
- {object} <code>data?</code> Objects to be expanded on the template. settings, cache, and layout are reserved words and cannot be used as key names for data.

#### Return value
{Promise&lt;string&gt;} Compiled HTML string.

#### Exceptions
- {TypeError} Throws an exception if any of the data keys contain reserved words (settings, cache, layout).
- {TypeError} Throws an exception if the template file cannot be found.

## Testing
With [npm](http://npmjs.org) do:

```sh
npm test
```

## Author
**Takuya Motoshima**

* [github/takuya-motoshima](https://github.com/takuya-motoshima)
* [twitter/TakuyaMotoshima](https://twitter.com/TakuyaMotoshima)
* [facebook/takuya.motoshima.7](https://www.facebook.com/takuya.motoshima.7)

## License
[MIT](LICENSE)