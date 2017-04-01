/**
 * Created by aspan on 3/31/2017.
 */
/**
 * Routing to different html pages
 */
var app=require('./app');
var http = require('http');

//Creating a server with url: localhost:8000/
http.createServer(app.handleRequest).listen(8000);