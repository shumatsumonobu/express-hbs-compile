import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import pkg from './package.json' with {type: 'json'};

export default {
  input: './src/index.ts',
  plugins: [
    // Resolve module entry points that lack a proper "main" field.
    alias({
      entries: {
        'express-hbs': 'express-hbs/lib/hbs.js',
        'handlebars-extd': 'handlebars-extd/dist/build.common.js',
      }
    }),

    // Compile TypeScript and emit declaration files.
    typescript({
      tsconfigDefaults: {compilerOptions: {}},
      tsconfig: 'tsconfig.json',
      tsconfigOverride: {compilerOptions: {}},
      useTsconfigDeclarationDir: true
    }),

    // Minify the output bundle.
    terser(),

    // Allow importing JSON files.
    json(),

    // Convert CommonJS dependencies to ES modules.
    commonjs(),

    // Resolve bare module specifiers from node_modules.
    nodeResolve({
      mainFields: ['module', 'main'],
    })
  ],

  // Output both ESM and CJS bundles.
  output: [
    {
      format: 'esm',
      file: pkg.module
    }, {
      format: 'cjs',
      file: pkg.main
    }
  ],

  // Watch mode configuration for development.
  watch: {
    exclude: 'node_modules/**',
    include: 'src/**'
  }
}
