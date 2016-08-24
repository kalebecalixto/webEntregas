<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/geraCabecalho.js -->
/**
 * Função que gera o cabeçalho da ajuda
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param texto Texto para o cabeçalho
 * @param target Janela da ajuda
 */


 //Cor da AJUDA
corAjuda = "4C72BB";
// cor da FONTE
corFonteAjuda = "white";
//Cor da TABELA 
corCorpoTabelaAjuda = "#FFFFCC";
function geraCabecalho(texto,target) 
{// início da função geraCabecalho 
  //Escreve o inicio da tabela

       document.writeln("<table cellpadding=0 border=0 cellspacing=0 bgcolor = '" + corAjuda +"' width='100%'><tr><td> " +
                   "<table cellpadding=0 cellspacing=0 width='100%'>" +
                   "<tr>" +
                   "<td><b><font color='white'><font size=+1>" + texto + "</font></font></b><a NAME='" +
                   target + "'></a></td>" +
                   "</tr>" +
                   "<tr><td bgcolor='" + corCorpoTabelaAjuda + "'>");
}// fim da função geraCabecalho
