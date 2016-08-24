<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/criticaNumerico.js -->
/**
 * Função para crítica de campos numéricos
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param campo Campo a ser criticado
 * @return true se o campo for válido, false se for inválido
 */

function criticaNumerico(objCampo)
{// inicio da function criticaParam(campo,tipoDado,tamMin,numDecimais)

    if (objCampo.length==0)
    {
       	objCampo.value=0;
    }

    // utilizado para resolver problemas no campo Posição do Lote na Quadra(iptImovelLote_inc.jsp)
    // o IF acima não resolveu
    if (objCampo.value=="")
    {
        objCampo.value=0;
    }

	//retira pontos
    svtrCampo = objCampo.value;
    while (strCampo.indexOf(".")>=0)
    {
      	strCampo = strCampo.replace( ".", "" );
    }

	//retira virgulas
    while (strCampo.indexOf(",")>=0)
    {
      	 strCampo = strCampo.replace( ",", "" );
    }

	strCampoAnt = strCampo;
    if (strCampo*1!=strCampo)
    {
       	alert(GENTN0099)
        return false;
    }

	if (numDecimais>0)
    {
        auxDecimais = strCampo.substring(strCampo.length - numDecimais, strCampo.length);
       	strCampo = strCampo.substring(0, strCampo.length - numDecimais);
    }

	if (numDecimais>0)
    {
       valorOriginal = strCampo + "." + auxDecimais
    } else valorOriginal = strCampo;

		if (valorOriginal==""||valorOriginal=="."||valorOriginal==".00")
		{
        	valorOriginal="0.00";
    	}

	strNomeCampo = objCampo.name;
    nomeCampoHidden = strNomeCampo.replace('txt','hid');
    if (eval("document.forms[0]."+nomeCampoHidden))
    {
        	eval("document.forms[0]."+nomeCampoHidden+".value='"+valorOriginal+"'")
    }

	if (numDecimais>0)
    {
        strCampo = inserePonto(strCampo) + "," + auxDecimais;
    } else strCampo = inserePonto(strCampo);

	if (objCampo.value!=strCampo&&objCampo.value!=strCampoAnt)
    {
       	alert(GENBA0014)
        return false;
    }
    return true;
}// fim da function criticaParam(campo,tipoDado,tamMin,numDecimais)
