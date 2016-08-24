<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/iptValidaInscricaoCadastral.js -->
/**
 * Fun��o que verifica se inscri��o cadastral do im�vel � v�lida
 * @version 1.0 25/02/2003
 * @author Alan Nunes Voiski
 * @param campValueAux Campo a ser validado
 * @return true se o campo for v�lido, false se for inv�lido
 */


function iptValidaInscricaoCadastral(campValueAux)
{
	cont=campValueAux.length;//Tamanho do campo passado
	for(cont>=0;cont--;){
		if(campValueAux.substring(cont,cont+1)==".")//Para sempre que achar um ponto
		{
			if (!(cont==2 || cont==6 || cont==11 || cont==16 || cont==21))//verifica se est�o nestes pontos, caso n�o, estara errado
			{
				alert ("Inscri��o Inv�lida");
				return false;
			}
		}else if(cont==2 || cont==6 || cont==11 || cont==16 || cont==21){//mas se n�o achar os pontos, e estiverem nestas posi��es, tamb�m estar� errado
			alert ("Inscri��o Inv�lida");
			return false;
		}
	}

	return true;//caso contr�rio, estar� correto...
}
