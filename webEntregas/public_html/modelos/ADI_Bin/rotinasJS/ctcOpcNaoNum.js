<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/ctcOpcNaoNum.js -->
/**
 * Fun��o que critica as op��es que n�o s�o num�ricas
 * @version 1.0 01/01/2000
 * @author Alexandre
 */

function ctcOpcNaoNum()
{// inicio da function ctcOpcNaoNum
	 aux=eval("document."+arrayCriticas[0]+"."+arrayAux[1]+".value;");
	 if (aux!="" && aux*1==aux)// #1
  {
		   mensagem=mensagem+salto+"Erro no campo \""+arrayAux[0]+"\". Campo alfanum�rico.";
		   if (salto=="") // #2
     {
			    componenteRetorno=arrayAux[1];
			    salto="\n";
	   	}// fim #2
	}// fim #1
}// fim da function ctcOpcNaoNum
