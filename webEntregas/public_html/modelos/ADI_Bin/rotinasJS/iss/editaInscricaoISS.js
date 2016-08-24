<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/iss/editaInscricaoISS.js -->
/*
Nome: função q faz a edição da inscrição cadastral do sistema ISS
Parametros: 
Retornos: 
Autor: lucas hermano
Data criação: 18/03/2003
*/

function editaInscricaoISS(campo,teclaPres)
{
  var tecla, valor, tamanho, campoIndex;
  tecla = teclaPres.keyCode;
  valor = campo.value;
  
  valor = valor.replace("-","");
  valor = valor.replace(".","");
  
  tamanho = valor.length;
  
  if(tamanho < 10)
  {
	  	  if ( tecla >= 48 && tecla <= 57 || tecla >= 96 && tecla <= 105 )
	  	  {
 	  	  		if (tamanho == 1 ) 
	        		valor = valor.substring(0,1)+"."+valor.substring(1,tamanho);
	        	else	
        		if (tamanho == 2)
					valor = valor.substring(0,1)+"."+valor.substring(1,2)+"-"+valor.substring(2,3);	
				else
				if (tamanho > 2){
					valor = valor.substring(0,tamanho-1)+"."+valor.substring(tamanho-1,tamanho)+"-"+valor.substring(tamanho,tamanho+1);
				}

	        	campo.value = valor;		
	  	  }
  }else teclaPres.keyCode = null;
}   
