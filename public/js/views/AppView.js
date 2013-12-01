define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'collections/Tweets',
  'views/Table/TableView',
  'views/Chart/ChartView',
  'views/Chart/RadialView',
  'views/Chart/QuartileView'
], function($, _, Backbone, registry, Tweets, TableView, ChartView, RadialView, QuartileView){
	
    var AppView = Backbone.View.extend({
	
		el : $('canvas'),
		
		initialize : function(){
			//The decoupled events from the web sockets (custom/sockets.js) are picked up here.
			this.listenToOnce(registry.events,"types", this.render);
			this.listenToOnce(registry.events,"disconnect", this.renderDisconnect);
			this.listenTo(registry.events,"tweet", this.tweets);
			//This collection is ever growing with recieved tweet events.
			registry.collections.tweets = new Tweets();
		},
		
		render : function(types){
			
			registry.views.radialView = new RadialView({
				el : $('#radial')
			});
			registry.views.radialView.render();
			
			registry.views.quartileView = new QuartileView({
				el : $('#quartile')
			});
			registry.views.quartileView.render();
			
			registry.views.tableView = new TableView({
				el : $('#table')
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



