/**
 * 处理 样式文件
 */
const { src, dest, series } = require('gulp')
const less = require('gulp-less')
const LessAutoprefix = require('less-plugin-autoprefix')
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] })
const sourcemaps = require('gulp-sourcemaps')
const clean = require('gulp-clean')
// const gulpIf = require('gulp-if')
const postcss = require('gulp-postcss')
const pxtoviewport = require('postcss-px-to-viewport')
const cssnano = require('cssnano')
const { isProd } = require('./config')

// postcss-px-to-viewport 配置
const pxtoviewportConfig = {
  unitToConvert: 'px', // 要转换的单位，默认情况下为px
  viewportWidth: 750, // 设计稿视窗宽度
  unitPrecision: 5, // 保留5位小数
  propList: ['*'], // 可以从px更改为vw的属性，使用通配符*启用所有属性
  viewportUnit: 'vw',
  fontViewportUnit: 'vw', // 字体的单位
  selectorBlackList: [], // 要忽略的选择器
  minPixelValue: 1, // 小于1px不转换
  mediaQuery: false, // 不允许在媒体查询中转换px
  replace: true, // 替换样式为vw，而不是通过样式覆盖
  exclude: undefined, // 忽略某些文件
  include: undefined, // 如果设置了include，将仅转换匹配的文件
  landscape: false, // 关闭横屏时转换
  landscapeUnit: 'vw', // 设置了landscape时的默认单位
  landscapeWidth: 1136 // 横屏时，设计稿视窗宽度
}

// postcss 插件配置
const postcssPlugins = [
  pxtoviewport(pxtoviewportConfig),
  isProd ? cssnano() : ''
].filter(i => i)

function cleanStyle() {
  return src('dist/style', { read: false, allowEmpty: true }).pipe(clean())
}

/**
 * 处理 less 文件
 */
function handleLess() {
  return (
    src('src/style/*.less')
      .pipe(sourcemaps.init())
      .pipe(
        less({
          plugins: [autoprefix]
        })
      )
      .pipe(postcss(postcssPlugins))
      // .pipe(gulpIf(isProd, cleanCSS({ compatibility: '*' })))
      .pipe(sourcemaps.write())
      .pipe(dest('dist/style/'))
  )
}

exports.default = series(cleanStyle, handleLess)
