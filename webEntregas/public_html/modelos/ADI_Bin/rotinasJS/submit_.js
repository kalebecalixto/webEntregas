<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/submit_.js -->
/**
 * Fun��o que faz o submit das telas
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param ctc Campo para mudan�a
 */

function submit_(ctc)
{// inicio da submit_(ctc)
	change_(ctc);
	if (mensagem=="")
		eval("document."+arrayCriticas[0]+".submit()");
}// fim da function submit_(ctc)
