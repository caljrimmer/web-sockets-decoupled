define(['jquery', 'underscore', 'backbone', 'registry', 'd3'], function($, _, Backbone, Registry, d3) {

	function Chart() {
		this.padding = 2;
	}


	Chart.prototype.block = function(data, target) {

		$(target).empty();

		var w = $(target).width(),
			h = $(target).height(),
			t = target,
			p = this.padding;

		var svg = d3.select(t).append("svg").attr("width", w).attr("height", h);
		
		svg.selectAll("rect").data(data).enter().append("rect")
		.attr("x", function(d, i) {
			return (Math.floor((i / 12)) * (10 + p))
		})
		.attr("y", function(d, i) {
			return ((i % 12) * (9 + p))
		})
		.attr("width", 10)
		.attr("height", 10)
		.attr("class", function(d) {
			if (d.sell) {
				return 'sell';
			} else {
				return 'buy';
			}
		})
		.attr("data-value", function(d) {
			if (_.has(d, 'placeholder')) {
				return 0;
			} else {
				return d.ave;
			}
		});

	}

	return Chart;

});
