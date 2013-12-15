define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'charts'
], function($, _, Backbone, registry, Charts){
	
    var ChartView = Backbone.View.extend({
		
		initialize : function(){
			this.collection = registry.collections.tweets;
			this.chart = new Charts();
			//this.collection.bind("add", this.render, this);
			this.render();
		},
		
		render : function(){
			$(this.el).empty();
			this.chart.performance2('#chart',{
				width : 700,
				height : 300
			});
		},
		  
	});
	
	return ChartView;

});



