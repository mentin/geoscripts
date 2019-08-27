This script converts BigQuery new-line-delimited Json files
to GeoJson or new-line-delimited GeoJson format.

Author: Michael Entin.
Origin: https://github.com/mentin/geoscripts

## Usage:

1. Install node.js.

2. Add packages used by this script:

   `npm install fs line-input-stream yargs`

3. Extract BigQuery data to new-line-delimited JSON, format geography fields as GeoJSON:

   `SELECT * EXCEPT (geography_field), ST_AsGeoJson(geography_field) AS geography_field FROM ...`

4. Convert to new-line-delimited GeoJSON using

   `node bqjson2ndgeojson.js --geofield=geography_field [filename.json]`

5. Convert to regular GeoJSON using

   `node bqjson2ndgeojson.js --geofield=geography_field --rfc=7946 [filename.json]`

Where
* `geography_field` is the name of top-level (not nested) geography field in BigQuery result.
* `[filename.json]` is optional input file, if not provided the stdin will be processed.

Output is written to standard output.

## Example

`node bqjson2ndgeojson.js --geofield=location sample.bqjson >out.ndgeojson`

