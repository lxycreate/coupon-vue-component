var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('webserver-static', gulp.series(function () {
    // 开发预览
    browserSync.init({
        port: 6066,
        server: {
            baseDir: './', // 设置服务器的根目录
            directory: true // 是否显示目录
        }
    });

    // 监听文件变化自动刷新浏览器
    gulp.watch('images/*.*').on("change", browserSync.reload);;
    gulp.watch('static/*.*').on("change", browserSync.reload);;
}));

gulp.task('default', gulp.series('webserver-static', function() {
}));