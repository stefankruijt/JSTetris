var gulp = require('gulp');
require('gulp-stats')(gulp);
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var webpack = require('webpack-stream');

var configuration = {
  paths: {
    src: {
      html: './src/*.html',
      js:   './src/scripts/*.js'
    },
    dist: './dist'
  }
};


gulp.task('build-js', function() {
  return gulp.src(configuration.paths.src.js)
    .pipe(webpack(require('./webpack.config.js') ))
    .pipe(rename('tetris.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(configuration.paths.dist));
});

gulp.task('build-html', function() {
  return gulp.src(configuration.paths.src.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(configuration.paths.dist));
});

gulp.task('clean-dest', function() {
  return gulp.src(configuration.paths.dist).pipe(clean());
});
