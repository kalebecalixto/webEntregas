<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/ajusZeros.js -->
/**
 * Fun��o que coloca zeros antes do txt enviado
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param txt Campo que ser� formatado
 * @param qtd Numero de casas que o campo deve ter
 * @return Campo formatado.
 */

function ajusZeros(txt,qtd)
{// in�cio da Fun��o ajusZeros
  for (i=0;i<qtd;i++)
    txt="0"+txt;
  len=txt.length;
  return txt.substring(len-qtd,len);
}// fim da Fun��o ajusZeros
