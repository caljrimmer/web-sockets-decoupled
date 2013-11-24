define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'collections/Tweets',
  'views/Table/TableView',
  'views/Chart/ChartView'
], function($, _, Backbone, registry, Tweets, TableView, ChartView){
	
    var AppView = Backbone.View.extend({
	
		el : $('canvas'),
		
		initialize : function(){
			this.listenToOnce(registry.events,"types", this.render);
			this.listenToOnce(registry.events,"disconnect", this.renderDisconnect);
			this.listenTo(registry.events,"tweet", this.tweets);
			registry.collections.tweets = new Tweets();
		},
		
		render : function(types){
			
			registry.views.chartView = new ChartView({
				el : $('#chart')
			});
			registry.views.chartView.render();
			
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



