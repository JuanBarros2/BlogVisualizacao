---
title: "Bandas e Artistas parecidos"
date: 2018-03-12T14:46:18-03:00
draft: false
---
<style>.node {
        fill: #ccc;
        stroke: #fff;
        stroke-width: 2px;
    }.link {
            stroke: #999;
            stroke-opacity: 0.3;
    }
	div.tooltip {
  position: absolute;
  background-color: white;
  border: 1px solid black;
  color: black;
  font-family:"avenir next", Arial, sans-serif;
  padding: 4px 8px;
  display: none;
}
</style>
<div>
	<p>
A visualização abaixo mostra bandas e artistas que são semelhantes à banda <a href="https://open.spotify.com/artist/7Ln80lUS6He07XvHI8qqHH">Arctic Monkeys</a>.
	</p>
</div>
<div id="chart">
</div>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="//d3js.org/d3-scale-chromatic.v0.3.min.js"></script>

<script>
		var width = 1000, height = 1000;
            
		var svg = d3.select("#chart")
				.append("svg")
				.attr('version', '1.1')
				.attr('viewBox', '0 0 '+width+' '+height)
				.attr('width', '100%');

		var color = d3.scaleOrdinal(d3.schemeSet3);

		var simulation = d3.forceSimulation()
		    .force("link", d3.forceLink().id(function(d) { return d.id; }))
		    .force("charge", d3.forceManyBody())
		    .force("center", d3.forceCenter(width / 2, height / 2));
		
		 simulation.force("charge")
        	.strength(-15);
		d3.json("/BlogVisualizacao/post/static/arcticnodes.json", function(error, graph) {
		  if (error) throw error;

			console.log("dsad");
		  let nodes = graph.nodes.filter(d => d.size > 57).reverse();
		  let edges = graph.edges.filter(d => nodes.filter(n => n.id === d.source).length > 0);
		  edges = edges.filter(d => nodes.filter(n => n.id === d.target).length > 0);
		  var link = svg.append("g")
		      .attr("class", "link")
		    .selectAll("line")
		    	.data(edges)
		    .enter().append("line")
				.attr("stroke", "#888");

		  var node = svg.append("g")
		      .attr("class", "nodes")
		    .selectAll("circle")
		    	.data(nodes)
		    .enter().append("circle")
		      .attr("r", d => d.size * 0.12)
			  .attr("fill", d => color(d.color))
			.on("mouseover",showTooltip)
			.on("mousemove",moveTooltip)
			.on("mouseout",hideTooltip)
		      .call(d3.drag()
		          .on("start", dragstarted)
		          .on("drag", dragged)
		          .on("end", dragended));

		  simulation
		      .nodes(nodes)
		      .on("tick", ticked);

		  simulation.force("link")
		      .links(edges);

		var zoom_handler = d3.zoom()
		.on("zoom", zoom_actions);

		zoom_handler(svg);     

		function zoom_actions(){
			d3.selectAll("circle").attr("transform", d3.event.transform);
			d3.selectAll("line").attr("transform", d3.event.transform);
		}

		var tooltip = d3.select("body")
                .append("div")
				.attr("class","tooltip");
				
		var tooltipOffset = {x: 5, y: -25};
		function showTooltip(d) {
			moveTooltip();
			tooltip.style("display","block")
			.text(d.label);
		}

		function moveTooltip() {
		tooltip.style("top",(d3.event.pageY+tooltipOffset.y)+"px")
		.style("left",(d3.event.pageX+tooltipOffset.x)+"px");
		}

		function hideTooltip() {
			tooltip.style("display","none");
		}


		  function ticked() {
		    link
		        .attr("x1", function(d) { return d.source.x; })
		        .attr("y1", function(d) { return d.source.y; })
		        .attr("x2", function(d) { return d.target.x; })
		        .attr("y2", function(d) { return d.target.y; });

		    node
		        .attr("cx", function(d) { return d.x; })
		        .attr("cy", function(d) { return d.y; });
		  }
		});

		

		function dragstarted(d) {
		  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
		  d.fx = d.x;
		  d.fy = d.y;
		}

		function dragged(d) {
		  d.fx = d3.event.x;
		  d.fy = d3.event.y;
		}

		function dragended(d) {
		  if (!d3.event.active) simulation.alphaTarget(0);
		  d.fx = null;
		  d.fy = null;
		}

</script>