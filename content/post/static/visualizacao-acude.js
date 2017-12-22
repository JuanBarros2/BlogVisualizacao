let streamGraph = (dados) => {
    let layerName = ["carros", "total_pedestres", "motos","total_ciclistas",  "onibus"];
    let legenda = ["Carro", "Pedestres","Moto", "Ciclista", "Ônibus"].reverse();
    var colors = ['#8dd3c7','#ffffb3','#bebada','#fb8072', '#80b1d3'];
    let wigled = true;
    var stack = d3.stack().keys(layerName);

    const select = d3.select("#inds").
        on('change', () => { wigled = true; updateSteamGraph(calculateLayers(dados))});
    
    d3.select("body")
        .append('div')
        .attr('id', "tooltip")
        .attr('class', "hidden")
            .append('p')
            .attr('id', 'titulo_tooltip');
    d3.select("#tooltip")
        .append('p')
        .attr('id', 'value')
        .style('font-weight', 'bold');

    
    var svg = d3.select("#visu1"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

    updateSteamGraph(calculateLayers(dados));

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
        .attr("fill", (d, i) => colors[i])
        .attr("stroke", "grey")
        .attr("stroke-width", "0.5");
    colors = colors.reverse();

    legend.append("text")
        .attr("x", width - 56 )
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(d => d);

    x = d3.scaleBand()
        .domain(dados.map((dado) => dado.horario_inicial).filter((dado, i) => i%12==0))
        .range([0, width - 80]);
    svg.append("g")
        .attr("transform", "translate(0," + (height-20) + ")")
        .call(d3.axisBottom(x)); 
    function stackMax(layer) {
        return d3.max(layer, function(d) { return d[1]; });
    }

    function stackMin(layer) {
        return d3.min(layer, function(d) { return d[0]; });
    }

    function updateSteamGraph(layers){
        var x = d3.scaleBand()
            .domain(dados.map((dado) => dado.horario_inicial))
            .range([0, width - 80]);
    
        var y = d3.scaleLinear()
            .domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
            .range([height-20, 0]);

        var area = d3.area()
        .x((d) => x(d.data.horario_inicial))
        .y0((d) => y(d[0]))
        .y1((d) => y(d[1]));
        
        camadas = svg.selectAll("path.layer")
            .data(layers, data => data);
        camadas.exit().remove();    
        camadas.enter()
            .append("path")
                .attr("d", area)
                .attr("class", "layer")
                .attr("fill", (d, i) => colors[i])
                .attr("stroke", "grey");

        d3.selectAll("path.layer")
            .on("mouseover", (dado, i) => {
                const sumLay = d3.sum(dado.map((d)=> d.data, dado), (d) => d[layerName[i]]);
                const text = wigled ? sumLay:
                Math.round(sumLay/d3.sum(dado, (d) => { 
                        d = d.data;
                        return parseInt(d.total_pedestres) + parseInt(d.carros) 
                        + parseInt(d.total_ciclistas) + parseInt(d.motos) + parseInt(d.onibus)
                    }) *100) + "%"
                ;
                d3.select("#tooltip")
                            .style("left", (d3.event.pageX) + "px")
                            .style("top", (d3.event.pageY ) + "px")
                            .select("#value")
                            .text(text);
                let titulo = legenda.reverse();
                d3.select("#tooltip #titulo_tooltip")
                .text(titulo[i]);
                d3.select("#tooltip").classed("hidden", false);
                d3.selectAll(".layer")
                    .attr("stroke-width", "0.5")
                    .style("opacity", d => area(d) === area(dado) ? "1" : "0.20" );
                titulo = legenda.reverse();
            })
            .on("mouseout", (dado) => {
                d3.selectAll(".layer")
                    .style("opacity", "1");
                d3.select("#tooltip").classed("hidden", true);

            })
            .on("click", (dado, i)=>{
                if(wigled){
                    wigled = !wigled;
                    updateSteamGraph(calculateLayersInOrder(dados));
                }else{
                    wigled = !wigled;
                    updateSteamGraph(calculateLayers(dados));
                }
                
            });
        
    }

    function calculateLayers(dadosIn){
        
        let dados_filtrados = dadosIn.filter((dado) => dado.local == select.property('value'));
        
        let layers = stack.offset(d3.stackOffsetWiggle)(dados_filtrados);
        return layers;
    }
    function calculateLayersInOrder(dadosIn){
        let dados_filtrados = dadosIn.filter((dado) => dado.local == select.property('value'));
        
        let layers = stack.offset(d3.stackOffsetExpand)(dados_filtrados);
        return layers;
    }
}

let scaterPlot = (dados) => {  
    const alturaSVG = 400, larguraSVG = 900; 
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
            "suporta": 3
        },    
        { 
            "veiculo" : "Ônibus",
            "quant" : d3.sum(dados, (dado) => dado.onibus),
            "espaco" : 12,
            "cor" : "#80b1d3",
            "suporta": 30
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
        .domain([d3.min(dados_filtrados, (d) => total_pedestres / d.suporta) -100, d3.max(dados_filtrados, (d) => total_pedestres / d.suporta) + 100])
        .range([0, larguraVis]); 
    let y = d3.scaleLinear()
        .domain([(d3.min(dados_filtrados, (d) => d.quant)) - 500, (d3.max(dados_filtrados, (d, i) => d.quant)) + 1000])
        .range([0, alturaVis])
        .rangeRound([alturaVis, 0]);
        
    let circles = grafico.selectAll('g')
        .data(dados_filtrados)
        .enter()
        .append('circle')
            .attr('cy', d => y(d.quant))
            .attr('cx', d => x(total_pedestres / d.suporta))
            .attr('r', 7)
            .style('fill', (d) => d.cor);

    grafico.selectAll('g')
        .data(dados_filtrados)
        .enter()
        .append('text')
            .attr("font-size", 15)
            .attr("transform", "translate(10, +5)") 
            .attr('y', d => y(d.quant))
            .attr('x', d => x(total_pedestres / d.suporta))
            .text((d)=> d.veiculo);
        
    grafico.append('g')
        .call(d3.axisLeft(y));
    grafico.append('g')
        .attr("transform", "translate(0," + (alturaVis) + ")")
        .call(d3.axisBottom(x));
    grafico.append("text")
        .attr("transform", "translate(-50," + ((alturaVis ))+ ") rotate(-90)")
        .text("Quantidade de Veículos em um dia");

    grafico.append("text")
        .attr("transform", "translate(30," + (alturaVis + 35) + " )")
        .text("Quantidade de Veículos Poupados por pedestres"); 

};

let barra = (dados) => {
    const alturaSVG = 80, larguraSVG = 900; 
    const margin = {top: 20, right: 20, bottom: 20, left: 20}, 
    larguraVis = larguraSVG - margin.left - margin.right, 
    alturaVis = alturaSVG - margin.top - margin.bottom;

    const total_pedestres = d3.sum(dados, (dado) => dado.total_pedestres);
    const total_ciclistas = d3.sum(dados, (dado) => dado.total_ciclistas);
    const total_carro = d3.sum(dados, (dado) => dado.carros);
    const total_onibus = d3.sum(dados, (dado) => dado.onibus);
    const total_moto = d3.sum(dados, (dado) => dado.motos);
    const total_caminhao = d3.sum(dados, (dado) => dado.caminhaos);

    let dados_filtrados = [ 
        {
            "tipo" : "Não Sustentável",
            "total": total_caminhao+ total_carro + total_moto+ total_onibus,
            "color": "#d95f02"
        },    
        { 
            "tipo" : "Sustentável",
            "total": total_ciclistas + total_pedestres,
            "color": "#1b9e77"
        }
    ];

    const total_all = total_caminhao + total_carro + total_ciclistas + total_pedestres + total_onibus + total_moto;
    let x = d3.scaleLinear()
        .domain([0, total_all])
        .range([0, larguraVis]); 
    let grafico = d3.select('#visu3')
        .append('svg')
            .attr('width', larguraVis + margin.left + margin.right)
            .attr('height', alturaVis + margin.top + margin.bottom)
            .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        
    grafico.selectAll('g')
        .data(dados_filtrados)
        .enter()
        .append('rect')
            .attr('width', d => x(d.total))
            .attr('height', alturaVis)
            .style('fill', d => d.color )
            .style('stroke-width', 2)
            .style('stroke', "rgb(255,255,255)")
            .attr('transform', (d,i) => 'translate('+(i==0?0:x(dados_filtrados[i-1].total))+',0)');
    grafico.selectAll('g')
            .data(dados_filtrados)
            .enter()
            .append('text')
                .attr('x', 10)
                .attr('y', alturaVis - 10)
                .text((d)=> (d.tipo + ' ' + Math.round((d.total/total_all)*100) + '%'))
                .style("font-weight", "bold")
                .style('fill', "#FFFFFF" )
                .attr('transform', (d,i) => 'translate('+(i == 0 ? 0 : x(dados_filtrados[i-1].total))+',0)');

}

d3.csv('https://raw.githubusercontent.com/luizaugustomm/pessoas-no-acude/master/dados/processados/dados.csv', function(dados) {
    streamGraph(dados);
    scaterPlot(dados);
    barra(dados);
});
