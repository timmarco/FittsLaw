/* jshint esversion: 6*/
const gulp = require('gulp');
const watch = require('gulp-watch');
const uglifyEs = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const pump = require('pump');

const minify = composer(uglifyEs,console);

gulp.task('default',() => {
  watchFitts();
  watchExplorables();
});

gulp.task('buildFitts',() =>{
  gulp.src('js/fitts/**/*.js')
    .pipe(concat('fitts.js'))
    .pipe(gulp.dest('js/dist'));
});

gulp.task('buildExplorables',() => {
  gulp.src('js/explorables/**/*.js')
    .pipe(concat('explorables.js'))
    .pipe(gulp.dest('js/dist'));
});

gulp.task('compressFitts',(cb) =>{

  pump([
    gulp.src('js/dist/fitts.js'),
    minify({}),
    gulp.dest('js/dist/minified/')
  ],cb);

});

gulp.task('compressExplorables',(cb) => {
  pump([
    gulp.src('js/dist/explorables.js'),
    minify({}),
    gulp.dest('js/dist/minified/')
  ],cb);

});

gulp.task('package',() => {
  gulp.start('compressFitts');
  gulp.start('compressExplorables');
});

function watchExplorables() {
  console.log("---- WATCHING FOR CHANGES TO EXPLORABLES ---");
  return watch('js/explorables',() =>{
    gulp.start('buildExplorables');
  });
}

function watchFitts() {
  console.log("---- WATCHING FOR CHANGES TO FITTS ---");
  return watch('js/fitts',() =>{
    gulp.start('buildFitts');
  });
}
