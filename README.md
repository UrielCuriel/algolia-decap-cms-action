# Algolia Decap CMS Auto Indexer Action

This action will index your Decap CMS or any other static site what use markdown files with YAML front matter to Algolia.

## Inputs

### `algolia_app_id`

**Required** Algolia Application ID.

### `algolia_admin_api_key`

**Required** Algolia Admin API Key.

### `algolia_index_name`

**Required** Algolia Index Name.

### `algolia_collection_path`

**Required** Path to the content folder.

## Outputs

### `records`

all records indexed.

## Example usage

```yaml
uses: urielcuriel/algolia-decap-cms-action@v1
with:
  algolia_app_id: ${{ secrets.ALGOLIA_APP_ID }}
  algolia_admin_api_key: ${{ secrets.ALGOLIA_ADMIN_API_KEY }}
  algolia_index_name: 'my_index'
  algolia_collection_path: 'content'
```

if you want call this action only when you push to the content folder you can use this:

```yaml
name: Algolia Indexer

on:
  push:
    paths:
      - 'content/**'

jobs:
  algolia-indexer:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: urielcuriel/algolia-decap-cms-action@v1
        with:
          algolia_app_id: ${{ secrets.ALGOLIA_APP_ID }}
          algolia_admin_api_key: ${{ secrets.ALGOLIA_ADMIN_API_KEY }}
          algolia_index_name: 'my_index'
          algolia_collection_path: 'content'
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)




