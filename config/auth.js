'use strict';

var fs, env, envFile;

  fs = require('fs');
  env = {};
  envFile = require('path').join(__dirname, 'env.json');

if (fs.existsSync(envFile)) {
  env = fs.readFileSync(envFile, 'utf-8');
  env = JSON.parse(env);
  Object.keys(env).forEach(function (key) {
    process.env[key] = env[key];
  });
}

module.exports = {
  'url' : process.env.DB_URL
};