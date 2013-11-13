## Warning – WIP

**TL;TW:**

* [Elasticsearch v1.0.0](http://www.elasticsearch.org/blog/1-0-0-beta1-released/) with a new distributedd percolation
* [elasticsearch-ruby](https://github.com/elasticsearch/elasticsearch-ruby) gem with Elasticsearch v1.0.0 support

**TODO:**

* update „ElasticSearch & Ruby” notes
* ...
* use [Handlebars.js](http://handlebarsjs.com/) or
  [EJS](http://embeddedjs.com/) (Embedded Javascript)
  templates for the `<div id="results"></div>` container
* add pagination
* add highlighting to search results

**TODO Apps:**

* prepare an example app with [Ember.js](http://discuss.emberjs.com/)
  and [ember-data kit for both pushing and querying objects to Elasticsearch cluster](https://github.com/roundscope/ember-data-elasticsearch-kit)

----

## tweets-elasticsearch – Elasticsearch site plugin

This is a small, self-contained HTML applications for Elasticsearch:

```
.
|-- css
|   |-- main.css
|   `-- normalize.css
|-- index.html
|-- js
|   |-- main-00.js
|   `-- main.js
`-- README.md
```

Install this plugin with this command:

```sh
sudo /usr/share/elasticsearch/bin/plugin -install wbzyl/tweets-elasticsearch
```

After install the application will be available at
[http://localhost:9200/_plugin/tweets-elasticsearch/index.html](http://localhost:9200/_plugin/tweets-elasticsearch/index.html)

This application works with Elasticsearch version 0.90.6.


### Importing tweets into Elasticsearch

WIP


### Searching on a command line and in a browser console

CLI:

```js
curl -v -X POST localhost:9200/tweets/_search -d '
{
  "query": { "query_string": {"query": "redis"} },
  "sort": { "created_at": { "order": "desc" } },
  "from": 0,
  "size": 1
}'
```

Console (it has to be a POST request):

```js
q = {
  query: { query_string: { query: "redis" } },
  sort:  { created_at: { order: "desc" } },
  from: 0,
  size: 2
}
$.ajax({
    // url: "/tweets/_search",
    url: "http://localhost:9200/tweets/_search", // use CORS
    type: "POST",
    data : JSON.stringify(q)
  })
  .done(function(data) {
    console.log(data);
  })
  .fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
  });
```

### Initial view

The initial view contains a form element and containers
for tweets and for error messages.

```html
<!doctype html>
<html lang="pl" class="no-js">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>elastic tweets</title>

    <meta name="description" content="elasticsearch site plugin">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">
  </head>
  <body>

    <form name="ajaxform" id="ajaxform" action="" method="POST">Search Tweets:
      <input type="text" name="search" value ="">
      <input type="submit" value="Submit">
      <select name="tweets">
        <option value="16">16 tweets</option>
        <option value="32">32 tweets</option>
        <option value="64" selected>64 tweets</option>
        <option value="128">128 tweets</option>
        <option value="256">256 tweets</option>
      </select>
    </form>

    <div id="results"></div>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.2.min.js"><\/script>')</script>
    <script src="js/main.js"></script>

  </body>
</html>

```

Useful links:

* [Simple example of using HTML form elements](http://www.fincher.org/tips/web/SimpleForm.shtml)
* [Date.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)
