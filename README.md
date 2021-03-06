## Warning – WIP


**TL;DW:**

* [Elasticsearch v1.0.0](http://www.elasticsearch.org/blog/1-0-0-beta1-released/) with a new distributedd percolation
* [elasticsearch-ruby](https://github.com/elasticsearch/elasticsearch-ruby) gem with Elasticsearch v1.0.0 support


**TODO:**

* use [Flexboxes](http://wbzyl.inf.ug.edu.pl/hcj/css-flexbox)
  in the `<div id="results"></div>` container
  (instead floating time elements)
* add pagination
* add highlighting to search results
* use [EJS](http://embeddedjs.com/) (Embedded Javascript)
  templates for the `<div id="results"></div>` container


**TODO Apps:**

* prepare an example app with [Ember.js](http://discuss.emberjs.com/)
  and [ember-data kit for both pushing and querying objects to Elasticsearch cluster](https://github.com/roundscope/ember-data-elasticsearch-kit)

----

## tweets-elasticsearch – Elasticsearch site plugin

This is a small, self-contained HTML applications for Elasticsearch:

```
.
|-- index.html
|-- css
|   |-- normalize.css
|   `-- main.css
|-- images
|   `-- external_link.png
|-- js
    |-- main.js
    `-- vendor
        |-- handlebars-v1.1.2.js
        `-- jquery-1.10.2.min.js
```

Install this plugin with this command:

```sh
sudo /usr/share/elasticsearch/bin/plugin --remove        tweets-elasticsearch
sudo /usr/share/elasticsearch/bin/plugin --install wbzyl/tweets-elasticsearch
```

After install the application will be available at
[http://localhost:9200/_plugin/tweets-elasticsearch/](http://localhost:9200/_plugin/tweets-elasticsearch/)

This application works with Elasticsearch version 0.90.6.


### Importing tweets into Elasticsearch

WIP


### Searching on command line and in browser console

* [Lucene Query Syntax](http://www.lucenetutorial.com/lucene-query-syntax.html)

Terminal:

```js
curl -v -X POST localhost:9200/tweets/_search -d '
{
  "query": { "query_string": {"query": "elasticsearch"} },
  "sort": { "created_at": { "order": "desc" } },
  "fields": ["text", "urls", "created_at"],
  "from": 0,
  "size": 1,
  "facets": {
    "hashtags": {
      "terms":  { "field": "hashtags" },
      "global": true
    }
  }
}'
```

Running the above command returns:

```json
{
  "facets": {
    "hashtags": {
      "terms": [
        { "count": 13, "term": "dbts2013" },
        { "count":  7, "term": "mongodb" },
        { "count":  6, "term": "nosql" },
        { "count":  6, "term": "couchdb" },
        { "count":  6, "term": "cassandra" },
        { "count":  5, "term": "d3js" },
        { "count":  4, "term": "riak" },
        { "count":  4, "term": "redis" },
        { "count":  4, "term": "rails" },
        { "count":  4, "term": "jobs" }
      ],
      "other": 90,
      "total": 149,
      "missing": 124,
      "_type": "terms"
    }
  },
  "hits": {
    "hits": [
      {
        "sort": [ 1384501672000 ],
        "fields": {
          "urls": [],
          "text": "@epohl PROBLEM - logs - WARNING - elasticsearch: 878",
          "created_at": "2013-11-15 08:47:52 +0100"
        },
        "_score": null,
        "_id": "401255214327824384",
        "_type": "elasticsearch",
        "_index": "tweets"
      }
    ],
    "max_score": null,
    "total": 10
  },
  "_shards": {
    "failed": 0, "successful": 1, "total": 1
  },
  "timed_out": false, "took": 2
}
```

The above query changed as to be run on the browser console:

```js
q = {
  query: { query_string: { query: "elasticsearch" } },
  sort:  { created_at: { order: "desc" } },
  fields: ["text", "urls", "created_at"],
  from: 0,
  size: 2,
  facets: {
    hashtags: {
      terms:  { field: "hashtags" },
      global: true
    }
  }
}
$.ajax({
  // url: "tweets/_search",
  url: "http://localhost:9200/tweets/_search", // use CORS
  type: "POST",
  data : JSON.stringify(q)
}).done(function(data) {
  console.log(data);
});
```

### Index View

In the view we use the [Handlebars.js](http://handlebarsjs.com/) templates.

The view contains a form element and containers for tweets and for hashtags facets.

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

    <!-- http://www.lucenetutorial.com/lucene-query-syntax.html -->
    <form name="ajaxform" id="ajaxform" action="" method="POST">Search Tweets:
      <input type="text" name="search" value ="">
      <input type="submit" value="Submit">
    </form>

    <div id="hashtags"></div>
    <div id="results"></div>

    <!-- js/main.js: template(data.hits) -->
    <script id="tweet" type="text/x-handlebars-template">
      {{#each hits}}
      <div class="tweet">
        <p>{{fields.text}}</p>
        <div class="info">
          {{#each fields.urls}}
            <a href="{{this}}"><img src="images/external_link.png" alt="[external link]"></a>
          {{/each}}
          <time>{{fields.created_at}}</time>
        </div>
      </div>
      {{/each}}
    </script>

    <!-- js/main.js: template(data.facets.hashtags) -->
    <script id="facet" type="text/x-handlebars-template">
      <h4>#hashtags: {{total}}</h4>
      {{#each terms}}
      <p>#{{term}}: {{count}}</p>
      {{/each}}
    </script>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script>window.jQuery ||
       document.write('<script src="js/vendor/jquery-1.10.2.min.js"><\/script>')</script>
    <script src="js/vendor/handlebars-v1.1.2.js"></script>
    <script src="js/main.js"></script>

  </body>
</html>
```

Useful link:

* JavaScript [Date.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)
