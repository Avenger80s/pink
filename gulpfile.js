var gulp       	 = require('gulp'), // Подключаем Gulp
		less 				 = require('gulp-less'),
		browserSync  = require('browser-sync'), // Подключаем Browser Sync
		concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
		cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
		rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
		del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
		imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
		pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
		cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
		autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
		svgmin 			 = require('gulp-svgmin'),
		svgstore 		 = require('gulp-svgstore'),
		fileinclude  = require('gulp-file-include'),
		inject 			 = require('gulp-inject');


gulp.task('include', function() {
  gulp.src(['app/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('svgmin', function () {
    return gulp.src('app/img/icons/*.svg')
        .pipe(svgmin())
				.pipe(rename({prefix: 'icon-'}))
        .pipe(gulp.dest('app/img/icons/sprite'));
});

gulp.task('svg-sprite', ['svgmin'], function () {
    var svgs = gulp
        .src('app/img/icons/sprite/*.svg')
        .pipe(svgstore({ inlineSvg: true }));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src('app/img/inline-svg.html')
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest('app/img'));
});

gulp.task('less', function () {
  return gulp.src('app/less/style.less')
    .pipe(less())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		// tunnel: true,
		notify: false // Подключаем уведомления
	});
});

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('app/less/**/*.less',['less']); // Наблюдение за sass файлами в папке sass
	gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
	return gulp.src('app/img/*') // Берем все изображения из app
		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'img', 'less'], function() {

	var buildCss = gulp.src(['app/css/style.css', 'app/css/normalize.css'])
	.pipe(cssnano())
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);
