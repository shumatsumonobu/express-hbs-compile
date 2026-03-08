import CompilerOptions from '~/types/CompilerOptions';
/**
 * Creates a render function that compiles Handlebars templates into HTML strings.
 *
 * @param {CompilerOptions} options Compilation options.
 * @return {(filePath: string, data?: object) => Promise<string>} An async function that
 *   accepts a template path and optional data, and returns the compiled HTML.
 * @throws {TypeError} If the viewsDir option is not provided.
 * @throws {TypeError} If the directory specified by viewsDir does not exist.
 * @throws {TypeError} If the directory specified by partialsDir does not exist.
 * @throws {TypeError} If the directory specified by layoutsDir does not exist.
 * @throws {TypeError} If the file specified by defaultLayout does not exist.
 *
 * @example
 * ```typescript
 * import compile from 'express-hbs-compile';
 *
 * const render = compile({
 *   viewsDir: path.join(__dirname, 'views'),
 * });
 *
 * const html = await render('index.hbs', {title: 'Home'});
 * ```
 */
declare const _default: (options: CompilerOptions) => ((filePath: string, data?: object) => Promise<string>);
export default _default;
