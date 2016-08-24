<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/editaPisPasep.js -->
/**
 * Função para editar a inscrição do campo de PisPasep
 * @version 1.0 14/03/2003
 * @author Lucas Hermano
 * @param campo Campo do PisPasep
 * @param TeclaPres Tecla pressionada (event)
 */

function editaPisPasep(campo,teclaPres)
{
  var tecla, valor, tamanho;
  tecla = teclaPres.keyCode;
  valor = campo.value;
  
  valor = valor.replace("-","");
  valor = valor.replace(".","");
  valor = valor.replace(".","");
  
  tamanho = valor.length;
  
  if(tamanho < 11)
  {
	  	  if ( tecla >= 48 && tecla <= 57 || tecla >= 96 && tecla <= 105 )
	  	  {
 	  	  		if (tamanho >= 3 && tamanho <= 7 ) 
	        		valor = valor.substring(0,3)+"."+valor.substring(3,tamanho);
		  	    
 	  	  		if (tamanho >= 8 && tamanho <= 9 ) 
	        		valor = valor.substring(0,3)+"."+valor.substring(3,8)+"."+valor.substring(8,tamanho);
		  	    
 	  	  		if (tamanho >= 10 && tamanho <= 11 ) 
	        		valor = valor.substring(0,3)+"."+valor.substring(3,8)+"."+valor.substring(8,10)+"-"+valor.substring(10,tamanho);
	        	
	        	campo.value = valor;		
	  	  }
  }else teclaPres.keyCode = null;
}   
