(function() {

  $.getJSON('http://localhost:9200/tweets/_count', function( data ) {
    console.log('is CORS supported?', $.support.cors);
    console.log('#tweets: ', data.count);
  });

  var tweet_template = Handlebars.compile($("#tweet").html());
  var facet_template = Handlebars.compile($("#facet").html());

  var q = {
    "sort":  { "created_at": { "order": "desc" } },
    "fields": ["text", "urls", "created_at"],
    "facets": {
      "hashtags": {
        "terms":  { "field": "hashtags" }, "global": true
      }
    }
  };

  $('#ajaxform').submit(function(event) {
    var input = $('#ajaxform input[type="text"]');

    q["from"] = 0;
    q["size"] = parseInt($('#ajaxform select').val(), 10);
    q["query"] = { "query_string": { "query": input.val() } };

    var query = JSON.stringify(q);
    console.log('elasticsearch query: ', query)

    $.ajax({
      // url: "/tweets/_search",
      url: "http://localhost:9200/tweets/_search", // use CORS
      // url: "http://192.168.0.103:9200/tweets/_search",
      type: "POST",
      data : query
    }).done(function(data) {
      console.log('#tweets found: ', data.hits.total);
      console.log('#tweets facets: ', data.facets.hashtags);

      $('#results').html(tweet_template(data.hits));
      $('#hashtags').html(facet_template(data.facets.hashtags));
    });

    event.preventDefault();
  });

}());
