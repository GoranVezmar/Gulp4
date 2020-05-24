// gulp
import gulp from 'gulp';
import clean from 'gulp-clean';

export const cleanFiles = () => {
  return gulp.src(['./dist'], { read: false, allowEmpty: true }).pipe(clean());
};
