### HTMX extension for rendering (preprocessed) JSX templates from JSON responses

## Use

First you need your JSX components transpiled and bundled at `dist/templates.js`. Check out my example repo on how to get it done [here](https://github.com/numasi/htmx-jsx-json-example/)

Using it by side with [htmx-json-attribute](htps://github.com/numasi/htmx-json-attribute), one can do this:


```
<meta name='htmx-config' content='{"selfRequestsOnly":false}'>
<script src='https://unpkg.com/htmx.org@2.0.4'></script>
<script src='json-attribute.js'></script>
<script src='jsx-template.js'></script>
<div
  hx-post='https://api.hive.blog'
  hx-trigger='load'
  hx-swap='outerHTML'
  hx-target='div'
  hx-ext='json-attr, jsx-template'
  hx-json='{
    "jsonrpc": "2.0",
    "method": "condenser_api.get_blog_entries",
    "params": ["numasi", 0, 10],
    "id": 1
  }'
  hx-template='BlogEntries'
></div>
```

## How it works

It depends on JSX components transpiled using kita-js HTML string generation funcition instead of React's classic createElement. The extension looks for this at a file `dist/template.js`, importing all the components from there upon initaliazation, and find them upon a response by matching component function names to `hx-template` attributes defined by the extension, passing the parsed JSON responses as parameters along the way.

## TODO

- Option to change template directory
- More build options (using ESBuild for auto-aggregation)
- Experimenting with on-the-fly (client-side) transpile
- Dynamic template imports (on need)
- Error handling
- Tests
