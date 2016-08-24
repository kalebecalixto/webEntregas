<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/arredondaValor.js -->
/**
 * Função para arredondar valores com decimais
 * @version 1.0 01/01/2003
 * @author Vanderson Martins
 * @param valor Campo que será arredondado
 * @param campo N=Normal, T=trunca, A=arredonda na terceira casa
 * @return Campo arredondado.
 */

function arredondaValor(valor, opcao)
{// início da função arredondaValor
  //transforma o valor recebido em uma String
  valor = valor + "";
  //descobre a posicao do . decimal
  posPonto = valor.indexOf(".");
  if (posPonto<0)
  {
     return valor;
  }
  //verifica se aopcao é A e arredonda na terceira casa
  if (opcao=="A")
  {
     posicao3 = valor.substring(posPonto + 3, posPonto + 4);
     posicao3 = posicao3 * 1;
     if (posicao3 >= 5)
     {
         //torna o valor numerico
         valor = valor * 1;
         //adiciona 0.01 para arredondar
         valor = valor + 0.01;
     }
  }
  //transforma o valor em string
  valor = valor + "";
  //obtem a parte inteira
  inteiro = valor.substring(0, posPonto);
   //se aopção for T retorna somente a parte inteira
  if (opcao=="T")
  {
      return inteiro;
  }
  //obtem e retorna aparte inteira e decimal
  decimal = valor.substring(posPonto + 1, posPonto + 3);
  return inteiro + "." + decimal
}// fim da função arredondaValor
