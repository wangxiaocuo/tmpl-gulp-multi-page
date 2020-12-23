/**
 * 处理 第三方插件
 */
const { src, dest, series } = require('gulp')
const clean = require('gulp-clean')

function cleanLib() {
  return src('dist/lib', { read: false, allowEmpty: true }).pipe(clean())
}

function handleLib() {
  return src('src/lib/**/*').pipe(dest('dist/lib/'))
}

exports.default = series(cleanLib, handleLib)
