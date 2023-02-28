const {src, dest, watch, parallel} = require("gulp")

//CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require ('gulp-plumber');

//imagenes
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(cb){

    //identificar archivo de SASS
    //compilarlo
    //almacenar en el disco

    src("src/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(dest("build/css"))

    cb();
};

function imagenes(cb){
    
    const opciones ={
        optimizationLevel: 3
    }

    src('src/img/**/*')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'))
    cb()
}


function versionWebp(cb){

    const options = {
        quality: 50
    };
    src('src/img/**/*')
    .pipe(webp(options))
    .pipe(dest('build/img'))
    
    cb();
}


function javascritp(cb){
    src('src/js/**/*.js')
    .pipe(dest('build/js'))

    cb()
}

function dev(cb){

    watch("src/scss/**/*.scss", css)
    watch("src/js/**/*.js", javascritp)
    cb()
}



exports.css = css
exports.js = javascritp
exports.versionWebp = versionWebp
exports.imagenes = imagenes
exports.dev = parallel(imagenes, versionWebp, javascritp, dev)