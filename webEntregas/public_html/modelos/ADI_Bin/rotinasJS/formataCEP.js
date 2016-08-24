<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/formataCEP.js -->
/**
 * Função que formata o cep vindo do banco
 * @version 1.0 28/06/2002
 * @author Diego Ribeiro Drumond
 * @param campo Campo do CEP (this)
 * @param teclapress Tecla pressionada (event)
 */

function formataCEP(valor)
{
	return valor.substring(0,5)+"-"+valor.substring(5,8);
}
