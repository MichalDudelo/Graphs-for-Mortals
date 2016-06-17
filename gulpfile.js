var gulp = require('gulp'), 
    bowerMain = require('bower-main'),
    concat = require('gulp-concat')
    browserify = require("browserify"),
    source = require('vinyl-source-stream'),
    tsify = require("tsify");

var bFiles = bowerMain('js', 'min.js');

gulp.task('concBower', function() {
    return gulp.src(bFiles.minified.concat(bFiles.minifiedNotFound))
               .pipe(concat("bower.js"))
               .pipe(gulp.dest('js'));
});

gulp.task("default", function () {
    return browserify({
        basedir: ".",
        debug: true,
        entries: ["src/Application.ts"],
        cache: {},
        packageCache: {} 
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("js"));
});

//https://www.npmjs.com/package/gulp-typings
var gulpTypings = require("gulp-typings");
 
gulp.task("installTypings",function(){
    var stream = gulp.src("./typings.json")
        .pipe(gulpTypings());
    return stream; 
});