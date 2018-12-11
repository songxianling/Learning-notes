// 请求gulp模块
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postCss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    path = require('path'),
    watch = require('gulp-watch'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),    // js压缩
    gutil = require('gulp-util'),   // 输出
    del = require('del'),
    plumber = require('gulp-plumber'); // 报错不中断


/*当前目录的绝对路径*/
var srcDir = path.resolve(process.cwd());

gulp.task('sass', function () {
    gulp.src('sass/**/*.scss')
        .pipe(watch('sass/**/*.scss', {
                read: false,
                ignoreInitial: true
            })
            .on('add', function (path) {
                var relativePath = getPath(path);
                sassTask(relativePath);
            }).on('change', function (path) {
                var relativePath = getPath(path);
                sassTask(relativePath);
            })
            .on('unlink', function (path) {
                /*删除之前的生成的css文件*/
                var cssFile = '../' + getPath(path).replace('sass', 'css').replace('scss', 'css');
                del(cssFile, {
                    force: true
                });
                gutil.log(gutil.colors.red('gulp-util:'), path, gutil.colors.red('已删除'));
            }));
});


/*获取相对路径*/
function getPath(ePath) {
    var relativePath = path.relative(srcDir, ePath);
    relativePath = relativePath.replace(/\\/g, '/');
    return relativePath;
}
/*获取当前文件所在的文件夹*/
function getFileFolder(path) {
    return path.replace(/\/[\w\-]+(\.\w+)/, '/');
}

function sassTask(path) {
    var sassFolder = getFileFolder(path);
    var plugins = [
        autoprefixer({
            "browsers": ['last 2 version', 'iOS >= 8', 'android 4']
        }), cssnano
    ];
    var plugins = [autoprefixer, cssnano];

    
    sassFolder = sassFolder.replace('sass', 'css');

    return gulp.src('./' + path)
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(postCss(plugins))
        .pipe(gulp.dest('../' + sassFolder))
        .pipe(notify({
            'message': path + '处理完成'
        }));

}

//默认管道命令：
gulp.task('default', ['sass'], function () {}) //可以让默认的时候执行多个命名，在 [ ] 中添加即可