#! /usr/bin/env node
/* jshint esnext:true */

const LineInputStream = require('line-input-stream'),
    fs = require('fs'),
    argv = require('yargs')
        .usage('bqjson2ndgeojson --geofield=geography_field [filename.json]\n\nConverts newline-delimited BigQuery JSON file to newline-delimited GeoJSON.')
        .argv;

if (!argv.geofield) {
  console.log('Need to speficy BigQuery geography field: --geofield=<field-name>.')
  process.exit(1);
}

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

const stream = LineInputStream(source)
    .setEncoding("utf8")
    .on("error", console.error)
    .on("line", function(line) {
        let obj = JSON.parse(line);
        let geom = obj[geofield];
        delete obj[geofield];
        let geojson = {"type": "Feature", "properties": obj};
        if (geom) { geojson.geography = JSON.parse(geom); }
        console.log(JSON.stringify(geojson));
    }).on("end", function() {

    });

