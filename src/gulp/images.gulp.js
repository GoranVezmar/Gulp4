// gulp
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import gulpif from 'gulp-if';

const env = process.env.NODE_ENV || 'development';

export const images = () => {
  return gulp
    .src('src/images/*')
    .pipe(
      gulpif(
        env === 'production',
        imagemin(
          [
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
              plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
            }),
          ],
          {
            silent: true,
          }
        )
      )
    )
    .pipe(gulpif(env === 'development', gulp.dest('./dist/images')))
    .pipe(gulpif(env === 'production', gulp.dest('./build/images')));
};
