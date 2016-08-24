<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/comparaData.js -->
/**
 * Função que recebe duas datas no formato DD/MM/AAAA e compara
 * @version 1.0 29/01/2002
 * @author Marcelo Simões Coelho
 * @param primeiraData Primeira data a ser comparada
 * @param segundaData Segunda data a ser comparada
 * @deprecated Use o <a href='#comparaDatas'>comparaDatas<a> do scriptGeral.js
 * @return 0 = datas iquais, 1 = primeira maior que a segunda, 2 = primeira menor que a segunda
 */

function comparaData(primeiraData,segundaData)
{// inicio da function comparaData(primeiraData,segundaData)

        anoPrimeiraData = primeiraData.substring(6,10);
        anoSegundaData =segundaData.substring(6,10);
           if (anoPrimeiraData > anoSegundaData){ return 1;// maior
           }else{// #1
                 if (anoPrimeiraData < anoSegundaData){ return 2;//menor
                 }else{// #2
                     mesPrimeiraData = primeiraData.substring(3,5);
                     mesSegundaData = segundaData.substring(3,5);
                     if (mesPrimeiraData > mesSegundaData){ return 1;// maior
                     }else{ // #3
                         if (mesPrimeiraData < mesSegundaData){ return 2;// menor
                         }else{ // #4
                             diaPrimeiraData = primeiraData.substring(0,2);
                             diaSegundaData =  segundaData.substring(0,2);
                             if (diaPrimeiraData > diaSegundaData ){ return 1;//maior
                             }else{ // #5
                                 if (diaPrimeiraData < diaSegundaData ){ return 2;// menor
                                 }else{ return 0;}// igual
                             }// fim #5
                         }// fim #4
                     } // fim #3
                 }// fim #2
           }// fim #1
} // fim função comparaData(primeiraData,segundaData)
