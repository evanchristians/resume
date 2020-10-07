const { src, dest, watch, series } = require('gulp')

const pug = require('gulp-pug')
const sass = require('gulp-sass')

const browserSync = require('browser-sync').create()


// Compile pug files into HTML
function html() {
  return src('app/*.pug')
    .pipe(pug())
    .pipe(dest('./'))
    .pipe(browserSync.stream())
}

// Compile sass files into CSS
function styles() {
  return src('app/styles/main.scss')
    .pipe(sass({
      includePaths: ['app/styles'],
      errLogToConsole: true,
      outputStyle: 'compressed',
      onError: browserSync.notify
    }))
    .pipe(dest('public/css'))
    .pipe(browserSync.stream())
}

// Copy assets
function scripts() {
  return src('app/scripts/**/*.js')
    .pipe(dest('public/scripts'))
    .pipe(browserSync.stream())
}


// Serve and watch sass/pug files for changes
function watchAndServe() {
  browserSync.init({
    port: 8080,
    server: './'
  })

  watch('app/styles/**/*.scss', styles)
  watch('app/*.pug', html)
  watch('app/scripts/**/*.js', scripts)
}


exports.html = html
exports.styles = styles
exports.watch = watchAndServe
exports.default = series(html, styles, scripts, watchAndServe)
