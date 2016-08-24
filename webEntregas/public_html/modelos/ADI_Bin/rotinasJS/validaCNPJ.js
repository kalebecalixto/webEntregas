<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/validaCNPJ.js -->
/**
 * Fun��o parfa validar o CNPJ
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param cnpj
 * @return true se o cnpj for v�lido, false se for inv�lido
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
   //Verifica��o dos dois digitos finais em rela��o ao n�mero completo
   C1 = parseInt(cnpj.substring(12, 13));  //D�cimo terceiro caracter = primeiro d�gito verificador
   C2 = parseInt(cnpj.substring(13, 14));  //D�cimo quarto caracter = segundo d�gito verificador
   //Verifica��o do primeiro d�gito
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
   //Verifica��o de C2
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
