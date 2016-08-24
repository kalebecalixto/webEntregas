//<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/scriptGeral.js -->
/*
$Revision: 1.25 $
$Author: fabioh $
$Date: 2013/05/03 13:51:59 $
*/

// vari�vel para mensagem Adi
var msgHorus = "SIGMA: ";

// Mensagem das Criticas dos formul�rios - Filtros
var msgFiltro1 = msgHorus + "� necess�rio que voc� escolha o tipo de procura a realizar.";
var msgFiltro2 = msgHorus + "Nesta op��o � necess�rio que voc� digite no m�nimo 1 caracter.";
var msgFiltro3 = msgHorus + "Nesta op��o � necess�rio que voc� digite no m�nimo 2 caracteres.";

// Variaveis globais deste script
var tpFiltro = "";

//----------------------------Vari�veis contendo caminhos genericos--------------------------

var caminhoImagensGenericas   = imagensGenericasPath;
var caminhoEstilosCSS         = BinPath+"/estilosCSS";
var caminhoAjuda              = AjudaPath;
var caminhoUtilitarios        = BinPath+"/utilitarios";
var caminhoNotasPessoais      = notasPessoaisPath;

//----------------------------Vari�vel para tipo de browser-----------------------------------

var tipoBrowser    = navigator.appName;
var versaoBrowser  = navigator.appVersion;

//----------------------------Fim Vari�veis contendo caminhos genericos----------------------

//----------------------------Vari�veis que indicam os estados das teclas--------------------

var shift = false;
var alt   = false;
var ctrl  = false;

//----------------------------Fim Vari�veis que indicam os estados das teclas----------------

//----------------------------Vari�veis para sistema de pesquisa em select's-----------------

var strPesquisaCombo   = "";
var timerPesquisaCombo = new Timer( );

//----------------------------Fim Vari�veis para sistema de pesquisa em select's-------------


/**
 * Retorna o c�digo ASCII da tecla pressionada de acordo com o browser.
 *
 * @version 1.0 22/04/2004
 * @author Diego R. Drumond
 * @param evt Objeto 'event' do browser.
 */
function retornaKeyCode( evt )
{
        if( !evt )
            return;

    if( navigator.appVersion.indexOf( "MSIE" ) >= 0 )
        keyCode = evt.keyCode;
    else
        keyCode = evt.charCode;

    return keyCode;
}

/**
 * Cancela um evento do broweser qualquer.
 *
 * @version 1.0 22/04/2004
 * @author Diego R. Drumond
 * @param evt Objeto 'event' do browser.
 */
function cancelaEvento( evt )
{
    if( retornaKeyCode( evt )*1 > 0 ){
        if( navigator.appVersion.indexOf( "MSIE" ) >= 0 )
            evt.returnValue = false;
        else
        {
            evt.cancel = true;
            evt.preventDefault( );
        }
    }
}

/**
 * Atribui as Vari�veis globais 'shift', 'alt', 'ctrl' um valor de acordo com seu estado atual.
 * TRUE se ela estiver pressionada, FALSE se n�o estiver pressionada.
 *
 * @version 1.0 22/04/2004
 * @author Diego R. Drumond
 * @param evt Objeto 'event' do browser.
 */
function retornaEstadosTeclas( evt )
{
        if( !evt )
            return

    shift = evt.shiftKey;
    alt   = evt.altKey;
    ctrl  = evt.ctrlKey;
}

/**
 * Fun��o que edita o valor do campo de acordo com a m�scara definida
 *
 * @version 1.1 16.05.2007
 * @author Diego R. Drumond
 * @param obj campo a ser formatado
 * @param evt tecla pressionada
 * @param mask mascara para a edi��o do valor do campo
 * @return Campo formatado.
 */
function mascara( obj, evt, mask )
{
    if( getSelectedText( ) == obj.value )
        obj.value = "";

    tecla  = retornaKeyCode( evt );
    carVal = String.fromCharCode( tecla );

    if( tecla == "8" || tecla == "0" )
        return;

    if( mask.toUpperCase() == 'NUMEROPONTO' )
    {
        if( !( tecla > 45  && tecla < 58 && tecla != 47 ) )
            cancelaEvento( evt );

       return;
    }

    obj.maxLength = mask.length;

    carMas = mask.substr( obj.value.length, 1 );

    if( tecla == "8" || tecla == "0" )
        return;

    if( mask.length <= obj.value.length )
    {
        cancelaEvento( evt );
        return false;
    }

    testVal = 0;
    if( carMas == "" )
    {
        cancelaEvento( evt );
        return false;
    }
    //somente num�ricos
    if( carMas == "9" )
    {
        if( !( tecla > 47  && tecla < 58 ) )
            cancelaEvento( evt );
    }
    //alfanum�ricos
    else if( carMas == "X" )
    {
        if( !( ( tecla > 64 && tecla < 91 ) || ( tecla > 96 && tecla < 123 ) || ( tecla > 47  && tecla < 58 ) ) )
            cancelaEvento( evt );
    }
    //somente alfab�ticos
    else if( carMas == "A" )
    {
        if( !( ( tecla > 64 && tecla < 91 ) || ( tecla > 96 && tecla < 123 ) ) )
            cancelaEvento( evt );
    }
    else
    {
        obj.value += carMas;
        mascara( obj, evt, mask );
    }
}

/**
 * Fun��o que verifica o valor do campo de acordo com a m�scara definida
 *
 * @version 1.0 11/07/2003
 * @author Alan
 * @param obj campo a ser verificado
 * @param mask mascara para a verifica��o do valor do campo
 * @return true caso seja valido, e false caso seja invalido.
 */
function validaMascara( obj, mask )
{
    // tamanho dos dois deve ser igual
    if( obj.value.length != mask.length )
        return false;

    for( x = 0; x < obj.value.length; x++ )
    {
        //caracter ascii do objeto em x
        carObj = obj.value.charCodeAt( x );
        //caracter da mascara em x
        carMas = mask.substr( x, 1 );
        //somente num�ricos
        if( carMas == "9" )
        {
            if( !( carObj > 47  && carObj < 58 ) )
                return false;
        }
        //alfaNum�ricos
        else if( carMas == "X" )
        {
            if( !( ( carObj > 64 && carObj < 91 ) || ( carObj > 96 && carObj < 123 ) || ( carObj > 47  && carObj < 58 ) ) )
                return false;
        }
        //somente alfab�ticos
        else if( carMas == "A" )
        {
            if( !( ( carObj > 64 && carObj < 91 ) || ( carObj > 96 && carObj < 123 ) ) )
                return false;
        }
        //outros fixos na mascara
        else
        {
            if( carObj != carMas.charCodeAt( 0 ) )
                return false;
        }
    }
    return true;//valido
}

/**
 * Mostra menu quando o bot�o direito do mouse � clicado na tela.
 * @version 1.0 07/07/2003
 * @author Diego R. Drumond
 */
function showMenu( )
{
    var rightedge  = document.body.clientWidth - event.clientX;
    var bottomedge = document.body.clientHeight - event.clientY;
    if( rightedge < popupMenu.offsetWidth )
        popupMenu.style.left = document.body.scrollLeft + event.clientX - popupMenu.offsetWidth;
    else
        popupMenu.style.left = document.body.scrollLeft + event.clientX;
    if( bottomedge < popupMenu.offsetHeight )
        popupMenu.style.top = document.body.scrollTop + event.clientY - popupMenu.offsetHeight;
    else
        popupMenu.style.top = document.body.scrollTop + event.clientY;
    popupMenu.style.visibility = "visible";
    return false;
}

/**
 * Esconde menu popup.
 * @version 1.0 07/07/2003
 * @author Diego R. Drumond
 */
function hideMenu( )
{
    popupMenu.style.visibility = "hidden";
}

/**
 * Coloco foco no item do menu quando o mouse est� em cima dele.
 * @version 1.0 07/07/2003
 * @author Diego R. Drumond
 */
function highLight( )
{
        if( event.srcElement.className == "menuitems" )
        {
            event.srcElement.style.backgroundColor = "highlight";
            event.srcElement.style.color           = "white";
        }
}

/**
 * Remove foco do item do menu quando mouse � retirado de cima do item.
 * @version 1.0 07/07/2003
 * @author Diego R. Drumond
 */
function lowLight()
{
    if( event.srcElement.className == "menuitems" )
    {
        event.srcElement.style.backgroundColor = "";
        event.srcElement.style.color           = "black";
    }
}

/**
 * Executa op��o clicada do menu.
 * @version 1.0 07/07/2003
 * @author Diego R. Drumond
 */
function jumpTo( )
{
    if( event.srcElement.className == "menuitems" )
        if( event.srcElement.url != '' )
            if( event.srcElement.getAttribute( "target" ) != null )
                window.open( event.srcElement.url, event.srcElement.getAttribute( "target" ) )
            else
                window.location = event.srcElement.url;
}

/**
 * Fun��o para acrescentar zeros a uma vari�vel conforme o parametro camp
 * @version 1.0 29/04/2003
 * @author Cleiton
 * @param camp Campo que sera formatado
 * @param casas Numero de casas que o campo deve ter
 * @return Campo formatado.
 */
function acreZero(camp,casas)
{
    camp = ""+camp;
    i2=camp.length;
    auxFormatacao=camp;
    while (i2 < casas)
    {
        auxFormatacao = "0"+auxFormatacao;
        i2++;
    }
    return(auxFormatacao);
}
/**
 * Fun��o para acrescentar zeros a uma vari�vel conforme o parametro camp
 * @version 1.0 29/04/2003
 * @author Cleiton
 * @param camp Campo que sera formatado
 * @param casas Numero de casas que o campo deve ter
 * @return Campo formatado.
 */
function acreEspaco(camp,casas)
{
    camp = ""+camp;
    i2=camp.length;
    auxFormatacao=camp;
    while (i2 < casas)
    {
        auxFormatacao = "&nbsp;"+auxFormatacao;
        i2++;
    }
    return(auxFormatacao);
}
/**
 * Fun��o para formatar valor para decimal com n�mero de casas informado
 * @version 1.0 17/06/2003
 * @version 1.1 26/08/2003
 * @author Alan
 * @param valor Real|Inteiro|Char contendo o valor a ser formatado
 * @param decimal Inteiro contendo numero de casas decimais
 * @return Real formatado com casas decimais informado
 */
function editaValor( valor, decimal )
{
    //acrescentando ponto
    if( !( valor.toString( ).indexOf( "." ) > 0 ) )
        valor += ".";
    //colocando tamanho certo no decimal
    valor   += acreZero( "0", decimal );
    //posi��o do ponto
    posPonto = valor.indexOf( "." );
    //pegando campo decimal
    decimal  = valor.substr( posPonto + 1, decimal );
    //pegando campo inteiro
    valor = valor.substr( 0, posPonto );
    //retorno inteiro,decimal
    return ( inserePonto( valor ) + "," + decimal );
}

/**
 * Fun��o para converter datas em milisegundos(n�mero inteiro)
 * @version 1.0 01/04/2003
 * @author Diego R. Drumond
 * @param data Data no formato MM/DD/AAAA
 * @return Inteiro contendo a data em milisegundos
 */
function dtParaMs( data )
{
    var dt = new Date(data);
    return dt.getTime();
}

/**
 * Fun��o para converter horas em milisegundos(n�mero inteiro)
 * @version 1.0 30/01/2006
 * @author Diego R. Drumond
 * @param data Hora em qualquer formato separada por :
 * @return Inteiro contendo a hora em milisegundos
 */
function hrParaMs( hora )
{
    var hr = new Date( );

    strHr = hora.split( ':' );

    hr.setHours( strHr[ 0 ] );
    hr.setMinutes( strHr[ 1 ] );

    if( strHr.length > 2 )
        hr.setSeconds( strHr[ 2 ] );
    else
        hr.setSeconds( 0 );

    hr.setMilliseconds( 0 );

    return hr.getTime( );
}

/**
 * Fun��o para converter um tempo em milisegundos para dias.
 * @version 1.0 01/04/2003
 * @author Diego R. Drumond
 * @param ms Inteiro contendo o tempo a ser convertido
 * @return Inteiro contendo o n�mero de dias contido no tempo informado
 */
function msParaDia( ms )
{
    var m = 24 * 60 * 60 * 1000;
    return ms / m;
}

/**
 * Fun��o para converter um n�mero de dias em milisegundos
 * @version 1.0 01/04/2003
 * @author Diego R. Drumond
 * @param dia n�mero de dias a ser convertido
 * @return Inteiro contendo o n�mero de dias em milisegundos
 */
function diaParaMs( dia )
{
    var m = 24 * 60 * 60 * 1000;
    return dia * m;
}

/**
 * Fun��o para calcular a diferan�a(em dias) entre duas datas
 * @version 1.0 01/04/2003
 * @author Diego R. Drumond
 * @param dt1 Data inicial no formato DD/MM/YYYY
 * @param dt2 Data final no formato DD/MM/YYYY
 * @return n�mero de dias entre as duas datas
 * @see formataDatas
 * @see dtParaMs
 * @see msParaDia
 */
function calculaDias( dt1, dt2 )
{
    dt1 = formataDatas(dt1, 'DD/MM/YYYY', 'MM/DD/YYYY');
    dt2 = formataDatas(dt2, 'DD/MM/YYYY', 'MM/DD/YYYY');
    var dias = dtParaMs( dt2 ) - dtParaMs( dt1 );
    return Math.round( msParaDia( dias ) );
}

/**
 * Fun��o para comparar duas datas
 * @version 1.0 01/04/2003
 * @author Diego R. Drumond
 * @param dt1 Primeira data (formato DD/MM/YYYY)
 * @param dt2 Segunda data (formato DD/MM/YYYY)
 * @return Retorna um inteiro contendo um valor que corresponde a maior data > 0: iguais, 1: dt1 maior, 2: dt2 maior
 * @see formataDatas
 * @see dtParaMs
 */
function comparaDatas( dt1, dt2 )
{
    dt1 = formataDatas(dt1, 'DD/MM/YYYY', 'MM/DD/YYYY');
    dt2 = formataDatas(dt2, 'DD/MM/YYYY', 'MM/DD/YYYY');
    if( dtParaMs(dt1) > dtParaMs(dt2) )
        return 1;
    else if( dtParaMs(dt1) < dtParaMs(dt2) )
        return 2;
    else
        return 0;
}

/**
 * Fun��o para validar datas
 * @version 1.0 21/05/2003
 * @author Diego R. Drumond
 * @param data no formato DD/MM/YYYY
 * @return Retorna verdadeiro para da v�lida e false para inv�lida
 * @adicionando parametro verificador para exibir msg pre-definida - 24/03/08 - Bruno
 */
var mostraMsgDefinida = true;
function validaDatas( data, msg )
{
    if ( msg != null )
    {
        mostraMsgDefinida = msg;
    }
    dt1   = new Date( data.substr( 3, 2 ) + "/" + data.substr( 0, 2 ) + "/" + data.substr( 6, 4 ) );
    data2 = ( dt1.getDate() + 100 ).toString( ).substr( 1, 2 ) + "/" + ( dt1.getMonth( ) + 101 ).toString( ).substr( 1, 2 ) + "/" + dt1.getFullYear( );
    
        if( data != data2 || parseInt( dt1.getFullYear( ) ) < 1900 || parseInt( dt1.getFullYear( ) ) > 3000 )
        {
            if ( mostraMsgDefinida )
            {
                alert( GENDT0003 );
            }    
            return false;
        }
    
    return true;
}

/**
 * Fun��o para adicionar ou subtrair dias de uma data
 * @version 1.0 01/04/2003
 * @author Diego R. Drumond
 * @param data Data no formato DD/MM/YYYY
 * @param dias n�mero de dias a serem adicionados(ou subtraidos) na data
 * @return Data no formato DD/MM/YYYY com os dias adicionados
 * @see formataDatas
 * @see dtParaMs
 * @see diaParaMs
 */
function operaData( data, dias )
{
    data = formataDatas( data, 'DD/MM/YYYY', 'MM/DD/YYYY' );
    var dt = dtParaMs( data ) + diaParaMs( dias );
    dt = new Date( dt );    
    
    /*
       existem datas que ao somar 1 dia ela nao passa para o proximo dia
       por exemplo "11.02.2007" que ao adicionar 1 dia a data continua "11.02.2007" com a hora de 23:00:00
       soma-se o valor de 1 hora em milisegundos
    */
    if( dt.toString().indexOf( "23:00:00" ) != -1 )
        dt = new Date( dtParaMs( data ) + diaParaMs( dias ) + 3600000 );
    
    var dia = (  dt.getDate( ) + 100 ).toString( ).substr( 1, 3 );
    var mes = ( dt.getMonth( ) + 101 ).toString( ).substr( 1, 3 );
    var ano = dt.getFullYear( );
    return dia + "/" + mes + "/" + ano;
}

/**
 * Fun��o para adicionar ou subtrair segundos de uma hora
 * @version 1.0 16/04/2003
 * @author Diego R. Drumond
 * @param hora Hora no formato HH:MM:SS
 * @param minutos n�mero de segundos a serem adicionados(ou subtraidos) na hora
 * @return Hora no formato HH:MM:SS com os segundos adicionados
 */
function operaHora( hora, segundos )
{
    hr = new Date( );
    if( hora.length == 5 ){
          hr.setHours( parseFloat( hora.substring( 0, 2 ) ) );
        hr.setMinutes( parseFloat( hora.substring( 3, 5 ) ) );
        hr.setSeconds( parseFloat( 00 ) + segundos );

        hora  = ( (   hr.getHours( ) + 100 ).toString( ) ).substring( 1, 3 ) + ":";
        hora += ( ( hr.getMinutes( ) + 100 ).toString( ) ).substring( 1, 3 );
    }else{
          hr.setHours( parseFloat( hora.substring( 0, 2 ) )            );
        hr.setMinutes( parseFloat( hora.substring( 3, 5 ) )            );
        hr.setSeconds( parseFloat( hora.substring( 6, 8 ) ) + segundos );

        hora  = ( (   hr.getHours( ) + 100 ).toString( ) ).substring( 1, 3 ) + ":";
        hora += ( ( hr.getMinutes( ) + 100 ).toString( ) ).substring( 1, 3 ) + ":";
        hora += ( ( hr.getSeconds( ) + 100 ).toString( ) ).substring( 1, 3 );
   }

    return hora;
}

/**
 * Fun��o que pega uma data em um formato qualquer e converte em outro formato
 * @version 1.0 01/04/2003
 * @author Diego R. Drumond
 * @param dtParam Data em um formato qualquer
 * @param formatoEntrada Formato atual da data
 * @param formatoSaida Formato em que a data sa�da
 * @return Data no formato escolhido
 */
function formataDatas(dtParam, formatoEntrada, formatoSaida)
{
    if( formatoEntrada.toUpperCase( ) == "DD/MM/YYYY" )
    {
        diaSaida = dtParam.substring( 0,  2 );
        mesSaida = dtParam.substring( 3,  5 );
        anoSaida = dtParam.substring( 6, 10 );
    }
    if( formatoEntrada.toUpperCase( ) == "YYYY-MM-DD" )
    {
        anoSaida = dtParam.substring( 0,  4 );
        mesSaida = dtParam.substring( 5,  7 );
        diaSaida = dtParam.substring( 8, 10 );
    }
	if( formatoEntrada.toUpperCase( ) == "MM/DD/YYYY" )
    {
        mesSaida = dtParam.substring( 0,  2 );
        diaSaida = dtParam.substring( 3,  5 );
        anoSaida = dtParam.substring( 6, 10 );
    }
    else if( formatoEntrada.toUpperCase( ) == "TIMESTAMP" )
    {
        anoSaida = dtParam.substring( 0,  4 );
        mesSaida = dtParam.substring( 5,  7 );
        diaSaida = dtParam.substring( 8, 10 );
    }
    var dtAux = new Date( mesSaida + "/" + diaSaida + "/" + anoSaida );

    if( formatoSaida.toUpperCase( ) == "EXTENSO" )
    {
        var meses = new Array( 'Janeiro','Fevereiro','Mar�o','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro' );
        return diaSaida + " de " + meses[ parseFloat( mesSaida ) - 1 ] + " de " + anoSaida;
    }

    dataSaida = formatoSaida;
    dataSaida = dataSaida.replace(   "DD", diaSaida );
    dataSaida = dataSaida.replace(   "MM", mesSaida );
    dataSaida = dataSaida.replace( "YYYY", anoSaida );
    dataSaida = dataSaida.replace( "AAAA", anoSaida );
    return dataSaida;
}

/**
 * Fun��o que pega uma hora e converte em outro formato
 * @version 1.0 09/06/2006
 * @author lucas hermano
 * @param horaParam Hora em um formato qualquer
 * @param formatoEntrada Formato atual da hora
 * @param formatoSaida Formato em que a hora sa�da
 * @return Data no formato escolhido
 */
function formataHoras( horaParam, formatoEntrada, formatoSaida)
{
    
    if( horaParam.length <= 8 )
        return horaParam;
    
    if( formatoEntrada.toUpperCase( ) == "TIMESTAMP" )
    {
        horaSaida = horaParam.substring( 11,  13 );
        minutoSaida = horaParam.substring( 14,  16 );
        segundoSaida = horaParam.substring( 17, 19 );
    }
    
    horaSaida = formatoSaida.replace( "HH", horaSaida );
    horaSaida = horaSaida.replace( "MM", minutoSaida );
    horaSaida = horaSaida.replace( "SS", segundoSaida );
    return horaSaida;
}

/**
 * Edita um campo para datas colocando as barras
 * @version 1.0 16/04/2004
 * @author Diego R. Drumond
 * @param campo Componente html do tipo text
 * @param teclapres Objeto event
 * @see operaData
 */
function editaData( campo, evt )
{
    retornaEstadosTeclas( evt );
    tecla = retornaKeyCode( evt );
    //verifica se usu�rio digitou tecla de atalho para inserir data atual no campo.
    if( tecla == 104 || tecla == 72 ) // 104 = h, 72 = H
    {
        hoje = new Date(dataServidor);
        dataDeHoje  = ( (  hoje.getDate( ) + 100 ).toString( ) ).substring( 1, 3 ) + "/";
        dataDeHoje += ( ( hoje.getMonth( ) + 101 ).toString( ) ).substring( 1, 3 ) + "/";
        dataDeHoje += hoje.getFullYear( );
        campo.value = dataDeHoje;
        cancelaEvento( evt );
        try{campo.onchange( );}catch(ERROR){};
        return true;
    }
    //se campo estiver preenchido, aciona atalhos para somar e subtrair dias da data.
    if( campo.value.length == 10 )
    {
        //Se o usuario digitar Shift + '+', acrescenta 30 dias a data
        if( shift && tecla == 43 )
        {
            campo.value = operaData( campo.value, 30 );
            cancelaEvento( evt );
            try{campo.onchange( );}catch(ERROR){};
            return true;
        }
        //Se o usuario digitar '+', acrescenta 1 dia a data
        else if( tecla == 43 )
        {
            campo.value = operaData( campo.value, 1 );
            cancelaEvento( evt );
            try{campo.onchange( );}catch(ERROR){};
            return true;
        }
        //Se o usuario digitar Shift + '-', subtrai 30 dias da data
        if( shift && tecla == 45 )
        {
            campo.value = operaData( campo.value, -30 );
            cancelaEvento( evt );
            try{campo.onchange( );}catch(ERROR){};
            return true;
        }
        //Se o usuario digitar '-', subtrai 1 dia da data
        else if( tecla == 45 )
        {
            campo.value = operaData( campo.value, -1 );
            cancelaEvento( evt );
            try{campo.onchange( );}catch(ERROR){};
            return true;
        }
    }
    mascara( campo, evt, "99/99/9999" );
}

/**
 * Fun��o para formatar hora 
 * @version 1.1 16/04/2004
 * @author Diego R. Drumond
 * @param campo Campo da hora (this)
 * @param pTeclaPres Tecla pressionada (event)
 */
function formataHora( campo, evt )
{
    retornaEstadosTeclas( evt );
    tecla = retornaKeyCode( evt );
    //verifica se usu�rio digitou tecla de atalho para inserir hora atual no campo.
    if( tecla == 104 || tecla == 72 ) // 104 = h, 72 = H
    {
        hoje = new Date( );
        if( campo.size == 5 ){
            horaAtual  = ( (   hoje.getHours( ) + 100 ).toString( ) ).substring( 1, 3 ) + ":";
            horaAtual += ( ( hoje.getMinutes( ) + 100 ).toString( ) ).substring( 1, 3 );
        }else{
            horaAtual  = ( (   hoje.getHours( ) + 100 ).toString( ) ).substring( 1, 3 ) + ":";
            horaAtual += ( ( hoje.getMinutes( ) + 100 ).toString( ) ).substring( 1, 3 ) + ":";
            horaAtual += ( ( hoje.getSeconds( ) + 100 ).toString( ) ).substring( 1, 3 );
        }
        campo.value = horaAtual;
        cancelaEvento( evt );
        return true;
    }
    //se campo estiver preenchido, aciona atalhos para somar e subtrair minutos da hora.
    if( campo.value.length == 8 )
    {
        //Se o usuario digitar Shift + '+', acrescenta 1 hora
        if( shift && tecla == 43 )
        {
            campo.value = operaHora( campo.value, ( 60 * 60 ) );
            cancelaEvento( evt );
            return true;
        }
        //Se o usuario digitar '+', acrescenta 1 minuto
        else if( tecla == 43 )
        {
            campo.value = operaHora( campo.value, 60 );
            cancelaEvento( evt );
            return true;
        }
        //Se o usuario digitar Shift + '-', subtrai 1 hora
        if( shift && tecla == 45 )
        {
            campo.value = operaHora( campo.value, -( 60 * 60 ) );
            cancelaEvento( evt );
            return true;
        }
        //Se o usuario digitar '-', subtrai 1 minuto
        else if( tecla == 45 )
        {
            campo.value = operaHora( campo.value, -60 );
            cancelaEvento( evt );
            return true;
        }
    }

    if( campo.value.length == 5 )
    {
        //Se o usuario digitar Shift + '+', acrescenta 1 hora
        if( shift && tecla == 43 )
        {
            campo.value = operaHora( campo.value, ( 60 * 60 ) );
            cancelaEvento( evt );
            return true;
        }
        //Se o usuario digitar '+', acrescenta 1 minuto
        else if( tecla == 43 )
        {
            campo.value = operaHora( campo.value, 60 );
            cancelaEvento( evt );
            return true;
        }
        //Se o usuario digitar Shift + '-', subtrai 1 hora
        if( shift && tecla == 45 )
        {
            campo.value = operaHora( campo.value, -( 60 * 60 ) );
            cancelaEvento( evt );
            return true;
        }
        //Se o usuario digitar '-', subtrai 1 minuto
        else if( tecla == 45 )
        {
            campo.value = operaHora( campo.value, -60 );
            cancelaEvento( evt );
            return true;
        }
    }

    if( campo.size == 5 ){
        mascara( campo, evt, "99:99" );
    }else{
        mascara( campo, evt, "99:99:99" );
    }
}

/**
 * Muda o foco do componente atual para o pr�ximo da tela, selecionando seu conteudo.
 *
 * @version 1.1 22/04/2004
 * @author Diego R. Drumond
 * @param evt Objeto 'event' do campo.
 */
function enter( evt )
{
    //caso a tecla pressionada seja o [ ENTER ] muda o foco para o pr�ximo componente.
    if( evt.keyCode == 13 )
    {
        //verifica se o browser � Netscape ou IE.
        target = ( evt.target ) ? evt.target : evt.srcElement;
        //formul�rio ao qual o campo, que est� recebendo o evento atual, pertence.
        formulario = target.form;
        //define se o pr�ximo campo dever� receber o foco.
        proximo = false;
        //procura o campo atual no formul�rio para dar foco ao pr�ximo campo.
        for( i = 0; i < formulario.elements.length; i++ )
        {
            if( proximo )
            {
                /* verifica se o campo � 'readOnly' ou 'disabled' e se ela n�o � do tipo 'hidden',
                 * pois estes componentes n�o podem receber o foco. */
                readonly = ( formulario.elements[ i ].readOnly == undefined ) ? false : formulario.elements[ i ].readOnly;
                disabled = ( formulario.elements[ i ].disabled == undefined ) ? false : formulario.elements[ i ].disabled;
                type     = formulario.elements[ i ].type;

                if( readonly == false && disabled == false && type != "hidden" )
                {
                    if( ( pos = achaLink( document, "consulta"+formulario.elements[ i ].name ) ) >= 0 )
                        document.links[ pos ].focus( );
                    else
                    {
                        formulario.elements[ i ].focus( );
                        if( type == "text" || type == "textarea" )
                            formulario.elements[ i ].select( );
                    }

                    cancelaEvento( evt );
                    break;
                }
            }
            /* verifica se o componente atual � o componente do �ndice da repeti��o, caso
             * seja, define que o pr�ximo campo receber� o foco. */
            if( formulario.elements[ i ].name == target.name )
                proximo = true;
        }
        cancelaEvento( evt );
    }
}

/**
 * Faz pesquisa em um select de acordo com o texto digitado pelo usu�rio.
 *
 * @version 1.0 28/04/2004
 * @author Diego R. Drumond
 * @param campo Componente do tipo select que ser� pesquisado.
 * @param evt Objeto event do browser que continuam a tecla pressionada.
 */
var limiteTemporizador = 2;
function pesquisaCombo( campo, evt )
{
    tecla = retornaKeyCode( evt );

    //se o usu�rio ficar 2 segundos sem digitar nenhuma letra, zera a vari�vel de pesquisa.
    if( timerPesquisaCombo.getSegundos( ) >= limiteTemporizador )
    {
        strPesquisaCombo = "";
    }
    //sempre que uma tecla � pressionada, o timer � zerado.
    timerPesquisaCombo.setSegundos( 0 );

    //se caracter pressionado n�o for backspace, adiciona o caracter � string de pesquisa.
    if( evt.keyCode != 8 )
    {
        if( tecla != 0 )
            strPesquisaCombo += String.fromCharCode( tecla );
    }

    //se a string de pesquisa estiver vazia, seleciona o primeiro item do componente.
    if( strPesquisaCombo.length == 0 )
    {
        campo.options[ 0 ].selected = true;
        cancelaEvento( evt );
        return false;
    }
    //pesquisa em todas as op��es a string de busca j� digitada.
    for( i = 0; i < campo.options.length; i++ )
    {
        //se o valor encontrado estiver no in�cio do texto da op��o, seleciona a op��o atual.
        if( campo.options[ i ].text.toLowerCase( ).indexOf( strPesquisaCombo.toLowerCase( ) ) == 0 )
        {
            campo.options[ i ].selected = true;
            try
            {
                campo.onchange( );
            }
            catch( Error )
            { }
            break;
        }
    }
    cancelaEvento( evt );
}

/**
 * Fun��o chamada depois que o tempo limite de pesquisa no combo expira
 *
 * @version 1.0 16/07/2007
 * @author Alan
 */
function afterPesquisaCombo( ){ }

/**
 * Inicializa o temporizador de pesquisa em componentes do tipo select.
 *
 * @version 1.0 28/04/2004
 * @author Diego R. Drumond
 */
function temporizadorPesquisaCombo( )
{
    if( timerPesquisaCombo.getSegundos( ) == limiteTemporizador  && strPesquisaCombo.length>0 )
    {
        strPesquisaCombo = "";
        afterPesquisaCombo( );
    }
    timerPesquisaCombo.addSegundos( 1 );
    //a cada segundo, a Fun��o � chamada novamente, incrementando o timer em 1 segundo.
    setTimeout( "temporizadorPesquisaCombo( )", 1000 );
}

/**
 * Verifica se a tecla pressionada no select � o backspace e retira um caracter da string de pesquisa.
 *
 * @version 1.0 28/04/2004
 * @author Diego R. Drumond
 * @param campo Componente do tipo select que est� sendo pesquisado.
 * @param evt Objeto event do browser que cont�m a tecla pressionada.
 */
function retirarCaracterPesquisa( campo, evt )
{
    if( evt.keyCode == 8 )
    {
        if( strPesquisaCombo.length > 0 )
            strPesquisaCombo = strPesquisaCombo.substring( 0, strPesquisaCombo.length - 1 );
        //pesquisa o select com a nova string de pesquisa.
        pesquisaCombo( campo, evt );
        cancelaEvento( evt );
    }
}

/**
 * Fun��o que formata um campo para aceitar somente caracteres num�ricos
 * @version 1.0 01/04/2003
 * @param teclapres Objeto event
 */
function somenteNumeros( evt )
{
    //despreza caracteres n�o num�ricos
    tecla = retornaKeyCode( evt );

        //se a tecla pressionada n�o for um caracteres ou um n�mero, sai da Fun��o.
    if( tecla == 8 || tecla == 0 )
        return;

    if( tecla < 48 || tecla > 57 )
            cancelaEvento( evt );
}

/**
 * 
 */
function editaDecimal( campo, evt, tammax, decimais )
{
    tecla = retornaKeyCode( evt );
    //se a tecla pressionada n�o for um caracteres ou um n�mero, sai da Fun��o.
    if( tecla == 8 || tecla == 0 )
        return;
    //verifica se o caracter digitado � um n�mero, ',' ou '.', '+' ou '-'.
    if( ( tecla < 48 || tecla > 57 ) && tecla != 46 && tecla != 45 && tecla != 44 && tecla != 43 )
        cancelaEvento( evt );
    else
    {
        //se campo n�o estiver vazio, libera teclas de atalho.
        if( campo.value != "" )
        {
            //adiciona 1 ao n�mero informado.
            if( tecla == 43 )
            {
                if( campo.value.indexOf( "-" ) >= 0 )
                    campo.value = campo.value.substring(1,campo.value.length);

                cancelaEvento( evt );
                try{campo.onchange( );}catch(ERROR){};
                return;
            }
            //subtrai 1 do n�mero informado.
            else if( tecla == 45 )
            {
                if( campo.value.indexOf( "-" ) < 0 )
                {
                    if( parseFloat( campo.value ) != 0 )
                        campo.value = '-' + campo.value;
                }
                
                //campo.value = parseFloat( campo.value ) - ( ( parseFloat( campo.value ) > 0 ) ? 1 : 0 );
                cancelaEvento( evt );
                try{campo.onchange( );}catch(ERROR){};
                return;
            }
        }
        else
        {
            //se telca pressionada for '+' e o campo estiver vazio, insere o valor 1 no campo.
            if( tecla == 43 )
            {
                campo.value = "1";
                cancelaEvento( evt );
                try{campo.onchange( );}catch(ERROR){};
                return;
            }
            //se telca pressionada for '-' e o campo estiver vazio, insere o valor 0 no campo.
            else if( tecla == 45 )
            {
                campo.value = "0";
                cancelaEvento( evt );
                try{campo.onchange( );}catch(ERROR){};
                return;
            }
        }
        //m�scara do campo. Ex: 9999.99
        mask = "";
        for( i = 0; i < tammax - decimais; i++ )
            mask += "0";

        if( decimais > 0 )
        {
            mask += ",";
            for( i = 0; i < decimais; i++ )
                mask += "0";
        }
        /* n�mero m�ximo de caracteres permitidos no campo � a soma do tamanho m�ximo mais a quantidade de casas
         * decimais mais 1, que indica o '.'( ou ',' ) que separa a parte inteira da parte decimal. */
        if( ( campo.value.length == ( tammax + 1 ) ) && campo.value != mask )
        {
            cancelaEvento( evt );
            return;
        }
        //verifica se j� existe um '.' ou uma ',' indicando a parte decimal do n�mero.
        if( campo.value.indexOf( '.' ) >= 0 || campo.value.indexOf( ',' ) >= 0 )
        {
            if( tecla == 44 || tecla == 46 )
                cancelaEvento( evt );
        }
        //se a parte inteira do n�mero j� estiver esgotada, insere o '.' que indica a parte decimal do n�mero.
        else
        {
            if( campo.value.length == ( tammax - decimais ) && ( tecla != 44 || tecla != 46 ) )
                campo.value += ",";
        }
    }
}

/**
 * Faz a formata��o( e desformata��o ) de um n�mero decimal qualquer, inserindo pontos e a v�rgula( para indicar a parte decimal ).
 * No firefox, tais modifica��es fazem com que o onchange entenda que nada foi alterado, 
 * por que foi um script que a modificou, foi criado uma forma de chamar isto de dentro deste js(Alan 28-09-2007 )
 * @version 1.0 22/04/2004
 * @author Diego R. Drumond
 * @param campo Campo que ter� seu valor formatado.
 * @param tammax Tamanho m�ximo do campo. As casas decimais devem estar embutidas nesse valor.
 *               Ex: tammax - 10 qteDecimais - 2 -> parte inteira = 8, parte decimal = 2.
 * @param qteDecimais Precis�o do n�mero( quantidade de n�meros apenas a v�rgula ).
 * @param formata Define se o n�mero ser� formatado ou se sua formata��o ser� retirada.
 */
function formataDecimal( campo, tammax, qteDecimais, formata )
{
    var valor = campo.value;
    var decimais = "";
    var campoHidden = "";
    var execOnChange = false;
    if( valor.length == 0 )
        return;

    //verifica se o n�mero ser� formatado ou se a formata��o do n�mero ser� retirada.
    if( formata )
    {

        valor    = valor.replace( ",", "." );
        
        if( parseFloat( valor ) == 0 )
            valor = "0";

        //se o n�mero n�o for v�lido, troca o valor do campo para '0'.
        if( isNaN( parseFloat( valor ) ) )
        {
            campo.valor = "0";
            //necessidade de utiliza��o de onchange for�ado
            campo.onChange();
            return;
        }

        if( ( pos = valor.indexOf( "." ) ) >= 0 )
        {
            //se a quantidade de casas antes do ponto for maior que a permitida, move o ponto para a esquerda.
            if( pos > tammax - qteDecimais )
            {
                valor = valor.replace( ".", "" );
                valor = valor.substring( 0, tammax - qteDecimais ) + "." + valor.substring( tammax - qteDecimais, tammax );
                pos   = tammax - qteDecimais;
            }
            //retira n�meros ap�s o ponto.
            decimais = valor.substring( pos + 1, valor.length );
            //Verifica necessidade de utiliza��o de onchange for�ado
            execOnChange = decimais.length != qteDecimais;
            //caso a qtde de n�meros das casas decimais seja maior que o permitido, retira os �ltimos n�meros.
            if( ( decimais.length ) > qteDecimais )
                decimais = decimais.substring( 0, qteDecimais );

            while( decimais.length < qteDecimais )
                decimais += "0";

            decimais = "," + decimais;
            valor    = valor.substring( 0, pos );
        }
        else
        {
            execOnChange=true;
            decimais = ",";
            for( i = 0; i < qteDecimais; i++ )
                decimais += "0";
        }
        //substitui 'txt' por 'hid' para fazer refer�ncia � um campo 'hidden' da tela.
        campoHidden = campo.name.replace( "txt", "hid" );
        //busca componente no form.
        campoHidden = eval( "campo.form." + campoHidden );

        //verifica se o componente existe e atribui o valor ao campo 'hidden'.
        var exec_onChange=false;
        if( campoHidden != undefined )
        {
            exec_onChange = (campoHidden.value != valor + decimais.replace( ",", "." ));
            campoHidden.value = valor + decimais.replace( ",", "." );
        }
        
        //Caso a parte decimal n�o tenha sofrido modifica��es, verifica se o 
        //valor ser� maior q 3 casas, o que j� entra na quest�o de formata�ao de pontos
        if( !execOnChange )
            execOnChange = valor.length>3;
        
        //formata o valor inserindo os pontos.
        valor = inserePonto( valor ) + decimais;
        campo.value = valor;

        //S� executar� se foi criado alguma formata��o n�o existente e se houve 
        //realmente modifica��o do valor, e se n�o for IE
        if( navigator.appVersion.indexOf( "MSIE" ) == -1 && execOnChange && exec_onChange && campo.onchange )
            campo.onchange();
    }
    //se a formata��o for retirada.
    else
    {
        //remove os pontos do n�mero.
        while( valor.indexOf( "." ) >= 0 )
            valor = valor.replace( ".", "" );

        campo.value = valor;
        //seleciona o conte�do do campo.
        try
        {
            campo.select( ); 
        }
        catch(ERROR)
        {
        }
    }
}

/**
 * Fun��o para edi��o de n�meros
 * @version 1.0 05/02/2002
 * @author Alexandre
 * @param campo Obejto input do form
 * @param tammax Tamanho m�ximo do campo
 * @param decimais n�mero de casas decimais
 * @param teclapres Objeto event
 * @deprecated Utilizar Fun��o editaDecimal(object,event,int,int)
 */
function formataValor(campo, tammax, decimais, teclapres)
{
   if (teclapres==null)
   {
      tecla = 0;
   } else tecla = retornaKeyCode( teclapres );

   //Joga o valor do campo em vr
   vr = campo.value;
   //Limpa barras
   vr = vr.replace( "/", "" );
   vr = vr.replace( "/", "" );
   //retira virgulas
   while (vr.indexOf(",")>=0)
   {
      vr = vr.replace( ",", "" );
   }
   //Vai ao primeiro ponto
   pos1 = vr.indexOf(".");
   //Se existir o ponto
   if (pos1>-1)
   {
      //retira a parte decimal
      partDec = vr.substring(pos1+1,vr.length);
      //alert("Decimal: "+partDec);
      while (partDec.length<decimais)
      {
        partDec += "0";
      }
      partInt = vr.substring(0,pos1);
      vr = partInt + partDec;
      //alert("Dec e Int: "+vr);
   }
   vrAuxiliar = vr.replace(".","");
   if (teclapres&&vrAuxiliar.length>=tammax)
   {
      cancelaEvento( teclapres );
      return campo.value;
   } else if (tammax<=decimais&&tammax!=0)
          {
              alert(SEGBA0005)
              return campo.value;
              //despreza caracteres n�o num�ricos
          } else if (teclapres && ((tecla<48 || tecla>57) && (tecla!=45)))
                 {
                    cancelaEvento( teclapres );
                    return campo.value;
                 } else if (tecla!=36)
                        {
                           // guarda caracter digitado
                           var caracter = ""
                           if (teclapres)
                           {
                              caracter = String.fromCharCode(tecla);
                           }
                           auxDecimais = "";
                           vr = vr + caracter
                           if (decimais>0)
                           {
                              auxDecimais = vr.substring(vr.length - decimais, vr.length);
                              vr = vr.substring(0,vr.length - decimais);
                           }
                           tam = vr.length;
                           if (tam < tammax && tecla != 8)
                           {
                             tam = vr.length + 1 ;
                           }
                           if (tecla == 8 )
                           {
                             tam = tam - 1 ;
                           }
                           vr = trocaString(vr, ".", "");
                           vr =  inserePonto(vr);
                           //guarda valor original retirando os pontos e inserindo as decimais
                           valorOriginal  = vr
                           while (valorOriginal.indexOf(".")>=0)
                           {
                              valorOriginal  = valorOriginal.replace(".", "" );
                           }
                           valorOriginal = valorOriginal + "." + auxDecimais;
                           if (valorOriginal==".")
                           {
                              valorOriginal="0";
                           }
                           strNomeCampo = campo.name;
                           nomeCampoHidden = strNomeCampo.replace('txt','hid');
                           if (eval("document.forms[0]."+nomeCampoHidden))
                           {
                              eval("document.forms[0]."+nomeCampoHidden+".value='"+valorOriginal+"'")
                           }
                           if (teclapres)
                           {
                             cancelaEvento( teclapres );
                           }
                           if (decimais>0&&auxDecimais!="")
                           {
                              return vr + "," + auxDecimais;
                           } else return  vr;

                        }
}

/**
 * Fun��o para inserir ponto
 * @version 1.0 01/04/2003
 * @author Diego R. Drumond
 * @param srcNumber n�mero a ser formatado
 * @return n�mero formatado
 */

function inserePonto(srcNumber)
{
   var txtNumber = '' + srcNumber;
   var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][.#])');
   var arrNumber = txtNumber.split('#');
   arrNumber[0] += '#';
   do
   {
     arrNumber[0] = arrNumber[0].replace(rxSplit, '$1.$2');
   } while (rxSplit.test(arrNumber[0]));
   if (arrNumber.length > 1)
   {
     return  arrNumber.join('');
   } else {
            return arrNumber[0].split('#')[0];
          }
}

/**
 * Fun��o para inserir ponto
 * @version 1.0 01/04/2003
 * @author Ruy
 * @param srcNumber n�mero para edi��o
 * @param mascara Mascara do n�mero
 * @return n�mero formatado
 */

function inserePonto2(srcNumber, mascara)
{
  var txtNumber = '' + srcNumber;
  var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][.#])');
  var arrNumber = txtNumber.split('#');
  arrNumber[0] += '#';
  do
  {
    arrNumber[0] = arrNumber[0].replace(rxSplit, '$1.$2');
  }while (rxSplit.test(arrNumber[0]));
  if (arrNumber.length > 1)
  {
    return  arrNumber.join('');
  } else {
           return arrNumber[0].split('#')[0];
         }
}

/**
 * Fun��o para retirar caracteres do inicio e/ou do final de uma string
 * @version 1.0 01/04/2003
 * @author Ruy
 * @param parCampo String a ser formatada
 * @param caracter Caracter a ser retirado
 * @param opcao op��o desejada:  I = retira do in�cio; F = retira do final; T = retira as ocorrencias do in�cio e do final
 * @return String sem os caracteres desejados
 */

function tiraCaracter(parCampo,caracter, opcao)
{
  strCampo = parCampo
  ultBranco = -1;
  i=0
  if( strCampo.length == undefined )
      return;
  if ( opcao=="I"||opcao=="T")
  {
    for (i=strCampo.length - 1;i>0;i--)
    {
       if (strCampo.substring(i,i+1)==' ')
       {
          ultBranco = i;
       } else {
                 break;
              }
    }
  }
  if (ultBranco>-1)
  {
    parCampo=strCampo.substring(0,ultBranco)
    strCampo=parCampo
  }
  ultBranco = -1
  if (opcao=="F"||opcao=="T")
  {
    for (i=0;i<strCampo.length;i++)
    {
       if (strCampo.substring(i,i+1)==caracter)
       {
          ultBranco = i;
       } else {
                 break
              }
    }
  }
  if (ultBranco>-1)
  {
     parCampo=strCampo.substring(ultBranco + 1,strCampo.length)
     strCampo=parCampo
  }
  return strCampo;
}

var opcaoSubmete = "";

var _idSolicitaSupervisor = false;
var _siglaSistema         = '';

/**
 * Fun��o que envia os dados do formul�rio para o servlet controleManutencao_srv
 * @version 1.0 01/04/2000
 * @author Alexandre
 * @param opcao op��o desejada: man: Manuten��o; inc:Inclus�o; excluir: Exclus�o
 * @see critica
 * @see atualizaCamposSql
 */
function submete( opcao )
{
    var criticado = true;
    opcaoSubmete  = opcao;
    
    if( document.forms[ 0 ].tipoManutencao )
        document.forms[ 0 ].tipoManutencao.value = opcao;
    
    if( document.forms[ 0 ] && document.forms[ 0 ].ctrManutHistorico )
        document.forms[ 0 ].ctrManutHistorico.value = "";    

    if( this.arrayCampos || this.definicaoCampo )
        criticado = critica( );

    if( criticado )
    {
        if( _idSolicitaSupervisor )
            validaResponsavelSistema( _siglaSistema, "callbackSupervisor", "_submit", opcao );
        else
        {
            var opcId = "";
            
            if(opcao == "incluir")
                opcId = "Incluir";
            else if(opcao == "alterar")
                opcId = "Alterar";
            else if(opcao == "excluir")
                opcId = "Excluir";
            else
                opcId = opcao;
            
            if(document.getElementById( opcId ) && opcId != "Excluir")
            {
                var botaoIncluir = document.getElementById( opcId );
                botaoIncluir.disabled = true;
                botaoIncluir.value = "Aguarde...";
            }
            _submit( opcao );
        }
        
        //reseta o valor da vari�vel para evitar bugs.
        _idSolicitaSupervisor = false;
    }
}

/**
 * Fun��o respons�vel por submeter o formul�rio principal, fazendo as devidas
 * opera��es espec�ficas para cada tipo de Fun��o(incluir, excluir, alterar).
 */
function _submit( opcao )
{
    if( opcao == "alterar" )
    {
        //Caso haja mais de um update - reorganiza
        if( document.frmInc.sqlUpdate1 )
            atualizaCamposSql( "Update" );
        else
            document.frmInc.sql1.value = document.frmInc.sqlUpdate.value;

        document.frmInc.submit( );
    }
    else if( opcao == "excluir" )
    {
        if( confirm( "Confirma a exclus�o do registro?" ) )
        {
            //Caso haja mais de um delete - reorganiza
            if( document.frmInc.sqlDelete1 )
                atualizaCamposSql( "Delete" );
            else 
                document.frmInc.sql1.value = document.frmInc.sqlDelete.value;

            if(document.getElementById("Excluir"))
                document.getElementById("Excluir").disabled = true;
            document.frmInc.submit( );
        }
    }
    else if( opcao=="submeter" || opcao=="incluir" || opcao == "voltar" )
        document.frmInc.submit( );
    else 
        alert( "op��o diferente de alterar, excluir e submeter." );
}

/**
 * Fun��o de retorno para a autentica��o da senha do supervisor. Caso o resultado
 * da valida��o seja verdadeiro, o formul�rio � submetido para o controle de requisi��es.
 * @version 1.0 08/05/2007
 * @author Diego R. Drumond
 */
function callbackSupervisor( result, callback, opcao )
{
    var params = "";
    for( var i = 2; i < arguments.length; i++ )
        params += ( ( typeof arguments[ i ] == 'string' ) ? "'"+arguments[ i ]+"'" : arguments[ i ] ) + ",";

    if( result )
        eval( callback + "( "+ params.substring( 0, params.length - 1 ) +" )" );
}

/**
 * Fun��o para atualizar os campos do sql
 * @version 1.0 01/04/2000
 * @author Alexandre
 * @param tipo Tipo desejado:  inc: Inclus�o; man: Manuten��o
 */

function atualizaCamposSql(tipo)
{
  for (x=1;  eval("document.frmInc.sql"+x); x++)
  {
    tempEval = "document.frmInc.sql"+tipo+""+x;
    if (eval(tempEval))
    {
      tempEval = "document.frmInc.sql"+x+".value = document.frmInc.sql"+tipo+""+x+".value";
      eval(tempEval);
    }
  }
}


/**
 * Fun��o para submeter o XML
 * @version 1.0 01/04/2003
 * @author alexandre
 * @param opcao excluir: Exclus�o; alterar: Altera��o;
 * @return false se n�o for poss�vel alterar o registro
 * @see critica
 */
function submeteXML(opcao)
{
   if(opcao!="excluir")
   {
     if(critica())
     {
         if (opcao=="alterar")
         {
            document.forms[0].xmlMan1.value = "man";
         }
         document.forms[0].submit();
     }
     else
         return false;
   }
   else
   {
      if (confirm("Confirma a Exclus�o do registro ?"))
      {
         document.forms[0].xmlMan1.value = "excluir";
         document.forms[0].submit();
      }
   }

}

/**
 * Fun��o para retornar a data
 * @version 1.0 01/04/2003
 * @author Ruy
 * @return Data atual
 * @see ajusZeros
 */
function data()
{
  var agora = new Date();
  var ano = agora.getFullYear();
  var mes = agora.getMonth() + 1;
  var dia = agora.getDate();
  dia = acreZero(dia,2)
  mes = acreZero(mes,2);
  return  dia+"/"+mes+"/"+ano;
}

/**
 * Fun��o para retornar a hora atual
 * @version 1.0 01/04/2003
 * @author lucas hermano
 * @return Hora atual
 * @see ajusZeros
 */
function hora()
{
    hoje = new Date( );
    horaAtual  = ( (   hoje.getHours( ) + 100 ).toString( ) ).substring( 1, 3 ) + ":";
    horaAtual += ( ( hoje.getMinutes( ) + 100 ).toString( ) ).substring( 1, 3 ) + ":";
    horaAtual += ( ( hoje.getSeconds( ) + 100 ).toString( ) ).substring( 1, 3 );
    
    return horaAtual;
}

/**
 * Fun��o para travar um campo quando ele atinge determinado tamanho utilizado para txtarea
 * @version 1.0 01/04/2000
 * @author Alexandre
 * @param campo Objeto textarea
 * @param tamanho Tamanho m�ximo do campo
 * @param tecla Objeto event
 */
function trava(campo, tamanho, evt )
{
    strCampo = campo.value;
    
    if( strCampo.length > tamanho * 1 - 1 )
    {
        cancelaEvento( evt );
    }
}

/**
 * Fun��o para achar o �ndice de um link atrav�s do nome
 * @version 1.0 01/04/2000
 * @author Alexandre
 * @param documento Objeto document
 * @param nomeLink Nome do link a ser encontrado
 * @return �ndice do link procurado, -1 se n�o for poss�vel encontr�-lo
 */
function achaLink(documento, nomeLink)
{
    for (indLink=0;indLink<documento.links.length;indLink++)
    {
        if (documento.links[indLink].name==nomeLink)
        {
            break;
        }
    }
    if (indLink<documento.links.length)
        return indLink;
    else
        return -1;
}

/**
 * Fun��o para selecionar os valores de array definidos no value do combo.
 * @version 1.0 01/04/2000
 * @author Alexandre
 * @param combo Objeto select
 * @param indice �ndice do array de valores
 */
function selecionaCombo( combo, indice )
{
    if( combo.selectedIndex == -1 )
        return;
    strVal = combo.options[combo.selectedIndex].value;
    if( strVal.indexOf( "new Array" ) > -1 )
    {
        eval("arrValores = " + combo.options[combo.selectedIndex].value);
        combo.options[combo.selectedIndex].value = arrValores[indice];
    }
}

/**
 * Fun��o para selecionar os valores de array definidos no value do combo.
 * @version 1.0 01/04/2000
 * @author Alexandre
 * @param combo Objeto select
 * @param indice �ndice do array de valores
 * @param txtDestino vari�vel onde sera jogado o valor
 */
function pegaValorCombo(combo, indice , txtDestino)
{
    strVal = combo.options[combo.selectedIndex].value;
    if (strVal.indexOf("new Array")>-1)
    {
        eval("arrValores = " + combo.options[combo.selectedIndex].value);
        txtDestino.value = arrValores[indice];
    }
}

/**
 * Fun��o para selecionar os valores de array definidos no value da lista
 * @version 1.0 01/04/2000
 * @author Alexandre
 * @param combo Objeto select do tipo multiselect (lista)
 * @param indiceArray �ndice do array de valores
 * @param indiceLista �ndice da linha da lista onde est� o valor
 */
function selecionaLista(lista, indiceArray, indiceLista)
{
    strVal = lista.options[indiceLista].value;
    if (strVal.indexOf("new Array")>-1)
    {
        eval("arrValores = " + lista.options[indiceLista].value);
        lista.options[indiceLista].value = arrValores[indiceArray];
    }
}

/**
 * Fun��o para substituir um substring dentro de um texto por outro.
 * @version 1.0 01/04/2000
 * @author Alexandre
 * @param textoString String onde haver� a substituicao
 * @param stringDe Substring dentro do texto a ser substituido
 * @param stringPara Substring de substitui��o
 * @return String com substring substitu�da
 */
function trocaString(textoString, stringDe, stringPara)
{
    retorno = "";
    posInicial = 0;
    if (textoString == null)
    {
        return "";
    }
    if (stringPara == null)
    {
        stringPara = "";
    }
    while ((posInicial = textoString.indexOf(stringDe)) != -1)
    {
        retorno += textoString.substring(0, posInicial) + stringPara;
        textoString    =   textoString.substring(posInicial + stringDe.length);
    }
    retorno += textoString;
    return retorno;
}

/**
 * Fun��o para retornar boolean no checked da consulta
 * @version 1.0 01/04/2000
 * @author Alexandre
 * @return true ou false
 */

function ctcFiltro()
{
    if (document.consulta.padrao[0].checked == true)
    {
        tpFiltro = "inicio";
        if (document.consulta.descricao.value.length < 1)
        {
            alert (msgFiltro2);
            return false;
        }
        else
        {
            return true;
        }
    }
    else if (document.consulta.padrao[1].checked == true)
    {
        tpFiltro = "qualquer";
        if (document.consulta.descricao.value.length < 2)
        {
            alert(msgFiltro3);
            return false;
        }
        else
        {
            return true;
        }
    }
    else
    {
        alert( msgFiltro1 );
        return false;
    }
}

/*
 defini��o das informa��es da janela
 estas informa��es padr�es n�o devem ser alteradas
 caso queira modificar as informa��es padr�es de janela
 utilize os mesmos nomes de variaveis dentro do seu arquivo
 antes de fazer a chamada da tela.
*/

janelaUrl = "";

janelaTarget = "_new";

janelaLeft = 160;

janelaTop = 90;

janelaWidth = 600;

janelaHeight = 400;

janelaToolBar = "no";

janelaLocation = "no";

janelaDirectories = "no";

janelaStatus = "yes";

janelaMenuBar = "no";

janelaScrollBars ="yes";

janelaResizable = "yes";

janelaToolBox = "no";

var janelaAberta;

janelaTamanho = "M";

/**
 * Abre a janela em tela cheia
 * @version 1.0 01/04/2000
 * @author Alexandre
 */
function janelaTelaCheia()
{
    janelaAberta = window.open(janelaUrl,"","width="+(screen.width - 10)+", height="+(screen.height - 10)+",scrollbars,resizable=yes,top=0,left=0")
    janelaAberta.focus();
}


/**
 * Abre uma janela de acordo com as defini��es nas propriedades
 * @version 1.0 01/04/2000
 * @author Alexandre
 */
function janela(abrePopup)
{
    if(abrePopup == undefined)
        abrePopup = false;
	
    if(janelaUrl.indexOf("configurarImpressaoEspecial.jsp") == -1 && new String(janelaUrl).toLowerCase().indexOf("idmanututiliza=utiliza") == -1 && abrePopup != true)
    {
            if(parent.initAbrirTela != null)
            {
                parent.initAbrirTela(janelaTarget, janelaUrl);
                return;
            }
            else if(parent.parent.initAbrirTela != null)
            {
                parent.parent.initAbrirTela(janelaTarget, janelaUrl);
                return;
            }
            else if(parent.parent.parent.initAbrirTela != null)
            {
                parent.parent.parent.initAbrirTela(janelaTarget, janelaUrl);
                return;
            }
            else if(parent.parent.parent.parent.initAbrirTela != null)
            {
                parent.parent.parent.parent.initAbrirTela(janelaTarget, janelaUrl);
                return;
            }
            else if(parent.parent.parent.parent.parent.initAbrirTela != null)
            {
                parent.parent.parent.parent.parent.initAbrirTela(janelaTarget, janelaUrl);
                return;
            }
            else
            {
                if( navigator.appVersion.indexOf( "MSIE" ) >= 0 )
                    janelaTarget = trocaString(trocaString(janelaTarget, " ", "_"), ".", "_");
            }
      }
    
      if (janelaTamanho=='P') {
            janelaLeft = 50;
            janelaTop = 70;
            janelaWidth = 360;
            janelaHeight = 270;
      } else if (janelaTamanho=="M") {
            janelaLeft = 60;
            janelaTop = 30;
            janelaWidth = 680;
            janelaHeight = 480;
      } else if (janelaTamanho=="M2") {
            janelaLeft = 140;
            janelaTop = 80;
            janelaWidth = 650;
            janelaHeight = 285;
      } else if (janelaTamanho=="G") {
            janelaLeft = 50;
            janelaTop = 25;
            janelaWidth = 700;
            janelaHeight = 500;
      } else if (janelaTamanho=="GG") {
            janelaLeft = 30;
            janelaTop = 15;
            janelaWidth = 800;
            janelaHeight = 600;
      } else if (janelaTamanho=="P1") {
            janelaLeft = 150;
            janelaTop = 10;
            janelaWidth = 420;
            janelaHeight = 350;
      } else if (janelaTamanho=="M1") {
            janelaLeft = 60;
            janelaTop = 90;
            janelaWidth = 650;
            janelaHeight = 350;
      } else if (janelaTamanho=="Calendario") {
            janelaLeft = 150;
            janelaTop = 10;
            janelaWidth = 420;
            janelaHeight = 380;
      } else if (janelaTamanho=="T") {
            janelaLeft = 0;
            janelaTop = 0;
            janelaWidth = 790;
            janelaHeight = 525;
      } else if (janelaTamanho=="Impressao") {
            janelaLeft = 150;
            janelaTop = 10;
            janelaWidth = 510;
            janelaHeight = 225;
      }
      caracteristicas='left='+janelaLeft+',top='+janelaTop+',width='+janelaWidth+',height='+janelaHeight+',toolbar='+janelaToolBar+',location='+janelaLocation+',directories='+janelaDirectories+',status='+janelaStatus+',menubar='+janelaMenuBar+',scrollbars='+janelaScrollBars+',resizable='+janelaResizable;
      janelaAberta = window.open(janelaUrl,janelaTarget,caracteristicas);
      janelaAberta.focus();
      
      if (janelaTamanho=="MAX")
      {
          janelaAberta.moveTo(0,0);
          janelaAberta.resizeTo(screen.width,screen.height - 25);
      }
      
      janelaUrl = "";
      janelaTarget = "_New";
      janelaLeft = 160;
      janelaTop = 90;
      janelaWidth = 600;
      janelaHeight = 400;
      janelaToolBar = "no";
      janelaLocation = "no";
      janelaDirectories = "no";
      janelaStatus = "yes";
      janelaMenuBar = "no";
      janelaScrollBars ="yes";
      janelaResizable = "yes";
      janelaToolBox = "no";

      janelaTamanho = "M";

}

/**
 * Funcao que � chamada ap�s atualizaCampo. Ela deve ser sobreescrita.
 * @version 1.0 19/09/2003
 * @author Diego R. Drumond
 * @param endereco Nome do campo que vai receber o valor
 * @param descricao posi��o no vetor de consultas que cont�m o texto a ser transferido
 * @param codigo posi��o no vetor de consultas que cont�m o c�digo do item a ser transferido
 */
function onAtualizaCampo(endereco,descricao,codigo)
{
}
/**
 * Fun��o para atualizar um campo buscado de outra janela
 * @version 1.0 01/04/2000
 * @author Alexandre
 * @param endereco Nome do campo que vai receber o valor
 * @param descricao posi��o no vetor de consultas que cont�m o texto a ser transferido
 * @param codigo posi��o no vetor de consultas que cont�m o c�digo do item a ser transferido
 */
function atualizaCampo(endereco,descricao,codigo) 
{
    if(endereco==undefined) 
        return;
    tipoCampo = endereco.type;
    maxTamCampo = descricao.length;
    if (tipoCampo.indexOf('select') != -1)  
    {
        i = endereco.options.length;
        endereco.options[i] = new Option(descricao,codigo);
        endereco.selectedIndex = i;

        //Para quando existir o recurso '+' que no caso adiciona a descri��o completa para o array usado pelo tooltip
        try
        {
            if( eval( "maisArray"+endereco.name ) )
                eval( "maisArray"+endereco.name+"[ "+i+" ] = '"+descricao+"';" );
        }
        catch(Error)
        {
        }

    } //fim if campo tipo select
    else 
    {

        if (endereco.name.indexOf("txt")>-1) 
        {
            nomeHid = endereco.name.substring(0,3);
            if (nomeHid=="xml") 
            {
               nomeHid = 'hidCod' + endereco.name;
            }
            else 
            {
               nomeHid = 'hidCod' + endereco.name.substring(3,endereco.name.length);
            }
        } //fim if nome do campo txt
        else 
        { 
            nomeHid = "hidCod" + endereco.name; 
        }
        //Cortando descricao para o tamanho do campo definido no maxLength
        if( descricao.length > endereco.maxLength )
            descricao = descricao.substring( 0 , endereco.maxLength );

        endereco.value = descricao;
        nomeEnvio = eval('document.forms[0].'+ nomeHid + '.value = codigo');
    } //fim else - para campo n�o select

    //nome utilizado para verificar se o usu�rio fez altera��o
    //no campo e n�o o selecionou novamente
    nomeAntEnvio = eval("document.forms[0]."+endereco.name+"Ant");
    if ( nomeAntEnvio ) 
    {
      nomeAntEnvio.value = descricao;
    }
    onAtualizaCampo(endereco,descricao,codigo);
}

/**
 * Fun��o para enviar dados
 * @version 1.0 01/04/2000
 * @author Alexandre
 */
function enviar(nome,codigo) {
      atualizaCampo(window.campo,nome,codigo);
}

/**
 * Fun��o para confirmar Grava��o
 * @version 1.0 01/04/2000
 * @author Alexandre
 */

function confirmaGravacao(nome,codigo) {
      alert ('Dados: ' + nome + ' \n'+ 'Gravados Com Sucesso');
}

/**
 * Fun��o para apagar select selecionado
 * @version 1.0 01/04/2000
 * @author Alexandre
 */
function apagaSelect(codigo) {
            reloadSelect(window.campo,codigo);
 }

/**
 * Fun��o para dar reload no select
 * @version 1.0 01/04/2000
 * @author Alexandre
 */
function reloadSelect(endereco,codigo) {
      total = endereco.options.length;
      for (i=0; i <= total - 1; i++) {
            if (endereco.options[i].value == codigo) {
                  endereco.options[i] = null;
            }
      }
}

/**
 * Abre uma janela utilizando configura��o padr�o
 * @version 1.0 01/04/2000
 * @author Alexandre
 * @param url Caminho da janela
 */
function abreJanela(url) {
    window.open(url, 'nomeForm', 'status=yes,scrollbars=yes');
}


/************** ESTILOS **********************/

linkI = "";
linkC = "";


/**
 * Fun��o que recebe o tipo do link e redireciona
 * @version 1.0 01/04/2000
 * @author Alexandre
 * @param tipo Tipo do link (I, A, C)
 * @param link Caminho para onde vai ser redirecionado
 */
function linkBotao(tipo,link) {

        if (eval("self.link"+tipo)) {
          link = eval("link"+tipo);
        }
          self.location = link;
     }


/**
 * Fecha uma janela
 * @version 1.0 01/04/2000
 * @author Alexandre
 */
function fechaJanela() {
        window.top.close();
     }


// Texto onmouseover na barra de status

/**
 * Coloca texto onmouseover na barra de status
 * @version 1.0 01/04/2000
 * @author Alexandre
 * @param texto Texto que aparecer�. Pode ser usado os padr�es de 1 a 6
 * @return true
 */
function statusText(texto) {
        descr = "";
       if (texto == 1) {
            descr = "Fechar Janela";
       }
       if (texto == 2) {
            descr = "Abrir Ajuda";
       }
       if (texto == 3) {
            descr = "Voltar para a tela anterior";
       }
       if (texto == 4) {
            descr = "Abrir as Notas Pessoais";
       }
       if (texto == 5) {
            descr = "Ir para a Inclus�o";
       }
       if (texto == 6) {
            descr = "Ir para a Consulta";
       }

       control = 2;

      if (descr != "") {
            self.status = descr;
        } else {
            self.status = texto;
         }
       return true;
    }

/**
 * Limpa a barra de status
 * @version 1.0 01/04/2000
 * @author Alexandre
 * @return true
 */
function statusLimpa()
{
    self.status = '';
    return true;
}

/**
 * Fun��o para abrir calend�rio
 * @version 1.0 01/04/2003
 * @author Diego R. Drumond
 */
function calendario()
{
    window.open(caminhoUtilitarios+'/calendario.jsp','calendario','left=50,top=70,height=236,width=263,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizeable=no');
}

/**
 * Fun��o que abre o calend�rio em um campo do tipo data para que o valor seja pesquisado.
 * @version 1.0 12/06/2007 
 * @author Fabio Faria Barreto
 */
function selecionaDataCalendario( campo )
{
    val = eval("document.forms[0].datatela"+campo).value;
    popdate( "document.forms[0].datatela"+campo, "sp"+campo, val );
}

/**
 * Fun��o para abrir calculadora
 * @version 1.0 01/04/2003
 * @author Wellington
*/
function calculadora()
{
    window.open(caminhoUtilitarios+'/calculadora.jsp','calculadora','left=50,top=70,height=200,width=330,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizeable=no');
}

/**
 * Fun��o para abrir Requisi��o de Material
 * @version 1.0 21/11/2003
 * @author Diego R. Drumond
 */
function material( url )
{
    janelaUrl     = url;
    janelaTamanho = "G";
    janelaTarget  = "material";
    janela( );
}

/**
 * Fun��o para abrir Solicita��o de Compra
 * @version 1.0 14/10/2005
 * @author Diego R. Drumond
 */
function compra( url )
{
    janelaUrl     = url;
    janelaTamanho = "G";
    janelaTarget  = "compra";
    janela( );
}


/**
 * Fun��o para abrir Email
 * @version 1.0 22/10/2008
 * @author Marcos
*/
function email(  )
{
    janelaUrl     = "http://10.1.0.24:8080/intouch2/";
    janelaTarget  = "email";
    janelaLeft = 0;
    janelaTop = 0;
    janelaWidth = 600;
    janelaHeight = 800;
    janelaDoida = window.open(janelaUrl,janelaTarget,"resizable");
}

/**
 * Fun��o para abrir Notas Pessoais
 * @version 1.0 01/04/2003
 * @author Wellington
*/
function notasPessoais()
{
    window.open(caminhoNotasPessoais+'/index.jsp','NotasPessoais','left=50,top=70,height=420,width=620,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizeable=no');
}


//Escreve na barra de status o retorno do processo
    var speed = 600;
    var control = 1;
    var textoCodigo = "";

    if (!self.codigoRetorno)
    {
        codigoRetorno = "";
    }
    if (codigoRetorno == 1)
    {
        textoCodigo = ("Processamento Efetuado!");
    }
    if (codigoRetorno == 2)
    {
        textoCodigo = ("Processamento n�o Efetuado!");
    }



/**
 * Escreve na barra de status o retorno do processo
 * @version 1.0 01/04/2000
 * @author Alexandre
 */
function flash ()
{

    if (control != 2 & codigoRetorno != "" & textoCodigo != "")
    {
        if (control == 1)
        {
            window.status=textoCodigo;
            control=0;
        }
            else{
                    window.status="";
                    control=1;
                }
        setTimeout("flash();",speed);
    }
}


/**
 * Fun��o que escreve links de A-Z para consulta
 * @version 1.0 01/04/2003
 * @author Diego R. Drumond
 */
var Todos = 1;
function barraAZ() {
    alfabeto = new Array();
    alfabeto=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","W","Y","Z"];
    document.writeln("<table cellpadding=0 cellspacing=0 border=0 width='100%'>")
    document.writeln("<Tr><Td><img src='"+caminhoImagensGenericas+"\\blank.gif' width=7 heigth=7 border=0></td></tr>");
    document.writeln("<Tr><Td bgcolor='black'><img src='"+caminhoImagensGenericas+"\\blank.gif' width=1 heigth=2 border=0></td></tr>");
    document.writeln("<Tr><Td><img src='"+caminhoImagensGenericas+"\\blank.gif' width=3 heigth=3 border=0></td></tr>");
    document.writeln("<Tr><Td><center>");
    for(i=0;i<26;i++) {
    document.writeln("<font size=2><a href=\"javascript:consultaQual('"+ alfabeto[i] +"');\">"+ alfabeto[i] +"</a></font>");
    }
    if(Todos == 1) {
       document.writeln("&nbsp;&nbsp;<font size=2 style=\"background: #DEF2F7\">&nbsp;<a href=\"javascript:consultaQual('');\">TODOS</a>&nbsp;</font>");
    }
    document.writeln("</font></td></tr>")
    document.writeln("<Tr><Td><img src='"+caminhoImagensGenericas+"\\blank.gif' width=3 heigth=3 border=0></td></tr>");
    document.writeln("<Tr><Td bgcolor='black'><img src='"+caminhoImagensGenericas+"\\blank.gif' width=1 heigth=1 border=0></td></tr>")
    document.writeln("<Tr><Td><img src='"+caminhoImagensGenericas+"\\blank.gif' width=7 heigth=7 border=0></td></tr>");
    document.writeln("</table>");
}


/**
 * Funcao para chamar o arquivo de ajuda
 * @version 1.0 01/04/2000
 * @author Alexandre
 * @see janela
 */

function ajuda(endereco)
{
    //  var nomeAjuda = '../ajuda/' + diretorioAjuda + '/ajuda.html#' + link + opcaoAjuda;
    janelaUrl = endereco;
    janelaTamanho = "M"
    janelaTarget = "jaAjuda";
    janela()
}

/**
 * Funcao para criar objeto com informa��es do browser
 * @version 1.0 22/08/2007
 * @author Fabio Faria
  */
function browser()
{
    this.nome = navigator.appName;
    this.versao = navigator.appVersion;
    this.codeNome = navigator.appCodeName;
    this.plataforma = navigator.platform; 
    this.javaHabilitado = navigator.javaEnabled();
}

 var nav = new browser();

//imprime alguns comandos de style sheet que
//melhoram o layout das fontes.
document.write('<STYLE TYPE=text/css>');
document.write('A:link {color:#003399; TEXT-DECORATION: none;}');
document.write('A:visited {color:#003399; TEXT-DECORATION: none;}');
document.write('A:hover {color:red; TEXT-DECORATION: underline;}');
document.write('</STYLE>');

if( nav.nome == 'Microsoft Internet Explorer'){
    document.write('<LINK href="'+caminhoEstilosCSS+'/estilo_pag_adi_ie.css" type=text/css rel=stylesheet>');    
} else {
    document.write('<LINK href="'+caminhoEstilosCSS+'/estilo_pag_adi_ns.css" type=text/css rel=stylesheet>');

}

/**
 * Gera tabela de not�cias
 * @version 1.0 01/04/2003
 * @author Wellington
 * @param titulo T�tulo da tabela
 * @param tamanho Tamanho da tabela em px
 */
function geraTabelaNews(titulo,tamanho) {
  document.write("<table cellpadding=0 border=0 bgcolor='white' cellspacing=0 width="+tamanho+"><tr><td><center><Table bgcolor='white' width='100%' cellspacing='0' cellpadding='0' border='0'><tr><td background='"+caminhoImagensGenericas+"/tabelas/centro.jpg' width=1 nowrap=1><img border=0 src='"+caminhoImagensGenericas+"/tabelas/ladoE.jpg'></td><td background='"+caminhoImagensGenericas+"/tabelas/centro.jpg'><centeR><font size=2 color='white'>"+titulo+"</td>");
  document.write("<td background='"+caminhoImagensGenericas+"/tabelas/centro.jpg' width=1 nowrap=1 align='right'><img border=0 src='"+caminhoImagensGenericas+"/tabelas/ladoD.jpg'></td></tr></table></td><tr><td bgcolor='black'>");
}


/**
 * Fecha tabela de not�cias
 * @version 1.0
 * @author Wellington
 */

function fechaTabelaNews() {
  document.write("</td></tr></table>");
}


// Segunda Cor da barra de Titulio
cor2     = "#2A4280";
corFonte = "black";
sistema = "";
sigla = "";
cor = "black";
corFonte = "white";
diretorioAjuda = "";


// Mensagens Alt nos botoes do cabecalho
altVoltar   = "Voltar a tela anterior";
altAjuda    = "Ajuda sobre esta tela";
altFechar   = "Sair";
altIncluir  = "Incluir dados";
altConsulta = "Consultar dados (Alterar/Excluir)";
altNotas    = "Utilizar suas Notas Pessoais";

/**
 * Imprime a barra superior
 * @version 1.0 01/04/2003
 * @author Alexandre
 * @param sistema Sigla do sistema
 * @param nome Nome do sistema
 * @param codigo C�digo da tela
 * @param link Nome do arquivo
 * @param texto Tipo da tela ( _man, _inc, _con)
 */
function barraSuperior(sistema,nome,codigo,link,texto)
{

    if (sistema=='HelpDesk')
    {
        link = 'hpd'+link
    }
    //textoAjuda = '"'+link+'","'+texto+'"';
    textoAjuda = caminhoAjuda+"/ajuda.jsp?diretorioAjuda="+diretorioAjuda+"&codTela="+codigo;
    //Escreve o inicio da barra superior
    document.writeln("<center><table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
        "<tr><td bgcolor='"+ cor +"'><font face='' size=2 color='" + corFonte +"'>" +
        "<i><b>&nbsp;&nbsp;"+ nome +"</i></b></font></td>" +
        "<td bgcolor='"+ cor +"' align='right'><font face='' size=2 color='" + corFonte +"'>" +
        "<b><i>" + codigo +"&nbsp;</i></b></font></td>" +
        "<td>&nbsp;</td></tr><tr><tr><td bgcolor='white' align='left'>");


/**
 * Escreve bot�o F na barra superior
 * @version 1.0 01/04/2000
 * @author Alexandre
 */
function escreveF()
{
    document.writeln("<a href='javascript:window.top.close();' onMouseOver='javascript:statusText(1); return true;' onMouseOut='javascript:statusLimpa(); return true;'><img border=0 src='"+caminhoImagensGenericas+"/botoes/bClose2.jpg' Alt='"+altFechar+"' border=0></a>")
}

/**
 * Escreve bot�o A na barra superior
 * @version 1.0 01/04/2000
 * @author Alexandre
 */
function escreveA()
{
    document.writeln("<a href='javascript:ajuda(\""+textoAjuda+"\")' onMouseOver='javascript:statusText(2); return true;' onMouseOut='javascript:statusLimpa(); return true;'><img border=0 src='"+caminhoImagensGenericas+"/botoes/bHelp2.jpg' alt='"+altAjuda+"' border=0></a>");
}

/**
 * Escreve bot�o V na barra superior
 * @version 1.0 01/04/2000
 * @author Alexandre
 */
function escreveV()
{
    document.writeln("<a href='javaScript:self.history.back();' onMouseOver='javascript:statusText(3); return true;' onMouseOut='javascript:statusLimpa(); return true;'><img border=0 src='"+caminhoImagensGenericas+"/botoes/bBack2.jpg' alt='"+altVoltar+"' width=20 height=20 border=0></a> ");
}

/**
 * Escreve bot�o N na barra superior
 * @version 1.0 01/04/2000
 * @author Alexandre
 */
function escreveN()
{
    document.writeln("<a href='javascript:notasPessoais();' onMouseOver='javascript:statusText(4); return true;' onMouseOut='javascript:statusLimpa(); return true;'><img border=0 src='"+caminhoImagensGenericas+"/botoes/bNotas2.jpg' border=0 alt='"+altNotas+"'></a> ");
}

/**
 * Escreve bot�o I na barra superior
 * @version 1.0 01/04/2000
 * @author Alexandre
 */
function escreveI()
{
    auxTarget = "";
    if (self.targetI)
    {
        auxTarget = "target='"+targetI+"'";
    }
    if (!self.linkI)
    {
        document.writeln("<a href='"+ link +"_inc.jsp' "+ auxTarget +" onMouseOver='javascript:statusText(5); return true;' onMouseOut='javascript:statusLimpa(); return true;'><img border=0 src='"+caminhoImagensGenericas+"/botoes/bInc2.jpg' border=0 alt='"+altIncluir+"'></a> ");
    } else {
                document.writeln("<a href='"+linkI+"' "+ auxTarget +" onMouseOver='javascript:statusText(5); return true;' onMouseOut='javascript:statusLimpa(); return true;'><img border=0 src='"+caminhoImagensGenericas+"/botoes/bInc2.jpg' border=0 alt='"+altIncluir+"'></a> ");
    }
}

/**
 * Escreve bot�o C na barra superior
 * @version 1.0 01/04/2000
 * @author Alexandre
 */
function escreveC()
{
    auxTarget = "";
    if (self.targetC)
    {
        auxTarget = "target='"+targetC+"'";
    }
    if (!self.linkC)
    {
        document.writeln("<a href='"+ link +"_con.jsp' "+ auxTarget +" onMouseOver='javascript:statusText(6); return true;' onMouseOut='javascript:statusLimpa(); return true;'><img border=0 src='"+caminhoImagensGenericas+"/botoes/bCon2.jpg' border=0 alt='"+altConsulta+"'></a>");
    } else {
                document.writeln("<a href='"+linkC+"' "+ auxTarget +" onMouseOver='javascript:statusText(6); return true;' onMouseOut='javascript:statusLimpa(); return true;'><img border=0 src='"+caminhoImagensGenericas+"/botoes/bCon2.jpg' border=0 alt='"+altConsulta+"'></a>");
    }
}


    //Condicao para escrever todos os botoes se nenhum for especificado
    if (!self.botoes)
    {
        botoes = 'FAVNIC';
    }

    //Condicao para nao escrever os botoes se 0 for especificado
    if (botoes!='0')
    {
        for (i=0; i<botoes.length; i++)
        {
            funcao = 'escreve'+botoes.substring(i,i+1)+'()';
            eval(funcao);
        }
    }

    //escreve o final da tabela
    document.writeln("</td><td align='right' bgcolor='" + cor2 +"'>&nbsp;<font color='white' size=2><b>"+ sistema +"&nbsp;</td></tr></table><hr>");

    //Escreveo titulo da Tela
    if (texto == '_inc')
    {
        document.writeln("<center><b>INCLUS�O:</b><br><bR></center>");
    }
    if (texto == '_con')
    {
        document.writeln("<center><b>CONSULTA:</b><br><br></center>");
    }
    if (texto == '_man')
    {
        document.writeln("<center><b>Manuten��o:</b><br><br></center>");
    }
}


/**
 * Fun��o para colocar uma barra de progresso
 * @version 1.0 01/04/2000
 * @author Alexandre
 * @param tempo Tempo de progresso segundos
 * @param valor Nome da Fun��o a ser executada enquanto a barra � carregada
 */
function barraProgresso(tempo, valor)
{
    texto='<table border=0 bgcolor="WHITE" ><Tr><Td bgcolor="white">'+
    '<img src="'+caminhoImagensGenericas+'/imagensDeFundo/fundoBranco.jpg" name="imagem1" width=30 border=0 height=10>'+
    '<img src="'+caminhoImagensGenericas+'/imagensDeFundo/fundoBranco.jpg" name=imagem2   width=30 border=0 height=10>'+
    '<img src="'+caminhoImagensGenericas+'/imagensDeFundo/fundoBranco.jpg" name=imagem3   width=30 border=0 height=10>'+
    '<img src="'+caminhoImagensGenericas+'/imagensDeFundo/fundoBranco.jpg" name=imagem4   width=30 border=0 height=10>'+
    '<img src="'+caminhoImagensGenericas+'/imagensDeFundo/fundoBranco.jpg" name=imagem5   width=30 border=0 height=10>'+
    '<img src="'+caminhoImagensGenericas+'/imagensDeFundo/fundoBranco.jpg" name=imagem6   width=30 border=0 height=10>'+
    '<img src="'+caminhoImagensGenericas+'/imagensDeFundo/fundoBranco.jpg" name=imagem7   width=30 border=0 height=10>'+
    '<img src="'+caminhoImagensGenericas+'/imagensDeFundo/fundoBranco.jpg" name=imagem8   width=30 border=0 height=10>'+
    '<img src="'+caminhoImagensGenericas+'/imagensDeFundo/fundoBranco.jpg" name=imagem9   width=30 border=0 height=10>'+
    '<img src="'+caminhoImagensGenericas+'/imagensDeFundo/fundoBranco.jpg" name=imagem10  width=30 border=0 height=10>'+

    '</td></tr></table>';
    document.writeln(texto);
    setTimeout(valor,tempo+100);
    tempo = tempo / 10;
    varTempo = 0;
    for (x=1; x<=10; x++)
    {
        varTempo += tempo;
        comando = "document.imagem"+x+".src = '"+caminhoImagensGenericas+"/imagensDeFundo/fundoAzul.jpg'";
        setTimeout(comando,varTempo);
    }
}


/**
 * Fun��o para colorir a barra de rolagem de cada sistem
 * @version 1.0 15/06/2002
 * @author Wellington
 * @param sigla  Sigla de acordo com a sigla escreve a cor na barra de rolagem
 */

 function barraDeRolagem(sigla) {
 }



 /*
    Fun��o Geral para montar campos vindos do m�todo montaDisplay da classe consulta.
    A partir do uso do m�todo consulta.montaDisplay(tamanho,"campo da consulta ^ " ,
    ser� redirecionado para esta Fun��o sempre que o link (campo da consulta) for
    acionado, mostrando-se o conte�do total do "campo da consulta"
 */


/**
 * Fun��o que abre uma janela de alerta
 * @version 1.0 01/04/2003
 * @author Diego R. Drumond
 * @param parametro Texto que vai aparecer na janela
 */
function abreDisplay(parametro)
{
    alert(parametro);
}



/**
 * Formata o n�mero da unidade dentro do IPTU
 * @version 1.0 16/01/2003
 * @author Ruy
 * @param unidade n�mero n�o formatado
 * @return n�mero formatado
 * @see acreZero
 */
function formataUnidade( unidade )
{
    return acreZero( unidade, 4 );
}


/**
 * Formata o n�mero do lote dentro do IPTU
 * @version 1.0 16/01/2003
 * @author Ruy
 * @param lote n�mero n�o formatado
 * @return n�mero formatado
 * @see acreZero
 */
function formataLote( lote )
{
    return acreZero( lote, 4 );
}



/**
 * Formata o n�mero da quadra dentro do IPTU
 * @version  1.0 16/01/2003
 * @author Ruy
 * @param quadra n�mero n�o formatado
 * @return n�mero formatado
 * @see acreZero
 */
function formataQuadra( quadra )
{
    return acreZero( quadra, 4 );
}


/**
 * Formata o n�mero do setor dentro do IPTU
 * @version  1.0 16/01/2003
 * @author Ruy
 * @param setor n�mero n�o formatado
 * @return n�mero formatado
 * @see acreZero
 */
function formataSetor( setor )
{
    return acreZero( setor, 3 );
}


/**
 * Formata o n�mero do distrito dentro do IPTU
 * @version  1.0 16/01/2003
 * @author Ruy
 * @param distrito n�mero n�o formatado
 * @return n�mero formatado
 * @see acreZero
 */

function formataDistrito( distrito )
{
    return acreZero( distrito, 2 );
}


/**
 * Formata o n�mero da sub-unidade dentro do IPTU
 * @version  1.0 16/01/2003
 * @author Ruy
 * @param sub n�mero n�o formatado
 * @return n�mero formatado
 * @see acreZero
 */
function formataSubUnidade( sub )
{
    return acreZero( sub, 4 );
}


/**
 * Formata o n�mero do Logradouro dentro do IPTU
 * @version  1.0 16/01/2003
 * @author Ruy
 * @param logradouro n�mero n�o formatado
 * @return n�mero formatado
 * @see acreZero
 */
function formataLogradouro( logradouro )
{
    return acreZero( logradouro, 6 );
}

/**
 * Formata o n�mero da Se��o dentro do IPTU
 * @version  1.0 16/01/2003
 * @author Ruy
 * @param secao n�mero n�o formatado
 * @return n�mero formatado
 * @see acreZero
 */
function formataSecao( secao )
{
    return acreZero( secao, 5 );
}

/**
 * Fun��o que prepara o valor para efeitos de c�lculos, retirando os pontos e v�rgulas
 * @version 1.0 04/06/2003
 * @author Cleiton Ferreira
 * @return Valor formatado.
 * @see trocaString
 * Altera��es: implementacao da opcao para voltar o valor sem o parseFloat que estava arredondando valores muito grandes como por exemplo o valor maximo dos campos numericos ( 999999999999999.99 )
 */
function preparaValor(valor, tipo)
{
   var valorTexto = valor + "";
   var valorTexto2 = valorTexto.indexOf( "," ) > 0? //if
                        trocaString( valorTexto, ".", "" ).replace( "," , "." )
                      : //else
                        valor;
   return tipo==null? //if
            parseFloat( valorTexto2 ) 
            : //else
            valorTexto2;
}

/**
 * Fun��o que formata a inscri��o cadastral do iptu
 * @version 1.0 11/06/2003
 * @author Diego R. Drumond
 * @return Inscricao formatado.
 * @see formataDistrito
 * @see formataSetor
 * @see formataQuadra
 * @see formataLote
 */
function formataInsCadIPTU(D,S,Q,L)
{

    return formataDistrito(D)+"."+formataSetor(S)+"."+formataQuadra(Q)+"."+formataLote(L);
       
}

/**
 * Fun��o para bloquear o bot�o direito do mouse
 * @version 1.0 04/07/2003
 * @author Diego R. Drumond
 * @return Verifica qual o bot�o acionado e retorna o conte�do de mensagem var msg
 */

function BloqueiaMouse(id, msg)
{
    this.id     = id;
    this.msg    = msg;
    this.ativar = function()
    {
        if(document.layers) document.captureEvents(Event.Click);
        document.onmousedown = new Function('e', '{' + this.id + '.Botao(e,"' + this.id + '"); }');
    }
    this.Botao = function(e)
    {
        var b = document.all ? window.event.button : e.which;
        if(b > 1)
        {
            alert(this.msg);
            return false;
        }
        return true;
    }
    this.ativar();
}

/**
 * Fun��o para bloquear atalhos do teclado.
 * @version 1.0 04/12/2003
 * @author Diego R. Drumond
 */
function BloqueiaTeclado( usaPerm )
{
    tecla = retornaKeyCode( window.event );
    retornaEstadosTeclas( window.event );

    if( usaPerm == "1" )
    {
        /* Bloqueia os atalhos: F3, CTRL + B, CTRL + E, CTRL + H, CTRL + I, CTRL + L, CTRL + N, CTRL + O, CTRL + W */
        if( ( tecla == 114 ) || ( ctrl && ( tecla == 66 || tecla == 69 || tecla == 72 || tecla == 73 || tecla == 76 || tecla == 78 || tecla == 79 || tecla == 87 ) ) )
        {
            alert( SEGBA0004 );
            cancelaEvento( window.event );
        }
    }
}

/**
 * Abre janela para visualiza��o do gr�fico.
 * @version 1.0 07/07/2004
 * @author Diego R. Drumond
 */
function geraGrafico( )
{
    window.open( servletGrafico, "graph", "left=0,top=0,width="+(larguraGraph+40)+",height="+(alturaGraph+30)+",toolbar=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes" );
}

/**
 * Fun��o para transformar valor passado para modulo 11
 * @version 1.0 12/11/2004
 * @author Alan Nunes Voiski
 * @param valor   valor a ser modulado
 * @return m�dulo 11 do valor passado como parametro
 */
function modulo11(valor,opc){
    valor=trocaString(trocaString(trocaString(valor,".",""),"-",""),"/","");
    i1=0;
    for (i=0;i<valor.length;i++)
        i1+=(valor.substring(i,i+1)*(valor.length+1-i));
    i1=11-(i1%11);
    
    return i1>9?(opc==0?0:i1-10):i1;//retorna 0 caso il tenha 2 algarismos
}

/**
 * Fun��o para validar um usuario de acordo com o sistema passado
 * @version 1.0 23/04/2007
 * @author Marcos
 * @param codSistema, funcao de retorno, parametros da funcao de retorno
 * @return 
 */
function validaResponsavelSistema( )
{
	if( !arguments[ 0 ] )
		return;

        janelaTamanho    = "";
        janelaWidth      = 400;
        janelaHeight     = 210;
        janelaLeft       = ( screen.width / 2 ) - ( janelaWidth / 2 );
        janelaTop        = ( screen.height / 2 ) - janelaHeight;
        janelaTarget     = "SUPERVISOR";
        janelaUrl        = "/ADI_Intranet_Root/ADI_Programacao/ADI_MaxNetADI/package/seguranca/supervisorTarefas/segSupTarefasAutenticacao.jsp";
        janelaScrollBars = false;

        // verifica se � c�digo(num�rico - false) ou sigla(alfanum�rico - true)
        if( isNaN( arguments[ 0 ] * 1 ) )
        {
            janelaUrl += "?siglaSistema=" + arguments[ 0 ];
            janela( );
            janelaAberta.args = arguments;
        }
	else if( arguments[ 0 ] * 1 > 0 )
	{
            janelaUrl += "?codSistema=" + arguments[ 0 ];
            janela( );
            janelaAberta.args = arguments;
	}
	else if( arguments[ 0 ] * 1 == -1 )
	{
            var funcaoResposta = "opener."+arguments[ 2 ] + "( ";
            arguments[ 2 ] = null;

            for( i = 1; i < arguments.length; i++ )
            {
                if( arguments[ i ] != null )
                {
                    if( arguments[ i ] != undefined )
                    {                                
                        if( typeof arguments[ i ] == 'string' )
                            funcaoResposta += "'" + arguments[ i ] + "'";
                        else
                            funcaoResposta += arguments[ i ];

                        if( i != arguments.length - 1 )
                            funcaoResposta += ", ";
                    }
                }
            }
            funcaoResposta += " );";
            eval( funcaoResposta );
	}
}

/**
 * Fun��o trim para retirar caracteres vazios do final e do comeco de um string
 * @version 1.0 11/01/2006
 * @author Marcos F. S.
 * @param String texto em q vai ser dado TRIM
 * @return String texto sem o espaco no comeco e no final
 */
function trim( texto )
{
    strAux = "";
    for ( var i = 0; i < texto.length; i++  )
    {
        if ( texto.charAt( i ) != ' ' )
        {
            strAux = texto.substring( i, texto.length );
            break;
        }    
    }
    texto = strAux;    
    
    for ( var j = texto.length - 1; j >= 0; j-- )
    {
        if ( texto.charAt( j ) != ' ' )
        {
            strAux = texto.substring( 0, j + 1 );
            break;
        }
    }    
    texto = strAux;
    
    return texto;
}

/**
 * Fun��o arredonda para arredondamento de Float
 * @version 1.0 03/04/2006
 * @author Alan Nunes Voiski
 * @param Float/Int/String valor valor a ser arredondado
 * @param int casas n�mero de casas, precis�o
 * @return float valor arredondado conforme precis�o solicitada 
 */
function arredonda( valor, casas )
{
    try
    {
        valor=valor*1.0;
        casas=Math.pow( 10, casas );
    }
    catch(Error)
    {
        alert( "Valor inv�lido!" );
        return 0.00;
    }
    // Valor � multiplicado de forma a passar o n�mero de casas determinado para
    // lado esquerdo da virgula, arredondado para inteiro, � logo posto novamente
    // as casas de volta a direita...
    return Math.round( valor * casas ) / ( casas * 1.0 );
}

/**
 * Fun��o Abre janela de Configura��o da impress�o das consultas espec�ficas, e relat�rios
 * @version 1.0 30/08/2006
 * @author Alan Nunes Voiski
 * necess�rio dar valor � vari�vel "formPdfEspecial" passando qual formul�rio est�
 * os parametros do relat�rio. Sobreescrever a classe imprimePdf redirecionando para 
 * esta Fun��o em caso de consultas que usem a impressorinha
 */
formPdfEspecial = null;
function imprimePdfEspecial( )
{
    if( !( formPdfEspecial ) )
        return;
    janelaTamanho="";
    janelaLeft = 100;
    janelaTop = 100;
    janelaWidth = 495;
    janelaHeight = 200;
    janelaStatus = "no"
    janelaScrollBars = "no"
    janelaTarget = "confImp"

    //Vari�veis para impressoras matriciais
    if( formPdfEspecial.matricial && formPdfEspecial.matricial.value=="1" )
        camRelEsp = caminhoUtilitarios + "/relatorios/configurarImpressaoTexto.jsp";
    else
        camRelEsp = caminhoUtilitarios + "/relatorios/configurarImpressaoEspecial.jsp";

    janelaUrl = camRelEsp;
    
    var iframePdfSemPopup = document.getElementById("iframePdfSemPopup");
    
    if(iframePdfSemPopup != null)
    {
        seqRelatorioPdfSemPopup = formPdfEspecial.seqRelatorio;
        
        if(seqRelatorioPdfSemPopup != null)
            camRelEsp += "?seqRelatorio=" + seqRelatorioPdfSemPopup.value;

        botaoGerarRelatorio = document.getElementById("botaoGerarRelatorio");
        
        if(botaoGerarRelatorio != null)
        	botaoGerarRelatorio.style.visibility = 'hidden';
        
        loadIframe("iframePdfSemPopup", camRelEsp);
        
        iframePdfSemPopup.style.height = "200px";
        iframePdfSemPopup.style.width = "500px";
    }
    else
    {
        janela();
        formPdfEspecial.action = camRelEsp;
        formPdfEspecial.submit();
        afterImprimePdfEspecial();
    }
}



function loadIframe(iframeName, url)
{
    window.frames[iframeName].location = url;
}

//Fun��o a ser executada ap�s imprimePdfEspecial, permitindo eventos especiais
//No caso o default � remontar o vetor dos combos presentes na tela.
function afterImprimePdfEspecial()
{
    if( rollBackValores )
        rollBackValores();
}

/**
 * Fun��o Funcao que deixa a primeira letra das palavras mai�sculo e o resto da mesma min�sculo
 * @version 1.0 
 * @author CLEITON
 * @param valor a ser formatado
 * @return valor formatado
 */
function validaNome( nome )
{
    x = nome.toLowerCase( ) + " ";
    y = "";
    
    for( i=0; i<10; i++ )
    x = x.replace( "  ", " " );
    
    for( j=1; j<=10; j++ )
    {
        eval( "y" + j + "=x.substring(0,x.indexOf(' '));" );
        eval( "x=x.substring(x.indexOf(' ')+1,x.length);" );
        eval( "if(y"+ j +"=='de' || y" + j + "=='da' || y" + j + "=='do' || y" + j + "=='dos' || y" + j + "=='das') y" + j + "=y" + j + "; else y" + j + "=((y" + j + ".substring(0,1)).toUpperCase())+y" + j + ".substring(1,y" + j + ".length);");
        eval( "y=y+' '+y" + j  + "" );
    }
    
    for( k=0; k<10; k++ )
        y = y.replace( "  ", " " );
    
    if( y.length < 5 )
        return "";
    else
        return y.substring( 1, y.length );
}

/**
 * Fun��o respons�vel por passar os par�metros para a tela de listagem de 
 * hist�rico do registro.
 *
 * @version 1.0 
 * @author Diego R. Drumond
 * @param url caminho para o JSP respons�vel por exibir o hist�rico.
 * @return codTela c�digo da tela que est� solicitando a exibi��o do hist�rico.
 */
function historicoRegistro( url, codTela )
{
    var queryString = "";
    
    for( var i = 0; i < document.forms[ 0 ].elements.length; i++ )
    {
        var obj = document.forms[ 0 ].elements[ i ];
        if( obj.name.indexOf( "pkey_" ) == 0 )
        {
            queryString += "&" + obj.name + "=" + obj.value;
        }
    }

    janelaTamanho = 'M';
    janelaUrl = url + "?codTela="+codTela+"&" + queryString.substring( 1 );

    janela( );
}

/**
 * Retorna o texto selecionado pelo usu�rio na tela.
 *
 * @version 1.0 
 * @author Diego R. Drumond
 * @return texto selecionado.
 */
function getSelectedText( )
{
    var txt;
    if( window.getSelection )
        txt = window.getSelection( );
    else if( document.getSelection )
        txt = document.getSelection( );
    else if( document.selection )
        txt = document.selection.createRange( ).text;
    else
        return;

    return txt;
}

/**
 * Trunca uma string e adiciona ...
 *
 * @version 1.0 
 * @author Diego R. Drumond
 */
function limitaTamanho( valor, tamanho )
{
    if( valor.length <= tamanho )
        return valor;
    else
        return valor.substring( 0, tamanho - 3 ) + "...";
}

var _contentField;

/*
 * Abre uma janela para edi��o de um campo do tipo TextArea.
 *
 * @version 1.0 
 * @author Diego R. Drumond
 */
function exibeConteudo( campo,maxLength )
{
    janelaUrl = BinPath + "/utilitarios/exibeConteudo.jsp";
    janelaTarget = "content";
    janelaTamanho = "M";
    limiteMax = maxLength;
    _contentField = campo;
    janela( );
}

/**
 * Move foco para o proximo componente.
 *
 * @version 1.0 
 * @author Diego R. Drumond
 */
function focusNextField( obj )
{
    for( var i = 0; i < obj.form.elements.length; i++ )
    {
        if( obj.form.elements[ i ].name == obj.name )
        {
            if( obj.form.elements[ i + 1 ] )
            {
                obj.form.elements[ i ].blur( );
                obj.form.elements[ i + 1 ].focus( );
            }

            break;
        }
    }

    return false;
}

/**
 * Fun��o respons�vel por gerar o caminho de destino do arquivo e abrir a janela
 * para digitaliza��o de documentos.
 * 
 * @version 1.0 20.06.2007
 * @author Diego R. Drumond
 */
function digitalizaDocumento( )
{
    var url = "/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/digitalizacao/digitalizaDocumento.jsp";
    var chaves = "";
    var nome = "documentos/";

    if( document.forms[ 0 ].ctrManutSiglaSistema && document.forms[ 0 ].ctrManutCodTela )
    {
        nome += document.forms[ 0 ].ctrManutSiglaSistema.value + "/";
        nome += document.forms[ 0 ].ctrManutCodTela.value + "/doc";

        //percorre os elementos que tenham nome iniciados com pkey_
        for( var i = 0; i < document.forms[ 0 ].elements.length; i++ )
        {
            var obj = document.forms[ 0 ].elements[ i ];

            if( obj.name.indexOf( "pkey_" ) == 0 )
                chaves += "_" + obj.value;
        }

        /* caso n�o exista nenhum campo pkey_ n�o ser� poss�vel associar o documento 
         * a um registro. */
        if( chaves != "" )
        {
            nome += chaves.substring( 1 );

            janelaTamanho = 'G';
            janelaResizable = 'yes';
            janelaUrl = url + "?nome=" + nome;
            janela( );
        }
    }

    if( chaves == "" )
        alert( "N�o � poss�vel associar um documento ao registro atual." );
}

/**
 * Fun��o que exibe o tooltip do combo(+).
 * 
 * @version 1.0 27.06.2007
 * @author Diego R. Drumond
 */
function exibirMaisCombo( combo, variavel )
{
    tip( variavel[ combo.selectedIndex ], false );
}


/**
 * Fun��o para comparar duas horas
 * @version 1.0 28.11.2007
 * @author lucas hermano
 * @param hr1 Primeira hora ( Formato HH:MM ou HH:MM:SS )
 * @param hr2 Segunda hora ( Formato HH:MM ou HH:MM:SS )
 * @return Retorna um inteiro contendo um valor que corresponde a maior hora > 0: iguais, 1: hr1 maior, 2: hr2 maior
 * @see hrParaMs
 */
function comparaHoras( hr1, hr2 )
{
    if( hrParaMs(hr1) > hrParaMs(hr2) )
        return 1;
    else if( hrParaMs(hr1) < hrParaMs(hr2) )
        return 2;
    else
        return 0;
}


/**
 * Fun��o para utilizar div com mensagem "Aguarde..."
 * @version 1.0 14/07/2008
 * @author F�bio Henrique
 * @param 1 para ativar, 0 para desativar
 * @return Abre uma div com uma gif com a mensagem de Aguarde...
 */

var divAguarde = null;
function divCarregando(param)
{
    if(param == 1)
    {
        if( divAguarde == null )
        {
            escondeCombos( true );
            divAguarde = document.createElement( 'div' );
            divAguarde.id = 'ToolTip';
            divAguarde.innerHTML = "<table width='100%' height='100%'><tr><td align='center' valign='middle' class='tooltipcontent2'><BR><BR><img src='"+caminhoImagensGenericas+"/mensagens/aguarde.gif'><br></td></tr></table>";
            divAguarde.style.position = 'absolute';
            divAguarde.style.top = '0px';
            divAguarde.style.left = '0px';
            var rightedge=ie&&!window.opera? ietruebody().clientWidth : document.body.scrollWidth - 12;
            var bottomedge=ie&&!window.opera? document.body.scrollHeight : document.body.scrollHeight - 12;     
            divAguarde.style.width = rightedge;
            divAguarde.style.height = bottomedge;     
            divAguarde.style.color = 'black';
            divAguarde.style.visibility = 'visible';
            divAguarde.style.border = '0px solid #000000';
            divAguarde.style.backgroundColor = '#FFFFFF';
            divAguarde.style.zIndex = '1';
            divAguarde.style.fontFamily = 'Verdana, Arial, Helvetica, sans-serif';
            divAguarde.style.fontSize = '11px';
            divAguarde.style.fontColor = '#FFFFFF';
            divAguarde.style.filter = 'Alpha( opacity = 85 )';
            divAguarde.style.opacity = '0.85';
            divAguarde.focus();
            try	
            {
                if( document.forms[ 0 ] )
                    document.forms[ 0 ].appendChild( divAguarde );
            }
            catch( e2 ){}
        }
        else
            divAguarde.innerHTML = "<table width='100%' height='100%'><tr><td align='center' valign='middle' class='tooltipcontent2'><BR><BR><img src='"+caminhoImagensGenericas+"/mensagens/aguarde.gif'><br></td></tr></table>";
        }
    else
    {
        if( divAguarde != undefined || divAguarde != null )
        {
            divAguarde.style.visibility = 'hidden';
            divAguarde.style.overflow = 'hidden';
            divAguarde = null;
            escondeCombos( false );
        }
    }
}

/**
 * Fun��o para esconder as os combos de um determinado documento"
 * @version 1.0 14/07/2008
 * @author Marcos
 * @param 1 ou true para esconder, 0 ou false para mostrar
 * @return 
 */
function escondeCombos( esconder )
{
        if( esconder )
                esc = "hidden"
        else
                esc = "visible"

        for( i = 0; i < document.forms.length; i++ )
            for( j = 0; j < document.forms[ i ].elements.length; j++ )
                if( document.forms[ i ].elements[ j ].type == "select-one" )
                    document.forms[ i ].elements[ j ].style.visibility = esc;
}

/**
 * Fun��o para converter data e hora em milisegundos(n�mero inteiro)
 * @version 1.0 24/07/2008
 * @author F�bio Henrique
 * @param Data ("DD/MM/YYYY") e Hora em qualquer formato separada por :
 * @return Inteiro contendo a hora em milisegundos
 */
function dtHrParaMs( data, hora )
{
    data = formataDatas(data, 'DD/MM/YYYY', 'MM/DD/YYYY');
    var hr = new Date(data);

    strHr = hora.split( ':' );

    hr.setHours( strHr[ 0 ] );
    hr.setMinutes( strHr[ 1 ] );

    if( strHr.length > 2 )
        hr.setSeconds( strHr[ 2 ] );
    else
        hr.setSeconds( 0 );

    hr.setMilliseconds( 0 );

    return hr.getTime( );
}

function sendCmd( cmd, msg, callback )
{
    var to  = msg.substring( 0, msg.indexOf( " " ) );
    var msg = msg.substring( msg.indexOf( " " ) + 1, msg.length );

    try { _cmd_request = new ActiveXObject( "Microsoft.XMLHTTP" ); }
    catch( e ) { try { _cmd_request = new ActiveXObject( "Msxml2.XMLHTTP" ); }
        catch( ex ) { try { _cmd_request = new XMLHttpRequest( ); }
            catch( exc ) { } } }

    if( callback )
        _cmd_request.onreadystatechange = callback;
    else
    {
        _cmd_request.onreadystatechange = function( ) {
            if( _cmd_request.readyState == 4 ) {
                if( _cmd_request.responseText != "" )
                    alert( _cmd_request.responseText );
            }
        };
    }

    _cmd_request.open( "GET", "/ADI_Intranet_Root/MessageBroadcastServlet?cmd="+cmd+"&to="+to+"&message="+msg, true );
    _cmd_request.send( null );
}

/**
 * Fun��o Abrir opcao de relatorio - utilizada pela classe consulta
 * @version 1.0 24/07/2008
 * @author Marcos
 * @param caminho dos relatorios
 */
function imprimeRelatorioConsulta( caminhoRelatorioconsulta )
{
	window.open( caminhoRelatorioconsulta + 'configurarImpressao.jsp', 'confImp', 'toolbar=no,statusbar=no,scrollbars=no,left=100,top=100,width=412,height=290,resizable=no' );
	document.relatorioPdf.relatorio.value = document.title;
}

/**
 * Fun��o para formatar telefones
 * @version 1.0 06/03/2009
 * @author Lucas Sim�o
 * @param ddi, ddd, telefone, ramal. Todos opcionais.
 * @return Telefone formatado
 */
function formataTelefone(ddi, ddd, telefone, ramal){

        var telFirst = telefone.substring(0 , 4);
        var telSecond = telefone.substring(3 , 8);

        if(ddi == '0' || ddi == 'null' || ddi == null || ddi == '')
            ddi = '55';

        if(ddd == '0' || ddd  == 'null' || ddd == null || ddd == '')
            ddd = '00';

        if(ramal != '0' && ramal != 'null' && ramal != null)
            ramal = '  R/' + ramal;
        else
            ramal = '';

        if(telFirst == '0' || telFirst == 'null' || telFirst == null || telFirst == '')
            telFirst = '0000';

        if(telSecond == '0' || telSecond == 'null' || telSecond == null || telSecond == '')
            telSecond = '0000';

        var novoTelefone = '+' + ddi + ' (' + ddd + ') ' + telFirst + '-' + telSecond +  ramal;

        return novoTelefone;
    }

/**
 * Fun��o para montar uma mascara generica.
 * @version 1.0 19/07/2010
 * @author Joao Mosconi
 * @param evento, mascara.
 * @return 9999999-99.9999.9.99.9999.
 * Modo de usar no xml: <parametro>onKeyUp="mascaraTexto(event,'9999999-99.9999.9.99.9999')"</parametro>
 */
 function mascaraTexto(evento, mascara)
 {

    var campo, valor, i, tam, caracter;

    if (document.all) // Internet Explorer
       campo = evento.srcElement;
    else // Nestcape, Mozzila
        campo= evento.target;

    valor = campo.value;
    tam = valor.length;

    for(i=0;i<mascara.length;i++){
       caracter = mascara.charAt(i);
       if(caracter!="9")
          if(i<tam & caracter!=valor.charAt(i))
             campo.value = valor.substring(0,i) + caracter + valor.substring(i,tam);

    }
 }

 /**
 * Fun��o para montar uma mascara generica.
 * @version 1.0 17/01/2011
 * @author Luciano de Paula
 * @param evento, logout.
 * Modo de usar no xml: Exibe um popup para confirmar o logout.
 */
 function Logout(){
     if(confirm('Deseja sair do sistema?')){
        location.href ="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/finalizaSecao.jsp?final=1";
     }
 }

/**
 * Fun��o para criticar o CNJ. <br>
 * Usar: var vetCnj = new Array ();    <br>
 *           vetCnj = criticaCnj(cnj); <br>
 * @version 1.0 04/01/2011
 * @author Joao Mosconi
 * @param CNJ =  NNNNNNN-DD.AAAA.J.TR.OOOO.
 * @return false, se nao for um CNJ v�lido, ou um Array de 6 posi��es.  <br>
 * pos[0] - false ou NNNNNNN = campo com 7 d�gitos - identifica o sequencial do processo por unidade de origem, a ser reiniciado a cada ano;  <br>
 * pos[1] - DD = campo com 2 d�gitos - identifica o d�gito verificador m�dulo 97 base 10 norma ISO A7064:2003; <br>
 * pos[2] - AAAA = campo com 4 d�gitos - identifica o ano de ajuizamento do processo; <br>
 * pos[3] - J = campo com 1 d�gitos - identifica o segmento do poder judici�rio; <br>
 * pos[4] - TR = campo com 2 d�gitos - identifica o tribunal; <br>
 * pos[5] - OOOO = campo com 4 d�gitos - identifica a unidade de origem do processo conforme as estruturas administrativas dos segmentos do poder judici�rio; <br>
 */
 function criticaCnj(cnj)
 {
    var vetorCnj = new Array();

        if ((cnj.length >= 1) && (cnj.length < 25))
        {
            vetorCnj[0] = "false";
        }else
        {
            vetorCnj[0] = cnj.substring(0, 7);
            vetorCnj[1] = cnj.substring(8, 10);
            vetorCnj[2] = cnj.substring(11, 15);
            vetorCnj[3] = cnj.substring(16, 17);
            vetorCnj[4] = cnj.substring(18, 20);
            vetorCnj[5] = cnj.substring(21, 25);
        }
   return vetorCnj;
 }

    /**
     * * @version 1.0 31/01/2011
     * @author Vin�cius Nunes
     * @param String.
     * @return String, sem caracteres especiais. <br>
     * Remove acentos, pontos, aspas e outros caracteres inv�lidos.( menos n�meros). 
     *
     * @param str String a ser formatada
     */



        function formataNomeArquivo(str) {
        var varString = str;
        
        var stringAcentos =   new String("������������������������������������������������=]\"!@#$%�&*()+}�[`{~/^?,;<>:''<>=[]!@#$%�&*()+{}�`�~\\/?,:;|");
        var stringSemAcento = new String("aaaaaeeeeiiiiooooouuuuAAAAAEEEEIIIIOOOOOUUUUcCnN");

        var i = new Number();
        var j = new Number();
        var cString = str;
        var varRes = "";

        for (i = 0; i < varString.length; i++) {
        cString = varString.substring(i, i + 1);
            for (j = 0; j < stringAcentos.length; j++) {
                if (stringAcentos.substring(j, j + 1) == cString){
                cString = stringSemAcento.substring(j, j + 1);
                }
            }
        varRes += cString;
        }
        return trim(varRes);
        }  

    /**
     * @version 1.0 31/01/2011
     * @author Jo�o Guilherme
     * @param texto.
     * @return textoFormatado, sem caracteres especiais. <br>
     * O padr�o ISO-8859-1 aceita os caracteres 0 a 255 da tabela ASCII. <br>
     * A Fun��o substitui os caracteres acima de 255 pelo seu equivalente ou por espa�o em branco, caso n�o catalogado.
     * Continuar a cataloga��o do DE -> PARA (if ...)
     * 
     */
        function converterPadraoISO8859(texto) 
        {
                var tamTexto = texto.length;

                for (i = 0; i <= tamTexto; i++)
                {
                    if (texto.charAt(i) == "^") 
                            texto = texto.replace(texto.charAt(i), " ")

                    if (texto.charAt(i) == "'") 
                    {
                        texto = texto.replace(texto.charAt(i), "\"")
                    }
                            

                    if (texto.charCodeAt(i) > 255)
                    {
                        if(texto.charCodeAt(i) == 8220 || texto.charCodeAt(i) == 8221 )
                            texto = texto.replace(texto.charAt(i), "\"")
                        else if(texto.charCodeAt(i) == 8211)
                            texto = texto.replace(texto.charAt(i), "-")
                        else
                        {
                            texto = texto.replace(texto.charAt(i), " ");
                        }
                    }
                }
                
                return texto;
        }
        
    /**
     * @version 1.0 17/09/2013
     * @author Jo�o Guilherme
     * @param Nome do Formulario onde est�o os campos checkbox.
     * @description Desmarca automaticamente todos os checkbox do formul�rio. <br>
     * A fun��o tem que ser chamada logo antes do xmlTelas.fechaHtml().Dentro do script /script. <br>
     * Ideal para quando utiliza o voltar ou backspace e o checkbox continua selecionado.
     * Compat�vel somente com o Chrome e FireFox.
     */
        function deselecionar_tudo() 
        {
            for (i=0; i < document.forms[0].elements.length; i++) 
            {
               if(document.forms[0].elements[i].type === "checkbox")	
                  document.forms[0].elements[i].checked=false;        
            }    
        }
        
//simular LPAD
/**
 * 
 * @param {char} n - variavel a ser incrementada com digitos a esquerda
 * @param {int} width - tamanho
 * @param {char} z - digito para preencher a esquerda
 * @returns {String} - pad(10, 4) = 0010 / pad(10,4,-) --10
 */
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}