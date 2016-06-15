var gulp = require('gulp'); 
var bowerMain = require('bower-main');
var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

var bowerMinFiles = bowerMain('js', 'min.js').minified;

gulp.task('concBower', function() {
    return gulp.src(bowerMinFiles)
               .pipe(concat("bower.js"))
               .pipe(gulp.dest('js'));
});

gulp.task('tsc', function() {
    return gulp
      .src("src/*.ts")
      .pipe(sourcemaps.init())
         .pipe(ts({
              target: "es5"
              , module: "commonjs"
          }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("temp"));
});