/**
* Data Science in Node.js: Example 2
* An example of how to use recommender systems to predict what customers might like.
*/

// Utility modules
var fs = require('fs');
var parse = require('csv-parse');

// Recommender system module
var Recommender = require('likely');

// Intro
console.log('\nData Science in Node.js: Example 2\n')

// The filename should be the first argument
var file = process.argv[2];
if(!file) {
  console.log('Usage: node science.js <CSV_FILENAME> [PERSON_NAME]\n')
  process.exit(1);
}
// The optional person name should be the second argument
var personName = process.argv[3];

// Read the raw file data
fs.readFile(file, function (err, rawData) {
  if (err) throw err;

  // parse the CSV
  parse(rawData, {}, function(err, csvData){

    console.log('>> Found input file of ' + csvData.length + ' rows\n');

    transformCSVToLikey(csvData, function(inputMatrix, rowLabels, colLabels) {

      var Model = Recommender.buildModel(inputMatrix, rowLabels, colLabels);

      if(personName) {
        var recommendations = Model.recommendations(personName);
        console.log('Recommendations for '+personName+':');
        console.log(recommendations);
      } else {
        console.log('Estimated values:');
        console.log(Model.estimated);
      }
      console.log('\n')
    })

  });
});


// Function to transform raw CSV data into Likely input format
function transformCSVToLikey(csvData, callback)
{
  var inputMatrix = new Array();
  var rowLabels = new Array();
  var colLabels = new Array();

  colLabels = csvData[0].splice(1, csvData.length-1);

  // start at 1 to skip the headers
  for(var i=1; i<csvData.length; i++)
  {
    rowLabels.push(csvData[i][0]);
    inputMatrix.push(csvData[i].splice(1, csvData[i].length-1))
  }

  callback(inputMatrix, rowLabels, colLabels);
}
