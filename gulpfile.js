var gulp = require('gulp'), 
    bowerMain = require('bower-main'),
    concat = require('gulp-concat'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require("browserify"),
    transform = require("vinyl-transform"),
    tsify = require("tsify");

var bFiles = bowerMain('js', 'min.js');

gulp.task('concBower', function() {
    return gulp.src(bFiles.minified.concat(bFiles.minifiedNotFound))
               .pipe(concat("bower.js"))
               .pipe(gulp.dest('js'));
});