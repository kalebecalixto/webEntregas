<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/proximoDiaUtil.js -->/** * Fun��o para informar a data do pr�ximo dia �til * @version 1.0 01/01/2000 * @author Alexandre * @param dtParametro Data inicial * @return Data so pr�ximo dia �til no formato DD/MM/AAAA */function proximoDiaUtil( dtParametro ) {    proximaData = dtParametro;    contador = 0;    validaData = false;    for(;;)     {        proximaData = operaData( proximaData, contador == 0 ? 0 : 1 );                diaDaSemana = ( new Date( formataDatas( proximaData, "DD/MM/YYYY", "MM/DD/YYYY" ) ) ).getDay();                //dia da semana igual a sabado( 6 ) e domingo ( 0 ) invalidos        if( diaDaSemana > 0 && diaDaSemana < 6 )        {            if( verFeriado( proximaData ) == -1 )              {                validaData = true;            }        }                if( contador > 30 )         {            if( !confirm( "Pr�ximo dia util ultrapassa "+ contador +" dias corridos. continuar?" ) )             {                break;            }        }                if( validaData )            break;        contador++;            }        return proximaData;}