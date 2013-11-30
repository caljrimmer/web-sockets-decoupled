define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'charts'
], function($, _, Backbone, registry, Charts){
	
    var RadialView = Backbone.View.extend({
		
		initialize : function(){
			this.collection = registry.collections.tweets;
			this.chart = new Charts();
			this.chart.radial('#radial',{
				width : 60,
				height : 60,
				fontSize : 11,
				type : 'buy'
			});
			this.collection.bind("add", this.render, this);
		},
		
		render : function(){
			this.chart.radialIncrement(this.collection.toJSON(),'#radial');
		},
		  
	});
	
	return RadialView;

});