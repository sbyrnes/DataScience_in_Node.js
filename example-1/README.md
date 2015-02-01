### DataScience_in_Node.js : Example 1
-----
An example of how to use regression modeling to predict the future.

### Setup
    npm install .

### Usage
    node science.js data.csv

### How it works
This example tries to estimate how many users a mobile application will have in the future based on the daily user totals for each day of a given year. You can view the input data in the `data.csv` file.

To make the estimate, it uses the linear regression library `lyric-node` which is available via npm. The user can select the order of the polynomial they wish to use for the regression, with a default of 2.

### NPM Modules Used
1. [lyric-node](https://www.npmjs.com/package/lyric-node)
2. [csv-parse](https://www.npmjs.com/package/csv-parse)
