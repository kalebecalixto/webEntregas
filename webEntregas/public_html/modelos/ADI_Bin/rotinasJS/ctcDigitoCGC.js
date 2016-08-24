<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/ctcDigitoCGC.js -->
/**
 * Função que critica os digitos do CGC
 * @version 1.0 01/01/2000
 * @author Alexandre
 */


function ctcDigitoCGC()
{// inicio da function ctcDigitoCGC
  (arrayAux[1]);
	 cgc=eval("document."+arrayCriticas[0]+"."+arrayAux[1]+".value;");
	 err=false;
 	if (cgc.length!=14) //#1
  {
		  err=true;
		  men="Digite um número com 14 dígitos.";
	 } else {
		         dig=cgc.substring(12,14);
		         cgc=cgc.substring(0,12);
		         contador = cgc.length;	digito = 0;
           escape1:
		         for (;;)
			          for (i=2;i<10;i++)
             {
				            contador--;
				            if (contador<0) break escape1;
				            digito+=cgc.substring(contador,contador+1)*i;
			          }
		         digito=11-mod(digito,11)
		         if (digito==10 || digito==11)
											  digito=0;
		         cgc+=digito;
           contador = cgc.length;	digito = 0;
           escape2:
           for (;;)
          	  for (i=2;i<10;i++)
             {
           		  contador--;
				           if (contador<0) break escape2;
				           digito+=cgc.substring(contador,contador+1)*i;
			          }
            	digito=11-mod(digito,11)
           	 if (digito==10 || digito==11)
													  digito=0;
           	 cgc+=digito;
           	 if (dig!=cgc.substring(12,14))
             {
            		 	err=true;
            		 	men="Dígito verificador não confere.";
		           }
        	 }// fim else
  if (err)
  {
   		mensagem=mensagem+salto+"Erro no campo \""+arrayAux[0]+"\". "+men;
   		if (salto=="")
     {
    			componenteRetorno=arrayAux[1];
     		salto="\n";
  		 } else {
             		cgc=cgc.substring(0,2)+"."+cgc.substring(2,5)+"."+cgc.substring(5,8)+"/"+cgc.substring(8,12)+"-"+cgc.substring(12,14);
             		eval("document."+arrayCriticas[0]+"."+arrayAux[1]+".value=cgc");
             		eval("document."+arrayCriticas[0]+"."+arrayAux[1]+".style.textAlign = 'center'");
           	}
}// fim da function ctcDigitoCGC
