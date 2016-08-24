<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/quebrarCampoRecebido.js -->
/**
 * Fun��o que separa a inscri��o cadastral do campo e retorna valores
 * @version 1.0 25/02/2003
 * @author Alan Nunes Voiski
 * @param parametro Vetor de string: parametro.1 - Campo que ser� separado. parametro.x - O resto do vetor deve ser preenchido com o nome dos campos que ir�o receber os resultados das separa��es vindas do parametro.1
 * @return true se a separa��o for poss�vel, false caso o campo seja menor que o c�digo passado
 * @see quebraCampo
 */

/*
Parametros:
	parametro.1=> o primeiro parametro deve ser o campo que sera separado;
	parametro.X=> o resto ilimitado, sera o nome dos campos a serem preenxidos pelas separa��es vindas do parametro.1
				  tendo que ser passadas o nome apenas, entre aspas, em forma de string, e n�o a variavel enviando valor dela,
				  ou seja, devera ser passada como constante.
exemplo:			campo a ser separado		/campos a serem preenxidos, sendo mandados entre aspas, neste caso 5 \
							\/				  /	campos... sendo um vetor, um componete e 3 variaveis comuns			 \
*/


function quebrarCampoRecebido(parametro)
{
	fucCampo=parametro[0];//Campo a ser separado
	campoSeparado = new Array(".",",","/","-","_","(",")");//campos de separa��o
	var campoSepEncontrado=0;//indice do campo encontrado
	var auxFormatacao;//auxiliar de separa��o
	//Fun��o que ira quebrar o campo, dando valor a auxFormatacao do numero separado,
	//e retorna verdadeiro(1) ou falso(0) caso campo tenha menor que numero do codigo passado

	/**
	 * Fun��o utilizada em conjunto com a fun��o quebrarCampoRecebido(parametro)
 	 * @version 1.0 25/02/2003
 	 * @author Alan Nunes Voiski
 	 * @see quebrarCampoRecebido
 	 * @return True ou false caso tenha campo v�lido ou n�o respectivamente
 	 */
	function quebraCampo()
	{
		for(i=0;i<campoSeparado.length;i+=1)//repeti��o determinar
		{
			if(fucCampo.indexOf(campoSeparado[i])>-1){//verifica c campo de separa��o existe no campo
				if(fucCampo.indexOf(campoSeparado[i])<fucCampo.indexOf(campoSeparado[campoSepEncontrado]))// verifica qual indice eh menor
						campoSepEncontrado=i;//da valor do indice do campo de separa��o com menor indice em rela��o ao campo a ser separado
			}
		}
		if(fucCampo.indexOf(campoSeparado[campoSepEncontrado])>0){//caso nenhum campo de separa��o de indice menor seja achado, o antigo ser� verificado denovo
			auxFormatacao = fucCampo.substring(0, fucCampo.indexOf(campoSeparado[campoSepEncontrado]))//pega campo separado
			fucCampo = fucCampo.substring(auxFormatacao.length+1, fucCampo.length);//pega resto do campo
			return (true);
		}else if(fucCampo.length>0 && fucCampo.indexOf(campoSeparado[campoSepEncontrado])!=0){//caso valor n�o tenha mas nenhum campo de separa��o
			auxFormatacao = fucCampo;
			fucCampo="";
			return(true);
		}else return (false);//caso n�o haja nenhum valor valido a ser inserido, retorna 0
	}//fim fun��o--------------------------------------->

	for(a=1;a<6;a+=1)//repeti��o para separar campo preenxendo campos passados com valores separados em sequencia
	{
		if(quebraCampo())//separa campo
			eval(parametro[a]+"= auxFormatacao;")//recebe campo separado
	}
}
