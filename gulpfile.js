/**
 * MazovWeb Starter Kit *
 * @author ostashevdv@gmail.com
 */

'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var bower = require('gulp-bower');
var data = require('gulp-data');
var less = require('gulp-less');
var include = require('gulp-include');
var jade = require('gulp-jade');




/**
 * Сборка less
 * рекомендуется по необходимости добавить такие плагины:
 *  > gulp-sourcemaps   -   создает map файл помогающий в панели разработчика определить
 *          в каком .less файле находится определение скомпилированного стиля
 *  > gulp-cssmin       -   сжатие css файла
 *  > gulp-uncss        -   удаление неиспользуемого css кода
 *  > gulp-autoprefixer -   автоматические префиксы
 */
gulp.task('less', function(){
    return gulp.src(['./assets/main/less/styles.less'])
        .on('error', console.log)
        .pipe(less())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.reload({stream:true}))
});

/**
 * Сборка JS файлов. Для подключения файлов используется gulp-include
 */
gulp.task('js', function(){
    return gulp.src('./assets/main/js/script.js')
        .on('error', console.log)
        .pipe(include())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.reload({stream:true}))
});

/**
 * Генерация HTML страниц
 */
gulp.task('jade', function() {
    return gulp.src('./assets/main/jade/*.jade')
        .pipe(jade({ pretty : true }))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({stream:true}))
});

/**
 * Управление статическими зависимостями. Копирование файлов полученных из bower в ./assets/common
 * Копирование ресурсов статики в релиз.
 */
gulp.task('common', ['common-js', 'common-css'], function(){
    return gulp.src(['./assets/common/**/*.*']).pipe(gulp.dest('./dist/'));
});
gulp.task('common-js', function(){
    return gulp.src([
        './vendor/jquery/dist/jquery.min.js',
        './vendor/bootstrap/dist/js/bootstrap.min.js'
    ]).pipe(gulp.dest('./assets/common/js'));
});
gulp.task('common-css', function(){
    return gulp.src([
        './vendor/bootstrap/dist/css/bootstrap.min.css'
    ]).pipe(gulp.dest('./assets/common/css'));
});

/**
 * Установка пакетов из менджера зависимостей bower
 * Пакеты описываются в bower.json, а сохраняются в ./vendor
 */
gulp.task('bower', function() {
    return bower({ directory : './vendor'}).pipe(gulp.dest('./vendor'))
});

/**
 * Запуск web-сервера с livereload
 */
gulp.task('browser-sync', function() {
    browserSync({
        server : {
            baseDir: './dist'
        }
    });
});

/**
 * Watch следит за изменениями в указанных дирректориях.
 * В случае если файл изменился, запускает соответствующую задачу.
 */
gulp.task('watch', ['common', 'less', 'jade', 'browser-sync'], function(){
    gulp.watch('./assets/**/*.less', ['less']);
    gulp.watch('./assets/**/*.js', ['js']);
    gulp.watch('./assets/**/*.jade', ['jade']);
});



