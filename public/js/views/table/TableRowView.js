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
		
		initialize : function(){
			this.model.bind("remove", this.removeRow, this);
		},
		
		render : function(){
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},
		
		removeRow : function(){
			this.remove();
		}
		  
	});
	
	return TableRowView

});



