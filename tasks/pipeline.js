var cssFilesToInject = [
	'/bower_components/bootstrap/dist/css/bootstrap.min.css',
	'styles/**/*.css'
];

var jsFilesToInject = [	
  '/bower_components/jquery/dist/jquery.js',
  '/bower_components/bootstrap/dist/js/bootstrap.js',
  
  'js/dependencies/sails.io.js',
  'js/dependencies/**/*.js',

  'js/angular-modal-service.js',
  'js/angular/app.js',
  'js/angular/*Controller.js',
  'js/angular/factories.js',
  'js/*.js'
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