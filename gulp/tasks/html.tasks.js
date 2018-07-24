'use strict';

const gulp = require('gulp'),
      path = require('../config').path,
      rigger = require('gulp-rigger'),
      htmlmin = require('gulp-htmlmin'),

    // BrowserSync
    browserSync = require('browser-sync'),
    reload = browserSync.reload;


gulp.task('html:dev', () => {
  gulp.src(path.src.html)
      .pipe(rigger())
      .pipe(gulp.dest(path.build.html))
      .pipe(reload({stream: true}));
});


gulp.task('html:prod', () => {
  gulp.src(path.src.html)
      .pipe(rigger())
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest(path.build.html));
});


gulp.task('tpl:dev', () => {
  gulp.src(path.src.tpl)
      .pipe(gulp.dest(path.build.tpl))
      .pipe(reload({stream: true}));
});


gulp.task('tpl:prod', () => {
  gulp.src(path.src.tpl)
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest(path.build.tpl));
});
