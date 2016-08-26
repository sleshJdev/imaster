/**
 * @author slesh
 */

var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')();
var conf = require('./conf');

module.exports = {
    buildJs: buildJs,
    buildHtml: buildHtml,
    buildJsVendor: buildJsVendor,
    buildCss: buildCss,
    build: build
};

function buildJs() {
    return gulp.src(conf.js)
        .pipe($.sourcemaps.init())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.ngAnnotate({remove: true, add: true, single_quotes: true}))
        .pipe($.angularFilesort())
        .pipe($.concat('script.js'))
        .pipe($.uglify({compress: {join_vars: false, sequences: false}}))
        .pipe($.sourcemaps.write('../maps'))
        .pipe(gulp.dest(path.join(conf.dest, 'scripts')));
}

function buildHtml() {
    return gulp.src(conf.html)
        .pipe($.sourcemaps.init())
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe($.angularTemplatecache('templates.js', {module: conf.module, base: path.resolve(conf.src)}))
        .pipe($.uglify({compress: {join_vars: false, sequences: false}}))
        .pipe($.sourcemaps.write('../maps'))
        .pipe(gulp.dest(path.join(conf.dest, 'scripts')));
}

function buildJsVendor() {
    return gulp.src('./bower.json')
        .pipe($.mainBowerFiles())
        .pipe($.sourcemaps.init())
        .pipe($.concat('vendor.js'))
        .pipe($.uglify({compress: {join_vars: false, sequences: false}}))
        .pipe($.sourcemaps.write('../maps'))
        .pipe(gulp.dest(path.join(conf.dest, 'scripts')));
}

function buildCss() {
    return gulp.src(conf.css)
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.concat('style.css'))
        .pipe($.cleanCss())
        .pipe($.sourcemaps.write('../maps'))
        .pipe(gulp.dest(path.join(conf.dest, 'styles')));
}

function build(prefix) {
    function options(name) {
        var options = {relative: true, removeTags: true, name: name};
        if (prefix) options.addPrefix = prefix;
        return options;
    }

    return gulp.src(path.join(conf.dest, 'index.html'))
        .pipe($.inject(buildCss(), options('style')))
        .pipe($.inject(buildJsVendor(), options('vendor-js')))
        .pipe($.inject(buildJs(), options('script')))
        .pipe($.inject(buildHtml(), options('templates')))
        .pipe(gulp.dest(conf.dest));
}

