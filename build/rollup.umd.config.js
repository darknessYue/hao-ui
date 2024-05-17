import basicConfig, { name, file } from './rollup.config.js'
export default {
  ...basicConfig,
  output: {
    name,
    file: file('umd'),
    format: 'umd',
    globals: {
      'vue': 'Vue',
      'lodash-es': '_',
      'axios': 'axios'
    },
    exports: 'named'
  }
}