<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/checaCPF.js -->
/**
 * Função que verifica valida o cpf
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param CPF CPF a ser verificado
 * @return boolean (true p/ válido, false p/ inválido)
 */

 function checaCPF (CPF)
 {// inicio da function checaCPF

    CPF2 = CPF.replace("-","");
    CPF2 = CPF2.replace(".","");
    CPF2 = CPF2.replace(".","");
	CPF = CPF2;
	if (CPF.length != 11 || CPF == "00000000000" || CPF == "11111111111" ||
		   CPF == "22222222222" ||	CPF == "33333333333" || CPF == "44444444444" ||
		   CPF == "55555555555" || CPF == "66666666666" || CPF == "77777777777" ||
		   CPF == "88888888888" || CPF == "99999999999")
		   return false;

	soma = 0;
	for (i=0; i < 9; i ++)
		soma += parseInt(CPF.charAt(i)) * (10 - i);
	resto = 11 - (soma % 11);
	if (resto == 10 || resto == 11)
		resto = 0;
	if (resto != parseInt(CPF.charAt(9)))
		return false;
	soma = 0;
	for (i = 0; i < 10; i ++)
		soma += parseInt(CPF.charAt(i)) * (11 - i);
	resto = 11 - (soma % 11);
	if (resto == 10 || resto == 11)
		resto = 0;
	if (resto != parseInt(CPF.charAt(10)))
		return false;
	return true;
 }// fim da function checaCPF
