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

* [Lucene Query Syntax](http://www.lucenetutorial.com/lucene-query-syntax.html)

CLI:

```js
curl -v -X POST localhost:9200/tweets/_search -d '
{
  "query": { "query_string": {"query": "elasticsearch"} },
  "sort": { "created_at": { "order": "desc" } },
  "fields": ["text", "urls", "created_at"],
  "from": 0,
  "size": 1
}'
```
The above command returns:

```json
{
  "hits": {
    "hits": [
      {
        "sort": [
          "59"
        ],
        "fields": {
          "urls": [
            "http://www.elasticsearch.org/blog/0-90-7-released/"
          ],
          "text": "RT @elasticsearch: Elasticsearch 0.90.7 released http://t.co/A6RJhM5q6B",
          "created_at": "2013-11-13 16:19:59 +0100"
        },
        "_score": null,
        "_id": "400644217279889409",
        "_type": "elasticsearch",
        "_index": "tweets"
      }
    ],
    "max_score": null,
    "total": 146
  },
  "_shards": {
    "failed": 0,
    "successful": 1,
    "total": 1
  },
  "timed_out": false,
  "took": 1
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
  size: 1
}
$.ajax({
  url: "http://localhost:9200/tweets/_search", // use CORS
  type: "POST",
  data : JSON.stringify(q)
}).done(function(data) {
  console.log(data);
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

HTML5 [time element](http://www.brucelawson.co.uk/2012/best-of-time/):

```html
<time>2011-11-12T14:54:39Z</time>
<time itemprop="datePublished" datetime="2009-08-30">2011-11-12T14:54:39Z</time>
```

Useful links:

* [Simple example of using HTML form elements](http://www.fincher.org/tips/web/SimpleForm.shtml)
* [Date.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)
* [html time element](http://www.w3.org/html/wg/drafts/html/master/text-level-semantics.html#the-time-element) —
  HTML5 draft
* [array predefined core objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Predefined_Core_Objects)
