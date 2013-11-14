(function() {

  $.getJSON('http://localhost:9200/tweets/_count', function( data ) {
    console.log('is CORS supported?', $.support.cors);
    console.log('#tweets: ', data.count);
  });

  var source   = $("#tweet").html();
  var template = Handlebars.compile(source);

  var q = {
    sort:  { created_at: { order: "desc" } },
    fields: ["text", "urls", "created_at"]
  };

  $('#ajaxform').submit(function(event) {
    var results = $('#results');
    results.empty();

    var input = $('#ajaxform input[type="text"]');

    q.from = 0;
    q.size = parseInt($('#ajaxform select').val(), 10);
    q.query = { query_string: { query: input.val() } };

    var query = JSON.stringify(q);
    console.log('elasticsearch query: ', query)

    $.ajax({
      url: "/tweets/_search",
      // url: "http://localhost:9200/tweets/_search", // use CORS
      type: "POST",
      data : query
    }).done(function(data) {
      console.log('#tweets found: ', data.hits.total);
      var html = template(data.hits);
      results.append(html);
    });

    event.preventDefault();
  });

})();
