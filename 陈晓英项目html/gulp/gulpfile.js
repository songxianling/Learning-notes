// 请求gulp模块
var gulp = require('gulp')

//请求gulp-sass 模块
var sass = require('gulp-sass')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

//创建管道命令，执行sass
//编译sass
gulp.task('sassTask', function () {
    var processors = [autoprefixer({
        "browsers": ['last 2 version', 'iOS >= 8', 'android 4']
    }),cssnano];
    return gulp.src('./sass/*.scss') //打包之前sass路径
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('../css/')); //打包之后css路径
});

// 监听sass文件
gulp.task('Watch', function () {
    gulp.watch('./sass/**/*.scss', ['sassTask'])
})

//默认管道命令：
gulp.task('default', ['sassTask'], function () {}) //可以让默认的时候执行多个命名，在 [ ] 中添加即可