<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/mod.js -->
/**
 * Funcao para retornar o resto da divis�o
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param i1 Dividendo
 * @param i2 Divisor
 * @return Valor do resto (Inteiro) da divis�o i1/i2
 */

 
function mod(i1,i2) 
{// in�cio da fun��o mod
   return i1-i2*Math.floor(i1/i2);
}// fim da fun��o mod
