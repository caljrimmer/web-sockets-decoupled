define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'sockets',
  'views/AppView'
], function($, _, Backbone, registry, sockets, AppView){

	var Router = Backbone.Router.extend({

		routes: {
			'': 'default',
			'*notFound': 'default'
		},

		initialize : function(){},
		
		default : function(){
			registry.views.appView = new AppView();
		}

	});

	return Router;


});
