#! /usr/bin/env node
// Copyright 2019 Google LLC.
// SPDX-License-Identifier: Apache-2.0

const LineInputStream = require('line-input-stream'),
    fs = require('fs'),
    argv = require('yargs')
        .usage('bqjson2ndgeojson --geofield=geography_field [--rfc=7946] [filename.json]\n\n' +
               'Converts newline-delimited BigQuery JSON file to newline-delimited GeoJSON or GeoJSON.')
        .argv;

if (!argv.geofield) {
  console.log('Need to speficy BigQuery geography field: --geofield=<field-name>.')
  process.exit(1);
}

let nond = argv.rfc == '7946';
let geofield = argv.geofield;
let filename = argv._[0];
let source;

if (filename) {
    source = fs.createReadStream(filename).on('error', ()=>{
        console.error("Couldn't open file.");
        process.exit(1);
    });
} else {
    source = process.stdin;
}

let prev;
const stream = LineInputStream(source)
    .setEncoding("utf8")
    .on("error", console.error)
    .on("line", function(line) {
        let obj = JSON.parse(line);
        let geom = obj[geofield] ? JSON.parse(obj[geofield]) : null;
        delete obj[geofield];
        let geojson = {"type": "Feature", "properties": obj, "geometry": geom};

        if (nond && prev) { console.log('     ,'); }
        console.log((nond ? '    ' : ''), JSON.stringify(geojson));
        prev = true;
    }).on("end", function() {
        if (nond) {
            console.log('  ]\n}');
        }
    });

if (nond && stream.readable) {
    console.log('{\n  "type": "FeatureCollection",\n  "features": [');
}
