---
title: "1 - Contagem de registros anuais do volume de Boqueirão"
date: 2017-11-12T12:08:48-03:00
draft: false
---
<div>
  <p>
  O açude Epitácio Pessoa, popularmente conhecido como açude de Boqueirão, é considerado uma das principais fontes de água do estado da Paraíba.
  Graças à sua grande capacidade e localização geográfica, o açude abastece diversas cidades paraibanas e acaba por ter uma grande importância para a
  economia. Uma cidade diretamente afetada pela distribuição aquífera de Boqueirão(açude) é a cidade de Campina Grande, conhecida nacionalmente por seu
  potencial tecnológico e sendo um destaque econômico para as cidades vizinhas.
  </p>
  <p>
  Contudo o volume de água do açude vem sendo reduzido e uma crise hídrica vem se instalando nas cidades abastecidas por essa importante fonte de água.
  A ANA(Agência Nacional das Águas) e a AESA(Agência Executiva de Gestão das Águas do Estado da Paraíba) vem registrando os volumes de água desse açude.
  Partindo dessa fonte, podemos entender melhor como a crise hídrica surgiu e como ela afeta várias cidades paraibanas.
  </p>
  <p>
  Para introduzir essa série de estudos, primeiro teremos uma visão geral de como andam os registros anuais do volume de Boqueirão. O gráfico a seguir 
  mostra a variação que o estudo sofreu ao passar dos anos. 
  </p>
</div>
<div id="vis" width=300></div>

<div>
  <p>
    Podemos ver uma constante verificação mensal entre os anos de 1990 e 1998. Nesses anos, o registro volumétrico de água era feito mensalmente e não existiam grandes variações para impactar nos resultados. Já entre os anos de 1999 e 2003 o volume era registrado diariamente, o que torna o estudo sobre esses registros
    algo muito mais preciso e podemos indicar melhor as causas da crise que aconteceu nesse período. 
  </p>
  <p>
    Contudo também podemos admitir que entre os anos de 2012 e 2016 essas empresas reduziram anualmente a quantidade de registros que faziam e esse período
    coincide com uma fase de declínio volumétrico implicando na crise hídrica de abastecimento que temos hoje. Em 2017, quando a crise chegou ao seu ápice, o 
    registro voltou a ser realizado com uma frequência maior. 
  </p>
  <p>
    Não podemos afirmar que a falta de registros com maior frequência seja um fator que esteja diretamente relacionado com a economia de água e assim um
    menor declínio volumétrico mensal, mas podemos afirmar que a preocupação com os registros desses dados vem aumentando e que temos maiores ferramentas 
    para ajudar a prever cíclos de volume de água e entender como aconteceram as crises hídricas para conseguir evitá-las no futuro.
  </p>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vega/3.0.7/vega.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-lite/2.0.1/vega-lite.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-embed/3.0.0-rc7/vega-embed.js"></script>
<script>
    const spec = "https://gist.githubusercontent.com/JuanBarros2/5f54da86f6e1f266caa8358ec95d23c8/raw/d09f3f95a6fb6b129edf234d012893c5cd0e78a3/visual1.json";
  	vegaEmbed('#vis', spec).catch(console.warn);
</script>
