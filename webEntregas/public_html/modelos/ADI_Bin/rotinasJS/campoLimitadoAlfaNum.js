<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/campoLimitadoAlfaNum.js -->
/**
 * Função que critica o tamanho do campo alfanumérico
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param evt Tecla Digitada
 * @param tam Tamanha máximo do campo
 * @param cpn Campo alfanumérico
 */

function campoLimitadoAlfaNum(evt,tam,cpn)
{// inicio da função campoLimitadoAlfaNum()
  aux=eval("document."+cpn+".value");
  if (aux.length==tam)
  {
    alert(GENTN0000);
    evt.keyCode=null;
    eval("document."+cpn+".focus()");
  }
}// fim da função campoLimitadoAlfaNum()
