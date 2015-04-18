// ==== CONFIGURATION ==== //

// Project paths
var project     = 'mcm-wordpress';
var src         = './src/';
var build       = './build/';
var dist        = './dist/' + project + '/';
var bower       = './bower_components/';
var composer    = './vendor/';

// Project settings
module.exports = {

  bower: {
    normalize: { // Copies `normalize.css` from `bower_components` to `src/scss` and renames it to allow for it to imported as a Sass file
      src: bower + 'normalize.css/normalize.css',
      dest: src + 'scss',
      rename: '_normalize.scss'
    }
  },

  browsersync: {
    files: [build + '/**', '!' + build + '/**.map'], // Exclude map files
    notify: false, // In-line notifications (the blocks of text saying whether you are connected to the BrowserSync server or not)
    open: true, // Set to false if you don't like the browser window opening automatically
    port: 3000, // Port number for the live version of the site; default: 3000
    proxy: 'localhost:8080', // Using a proxy instead of the built-in server as we have server-side rendering to do via WordPress
    watchOptions: {
      debounceDelay: 2000 // Delay for events called in succession for the same file/event
    }
  },

  images: {
    build: { // Copies images from `src` to `build`; does not optimize
      src: src + '**/*(*.png|*.jpg|*.jpeg|*.gif)',
      dest: build
    },
    dist: {
      src: [dist + '**/*(*.png|*.jpg|*.jpeg|*.gif)', '!' + dist + 'screenshot.png'],
      imagemin: {
        optimizationLevel: 7,
        progressive: true,
        interlaced: true
      },
      dest: dist
    }
  },

  livereload: {
    port: 35729
  },

  scripts: {
    // Bundles are defined by a name and an array of chunks to concatenate; warning: it's up to you to manage dependencies!
    bundles: {
      // core: ['core']
    },
    // Chunks are arrays of globs matching source files that combine to provide specific functionality
    chunks: {
      core: [src + 'js/navigation.js', src + 'js/core.js']
    },
    dest: build + 'js/', // Where the scripts end up
    lint: {
      src: [src + 'js/**/*.js'] // Lint core scripts (for everything else we're relying on the original authors)
    },
    minify: {
      src: [build + 'js/**/*.js', '!' + build + 'js/**/*.min.js'], // Avoid recursive min.min.min.js
      rename: { suffix: '.min' },
      uglify: {},
      dest: build + 'js/'
    }
    namespace: 'wp-' // Script filenames will be prefaced with this (optional; leave blank if you have no need for it but be sure to change the corresponding value in `src/inc/assets.php`)
  },

  styles: {
    build: {
      src: [src + 'scss/*.scss', '!' + src + 'scss/_*.scss'], // Ignore partials
      dest: build
    },
    dist: {
      src: [dist + '**/*.css', '!' + dist + '**/*.min.css'],
      minify: { keepSpecialComments: 1, roundingPrecision: 3 },
      dest: dist,
    }
    autoprefixer: {
      browsers: ['> 3%', 'last 2 versions', 'ie 9', 'ios 6', 'android 4']
    },
    rename: { suffix: '.min' },
    minify: { keepSpecialComments: 1, roundingPrecision: 3 },
     // Don't forget to run `gem install sass`; Compass is not included by default
    sass: {
      includePaths: [bower],
      precision: 8
    }
  },

  theme: {
    lang: {
      src: src + 'languages/**/*', // Glob matching any language files you'd like to copy over
      dest: build + 'languages/'
    },
    php: {
      src: src + '**/*.php',
      dest: build
    }
  },

  utils: {
    clean: [build + '**/.DS_Store'], // A glob matching junk files to clean out of `build`
    wipe: [dist], // Clean this out before creating a new distribution copy
    dist: {
      src: [build + '**/*', '!' + build + '**/*.min.css'],
      dest: dist,
    }
  },

  // What to watch before triggering each specified task
  watch: {
    src: {
      styles:       src + 'scss/**/*.scss',
      scripts:      [src + 'js/**/*.js', bower + '**/*.js'],
      images:       src + '**/*(*.png|*.jpg|*.jpeg|*.gif)',
      theme:        src + '**/*.php',
      livereload:   [build + '**/*']
    },
    // Who watches the watcher? Easily switch between BrowserSync ('browsersync') and Livereload ('livereload')
    watcher: 'livereload'
  }
}
