/**
 * Created by aspan on 3/31/2017.
 */
/**
 * Accessing a html file
 */
var http = require('http');
var fs=require('fs'); //file system
function onRequest(request,response) {
    //response.writeHead(200,{'Content-Type':'text/plain'});
    response.writeHead(200,{'Content-Type':'text/html'});
    // the callback function will run once nodejs finishes reading the file
    fs.readFile('./index.html',null,function (error,data) {
        if (error){
            response.writeHead(404);
            response.writeHead('file not found')
        }else {
            response.write(data);
        }
        response.end();
    });
}
//Creating a server with url: localhost:8000/
http.createServer(onRequest).listen(8000);