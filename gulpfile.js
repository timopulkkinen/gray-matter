'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var eslint = require('gulp-eslint');

var lint = ['index.js', 'lib/*.js', 'test/*.js'];
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var derequire = require('gulp-derequire');
var uglify = require('gulp-uglify');

gulp.task('coverage', function () {
  return gulp.src(lint)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('mocha', ['coverage'], function () {
  return gulp.src('test/*.js')
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports());
});

gulp.task('browserify', function() {
  var b = browserify({
    standalone: 'index',
    entries: './index.js',
    debug: false,
  });
  return b.bundle()
   .pipe(source('index.js'))
   .pipe(derequire())
   .pipe(buffer())
   .pipe(uglify())
   .pipe(gulp.dest('./lib/browserify/'))
});

gulp.task('eslint', function () {
  return gulp.src(lint)
    .pipe(eslint())
});

gulp.task('default', ['mocha', 'eslint']);
