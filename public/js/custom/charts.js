define(['jquery', 'underscore', 'backbone', 'registry', 'd3'], function($, _, Backbone, Registry, d3) {

	function Chart() {
		this.padding = 2;
		this.radialObj = {};
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
	
	Chart.prototype.radial = function(target,obj) {
		
		$(target).empty();     
		
		this.radialObj.perc = 0;
		
		var type = obj.type,
			width = obj.width,
			height = obj.height,
			fontSize = obj.fontSize,
			color;
			
		if(obj.type === "buy"){
			colour = 'green';
		}else{
			colour = 'red';
		}
		
		this.radialObj.angle = 2 * Math.PI;
		 
		var arc = d3.svg.arc()
		    .innerRadius((width / 2) - (width/5))
		    .outerRadius(width / 2)
		    .startAngle(0);

		var svg = d3.select(target).append("svg")
		    .attr("width", width)
		    .attr("height", height)
		  	.append("g")
		    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

		this.radialObj.background = svg.append("path")
		    .datum({endAngle: this.radialObj.angle})
		    .style("fill", "#ddd")
		    .attr("d", arc);

		this.radialObj.foreground = svg.append("path")
		    .datum({endAngle: .0 * this.radialObj.angle})
		    .style("fill", colour)
		    .attr("d", arc);
		
		this.radialObj.text = svg.append("svg:text")
			.attr("dy",".35em")
			.attr('font-size',fontSize) 
			.attr("text-anchor","middle")
			.attr('class', 'perc-value')
			.text(this.radialObj.perc + '%')
		
		this.radialObj.arcTween = function(transition, newAngle) {
			transition.attrTween("d", function(d) {
			var interpolate = d3.interpolate(d.endAngle, newAngle);
				return function(t) {
					d.endAngle = interpolate(t);
					return arc(d);   
				};  
			});          
		}  

	}
	
	Chart.prototype.radialIncrement = function(data){
		this.radialObj.perc = (data.length * 10) / 100;
		if(this.radialObj.perc <= 1){ 
			this.radialObj.foreground.transition()
		      .duration(750)
		      .call(this.radialObj.arcTween, this.radialObj.perc * this.radialObj.angle);
			this.radialObj.text.text(this.radialObj.perc * 100 + '%');  
		}
	}
	
	Chart.prototype.quartile = function(data,target,obj){ 
		
		$(target).empty();

		var width = obj.width,
			height = obj.height,
		    barHeight = ((height/4) - 1);
		
		var svg = d3.select(target).append("svg").attr("width", width).attr("height", height);

		var bar = svg.selectAll("rect")
		    .data(data)
		  	.enter().append("rect")
		    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; })
		    .attr("width", function(d){ return (d.value * width) })
			.attr("class", function(d){ return d.type; })
		    .attr("height", barHeight - 1);
		
		var line = svg.selectAll("line")
			.data(data)
			.enter().append("line")
			.attr("x1", function(d){ return (d.ave * width) })
			.attr("x2", function(d){ return (d.ave * width) })
			.attr("y1", function(d, i) { return (i * barHeight)})
			.attr("y2", function(d, i) { return (i * barHeight) + (barHeight - 1)})
			.attr("stroke-width", 1)
			.attr("stroke", "black");
	}

	return Chart;

});
