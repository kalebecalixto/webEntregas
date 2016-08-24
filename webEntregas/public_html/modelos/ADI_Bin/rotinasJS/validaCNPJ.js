<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/validaCNPJ.js -->
/**
 * Função parfa validar o CNPJ
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param cnpj
 * @return true se o cnpj for válido, false se for inválido
 */

function validaCNPJ(cnpj) 
{
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
   cnpj = cnpj.replace(".","");
   cnpj = cnpj.replace(".","");
   cnpj = cnpj.replace("/","");
   cnpj = cnpj.replace("-","");
   
   if(cnpj.length != 14)
   {
       alert(GENTN0000);
       return false;
   }
   //Verificação dos dois digitos finais em relação ao número completo
   C1 = parseInt(cnpj.substring(12, 13));  //Décimo terceiro caracter = primeiro dígito verificador
   C2 = parseInt(cnpj.substring(13, 14));  //Décimo quarto caracter = segundo dígito verificador
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
      Parcela = Fator * parseInt(cnpj.substring(12 - I, 12 - I + 1));
      Soma += Parcela;
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
     Parcela = Fator * parseInt(cnpj.substring(13 - I, 13 - I + 1));
     Soma += Parcela;
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
}
