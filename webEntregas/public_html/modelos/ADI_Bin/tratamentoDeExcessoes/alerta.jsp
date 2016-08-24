<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/tratamentoDeExcessoes/alerta.jsp */ %>
<%/*
    ADI Informatica
    Descricao: 
    Autor: 
    Data ultima alteração: 16/04/2007 - Alan
$Revision: 1.7 $
$Author: joaog $
$Date: 2013/02/20 22:45:22 $    

*/%>
<%
Exception e = ( Exception )session.getAttribute( "exception" );

String caminhoRetorno = null;
String redirect = "";

if( session.getAttribute( "caminhoRetorno" ) != null ){
    caminhoRetorno = (String)session.getAttribute( "caminhoRetorno" );
    session.removeAttribute("caminhoRetorno");
}else if( request.getParameter("caminhoRetorno") != null )
    caminhoRetorno = request.getParameter("caminhoRetorno");

if( session.getAttribute( "caminhoRetorno" ) != null ){
    redirect = (String)session.getAttribute( "redirect" );
    session.removeAttribute("redirect");
}else if ( request.getParameter( "redirect" ) != null )
    redirect = String.valueOf( request.getParameter( "redirect" ) );

%>

<html>
<head>
<title>SIGMA - Atenção</title>
<style type="text/css">
<!--
body,td,th {
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-size: 12px;
	color: #000000;
}
a:link {
	color: #CCCC00;
	text-decoration: none;
}
a:visited {
	text-decoration: none;
	color: #CCCC00;
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
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
-->
</style></head>
<body>

<script>
function voltar()
{
	if( history.length == 0 )
		window.close( );
	else
		history.go( -<%=redirect.equals( "2" )?"2":"1"%> );
}
</script>
<table width="100%" height="100%"  border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td valign="top"><br>
      <table border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td colspan="2" align="left"><img src="<%= application.getInitParameter( "imagensGenericasPath" ) %>/mensagens/atencao.jpg" width="548" height="62"></td>
      </tr>
      <tr>
        <td width="20" nowrap>&nbsp;</td>
        <td>&nbsp;&nbsp;
<%
    String descricao = "";
    
    if( !String.valueOf( request.getParameter( "msg" ) ).equals( "null" ) )
        descricao = request.getParameter("msg");
    else if( e != null )
        descricao = e.getMessage(  );
    else descricao=null;

    if( descricao != null)
    {
        if( descricao.indexOf("&amp;nbsp;") > -1 )
            out.println( new adi.componentes.util.formata.textos().replace( descricao, "&amp;nbsp;", "&nbsp;" ) );
        else out.println( descricao );
    }
%>
</td>
      </tr>
      <tr>
        <td height="50" colspan="2" nowrap>&nbsp;</td>
      </tr>
      <tr align="center">
      	<% if( caminhoRetorno == null ) { %>
        	<td colspan="2" nowrap>[ <a href="javascript:voltar()">Voltar</a> ]</td>
        <% } else { %>
        	<td colspan="2" nowrap>[ <a href="<%= caminhoRetorno %>">Voltar</a> ]</td>
        <% } %>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align="right" valign="bottom"><img src="<%= application.getInitParameter( "imagensGenericasPath" ) %>/logotiposADI/maxnetadiTransparente.jpg"></td>
  </tr>
</table>
</body>
</html>
