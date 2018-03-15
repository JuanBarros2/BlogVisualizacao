---
title: "Meus 50 artistas mais ouvidos"
date: 2018-03-15T10:44:00-03:00
draft: false
---
<!-- Main -->
<div id="main">
    <svg width="930" height="630">
    </svg>
</div>
<style>
.nodes image {
    clip-path: circle(40% at 50% 50%);
    -webkit-clip-path: circle(40% at 50% 50%);
    cursor: pointer;
}
.label {
    font-family: 'Raleway', sans-serif;
}
div.tooltip {
    position: absolute;
    text-align: center;
    width: 110px;
    font-family: 'Raleway', sans-serif;
    font-size: 15px;
    background: #2F2F2F;
    color: #FFF;
    pointer-events: none;
    z-index: 100;
}
.greyed {
    opacity: 0.1;
}
.legendlabel {
    font-size: 12px;
    text-transform: capitalize;
}
.legend-hover {
    font-weight: bold;
}
.legendlabel:hover{
    font-weight: bold;
}
</style>

<!-- Scripts -->
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-legend/2.24.0/d3-legend.js"></script>
<script src="/BlogVisualizacao/post/static/top50.js"></script>
