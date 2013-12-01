define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'text!templates/pivot.html'
], function($, _, Backbone, registry, PivotTemplate){
	
    var PivotView = Backbone.View.extend({
	
		template : _.template(PivotTemplate),
		
		initialize : function(){
			this.model.bind("change", this.render, this);
		}, 
		
		events : {
			'click .pivot' : 'eventDelete',
			'click .clearall' : 'eventClearAll'
		},
		
		render : function(){
			$(this.el).html(this.template({pivots:this.model.toJSON()}));
		},
		
		eventDelete : function(e){                                                        
			var pivotCheck = $(e.target).attr('data-pivot');
			this.model.unset(pivotCheck);
			this.render();
		},
		
		eventClearAll : function(e){                                                        
			this.model.clear();
			this.render();
		}
		  
	});
	
	return PivotView;

});



