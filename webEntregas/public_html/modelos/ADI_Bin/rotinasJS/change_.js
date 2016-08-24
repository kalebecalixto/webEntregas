<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/change_.js -->
/**
 * Função que atribui os valores do vetor arrayCriticas[] ao vetor this.arrayAux
 * @version 01/01/2000
 * @author Alexandre
 * @param ctc campo que recebe a crítica
 */


function change_(ctc)
{
	retorno="";
	mensagem="";
	salto="";
	for (i=0;i<ctc.length;i++) {
		this.arrayAux = arrayCriticas[ctc[i]];
		eval(arrayAux[2]+"();");
	}
	if (mensagem!="") {
		alert(GENBA0025);
		eval("document."+arrayCriticas[0]+"."+componenteRetorno+".focus();");
	}
}
