<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/gCgc_Ok.js -->
/**
 * Formata o estilo padrão do CGC e faz verificação
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param Nu_CGC Campo do CGC (this)
 * @return true se o campo for válido, false se for inválido
 */
 
function gCgc_Ok(Nu_CGC) 
{// inicio da function gCgc_Ok(Nu_CGC)
   var Parcela;
   var Quociente;
   var Resto;
   var Soma;
   var Fator;
   var I;
   var C1;
   var C2;
   var dv1;
   var dv2;
   // Local de limpeza dos pontos e barras do CNPJ
   var newCGC = Nu_CGC.substring(0,2)+Nu_CGC.substring(3,6)+Nu_CGC.substring(7,10)+Nu_CGC.substring(11,15)+Nu_CGC.substring(16,18);
   Nu_CGC = newCGC;
   if(Nu_CGC.length != 14)
   {
       alert(GENTN0000);
       return false;
   }
   //Verificação dos dois digitos finais em relação ao número completo
   C1 = parseInt(Nu_CGC.substring(12, 13));  //Décimo terceiro caracter = primeiro dígito verificador
   C2 = parseInt(Nu_CGC.substring(13, 14));  //Décimo quarto caracter = segundo dígito verificador
   //Verificação do primeiro dígito
   Soma = 0;
   Parcela = 0;
   Fator = 0;
   for(I=1; I<=12; I++)
   {
      if(I < 9)
      {
         Fator = I + 1;
      } else {
                Fator = I - 7;
			
             }
      Parcela = Fator * parseInt(Nu_CGC.substring(12 - I, 12 - I + 1));
      Soma = Soma + Parcela;
   }
   dv1 = (Soma % 11);
   if(dv1 != 0)
   {
      dv1 = 11 - dv1;
      if(dv1 == 10)
      {
         dv1 = 0;
      }
   }  
   if(C1 != dv1)
   {
       alert(GENBA0016);
       return false;
   }
   //Verificação de C2
   Soma = 0;
   Parcela = 0;
   Fator = 0;
   for(I=1; I<=13; I++)
   {
      if(I < 9)
      {
         Fator = I + 1;
      } else {
               Fator = I - 7;
	     }	  
     Parcela = Fator * parseInt(Nu_CGC.substring(13 - I, 13 - I + 1));
     Soma = Soma + Parcela;
   }
   dv2 = (Soma % 11);
   if(dv2 != 0)
   {
       dv2 = 11 - dv2;
       if(dv2 == 10)
       {
          dv2 = 0;
        }
   }
   if(C2 != dv2)
   {
        alert(GENBA0016);
       return false;
   }
    return true;
}// fim da function gCgc_Ok(Nu_CGC)	
