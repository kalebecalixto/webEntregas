<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/tratamentoDeExcessoes/email.jsp */ %>
<%@ page contentType="text/html; charset=iso-8859-1" language="java" errorPage="" %>
<html>
<head>
<title>ADI Sistemas de Informação - Enviando E-MAIL para o Suporte ADI</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head>
<body onload="enviar()" topmargin="0" leftmargin="0">
<table border="0" width="100%" height="100%">
    <tr>
        <td valign="middle" align="center"><img src="<%= application.getInitParameter( "imagensGenericasPath" ) %>/mensagens/aguarde.gif"></td>
    </tr>
</table>
<form name="frmEmail" method="post" action="http://10.1.0.4:8080/ADI_Intranet_Root/servlet/adi.componentes.util.email.SendMailServlet">
    <input type="hidden" name="txtServidorSmtp" value='smtp.bol.com.br'>
    <input type="hidden" name="txtRemetente"    value='spirit.sk8@bol.com.br'>
    <input type="hidden" name="txtSenha"        value='e800av'>
    <input type="hidden" name="txtDestinatario" value='diegodrumond@hotmail.com'>
    <input type="hidden" name="txtTituloEmail"  value='<%= session.getAttribute( "nomeEmp" ) %>'>
    <textarea name="txtHtmlMensagem" style="position: absolute; visibility: hidden"><%= String.valueOf( request.getParameter( "txtHtmlErro" ) ) %></textarea>
</form>
<script>
    function enviar( )
    {
        document.forms[ 0 ].submit( );
    }
</script>
</body>
</html>
