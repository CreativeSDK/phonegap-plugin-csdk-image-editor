#!/usr/bin/env node

module.exports = function(context) {

  var fs = context.requireCordovaModule('fs'),
    path = context.requireCordovaModule('path');

  var platformRoot = path.join(context.opts.projectRoot, 'platforms/android');


  var manifestFile = path.join(platformRoot, 'AndroidManifest.xml');

  if (fs.existsSync(manifestFile)) {

    fs.readFile(manifestFile, 'utf8', function (err,data) {
      if (err) {
        throw new Error('Unable to find AndroidManifest.xml: ' + err);
      }

      var result = data;
      if (data.indexOf('AdobeAuthCredentialsApp') === -1) {
        result = result.replace(/AdobeAuthCredentialsApp/g, 'AdobeAuthRedirectCredentialsApp');
      }
    });
  }
};
