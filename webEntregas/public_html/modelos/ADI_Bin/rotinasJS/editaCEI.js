<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/editaCEI.js -->
/**
 * Função para editar CEI
 * @version 1.0 26/11/2004
 * @author Elimir Elias
 * @param campo Campo do CEI
 * @param TeclaPres Tecla pressionada (event)
 */

function editaCEI(campo,teclaPres)
{
  var tecla, valor, tamanho;
  tecla = teclaPres.keyCode;
  valor = campo.value;
  
  valor = valor.replace("/","");
  valor = valor.replace(".","");
  valor = valor.replace(".","");
  
  tamanho = valor.length;
	
  if(tamanho < 12)
  {
	  	  if ( tecla >= 48 && tecla <= 57 || tecla >= 96 && tecla <= 105 )
	  	  {
		  	  
 	  	  		if (tamanho >= 2 && tamanho <= 4 ) 
	        		valor = valor.substring(0,2)+"."+valor.substring(2,tamanho);
        		
 	  	  		if (tamanho >= 5 && tamanho <= 9 ) 
	        		valor = valor.substring(0,2)+"."+valor.substring(2,5)+"."+valor.substring(5,tamanho);
	        		
 	  	  		if (tamanho >= 10 && tamanho <= 12 ) 
	        		valor = valor.substring(0,2)+"."+valor.substring(2,5)+"."+valor.substring(5,10)+"/"+valor.substring(10,tamanho);
	        	campo.value = valor;		
	  	  }
  }else teclaPres.keyCode = null;
}   