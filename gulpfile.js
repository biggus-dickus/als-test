const gulp = require('gulp'),
    bsConfig = require('./gulp/config').bsConfig,
    path = require('./gulp/config').path,

    requireDir = require('require-dir'),
    watch = require('gulp-watch'),
    rimraf = require('rimraf'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

// Tasks
requireDir('./gulp/tasks');


gulp.task('webserver', () => {
    browserSync(bsConfig);
});

gulp.task('clean', (cb) => rimraf(path.clean, cb));

gulp.task('data:copy', () => {
    gulp.src('src/data/*json')
        .pipe(gulp.dest('build/data/'))
        .pipe(reload({stream: true}));
});


gulp.task('watch', () => {
    watch([path.watch.html], () => {
        gulp.start('html:dev');
    });
    watch([path.watch.tpl], () => {
        gulp.start('tpl:dev');
    });
    watch([path.watch.styles], () => {
        gulp.start('css:dev');
    });
    watch([path.watch.js], () => {
        gulp.start('js:dev');
    });
    watch([path.watch.img], () => {
        gulp.start('img:build');
    });
    watch([path.watch.fonts], () => {
        gulp.start('fonts:build');
    });
});


gulp.task('prod', [
    'img:build',
    'sprite:build',
    'html:prod',
    'tpl:prod',
    'data:copy',
    'css:prod',
    'js:prod',
    'fonts:build'
]);

gulp.task('develop', [
    'html:dev',
    'tpl:dev',
    'data:copy',
    'css:dev',
    'js:dev',
    'fonts:build',
    'img:build'
]);

gulp.task('default', ['prod', 'webserver']);
gulp.task('dev', ['develop', 'webserver', 'watch']);
