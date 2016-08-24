<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/mod.js -->
/**
 * Funcao para retornar o resto da divisão
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param i1 Dividendo
 * @param i2 Divisor
 * @return Valor do resto (Inteiro) da divisão i1/i2
 */

 
function mod(i1,i2) 
{// início da função mod
   return i1-i2*Math.floor(i1/i2);
}// fim da função mod
