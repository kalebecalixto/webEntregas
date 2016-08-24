<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/ctcDigitoPisPasep.js -->
/**
 * Função para validar o pisPasep
 * @version 1.0 22/11/2004
 * @author lucas hermano
 * @param pisPasep pisPasep a ser validado
 * @return true se o campo for válido, false se for inválido
 */
function ctcDigitoPisPasep(pisPasep){
	/*
	PIS/PASEP - O dígito verificador do PIS/PASEP é calculado através da seguinte regra: 
	o número é composto por dez dígitos mais um dígito verificador. 
	Multiplique os números, da esquerda para a direita, 
	respectivamente por 3 2 9 8 7 6 5 4 3 2. 
	Some os resultados das multiplicações; 
	calcule o resto da divisão da soma por 11 e 
	subtraia o resultado de 11. Se o resultado for 10 o dígito é zero, caso contrário o dígito é o próprio resultado. 
	*/
	
	//PisPasep é composto por:
	//1-sequencial de 10 dígitos
	//2-digito verificador de 1 dígito
	
	pisPasep=pisPasep.replace("-","");
	pisPasep=pisPasep.replace(".","");
	pisPasep=pisPasep.replace(".","");
	
	tamPP=pisPasep.length;
	if (tamPP<11)return false;//tamanho mínimo
	
	//Separando codigo seguindo ordem da montagem descrita acima
	sequencial = pisPasep.substring(0,tamPP-1);
	dig1       = pisPasep.substring(tamPP-1,tamPP);
	soma 	   = 0;
	
	digitos    = new Array( 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 );
	
	for( x=0; x<tamPP-1; x++ )
		soma += pisPasep.charAt(x) * digitos[x];

	resultado = 11 - ( soma % 11 );
	
	if( resultado > 9 )
		resultado = 0;
	
	if( dig1 != resultado )
		return false;
	
	return true;

}
