### DataScience_in_Node.js : Example 2
-----
An example of how to use regression modeling to predict the future.

### Setup
    npm install .

### Usage
    node science.js data.csv

### How it works
This example tries to predict which products a given user might like based on a series of product reviews by a series of users. You can view the input data in the `data.csv` file.

To make the estimate, it uses the recommender system library `likely` which is available via npm.

### NPM Modules Used
1. [likely](https://www.npmjs.com/package/likely)
2. [csv-parse](https://www.npmjs.com/package/csv-parse)
