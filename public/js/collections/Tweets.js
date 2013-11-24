define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'models/Tweet'
], function($, _, Backbone, registry, Tweet){

	var Tweets = Backbone.Collection.extend({
		model : Tweet,
		url : '/tweets/'
	});

	return Tweets;

});