/**
 * Função que escreve a barra de ajuda nos arquivos de ajuda do sistema
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param inicial Parâmetro depreciado, passe " ".
 * @param sistema Nome do sistema
 * @param versao  Versão
 * @param codTela Código da tela
 * @param enderecoAjuda Endereço do arquivo de ajuda
 * @return true se o campo for válido, false se for inválido
 */


//Cor da AJUDA
corAjuda = "4C72BB";
// cor da FONTE
corFonteAjuda = "white";
//Cor da TABELA


corCorpoTabelaAjuda = "#FFFFCC";

function geraBarraAjuda(inicial,sistema,versao, codTela, enderecoAjuda)
{// início da function geraBarraAjuda
   //Escreve a barra na ajuda geral
   document.writeln("<table BORDER=0 CELLSPACING=0 CELLPADDING=0 WIDTH='100%' NOSAVE >" +
                     "<tr NOSAVE>" +
                     "<td WIDTH='90%'><img SRC='../../../../../../ADI_Programacao/ADI_MaxNetADI/package/ajuda/bin/imagens/tlbAjuda.jpg'></td>" +
                     "<td WIDTH='10%'><font size=2 color='black'>" + sistema + versao + "</font></td>" +
                     "</tr>" +
                     "<tr>" +
                     "<td bgcolor='" + corAjuda + "' valign=top>" +
                     "<A onmouseover=\"javaScript:self.status = 'Voltar'; return true;\"" +
                     "onmouseout=\"javaScript:self.status = ''; return true;\"" +
                     "href='javaScript:parent.mainAjuda.history.back();'><img SRC='../../../../../../ADI_Programacao/ADI_MaxNetADI/package/ajuda/bin/imagens/tlbVoltar.jpg' alt='Voltar' border=0></A>"+
                     "<A onmouseover=\"javaScript:self.status = 'Topo'; return true;\"" +
                     "onmouseout=\"javaScript:self.status = ''; return true;\"" +
                     "href='../ajuda/ajuda.html#imagemTopo'><img SRC='../../../../../../ADI_Programacao/ADI_MaxNetADI/package/ajuda/bin/imagens/tlbTopo.jpg' border=0 alt='Topo'></a>" +
                     "<A onmouseover=\"javaScript:self.status = 'Avançar'; return true;\"" +
                     "onmouseout=\"javaScript:self.status = ''; return true;\"" +
                     "href='javaScript:parent.mainAjuda.history.go(1);'><img SRC='../../../../../../ADI_Programacao/ADI_MaxNetADI/package/ajuda/bin/imagens/tlbAvancar.jpg' border=0 alt='Avançar'></a>");

   document.writeln( "</td>" +
                     "<td width='10%' bgcolor='" + corAjuda + "'>" +
                     "</td>" +
                     "</tr>" +
                     "</table>");
}// fim da function geraBarraAjuda