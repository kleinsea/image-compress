import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
const config = {
  input: 'src/index.ts',
  output: [
    { file: 'dist/index.js', format: 'esm' }
  ],
  plugins: [
    resolve(),
    typescript(),  
    terser()
  ]
}
export default config