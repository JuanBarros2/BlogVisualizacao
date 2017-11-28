---
title: "2 - Ranqueado médias anuais dos últimos dez anos"
date: 2017-11-13T14:08:20-03:00
draft: false
---
<script src="https://d3js.org/d3.v4.min.js"></script>

<style>
.floating-box {
    float: left;
    margin: 10px;
    display: block;
}
</style>

<div id="vis" width=300 class="floating-box" ></div>
<div>
  <p>
    Na última década o açude de Boqueirão sofreu uma crise hídrica jamais vista. Seu nível chegou abaixo de 5% em 2017 e mesmo com racionamento de
    água a crise quase levou o açude a secar totalmente. Desde o ano de 2011 tivemos uma queda anual considerável, ano após ano até chegar aos níveis
    atuais.
  </p>
  <p>
    Ao receber as águas do rio São Francisco foi possível parar o esgotamento completo do manancial, contudo os níveis ainda continuam críticos e
    a situação demanda cautela, pois ainda temos uma porcentagem muito pequena de água. Apesar disso, o racionamento teve seu fim em várias cidades
    e a decisão gerou polêmica visto que índices recentes mostram uma redução na recuperação aquífera.
  </p>
  <p>
    Com base nesse cenário, temos através dessa visualização a média volumétrica em porcentagem do açude ao longo dos últimos 10 anos.
  </p>
</div>
<div>
  <p>
    Fica muito evidente perceber que nos anos de 2012 e 2013 houve uma queda drástica no volume total mostrando uma queda de aproximadamente 25% em apenas
    um ano. Porém o racionamento só veio começar anos depois quando o volume já estava em níveis preocupantes. É importante destacar também que a perda
    de água não se dá apenas ao fato do consumo ser elevado mas também da evaporação que acontece naturalmente. Isso implica dizer que quanto mais água
    temos exposta ao sol, mais perdemos volume aquífero. Existem países que sofrem intensamente com a evaporação e precisam colocar várias esferas sobre o 
    reservatório para reduzir a área de exposição ao sol, e assim, reter mais água.
  </p>
  <p>
    Podemos concluir então que os dados de 2012 e 2013, se analisados com atenção, poderiam ter amenizado o impacto sofrido atualmente pela falta de água
    visto que poderíamos ter utilizado estratégias prévias para reduzir o consumo (racionamento) e até mesmo a utilização de técnicas realizadas em outras
    partes do mundo para evitar a evaporação e perda de água para a atmosfera.
  </p>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vega/3.0.7/vega.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-lite/2.0.1/vega-lite.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-embed/3.0.0-rc7/vega-embed.js"></script>
<script>
    const spec = "https://gist.githubusercontent.com/JuanBarros2/5f54da86f6e1f266caa8358ec95d23c8/raw/d09f3f95a6fb6b129edf234d012893c5cd0e78a3/visual2.json";
  	vegaEmbed('#vis', spec).catch(console.warn);
</script>
