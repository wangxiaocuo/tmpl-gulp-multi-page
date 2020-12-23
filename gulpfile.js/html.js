/**
 * 处理 html 文件
 */
const { src, dest, series } = require('gulp')
const clean = require('gulp-clean')
const htmlmin = require('gulp-htmlmin')
const gulpIf = require('gulp-if')
const { isProd } = require('./config')

function cleanHtml() {
  return src('dist/*.html', { read: false, allowEmpty: true }).pipe(clean())
}

function handleHtml() {
  return src('src/*.html')
    .pipe(gulpIf(isProd, htmlmin({ collapseWhitespace: true })))
    .pipe(dest('dist/'))
}

exports.default = series(cleanHtml, handleHtml)
