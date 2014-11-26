// Gulp
var gulp    = require('gulp'),
    plumber = require('gulp-plumber'),
    jade    = require('gulp-jade'),
    prefix  = require('gulp-autoprefixer'),
    lr      = require('gulp-livereload'),
    minCSS  = require('gulp-minify-css'),
    concat  = require('gulp-concat');

var app   = require('./app');
var debug = require('debug')('reference');
app.set('port', process.env.PORT || 3000);

// Other Deps
var stylus  = require('gulp-stylus'),
    jeet    = require('jeet'),
    rupture = require('rupture'),
    nib     = require('nib');


// Styles can be compiled via gulp
gulp.task('styl', function() {
  return gulp.src('stylesheets/style.styl')
    .pipe(plumber())
    .pipe(stylus({ errors: true, use: [nib(), jeet(), rupture()] }))
    .pipe(prefix())
    .pipe(minCSS())
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('serve', function() {
  var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
  });
});

gulp.task('deps', function() {

  // CSS
  gulp.src([
    'node_modules/highlight.js/styles/github.css',
    'node_modules/font-awesome/css/font-awesome.css',
    'stylesheets/font-mfizz.css',
    'stylesheets/octicons.css'
  ]).pipe(concat('dependencies.css'))
    .pipe(minCSS())
    .pipe(gulp.dest('public/stylesheets'));

  // Fonts
  gulp.src([
    'node_modules/font-awesome/fonts/fontawesome-webfont.eot',
    'node_modules/font-awesome/fonts/fontawesome-webfont.svg',
    'node_modules/font-awesome/fonts/fontawesome-webfont.ttf',
    'node_modules/font-awesome/fonts/fontawesome-webfont.woff',
    'node_modules/font-awesome/fonts/FontAwesome.otf'
  ]).pipe(gulp.dest('public/fonts'));

});

gulp.task('watch', function() {

  // Start live reload
  var server = lr();

  lr.listen();

  gulp.watch('views/**/*.jade', server.changed);
  gulp.watch('stylesheets/**/*.styl', ['styl']);

  // livereload needs to see that it was in fact a CSS file that
  // changed in order to do injection, so I need to watch the css file not the
  // stylus file.
  gulp.watch('public/stylesheets/style.css', server.changed);
});

gulp.task('default', ['deps', 'serve', 'watch']);
