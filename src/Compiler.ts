import path from 'path';
import fs from 'fs';
import hbs from 'handlebars-extd';
import {merge} from 'deep-fusion';
import CompilerOptions from '~/interfaces/CompilerOptions';
import expressHbs from 'express-hbs';
// const expressHbs = require('express-hbs');

/**
 * express-hbs compiler.
 */
export default class {
  /**
   * Render Instance.
   * @type {ExpressHbs.prototype.___express}
   */
  #render: any;

  /**
   * Compilation options.
   * @type {ExpressHbs.prototype.___express}
   */
  #options: Required<CompilerOptions>;

  /**
   * Initialize compiler.
   *
   * @param {CompilerOptions} options Compilation options.
   * @throws {TypeError} Throws an exception if the viewsDir option is unset.
   * @throws {TypeError} Throws an exception if the directory specified by the viewsDir option is not found.
   * @throws {TypeError} Throws an exception if the directory specified by the partialsDir option is not found.
   * @throws {TypeError} Throws an exception if the directory specified by the layoutsDir option is not found.
   * @throws {TypeError} Throws an exception if the file specified by the defaultLayout option is not found.
   */
  constructor(options: CompilerOptions) {
    // If the viewsDir option is not entered, an error is returned.
    if (!options.viewsDir)
      throw new TypeError('The viewsDir option is required');

    // Initialize options.
    this.#options = this.#initOptions(options);

    // Validate options.
    this.#validateOptions(this.#options);

    // Create a render instance.
    this.#render = expressHbs.create().express4({
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
   * Get the result of template compilation.
   *
   * @param {string} template File name or absolute path of the template. If only the file name is specified, the template is searched from the directory specified by the viewsDir option.
   * @param {object} data? Objects to be expanded on the template. settings, cache, and layout are reserved words and cannot be used as key names for data.
   * @return {Promise<string>} Compiled HTML string.
   * @throws {TypeError} Throws an exception if any of the data keys contain reserved words (settings, cache, layout).
   * @throws {TypeError} Throws an exception if the template file cannot be found.
   */
  async render(template: string, data?: object): Promise<string> {
    return new Promise<string>((resolve, rejetct) => {
      // If a reserved word (settings, cache, layout) is present in the data key, an error is returned.
      if (data) {
        const reservedWords = ['settings', 'cache', 'layout'];
        for (let key of reservedWords)
          if (data.hasOwnProperty(key))
            return void rejetct(new TypeError('Cannot use reserved words (settings, cache, layout) as data keys'));
      }

      // If the template is a file name only, convert it to an absolute path.
      if (!path.isAbsolute(template))
        template = path.join(this.#options.viewsDir, template);

      // If the template file cannot be found, an error is returned.
      if (!fs.existsSync(template))
        return void rejetct(new TypeError(`Template not found (${template})`));

      // Execute compilation.
      this.#render(template, {
        settings: {views: undefined},
        cache: false,
        ...data,
      }, (error: any, html: string) => {
        if (error)
          return void rejetct(error);
        resolve(html);
      });
    });
  }

  /**
   * Initialize options.
   *
   * @param {CompilerOptions} options Compilation options.
   * @return {Required<CompilerOptions>}  Options with all optional items set.
   */
  #initOptions(options: CompilerOptions): Required<CompilerOptions> {
    // Initialize options.
    options = merge({
      viewsDir: undefined,
      partialsDir: undefined,
      layoutsDir: undefined,
      defaultLayout: undefined,
      extname: '.hbs',
      contentHelperName: 'contentFor',
      blockHelperName: 'block',
    }, options);

    // If no partial directory is specified, the default value is set.
    if (!options.partialsDir)
      options.partialsDir = path.join(options.viewsDir, 'partials');

    // If no layout directory is specified, the default value is set.
    if (!options.layoutsDir)
      options.layoutsDir = path.join(options.viewsDir, 'layout');

    // If no default layout file is specified, the default value is set.
    if (!options.defaultLayout)
      options.defaultLayout = path.join(options.layoutsDir, 'default.hbs');
    return options as Required<CompilerOptions>;
  }

  /**
   * Validate options.
   *
   * @param {CompilerOptions} options Compilation options.
   * @throws {TypeError} Throws an exception if the directory specified by the viewsDir option is not found.
   * @throws {TypeError} Throws an exception if the directory specified by the partialsDir option is not found.
   * @throws {TypeError} Throws an exception if the directory specified by the layoutsDir option is not found.
   * @throws {TypeError} Throws an exception if the file specified by the defaultLayout option is not found.
   */
  #validateOptions(options: Required<CompilerOptions>) {
    // If the view directory is not found, return an error.
    if (!fs.existsSync(options.viewsDir))
      throw new TypeError(`View directory not found (${options.viewsDir})`);

    // If the partial directory is not found, return an error.
    for (let partialsDir of Array.isArray(options.partialsDir) ? options.partialsDir : [options.partialsDir])
      if (!fs.existsSync(partialsDir))
        throw new TypeError(`Partial directory not found (${partialsDir})`);

    // If the layout directory is not found, return an error.
    if (!fs.existsSync(options.layoutsDir))
      throw new TypeError(`Layout directory not found (${options.layoutsDir})`);

    // If the default layout file is not found, return an error.
    if (!fs.existsSync(options.defaultLayout))
      throw new TypeError(`Default layout file not found (${options.defaultLayout})`);
  }
}