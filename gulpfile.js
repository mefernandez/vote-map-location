// gulpfile.js 
var gulp = require('gulp');
var server = require('gulp-express');
var mainBowerFiles = require('main-bower-files');
 
gulp.task('server', function () {
    // Start the server at the beginning of the task 
    server.run(['app.js']);
 
    // Restart the server when file changes 
    gulp.watch(['public/**/*.html'], server.notify);
    gulp.watch(['views/**/*.jade'], server.notify);
    gulp.watch(['routes/**/*.js'], server.notify);
    gulp.watch(['app.js'], [server.run]);
});


gulp.task('bower', function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('public/javascripts/lib'));
});