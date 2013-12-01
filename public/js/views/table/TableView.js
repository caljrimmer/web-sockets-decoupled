define([
  'jquery',
  'underscore',
  'backbone',
  'registry',                
  'models/Tweet',
  'views/table/TableRowView',
  'views/PivotView',
  'models/Pivot',
  'text!templates/table/table.html'
], function($, _, Backbone, registry, Tweet, TableRowView, PivotView, Pivot, TableTemplate){
	
    var TableView = Backbone.View.extend({
		
		template : _.template(TableTemplate),
		
		initialize : function(){
			this.pivots = new Pivot();
			this.collection = registry.collections.tweets;
			this.collection.bind("add", this.renderRows, this);
			this.pivots.bind("change", this.renderRows, this);
		},
		
		render : function(){
			$(this.el).find('#table-container').html(this.template());
			this.pivotView = new PivotView({
				model : this.pivots,
				el : $(this.el).find('#pivot')
			});
			this.pivotView.render();
		},
		
		renderRows : function(tweet){
			var container = $(this.el).find('tbody'), 
				that = this,
				collection = this.collection.toJSON();
			container.empty();
			collection = this.controllerApplyPivot(collection);                
			collection = this.controllerTrimCollection(collection);
			$.each(collection,function(k,v){
				var view = new TableRowView({
					model: new Tweet(v),
					pivots : that.pivots
				}); 
				container.prepend(view.render().el);
			});
		},
		
		controllerTrimCollection : function(collection){
			if(collection.length >= 5){
				return collection.splice((collection.length - 5), 5)
			}else{
				return collection;
			}
		},
		
		controllerApplyPivot : function(collection){
			var pivots = this.pivots.toJSON(),
				filteredCollection;
			if(Object.keys(pivots).length){
				filteredCollection =  _.where(collection,pivots);
			}else{
				filteredCollection =  collection
			}                      
			return filteredCollection;
		}
		  
	});
	
	return TableView;

});



