/**
 * Created by aspan on 3/31/2017.
 */
var url=require('url');
var fs=require('fs');
function renderHTML(path,response) {
    // the callback function will run once nodejs finishes reading the file
    fs.readFile(path,null,function (error,data) {
        if (error){
            response.writeHead(404);
            response.writeHead('file not found')
        }else {
            response.write(data);
        }
        response.end();
    });
}
module.exports={
  handleRequest:function (request,response) {
      response.writeHead(200,{'Content-Type':'text/html'})
      var path=url.parse(request.url).pathname;

      switch (path){
          case '/':
              renderHTML('./index.html',response);
              break;
          case '/login':
              renderHTML('./login.html',response);
              break;
          default:
              response.writeHead(404);
              response.write('Route not defined');
              response.end();
      }
  }
};















