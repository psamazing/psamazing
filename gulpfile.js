const {src, dest, watch, series, gulp}=require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
const include = require('gulp-file-include');
const htmlbeautify = require('gulp-html-beautify');

//create function

//scss
function compilescss(){
    return src('src/resources/scss/*.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(minify())
    .pipe(dest('dist/resources/css'))
}

//js
function jsmin(){
    return src('src/resources/js/*.js')
    .pipe(terser())
    .pipe(dest('dist/resources/js'))
} 

//image
function images(){
    return src('src/resources/images/*')
    .pipe(dest('dist/resources/images'))
} 

//fonts
function fonts(){
    return src('src/resources/fonts/*')
    .pipe(dest('dist/resources/fonts'))
} 

//page
function pages(){
  
    const options = {
        indentSize: 2
    };


    return src([
        "./src/html/*", // ★★★★ 불러올 파일의 위치
        "!" + "./src/html/include*" // ★★★★ 읽지 않고 패스할 파일의 위치
    ])

    .pipe(include({
        prefix: '@@',
        basepath: '@file'
        }))
    .pipe(htmlbeautify(options))
    .pipe(dest('dist/html'))
} 

//create watchtask
function watchTask(){
    watch('src/resources/scss/*.scss',compilescss);
    watch('src/resources/js/*.js',jsmin);
    watch('src/html/*.html',pages);
}



//defult gulp
exports.default=series(
    compilescss,
    jsmin,
    images,
    pages,
    fonts,
    watchTask
);