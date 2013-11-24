define([
  'jquery',  
  'underscore',  
  'backbone',
  'router',
  'registry'
], function($,_,Backbone,router, registry){
    
    registry.router = new router();
	return registry;

});
