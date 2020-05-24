// gulp
import gulp from 'gulp';
import iconfont from 'gulp-iconfont';
import iconfontCss from 'gulp-iconfont-css';
import gulpif from 'gulp-if';

const env = process.env.NODE_ENV || 'development';

const date = new Date();
const today =
  date.getFullYear() +
  '.' +
  String(date.getMonth() + 1) +
  '.' +
  String(date.getDate()) +
  date.getHours() +
  date.getMinutes() +
  date.getSeconds();

export const fonticons = () => {
  return gulp
    .src(['src/iconfont/*.svg'])
    .pipe(
      iconfontCss({
        fontName: 'fonticons',
        cssClass: 'font',
        path: 'src/scss/config/icon-font-config.scss',
        targetPath: '_icon-font.scss',
        fontPath: './fonticons/',
        cacheBuster: today,
      })
    )
    .pipe(
      iconfont({
        fontName: 'fonticons',
        prependUnicode: true,
        formats: ['woff2', 'woff', 'ttf'],
        normalize: true,
        centerHorizontally: true,
        log: function () {},
      })
    )
    .on('glyphs', function (glyphs, options) {
      //console.log(glyphs, options);
    })
    .pipe(
      gulpif(env === 'development' && '!*.scss', gulp.dest('dist/fonticons/'))
    )
    .pipe(
      gulpif(env === 'production' && '!*.scss', gulp.dest('build/fonticons/'))
    )
    .pipe(gulpif('*.scss', gulp.dest('src/scss/base/')));
};
