/**
 * 处理 favicon.ico
 */
const { src, dest, series } = require('gulp')
const clean = require('gulp-clean')

function cleanFavicon() {
  return src('dist/*.ico', { read: false, allowEmpty: true }).pipe(clean())
}

function handleFavicon() {
  return src('src/*.ico').pipe(dest('dist/'))
}

exports.default = series(cleanFavicon, handleFavicon)
