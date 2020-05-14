#! /usr/bin/env node
// Copyright 2019 Google LLC.
// SPDX-License-Identifier: Apache-2.0

const JSONStream = require('JSONStream'),
    argv = require('yargs')
        .usage('geojson2bqjson.js [--geofield=geography_field] [filename.json]\n\n' +
               'Converts GeoJson file to BigQuery newline-delimited JSON.')
        .argv;

let geofield = argv.geofield ? argv.geofield : "geography";
let filename = argv._[0];

let source;
if (filename) {
    source = require('fs').createReadStream(filename).on('error', ()=>{
        console.error("Couldn't open file.");
        process.exit(1);
    });
} else {
    source = process.stdin;
}

source.pipe(JSONStream.parse('features.*'))
.on('data', data => {
    if (!data.type || data.type.toLowerCase() != "feature") {
        console.error("Unexpected type " + data.type);
        process.exit(2);
    }
    let obj = data.properties ? data.properties : {};
    obj[geofield] = data.geometry ? JSON.stringify(data.geometry) : null;
    console.log(JSON.stringify(obj));
})
.on('error', e => {
    console.error(e);
    reject(e);
})
