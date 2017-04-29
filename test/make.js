var fs = require('fs');
var browserify = require('browserify');
browserify(__dirname + '/main.js')
  .transform('babelify', {presets: ['es2015']})
  .bundle()
  .pipe(fs.createWriteStream(__dirname + '/bundle.js'));
