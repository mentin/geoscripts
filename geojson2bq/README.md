Usage:

1. Install node.js.

2. Add packages:
   `npm install fs JSONStream yargs`

3. Convert GeoJson file to BigQuery new-line-delimited JSON using

   `node geojson2bqjson.js [--geofield=geography_field] [filename.json]`

Where
* `geography_field` is optional name for geography field (defaults to `geography`)
* `[filename.json]` is optional input file, if not provided the stdin will be processed.

4. Create schema in BigQuery that matches the produced JSON file,
   use GEOGRAPHY type for field specified as 'geofield'.
   E.g. for sample.geojson schema could be
    ```
    prop0 STRING  NULLABLE
    prop1 NUMERIC NULLABLE
    geog  GEOGRAPHY NULLABLE
    ```
   Upload the file to BigQuery.

E.g.
`node geojson2bqjson.js --geofield=geog sample.geojson`
