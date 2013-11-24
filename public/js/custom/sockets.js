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
	
	var Sockets = function(){
		
		var sockets = io.connect('/'),
			stack = [];
			
		var stackCalculate = function(id){
			if(_.size(stack) <= 10){
				stack.push(id)
			}else{
				stack.shift(id)
			}
		}

		sockets.on('connect', function () {

			sockets.on('types', function (types) {
				registry.events.trigger('types',types);
			});

			sockets.on('tweet', function (tweet) {
				//Stops any duplication of data emitted from web socket server
				if(!_.contains(stack,tweet.id)){
					registry.events.trigger('tweet',tweet);
					stackCalculate(tweet.id)
				}
			});
			
			sockets.on('disconnect', function (disconnect) {
				registry.events.trigger('disconnect',disconnect);
			});  

		});
		
	}

    return Sockets;

});
