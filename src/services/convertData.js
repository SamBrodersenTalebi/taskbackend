/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
const CSVToJSON = require('csvtojson');
const fs = require('fs');

function convertData(relativePath, name) {
  CSVToJSON()
    .fromFile(relativePath)
    .then((data) => {
      console.log(data);
      const path = `../../data/${name}.json`;
      fs.writeFile(path, JSON.stringify(data, null, 4), (err) => {
        if (err) {
          throw err;
        }
        console.log('JSON array is saved.');
      });
    })
    .catch((err) => {
      // log error if any
      console.log(err);
    });
}

convertData('../../data/contacts.csv', 'contacts');
convertData('../../data/listings.csv', 'listings');
