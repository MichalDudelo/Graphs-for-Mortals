var gulp = require('gulp'),
    browserify = require("browserify"),
    source = require('vinyl-source-stream'),
    tsify = require("tsify"),
    buffer = require("vinyl-buffer"),
    uglify = require("gulp-uglify"),
    sourcemaps = require("gulp-sourcemaps");

gulp.task("default", function () {
    return browserify({
        basedir: ".",
        debug: true,
        entries: ["src/Application.ts"]
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("js"));
});