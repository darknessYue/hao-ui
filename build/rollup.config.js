import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
// import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs';
// import pkg from '../package.json' assert { type: 'json' }
export const name = 'ppsp-ui'
export const file = type => `dist/ppsp-ui.${type}.js`
const overrides = {
  compilerOptions: {
    // noImplicitAny: false,
    // allowImportingTsExtensions: false,
    declaration: true,
    
  },
  exclude: [
    'node_modules',
    'src/App.vue',
    'src/main.ts',
  ],
  // include: ['src/App.vue']
}

export default {
  input: 'src/index.ts',
  output: {
    file: file('esm'),
    format: 'es'
  },
  plugins: [
    nodeResolve(),
    // commonjs(),
    vue({
      target: 'browser',
    }),
    typescript({
      tsconfigOverride: overrides,
      useTsconfigDeclarationDir: true
    }),
    css({
      output: 'ppsp-ui.min.css'
    }),
  ],
  external: ["vue", "lodash-es", "axios"]
  // external: (id) => {
  //   return /^vue/.test(id)
  // }
}