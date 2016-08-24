<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/formataEnderecoCompleto.js -->
/**
 * Formatação de Endereço Completo. Deve ser usado sempre que for necessário mostrar o endereço completo em um campo textArea
 * @version 1.0 08/01/2003
 * @author Lucas
 * @param cep Campo do CEP
 * @param tipoLogradouro Campo do Logradouro
 * @param nucleoLogradouro Campo do nucleo do logradouro
 * @param número Campo do número
 * @param complemento Campo do complemento
 * @param bairro Campo do bairro
 * @param municipio Campo do município
 * @param uf Campo do estado
 * @param pais Campo do país
 * @param seqDoNucleoDoEndereco Campo do sequencial do núcleo do endereço
 * @return String com endereço completo
 */

function formataEnderecoCompleto(cep, tipoLogradouro, nucleoLogradouro, numero, complemento, bairro, municipio, uf, pais, seqDoNucleoDoEndereco)
{
  return tipoLogradouro + " "   + nucleoLogradouro + ", nº " + numero + ", " + complemento + "\n" +
		 bairro         + "/"   + municipio        + "\n" 		+
	     uf             + " - "   + pais;
}
