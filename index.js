var http = require("http");
var config = require("./config.js");
var url = require("url");
var server = http.createServer(function(req,res){
	var parsedUrl = url.parse(req.url,true);
	var path = parsedUrl.pathname;
	var trimmedPath = path.replace(/^\/+|\/+$/g,"");
	var chosenHandler = typeof(router[trimmedPath]) == "undefined" ? handlers.notFoundHandler : router[trimmedPath];
	var message = {
		"Message" : "Hello World"
	};
	chosenHandler(message,function(statusCode,data){
		var finalData = statusCode != 404 ? data : {};
		var last = JSON.stringify(finalData);
		res.setHeader("Content-Type","application/json");
		res.end(last);
	});
});
server.listen(config.port,function(){
	console.log("Server is listening on port" + config.port + " in mode : " + config.envName);
});
var handlers = {};
handlers.notFoundHandler = function(data,callback){
	callback(404);
};
handlers.hello = function(data,callback){
	callback(200,data);
};
var router = {
	"hello" : handlers.hello
};