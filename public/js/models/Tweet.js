define([
  'jquery',
  'underscore',
  'backbone',
  'registry'
], function($, _, Backbone, registry){
		
	var Tweet = Backbone.Model.extend({
		urlRoot : '/tweets/',
		idAttribute: "_id"
		
	});

	return Tweet; 
		
});