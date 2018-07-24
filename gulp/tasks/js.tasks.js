'use strict';

const gulp = require('gulp'),
    path = require('../config').path,

    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    sourcemaps = require('gulp-sourcemaps');

gulp.task('js:dev', () => {
    gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});


gulp.task('js:prod', () => {
    gulp.src(path.src.js)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});
