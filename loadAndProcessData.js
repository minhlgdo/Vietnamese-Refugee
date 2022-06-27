import { feature } from 'topojson';
import { tsv, json, csv } from 'd3';

export const loadAndProcessData = (year) =>
  Promise.all([
    tsv(
      'https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'
    ),
    json(
      'https://unpkg.com/world-atlas@1.1.4/world/50m.json'
    ),
    csv('https://gist.githubusercontent.com/minhlgdo/8682d962cb22c947d2f8a5fe6db52d6a/raw/934d881363e25991ffce29b4e36de3aa8ea691f7/final_data.csv')
  ])
	.then(([tsvData, topoJSONdata, csvData]) => {
    const rowById = tsvData.reduce((accumulator, d) => {
      // copy all the names of the country
      accumulator[d.iso_n3] = d;
      return accumulator;
    }, {});
    
    const dataById = csvData.reduce((accumulator, data) => {
      if (+data["Year"] === year) {
        accumulator[data.id] = data;
      	// accumulator[data["Country of asylum"]] = data;
      	// accumulator[data["Year"]] = data;
      } 
      return accumulator;
    }, {});
    
      /*
    const countryName = {};
    csvData.forEach(d => {
      countryName[d.iso_n3] = d.name;
    });
    */

    const countries = feature(
      topoJSONdata,
      topoJSONdata.objects.countries
    );

    countries.features.forEach((d) => {
      // Assign properties
      Object.assign(d.properties, rowById[d.id]);
      Object.assign(d.properties, dataById[d.id]);
    });
    
    return countries;
  });
