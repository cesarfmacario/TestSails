var cssFilesToInject = [
	'/bower_components/bootstrap/dist/css/bootstrap.min.css',
	'styles/**/*.css'
];

var jsFilesToInject = [	
  '/bower_components/bootstrap/dist/js/bootstrap.js',
  '/bower_components/angular/angular.js',
  '/bower_components/angular-route/angular-route.js',
  
  'js/dependencies/sails.io.js',
  'js/dependencies/**/*.js',

  'js/*.js',
  'js/angular/app.js',
  'js/angular/factories.js',
  'js/angular/*.js'
];

var templateFilesToInject = [
  'templates/**/*.html'
];

module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});