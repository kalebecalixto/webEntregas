<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/campoLimitadoAlfaNum.js -->
/**
 * Fun��o que critica o tamanho do campo alfanum�rico
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param evt Tecla Digitada
 * @param tam Tamanha m�ximo do campo
 * @param cpn Campo alfanum�rico
 */

function campoLimitadoAlfaNum(evt,tam,cpn)
{// inicio da fun��o campoLimitadoAlfaNum()
  aux=eval("document."+cpn+".value");
  if (aux.length==tam)
  {
    alert(GENTN0000);
    evt.keyCode=null;
    eval("document."+cpn+".focus()");
  }
}// fim da fun��o campoLimitadoAlfaNum()
