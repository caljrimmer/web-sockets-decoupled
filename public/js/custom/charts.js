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
			.attr("stroke", function(d){
				if(d.value < d.ave){
					return "#666"
				}else{
					return "white"
				}
			});
		
		var text = svg.selectAll("text")
			.data(data)
			.enter().append("text")
			.attr("x", width - 14)
			.style('stroke','#ccc') 
			.attr("y", function(d, i) { return ((i * barHeight) + 12)})
			.text(function(d) { return (d.value * 100)})
	}
	
	Chart.prototype.performance = function(target,obj){
		
		var margin = {top: 0, right: 0, bottom: 20, left: 0},
		    width = obj.width - margin.left - margin.right,
		    height = obj.height - margin.top - margin.bottom,
			allData;

		var parseDate = d3.time.format("%Y%m%d").parse;

		var x = d3.time.scale()
		    .range([0, width]);

		var y = d3.scale.linear()
		    .range([height, 0]);

		var color = d3.scale.category10();

		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom");

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient("left");

		var line = d3.svg.line()
		    .interpolate("basis")
		    .x(function(d) { return x(d.date); })
		    .y(function(d) { return y(d.temperature); }); 
		
		var div = d3.select(target).append("div")
		    .attr("class", "tooltip")
		    .style("opacity", 1e-6)
			.style("height", height + 'px'); 

		var svg = d3.select(target).append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
			.on("mouseover", function(){
				div.transition()
			      .duration(100)
			      .style("opacity", 1);   
				
				d3.selectAll('.label')
					.style("opacity", 1);   

				d3.selectAll("circle")
					.style("opacity", 1);     
				
			})
			.on("mousemove", function(){ 
				div
					.style("left", (d3.event.layerX) + "px")
					.style("top", "0px");   
				
				d3.selectAll('.label')
					.style("left", function(){
						if(width - d3.event.layerX > 85){
							return d3.event.layerX + 4 + 'px';
						}else{
							return d3.event.layerX - 90 + 'px'; 
						}
					})
					.style("top", function(d,index){ return (dataYMapper(d,d3.event.layerX) - 13) + 'px'})
					.text(function(d) { return dataLabelMapper(d,d3.event.layerX) + ' ' + d.name ; })
					
			   d3.selectAll("circle").attr("transform", function(d,index){  return "translate(" + d3.event.layerX + "," + dataYMapper(d,d3.event.layerX) + ")"});  
				     
			})
			.on("mouseout", function(){
				div.transition()
				      .duration(100)
				      .style("opacity", 1e-6);
				
				d3.selectAll('.label')
					.style("opacity", 1e-6);   
					
				d3.selectAll("circle")
					.style("opacity", 1e-6);    
							
			})
			.on("click", function(d,i) {
				console.log(d) 
				 console.log(dataXMapper(d,d3.event.layerX))
			})
			
		var getIndex = function(data,xPos){
			var step = (new Date(data.values[data.values.length - 1].date) - new Date (data.values[0].date)) / data.values.length;  
			return Math.round((new Date(x.invert(xPos)) - new Date(data.values[0].date)) / step);
		}
		
		var dataXMapper = function(data,xPos){
			return data.values[getIndex(data,xPos)].date;
		} 

		var dataYMapper = function(data,xPos){
			return y(data.values[getIndex(data,xPos)].temperature);
		}
		
		var dataLabelMapper = function(data,xPos){
			return data.values[getIndex(data,xPos)].temperature;
		}
		
		svg.append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
			

		d3.tsv("js/custom/data.tsv", function(error, data) {
		  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

		  data.forEach(function(d) {
		    d.date = parseDate(d.date);
		  });
		
		  allData = data;

		  var cities = color.domain().map(function(name) {
		    return {
		      name: name,
		      values: data.map(function(d) {
		        return {date: d.date, temperature: +d[name]};
		      })
		    };
		  });

		  x.domain(d3.extent(data, function(d) { return d.date; }));

		  y.domain([
		    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
		    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
		  ]);

		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis);

		  svg.append("g")
		      .attr("class", "y axis")
		      .call(yAxis)
		    .append("text")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", ".71em")

		  var city = svg.selectAll(".city")
		      .data(cities)
		      .enter().append("g")
		      .attr("class", "city");

		  city.append("path")
		      .attr("class", "line")
		      .attr("d", function(d) { return line(d.values); })
		      .style("stroke", function(d) { return color(d.name); });
		
		city.append("circle")
		      .attr("r", 2); 
		
		var label = d3.select(target).selectAll(".label")
		      .data(cities)
		      .enter().append("div")
		      .attr("class", "label")
		      .attr("id", function(d) { return d.name ; })
			.datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })  
			.style("left", function(d) { return (x(d.value.date) - 90) + "px"}) 
			.style("top", function(d) { return (y(d.value.temperature) - 9 ) + "px"})
			.text(function(d) { return d.value.temperature + ' ' + d.name ; });  
			

		});	
	}

	return Chart;

});
