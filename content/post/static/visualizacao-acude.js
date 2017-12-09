let streamGraph = (dados) => {
    let layerName = ["carros", "motos","total_ciclistas", "caminhoes", "onibus"];

    dados = dados.filter((dado) => dado.local == "jackson" );

    var stack = d3.stack().keys(layerName).offset(d3.stackOffsetWiggle),
    layers0 = stack(dados),
    layers = layers0;

    var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

    var x = d3.scaleLinear()
    .domain([0, dados.length - 1])
    .range([0, width]);

    var y = d3.scaleLinear()
    .domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
    .range([height, 0]);

    var z = d3.scaleLinear()
    .domain([0, layerName.length])
        .range(["blue", "yellow"])
        .clamp(true);

    var area = d3.area()
    .x(function(d, i) { return x(i); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); });

    svg.selectAll("path")
    .data(layers0)
    .enter().append("path")
    .attr("d", area)
    .attr("fill", function(d) { 
        return z(d.index); 
    });

    function stackMax(layer) {
    return d3.max(layer, function(d) { return d[1]; });
    }

    function stackMin(layer) {
    return d3.min(layer, function(d) { return d[0]; });
    }
}

let heatmap = (dados) => {  
};

d3.csv('https://raw.githubusercontent.com/luizaugustomm/pessoas-no-acude/master/dados/processados/dados.csv', function(dados) {
    streamGraph(dados);
    heatmap(dados);
});

