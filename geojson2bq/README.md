Usage:

1. Install node.js.

2. Add packages:
   `npm install fs`
   `npm install JSONStream`
   `npm install yargs`

3. Convert GeoJson file to BigQuery new-line-delimited JSON using

   `node geojson2bqjson.js [--geofield=geography_field] [filename.json]`

Where
* `geography_field` is optional name for geography field (defaults to `geography`)
* `[filename.json]` is optional input file, if not provided the stdin will be processed.

E.g.
`node geojson2bqjson.js --geofield=geog sample.geojson`
