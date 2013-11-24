require.config({
    paths: {
        'jquery' : 'vendor/jquery-2.0.3.min',
        'underscore' : 'vendor/underscore',
        'backbone' : 'vendor/backbone-1.1.0.min',
		'text' : 'vendor/text',
		'd3' : 'vendor/d3',
		'io' : '/socket.io/socket.io',
		'charts' : 'custom/charts',
		'registry' : 'custom/registry',
		'sockets' : 'custom/sockets'
    },
	shim: {
		d3: {
			exports: 'd3'
		},
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
