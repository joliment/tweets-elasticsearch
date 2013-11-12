(function() {

  $.getJSON('http://localhost:9200/tweets/_count', function( data ) {
    console.log('is CORS supported?', $.support.cors);
    console.log('tweets count: ', data.count);
  });

  var q = {
    sort:  { created_at: { order: "desc" } },
    from: 0,
    size: 4
  };
       
  $('#ajaxform').submit(function(event) {
    q.query = { query_string: { query: $('#ajaxform input').val() } }; 
    var query = JSON.stringify(q);
    console.log('elasticsearch query: ', query)

    $.ajax({
      // url: "/tweets/_search",
      url: "http://localhost:9200/tweets/_search",
      type: "POST",
      data : query
    })
      .done(function( data ) {
        console.log('total: ', data.hits.total);
        data.hits.hits.forEach(function(x) {
          console.log(JSON.stringify(x._source));
        });
      })
      .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
      });

    event.preventDefault();
  });

})();
