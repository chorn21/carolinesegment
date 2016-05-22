
// non-jquery way
// document.addEventListener("DOMContentLoaded", function(event) { 

// jquery way
$(function() {
  
	var width = $(window).width();
	var height = $(window).height();
	var range = 10;
	var radius = 1;

	var vertices = d3.range(range).map(function(d) {
		return [width/2+10*Math.cos(d*2*Math.PI/range), height/2+10*Math.sin(d*2*Math.PI/range)];
	});

	// TODO: define things to do when the values are invalid
	var voronoi = d3.geom.voronoi().clipExtent([[0, 0], [width, height]]);

	var svg = d3.select("body").append("svg")
				.attr("width", width).attr("height", height)
				.on("mousemove", function() {
					recreate(d3.mouse(this), range, radius);
					radius += 1;
				});

	var path = svg.append("g").selectAll("path");

	recreate([width/2, height/2]);

	// event listeners
	function recreate(center, range, radius) {

		var new_vertices = d3.range(range).map(function(d) {
			return [center[0]+Math.cos(d*2*Math.PI/range), center[1]+radius*Math.sin(d*2*Math.PI/range)];
		});

		var colors = d3.scale.category20();

		path = path.data(voronoi(new_vertices), polygon);

		path.exit().remove();

		path.enter().append("path")
        	.attr("d", polygon)
        	.attr("fill", function(d) {
        		return colors(d);
        	});

		// path.order();

	}

	function polygon(d) {
		// what exactly does this mean?
		return "M" + d.join("L") + "Z";
	}

});