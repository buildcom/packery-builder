var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('compile', function() {
  return gulp.src(['./scss/style.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'));
});

gulp.task('default', ['compile']);