<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/ctcObrAlfaNum.js -->
/**
 * Fun��o que critica a obrigatoriedade de campos alfaNum�ricos
 * @version 1.0 01/01/2000
 * @author Alexandre
 */

function ctcObrAlfaNum()
{// inicio da function ctcObrAlfaNum
	aux=eval("document."+arrayCriticas[0]+"."+arrayAux[1]+".value;");
	if (aux=="") //#1
	{
		mensagem=mensagem+salto+"Erro no campo \""+arrayAux[0]+"\". Campo Obrigat�rio.";
		if (salto=="") //#2
		{
			componenteRetorno=arrayAux[1];
			salto="\n";
		}// fim #2
	}// fim #1
}// fim da function ctcObrAlfaNum


