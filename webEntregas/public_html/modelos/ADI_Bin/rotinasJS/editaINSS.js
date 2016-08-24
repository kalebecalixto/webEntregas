// <!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/editaINSS.js -->
// /*
//  * Função para editar INSS
//  * @version 1.0 11/01/2006
//  * @autor Elimir Elias
//  * @param campo Campo do INSS
//  * @param TeclaPres Tecla pressionada (event)
//  * onKeyPress="editaINSS(this,event)"
//  */
//												X.XXX.XXX.XXX/X - INSS
function editaINSS(campo,teclaPres)
{
  var tecla, valor, tamanho;
  tecla = teclaPres.keyCode;
  valor = campo.value;
  
  valor = valor.replace("/","");
  valor = valor.replace(".","");
  valor = valor.replace(".","");
  valor = valor.replace(".","");
  valor = valor.replace(".","");
  
  tamanho = valor.length;
	
  if(tamanho < 11)
  {
	  	  if ( tecla >= 48 && tecla <= 57 || tecla >= 96 && tecla <= 105 )
	  	  {
 	  	  		if (tamanho >= 1 && tamanho <= 3 ) 
	        		valor = valor.substring(0,1)+"."+valor.substring(1,tamanho);
  	  	  		if (tamanho >= 4 && tamanho <= 7 ) 
 	        		valor = valor.substring(0,1)+"."+valor.substring(1,4)+"."+valor.substring(4,tamanho);
  	  	  		if (tamanho >= 7 && tamanho <= 7 ) 
 	        		valor = valor.substring(0,9)+"."+valor.substring(7,tamanho);
  	  	  		if (tamanho >= 8 && tamanho <= 10 ) 
 	        		valor = valor.substring(0,1)+"."+valor.substring(1,4)+"."+valor.substring(4,7)+"."+valor.substring(7,10);
  	  	  		if (tamanho >= 10 && tamanho <= 10 ) 
 	        		valor = valor.substring(0,13)+"/"+valor.substring(10,tamanho);
	        	campo.value = valor;		
	  	  }
 
  } else teclaPres.keyCode = null;
}