<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/ctcDigitoTituloEleitor.js -->
/**
 * Função para validar título de Eleitor
 * @version 1.0 12/11/2004
 * @author Alan Nunes Voiski
 * @param titEleitor título a ser validado
 * @param retEstado  qualquer valor, caso não deseje retorno do estado, não passar este parametro
 * @return retEstado não informado:true para titulo válido ou false para inválido
 * @return retEstado informado:false para inválido ou UF do título
 */
function ctcDigitoTituloEleitor(titEleitor,retEstado){
	//Titulo de eleitor é composto por:
	//1-sequencial de 8 digitos
	//2-código do estado de 2 digitos
	//2.1-código do estado vai de 01 a 28, sendo 28 exterior e o resto dos estados brasileiros
	//	=>				 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09 | 10 | 11 | 12 | 13 | 14
	ufDig = new Array(  'SP','MG','RJ','RS','BA','PR','CE','PE','SC','GO','MA','PB','PA','ES',
	//	=>				 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28
						'PI','RN','AL','MT','MS','DF','SE','AM','RO','AC','AP','RR','TO','ZZ');
	//3-digito verificador de 2 digitos
	//3.1-1 digito=modulo 11 do sequencial
	//3.2-2 digito=modulo 11 do código do estado seguido do digito verificador 1
	titEleitor=titEleitor.replace("/","");
	tamTit=titEleitor.length;
	if (tamTit<5)return false;//tamanho mínimo

	//Separando codigo seguindo ordem da montagem descrita acima
	sequencial=titEleitor.substring(0,tamTit-4);
	estado=titEleitor.substring(tamTit-4,tamTit-2);
	dig1=titEleitor.substring(tamTit-2,tamTit-1);
	dig2=titEleitor.substring(tamTit-1,tamTit);
	
	//Verificando digitos verificadores, se digito do estado corresponde
	if(!(dig1==modulo11(sequencial) && dig2==modulo11(estado+dig1) && estado*1<29 && estado*1>0))
		return false;
	
	//Caso seja retEstado seja informado qualquer valor, restornará sigla do estado
	if(retEstado!=null)if(retEstado!='')return ufDig[estado*1-1]
	return true;
}