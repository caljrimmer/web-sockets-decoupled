define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'charts',
  'text!templates/chart/chart.html'
], function($, _, Backbone, registry, Charts, ChartTemplate){
	
    var ChartView = Backbone.View.extend({
		
		initialize : function(){
			this.collection = registry.collections.tweets;
			this.chart = new Charts();
			this.collection.bind("add", this.render, this);
		},
		
		render : function(){
			this.chart.block(this.collection.toJSON(),'#chart');
		},
		  
	});
	
	return ChartView;

});



