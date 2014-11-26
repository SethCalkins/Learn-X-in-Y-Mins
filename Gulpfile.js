// Gulp
var gulp    = require('gulp'),
    plumber = require('gulp-plumber'),
    jade    = require('gulp-jade'),
    stylus  = require('gulp-stylus'),
    prefix  = require('gulp-autoprefixer'),
    lr      = require('gulp-livereload'),
    concat  = require('gulp-concat');

var app   = require('./app');
var debug = require('debug')('reference');
app.set('port', process.env.PORT || 3000);

// Other Deps
var nib = require('nib');

// Compile Stylus Files
function compileStyles() {
  return gulp.src('styles/style.styl')
    .pipe(plumber())
    .pipe(stylus({ errors: true, use: [nib()] }))
    .pipe(prefix())
    .pipe(gulp.dest('./public/stylesheets'));
}

// Styles can be compiled via gulp
gulp.task('styl', compileStyles);

gulp.task('serve', function() {
  var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
  });
});

gulp.task('deps', function() {
  gulp.src([
    'node_modules/highlight.js/styles/github.css'
  ]).pipe(concat('dependencies.css'))
    .pipe(gulp.dest('public/stylesheets'));

});

gulp.task('watch', function() {

  // Start live reload
  var server = lr();

  lr.listen();

  // Inject style changes for quick iteration
  gulp.watch('stylesheets/**/*.styl').on('change', compileStyles);

  // livereload needs to see that it was in fact a CSS file that
  // changed in order to do injection, so I need to watch the css file not the
  // stylus file.
  gulp.watch('public/stylesheets/style.css').on('change', server.changed);
});

gulp.task('default', ['serve', 'watch']);
