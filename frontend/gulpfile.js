var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')();
var browser = require('browser-sync').create();
var conf = require('./gulp/conf');
var tasks = require('./gulp/build');

gulp.task('build:js', function () {
    return tasks.buildJs();
});

gulp.task('build:html', function () {
    return tasks.buildHtml();
});

gulp.task('build:js:vendor', function () {
    return tasks.buildJsVendor();
});

gulp.task('build:css', function () {
    return tasks.buildCss();
});

gulp.task('clean', function () {
    return gulp.src(path.join(conf.dest)).pipe($.clean());
});

gulp.task('copy:index', ['clean'], function () {
    return gulp.src(conf.index).pipe(gulp.dest(conf.dest));
});

gulp.task('build:prod', ['copy:index'], function () {
    return tasks.build('assets');
});

gulp.task('build:dev', ['copy:index'], function () {
    return tasks.build();
});

gulp.task('watch', ['build:dev'], function () {
    function onChange(e) {
        $.util.log(e.type, ': ', e.path);
        browser.reload();
    }

    gulp.watch(conf.css, ['build:css']).on('change', onChange);
    gulp.watch(conf.html, ['build:html']).on('change', onChange);
    gulp.watch(conf.js, ['build:js']).on('change', onChange);
});

gulp.task('serve', ['watch'], function () {
    var proxy = require('http-proxy-middleware');
    var apiProxy = proxy('/api', {target: 'http://localhost:8080', changeOrigin: true});

    browser.init({
        ui: {port: 3001},
        open: true,
        server: {
            port: 3000,
            baseDir: conf.dest,
            middleware: [apiProxy]
        }
    });
});

