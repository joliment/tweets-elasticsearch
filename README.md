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
sudo /usr/share/elasticsearch/bin/plugin -install wbzyl/tweets-elasticsearch
```

After install the application will be available at
[http://localhost:9200/_plugin/tweets-elasticsearch/](http://localhost:9200/_plugin/tweets-elasticsearch/)

This application works with Elasticsearch version 0.90.6.


### Importing tweets into Elasticsearch

WIP


### Searching on a command line and in a browser console

* [Lucene Query Syntax](http://www.lucenetutorial.com/lucene-query-syntax.html)

Terminal:

```js
curl -v -X POST localhost:9200/tweets/_search -d '
{
  "query": { "query_string": {"query": "elasticsearch"} },
  "sort": { "created_at": { "order": "desc" } },
  "fields": ["text", "urls", "created_at"],
  "from": 0,
  "size": 2
}'
```
Running the above command returns:

```json
{
  "hits": {
    "hits": [
      {
        "sort": [
          1384452721000
        ],
        "fields": {
          "text": "es 0.3.14 https://t.co/gwvrHwP4Z6 Elasticsearch RESTful API.",
          "urls": [
            "https://npmjs.org/package/es"
          ],
          "created_at": "2013-11-14 18:12:01 +0000"
        },
        "_score": null,
        "_id": "401049899925397505",
        "_type": "elasticsearch",
        "_index": "tweets"
      },
      {
        "sort": [
          1384452703000
        ],
        "fields": {
          "text": "Posted my slides from Tuesday's http://t.co/a52zujW5Z1",
          "urls": [
            "http://ow.ly/qPgl6"
          ],
          "created_at": "2013-11-14 18:11:43 +0000"
        },
        "_score": null,
        "_id": "401049820548567040",
        "_type": "elasticsearch",
        "_index": "tweets"
      }
    ],
    "max_score": null,
    "total": 2
  },
  "_shards": {
    "failed": 0,
    "successful": 1,
    "total": 1
  },
  "timed_out": false,
  "took": 2
}
```

The same thing, but on the browser console
(it has to be a POST request?):

```js
q = {
  query: { query_string: { query: "elasticsearch" } },
  sort:  { created_at: { order: "desc" } },
  fields: ["text", "urls", "created_at"],
  from: 0,
  size: 2
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

    <script id="facet" type="text/x-handlebars-template">
      <h5>Top hashtags</h5>
      <p>#elasticsearch: 128</p>
      <p>#mongodb: 64</p>
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
