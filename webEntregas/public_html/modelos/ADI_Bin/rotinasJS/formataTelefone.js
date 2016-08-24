<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/formataTelefone.js -->
/**
 * Função que cria uma mascara para Telefone
 * @version 1.0 11/06/2002
 * @author Wellington
 * @param campo Campo do Telefone (this)
 * @param teclapres Tecla pressionada (event)
 */

function formataTelefone(campo,pTeclaPres) 
{ // inicio da função formataTelefone(campo,pTeclaPres) 
	var vr,tam,campoAux,campoIndex ;
	vr = campo.value;
	tam = vr.length;
	if (pTeclaPres.keyCode > 47 && pTeclaPres.keyCode <58) //#1
	{ 
		if (tam == 4) //#2
		{ 
			campo.value = vr.substr(0,4)+"-";
		} else  if (tam ==8 )//#3
					{
						campoIndex = vr.indexOf("-");
						if (campoIndex < 0) //#4
						{
							campoAux = vr.substr(4,8);
							campo.value = vr.substr(0,4)+"-"+campoAux;
						}// fim #4
					} else  if (tam == 9 ) //#5
								{ 
									alert(GENBA0020);
									pTeclaPres.keyCode = null;
								}// fim #5
	} else pTeclaPres.keyCode = null;
}// fim da função formataTelefone(campo,pTeclaPres) 
