<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/ctcObrNaoNum.js -->
/**
 * Fun��o que critica a obrigatoriedade dos campos n�o num�ricos
 * @version 1.0 01/01/2000
 * @author Alexandre
 */

function ctcObrNaoNum()
{// inicio da function ctcObrNaoNum
	  aux=eval("document."+arrayCriticas[0]+"."+arrayAux[1]+".value;");
	  men="Campo obrigat�rio.";
	  if (aux!="") men="Campo n�o num�rico.";
	  if (aux*1==aux) //#1
   {
	 	   mensagem=mensagem+salto+"Erro no campo \""+arrayAux[0]+"\". "+men;
   		 if (salto=="") //#2
      {
			     componenteRetorno=arrayAux[1];
			     salto="\n";
		    }// fim #2
	  }// fim #1
}// fim da function ctcOpcNaoNum ctcObrNaoNum
