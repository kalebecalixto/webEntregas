<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/enterExecuta.js -->
/**
 * Fun��o que recebe um evt e retorna um c�digo de outra, executando a fun��o
 * @version 01/01/2000 
 * @author Alexandre
 * @param evt Evento executado (se for ENTER, executa a fun��o)
 * @param fun C�digo da fun��o a ser executada
 */

function enterExecuta(evt,fun) 
{// in�cio da fun��o enterExecuta 
  if (evt.keyCode==13) 
  {
    eval(fun);
    evt.keyCode = 9;
  }
}// fim da fun��o enterExecuta 
