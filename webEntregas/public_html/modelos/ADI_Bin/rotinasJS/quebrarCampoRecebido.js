<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/quebrarCampoRecebido.js -->
/**
 * Função que separa a inscrição cadastral do campo e retorna valores
 * @version 1.0 25/02/2003
 * @author Alan Nunes Voiski
 * @param parametro Vetor de string: parametro.1 - Campo que será separado. parametro.x - O resto do vetor deve ser preenchido com o nome dos campos que irão receber os resultados das separações vindas do parametro.1
 * @return true se a separação for possível, false caso o campo seja menor que o código passado
 * @see quebraCampo
 */

/*
Parametros:
	parametro.1=> o primeiro parametro deve ser o campo que sera separado;
	parametro.X=> o resto ilimitado, sera o nome dos campos a serem preenxidos pelas separações vindas do parametro.1
				  tendo que ser passadas o nome apenas, entre aspas, em forma de string, e não a variavel enviando valor dela,
				  ou seja, devera ser passada como constante.
exemplo:			campo a ser separado		/campos a serem preenxidos, sendo mandados entre aspas, neste caso 5 \
							\/				  /	campos... sendo um vetor, um componete e 3 variaveis comuns			 \
*/


function quebrarCampoRecebido(parametro)
{
	fucCampo=parametro[0];//Campo a ser separado
	campoSeparado = new Array(".",",","/","-","_","(",")");//campos de separação
	var campoSepEncontrado=0;//indice do campo encontrado
	var auxFormatacao;//auxiliar de separação
	//Função que ira quebrar o campo, dando valor a auxFormatacao do numero separado,
	//e retorna verdadeiro(1) ou falso(0) caso campo tenha menor que numero do codigo passado

	/**
	 * Função utilizada em conjunto com a função quebrarCampoRecebido(parametro)
 	 * @version 1.0 25/02/2003
 	 * @author Alan Nunes Voiski
 	 * @see quebrarCampoRecebido
 	 * @return True ou false caso tenha campo válido ou não respectivamente
 	 */
	function quebraCampo()
	{
		for(i=0;i<campoSeparado.length;i+=1)//repetição determinar
		{
			if(fucCampo.indexOf(campoSeparado[i])>-1){//verifica c campo de separação existe no campo
				if(fucCampo.indexOf(campoSeparado[i])<fucCampo.indexOf(campoSeparado[campoSepEncontrado]))// verifica qual indice eh menor
						campoSepEncontrado=i;//da valor do indice do campo de separação com menor indice em relação ao campo a ser separado
			}
		}
		if(fucCampo.indexOf(campoSeparado[campoSepEncontrado])>0){//caso nenhum campo de separação de indice menor seja achado, o antigo será verificado denovo
			auxFormatacao = fucCampo.substring(0, fucCampo.indexOf(campoSeparado[campoSepEncontrado]))//pega campo separado
			fucCampo = fucCampo.substring(auxFormatacao.length+1, fucCampo.length);//pega resto do campo
			return (true);
		}else if(fucCampo.length>0 && fucCampo.indexOf(campoSeparado[campoSepEncontrado])!=0){//caso valor não tenha mas nenhum campo de separação
			auxFormatacao = fucCampo;
			fucCampo="";
			return(true);
		}else return (false);//caso não haja nenhum valor valido a ser inserido, retorna 0
	}//fim função--------------------------------------->

	for(a=1;a<6;a+=1)//repetição para separar campo preenxendo campos passados com valores separados em sequencia
	{
		if(quebraCampo())//separa campo
			eval(parametro[a]+"= auxFormatacao;")//recebe campo separado
	}
}
