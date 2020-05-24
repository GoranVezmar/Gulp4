// gulp
import gulp from 'gulp';
import replace from 'gulp-string-replace';

export const html = () => {
  return gulp
    .src('index.html')
    .pipe(
      replace('./dist/', './', {
        logs: {
          enabled: false,
        },
      })
    )
    .pipe(gulp.dest('build/'));
};
