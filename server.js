var http = require('http'), 
    fs = require('fs'), 
    port = 8080;

var listingData, server;

var requestHandler = function(request, response) {
  if (request.method === 'GET' && request.url === '/listings') {
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(listingData));
  } else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Bad gateway error.');
  }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  if (err) {
    console.log("Error reading file:", err);
    throw err;
  }
  listingData = JSON.parse(data);
  server = http.createServer(requestHandler);
  var runner = function() {
    console.log('Server is listening on port', port);
  }
  server.listen(port, runner);
});
