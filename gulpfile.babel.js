'use strict';

import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import globby from 'globby';
import through from 'through2';
import gulpLoadPlugins from 'gulp-load-plugins';

const plugins = gulpLoadPlugins();

gulp.task('scripts', () => {
  const bundledStream = through(); // create a stream

  bundledStream
    .pipe(source('app.js')) // file name or path to be build
    .pipe(buffer())
    .pipe(plugins.sourcemaps.init({loadMaps: true}))  // create source map
    .pipe(plugins.babel())
    .pipe(plugins.uglify())
    .on('error', plugins.util.log)
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/scripts/'));

  globby(['./src/**/*.js']).then((entries) => { // readable stream

    const b = browserify({
      entries: entries,
      debug: true // add source map at the end of entry file
    });

    b.bundle()
      .on('error', (err) => {
        console.log('Error is ' + err.message);
        bundledStream.emit('end');
      })
      .pipe(bundledStream); // pipe the Browserify stream into the stream

  });

  return bundledStream;
});

gulp.task('watch', () => {
  const watcher = gulp.watch(['./src/**/*.js'], ['scripts']);
  watcher.on('change', (event) => {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('default', ['scripts', 'watch']);
