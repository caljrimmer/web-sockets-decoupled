define([
  'jquery',
  'underscore',
  'backbone',
  'registry'
], function($, _, Backbone, registry){
		
	var Tweet = Backbone.Model.extend({
		urlRoot : '/pivot/',
		idAttribute: "name"
		
	});

	return Tweet; 
		
});