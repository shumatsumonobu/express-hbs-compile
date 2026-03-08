import Handlebars from 'handlebars';

/**
 * Options for configuring the Handlebars template compiler.
 *
 * @example
 * ```typescript
 * // Minimal configuration (only viewsDir is required)
 * const options: CompilerOptions = {
 *   viewsDir: path.join(__dirname, 'views'),
 * };
 *
 * // Full configuration
 * const options: CompilerOptions = {
 *   viewsDir: path.join(__dirname, 'views'),
 *   partialsDir: [
 *     path.join(__dirname, 'views/partials'),
 *     path.join(__dirname, 'views/shared'),
 *   ],
 *   layoutsDir: path.join(__dirname, 'views/layout'),
 *   defaultLayout: path.join(__dirname, 'views/layout/default.hbs'),
 *   extname: '.hbs',
 *   helpers: {
 *     uppercase: (str: string) => str.toUpperCase(),
 *   },
 * };
 * ```
 */
export default interface CompilerOptions {
  /**
   * Absolute path to the directory containing template files.
   * This is the only required option.
   *
   * @example
   * ```typescript
   * viewsDir: path.join(__dirname, 'views')
   * ```
   */
  viewsDir: string;

  /**
   * Absolute path(s) to the directory containing partial templates.
   * Accepts a single path or an array of paths for multiple partial directories.
   *
   * @default `path.join(viewsDir, 'partials')`
   *
   * @example
   * ```typescript
   * // Single directory
   * partialsDir: path.join(__dirname, 'views/partials')
   *
   * // Multiple directories
   * partialsDir: [
   *   path.join(__dirname, 'views/partials'),
   *   path.join(__dirname, 'views/shared'),
   * ]
   * ```
   */
  partialsDir?: string|string[];

  /**
   * Absolute path to the directory containing layout templates.
   *
   * @default `path.join(viewsDir, 'layout')`
   *
   * @example
   * ```typescript
   * layoutsDir: path.join(__dirname, 'views/layout')
   * ```
   */
  layoutsDir?: string;

  /**
   * Absolute path to the default layout file used when no layout is explicitly specified in a template.
   *
   * @default `path.join(layoutsDir, 'default.hbs')`
   *
   * @example
   * ```typescript
   * defaultLayout: path.join(__dirname, 'views/layout/default.hbs')
   * ```
   */
  defaultLayout?: string;

  /**
   * File extension for layout and partial templates.
   *
   * @default '.hbs'
   *
   * @example
   * ```typescript
   * extname: '.handlebars'
   * ```
   */
  extname?: string;

  /**
   * Name of the Handlebars helper used for defining named content blocks in templates.
   *
   * @default 'contentFor'
   */
  contentHelperName?: string;

  /**
   * Name of the Handlebars helper used for rendering named content blocks in layouts.
   *
   * @default 'block'
   */
  blockHelperName?: string;

  /**
   * Custom Handlebars helpers to register.
   * Each key is the helper name accessible in templates, and each value is the helper function.
   *
   * @example
   * ```typescript
   * helpers: {
   *   uppercase: (str: string) => str.toUpperCase(),
   *   formatDate: (date: Date) => date.toLocaleDateString(),
   * }
   * ```
   */
  helpers?: {[key: string]: Handlebars.HelperDelegate};
}
