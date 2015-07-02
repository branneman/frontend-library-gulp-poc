var config       = require('../config');
var gulp         = require('gulp');
var watch        = require('gulp-watch');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var filter       = require('gulp-filter');
var browsersync  = require('browser-sync');
var sassdoc  = require('sassdoc');

/**
 * Task: CSS Compile
 */
module.exports.compile = function() {
    gulp.src(config.paths.css.globStatic)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed', errLogToConsole: true }))
        .pipe(sourcemaps.write({ sourceRoot: '.' }))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(autoprefixer('last 1 version', '> 5%'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.paths.css.dirDist))
        .pipe(filter('**/*.css'))
        .pipe(browsersync.reload({ stream: true }));
};

/**
 * Task: CSS Watch
 */
module.exports.watch = function() {
    watch([config.paths.css.globStaticAll, config.paths.css.globComponents], function() {
        gulp.start(['css-compile']);
    });
};

/**
 * Task: Generate Sassdoc documentation
 */
module.exports.sassdoc = function() {
    var options = {
        dest: config.paths.css.sassdocsDist
    };


    console.log(options.dest);

    gulp.src([config.paths.css.globStaticAll, config.paths.css.globComponents])
        .pipe(sassdoc(options));
};
