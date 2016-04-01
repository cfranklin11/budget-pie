'use strict';

var request, fs, xlsx, parse, Persona;

request = require('request');
fs = require('fs');
xlsx = require('xlsx');
parse = require('csv-parse');
Persona = require('../models/persona.js');

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
    var inputs, inputString, item, i, re, budgetObject, budgetArray, thisPersona, personaBudgets;

    inputs = req.body['data[]'];

    if (inputs.length > 1) {
      inputString = inputs.join('|');
    }
    console.log(inputString);

    re = new RegExp(inputString);
    budgetObject = {};
    budgetArray = [];

    Persona.find({'name': re}, function(err, personas) {
      if (err) {
        console.log(err);
        res.redirect('/');
      }

      if (!personas) {
        console.log('no personas found');
        res.redirect('/');
      }

      console.log(personas);

      for (i = 0; i < personas.length; i++) {
        thisPersona = personas[i];
        personaBudgets = thisPersona.budgets;

        for (j = 0; j < personaBudgets.length; j++) {
          if (budgetObject[personaBudgets[j].title]) {
            budgetObject[personaBudgets[j].title].clickRate += personaBudgets[j].clickRate;
          } else {
            budgetObject[personaBudgets[j].title] = personaBudgets[j];
          }
        }
      }

      for (item in budgetObject) {
        budgetArray.push(budgetObject[item]);
      }

      budgetArray.sort(function(a, b) {
        a.clickRate - b.clickRate;
      });

      res.json(budgetArray);
    });
  },
  uploadData: function(req, res, next) {
    var parser, i, persona, arrays;

    parser = parse({delimiter: ',', columns: true}, function(err, data){
      for (i = 0; i < data.length; i++) {

        arrays.push(data[i]);

        // persona = new Persona(data[i]);

        // persona.save(function ( err ) {
        //   if ( err ) {
        //     console.log(err);
        //     res.redirect('/');
        //   }
        // });
      }
console.log(arrays);
      res.redirect('/');
    });

    fs.createReadStream(__dirname + '/data.csv').pipe(parser);
  }
};
