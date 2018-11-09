const gulp = require('gulp')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const uglify = require('gulp-uglify')
const fs = require('fs')

function scripts () {
  const customJs = './public/src/**/*.js'
  const config = './public/config.json'

  return gulp.src([customJs])
    .pipe(replace('__config__', fs.readFileSync(config, "utf8")))
    .pipe(uglify({mangle: {reserved: [], toplevel: true}}))
    .pipe(rename({
      basename: 'script',
      extname: '.js'
    }))
    .pipe(gulp.dest('./public/dist/js/'))
}


function watch () {
  gulp.watch('./public/**/*.js', scripts)
}

exports.scripts = scripts
exports.watch = watch

const build = gulp.series(gulp.parallel(scripts))
gulp.task('default', build)
