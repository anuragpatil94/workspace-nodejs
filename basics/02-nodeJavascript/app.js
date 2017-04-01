/**
 * Created by Anurag on 3/31/2017.
 */
/**
 * Creating a module
 */
var http = require('http');
var module1=require('./module1');
var module2=require('./module2');
/**
function onRequest(request,response) {
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.write(module1.myString);
    response.write(module2.myVariable);
    module1.myFunction();
    module2.module2Function();
    response.end();
}
//Creating a server with url: localhost:8000/
http.createServer(onRequest).listen(8000);
*/
http.createServer(function (request,response) {
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.write(module1.myString);
    response.write(module2.myVariable);
    module1.myFunction();
    module2.module2Function();
    response.end();
}).listen(8000);