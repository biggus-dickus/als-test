const gulp = require('gulp'),
      path = require('../config').path,

    // Compiling with bells & whistles
    sass = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    cmq = require('gulp-combine-mq'),
    cssnano = require('gulp-cssnano'),

    // Sprite generation
    merge = require('merge-stream'),
    spritesmith = require('gulp.spritesmith'),
    pngquant = require('imagemin-pngquant'),
    imagemin = require('gulp-imagemin'),

    // Stylelint
    postcss = require('gulp-postcss'),
    reporter = require('postcss-reporter'),
    stylelint = require('stylelint'),
    scss = require('postcss-scss'),

    // Browsersync
    browserSync = require('browser-sync');


gulp.task('css:dev', () => {
  gulp.src(path.src.styles)
      .pipe(sass(
          { sourceComments: true }
      ).on('error', sass.logError))
      .pipe(postcss([ autoprefixer(
          {
              remove: false,
              grid: true
          }
      ) ]))
      .pipe(cmq())
      .pipe(gulp.dest(path.build.css))
      .pipe(browserSync.stream());
});


gulp.task('css:prod', () => {
  gulp.src(path.src.styles)
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([ autoprefixer(
          {
              remove: false,
              grid: true
          }
      ) ]))
      .pipe(cmq())
      .pipe(cssnano())
      .pipe(gulp.dest(path.build.css))
});


gulp.task('img:build', () => {
  gulp.src(path.src.img)
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()],
        interlaced: true
      }))
      .pipe(gulp.dest(path.build.img))
      .pipe(browserSync.stream());
});


gulp.task('sprite:build', () => {
  // Generate our spritesheet
  const spriteData = gulp.src(path.src.sprite).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss',
    imgPath: '../img/sprite/sprite.png', // relative path to sprite.png from generated CSS
    padding: 2
  }));

  // Pipe image stream onto disk
  const imgStream = spriteData.img
      .pipe(gulp.dest(path.build.sprite));

  // Pipe CSS stream onto disk
  const cssStream = spriteData.css
      .pipe(gulp.dest(path.src.spritesheet));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});


gulp.task('fonts:build', () => {
  gulp.src(path.src.fonts)
      .pipe(gulp.dest(path.build.fonts))
});


gulp.task('scss:lint', () => {
  return gulp.src(path.watch.styles)
      .pipe(postcss(
          [
            stylelint({ /* options are set in .stylelintrc */ }),
            reporter({ clearMessages: true })
          ],
          { syntax: scss }
      ));
});
