<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/ultimoDiaDoMes.js -->
/**
 * Função Busca o último dia do Mês indicado
 * @version 1.0 14/11/2005 
 * @author Elimir Elias
 * @param dataEntrada Data a ser verificada (M,YYYY) ou (codMes,seqExercicio)
 * @return ultimo dia do mes se o dia for válida, senão return 0
 */
 
function buscaUltimoDia(mes,ano) 
{   // by Alan
    return (mes==12?31:new Date(new Date((mes*1+101+"").substr(1,2)+"/"+"01/"+ano).getTime() -86400000).getDate( ))
}


// funcao entendivel
function buscaUltimoDiaSimples(mes,ano)
{
    if (mes > 12 || mes == 0) {
        return 0;
    }
         //local de validacao da data com 31 dias
    if (mes==4 || mes==6 || mes==9 || mes==11) {
        return 30;
    }
    if (mes==1 || mes==3 || mes==5 || mes==7 || mes==8 || mes==10  || mes==12) {
        return 31;
    }
    
        // verifica se eh anobisexto
    var bisexto = ano % 4 ;

    if (bisexto == 0)
       return 28
    else
       return 29
}

