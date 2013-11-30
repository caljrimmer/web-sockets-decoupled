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
			//this.collection.bind("add", this.render, this);
		},
		
		render : function(){
			
			this.chart.quartile(
				[
					{ value : 0.79, ave : 0.7 , type : 'over'},
					{ value : 0.8 , ave : 0.68 , type : 'over'},
					{ value : 0.6 , ave : 0.64 , type : 'under'},
					{ value : 0.5 , ave : 0.43 , type : 'over'} 
				]
			,'#quartile',{
				width : 120,
				height: 60
			});
		},
		  
	});
	
	return RadialView;

});