var gulp          = require('gulp');
var notify        = require('gulp-notify');
var browserSync   = require('browser-sync').create();
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer');

/*================================================================
 # HELPER
 ================================================================*/

function handleError(err) {
  var msg = 'Error: ' + err.message;

  console.error('Error', err.message);
  browserSync.notify('Error: ' + err.message);

  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  if (typeof this.emit === 'function') this.emit('end')
}

/*================================================================
 # TASK
 ================================================================*/

gulp.task('sass', function() {
  return gulp.src('./sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      'sourceComments': false,
      'outputStyle': 'expanded'
    })).on('error', handleError)
    .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream({
      'once': true
    }));
});

gulp.task('serve', function() {
  browserSync.init({
    'server': './',
    'open': true
  });

  gulp.watch('./sass/*.scss', ['sass']);  
  gulp.watch('./js/*.js', { interval: 500 }).on('change', browserSync.reload);
  gulp.watch('./index.html', { interval: 500 }).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
