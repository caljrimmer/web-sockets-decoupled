/**
* This page has grown too big
* There is a lot of refactoring to do
* This app.js should focus purely on getitng the app in state to start.
*
*/

define([
  'jquery',  
  'underscore',  
  'backbone',
  'router',
  'registry'
], function($,_,Backbone,router, registry){
    
    registry.router = new router();
	registry.events = _.extend({},Backbone.Events);
	registry.userAgent = navigator.userAgent.toLowerCase();
	return registry;

});
