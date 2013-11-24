define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'views/AppView'
], function($, _, Backbone, registry, AppView){

	var Router = Backbone.Router.extend({

		routes: {
			'': 'default',
			'*notFound': 'default'
		},
		
		default : function(){
			registry.views.appView = new AppView();
			registry.views.appView.render();
		}

	});

	return Router;


});
