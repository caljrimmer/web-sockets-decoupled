/**
* Socket.io - Web Sockets Decoupled from Application by firing Events.
* Backbone.Event is used (bound to the registry object) to trigger events that the views can pick up with listenTo().
* This is stand alone from the application. The Events emitted could be by any source (tests, different webs ockets library, different protocol).
*/

define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'io'
], function($, _, Backbone, registry, io) {
	
	var sockets = io.connect('/');
	
	sockets.on('connect', function () {
        
		var sockets = io.connect('/');

		sockets.on('types', function (types) {
			registry.events.trigger('types',types);
		});

		sockets.on('tweet', function (tweet) {
			registry.events.trigger('tweet',tweet);
		});

	});

    return sockets;

});
