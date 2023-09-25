import CompilerOptions from '~/interfaces/CompilerOptions';
/**
 * express-hbs compiler.
 */
export default class {
    #private;
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
    constructor(options: CompilerOptions);
    /**
     * Get the result of template compilation.
     *
     * @param {string} template File name or absolute path of the template. If only the file name is specified, the template is searched from the directory specified by the viewsDir option.
     * @param {object} data? Objects to be expanded on the template. settings, cache, and layout are reserved words and cannot be used as key names for data.
     * @return {Promise<string>} Compiled HTML string.
     * @throws {TypeError} Throws an exception if any of the data keys contain reserved words (settings, cache, layout).
     * @throws {TypeError} Throws an exception if the template file cannot be found.
     */
    render(template: string, data?: object): Promise<string>;
}
