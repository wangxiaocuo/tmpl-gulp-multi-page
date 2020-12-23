/**
 * 处理 静态资源
 */
const { src, dest, series } = require('gulp')
const clean = require('gulp-clean')

function cleanAssets() {
  return src('dist/assets', { read: false, allowEmpty: true }).pipe(clean())
}

function handleAssets() {
  return src('src/assets/**/*').pipe(dest('dist/assets'))
}

exports.default = series(cleanAssets, handleAssets)
