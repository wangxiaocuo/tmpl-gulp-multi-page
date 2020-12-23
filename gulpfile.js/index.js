const { src, watch, series, parallel } = require('gulp')
const clean = require('gulp-clean')
const htmlTasks = require('./html').default
const styleTasks = require('./style').default
const jsTasks = require('./js').default
const libTasks = require('./lib').default
const faviconTasks = require('./favicon').default
const assetsTasks = require('./assets').default

const connect = require('gulp-connect')
const { createProxyMiddleware } = require('http-proxy-middleware')

function cleanDist() {
  return src('dist/', { read: false, allowEmpty: true }).pipe(clean())
}

function connectTask(cb) {
  connect.server({
    root: 'dist',
    port: '9999',
    livereload: true,
    // middleware: function (connect, opt) {
    //   return [
    //     createProxyMiddleware('/api', {
    //       // 需要代理的地址
    //       target: '',
    //       changeOrigin: true
    //     })
    //   ]
    // }
  })

  cb()
}

function watchTask(cb) {
  watch('src/**/*.html', { ignoreInitial: false }, htmlTasks)
  watch('src/style/**/*.less', { ignoreInitial: false }, styleTasks)
  watch('src/js/**/*.js', { ignoreInitial: false }, jsTasks)
  watch('src/lib/**/*', { ignoreInitial: false }, libTasks)
  watch('src/favicon.ico', { ignoreInitial: false }, faviconTasks)
  watch('src/assets/**/*', { ignoreInitial: false }, assetsTasks)

  cb()
}

exports.dev = series(connectTask, watchTask)
exports.build = series(cleanDist, parallel(htmlTasks, styleTasks, jsTasks, libTasks, faviconTasks, assetsTasks))
