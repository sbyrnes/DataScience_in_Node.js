/**
 * Data Science in Node.js: Example 1
 * An example of how to use regression modeling to predict the future.
 */

// Utility modules
var fs = require('fs');
var parse = require('csv-parse');

// Linear Regression module
var Lyric = require('lyric-node');

// Intro
console.log('\nData Science in Node.js: Example 1\n')

// The filename should be the first argument
var file = process.argv[2];
if(!file) {
  console.log('Usage: node science.js <CSV_FILENAME> [polynomial_degree]\n')
  process.exit(1);
}
var polynomialDegree = 2;
if(process.argv[3])
{
  polynomialDegree = parseInt(process.argv[3]);
}

// Future value to estimate
var estimationInput = new Array();
    estimationInput['label'] = new Array();
    /**
    estimationInput['label'][0] = '1/1/14';
    estimationInput['x'] = new Array();
    estimationInput['x'][0] = 366;*/
    estimationInput['label'][0] = '1/11/13';
    estimationInput['x'] = new Array();
    estimationInput['x'][0] = 11;



// Read the raw file data
fs.readFile(file, function (err, rawData) {
  if (err) throw err;

  // parse the CSV
  parse(rawData, {}, function(err, csvData){

    console.log('>> Found input file of ' + csvData.length + ' rows\n');

    // transform into our expected input format
    transformCSVToLyric(csvData, function(inputData) {

      var model = Lyric.buildModel(inputData, polynomialDegree);

      var estimateData = Lyric.applyModel(estimationInput, model, polynomialDegree);

      console.log(estimateData);

      console.log('Estimate:\n Number of users will be ' + estimationInput['label'][0] + ' is ' + estimateData[0]['y']);
      console.log(' (Using ' +polynomialDegree + ' order polynomial)\n')
    });
  });
});

// Function to transform raw CSV data into Lyric input format
function transformCSVToLyric(csvData, callback)
{
  var result = new Array();
      result['x'] = new Array(csvData.length-1);
      result['y'] = new Array(csvData.length-1);

  // start at 1 to skip the headers
  for(var i=1; i<csvData.length; i++)
  {
    result['x'][i-1] = csvData[i][0];
    result['y'][i-1] = parseInt(csvData[i][1]);
  }

  // instead of using the date, use the ordinal
  var ordinalInput = Lyric.ordinalize(result);

  callback(ordinalInput);
}
