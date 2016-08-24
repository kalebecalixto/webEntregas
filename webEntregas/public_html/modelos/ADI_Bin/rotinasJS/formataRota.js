<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/formataRota.js -->
/**
 * Função que formata o código da rota
 * @version 1.0 22/10/2003
 * @author lucas hermano
 * @param localidade código da localidade(5 casas)
 * @param setor código do setor(2 casas)
 * @param rota código da rota(3 casas)
 * @param face código da face(2 casas)
 * @param sequencial código do sequencial(3 casas)
 
 */

function formataRota(localidade,setor,rota,face,sequencial)
{
	auxFormatacao = acreZero(localidade,5)+"."+acreZero(setor,2)+"."+acreZero(rota,3)+"."+acreZero(face,2);
	
	if(sequencial != "")
		auxFormatacao += "."+acreZero(sequencial,3);
	
	return auxFormatacao;
	
}
