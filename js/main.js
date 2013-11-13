(function() {

  $.getJSON('http://localhost:9200/tweets/_count', function( data ) {
    console.log('is CORS supported?', $.support.cors);
    console.log('tweets count: ', data.count);
  });


  var source   = $("#tweet").html();
  var template = Handlebars.compile(source);

  var context = {title: "My New Post", body: "This is my first post!"}
  var html    = template(context);

  // console.log(html);
  $('#results').append(html);

  $('#ajaxform').submit(function(event) {
    var results = $('#results');
    results.empty();

    var q = {
      sort:  { created_at: { order: "desc" } },
      from: 0,
      size: parseInt($('#ajaxform select').val(), 10)
    };

    var input = $('#ajaxform input[type="text"]');
    q.query = { query_string: { query: input.val() } };
    // input.val('');

    var query = JSON.stringify(q);
    // console.log('elasticsearch query: ', query)

    results.empty();

    $.ajax({
      url: "http://localhost:9200/tweets/_search", // use CORS
      type: "POST",
      data : query
    })
      .done(function( data ) {
        console.log('total: ', data.hits.total);
        data.hits.hits.forEach(function(x) {
          // console.log(JSON.stringify(x));
          var source = x._source;

          var text = '<p>' + source.text + '</p>';
          var datetime = source.created_at;
          var urls = source.urls;

          var links = " ";
          if (urls.length > 0) {
            links = urls.reduce(function(acc, curr, i){
              return acc + "<a href='" + curr + "'>[" + (i+1) + "]</a>";
            }, "");
            // console.log("#urls: ", urls.length);
          }
          // console.log("links: ", links);
          var time = '<time>' + datetime + '</time>';
          var info = "<div class='info'>" + links + time + "</div>";

          results.append('<div class="tweet">' + text + info + '</div>');
        });

      })
      .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
      });

    event.preventDefault();
  });

})();
