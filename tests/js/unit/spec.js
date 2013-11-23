require.config({
    urlArgs: 'cb=' + Math.random(),
    paths: {
        'jquery': '../../../public/js/vendor/jquery-1.10.1.min',
        'evercookie' : '../../../public/js/vendor/evercookie',
        'underscore' : '../../../public/js/vendor/underscore',
        'backbone' : '../../../public/js/vendor/backbone',
		'text' : '../../../public/js/vendor/text',
		'lang' : '../../../public/js/custom/lang',
		'swfobject' : '../../../public/js/vendor/swfobject',
		'evercookie' : '../../../public/js/vendor/evercookie',
		'store' : '../../../public/js/custom/store',
		'registry' : '../../../public/js/registry',
		'User' : '../../../public/js/models/User',
        'jasmine': 'lib/jasmine/jasmine',
        'jasmine-html': 'lib/jasmine/jasmine-html',
		'jasmine-ajax': 'lib/jasmine/jasmine-ajax'
    },
    shim: {
        jasmine: {
            exports: 'jasmine'
        },
		'jasmine-ajax' : {
			deps: ['jasmine'],
            exports: 'jasmine'
		},
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        },
		underscore: {
			exports: '_'
		},
		evercookie: {
			deps: ["swfobject"],
			exports: 'evercookie'
		},
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}  
	 }
});


require(['jquery', 'jasmine-html','jasmine-ajax'], function ($, jasmine) {

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [];
    specs.push('spec/store_spec');


    $(function () {
        require(specs, function (spec) {
            jasmineEnv.execute();
        });
    });

});