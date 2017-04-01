/**
 * Created by Anurag on 3/31/2017.
 * First Application
 * Creating a custom server
 */
var http = require('http');

function onRequest(request,response) {
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.write('Hello World');
    response.end();
}

http.createServer(onRequest).listen(8000);