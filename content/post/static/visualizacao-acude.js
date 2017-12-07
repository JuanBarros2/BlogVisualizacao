
const loader = (url) => {
    var script = document.createElement("script"); 
    script.src = url; 

    document.head.appendChild(script); 
};

loader("https://d3js.org/d3.v4.min.js");


const alturaSVG = 400, larguraSVG = 900; 
const margin = {top: 10, right: 20, bottom:40, left: 45}, 
larguraVis = larguraSVG - margin.left - margin.right, 
alturaVis = alturaSVG - margin.top - margin.bottom;

function desenhaVisualizacao(dados) {
  let grafico = d3.select('#chart')
  .append('svg')
  .attr('width', larguraVis + margin.left + margin.right)
  .attr('height', alturaVis + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  let x = d3.scaleLinear()
    .domain([d3.min(dados, (d) => d.noventa_percentil) - 2, d3.max(dados, (d) => d.noventa_percentil) + 2 ])
    .range([0, larguraVis]); 
  let y = d3.scaleLinear()
    .domain([d3.min(dados, (d) => d.dez_percentil) - 1, d3.max(dados, (d, i) => d.dez_percentil) + 1])
    .range([0, alturaVis])
    .rangeRound([alturaVis, 0]); 
  let escala_cor = d3.scaleLinear()
              .domain([d3.min(dados, (d) => d.mediana), d3.max(dados, (d)=> d.mediana)])
              .range(["#1F84C2", "#dcedf7"])
              .clamp(true);
  grafico.selectAll('g')
    .data(dados)
    .enter()
      .append('circle')
        .attr('cy', d => y(d.dez_percentil))
        .attr('cx', d => x(d.noventa_percentil))
        .attr('r', 10)
        .attr('fill',(d) => escala_cor(d.mediana)); 

  grafico.append("g")
    .attr("transform", "translate(0," + alturaVis + ")")
    .call(d3.axisBottom(x)); 
  grafico.append('g')
    .call(d3.axisLeft(y));
  grafico.append("text")
    .attr("transform", "translate(-30," + (alturaVis + margin.top)/2 + ") rotate(-90)")
    .text("10-percentil");
  grafico.append("text")
    .attr("transform", "translate(" + ((larguraVis)/2) + "," + (alturaVis + 30) + " )")
    .text("90-percentil"); 

  
 
}


  d3.json('/Boqueirao_Visualizacao/post/static/boqueirao-por-mes.json', function(dados) {
      desenhaVisualizacao(dados);
  });