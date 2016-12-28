var gulp = require('gulp'), watch = require('gulp-watch')
var browserify = require('browserify')
var jadeify = require('jadeify')
var babelify = require('babelify')
var buffer = require('vinyl-buffer')
var source = require('vinyl-source-stream')
var stylus = require('gulp-stylus')
var concat = require('gulp-concat-css')
var nib = require('nib')
var minify = require('gulp-minify-css')
var uglify = require('gulp-uglify')

gulp.task('build', ['js', 'styles'])

gulp.task('js', function() {
    return watch('./assets/lib/js/app.js', function () {
        browserify({ 
            entries: './assets/lib/js/app.js', //  PUNTO DE ENTRADA
            transform: [ babelify ]    //  TRANSFORMACIONES
        })
        .bundle()
        .pipe(source('app.js')) //  ARCHIVO DESTINO
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/'))   //  RUTA DESTINO
    })
})

gulp.task('styles', function() {
    return watch('./assets/lib/styles/', function () {
        gulp.src('./assets/lib/styles/styles.styl')    //  ENTRY POINTS DE STYLUS
        .pipe(stylus({ use: nib() }))   //  INICIALIZAR STYLUS CON NIB COMO PLUGIN
        .pipe(concat('styles.css'))
        .pipe(minify())
        .pipe(gulp.dest('./assets/styles/'))
    })
})


