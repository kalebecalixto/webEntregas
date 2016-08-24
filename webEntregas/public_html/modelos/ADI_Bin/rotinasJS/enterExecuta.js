<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/enterExecuta.js -->
/**
 * Função que recebe um evt e retorna um código de outra, executando a função
 * @version 01/01/2000 
 * @author Alexandre
 * @param evt Evento executado (se for ENTER, executa a função)
 * @param fun Código da função a ser executada
 */

function enterExecuta(evt,fun) 
{// início da função enterExecuta 
  if (evt.keyCode==13) 
  {
    eval(fun);
    evt.keyCode = 9;
  }
}// fim da função enterExecuta 
