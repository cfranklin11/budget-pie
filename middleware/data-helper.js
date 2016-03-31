'use strict';

var request, fs, xlsx;

request = require('request');
fs = require('fs');
xlsx = require('xlsx');

module.exports = {
  getData: function(req, res, next) {
    var url, urlArray, filename, workbook, writer;

    url = '';
    urlArray = url.split('/');
    filename = urlArray[-1];

    fs.exists(process.cwd() + '/public/data/' + filename, function(exists) {
      if (exists) {
        workbook = xlsx.readFile(process.cwd() +
          '/public/data/2015-16-State-Capital-Program.xlsx');
        console.log(workbook.SheetNames);

      } else {
        writer = fs.createWriteStream(process.cwd() +
          '/public/data/2015-16-State-Capital-Program.xlsx');

        request('http://www.dtf.vic.gov.au/files/c30ad6e4-ffee-4e45-9319-a48b00a3dfea/' +
          '2015-16-State-Capital-Program.xlsx')
          .pipe(writer);

        writer.on('finish', function() {
          workbook = xlsx.readFile(process.cwd() +
            '/public/data/2015-16-State-Capital-Program.xlsx');
          console.log(workbook.SheetNames);
        });
      }
    });
    next();
  },
  sendJson: function(req, res, next) {
    var form;

    form = req.body;

    console.log(form);
    res.json({
      title: 'dummy program',
      dollarsThisYear: 100,
      dollarsLastYear: 100,
      percent: 0.2,
      benefits: ['benefit1', 'benefit2', 'benefit3']
    });
  }
};
