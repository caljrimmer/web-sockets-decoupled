define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'sockets',
], function($, _, Backbone, registry){
	
    var AppView = Backbone.View.extend({
		
		initialize : function(){
			this.listenTo(registry.events,"types", this.handlerType);
			this.listenTo(registry.events,"tweet", this.handlerTweet);
		},
		
		handlerType : function(data){
			console.log(data)
		},
		
		handlerTweet : function(data){
			console.log(data) 
		}
		  
	});
	
	return AppView

});



