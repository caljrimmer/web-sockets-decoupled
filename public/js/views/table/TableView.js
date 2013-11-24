define([
  'jquery',
  'underscore',
  'backbone',
  'registry',                
  'models/Tweet',
  'views/table/TableRowView',
  'text!templates/table/table.html'
], function($, _, Backbone, registry, Tweet, TableRowView, TableTemplate){
	
    var TableView = Backbone.View.extend({
		
		template : _.template(TableTemplate),
		
		initialize : function(){
			this.collection = registry.collections.tweets;
			this.collection.bind("add", this.renderRows, this);
		},
		
		controllerTrimCollection : function(collection){
			if(collection.length >= 5){
				return collection.splice((collection.length - 5), 5)
			}else{
				return collection;
			}
		},
		
		render : function(){
			$(this.el).html(this.template());
		},
		
		renderRows : function(tweet){
			var container = $(this.el).find('tbody'), 
				that = this,
				collection = this.collection.toJSON();
			container.empty();                 
			collection = this.controllerTrimCollection(collection);
			$.each(collection,function(k,v){
				var view = new TableRowView({
					model: new Tweet(v)
				}); 
				container.prepend(view.render().el);
			});
		}
		  
	});
	
	return TableView;

});



