define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'text!templates/table/tableRow.html'
], function($, _, Backbone, registry,TableRowTemplate){
	
    var TableRowView = Backbone.View.extend({
	
		tagName : 'tr',
		
		template : _.template(TableRowTemplate),
		
		events : {
			'click [data-pivot]' : 'eventPivot'
		},
		
		initialize : function(options){
			this.model.bind("remove", this.removeRow, this);
			this.pivots = options.pivots;
		},
		
		render : function(){
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},
		
		removeRow : function(){
			this.remove();
		},
		
		eventPivot : function(e){
			var keyValue = $(e.target).attr('data-pivot'),
				value = $(e.target).text(),
				obj = {};
			obj[keyValue] = value;
			this.pivots.set(obj);
		}
		  
	});
	
	return TableRowView

});



