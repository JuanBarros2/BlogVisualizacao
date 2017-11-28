---
title: "Barras com dados vindos de uma url"
date: 2017-11-28T09:14:03-03:00
draft: false
---
 <script src="https://d3js.org/d3.v4.min.js"></script>
  
<div class="container">
    <div class="row">
      <h2>Barras com dados vindos de uma url</h2>
    </div>
    <div class="row mychart" id="chart"/>

  <style>
    .mychart rect {
      fill: steelblue;
    }

    .mychart rect:hover {
      fill: goldenrod;
    }

    .mychart text {
      font: 12px sans-serif;
      text-anchor: left;
    }
  </style>

  <script type="text/javascript">
    function desenhaVisualizacao(dados) {
        
    }


    d3.json('/Boqueirao_Visualizacao/post/static/boqueirao-por-mes.json', function(dados) {
        desenhaVisualizacao(dados);
    });
  </script>
</div>