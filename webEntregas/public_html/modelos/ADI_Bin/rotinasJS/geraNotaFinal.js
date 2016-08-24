<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/geraNotaFinal.js -->
/**
 * Função que gera a nota final da ajuda
 * @version 1.0 01/01/2000
 * @author Alexandre
 */

//Cor da AJUDA
corAjuda = "4C72BB";
// cor da FONTE
corFonteAjuda = "white";
//Cor da TABELA 
corCorpoTabelaAjuda = "#FFFFCC";
function geraNotaFinal() 
{// início da função geraNotaFinal

   document.writeln("<p>Todo cuidado foi tomado na elabora&ccedil;&atilde;o deste manual. No " +
                    "entanto, ele sempre pode ser aperfei&ccedil;oado ou uma nova edi&ccedil;&atilde;o " +
                    "pode estar em andamento, tendo em vista altera&ccedil;&otilde;es no pr&oacute;prio " +
                    "produto. Sugest&otilde;es e cr&iacute;ticas quanto &agrave; organiza&ccedil;&atilde;o " +
                    "ou ao conte&uacute;do deste manual devem ser dirigidas &agrave; ADI - Assessoria " +
                    "e Desenvolvimento em Inform&aacute;tica Ltda." +
                    "<div align=right><b><i><font size=-1><font color='#000000'>Endere&ccedil;o " +
                    "na Internet: </font><font color='#0000FF'><a href='http://www.adi.com.br'>www.adi.com.br</a></font></font></i></b>" +
                    "<br><b><i><font size=-1><font color='#000000'>e-mail: </font><font color='#0000FF'><a href='mailto: adi@inet.com.br'>adi@inet.com.br</a></font></font></i></b></div>" +
                    "<hr>" +
                    "<center><table BORDER=0 CELLSPACING=2 CELLPADDING=0 WIDTH='100%'>" +
                    "<tr>" +
                    "<td ROWSPAN='3' BGCOLOR='#000080'>&nbsp;</td>" +
                    "<td><b><font color='#000000'>Atendimento ao Usu&aacute;rio&nbsp;</font></b></td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td><font size=-2>Av. Assis Chateaubriand, 264 - 4<sup><u>o</u></sup> Andar - Floresta</font>" +
                    "<br><font size=-2>30150-100 - Belo Horizonte/MG</font>" +
                    "<br><font size=-2>Telefax (31)3274-0700</font>" +
                    "<br><font size=-2>Registrado no SEPIN sob N<sup><u>o</u></sup> 32.815-4</font>" +
                    "<br><b><font size=-2>Este documento n&atilde;o pode ser reproduzido, total " +
                    "ou parcialmente, sem a devida autoriza&ccedil;&atilde;o escrita da ADI " +
                    "- Assessoria e Desenvolvimento em Inform&aacute;tica Ltda.</font></b></td>" +
                    "</tr>" +
                    "</table></center>" +
                    "<center><hr></center>");
}// fim da função geraNotaFinal
