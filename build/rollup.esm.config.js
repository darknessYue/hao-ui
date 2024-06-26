
import basicConfig, { name, file } from './rollup.config.js'
import dts from 'rollup-plugin-dts';
export default [{
  ...basicConfig,
  output: {
    name,
    file: file('esm'),
    format: 'es',
    preserveModules: false
  }
}, {
  ...basicConfig,
  output: 
  {
    file: 'dist/ppsp-ui.d.ts',
    format: 'es',
  },
  plugins: [
    ...basicConfig.plugins,
    dts()
  ]
}]