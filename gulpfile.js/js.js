/**
 * 处理 js 文件
 */
const { src, dest, series } = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const clean = require('gulp-clean')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const gulpIf = require('gulp-if')
const { isProd } = require('./config')

function cleanJs() {
  return src('dist/js', { read: false, allowEmpty: true }).pipe(clean())
}

function handleJs() {
  return src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(gulpIf(isProd, uglify()))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/js/'))
}

exports.default = series(cleanJs, handleJs)
