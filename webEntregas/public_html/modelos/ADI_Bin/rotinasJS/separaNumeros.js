<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/separaNumeros.js -->
/**
 * Função que pesquisa nos campos de uma string as letras e os números
 * @version 1.0 14/05/2002
 * @author Wellington
 * @param campo Campo a ser pesquisado
 * @return Inteiro retirado do atributo (campo)
 */

/* Pesquisa:
	1°: Só pesquisa se o atributo for menor ou igual que 5 posições
	2°: Aceita no máximo duas letras juntas, caso contrário dá mensagem de erro
	3°: As letras devem estar nas posições (0,1) ou (3,4)
	4°: O retorno da função (resultado) é um inteiro retirado do atributo (campo)
*/

function separaNumeros(campo)
{//início da function separaNumero()

  // variáveis de separação do campo
  var caracter,caracter2;

  // resultado da concatenação de numeros
  var resultado = "";

  // recebe o resultado do for
  var letra = "";

  // variável para receber a sobra do for para o teste se é um numero ou uma letra
  var sobra = "";

  // controla o numero de letras, permitindo no máximo duas.
  var tamMax =0;

  /* pega as posições dos caracteres entrados no campo e a
  variável posicaoCampo estipula o tamanho do campo entrado...*/
  var posicao1,posicao2,posicao3,posicao4,posicaoCampo;

  // verifca se o tamanho do campo e maior que 5 digitos
  if (campo.length > 5)
  {
    alert("O campo deve conter no Máximo 5 Caracteres");
	   return false;
  }else{
         //início do for ate o tamanho do campo
         for (i=0;i <campo.length;i++)
         {//início do for do tamanho do campo
            parseInt(i);
         		 caracter = campo.substring(i,i+1);
 	         // procura numeros dentro da variável caracter depois de separada
        		 for (j=0;j < 10;j++)
           {// início do for se existem números no campo
 			 	        if (caracter == j)
              {
  					          resultado =resultado + caracter;
  					          caracter="";
         					}else{
 					               /* se o caracter nao for numero letra recebe o caracter
  					               * e depois a sobra recebe trocando todas as letras pela variável j
 					                */
              					   letra = caracter;
              					   sobra +=letra.toString().replace( caracter,j);
 					             }
 			       }// fim do for pesquisa números no caracter

 			       // se a sobra receber todos os números do for J entao o caracter recebido foi uma letra
 			     	 if (sobra == "0123456789")
           {//inicio do if se existe letra no caracter
 					       /* início da rotina de verificação se os caracteres que formam letras
 						       * verificar e retornar a mensagem de error se o entrar mais de duas letras ou se
 						       * as letras estiverem separadas umas das outras
              */
 					        posicao1 = campo.indexOf(caracter);
 						       caracter2 = campo.substring(posicao1+1,campo.length);
  						 	    // verifica se o próximo caracter pesquisado se encontra fora da primeira posição do campo
        	 			 if (caracter2.indexOf(caracter) < 0)
              {//início if posição da letra no campo
 							         if (posicao1 != 0)
                 {
 						             tamMax = tamMax+1;
 										        /* se for o primeiro caracter encontrado faz a pesquisa
 											        * dentro do campo para a posição dele e se esta correta
                    */
 										         if(tamMax ==1)
                    {
 	                    caracter2 = campo.substring(posicao1,campo.length);
 									            posicao2 = caracter2.indexOf(caracter);
 												         if (posicao2 == 0)
                      {
 										              posicaoCampo = parseInt(caracter2.length) - 1;
 								                if (posicao2 != posicaoCampo)
                         {
 												               alert("Impossível de Formatar");
  														            return false;
 														          }
 													        }
 												       }
 												      /* Se for o segundo caracter encontrado pesquisa a posição dele no campo
 												       * e se esta correta
                    */
 									          if(tamMax ==2)
                    {
 	                    posicaoCampo = parseInt(campo.length) - 1;
 									            if (posicao1 < posicaoCampo)
                      {
 									              alert("Impossível de Formatar");
 														         return false;
 														       }
 												       }
 												       //se passarem de duas letras no campo retorna false
 												       if (tamMax > 2)
                    {
 												          alert("Impossível de Formatar");
 														        return false;
 												       }
 										      }// fim if posição da letra no campo
 									    }//fim do if se existe letra no caracter
 									    // se a posição da letra sor a primeira no campo faz as criticas
 									     else{// início do else da posição da letra no campo.
 									          // pega a próxima posição do caracter apartir da primeira posição encontrada
 										           caracter2 = campo.substring(posicao1+1,campo.length);
 									            //pega a posição do proximo caracter no novo campo
 										           posicao3 = caracter2.indexOf(caracter);
 										          /* se a letra estiver na posição 0
 										           * faz a crítica para posicao da próxima letra no campo
                      */
 											          if (posicao3 != 0)
                      {
 										             posicaoCampo = parseInt(caracter2.length) - 1;
 								               if (posicao3 != posicaoCampo)
                        {
 												             alert("Impossível de Formatar");
 														           return false;
 														         }
 											           /* se a letra mão estiver na posição 0
 										             * faz a critica para posicao da letra no campo
                        */
 														       }else{
 											                 posicaoCampo = parseInt(caracter2.length) - 1;
 								                    if (posicao3 != posicaoCampo)
                             {
              														    posicao4 = campo.indexOf(caracter);
 													                 	if (posicao1 >0)
                                {
 												                     alert("Impossível de Formatar");
 															                  return false;
 															                }
 														              }
 											               }

 							          	}// fim do else da posicao do campo
 						            // esvazia a variavel sobra para a proxima pesquisa
 						      sobra="";
 					     }else // fim do else para se existe letra no caracter
 					           // esvazia a variável sobra para a próxima pesquisa
 					           sobra = "";
	        }// fim do for tamanho do campo
	   	   	parseInt(resultado);
			   return resultado;
	  }// fim do else verifica tamanho do campo
}
