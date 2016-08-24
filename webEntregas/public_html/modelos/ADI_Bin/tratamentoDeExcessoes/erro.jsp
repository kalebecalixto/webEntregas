<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/tratamentoDeExcessoes/erro.jsp */ %>
<%@ page contentType="text/html; charset=iso-8859-1" language="java" import="java.util.*,adi.componentes.util.erros.*" errorPage="" %>
<%@ page import="java.net.URLDecoder"%>
<% 
/*
    ADI Informatica
    Descricao: 
    Autor: 
    Data ultima alteração: 13/03/2007 - Fabio Faria
    Alteração Efetuada: adicionado a verificação dos dados na sessao antes dos parametros

*/

Exception e = ( Exception )session.getAttribute( request.getParameter( "exception" ) );

if( e == null )
    e = new Exception( "Uma informação necessária para a exibição do erro não foi encontrada. Clique no link <b>Voltar</b>." );	

String caminhoRetorno = null;
String redirect = "";

if( session.getAttribute( "caminhoRetorno" ) != null ){
    caminhoRetorno = URLDecoder.decode( (String)session.getAttribute( "caminhoRetorno" ), "UTF-8");
    session.removeAttribute("caminhoRetorno");
}else if( request.getParameter("caminhoRetorno") != null )
    caminhoRetorno = URLDecoder.decode( request.getParameter("caminhoRetorno"), "UTF-8");

if( session.getAttribute( "caminhoRetorno" ) != null ){
    redirect = (String)session.getAttribute( "redirect" );
    session.removeAttribute("redirect");
}else if ( request.getParameter( "redirect" ) != null )
    redirect = String.valueOf( request.getParameter( "redirect" ) );

%>
<html>
<head>
<title>SIGMA - Notifica&ccedil;&atilde;o de Erro</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"></head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<br>
<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="2" align="left"><img src="<%= application.getInitParameter( "imagensGenericasPath" ) %>/mensagens/erro.jpg"></td>
  </tr>
  <tr>
    <td width="40" nowrap>&nbsp;</td>
  	<td><table width="100%"  border="0" cellpadding="2" cellspacing="0">
      <tr>
        <td width="1" align="right" valign="top"><strong>Mensagem:&nbsp;</strong></td>
        <td>
<%
    String msg = "";
    if( e instanceof NullPointerException )
        msg = adi.componentes.telas.Mensagem.GENBA0058;
    else
        msg = e.getMessage( );
    if( e instanceof GeneralException )
        msg = ( ( GeneralException )e ).getMessage( application );
    out.write( msg );
%>
        </td>
      </tr>
	  <tr><td height="10" colspan="2"></td></tr>
      <tr>
        <td align="right" valign="top"><strong>Erro:&nbsp;</strong></td>
        <td><%= String.valueOf( e ) %></td>
      </tr>
    </table></td>
  </tr>
</table>
<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
  	<td height="40" colspan="2"></td>
  </tr>
</table>
<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td width="90%">[ <b>Detalhamento do erro</b> ]</td>    
       	<% if( caminhoRetorno == null ) { %>
        	<td align="right">[&nbsp;<a href="javascript:voltar( )">Voltar</a>&nbsp;]</td>
        <% } else { %>
	        <td align="right">[&nbsp;<a href="<%= caminhoRetorno %>">Voltar</a>&nbsp;]</td>
        <% } %> 
  </tr>
  <tr>
    <td colspan="2"><hr size="1" noshade color="#000000"></td>
  </tr>
</table>
<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td id="tdDetalhes">
<%
    if( e != null ){
        StackTraceElement[] ste = e.getStackTrace( );
        %><pre><%
        for( int i = 0; i < ste.length; i++ )
            out.println( " " + ste[ i ].toString( ) );
        %></pre><%
    }
%>
      </td>
  </tr>
</table>
<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
    <tr>
        <td><hr size="1" noshade color="#000000"></td>
    </tr>
    <tr>
        <td>[ <a href="javascript:enviarEmail( )">Enviar por e-mail</a> ]&nbsp;
            [ <a href="javascript:salvarArquivo( )">Salvar em arquivo</a> ]&nbsp;
        </td>
    </tr>
</table>
<form name="frmErro" action="" method="POST">
    <input type="hidden" name="txtHtmlErro" value="">
</form>
<div align="right">
  <script>
function detalhar( ){
    td   = document.getElementById( "tdDetalhes" );
    link = document.getElementById( "linkDetalhar" );
    if( td.style.visibility == "hidden" ){
        td.style.visibility = "visible";
        link.innerHTML = "Ocultar Detalhes";
    }else{
        td.style.visibility = "hidden";
        link.innerHTML = "Mostrar Detalhes";
    }
}

function voltar( ){
    if( history.length == 0 )
        window.close( );
    else
        history.go(-<%=redirect.equals( "2" )?"2":"1"%>);
}

function fechar( ){
    window.close( );
}

function enviarEmail( ){
    document.forms[ 0 ].txtHtmlErro.value = document.body.innerHTML;
    document.forms[ 0 ].action = "email.jsp";
    document.forms[ 0 ].target = "email";
    window.open( '', 'email', 'top=10, left=10, width=300, height=100, statusbar=auto' );
    document.forms[ 0 ].submit( );
}

function salvarArquivo( ){
     document.execCommand( 'SaveAs', null, 'Notificação de Erro.html' );
}
</script>
  <style type="text/css">
<!--
body,td,th {
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-size: 12px;
	color: #000000;
}
a:link {
	color: #BB0000;
	text-decoration: none;
}
a:visited {
	text-decoration: none;
	color: #BB0000;
}
a:hover {
	text-decoration: none;
	color: #000000;
}
a:active {
	text-decoration: none;
}
a {
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-weight: bold;
	font-size: 12px;
}
-->
</style>
  <img src="<%= application.getInitParameter( "imagensGenericasPath" ) %>/logotiposADI/maxnetadiTransparente.jpg">
</div>
</body>
<% session.removeAttribute( request.getParameter( "exception" ) ); %>
</html>
