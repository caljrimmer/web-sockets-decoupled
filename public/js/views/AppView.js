define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'collections/Tweets',
  'views/Table/TableView',
], function($, _, Backbone, registry, Tweets, TableView){
	
    var AppView = Backbone.View.extend({
	
		el : $('canvas'),
		
		initialize : function(){
			this.listenToOnce(registry.events,"types", this.render);
			this.listenToOnce(registry.events,"disconnect", this.renderDisconnect);
			this.listenTo(registry.events,"tweet", this.tweets);
			registry.collections.tweets = new Tweets();
		},
		
		render : function(types){
			registry.views.tableView = new TableView({
				types : types
			});
			registry.views.tableView.render();
		},
		
		renderDisconnect : function(){
			$(this.el).empty();
			$(this.el).html('disconnected...')
		},
		
		tweets : function(tweet){
			registry.collections.tweets.add(tweet);
		}
		  
	});
	
	return AppView

});



