require.config({
    paths: {
        'jquery' : 'vendor/jquery-1.10.1.min',
        'underscore' : 'vendor/underscore',
        'backbone' : 'vendor/backbone',
		'text' : 'vendor/text',
		'io' : '/socket.io/socket.io'
    },
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}  
	 } 
});
	
require([
  'app',
  'sockets'
], function(app,Sockets){
	window.app = app;
	window.app.sockets = new Sockets;
	Backbone.history.start();
}); 
