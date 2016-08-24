<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/formataEnderecoCompleto.js -->
/**
 * Formata��o de Endere�o Completo. Deve ser usado sempre que for necess�rio mostrar o endere�o completo em um campo textArea
 * @version 1.0 08/01/2003
 * @author Lucas
 * @param cep Campo do CEP
 * @param tipoLogradouro Campo do Logradouro
 * @param nucleoLogradouro Campo do nucleo do logradouro
 * @param n�mero Campo do n�mero
 * @param complemento Campo do complemento
 * @param bairro Campo do bairro
 * @param municipio Campo do munic�pio
 * @param uf Campo do estado
 * @param pais Campo do pa�s
 * @param seqDoNucleoDoEndereco Campo do sequencial do n�cleo do endere�o
 * @return String com endere�o completo
 */

function formataEnderecoCompleto(cep, tipoLogradouro, nucleoLogradouro, numero, complemento, bairro, municipio, uf, pais, seqDoNucleoDoEndereco)
{
  return tipoLogradouro + " "   + nucleoLogradouro + ", n� " + numero + ", " + complemento + "\n" +
		 bairro         + "/"   + municipio        + "\n" 		+
	     uf             + " - "   + pais;
}
