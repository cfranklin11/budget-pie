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
    var inputs, inputString, item, i, inputsRegExp, budgetObject, budgetArray,
      thisPersona, personaBudgets, j;

    inputs = req.body['data[]'];

    if (inputs) {
      if (Array.isArray(inputs)) {
        inputString = inputs.join('|');
      }

      inputsRegExp = new RegExp(inputString);
      budgetObject = {};
      budgetArray = [];

      Persona.find({'name': inputsRegExp}, function(err, personas) {
        if (err) {
          console.log(err);
          res.redirect('/');
        } else {

          if (personas.length === 0) {
            console.log('no personas found');
            res.redirect('/');

          } else {
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
              return b.clickRate - a.clickRate;
            });

            req.budgetArray = budgetArray;
            next();
          }
        }
      });
    } else {
      res.redirect('/');
    }
  },
  updateModel: function(req, res, next) {
    var body, modelTitle, metric, personaString, personaRegExp, i, thisPersona,
      personaBudgets, j;

    body = req.body;
    modelTitle = body.title;
    metric = body.data.metric;
    personaString = body.data.personas.replace(',', '|');
    personaRegExp = new RegExp(personaString);

    Persona.find({'name': personaRegExp}, function(err, personas) {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {

        if (personas.length === 0) {
          console.log('no personas found');
          res.redirect('/');

        } else {
          for (i = 0; i < personas.length; i++) {
            thisPersona = personas[i];
            personaBudgets = thisPersona.budgets;

            for (j = 0; j < personaBudgets.length; j++) {
              if (personaBudgets[j].title === modelTitle) {
                personaBudgets[j][metric]++;
                personaBudgets[j].clickRate = personaBudgets[j].clicks /
                  personaBudgets[j].impressions;

                thisPersona.save(function(err, persona) {
                  if (err) {
                    console.log(err);
                  } else {
                  }
                });
                break;
              }
            }
          }

          next();
        }
      }
    });
  },
  uploadData: function(req, res, next) {
    var parser, i, thisData, personaName, thisBudget, personaObject,
      personaArray, budgets, budgetLength, j, match, item, newPersona;

    personaObject = {};
    personaArray = [];

    parser = parse({delimiter: ',', columns: true}, function(err, data){
      for (i = 0; i < data.length; i++) {

        thisData = data[i];
        personaName = thisData.name;
        thisBudget = {
          title: thisData.title,
          department: thisData.department,
          dollarsThisYear: thisData.dollarsThisYear,
          dollarsLastYear: thisData.dollarsLastYear,
          budgetPercent: thisData.budgetPercent,
          benefits: [thisData.benefits],
          clickRate: thisData.clickRate,
          clicks: thisData.clicks,
          impressions: thisData.impressions
        };

        if (personaObject[personaName]) {
          budgets = personaObject[personaName].budgets;
          budgetLength = budgets.length;

          for (j = 0; j < budgetLength; j++) {
            match = false;

            if (budgets[j].title === thisBudget.title) {
              personaObject[personaName].budgets[j].benefits.push(thisBudget.benefits[0]);
              match = true;
            }
          }

          if (!match) {
            personaObject[personaName].budgets.push(thisBudget);
          }

        } else {
          personaObject[personaName] = {
            name: personaName,
            budgets: [thisBudget]
          };
        }
      }

      for (item in personaObject) {
        personaArray.push(personaObject[item]);
      }

      Persona.create(personaArray, function(err, personas) {
        if (err) {
          console.log(err);
        }
      });

      res.send('uploaded');
    });

    fs.createReadStream(__dirname + '/model-data2.csv').pipe(parser);
  }
};
