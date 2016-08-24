<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/diaSemana.js -->
/**
 * Retorna o dia da semana de uma determinada data
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @auteração: 14/09/2006 - Elimir Elias - Reestruturação da função toda
 * @param dtParam Data no formato DD/MM/YYYY
 * @param formaToSaida T - retorna o dia texto (Domingo, Segunda, etc)
                       N - retorna o dia numérido (0, 1, etc)
                       A - retorna o dia abreviado (Dom, Seg, etc)
 * @return Dia da semana (formato em texto ou numérico)
 */

function diaSemana(dtParam, formaToSaida) 
{// inicio function diaSemana(dtParam, formaToSaida)  
    auxData = dtParam;
    diaDaSemana = ( new Date( formataDatas( auxData, "DD/MM/YYYY", "MM/DD/YYYY" ) ) ).getDay();    
    objetoData = diaDaSemana;

    if( formaToSaida == "T" ) {
        if(diaDaSemana=="0") objetoData = "Domingo";
        else if(diaDaSemana=="1") objetoData = "Segunda";
        else if(diaDaSemana=="2") objetoData = "Terça";
        else if(diaDaSemana=="3") objetoData = "Quarta";
        else if(diaDaSemana=="4") objetoData = "Quinta";
        else if(diaDaSemana=="5") objetoData = "Sexta"
        else objetoData = "Sábado";
    } else if( formaToSaida == "A" ) {
        if(diaDaSemana=="0") objetoData = "Dom";
        else if(diaDaSemana=="1") objetoData = "Seg";
        else if(diaDaSemana=="2") objetoData = "Ter";
        else if(diaDaSemana=="3") objetoData = "Qua";
        else if(diaDaSemana=="4") objetoData = "Qui";
        else if(diaDaSemana=="5") objetoData = "Sex"
        else objetoData = "Sab";
    }
    
    return objetoData;
}//fim function diaSemana(dtParam, formaToSaida) 
