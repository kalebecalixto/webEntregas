<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/ajax.js -->
/**
 * 
 *
 * @version 1.0 16.09.2005
 * @author Diego R. Drumond
 */
var ajax_request;
var arrayDesabilita = null;
var validaSubmit = false;


function createAjaxRequest( callback )
{
    var request;

    try
    {
        request = new ActiveXObject( "Microsoft.XMLHTTP" );
    }
    catch( e )
    {
        try
        {
            request = new ActiveXObject( "Msxml2.XMLHTTP" );
        }
        catch( ex )
        {
            try
            {
                request = new XMLHttpRequest( );
            }
            catch( exc )
            {
                alert( "Esse browser não tem recursos para uso do Ajax!" );
                request = null;
            }
        }
    }

    request.onreadystatechange = callback;

    return request;
}

/**
 * Função para desabilitar todos os componentes da tela
 * @version 1.0 12/06/2006
 * @author Marcos
 */
function desabilitaHavilitaForms( habilitaAux )
{
    arrayDesabilita = new Array(  );

    for( x = 0; x < document.forms.length; x++ )
    {   
        for( var y = 0; y < document.forms[ x ].length; y++ )
        {    
            arrayDesabilita[ arrayDesabilita.length ] = document.forms[ x ].elements[ y ].disabled;
            document.forms[ x ].elements[ y ].disabled = habilitaAux;
        }
    }
}

function retornaAbilita(  )
{
    var countFinal = 0;
    for( x = 0; x < document.forms.length; x++ )
    {   
        for( var y = 0; y < document.forms[ x ].length; y++ )
        {
            document.forms[ x ].elements[ y ].disabled = arrayDesabilita[ countFinal ];
            countFinal++;
        }
    }
    arrayDesabilita = null;
}

var callbackFuncao, habilitaCallBack ;


/**
 * Função interceptadora que habilita novamente os forms
 * @version 1.0 12/06/2006
 * @author Alan
 */
function chamaCallBack( callBack, habilita  )
{


    if( ajax_request.readyState == 4 )
    {
            if( habilitaCallBack )
                retornaAbilita(  );
            callbackFuncao();

    }
}

/**
 *
 */
function ajaxRequest( form, callback, habilita )
{
    if( habilita )
        desabilitaHavilitaForms( true );    

    habilitaCallBack = habilita;

    callbackFuncao = callback;
    url = form.action;
    method = form.method.toUpperCase( );
    
    if( !url )
        return;

    var send = new Array( );

    for( i = 0; i < form.elements.length; i++ )
        send[ send.length ] = form.elements[ i ].name + '=' + trocaString( escape( form.elements[ i ].value ), "+", "%2B" );

    send = send.join( "&" );
    ajax_request = createAjaxRequest( chamaCallBack );

    if( ajax_request )
    {
        if( method == "POST" )
        {
            ajax_request.open( method, url, true );
            ajax_request.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
        }
        else
        {
            ajax_request.open( method, url + "?" + send, true );
            send = null;
        }
        ajax_request.send( send );
    }
}

/**
 * Função que recebe o objeto xml de retorno do ajax
 * @version 1.0 18.09.2007
 * @author lucas hermano
 * @exemplo var campo = retornaValoresArray( ajax_request.responseXML.getElementsByTagName( "campo" ) )
 */

function retornaValoresArray( arrayValores )
{
    var valorRetorno = "new Array( ";

    for( var x=0; x < arrayValores.length; x++ )
    {
        valorRetorno += "'"+arrayValores[ x ].childNodes[0].nodeValue+"',";
    }

    return eval( valorRetorno.substring( 0, valorRetorno.length - 1 ) + " )" );
}



