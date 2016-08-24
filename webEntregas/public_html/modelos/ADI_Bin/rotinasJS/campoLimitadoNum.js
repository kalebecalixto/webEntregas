<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/campoLimitadoNum.js -->
/**
 * Função que critica o tamanho de um campo numérico
 * @version 1.0 30/04/2003
 * @author Alexandre
 * @param evt Tecla Pressionada
 * @param tam Tamanho máximo do campo
 * @param cpn Campo numérico a ser criticado
 */

function campoLimitadoNum(evt,tam,cpn)
{// início da função campoLimitadoNum()
  if (evt.keyCode>47 && evt.keyCode<58)
  {
    aux=eval("document."+arrayCriticas[0]+"."+cpn+".value");
    if (aux.length==tam)
    {
      alert(GENTN0000);
      evt.keyCode=null;
      eval("document."+arrayCriticas[0]+"."+cpn+".focus()");
    }
  } else evt.keyCode=null;
}// fim da função campoLimitadoNum()

