var gulp = require('gulp');

// Load tasks
var taskBrowsersync = require('./tasks/browsersync');
var tasksHTML       = require('./tasks/html');
var tasksImages     = require('./tasks/img');
var tasksCSS        = require('./tasks/css');
var tasksJS         = require('./tasks/js');

// Serve files from dist/ folder
gulp.task('browsersync', taskBrowsersync);

// Swig to HTML compiler
gulp.task('html-compile', tasksHTML.compile);
gulp.task('html-watch', ['html-compile'], tasksHTML.watch);

// Image optimizer
gulp.task('img-optimize', tasksImages.optimize);
gulp.task('img-watch', ['img-optimize'], tasksImages.watch);

// SASS & CSS Tasks
gulp.task('css-compile', tasksCSS.compile);
gulp.task('css-watch', ['css-compile'], tasksCSS.watch);
gulp.task('css-sassdoc', tasksCSS.sassdoc);
gulp.task('scss-lint', tasksCSS.scsslint);

// JavaScript transpiler
gulp.task('js-transpile', tasksJS.transpile);
gulp.task('js-test', tasksJS.test);
gulp.task('js-watch', ['js-transpile'], tasksJS.watch);

// Group-tasks
gulp.task('dev', ['browsersync', 'html-watch', 'img-watch', 'css-watch', 'js-watch']);
gulp.task('dist', [/*'clean', */'html-compile', 'img-optimize', 'css-compile', 'js-transpile']);
gulp.task('test', ['js-test', 'scss-lint']);
