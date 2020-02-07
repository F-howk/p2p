/**
 * 所有gulp的任务  都在这份文件中定义
 */

// 引入gulp模块 和 依赖的所有插件
var gulp = require('gulp') // gulp模块
var uglify = require('gulp-uglify') // 压缩JS
var rename = require('gulp-rename') // 重命名
var cleanCss = require('gulp-clean-css') // 压缩CSS
var imagemin = require('gulp-imagemin') // 压缩图片
var less = require('gulp-less') // 编译less
var bs = require('browser-sync').create() // 启动一个本地服务器
var babel = require("gulp-babel")


/* 定义任务 */
/* css任务 */
gulp.task('cssTask', function() {
    gulp.src('./less/*.less') // 要编译的less文件
        .pipe(less()) // 编译less
        .pipe(cleanCss()) // 压缩css
        .pipe(rename({
            suffix: '.min'
        })) // 重命名
        .pipe(gulp.dest('./dist/css'))
})

/* js压缩任务 */
gulp.task('jsTask', function() {
    gulp.src('./js/*.js') // 要压缩的js文件
        .pipe(babel())
        .pipe(uglify()) // 压缩js
        .pipe(rename({
            suffix: '.min'
        })) // 重命名
        .pipe(gulp.dest('./dist/js')) // 输出
})

/* 压缩图片 */
gulp.task('imgTask', function() {
    gulp.src('./img/*.{jpg,png}') // 要压缩的图片
        .pipe(imagemin()) // 压缩图片
        .pipe(gulp.dest('./dist/img')) // 输出
})

/* 观察者模式 */
gulp.task('watch', function() {
    gulp.watch('./less/*.less', ['cssTask']) // 观察所有less文件 只要有变动  就执行对应的编译压缩重命名任务
    gulp.watch('./js/*.js', ['jsTask']) // 观察所有js文件 只要有变动  就执行对应的编译压缩重命名任务
})


/* 启动服务器 */
gulp.task('serve', function() {
    bs.init({
        server: './' // 以当前根目录启动一个本地服务器
    })
})

/**
 *  1. JS压缩和图片压缩建议手动
 *      gulp jsTask
 *      gulp imgTask
 * 
 *  2. less编译要自动
 */

gulp.task('default', ['serve', 'watch', 'cssTask', 'jsTask', 'imgTask']) // 默认任务