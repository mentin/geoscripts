Usage:

1. Install node.js.

2. Add packages:

   `npm install fs JSONStream line-input-stream yargs`

3. To convert GeoJson file to BigQuery new-line-delimited JSON:

   `node geojson2bqjson.js [--geofield=geography_field] [filename.json]`

4. To convert new-line-delimited GeoJSON to BigQuery new-line-delimited JSON:

   `node ndgeojson2bqjson.js [--geofield=geography_field] [filename.json]`

Where
* `geography_field` is optional name for geography field (defaults to `geography`)
* `[filename.json]` is optional input file, if not provided the stdin will be processed.

4. Create schema in BigQuery that matches the produced JSON file,
   use GEOGRAPHY type for field specified as 'geofield'.
   Upload the file to created BigQuery table.

Examples:

Convert geojson file:

`node geojson2bqjson.js --geofield=geog sample.geojson`

Convert ndgeojson file:

`node ndgeojson2bqjson.js --geofield=geog sample.ndgeojson`

Schema for the produced files:
```
prop0 STRING  NULLABLE
prop1 NUMERIC NULLABLE
geog  GEOGRAPHY NULLABLE
```

