<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/ajusZeros.js -->
/**
 * Função que coloca zeros antes do txt enviado
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param txt Campo que será formatado
 * @param qtd Numero de casas que o campo deve ter
 * @return Campo formatado.
 */

function ajusZeros(txt,qtd)
{// início da Função ajusZeros
  for (i=0;i<qtd;i++)
    txt="0"+txt;
  len=txt.length;
  return txt.substring(len-qtd,len);
}// fim da Função ajusZeros
