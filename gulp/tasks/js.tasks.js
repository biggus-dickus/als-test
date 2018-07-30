const gulp = require('gulp'),
    path = require('../config').path,

    babel = require('rollup-plugin-babel'),
    betterRollup = require('gulp-better-rollup'),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

gulp.task('js:dev', () => {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(betterRollup({
            file: 'script.js',
            format: 'iife'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('js:prod', () => {
    gulp.src(path.src.js)
        .pipe(betterRollup({
            plugins: [babel({
                babelrc: false,
                exclude: 'node_modules/**',
                presets: [['env', { modules: false }]],
                plugins: ['external-helpers']
            })]
        }, {
            file: 'script.js',
            format: 'iife'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});
