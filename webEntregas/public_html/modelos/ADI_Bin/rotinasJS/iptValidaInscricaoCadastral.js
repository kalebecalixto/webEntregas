<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/iptValidaInscricaoCadastral.js -->
/**
 * Função que verifica se inscrição cadastral do imóvel é válida
 * @version 1.0 25/02/2003
 * @author Alan Nunes Voiski
 * @param campValueAux Campo a ser validado
 * @return true se o campo for válido, false se for inválido
 */


function iptValidaInscricaoCadastral(campValueAux)
{
	cont=campValueAux.length;//Tamanho do campo passado
	for(cont>=0;cont--;){
		if(campValueAux.substring(cont,cont+1)==".")//Para sempre que achar um ponto
		{
			if (!(cont==2 || cont==6 || cont==11 || cont==16 || cont==21))//verifica se estão nestes pontos, caso não, estara errado
			{
				alert ("Inscrição Inválida");
				return false;
			}
		}else if(cont==2 || cont==6 || cont==11 || cont==16 || cont==21){//mas se não achar os pontos, e estiverem nestas posições, também estará errado
			alert ("Inscrição Inválida");
			return false;
		}
	}

	return true;//caso contrário, estará correto...
}
