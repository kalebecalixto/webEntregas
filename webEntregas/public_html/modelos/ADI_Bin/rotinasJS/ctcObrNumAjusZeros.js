<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/ctcObrNumAjusZeros.js -->
/**
 * Função que critica a obrigatoriedade de ajuste de zeros em campos numéricos
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @see tiraCaracterer
 */

function ctcObrNumAjusZeros()
{// inicio da function ctcObrNumAjusZeros()
  aux1=tiraCaracter(eval("document."+arrayCriticas[0]+"."+arrayAux[1]+".value"),' ','T');
	 aux2="";
	 for (i1=0;i1<arrayAux[3];i1++)
		  aux2="0"+aux2;
	 aux3=aux2+aux1;
	 len=aux3.length;
	 aux3=aux3.substring(len-arrayAux[3],len);
	 if (aux3==aux2 || aux1*1!=aux1) //#1
  {
		  mensagem=mensagem+salto+"Erro no campo \""+arrayAux[0]+"\". Campo numérico, obrigatório, maior que zero.";
		  if (salto=="") //#1
    {
			   componenteRetorno=arrayAux[1];
			   salto="\n";
    } else eval("document."+arrayCriticas[0]+"."+arrayAux[1]+".value=aux3;");
  }//#1
}// fim da function ctcObrNumAjusZeros()
