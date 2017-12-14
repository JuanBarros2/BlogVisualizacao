let streamGraph = (dados) => {
    let layerName = ["carros", "total_pedestres", "motos","total_ciclistas",  "onibus"];
    let legenda = ["Carro", "Pedestres","Moto", "Ciclista", "Ônibus"].reverse();
    var colors = ['#8dd3c7','#ffffb3','#bebada','#fb8072', '#80b1d3'];

    dados = dados.filter((dado) => dado.local == "jackson" );

    var stack = d3.stack().keys(layerName).offset(d3.stackOffsetWiggle),
    layers0 = stack(dados),
    layers = layers0;

    var svg = d3.select("#visu1"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

    var x = d3.scaleBand()
        .domain(dados.map((dado) => dado.horario_inicial))
        .range([0, width]);

    var y = d3.scaleLinear()
    .domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
    .range([height-20, 0]);

    var area = d3.area()
        .x((d) => x(d.data.horario_inicial))
        .y0((d) => y(d[0]))
        .y1((d) => y(d[1]));

    svg.selectAll("path")
    .data(layers0)
    .enter().append("path")
    .attr("d", area)
    .attr("fill", (d, i) => colors[i]);

    colors = colors.reverse();

    var legend = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "start")
        .selectAll("g")
        .data(legenda)
        .enter().append("g")
        .attr("transform", (d, i) => "translate(0," + i * 20 + ")");

    legend.append("rect")
        .attr("x", width - 80 )
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", (d, i) => colors[i]);

    legend.append("text")
        .attr("x", width - 56 )
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(d => d);

    x = d3.scaleBand()
        .domain(dados.map((dado) => dado.horario_inicial).filter((dado, i) => i%4==0))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + (height-20) + ")")
        .call(d3.axisBottom(x)); 
    function stackMax(layer) {
    return d3.max(layer, function(d) { return d[1]; });
    }

    function stackMin(layer) {
    return d3.min(layer, function(d) { return d[0]; });
    }
}

let scaterPlot = (dados) => {  
    const alturaSVG = 400, larguraSVG = 700; 
    const margin = {top: 10, right: 20, bottom:40, left: 80}, 
    larguraVis = larguraSVG - margin.left - margin.right, 
    alturaVis = alturaSVG - margin.top - margin.bottom;
    
    dados = dados.filter((dado) => dado.local == "bobs" );

    const total_pedestres = d3.sum(dados, (dado) => dado.total_pedestres);

    let dados_filtrados = [ 
        {
            "veiculo" : "Carro",
            "quant" : d3.sum(dados, (dado) => dado.carros),
            "espaco" : 4.3,
            "cor" : "#8dd3c7",
            "suporta": 4
        },    
        { 
            "veiculo" : "Ônibus",
            "quant" : d3.sum(dados, (dado) => dado.onibus),
            "espaco" : 12,
            "cor" : "#80b1d3",
            "suporta": 40
        },
        {
            "veiculo" : "Moto",
            "quant" : d3.sum(dados, (dado) => dado.motos),
            "espaco" : 2,
            "cor" : "#bebada",
            "suporta": 2
        }
    ];

    let grafico = d3.select('#visu2')
    .append('svg')
    .attr('width', larguraVis + margin.left + margin.right)
    .attr('height', alturaVis + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    let x = d3.scaleLinear()
        .domain([d3.min(dados_filtrados, (d) => total_pedestres / d.suporta) , d3.max(dados_filtrados, (d) => total_pedestres / d.suporta) + 100])
        .range([0, larguraVis]); 
    let y = d3.scaleLinear()
        .domain([(d3.min(dados_filtrados, (d) => d.quant * d.suporta)) - 1000, (d3.max(dados_filtrados, (d, i) => d.quant * d.suporta)) + 1000])
        .range([0, alturaVis])
        .rangeRound([alturaVis, 0]); 
        
    let circles = grafico.selectAll('g')
        .data(dados_filtrados)
        .enter()
        .append('circle')
            .attr('cy', d => y(d.quant * d.suporta))
            .attr('cx', d => x(total_pedestres / d.suporta))
            .attr('r', 10)
            .attr('fill', (d) => d.cor)
            .append('text')
                .text((d)=> d.veiculo);

    grafico.selectAll('g')
        .data(dados_filtrados)
        .enter()
        .append('text')
            .attr("font-size", 15)
            .attr("transform", "translate(10, +5)") 
            .attr('y', d => y(d.quant * d.suporta))
            .attr('x', d => x(total_pedestres / d.suporta))
            .text((d)=> d.veiculo);
        
    grafico.append('g')
        .call(d3.axisLeft(y));
    grafico.append('g')
        .attr("transform", "translate(0," + (alturaVis) + ")")
        .call(d3.axisBottom(x));
    grafico.append("text")
        .attr("transform", "translate(-50," + ((alturaVis ))+ ") rotate(-90)")
        .text("Pessoas transportadas por cada veículo");
    grafico.append("text")
        .attr("transform", "translate(30," + (alturaVis + 30) + " )")
        .text("Quantidade de Veículos necessários para transportar todos pedestres"); 

};

let heatmap = (dados) => {
   
}

d3.csv('https://raw.githubusercontent.com/luizaugustomm/pessoas-no-acude/master/dados/processados/dados.csv', function(dados) {
    streamGraph(dados);
    scaterPlot(dados);
});

d3.csv('/Boqueirao_Visualizacao/post/static/acudeSoma.csv',(dados) => {
    heatmap(dados);
});