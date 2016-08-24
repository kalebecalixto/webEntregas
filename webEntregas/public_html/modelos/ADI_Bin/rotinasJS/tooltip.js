var offsetxpoint = 0; //Customize x offset of tooltip
var offsetypoint = 20; //Customize y offset of tooltip

var ie  = document.all;
var ns6 = document.getElementById && !document.all;
var enabletip = false;

if( ie || ns6 )
    var tipobj = document.getElementById ? document.getElementById( "ToolTip" ) : ( document.all ? document.all[ "ToolTip" ] : "" );

/**
 * 
 */
function ietruebody( )
{
    return ( document.compatMode && document.compatMode != "BackCompat" ) ? document.documentElement : document.body;
}

/**
 * 
 */
function tip( conteudo, html )
{

    //verifica se o tooltip irá conter código html, caso não, substitui os caracteres < e >.
    if( !html )
    {
        while( conteudo.indexOf( "<" ) >= 0 )
            conteudo = conteudo.replace( "<", "&lt;" );

        while( conteudo.indexOf( ">" ) >= 0 )
            conteudo = conteudo.replace( ">", "&gt;" );
    }

    if( ns6 )
    {
	result = '<table id="tabela" border="0" width="100%" height="100%" cellspacing="0" cellpadding="0" >' +
                 '<tr><td class="tooltipcontent" >' + conteudo + '</td></tr></table>';
				
        altTexto = conteudo.length;	
        alt = (Math.ceil(altTexto/40)+1)*20;
       
        if( tipobj ){
            tipobj.innerHTML = result;
        }

        enabletip = true;
        return false;    
    }
    else if( ie )
    {
        
        result = '<table id="tabela" border="0" width="100%" height="100%" cellspacing="0" cellpadding="0" >' +
                 '<tr><td class="tooltipcontent" >' + conteudo + '</td></tr></table>';
				
        altTexto = conteudo.length;	
        alt = (Math.ceil(altTexto/40)+1)*20;
       
        if( tipobj ){
            tipobj.innerHTML = result;
            /*
            tipobj.innerHTML = '<IFRAME name="ifra" frameBorder="0" marginwidth="0" marginheight="0" width="100%" height="'+alt+'" scrolling="no"></IFRAME>';
            ifra.document.write( '<link href="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/estilosCSS/estilo_pag_adi_ie.css" rel="stylesheet" />' );            
            ifra.document.write( result );
            */
        }

        enabletip = true;
        return false;
    }
}

/**
 * 
 */
function positiontip( e )
{
    if( enabletip )
    {
        var curX=(ns6)?e.pageX : event.x+ietruebody().scrollLeft;
        var curY=(ns6)?e.pageY : event.y+ietruebody().scrollTop;
        //Find out how close the mouse is to the corner of the window
        var rightedge=ie&&!window.opera? ietruebody().clientWidth-event.clientX-offsetxpoint : window.innerWidth-e.clientX-offsetxpoint-20;
        var bottomedge=ie&&!window.opera? ietruebody().clientHeight-event.clientY-offsetypoint : window.innerHeight-e.clientY-offsetypoint-20;

        var leftedge=(offsetxpoint<0)? offsetxpoint*(-1) : -1000;

        //if the horizontal distance isn't enough to accomodate the width of the context menu
        if (rightedge<tipobj.offsetWidth)
        //move the horizontal position of the menu to the left by it's width
            tipobj.style.left=ie? ietruebody().scrollLeft+event.clientX-tipobj.offsetWidth+"px" : window.pageXOffset+e.clientX-tipobj.offsetWidth+"px";
        else if (curX < leftedge)
            tipobj.style.left="5px";
        else
        //position the horizontal position of the menu where the mouse is positioned
        tipobj.style.left=curX+offsetxpoint+"px";

        //same concept with the vertical position
        if (bottomedge<tipobj.offsetHeight)
            tipobj.style.top=ie? ietruebody().scrollTop+event.clientY-tipobj.offsetHeight-offsetypoint+"px" : window.pageYOffset+e.clientY-tipobj.offsetHeight-offsetypoint+"px";
        else
            tipobj.style.top=curY+offsetypoint+"px";
        tipobj.style.visibility="visible";
    }
}

function notip( )
{
    if( ns6 || ie )
    {
        enabletip = false;
        tipobj.style.visibility = "hidden";
        tipobj.style.left = "-1000px";
        tipobj.style.backgroundColor = '';
        tipobj.style.width = '';
    }
}

document.onmousemove = positiontip;
