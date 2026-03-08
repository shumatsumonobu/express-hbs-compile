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
    #private;
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
    constructor(options: CompilerOptions);
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
    render(template: string, data?: object): Promise<string>;
}
