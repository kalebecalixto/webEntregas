<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/focus_.js -->
/**
 * função que retorna o cursor para o campo informado
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param ctc Campo a ser focado
 */

function focus_(ctc)
{// inicio da function focus_(ctc)
  arrayAux = arrayCriticas[ctc[0]];
  if (eval("document."+arrayCriticas[0]+"."+arrayAux[1]+".value")!="")
   change_(ctc);
}// fim da function focus_(ctc)
