/**
 * 处理 favicon.ico
 */
const { src, dest, series } = require('gulp')
const clean = require('gulp-clean')

function cleanFavicon() {
  return src('dist/favicon.ico', { read: false, allowEmpty: true }).pipe(clean())
}

function handleFavicon() {
  return src('src/favicon.ico').pipe(dest('dist/'))
}

exports.default = series(cleanFavicon, handleFavicon)
