<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/email.js -->
/*
Informação:

Arquivo com funções para preencher o frmEmail.
@autor : Júnio
data : 04/11/2008
modificacao: 11/12/2008
alteracao efetuada: mudança das propriedades para properties
*/

/**
 * Monta email com design padrão
 *
 * @version 1.0 04/11/2008
 * @author Júnio
 * @param frasePrin = frase inicial do email. Ex: "O seguinto setor foi incluído: "
		  corpo = corpo do email, seu tamanho deve ser sempre par. Ex: corpo[0] = "Exercício:", corpo[1] = "2008"
		  fraseFim = frase final do email. Ex: "Clique aqui para receber o processo"
		  caminhoFim = o caminho para o qual a fraseFim irá encaminhar. Ex: "/ADI_Intranet_Root/ADI_Programacao/ADI_MaxNetADI/package/protocolo/movimentacao/receber/proReceberProcesso_inc.jsp?seqExercicio=2007&numProtocolo=1506&seqVolume=1&seqVolumeEnviado=1"
 * @return o html do corpo do email
 */
function preencheEmail( frasePrin, corpo, fraseFim, caminhoFim )
{
    var html = "";
    html = "<body leftmargin='0' topmargin='0' marginwidth='0' marginheight='0'>";
    html += "<table width='100%' height='100%' border='0' cellpadding='0' cellspacing='0'>";
    html += "<tr><td align='center' valign='middle'><table width='70%' border='0' cellpadding='3' cellspacing='3' bgcolor='E4EDF6'>";
    html += "<tr><td align='right'><img src='/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/logotiposADI/simbAdiNewPeqMove.gif' width='195' height='91'></td></tr>";
    html += "<tr><td height='20'><img src='/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/blank.gif' width='1' height='1'></td></tr>";
    html += "<tr><td align='center' valign='middle' background='/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/imagensDeFundo/maxnetadiTransparente2.jpg' bgcolor='#FFFFFF'>";
    html += "<p>&nbsp;</p><table width='95%' height='95%' border='0' cellpadding='0' cellspacing='0'>";

    html += "<font color='#000000'><strong>"+frasePrin+"</font></strong></br></br>";

    html += "<tr><td>";

    for (i = 0; i < corpo.length; i = i+2)
    {
            html += "<font color='#0000FF'></br>"+corpo[i]+"</font><font color='#000000'><strong>"+corpo[i+1]+"</strong></font>";
    }	

    if (fraseFim != null && fraseFim != "")
    {
            html += "<p align='center'>";

            if (caminhoFim != null && caminhoFim != "")
                    html +="<a href='"+caminhoFim+"'>";

            html += fraseFim;

            if (caminhoFim != null && caminhoFim != "")
                    html+= "</a>";

            html += "</p>";
    }

    html += "</td></tr></table><p>&nbsp;</p></td></tr><tr><td align='right'><em><font size='1'> ADI - Assessoria e Desenvolvimento em Informática </br> Av. Assis Chateaubriand, 264";
    html += "3° andar - Floresta - CEP: 30150-100 - Belo Horizonte - MG </br> Tel: 31 3274-0700 e-mail: adi@adi.com.br - www.adi.com.br</font></em></td></tr></table></td></tr></table>";
    return html;
}