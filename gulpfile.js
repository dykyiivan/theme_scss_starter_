const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');


function styles() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['> 0.1%'],
      cascade: false
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "app",
      notify: false
    }
  });
  gulp.watch("app/scss/*.scss", styles);
  gulp.watch("app/*.html").on('change', browserSync.reload);
  gulp.watch("app/js/**/*.js").on('change', browserSync.reload);
}


gulp.task('styles', styles);
gulp.task('watch', watch);
gulp.task('default', gulp.parallel('styles', 'watch'));

