/**
 * Compilation options.
 */
export default interface CompilerOptions {
  /**
   * The absolute directory path of the template.
   * This option is required.
   */
  viewsDir: string;

  /**
   * Directory absolute path of the partial template.
   * One or more directories can be set.
   * Default is "path.join(options.viewsDir, 'partials')".
   */
  partialsDir?: string|string[];

  /**
   * Directory absolute path of the layout template.
   * Default is "path.join(options.viewsDir, 'layout')".
   */
  layoutsDir?: string;

  /**
   * Absolute path of the default layout file.
   * Default is "path.join(options.layoutsDir, 'default.hbs')".
   */
  defaultLayout?: string;

  /**
   * Extension for layout and partial templates.
   * Default is `.hbs`".
   */
  extname?: string;

  /**
   * Override the 'contentFor' helper name used in the template.
   */
  contentHelperName?: string;

  /**
   * Override the 'block' helper name used in the template.
   */
  blockHelperName?: string;
}