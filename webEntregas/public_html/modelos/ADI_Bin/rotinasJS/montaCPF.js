<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/montaCPF.js -->
/**
 * Funcao para formatar um CPF (coloca pontos e hífen)
 * @param cpf CPF sem formatação
 * @return CPF formatado (string)
 */
function montaCPF(cpf)
{
	tamCPF = cpf.length;
	cpfParte1 = cpf.substring(0,3);
	cpfParte2 = cpf.substring(3,6);
	cpfParte3 = cpf.substring(6,9);
	cpfDigito = cpf.substring(9);
	cpf = cpfParte1 + "." +cpfParte2+ "." +cpfParte3+ "-" +cpfDigito ;
	return cpf;
}
