/**
 * Created by Koushik on 12/25/2016.
 */
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    inject = require('gulp-inject'),
    filter = require('gulp-filter'),
    concat = require('gulp-concat'),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    angularFileSort = require('gulp-angular-filesort'),
    mergeStream = require('merge-stream'),
    bowerFiles = require('main-bower-files'),
    browserSync = require('browser-sync');

var config = {
    paths: {
        src: './src',
        build: './build',
        bower: './bower_components'
    }
};

gulp.task('clean', function () {
    return gulp.src(config.paths.build, {read: false})
        .pipe(clean());
});

gulp.task('inject', function () {

    var cssFiles = gulp.src([
        config.paths.src + '/**/*.css'
    ], {read: false});

    var jsFiles = gulp.src([
        config.paths.src + '/**/*.js'
    ]);

    return gulp.src(config.paths.src + '/index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
        .pipe(inject(cssFiles, {ignorePath: 'src', addRootSlash: false}))
        .pipe(inject(jsFiles.pipe(angularFileSort()), {ignorePath: 'src', addRootSlash: false}))
        .pipe(gulp.dest(config.paths.build));
});

gulp.task('serve', ['inject'], function () {
    browserSync.init({
        notify: false,
        server: {
            baseDir: [config.paths.build, config.paths.bower, config.paths.src],
            routes: {
                '/bower_components': 'bower_components'
            }
        },
        files: [
            config.paths.src + '/**'
        ],
        port: 8083
    });
});

gulp.task('minifyCSS',function () {
    var vendorCSS = gulp.src(bowerFiles())
        .pipe(filter(['**/*.css']))
        .pipe(concat('vendor.min.css'))
        .pipe(cleancss({debug:true,compatibility:'ie8'}))
        .pipe(gulp.dest(config.paths.build+'/styles'));

    var appCss = gulp.src(config.paths.src+'/**/*.css')
        .pipe(concat('app.min.css'))
        .pipe(cleancss({debug:true,compatibility:'ie8'}))
        .pipe(gulp.dest(config.paths.build+'/styles'))

    return mergeStream(vendorCSS,appCss);
});

gulp.task('minifyJs',function () {
    var VendorScripts = gulp.src(bowerFiles())
        .pipe(filter(['**/*.js']))
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.build+'/scripts'));


    var appScripts = gulp.src(config.paths.src+'/**/*.js')
        .pipe(angularFileSort())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.build+'/scripts'));

    return mergeStream(VendorScripts,appScripts);
});

gulp.task('htmls',function () {
    return gulp.src([config.paths.src + '/**/*.html','!'+config.paths.src+'/index.html'])
        .pipe(gulp.dest(config.paths.build));
})

gulp.task('fonts',function () {
    return gulp.src(bowerFiles())
        .pipe(filter(['**/*.{eot,svg,ttf,woff,woff2}']))
        .pipe(gulp.dest(config.paths.build+'/fonts'));
});

gulp.task('other',function () {
    return gulp.src([config.paths.src+'/**/*.*','!**/*.html','!**/*.css','!**/*.js'])
        .pipe(gulp.dest(config.paths.build));
});

gulp.task('build',['minifyCSS','minifyJs','htmls','fonts','other'],function () {
    var vendorFiles = gulp.src([
        config.paths.build + '/styles/vendor.min.css',
        config.paths.build + '/scripts/vendor.min.js'
    ],{read:false});

    var appFiles = gulp.src([
        config.paths.build + '/styles/app.min.css',
        config.paths.build + '/scripts/app.min.js'
    ],{read:false});

    return gulp.src(config.paths.src + '/index.html')
        .pipe(inject(vendorFiles, {name:'vendor',ignorePath: 'src', addRootSlash: false}))
        .pipe(inject(appFiles, {name:'app',ignorePath: 'src', addRootSlash: false}))
        .pipe(gulp.dest(config.paths.build));
})
