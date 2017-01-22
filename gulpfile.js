var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    nodemon = require('gulp-nodemon'),
    jsFiles = ['*.js', 'src/**/*.js'],
    watchFiles = ['*.js', 'src/**/*.js', '*.jade', 'src/**/*.jade'];

gulp.task('style', function() {
  return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
          verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function() {
  var wiredep = require('wiredep').stream,
      inject = require('gulp-inject'),
      options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
      },
      injectSrc = gulp.src(['./public/css/*.css',
                            './public/js/*.js'], {read: false}),
      injectOptions = {
        ignorePath: '/public'
      };

  return gulp.src('./src/views/*.jade')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], function() {
  var options = {
    script: 'app.js',
    delayTime: 1,
    env: {
      'PORT': 3000
    },
    watch: watchFiles
  };

  return nodemon(options)
      .on('restart',
          function(ev) {
            console.log('Restarting...');
          }
      );
});