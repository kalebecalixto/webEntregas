<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/critSelecao.js -->
/**
 * Funcao para critica de caixas de combina��o (combo box)
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param objCampo Campo a ser criticado
 * @param opcao S = sele��o Simples, M = sele��o M�ltipla
 * @return true se o campo for v�lido, false se for inv�lido
 */


function critSelecao(objCampo, opcao)
{// inicio da function critSelecao(objCampo, opcao)
	if (opcao=="S")
	{
		if (objCampo.options[objCampo.selectedIndex].value=="")
		{
			alert(GENBA0001);
			objCampo.focus();
			return false;
		}
		return true;
	} else if (opcao=="M") //#1
			{
				ctSelecionados = 0;
				for (indSel=0;indSel<objCampo.length;indSel++)
				{
					if (objCampo.options[indSel].selected)
					{
						ctSelecionados++;
					}
				}
				if (ctSelecionados==0)
				{
					alert(GENBA0001);
					objCampo.focus();
					return false;
				}
				return true;
			}// fim #1
}// fim da function	critSelecao(objCampo, opcao)
