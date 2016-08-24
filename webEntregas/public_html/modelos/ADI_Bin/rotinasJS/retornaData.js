<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/retornaData.js -->
/**
 * Funcao que recebe uma data e retorna em um determinado formato
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param dtParam Data entrada
 * @param formatoEntrada Formato da data inicial (DD/MM/YYYY)
 * @param formatoSaida Formato da data de saída
 * @return Data formatada
 */

function retornaData(dtParam, formatoEntrada, formatoSaida)
{// inicio da function retornaData(dtParam, formatoEntrada, formatoSaida)

    auxData = dtParam;
    if (formatoEntrada.toUpperCase()=="DD/MM/YYYY")
    {
        diaSaida = auxData.substring(0,2);
        mesSaida = auxData.substring(3,5);
        anoSaida = auxData.substring(6,10);
     } else if ( formatoEntrada.toUpperCase() == "TIMESTAMP")
            {
              anoSaida = auxData.substring(0,4);
              mesSaida = auxData.substring(5,7);
              diaSaida = auxData.substring(8,10);
            }
     dataSaida = formatoSaida.replace("DD", diaSaida);
     dataSaida = dataSaida.replace("MM", mesSaida);
     dataSaida = dataSaida.replace("YYYY", anoSaida);
     return dataSaida;
}// fim da function retornaData(dtParam, formatoEntrada, formatoSaida)
