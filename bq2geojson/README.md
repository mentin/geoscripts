Usage:

1. Extract BigQuery data using new-line-delimited JSON.
2. Convert to new-line-delimited GeoJSON using

`bqjson2ndgeojson --geofield=geography_field [filename.json]`

Where
* `geography_field` is the name of top-level (not nested) geography field in BigQuery result.
* `[filename.json]` is optional input file, if missing the stdin will be processed.

E.g.
`./bqjson2ndgeojson.js --geofield=location sample.bqjson`