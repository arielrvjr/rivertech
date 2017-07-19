var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
   sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean');
ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify');
var bytediff = require('gulp-bytediff');

// JSHint task
gulp.task('lint', function() {
  gulp.src('./app/js/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
  gulp.src(['app/js/index.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('app.js', {newLine: ';'}))
  .pipe(ngAnnotate())
 /* .pipe(bytediff.start())
        .pipe(uglify({mangle: false}))
      .pipe(bytediff.stop())*/
  .pipe(sourcemaps.write())

  // Output it to our dist folder
  .pipe(gulp.dest('dist/js'));
});

gulp.task('browserifyPRO', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
  gulp.src(['app/js/index.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('app.js', {newLine: ';'}))
  .pipe(ngAnnotate())
  .pipe(bytediff.start())
        .pipe(uglify({mangle: false}))
      .pipe(bytediff.stop())
  .pipe(sourcemaps.write())
  // Output it to our dist folder
  .pipe(gulp.dest('dist/js'));
});


gulp.task('watch', ['lint'], function() {
  // Watch our scripts
  gulp.watch(['app/js/*.js', 'app/js/**/*.js'],[
    'lint',
    'browserify'
  ]);
  gulp.watch(['app/index.html', 'app/views/**/*.html'], [
  'views'
]);
});

// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('app/index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('dist/'));

  // Any other view files from app/views
  gulp.src('./app/views/**/*')
  // Will be put in the dist/views folder
  .pipe(gulp.dest('dist/views/'))
  .pipe(refresh(lrserver)); // Tell the lrserver to refresh

});

var embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    livereloadport = 35716,
    serverport = 5016;

// Set up an express server (but not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
    res.sendFile('index.html', { root: 'dist' });
});
gulp.task('default', ['lint','browserify','views',  'watch']);
gulp.task('build', ['lint','browserifyPRO','views']);

// Dev task
gulp.task('dev', function() {
  // Start webserver
  server.listen(serverport);
  // Start live reload
  lrserver.listen(livereloadport);
  // Run the watch task, to keep taps on changes
  gulp.run('default');
});