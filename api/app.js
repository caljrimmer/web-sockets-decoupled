//Required Modules
var express = require('express');
var app = express();
var tweet = require('./controllers/tweet.js');
var events = require("events");
var http = require('http');
eventEmitter = new events.EventEmitter();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/../public/');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session(
	{ secret: 'SpecialObsfication', 
	  cookie: {maxAge: 60000 * 60 * 24 * 30} //30 Days
	}
  ));
  app.use(app.router); 
  app.use(express.static(__dirname + '/../public'));
});

app.configure('test', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
  res.render('index', {});
}); 

console.log(__dirname + '/../public')

var server = http.createServer(app).listen(5000, function(){
  console.log('Express server listening on port 5000');
});

var io = require('socket.io').listen(server);

//Kick off Tweet Stream
tweet.stream();
               
//Kick off Socket.io
io.sockets.on('connection', function (socket) {
	
	socket.emit('types',tweet.types);
	 
	eventEmitter.on('tweet', function(tweet){
		socket.emit('tweet', tweet);
	});  
	
	socket.on('disconnect', function () {
		socket.emit('disconnected');
	});
	
}); 
