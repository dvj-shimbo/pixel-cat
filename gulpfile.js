var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    debug = require('gulp-debug'),  // Подключаем дебаггер
    sourcemaps = require('gulp-sourcemaps'),  // Подключаем gulp-sourcemaps
    concat = require('gulp-concat'),  // Подключаем gulp-concat (для конкатенации файлов)
    del = require('del'),  // Подключаем библиотеку для удаления файлов и папок
    useref = require('gulp-useref'),  // Подключаем библиотеку для переименования подключенных стилей и скриптов в теле html
    uglify = require('gulp-uglify'),  // Подключаем gulp-uglify (для сжатия JS)
    pump = require('pump'),
    runSequence = require('run-sequence'),  // Запуск последовательности задач
    stripCssComments = require('gulp-strip-css-comments'),  // Очистка css от остатков комментариев
    htmlclean = require('gulp-htmlclean'),  // Подключаем пакет для очистки html
    prettify = require('gulp-prettify'),  // Подключаем пакет для форматирования html
    notify = require("gulp-notify"),  // Подключаем пакет для вывода сообщений
    plumber = require('gulp-plumber'),
    gcmq = require('gulp-group-css-media-queries'), // Группировка медиа-запросов
    htmlreplace = require('gulp-html-replace'); // Замена строк в HTML




gulp.task('browser-sync', function() { // Создаем таск browser-sync
  browserSync({ // Выполняем browserSync
    server: { // Определяем параметры сервера
      baseDir: 'src', // Директория для сервера - src
      index: "index.html" // Файл для наблюдения
    },
    notify: false // Отключаем уведомления
  });
});



gulp.task('sass', function() { // Создаем таск "sass"
    return gulp.src('src/sass/**/*.+(sass|scss)') // Берем источник
        .pipe(plumber({
          errorHandler: notify.onError(function(error) {
            return {
              title: "SASS",
              message: error.message
            }
          })
        }))
        .pipe(debug({title: '| sass > src:'}))
        .pipe(sourcemaps.init())
        .pipe(sass({ // Преобразуем Sass в CSS посредством gulp-sass
          outputStyle: 'expanded', 
          sourceComments: true}))

//        .on('error', sass.logError))
//        .on('error', notify.onError()))

        .pipe(debug({title: '| sass > sass:'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/css')) // Выгружаем результат в папку src/css
        .pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении
});





/**
gulp.task('respond', function() {
  return gulp.src('node_modules/respond.js/dest/respond.src.js')
    .pipe(gulp.dest('src/js/'));
});

gulp.task('nwmatcher', ['respond'], function() {
  return gulp.src('node_modules/nwmatcher/src/nwmatcher.js')
    .pipe(gulp.dest('src/js/'));
});

gulp.task('html5shiv', ['nwmatcher'], function() {
  return gulp.src('node_modules/html5shiv/dist/html5shiv.js') // Переносим html5shiv в src/js
    .pipe(gulp.dest('src/js/'));
});
/**/


gulp.task('scripts', function() {
//gulp.task('scripts', ['scripts-ie'], function() {
//gulp.task('scripts', ['html5shiv'], function() {
  return gulp.src([ // Берем все необходимые библиотеки
//      'node_modules/mediaelement/build/mediaelement-and-player.js', // MediaElement.js
      'node_modules/jquery/dist/jquery.js', // jQuery
//      'node_modules/jquery/dist/jquery.slim.js', // jQuery slim
//      'node_modules/popper.js/dist/umd/popper.js', // popper.js
//      'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js', // Bootstrap 3
/**
//      'node_modules/bootstrap-sass/assets/javascripts/bootstrap/transition.js', // Bootstrap 3 transitions
//      'node_modules/bootstrap-sass/assets/javascripts/bootstrap/alert.js', // Bootstrap 3 alerts
//      'node_modules/bootstrap-sass/assets/javascripts/bootstrap/button.js', // Bootstrap 3 buttons
//      'node_modules/bootstrap-sass/assets/javascripts/bootstrap/carousel.js', // Bootstrap 3 carousel
//      'node_modules/bootstrap-sass/assets/javascripts/bootstrap/collapse.js', // Bootstrap 3 collapse
//      'node_modules/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js', // Bootstrap 3 dropdowns
//      'node_modules/bootstrap-sass/assets/javascripts/bootstrap/modal.js', // Bootstrap 3 modals
//      'node_modules/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js', // Bootstrap 3 tooltip
//      'node_modules/bootstrap-sass/assets/javascripts/bootstrap/popover.js', // Bootstrap 3 popovers
//      'node_modules/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js', // Bootstrap 3 scrollspy
//      'node_modules/bootstrap-sass/assets/javascripts/bootstrap/tab.js', // Bootstrap 3 tabs
//      'node_modules/bootstrap-sass/assets/javascripts/bootstrap/affix.js', // Bootstrap 3 affix
/**/
//      'node_modules/bootstrap/dist/js/bootstrap.js', // Bootstrap 4
    ])
    .pipe(sourcemaps.init())
    .pipe(debug({title: '| scripts > src:'}))
    .pipe(concat('libs.js')) // Собираем их вместе в новом файле libs.js
    .pipe(debug({title: '| scripts > concat:'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('src/js/')); // Выгружаем в папку src/js
});


gulp.task('clean-src', function() {
  return del(['src/css/**/*', 
//              'src/js/html5shiv.js', 
//              'src/js/nwmatcher.js',
//              'src/js/respond.src.js',
              'src/js/libs.js', 
              'src/js/libs.js.map'/*, 
              'src/js/libs-ie.js', 
              'src/js/libs-ie.js.map'*/]);
});


gulp.task('prepare-to-watch', function(callback) {
  runSequence('clean-src',
              'sass',
              'scripts',
              'browser-sync',
              callback);
});


gulp.task('watch', ['prepare-to-watch'], function() {
    gulp.watch('src/sass/**/*.+(sass|scss)', ['sass']); // Наблюдение за scss файлами в папке sass
    gulp.watch('src/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('src/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});


gulp.task('clean', ['clean-src'], function() {
  return del('build');
});


gulp.task('build-sass', function() {
  return gulp.src('src/sass/**/*.+(sass|scss)') // Берем источник
    .pipe(debug({title: '| build-sass > src:'}))
    .pipe(sass({outputStyle: 'compressed'})) // Преобразуем Sass в CSS посредством gulp-sass
    .pipe(debug({title: '| build-sass > sass:'}))
    .pipe(gulp.dest('build/.tmp/css')); // Выгружаем результат в папку build/.tmp/css
});


gulp.task('strip-css-comments', function () {
    return gulp.src('build/.tmp/css/**/*.css')
        .pipe(debug({title: '| strip-css-comments > src:'}))
        .pipe(stripCssComments({preserve: false})) // Убираем важные комментарии: /*! */
        .pipe(debug({title: '| strip-css-comments > stripCssComments:'}))
        .pipe(gulp.dest('build/.tmp/css'));
});

gulp.task('group-css-media-queries', function () {
  return gulp.src('build/.tmp/css/**/*.css')
        .pipe(debug({title: '| group-css-media-queries > src:'}))
        .pipe(gcmq()) // Группировка медиа-запросов в финальных CSS
        .pipe(debug({title: '| group-css-media-querie > gcmq:'}))
        .pipe(gulp.dest('build/.tmp/css'));
});


gulp.task('build-icon-font', function() {
  return gulp.src('src/fonts/icons/*') // Переносим иконочные шрифты в продакшен
    .pipe(debug({title: '| build-icon-font > src:'}))
    .pipe(gulp.dest('build/fonts/icons'));
});


gulp.task('build-fonts', function() {
  return gulp.src(['!src/fonts/icons', 'src/fonts/**/*']) // Переносим остальные шрифты в продакшен
    .pipe(debug({title: '| build-fonts > src:'}))
    .pipe(gulp.dest('build/fonts'));
});


gulp.task('build-img', function() {
  return gulp.src('src/img/**/*') // Переносим картинки в продакшен
    .pipe(debug({title: '| build-img > src:'}))
    .pipe(gulp.dest('build/img'));
});


gulp.task('build-favicon', function() {
  return gulp.src('src/favicon.ico') // Переносим favicon.ico в продакшен
    .pipe(debug({title: '| build-favicon > src:'}))
    .pipe(gulp.dest('build'));
});


gulp.task('build-html-prepare', function() {
  return gulp.src('src/*.html') // Переносим HTML в  папку build/.tmp
    .pipe(debug({title: '| build-html-prepare > src:'}))
    .pipe(gulp.dest('build/.tmp'));
});


gulp.task('build-scripts', function (cb) {
  pump([
        gulp.src([

            '!src/js/vendor/**/',
            'src/js/**/*.js'


          ])
        .pipe(debug({title: '| build-scripts > src:'})),
        uglify(),
        gulp.dest('build/.tmp/js')
    ],
    cb
  );
});


gulp.task('build-scripts-vendor', function() {
  return gulp.src('src/js/vendor/**/*.js')
    .pipe(gulp.dest('build/.tmp/js/vendor'));
});





/**
gulp.task('replace-html', function() {
  return gulp.src('build/.tmp/*.html')
    .pipe(debug({title: '| replace-html > src:'}))
    .pipe(htmlreplace({
        'styles': 'TEST.css',
        'scripts': 'TEST.js'
    }))
    .pipe(gulp.dest('build/.tmp'));
});
/**/






gulp.task('build-html', function() {
  return gulp.src('build/.tmp/*.html') // Переносим HTML в продакшен
    .pipe(debug({title: '| build-html > src:'}))
    .pipe(useref()) // Переиминовываем css в min.css и js в min.js в теле .html
    .pipe(debug({title: '| build-html > useref:'}))
    .pipe(htmlclean({ // Очистка и сжатие html
      edit: function(html) { return html.replace(/\begg(s?)\b/ig, 'omelet$1'); } 
    }))
    .pipe(debug({title: '| build-html > htmlclean:'}))
    .pipe(gulp.dest('build'));
});


gulp.task('prettify-html', function() {
  return gulp.src('build/*.html') //  // Окончательное форматирование html
    .pipe(debug({title: '| prettify-html > src:'}))
    .pipe(prettify({indent_size: 2}))
    .pipe(debug({title: '| prettify-html > prettify:'}))
    .pipe(gulp.dest('build'));
});


gulp.task('build-cleanup', function() {
  return del('build/.tmp');
});

//gulp.task('build-htc', function() {
//  return gulp.src('src/htc/**/*.min.htc')
//    .pipe(gulp.dest('build/htc'));
//});


gulp.task('build', function(callback) {
  runSequence('clean',
              [
                'sass',
                'build-sass', 
                'scripts',
                'build-icon-font', 
                'build-fonts', 
                'build-img', 
                'build-favicon', 
                'build-html-prepare'
              ],
              'strip-css-comments',
              'group-css-media-queries',
              'build-scripts',
              'build-scripts-vendor',
 //             'replace-html',
              'build-html',
              'prettify-html',
              'build-cleanup',
//              'build-htc',
              callback);
});


gulp.task('default', ['watch']);