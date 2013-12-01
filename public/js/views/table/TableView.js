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
			this.sort = {};
			this.collection = registry.collections.tweets;
			this.collection.bind("add", this.renderRows, this);
			this.pivots.bind("change", this.renderRows, this);
		},
		
		events : {
			'click th[data-sort]' : 'eventSort'
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
			collection = this.controllerApplySort(collection);                 
			$.each(collection,function(k,v){
				var view = new TableRowView({
					model: new Tweet(v),
					pivots : that.pivots
				}); 
				container.prepend(view.render().el);
			});
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
		},
		
		controllerApplySort : function(collection){
			var that = this,
				sorted = collection;
			if(_.has(this.sort,'name')){
				sorted = _.sortBy(collection, that.sort.name);
				if(this.sort.asc){
					sorted.reverse();
				}
			}
			return sorted; 
		},
		
		eventSort : function(e){
			if(!_.has(this.sort,'name')){
				this.sort = {
					name : $(e.target).attr('data-sort'),
					asc : true 
				}
			}else{
				if(this.sort.name === $(e.target).attr('data-sort')){
					if(this.sort.asc){
						this.sort.asc = false;
					}else{
						this.sort = {};
					}
				}else{
					this.sort = {
						name : $(e.target).attr('data-sort'),
						asc : true 
					}
				}
			}
			this.renderRows();
		}
		  
	});
	
	return TableView;

});



