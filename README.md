## Warning: WIP

TODO:

* create *index.html*
* update notes in „ElasticSearch & Ruby”
* add pagination to *index.html*

----

## tweets-elasticsearch – Elasticsearch site plugin

This is a small, self-contained HTML applications for Elasticsearch:

```
|-- css
|   |-- main.css
|   `-- normalize.css
|-- index.html
`-- README.md
```

Install this plugin with this command:

```sh
sudo /usr/share/elasticsearch/bin/plugin -install wbzyl/hello-tweets
```

After install the application will be available at
[http://localhost:9200/_plugin/tweets-elasticsearch/index.html](http://localhost:9200/_plugin/tweets-elasticsearch/index.html)

This application works with Elasticsearch version 0.90.6.


### Importing tweets into Elasticsearch

WIP:

* [Elasticsearch & Ruby](http://wbzyl.inf.ug.edu.pl/nosql/elasticsearch-ruby)


### Searching on a command line and a browser console

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
    url: "/tweets/_search",
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
<!-- form -->
```
