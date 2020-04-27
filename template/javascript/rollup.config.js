import url from '@rollup/plugin-url';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import babel from 'rollup-plugin-babel';
import svgr from '@svgr/rollup';
import sass from 'node-sass';

import pkg from './package.json';

const jsExtensions = ['.js', '.jsx'];
const styleExtensions = ['.css', '.sass', '.scss'];

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      sourcemap: true,
      exports: 'named',
      format: 'cjs',
    },
    {
      file: pkg.module,
      sourcemap: true,
      exports: 'named',
      format: 'es',
    },
  ],
  plugins: [
    peerDepsExternal(),
    postcss({
      preprocessor: (content, id) =>
        new Promise((resolve) => {
          const result = sass.renderSync({ file: id });
          resolve({ code: result.css.toString() });
        }),
      autoModules: true,
      extensions: styleExtensions,
      plugins: [autoprefixer],
    }),
    url(),
    svgr(),
    resolve({
      extensions: jsExtensions,
    }),
    babel({
      extensions: jsExtensions,
      exclude: 'node_modules/**',
    }),
    commonjs(),
    terser(),
  ],
};
