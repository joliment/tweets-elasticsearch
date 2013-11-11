## hello-tweets – Elasticsearch site plugin

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
curl -s -X GET localhost:9200/tweets/_search -d '
{
  "from": 0,
  "size": 2,
  "query": {
    "query_string": {"query": "+text:elasticsearch -text:mongodb"}
  },
  "sort": {
    "created_at": { "order": "desc" }
  }
}' | jq .

```

Console:

```js
$.getJSON( "/tweets/_search", { query: { query_string: { query: "redis"} } } )
  .done(function(data) {
    console.log(data);
  })
  .fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
  });
```


### Initial view

The initial view contains a form element and a container
for tweets.

```html

```
