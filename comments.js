//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var comments = [];
//create web server
http.createServer(function(req, res) {
    //parse the request
    var urlObj = url.parse(req.url, true);
    //get the path name
    var pathName = urlObj.pathname;
    //determine the request method
    if(pathName == '/') {
        //read file
        fs.readFile('./index.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    } else if(pathName == '/submitData') {
        //get the request data
        var str = '';
        req.on('data', function(chunk) {
            str += chunk;
        });
        req.on('end', function() {
            //parse the request data
            var obj = qs.parse(str);
            //add the request data to the comments array
            comments.push(obj);
            //convert the comments array to a string
            var str = JSON.stringify(comments);
            //write the comments to the file
            fs.writeFile('./comments.txt', str, function(err) {
                if(err) {
                    console.error(err);
                }
            });
            //send the response
            res.end('success');
        });
    } else if(pathName == '/getComments') {
        //read the comments from the file
        fs.readFile('./comments.txt', function(err, data) {
            if(err) {
                console.error(err);
            } else {
                //send the comments
                res.end(data);
            }
        });
    } else {
        //read the file
        fs.readFile('.' + pathName, function(err, data) {
            if(err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.end(data);
            }
        });
    }
}).listen(8080);