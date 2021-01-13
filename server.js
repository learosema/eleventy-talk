/**
 * Require Browsersync
 */
var browserSync = require('browser-sync');

/**
 * Run Browsersync with server config
 */
browserSync({
  server: 'public',
  files: ['public/*.html', 'public/css/*.css', 'public/js/*.js'],
});
