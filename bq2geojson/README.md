Usage:

1. Install node.js.

2. Extract BigQuery data using new-line-delimited JSON, geography fields as GeoJSON:

   `SELECT * EXCEPT (geography_field), ST_AsGeoJson(geography_field) AS geography_field FROM ...`
3. Convert to new-line-delimited GeoJSON using

   `bqjson2ndgeojson --geofield=geography_field [filename.json]`   
4. Convert to regular GeoJSON using

   `node bqjson2ndgeojson.js --geofield=geography_field --rfc=7946 [filename.json]`

Where
* `geography_field` is the name of top-level (not nested) geography field in BigQuery result.
* `[filename.json]` is optional input file, if not provided the stdin will be processed.

E.g.
`node bqjson2ndgeojson.js --geofield=location sample.bqjson`
