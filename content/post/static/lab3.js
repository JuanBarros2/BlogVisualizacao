const x = d3.scaleLinear() // para a posição vertical dos tics na legenda
      .domain([0, 2000])       // domínio dos tics
      .rangeRound([0, 260]); // em pixels
    
  const color = d3.scaleThreshold()
      .domain([500, 1000, 1500, 2000])
      .range(d3.schemeYlOrRd[4]);

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

  const g = svg.append("g")
      .attr("transform", "translate(" + (width - 300) + "," +(height - 40)+")");

  g.selectAll("rect")
    .data(color.range().map(d => {
        d = color.invertExtent(d);
        if (d[0] == null) d[0] = x.domain()[0];
        if (d[1] == null) d[1] = x.domain()[1];
        return d;
      }))
    .enter().append("rect")
      .attr("height", 8)
      .attr("x", d => x(d[0]))
      .attr("width", d => x(d[1]) - x(d[0]))
      .attr("fill", d => color(d[0]));

  g.append("text")
      .attr("class", "caption")
      .attr("x", x.range()[0])
      .attr("y", -6)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text("Rendimento Nominal Médio Mensal:");

  g.call(d3.axisBottom(x)
      .tickSize(15)
      .tickFormat((x, i) => i ? x : "R$ " + x )
      .tickValues([0].concat(color.domain()))) // Adiciona o zero para o eixo da legenda
    .select(".domain")
      .remove();