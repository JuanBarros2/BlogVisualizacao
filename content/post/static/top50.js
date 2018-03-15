const svg = d3.select('svg'),
    width = +svg.attr('width'),
    height = +svg.attr('height');

const tooltipDiv = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0.2);


const color = d3.scaleOrdinal(d3.schemeCategory20);

const simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(d => d.id))
    .force('collide', d3.forceCollide(40))
    .force('center', d3.forceCenter((width / 2), height / 2))
    .force('genreX', d3.forceX(genreX))
    .force('genreY', d3.forceY(genreY));

svg.append('g')
    .attr('class', 'category-legend')
    .attr('transform', 'translate(20,20)');

const legend = d3.legendColor()
    .shape('circle')
    .shapeRadius('5')
    .orient('vertical')
    .classPrefix('legend');


d3.json('/BlogVisualizacao/post/static/top50.json', function (error, graph) {
    if (error) throw error;

    let types = d3.set(graph.edges.map(e => e.type)).values();
    types.filter((item, pos) => types.indexOf(item) == pos);
    color.domain(types);

    legend
        .scale(color)
        .on('cellover', c => {
            d3.selectAll('.links line')
                .transition().duration(200)
                .attr('opacity', d => d.type === c ? 1 : 0);

            d3.selectAll('.node image')
                //.filter(n => graph.edges.filter(e => e.type === c).find(e => e.source.id === n.id || e.target.id === n.id) !== undefined)
                .classed('greyed', n => n.genres.indexOf(c) == -1)
                .transition().duration(200)
                .attr('x', n => (n.genres.indexOf(c) == -1)? -25: -35)
                .attr('y', n => (n.genres.indexOf(c) == -1)? -25: -35)
                .attr('width', n => (n.genres.indexOf(c) == -1)? 50: 70)
                .attr('height', n => (n.genres.indexOf(c) == -1)? 50: 70);
        })
        .on('cellout', () => {
            d3.selectAll('.links line')
                .transition().duration(200)
                .attr('opacity', 1);

            d3.selectAll('.node image')
                .classed('greyed', n => false)
                .attr('x', n => -25)
                .attr('y', n => -25)
                .attr('width', 50)
                .attr('height', 50);
        });

    svg.select('.category-legend')
        .call(legend);

    const link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(graph.edges)
        .enter()
        .append('line')
        .style('stroke', e => color(e.type))
        .attr('stroke-width', 1)
        .on('mouseover', d => {
            d3.selectAll('.legendlabel')
                .filter(l => l === d.type)
                .classed('legend-hover', true);
        })
        .on('mouseout', () => {
            d3.selectAll('.legendlabel')
                .classed('legend-hover', false);
        });

    const nodeGroup = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('.node')
        .data(graph.nodes.sort((a,b)=> b.num - a.num))
        .enter()
        .append('g')
        .attr('class', 'node')
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));

    nodeGroup
        .append('image')
        .attr('xlink:href', d => d.img)
        .attr('x', -25)
        .attr('y', -25)
        .attr('width', 50)
        .attr('height', 50)
        .on('mouseover', (d, i, nodes) => {
            svg.selectAll('.links line')
                .transition()
                .duration(200)
                .attr('opacity', e => d.id === e.source.id || d.id === e.target.id ? 1 : 0);

            tooltipDiv.transition()
                .duration(200)
                .style('opacity', 0.9);
            tooltipDiv.html(`${d.name}<br> ${d.num}º lugar`)
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px");

            d3.selectAll(nodes)
                .classed('greyed', n => n.id !== d.id && !isAdjacent(d, n))
                .transition().duration(200)
                .attr('x', n => isAdjacent(d, n) ? -40 : -25)
                .attr('y', n => isAdjacent(d, n) ? -40 : -25)
                .attr('width', n => (n.id === d.id || isAdjacent(d, n))? (isAdjacent(d, n) ? 80 : 150) : 50)
                .attr('height', n => (n.id === d.id || isAdjacent(d, n))? (isAdjacent(d, n) ? 80 : 150) : 50);

            d3.select(nodes[i])
                .transition()
                .duration(200)
                .attr('x', -75)
                .attr('y', -75)
                .attr('width', 150)
                .attr('height', 150);

            d3.selectAll('.legendlabel')
                .filter(l => {
                    return graph.edges
                        .filter(e => e.source.id === d.id || e.target.id === d.id)
                        .map(e => e.type)
                        .includes(l);
                })
                .classed('legend-hover', true);

        })
        .on('mouseout', (d, i, nodes) => {
            svg.selectAll('.links line')
                .transition()
                .duration(200)
                .attr('opacity', 1)
                .attr('stroke-width', 1.5)
                .style('stroke', e => color(e.type));

            tooltipDiv.transition()
                .duration(200)
                .style('opacity', 0);

            d3.selectAll(nodes)
                .classed('greyed', false)
                .transition()
                .duration(200)
                .attr('x', -25)
                .attr('y', -25)
                .attr('width', 50)
                .attr('height', 50);

            d3.selectAll('.legendlabel')
                .classed('legend-hover', false);
            const node = d3.selectAll('.node')
                .filter(n => d.id === n.id);

            node.select('rect')
                .remove();

            node.select('text')
                .remove();
        })
        .on('click', d => window.open(d.url));

    simulation
        .nodes(graph.nodes)
        .on('tick', ticked);

    simulation.force('link')
        .links(graph.edges);

    function ticked() {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d =>  d.target.x)
            .attr('y2', d => d.target.y);

        nodeGroup.attr('transform', d => `translate(${d.x}, ${d.y})`);
    }

    function isAdjacent(source, node) {
        return graph.edges
            .filter(e => e.source.id === source.id || e.target.id === source.id)
            .find(e => e.target.id === node.id || e.source.id === node.id) !== undefined;
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

function genreX(n) {
    return width /2;

}

function genreY(n) {
    return height / 2;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}