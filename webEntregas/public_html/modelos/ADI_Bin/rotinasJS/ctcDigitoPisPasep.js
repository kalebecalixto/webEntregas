<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/ctcDigitoPisPasep.js -->
/**
 * Fun��o para validar o pisPasep
 * @version 1.0 22/11/2004
 * @author lucas hermano
 * @param pisPasep pisPasep a ser validado
 * @return true se o campo for v�lido, false se for inv�lido
 */
function ctcDigitoPisPasep(pisPasep){
	/*
	PIS/PASEP - O d�gito verificador do PIS/PASEP � calculado atrav�s da seguinte regra: 
	o n�mero � composto por dez d�gitos mais um d�gito verificador. 
	Multiplique os n�meros, da esquerda para a direita, 
	respectivamente por 3 2 9 8 7 6 5 4 3 2. 
	Some os resultados das multiplica��es; 
	calcule o resto da divis�o da soma por 11 e 
	subtraia o resultado de 11. Se o resultado for 10 o d�gito � zero, caso contr�rio o d�gito � o pr�prio resultado. 
	*/
	
	//PisPasep � composto por:
	//1-sequencial de 10 d�gitos
	//2-digito verificador de 1 d�gito
	
	pisPasep=pisPasep.replace("-","");
	pisPasep=pisPasep.replace(".","");
	pisPasep=pisPasep.replace(".","");
	
	tamPP=pisPasep.length;
	if (tamPP<11)return false;//tamanho m�nimo
	
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
