var gulp = require('gulp');
 util = require('util');
 jshint = require('gulp-jshint');
 sass = require('gulp-sass');
 concat = require('gulp-concat');
 uglify = require('gulp-uglify');
 rename = require('gulp-rename');
 minify = require('gulp-minify');
 pump = require('pump');
 iife = require('gulp-iife');
 var browsersync = require('browser-sync').create();
 var mincss = require('gulp-minify-css');

gulp.task('default',['watch'],function(){
    browsersync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('jshint',function(){
    return gulp.src('sources/js/**/*.scss')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('buildcss',function(){
    return gulp.src('sources/css/**/*.css')
        .pipe(concat('style.css'))
        .pipe(gulp.dest('build/assests/stylescheets'))
        .pipe(rename('style.min.css'))
        .pipe(mincss())
        .pipe(gulp.dest('build/assests/stylescheets'));
});
gulp.task('concat',function(){
    return gulp.src('sources/js/*.js')
        .pipe(iife())
           .pipe(concat('script.js'))
            .pipe(gulp.dest('build/assests/js'))
            .pipe(rename('script.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('build/assests/js'));
});
gulp.task('jswatch',['concat'],function(done){
    browsersync.reload();
    done();
});
gulp.task('csswatch',['buildcss'],function(done){
browsersync.reload();
done();
});
gulp.task('watch',function(){
    gulp.watch('sources/js/**/*.js',['jshint','concat','jswatch']);
    gulp.watch('sources/css/**/*.css',['buildcss','csswatch']);
    gulp.watch("*.html").on("change", browsersync.reload);
});