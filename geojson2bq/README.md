This script converts GeoJson or new-line-delimited GeoJson files
to BigQuery new-line-delimited Json format.

Author: Michael Entin.

Origin: https://github.com/mentin/geoscripts

## Usage:

1. Install node.js.

2. Add packages:

   `npm install`

3. To convert GeoJson file to BigQuery new-line-delimited JSON:

   `npm run geojson2bqjson [--geofield=geography_field] [filename.json]`

4. To convert new-line-delimited GeoJSON to BigQuery new-line-delimited JSON:

   `npm run ndgeojson2bqjson [--geofield=geography_field] [filename.json]`

   Where
   * `geography_field` is optional name for geography field (defaults to `geography`)
   * `[filename.json]` is optional input file, if not provided the stdin will be processed.

5. Upload to BigQuery.

* Either create schema in BigQuery that matches the produced JSON file; using
  `GEOGRAPHY` type for field specified as 'geofield'.
* Or upload to a temporary table using auto-detection, then convert to actual
  table using `ST_GeogFromGeoJson` function (auto-detection does not detect
  Geography type yet, the column will be uploaded as `STRING`).

## Examples:

Convert geojson file:

`npm run geojson2bqjson --geofield=geog sample.geojson >./bqjson.json`

Convert ndgeojson file:

`npm ndgeojson2bqjson --geofield=geog sample.ndgeojson >./bqjson.json`

Schema for the produced files:
```
prop0 STRING  NULLABLE
prop1 NUMERIC NULLABLE
geog  GEOGRAPHY NULLABLE
```

Upload command:

`bq load --source_format=NEWLINE_DELIMITED_JSON dataset.table ./bqjson.json`
