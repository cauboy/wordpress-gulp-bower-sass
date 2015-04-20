// ==== STYLES ==== //

var gulp        = require('gulp');
var gutil         = require('gulp-util');
var plugins     = require('gulp-load-plugins')({ camelize: true });
var config      = require('../../gulpconfig').styles;
var autoprefixer  = require('autoprefixer-core');

/*
 * Build stylesheets from source Sass files, autoprefix, and make a minified
 * copy (for debugging)
 */

gulp.task('styles', function() {
    return gulp.src(config.build.src)
        .pipe(plugins.sass(config.sass))
        // Log errors instead of killing the process
        .on('error', mcmErrorHandler)
        .pipe(plugins.postcss([autoprefixer(config.autoprefixer)]))
        // Drops the unminified CSS file into the `build` folder
        .pipe(gulp.dest(config.build.dest))
        .pipe(plugins.rename(config.rename))
        .pipe(plugins.minifyCss(config.minify))
        // Drops a minified CSS file into the `build` folder for debugging
        .pipe(gulp.dest(config.build.dest));
});



/*
 * Copy stylesheets from the `build` folder to `dist` and minify them
 * along the way
 */

gulp.task('styles-dist', ['utils-dist'], function() {
    return gulp.src(config.dist.src)
        .pipe(plugins.minifyCss(config.minify))
        .pipe(gulp.dest(config.dist.dest));
});

function mcmErrorHandler(err) {
    gutil.log(err.message);
    this.emit('end');
}