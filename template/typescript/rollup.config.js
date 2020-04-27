import url from '@rollup/plugin-url';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import babel from 'rollup-plugin-babel';
import svgr from '@svgr/rollup';
import sass from 'node-sass';

import pkg from './package.json';

const jsExtensions = ['.js', '.jsx', '.ts', '.tsx'];
const styleExtensions = ['.css', '.sass', '.scss'];

export default {
  input: 'src/index.tsx',
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
      styleExtensions,
      plugins: [autoprefixer],
    }),
    url(),
    svgr(),
    resolve({ jsExtensions }),
    typescript({
      clean: true,
    }),
    commonjs(),
    terser(),
    babel({
      jsExtensions,
      exclude: 'node_modules/**',
    }),
  ],
};
