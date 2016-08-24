<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/formataRota.js -->
/**
 * Fun��o que formata o c�digo da rota
 * @version 1.0 22/10/2003
 * @author lucas hermano
 * @param localidade c�digo da localidade(5 casas)
 * @param setor c�digo do setor(2 casas)
 * @param rota c�digo da rota(3 casas)
 * @param face c�digo da face(2 casas)
 * @param sequencial c�digo do sequencial(3 casas)
 
 */

function formataRota(localidade,setor,rota,face,sequencial)
{
	auxFormatacao = acreZero(localidade,5)+"."+acreZero(setor,2)+"."+acreZero(rota,3)+"."+acreZero(face,2);
	
	if(sequencial != "")
		auxFormatacao += "."+acreZero(sequencial,3);
	
	return auxFormatacao;
	
}
