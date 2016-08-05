var gulp = require('gulp')
var browserify = require('browserify')
var glob = require('glob')
var debug = require('gulp-debug')

var source = require('vinyl-source-stream')
var reactify = require('reactify')

var production = process.env.NODE_ENV === 'production'

var paths = {
   js: "./dev/js/**/*.js",
   assets: "./dev/assets/**/*",
   css: "./dev/css/**/*.css"
}

gulp.task('copy', function() {
   var files = glob.sync('./dev/**/*[!.db]')

   return gulp.src(files, {base: "./dev"})
      .pipe(debug({title: "index: "}))
      .pipe(gulp.dest('./public/'))
})

gulp.task('build', ['copy'], function() {
   var files = glob.sync('./public/js/main.js')
   var bun = browserify(files,
      {basedir: __dirname,
       debug: !production,
       transform: reactify})

   return bun.bundle()
      .pipe(source('bundle.js'))
      .pipe(debug({title: "build: "}))
      .pipe(gulp.dest('./public/js/compiled'))
})


gulp.task('build-js', function() {
   var files = glob.sync(paths.js)

   return gulp.src(files, {base: "./dev/js"})
      .pipe(debug({title: "js: "}))
      .pipe(gulp.dest('./public/js'))
})

gulp.task('watch', function () {
   gulp.watch(paths.js, ['build'])
      .on("error", function(event) {
         console.log("ERROR: ", event)
      })
});

gulp.task('default', ['build', 'watch'])
