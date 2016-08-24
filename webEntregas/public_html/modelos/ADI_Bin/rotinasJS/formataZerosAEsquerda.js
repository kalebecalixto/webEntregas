<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/formataZerosAEsquerda.js -->
/**
 * Fun��o para formatar um valor com zeros a esquerda
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param campo Campo do Telefone (this)
 * @param tamanhoDocampo Tamanho m�ximo do campo
 * @return Campo formatado
 */

function formataZerosAEsquerda(campo,tamanhoDocampo)
{// in�cio da fun��o formataZerosAEsquerda
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
}// fim da fun��o formataZerosAEsquerda
