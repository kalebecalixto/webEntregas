<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/formataZerosAEsquerda.js -->
/**
 * Função para formatar um valor com zeros a esquerda
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param campo Campo do Telefone (this)
 * @param tamanhoDocampo Tamanho máximo do campo
 * @return Campo formatado
 */

function formataZerosAEsquerda(campo,tamanhoDocampo)
{// início da função formataZerosAEsquerda
  i = 0;
  campoScript = campo.value;
  for (i=0 ; i<tamanhoDocampo; i++)
  {
     if (campoScript.length< tamanhoDocampo)
     {
        campoScript = 0 +campoScript;
     }
  }
  return campoScript;
}// fim da função formataZerosAEsquerda
