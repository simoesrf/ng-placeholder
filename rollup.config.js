// rollup.config.js
import uglify from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript';

const outputFile = process.env.NODE_ENV === 'min' ? './dist/ng-placeholder.min.js' : './dist/ng-placeholder.js';
const plugins = process.env.NODE_ENV === 'min' ? [typescript(), uglify()] : [typescript()];

export default {
  input: './src/Placeholder.ts',
  output: {
    name: 'ngPlaceholder',
    file: outputFile,
    format: 'iife'
  },
  globals: {
    angular: 'angular'
  },
  external: ['angular'],
  plugins: plugins
}