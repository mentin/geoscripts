#! /usr/bin/env node
// Copyright 2019 Google LLC.
// SPDX-License-Identifier: Apache-2.0

const LineInputStream = require('line-input-stream'),
    fs = require('fs'),
    argv = require('yargs')
        .usage('geojson2bqjson.js [--geofield=geography_field] [filename.json]\n\n' +
               'Converts GeoJson file to BigQuery newline-delimited JSON.')
        .argv;

let geofield = argv.geofield ? argv.geofield : "geography";
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

const stream = LineInputStream(source)
    .setEncoding("utf8")
    .on("error", console.error)
    .on("line", function(line) {
        let data = JSON.parse(line);
        if (!data.type || data.type.toLowerCase() != "feature") {
            console.error("Unexpected type " + data.type);
            process.exit(2);
        }
        let obj = data.properties ? data.properties : {};
        obj[geofield] = data.geometry ? JSON.stringify(data.geometry) : null;
        console.log(JSON.stringify(obj));
    });

