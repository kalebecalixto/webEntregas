<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/digitalizacao/digitalizaDocumento.jsp */ %>
<%@page contentType="text/html" pageEncoding="ISO-8859-1" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <title>Digitalização de documento</title>
    </head>
    <body topmargin="0" leftmargin="0" bottommargin="0" rightmargin="0">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">
            <tr>
                <td align="center" valign="middle">
                    <applet code="br.com.adi.maxnet.scanner.DigitalizadorApplet.class" archive="ADI_Digitalizacao.jar, JTwain.jar" width="100%" height="100%">
                        <param name="DOWNLOAD_URL" value="<%= request.getScheme( ) %>://<%= request.getServerName( ) %>:<%= request.getServerPort( ) %><%= request.getContextPath( ) %>/ADI_Programacao/ADI_Bin/utilitarios/digitalizacao/AspriseJTwain.dll">
                        <param name="DLL_NAME" value="AspriseJTwain.dll">
                        <param name="SERVER_URL" value="<%= request.getScheme( ) %>://<%= request.getServerName( ) %>:<%= request.getServerPort( ) %>">
                        <param name="PDF_PATH" value="<%= application.getInitParameter( "baseUploadPath" ) %>/empresa<%= session.getAttribute( "idEmpresa" ) %>/<%= request.getParameter( "nome" ) %>.pdf">
                        <param name="UPLOAD_URL" value="<%= request.getScheme( ) %>://<%= request.getServerName( ) %>:<%= request.getServerPort( ) %><%= request.getContextPath( ) %>/AtualizaDocumento">
                            Erro! Seu browser não suporta Applet Java.
                    </applet>
                </td>
            </tr>
        </table>
    </body>
</html>
