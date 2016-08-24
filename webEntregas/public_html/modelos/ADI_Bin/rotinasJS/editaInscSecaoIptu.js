<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/editaInscSecaoIptu.js -->
/**
 * Função para editar a inscrição de seção de logradouros do iptu
 * @version 1.0 09/12/2002
 * @author Alan
 * @param parametro1 Distrito
 * @param parametro2 Setor
 * @param parametro3 Quadra
 * @param parametro4 Lote
 * @param parametro5 Unidade
 * @param parametro6 Sub-unidade
 * @return Variável formatada
 * @see acreZero
 */

function editaInscSecaoIptu(parametro1,parametro2,parametro3,parametro4,parametro5,parametro6)
{
	parametro1 = acreZero(parametro1,2);
	parametro2 = acreZero(parametro2,3);
	parametro3 = acreZero(parametro3,4);
	parametro4 = acreZero(parametro4,6);
	parametro5 = acreZero(parametro5,5);
	inscSecaoFormatada = parametro1 +"."+parametro2 +"."+parametro3 +"."+parametro4+"."+parametro5+(parametro6 != ""?"-"+parametro6.toUpperCase():"");
	return inscSecaoFormatada;
}
