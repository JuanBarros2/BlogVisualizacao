---
title: "3 - Observando média mensal de volumes"
date: 2017-11-14T14:08:27-03:00
draft: false
---



<script src="https://cdnjs.cloudflare.com/ajax/libs/vega/3.0.7/vega.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-lite/2.0.1/vega-lite.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-embed/3.0.0-rc7/vega-embed.js"></script>
<script>
    const spec = "https://gist.githubusercontent.com/JuanBarros2/5f54da86f6e1f266caa8358ec95d23c8/raw/79df856c5f44872563ac40ec8087e9f6444d58d8/visual3.json";
  	vegaEmbed('#vis', spec).catch(console.warn);
</script>

<p>
  Finalizando o estudo sobre o volume do açude de Boqueirão, focaremos agora no perfil anual que é esperado para o reservatório, ou seja,
  como normalmente é dada a distribuição de volumes baseada na média mensal relatada.
</p>
<p>
  Como já relatado anteriormente, o açude vem perdendo volume durante os últimos 7 anos e a estiagem prolongada é um dos motivos para a
  situação crítica no abastecimento. Para entender melhor a situação, utilizaremos os dados fornecidos para entender melhor o que aconteceu
  nos últimos anos, buscando interpretar os períodos do ano que apresentam picos ou baixas consideráveis.
</p>
<div id="vis" width=300></div>
<p>
  Podemos notar que entre os anos de 2008 e 2011 a quantidade observada mensalmente ganhava picos nos meses de Março e Abril, período que coincide 
  com o outono nessa região. No fim do ano, vemos uma declínio devido o aumento das temperaturas e a menor quantidade de chuva fechando assim o 
  ciclo anual. Contudo nos anos posteriores esse ciclo deixou de existir e não existem picos e na maior parte o nível apenas reduziu. 
</p>
<p>Ao chegar mais próximo de 2017 notamos que o nível reduz com intensidade menor e que ao chegar em Abril de 2017 alcançamos o menor valor
registrado. É importante destacar que no primeiro mês depois desse recorde (negativo) o volume cresceu bastante, mas perdeu velocidade nos meses
que sucederam. Isso poderia ser um reflexo do fim do racionamento adotado nos últimos anos visto que se mostrou eficaz.</p>
<p>
  Por fim, temos esse alerta silencioso de que o volume do açude vem perdendo força em seu crescimento e isso pode ser um problema futuro.
  As águas do rio São Franscisco são constante, porém não são inesgotáveis para nós paraibanos. Elas viajam quilometros para encontrar o 
  nosso açude e então ser distribuída para várias cidades. Com a estiagem que persiste, a única solução é economizar ao máximo e evitar cometer
  os mesmos erros de outrora.
</p>