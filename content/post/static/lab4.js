
var desenhaLegenda = function(min, max, escalaDeCor, nomeVariavel){
    var x = d3.scaleLinear()
        .domain([min, max])
        .rangeRound([600, 800]);
  
    var g = svg.append("g")
        .attr("class", "key")
        .attr("transform", "translate(0,40)");

    g.append("rect")
        .attr("height", 48)
        .attr("x", 590)
        .attr("y", -20)
        .attr("width", 225)
        .attr("fill", "rgba(250,250,250,0.84)")
        .attr("rx",10)
        .attr("ry",10);
    
    g.selectAll("#rect")
      .data(escalaDeCor.range().map(function(d) {
          d = escalaDeCor.invertExtent(d);
          if (d[0] == null) d[0] = x.domain()[0];
          if (d[1] == null) d[1] = x.domain()[1];
          return d;
        }))
      .enter().append("rect")
        .attr("height", 8)
        .attr("x", d => x(d[0]))
        .attr("width", function(d) { return x(d[1]) - x(d[0]); })
        .attr("fill", function(d) { return escalaDeCor(d[0]); });
  
    g.append("text")
        .attr("class", "caption")
        .attr("x", x.range()[0])
        .attr("y", -6)
        .attr("fill", "#000")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(nomeVariavel);
    
  
    g.call(d3.axisBottom(x)
        .tickSize(13)
        .tickFormat(function(x, i) { return (i ? x : x + "%"); })
        .tickValues(escalaDeCor.domain().concat(min)))
      .select(".domain")
        .remove();
  }
  
var svg = d3.select("svg"),
width = +svg.attr("width"),
height = +svg.attr("height");
var path = d3.geoPath();

var color = d3.scaleThreshold()
  .domain([20,40,60,80,100])
  .range(d3.schemeYlOrRd[5]);

d3.queue()
    .defer(d3.json, "/BlogVisualizacao/post/static/geosimplificado.json")
    .await(ready);
function ready(error, dados) {
    if (error) throw error;
    var cidades = dados.features;
    svg.append("g")
        .attr("class", "cidades")
        .selectAll("path")
        .data(cidades)
        .enter()
        .append("path")
        .attr("fill", d => {valor = Number(d.properties["PORC"].replace(",", ".")); return valor === "NA" ? '#e0e0eb' : color(valor)})
        .attr("d", path)
        .on("mouseover",showTooltip)
        .on("mousemove",moveTooltip)
        .on("mouseout",hideTooltip);
    desenhaLegenda(0, 100, color, "Porcentagem de professores graduados");
}

var zoom_handler = d3.zoom()
    .on("zoom", zoom_actions);

function zoom_actions(){
    d3.selectAll("path").attr("transform", d3.event.transform);
}

zoom_handler(svg);

var tooltip = d3.select("body")
                .append("div")
                .attr("class","tooltip");
var tooltipOffset = {x: 5, y: -25};
function showTooltip(d) {
    moveTooltip();
    tooltip.style("display","block")
    .text(d.properties["Localidade"] + ": " +  Number(d.properties["ABSO"].replace(",", ".")) + " professores ("+ d.properties["PORC"] + "%)");
}

function moveTooltip() {
tooltip.style("top",(d3.event.pageY+tooltipOffset.y)+"px")
  .style("left",(d3.event.pageX+tooltipOffset.x)+"px");
}

function hideTooltip() {
    tooltip.style("display","none");
}
