import path from 'path';
import fs from 'fs';
import hbs from 'handlebars-extd';
import expressHbs from 'express-hbs';
import CompilerOptions from '~/types/CompilerOptions';

/**
 * Handlebars template compiler for Express.
 * Wraps express-hbs to provide a simple async API for compiling Handlebars templates into HTML strings.
 *
 * @example
 * ```typescript
 * const compiler = new Compiler({
 *   viewsDir: path.join(__dirname, 'views'),
 * });
 *
 * const html = await compiler.render('index.hbs', {title: 'Home'});
 * ```
 */
export default class Compiler {
  /**
   * Express-hbs rendering function bound to the configured engine instance.
   * @type {Function}
   */
  #engine: any;

  /**
   * Resolved compilation options with all defaults applied.
   * @type {Required<CompilerOptions>}
   */
  #options: Required<CompilerOptions>;

  /**
   * Creates a new Compiler instance.
   *
   * @param {CompilerOptions} options Compilation options.
   * @throws {TypeError} If the viewsDir option is not provided.
   * @throws {TypeError} If the directory specified by viewsDir does not exist.
   * @throws {TypeError} If the directory specified by partialsDir does not exist.
   * @throws {TypeError} If the directory specified by layoutsDir does not exist.
   * @throws {TypeError} If the file specified by defaultLayout does not exist.
   */
  constructor(options: CompilerOptions) {
    if (!options.viewsDir)
      throw new TypeError('The viewsDir option is required');

    // Apply default values to unspecified options.
    this.#options = this.#applyDefaults(options);

    // Validate that all referenced paths exist.
    this.#validateOptions(this.#options);

    // Register custom Handlebars helpers if provided.
    if (options.helpers)
      for (let [name, func] of Object.entries(options.helpers))
        hbs.registerHelper(name, func);

    // Initialize the express-hbs rendering engine.
    this.#engine = expressHbs.create().express4({
      handlebars: hbs,
      viewsDir: this.#options.viewsDir,
      partialsDir: this.#options.partialsDir,
      layoutsDir: this.#options.layoutsDir,
      defaultLayout: this.#options.defaultLayout,
      extname: this.#options.extname,
      contentHelperName: this.#options.contentHelperName,
      blockHelperName: this.#options.blockHelperName,
    });
  }

  /**
   * Compiles a Handlebars template and returns the resulting HTML string.
   *
   * @param {string} template File name or absolute path of the template.
   *   If a relative name is given, it is resolved from the viewsDir directory.
   * @param {object} data Data object whose properties are available in the template.
   *   Note: `settings`, `cache`, and `layout` are reserved keys and must not be used.
   * @return {Promise<string>} The compiled HTML string.
   * @throws {TypeError} If any key in data is a reserved word (settings, cache, layout).
   * @throws {TypeError} If the template file does not exist.
   *
   * @example
   * ```typescript
   * // Render with a relative template path (resolved from viewsDir)
   * const html = await compiler.render('user/profile.hbs', {
   *   username: 'John',
   *   isAdmin: true,
   * });
   *
   * // Render with an absolute template path
   * const html = await compiler.render(path.join(__dirname, 'views/email/welcome.hbs'), {
   *   recipientName: 'John',
   * });
   * ```
   */
  async render(template: string, data?: object): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      // Reject if data contains reserved keys used internally by express-hbs.
      if (data) {
        const reservedKeys = ['settings', 'cache', 'layout'];
        for (let key of reservedKeys)
          if (data.hasOwnProperty(key))
            return void reject(new TypeError('Cannot use reserved words (settings, cache, layout) as data keys'));
      }

      // Resolve relative template names to absolute paths using viewsDir.
      if (!path.isAbsolute(template))
        template = path.join(this.#options.viewsDir, template);

      // Verify the template file exists before attempting compilation.
      if (!fs.existsSync(template))
        return void reject(new TypeError(`Template not found (${template})`));

      // Execute the express-hbs rendering engine.
      this.#engine(template, {
        settings: {views: undefined},
        cache: false,
        ...data,
      }, (error: any, html: string) => {
        if (error)
          return void reject(error);
        resolve(html);
      });
    });
  }

  /**
   * Merges user-provided options with default values.
   * Sets default paths for partialsDir, layoutsDir, and defaultLayout based on viewsDir
   * when they are not explicitly specified.
   *
   * @param {CompilerOptions} options User-provided compilation options.
   * @return {Required<CompilerOptions>} Fully resolved options with all defaults applied.
   */
  #applyDefaults(options: CompilerOptions): Required<CompilerOptions> {
    options = {
      partialsDir: undefined,
      layoutsDir: undefined,
      defaultLayout: undefined,
      extname: '.hbs',
      contentHelperName: 'contentFor',
      blockHelperName: 'block',
      helpers: undefined,
      ...options,
    };

    // Default partialsDir to <viewsDir>/partials.
    if (!options.partialsDir)
      options.partialsDir = path.join(options.viewsDir, 'partials');

    // Default layoutsDir to <viewsDir>/layout.
    if (!options.layoutsDir)
      options.layoutsDir = path.join(options.viewsDir, 'layout');

    // Default defaultLayout to <layoutsDir>/default.hbs.
    if (!options.defaultLayout)
      options.defaultLayout = path.join(options.layoutsDir, 'default.hbs');

    return options as Required<CompilerOptions>;
  }

  /**
   * Validates that all directories and files referenced in the options exist on the filesystem.
   *
   * @param {Required<CompilerOptions>} options Fully resolved compilation options.
   * @throws {TypeError} If the viewsDir directory does not exist.
   * @throws {TypeError} If any partialsDir directory does not exist.
   * @throws {TypeError} If the layoutsDir directory does not exist.
   * @throws {TypeError} If the defaultLayout file does not exist.
   */
  #validateOptions(options: Required<CompilerOptions>) {
    if (!fs.existsSync(options.viewsDir))
      throw new TypeError(`View directory not found (${options.viewsDir})`);

    for (let partialsDir of Array.isArray(options.partialsDir) ? options.partialsDir : [options.partialsDir])
      if (!fs.existsSync(partialsDir))
        throw new TypeError(`Partial directory not found (${partialsDir})`);

    if (!fs.existsSync(options.layoutsDir))
      throw new TypeError(`Layout directory not found (${options.layoutsDir})`);

    if (!fs.existsSync(options.defaultLayout))
      throw new TypeError(`Default layout file not found (${options.defaultLayout})`);
  }
}
