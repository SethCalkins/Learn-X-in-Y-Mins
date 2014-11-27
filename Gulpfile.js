var gulp       = require('gulp'),
    plumber    = require('gulp-plumber'),
    jade       = require('gulp-jade'),
    prefix     = require('gulp-autoprefixer'),
    lr         = require('gulp-livereload'),
    minCSS     = require('gulp-minify-css'),
    concat     = require('gulp-concat'),
    browserify = require('browserify'),
    source     = require('vinyl-source-stream'),
    stylus     = require('gulp-stylus'),
    jeet       = require('jeet'),
    rupture    = require('rupture'),
    shell      = require('shelljs'),
    uglify     = require('gulp-uglify'),
    nib        = require('nib');

var app   = require('./app');
var debug = require('debug')('reference');
app.set('port', process.env.PORT || 3000);

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

gulp.task('build', function() {
  gulp.src('public/javascripts/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts/'));
});

// This makes sure we push minified files to the server
gulp.task('deploy', ['deps', 'styl', 'browserify', 'build'], function() {
  shell.exec('git add .')
  shell.exec('git commit -m "Minimize and build production files"')
  // shell.exec('git push');
  // shell.exec('git push dokku master');
});

gulp.task('browserify', function() {
  browserify(process.cwd() + '/client/index.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('public/javascripts/'))
})

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
  gulp.watch('client/**/*.js', ['browserify']);

  // livereload needs to see that it was in fact a CSS file that
  // changed in order to do injection, so I need to watch the css file not the
  // stylus file.
  gulp.watch('public/stylesheets/style.css', server.changed);

  gulp.watch('public/javascripts/app.js', server.changed);
});

gulp.task('default', ['deps', 'serve', 'watch']);
