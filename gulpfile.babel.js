// gulp
import gulp, { parallel, series } from 'gulp';
import browsersync from 'browser-sync';

//tasks
import { js } from './src/gulp/javascript.gulp';
import { css } from './src/gulp/css.gulp';
import { cleanFiles } from './src/gulp/clean.gulp';
import { sassLint, jsLint } from './src/gulp/linters.gulp';
import { html } from './src/gulp/html.gulp';
import { images } from './src/gulp/images.gulp';
import { fonts } from './src/gulp/fonts.gulp';
import { fonticons } from './src/gulp/fonticons.gulp';

const myBrowsersync = () => {
  let files = [
    'dist/**/*',
    '**/*.html',
    '!dist/main.js.map',
    '!dist/styles.css.map',
  ];
  browsersync.init(files, {
    server: {
      baseDir: './',
    },
  });
};

const watchFiles = () => {
  gulp.watch('src/scss/**/*', parallel(css, sassLint));
  gulp.watch('src/js/**/*', parallel(js, jsLint));
  gulp.watch('src/images/**/*', images);
  gulp.watch('src/iconfont/**/*', series(fonticons, css));
  myBrowsersync();
};

export const dev = parallel(js, series(fonticons, css), images, fonts);
export const prod = parallel(
  js,
  series(fonticons, css),
  cleanFiles,
  html,
  images,
  fonts
);
export const watch = series(dev, watchFiles);
