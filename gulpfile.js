var gulp = require('gulp');
require('gulp-stats')(gulp);

var rename = require('gulp-rename');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var server = require('gulp-server-livereload');

var runSequence = require('run-sequence');
var webpack = require('webpack-stream');

var configuration = {
  paths: {
    src: {
      html: './src/*.html',
      js:   './src/scripts/**/*.js',
      sound:'./sound/*.mp3'
    },
    dist: './dist'
  }
};

gulp.task('default', function(callback) {
  runSequence('clean-dest', ['build-html', 'build-js', 'copy-sound'], ['serve', 'watch'], callback) 
});

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

gulp.task('copy-sound', function() {
  return gulp.src(configuration.paths.src.sound)
    .pipe(gulp.dest(configuration.paths.dist + "/sound"));
});


gulp.task('clean-dest', function() {
  return gulp.src(configuration.paths.dist).pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch(configuration.paths.src.js , ['build-js']);
    gulp.watch(configuration.paths.src.html , ['build-html']);
    gulp.watch(configuration.paths.src.sound , ['copy-sound']);
});

gulp.task('serve', function() {
  gulp.src('dist')
    .pipe(server({
      livereload: true,
      open: true
    }));
});