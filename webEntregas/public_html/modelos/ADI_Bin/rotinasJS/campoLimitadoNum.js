<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/campoLimitadoNum.js -->
/**
 * Fun��o que critica o tamanho de um campo num�rico
 * @version 1.0 30/04/2003
 * @author Alexandre
 * @param evt Tecla Pressionada
 * @param tam Tamanho m�ximo do campo
 * @param cpn Campo num�rico a ser criticado
 */

function campoLimitadoNum(evt,tam,cpn)
{// in�cio da fun��o campoLimitadoNum()
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
}// fim da fun��o campoLimitadoNum()

