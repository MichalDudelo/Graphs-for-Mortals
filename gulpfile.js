var gulp = require('gulp'),
    browserify = require("browserify"),
    source = require('vinyl-source-stream'),
    tsify = require("tsify"),
    buffer = require("vinyl-buffer"),
    uglify = require("gulp-uglify");

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
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("js"));
});