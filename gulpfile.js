var gulp = require('gulp'),
    browserify = require("browserify"),
    source = require('vinyl-source-stream'),
    tsify = require("tsify"),
    buffer = require("vinyl-buffer"),
    uglify = require("gulp-uglify"),
    sourcemaps = require("gulp-sourcemaps"),
    watchify = require("watchify"),
    gutil = require("gulp-util");

var watchedBrowserify = watchify(browserify({
    basedir: ".",
    debug: true,
    entries: ["src/Application.ts"] ,
    cache: {},
    packageCache: {}
})).plugin(tsify);

function bundle () {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("js"));
};

gulp.task("default", bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);