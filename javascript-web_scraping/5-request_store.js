#!/usr/bin/node

const request = require('request');
const fs = require('fs');

// Check if both arguments are provided
if (process.argv.length !== 4) {
  console.error("Usage: node script.js <URL> <output_file>");
  process.exit(1);
}

const url = process.argv[2];
const filePath = process.argv[3];

// Make the request
request(url, function (error, response, body) {
  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }
  if (response.statusCode !== 200) {
    console.error('Request failed with status code:', response.statusCode);
    process.exit(1);
  }
  // Write the response body to a file
  fs.writeFile(filePath, body, { encoding: 'utf-8' }, function (err) {
    if (err) {
      console.error('Error writing file:', err);
      process.exit(1);
    }
    // No need to print file saved message here
  });
});
