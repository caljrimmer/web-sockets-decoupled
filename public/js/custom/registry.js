define(['underscore','backbone'], function(_,Backbone) {
	
    var registry = {
		models : {},
		collections : {},
		views : {},
		events : _.extend({},Backbone.Events) 
	};

    return registry;

});
