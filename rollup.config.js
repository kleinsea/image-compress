import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
const config = {
  input: 'src/index.ts',
  output: [
    { file: 'dist/index.js', format: 'esm' }
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),  
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      extensions: ['.js', '.ts']
    })
  ]
}
export default config