<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/geraRodape.js -->
/**
 * Fun��o que gera o rodap� da ajuda
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param target Janela da ajuda
 * @param texto Texto para o cabe�alho
 */


//Cor da AJUDA
corAjuda = "4C72BB";
// cor da FONTE
corFonteAjuda = "white";
//Cor da TABELA
corCorpoTabelaAjuda = "#FFFFCC";
function geraRodape(target,texto)
{// inicio da fun��o geraRodape
   //Escreve o o rodape da tabela
     document.writeln("</td> " +
                    "<tr>" +
                    "  <td bgcolor='" + corAjuda + "' align='right' valign='center'>" +
                    "<A href='" + target + "'><IMG height=19 alt='" + texto + "'" +
                    " src='/ADI_Intranet_Root/ADI_Programacao/ADI_MaxNetADI/package/ajuda/bin/imagens/tlbTopo.jpg' width=18 border=0></a></td>" +
                    "</td>" +
                    "</tr>" +
                    "</table></table>");
}// fim da fun��o geraRodape
